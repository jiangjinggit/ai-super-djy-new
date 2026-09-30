import { lookup } from 'node:dns/promises';
import https from 'node:https';
import http from 'node:http';
import { isIP } from 'node:net';
import { canonicalUrl } from './core.mjs';
// Reject non-public addresses. IPv6 is deliberately limited to global unicast;
// IPv4-mapped addresses, NAT64 and tunnel ranges are never fetched.
export function publicAddress(address) {
  if (isIP(address) === 4) {
    const [a,b] = address.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && [0,168].includes(b)) ||
      (a === 198 && [18,19,51].includes(b)) || (a === 203 && b === 0));
  }
  return isIP(address) === 6 && /^[23]/i.test(address) && !/^200[12]:/i.test(address);
}
export async function allowedTarget(value, hosts, resolve = lookup) {
  const u = new URL(canonicalUrl(value));
  if (u.port && !['80','443'].includes(u.port)) throw new Error('blocked_port');
  if (!hosts.includes(u.hostname)) throw new Error('source_permission_unknown');
  const addresses = await resolve(u.hostname, { all: true });
  if (!addresses.length || addresses.some(x => !publicAddress(x.address))) throw new Error('blocked_address');
  return { u, address: addresses[0] };
}
export async function fetchBody(url, hosts, signal, redirects = 0) {
  if (redirects > 3) throw new Error('redirect_limit');
  const { u, address } = await allowedTarget(url, hosts);
  const result = await new Promise((resolve, reject) => {
    const req = (u.protocol === 'https:' ? https : http).get(u, {
      signal, headers: { 'User-Agent': 'DemandRadar/0.1 (personal research)', Accept: 'text/html,text/plain' },
      // Pin the checked DNS result to prevent rebinding between validation and connect.
      lookup: (_host, options, cb) => options.all ? cb(null, [address]) : cb(null, address.address, address.family),
    }, res => {
      if ([301,302,303,307,308].includes(res.statusCode)) {
        res.resume(); resolve({ redirect: res.headers.location }); return;
      }
      if (res.statusCode !== 200) { res.resume(); reject(new Error(`body_http_${res.statusCode}`)); return; }
      if (!/text\/(html|plain)/i.test(res.headers['content-type'] ?? '')) { res.resume(); reject(new Error('unsupported_body_type')); return; }
      const chunks = []; let size = 0;
      res.on('data', chunk => { size += chunk.length; if (size > 2_000_000) res.destroy(new Error('body_size_limit')); else chunks.push(chunk); });
      res.on('error', reject);
      res.on('end', () => resolve({ text: Buffer.concat(chunks).toString('utf8'), finalUrl: u.href }));
    });
    req.setTimeout(20000, () => req.destroy(new Error('body_timeout')));
    req.on('error', reject);
  });
  if (result.redirect) return fetchBody(new URL(result.redirect, u).href, hosts, signal, redirects + 1);
  if (canonicalUrl(result.finalUrl) !== canonicalUrl(url)) throw new Error('redirected_detail_unverified');
  return result;
}
