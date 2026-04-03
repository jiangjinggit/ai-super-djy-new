import type { SourceLink } from '@/types/course';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const STALE_AFTER_DAYS = 120;

const getFreshnessState = (updatedAt?: string) => {
  if (!updatedAt) {
    return null;
  }

  const timestamp = Date.parse(updatedAt);
  if (Number.isNaN(timestamp)) {
    return null;
  }

  const ageInDays = Math.floor((Date.now() - timestamp) / DAY_IN_MS);
  return {
    ageInDays,
    isStale: ageInDays > STALE_AFTER_DAYS,
  };
};

interface ContentMetaNoteProps {
  updatedAt?: string;
  sources?: SourceLink[];
}

export const ContentMetaNote = ({ updatedAt, sources = [] }: ContentMetaNoteProps) => {
  const freshness = getFreshnessState(updatedAt);

  if (!updatedAt && sources.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-4 py-4">
      {freshness?.isStale && (
        <p className="mt-2 text-xs text-amber-600 dark:text-amber-300">
          该内容距离上次整理已超过 {STALE_AFTER_DAYS} 天，涉及价格、版本、窗口等高时效信息时建议优先复核官方页面。
        </p>
      )}
      {sources.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-white hover:border-white/30 transition-colors"
            >
              {source.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
