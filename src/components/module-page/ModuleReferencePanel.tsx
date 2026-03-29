import { ShieldCheck } from 'lucide-react';

import type { SourceLink } from '@/types/course';

interface ModuleReferencePanelProps {
  lastVerifiedOn: string;
  sources: SourceLink[];
}

export const ModuleReferencePanel = ({ lastVerifiedOn, sources }: ModuleReferencePanelProps) => {
  return (
    <div className="mb-12 p-6 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={18} />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">内容参考与更新时间</h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-gray-400 mb-2">最后整理日期：{lastVerifiedOn}</p>
      <p className="text-sm text-slate-500 dark:text-gray-500 mb-4">以下为本模块的核心参考来源；价格、版本和能力边界请以对应官方页面为准。</p>
      <div className="flex flex-wrap gap-3">
        {sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 rounded-full bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-white hover:border-white/30 transition-colors"
          >
            {source.label}
          </a>
        ))}
      </div>
    </div>
  );
};
