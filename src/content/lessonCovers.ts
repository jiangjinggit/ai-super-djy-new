import type { ModuleId } from '@/types/course';

const COVER_THEMES: Record<ModuleId, { accent: string; background: string; glow: string; eyebrow: string }> = {
  'super-individual': {
    accent: '#60a5fa',
    background: '#020617',
    glow: '#1d4ed8',
    eyebrow: 'FOUNDATION',
  },
  llm: {
    accent: '#c084fc',
    background: '#0f172a',
    glow: '#7c3aed',
    eyebrow: 'MODEL LAB',
  },
  'agent-intro': {
    accent: '#34d399',
    background: '#052e2b',
    glow: '#047857',
    eyebrow: 'AGENT FOUNDRY',
  },
  openclaw: {
    accent: '#fb923c',
    background: '#2b1608',
    glow: '#c2410c',
    eyebrow: 'OPENCLAW LAB',
  },
  'claude-agent': {
    accent: '#a78bfa',
    background: '#1d1633',
    glow: '#6d28d9',
    eyebrow: 'CLAUDE FLOW',
  },
  'ai-programming': {
    accent: '#38bdf8',
    background: '#071a2a',
    glow: '#0369a1',
    eyebrow: 'AI CODING',
  },
  scenarios: {
    accent: '#fb923c',
    background: '#1c1917',
    glow: '#ea580c',
    eyebrow: 'SCENARIO KIT',
  },
  cases: {
    accent: '#f472b6',
    background: '#1f1120',
    glow: '#be185d',
    eyebrow: 'CASE REVIEW',
  },
  growth: {
    accent: '#22c55e',
    background: '#07130c',
    glow: '#15803d',
    eyebrow: 'GROWTH MAP',
  },
};

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const wrapText = (value: string, lineLength: number, maxLines: number) => {
  const lines: string[] = [];

  for (let index = 0; index < value.length; index += lineLength) {
    if (lines.length === maxLines) {
      break;
    }

    const chunk = value.slice(index, index + lineLength);
    lines.push(index + lineLength < value.length && lines.length === maxLines - 1 ? `${chunk}...` : chunk);
  }

  return lines;
};

const createShapeOffsets = (seed: string) => {
  const total = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return {
    x: 520 + (total % 140),
    y: 40 + (total % 120),
    rotate: total % 35,
  };
};

export const createLessonCover = (moduleId: ModuleId, title: string, subtitle: string, seed: string) => {
  const theme = COVER_THEMES[moduleId];
  const titleLines = wrapText(title, 12, 3);
  const shape = createShapeOffsets(seed);
  const safeSubtitle = escapeXml(subtitle);
  const safeTitleLines = titleLines.map(escapeXml);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" fill="none">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
          <stop stop-color="${theme.background}" />
          <stop offset="1" stop-color="${theme.glow}" />
        </linearGradient>
        <radialGradient id="halo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1220 120) rotate(116.565) scale(760 980)">
          <stop stop-color="${theme.accent}" stop-opacity="0.38" />
          <stop offset="1" stop-color="${theme.accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#background)" />
      <rect x="54" y="54" width="1492" height="792" rx="42" fill="white" fill-opacity="0.03" stroke="white" stroke-opacity="0.10" />
      <circle cx="1230" cy="180" r="440" fill="url(#halo)" />
      <circle cx="180" cy="768" r="290" fill="${theme.accent}" fill-opacity="0.08" />
      <path d="M1088 148L1486 148" stroke="white" stroke-opacity="0.16" stroke-width="2" />
      <path d="M1088 178L1392 178" stroke="white" stroke-opacity="0.10" stroke-width="2" />
      <rect x="${shape.x}" y="${shape.y}" width="260" height="260" rx="38" transform="rotate(${shape.rotate} ${shape.x} ${shape.y})" fill="${theme.accent}" fill-opacity="0.11" />
      <rect x="1084" y="506" width="292" height="180" rx="30" fill="black" fill-opacity="0.14" stroke="white" stroke-opacity="0.10" />
      <text x="124" y="172" fill="${theme.accent}" font-size="34" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-weight="700" letter-spacing="10">${theme.eyebrow}</text>
      <text x="124" y="250" fill="white" fill-opacity="0.72" font-size="28" font-family="'PingFang SC','Microsoft YaHei',sans-serif">${safeSubtitle}</text>
      ${safeTitleLines
        .map(
          (line, index) => `
        <text x="124" y="${370 + index * 110}" fill="white" font-size="78" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-weight="700">${line}</text>`,
        )
        .join('')}
      <text x="124" y="786" fill="white" fill-opacity="0.56" font-size="30" font-family="'JetBrains Mono','SFMono-Regular',monospace">AI SUPERMAN DJY</text>
      <text x="1108" y="572" fill="${theme.accent}" font-size="22" font-family="'JetBrains Mono','SFMono-Regular',monospace" font-weight="700">LESSON COVER</text>
      <text x="1108" y="624" fill="white" fill-opacity="0.80" font-size="36" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-weight="700">实战课地图</text>
      <text x="1108" y="674" fill="white" fill-opacity="0.60" font-size="24" font-family="'PingFang SC','Microsoft YaHei',sans-serif">原创结构 / 逐课推进 / 可长期更新</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
