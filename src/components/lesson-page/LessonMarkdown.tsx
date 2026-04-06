import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface LessonMarkdownProps {
  body: string;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('指令已成功复制到剪贴板');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('复制失败，请手动选择复制');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer bg-slate-200/50 dark:bg-white/5 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 dark:text-gray-500 border border-transparent hover:border-blue-500/20"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

const headingId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, '-')
    .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}~]/g, '')
    .trim();

const flattenText = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return flattenText(child.props.children);
      }

      return '';
    })
    .join('')
    .trim();

const PARAGRAPH_CALLOUTS = [
  {
    prefix: '✅',
    label: '推荐做法',
    tone: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-100',
  },
  {
    prefix: '❌',
    label: '常见误区',
    tone: 'border-rose-500/25 bg-rose-500/10 text-rose-800 dark:text-rose-100',
  },
  {
    prefix: '提醒：',
    label: '重点提醒',
    tone: 'border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-100',
  },
  {
    prefix: '注意：',
    label: '注意',
    tone: 'border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-100',
  },
] as const;

const components: Components = {
  h2: ({ node, children, ...props }) => (
    <h2
      id={headingId(flattenText(children))}
      className="mt-10 md:mt-14 mb-5 border-t border-slate-200 dark:border-white/10 pt-8 text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }) => (
    <h3
      id={headingId(flattenText(children))}
      className="mt-8 md:mt-10 mb-4 text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ node, children, ...props }) => (
    <h4 id={headingId(flattenText(children))} className="mt-8 mb-3 text-base font-semibold text-slate-900 dark:text-white" {...props}>
      {children}
    </h4>
  ),
  p: ({ node, children, ...props }) => {
    const text = flattenText(children);
    const callout = PARAGRAPH_CALLOUTS.find((item) => text.startsWith(item.prefix));

    if (callout) {
      return (
        <div className={`my-6 rounded-[24px] border px-5 py-5 ${callout.tone}`}>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] opacity-90">{callout.label}</p>
          <p className="m-0 text-base md:text-lg leading-8 text-current" {...props}>
            {children}
          </p>
        </div>
      );
    }

    return (
      <p className="mb-6 text-[1.05rem] leading-8 text-slate-800 dark:text-gray-200 md:text-lg" {...props}>
        {children}
      </p>
    );
  },
  ul: ({ node, ...props }) => <ul className="mb-7 list-disc space-y-3 pl-6" {...props} />,
  ol: ({ node, ...props }) => <ol className="mb-7 list-decimal space-y-3 pl-6" {...props} />,
  li: ({ node, ...props }) => <li className="pl-1 text-base leading-7 text-slate-800 dark:text-gray-200 md:text-[1.02rem]" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900 dark:text-white" {...props} />,
  a: ({ node, href, ...props }) => {
    const isExternal = href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-medium text-blue-600 dark:text-blue-300 underline decoration-blue-400/40 underline-offset-4 transition-colors hover:text-white"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      />
    );
  },
  hr: ({ node, ...props }) => (
    <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="my-8 rounded-[24px] border border-blue-500/20 bg-blue-500/10 px-5 py-5 text-slate-800 dark:text-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      {...props}
    />
  ),
  pre: ({ node, children, ...props }) => {
    const firstChild = Children.toArray(children)[0];
    const className = isValidElement<{ className?: string; children?: ReactNode }>(firstChild) ? firstChild.props.className : '';
    const content = isValidElement<{ children?: ReactNode }>(firstChild) ? flattenText(firstChild.props.children) : '';
    const languageMatch = className?.match(/language-([\w-]+)/);
    const label = languageMatch?.[1] ? languageMatch[1].toUpperCase() : 'EXECUTABLE';

    return (
      <div className="my-8 overflow-hidden rounded-[28px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#09111f] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-700 dark:text-blue-200">{label}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden md:block" />
          </div>
          <CopyButton text={content} />
        </div>
        <pre className="custom-scrollbar overflow-x-auto px-5 py-5 text-sm leading-7 text-slate-800 dark:text-gray-100" {...props}>
          {children}
        </pre>
      </div>
    );
  },
  code: (props) => {
    const { className, children, inline, ...rest } = props as typeof props & {
      children?: ReactNode;
      className?: string;
      inline?: boolean;
    };

    if (inline) {
      return (
        <code className="rounded-lg bg-slate-200 dark:bg-white/10 px-2 py-1 font-mono text-[0.92em] text-blue-800 dark:text-blue-100" {...rest}>
          {children}
        </code>
      );
    }

    return (
      <code className={`font-mono text-sm text-slate-800 dark:text-gray-100 ${className ?? ''}`.trim()} {...rest}>
        {children}
      </code>
    );
  },
  table: ({ node, ...props }) => (
    <div className="custom-scrollbar my-8 overflow-x-auto rounded-[28px] border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <table className="min-w-[640px] w-full border-collapse text-left" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-blue-500/10" {...props} />,
  tbody: ({ node, ...props }) => <tbody className="divide-y divide-white/5" {...props} />,
  tr: ({ node, ...props }) => <tr className="even:bg-white/[0.03]" {...props} />,
  th: ({ node, ...props }) => (
    <th className="border-b border-slate-200 dark:border-white/10 px-4 py-3 text-sm font-semibold text-blue-900 dark:text-blue-50" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="px-4 py-3 align-top text-sm leading-6 text-slate-800 dark:text-gray-200 md:text-[0.98rem]" {...props} />
  ),
  img: ({ node, alt, ...props }) => (
    <figure className="my-8 overflow-hidden rounded-[28px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
      <img className="w-full object-cover" alt={alt ?? ''} {...props} />
      {alt ? <figcaption className="border-t border-slate-200 dark:border-white/10 px-5 py-3 text-sm text-slate-600 dark:text-gray-400">{alt}</figcaption> : null}
    </figure>
  ),
};

export const LessonMarkdown = ({ body }: LessonMarkdownProps) => {
  return (
    <div className="rounded-[24px] md:rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-4 py-6 md:px-10 md:py-10">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
};
