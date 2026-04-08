import { Cpu } from 'lucide-react';
import { useState } from 'react';

export default function BrandExportPage() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-10 ${isDark ? 'bg-[#050505] text-white' : 'bg-gray-100 text-slate-900'}`}>
      <div className="mb-10 flex gap-4">
        <button 
          onClick={() => setIsDark(true)}
          className={`px-6 py-2 rounded-full font-bold transition-all ${isDark ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-white'}`}
        >
          深色背景 (推荐)
        </button>
        <button 
          onClick={() => setIsDark(false)}
          className={`px-6 py-2 rounded-full font-bold transition-all ${!isDark ? 'bg-cyan-500 text-slate-950' : 'bg-slate-300 text-slate-900'}`}
        >
          纯白背景
        </button>
      </div>

      {/* 截图区域 - 完美正方形 */}
      <div 
        id="avatar-capture-area"
        className={`relative w-[600px] h-[600px] flex items-center justify-center rounded-[120px] shadow-2xl overflow-hidden ${isDark ? 'bg-black border border-white/5' : 'bg-white border border-slate-200'}`}
      >
        {/* 背景装饰 - 强化科技感 */}
        {isDark && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_70%)]" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          </>
        )}

        {/* 核心 Logo 容器 */}
        <div
          className="w-80 h-80 flex items-center justify-center relative shrink-0"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)',
            boxShadow: '0 0 80px rgba(34,211,238,0.6)',
          }}
        >
          <Cpu size={160} className="text-slate-950" strokeWidth={2} />
        </div>
      </div>

      <p className="mt-10 text-slate-500 font-mono-tech text-sm uppercase tracking-widest animate-pulse">
        Ready for capture • Square 1:1 Aspect Ratio
      </p>
      <p className="mt-2 text-slate-400 text-xs text-center max-w-md leading-relaxed">
        提示：请调整浏览器缩放，让正方形区域清晰显示，然后使用截图工具截取中间的正方形区域即可。由于微信头像是圆形的，图标已经预留了足够的边距。
      </p>
    </div>
  );
}
