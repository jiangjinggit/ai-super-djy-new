import { Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import { MODULE_CARDS } from '@/content/moduleCatalog';
import { ModuleCard } from '@/components/ModuleCard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useCountUp } from '@/hooks/useCountUp';
import type { ModuleColor, ModuleId } from '@/types/course';

const StatCard = ({ target, label, suffix }: { target: number; label: string; suffix: string }) => {
  const { count, ref } = useCountUp(target, 1000);
  return (
    <div ref={ref} className="card-scan card-hud relative text-center p-6 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-cyan-500/10 rounded-2xl hover:border-cyan-500/30 transition-colors">
      <div
        className="font-mono-tech text-3xl md:text-4xl font-bold text-cyan-400 mb-2 tabular-nums"
        style={{ textShadow: '0 0 20px rgba(34,211,238,0.45)' }}
      >
        {String(count).padStart(2, '0')}
        <span className="text-2xl text-cyan-300/70">{suffix}</span>
      </div>
      <div className="text-xs tracking-widest uppercase text-slate-500 dark:text-gray-500">{label}</div>
    </div>
  );
};

const Hero = () => {
  const handleStart = () => {
    const roadmapSection = document.getElementById('learning-roadmap');
    if (roadmapSection) {
      roadmapSection.scrollIntoView({ behavior: 'smooth' });
      toast('已为您定位到学习路线', {
        icon: <Rocket className="text-blue-500" size={16} />,
      });
    }
  };

  const handleLearnMore = () => {
    const communitySection = document.getElementById('community');
    if (communitySection) {
      communitySection.scrollIntoView({ behavior: 'smooth' });
      toast.info('正在为您跳转到社区加入区域');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        {/* 点阵网格 */}
        <div className="absolute inset-0 bg-grid-dots opacity-60" />
        {/* 底部渐变遮罩，让网格在底部淡出 */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-black to-transparent" />
        {/* 光晕 — 改为 cyan + indigo */}
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-600/15 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            让每个人成为超级个体
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-10 leading-[1.1]" style={{fontFamily: "'Syne', sans-serif"}}>
            AI Superman <br className="my-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">EVOLUTION</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
            从零基础到流程提效，再到 MVP 与服务验证。
            这里不卖神话，只帮你把 AI 变成更稳、更可执行的工作能力。
          </p>

          {/* 终端装饰 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-sm mb-10 rounded-xl border border-cyan-500/20 bg-black/30 dark:bg-black/50 backdrop-blur-sm overflow-hidden text-left shadow-[0_0_30px_rgba(34,211,238,0.08)]"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <span className="ml-2 text-[11px] font-mono-tech text-slate-500">ai-superman ~ evolution</span>
            </div>
            <div className="p-4 font-mono-tech text-xs space-y-1.5">
              <p><span className="text-cyan-400">$</span> <span className="text-slate-300"> init super-individual</span></p>
              <p className="text-emerald-400 pl-2">✓ AI 工具矩阵已就绪</p>
              <p><span className="text-cyan-400">$</span> <span className="text-slate-300"> load --module llm agents</span></p>
              <p className="text-emerald-400 pl-2">✓ 6 个模块加载完成</p>
              <p className="flex items-center gap-1"><span className="text-cyan-400">$</span><span className="inline-block w-1.5 h-3.5 bg-cyan-400/80 ml-1 animate-pulse" /></p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-black text-lg rounded-2xl hover:from-cyan-400 hover:to-sky-500 transition-all shadow-[0_0_28px_rgba(34,211,238,0.35)] cursor-pointer"
              type="button"
            >
              开始探索
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLearnMore}
              className="w-full sm:w-auto px-10 py-5 bg-slate-900 dark:bg-white text-blue-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl cursor-pointer"
              type="button"
            >
              了解更多
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 dark:text-gray-500 z-20"
      >
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const Modules = () => {
  return (
    <section id="modules" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">六大核心模块</h2>
        <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          从入门认知到模型选型，再到智能体、场景、案例和成长路径，按实际执行顺序组织内容。
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { target: 6,  label: '核心模块',  suffix: '' },
          { target: 24, label: '主题课程',  suffix: '+' },
          { target: 12, label: '周执行路线', suffix: '' },
          { target: 3,  label: '典型场景',  suffix: '' },
        ].map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULE_CARDS.map((moduleCard, index) => (
          <ModuleCard key={moduleCard.id} {...moduleCard} index={index} />
        ))}
      </div>
    </section>
  );
};

const LEARNING_STEPS: Array<{ id: ModuleId; label: string; time: string; color: ModuleColor }> = [
  { id: 'super-individual', label: 'AI 入门', time: '1-2 周', color: 'blue' },
  { id: 'llm', label: '大模型实战', time: '1-2 周', color: 'purple' },
  { id: 'agents', label: '智能体实战', time: '2-4 周', color: 'emerald' },
  { id: 'scenarios', label: '场景实战', time: '持续', color: 'orange' },
  { id: 'cases', label: '案例学习', time: '随时', color: 'purple' },
  { id: 'growth', label: '成长路径', time: '3-12 月', color: 'emerald' },
];

const LearningRoadmap = () => {
  const navigate = useNavigate();

  return (
    <section id="learning-roadmap" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">学习路线图</h2>
        <p className="text-slate-600 dark:text-gray-400">建议按顺序学习；如果你已经有基础，也可以直接跳到当前最需要的模块。</p>
      </div>

      {/* 桌面时间线 */}
      <div className="hidden md:block relative">
        {/* 底部连接线 */}
        <div className="absolute top-[22px] left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <div className="grid grid-cols-6 gap-2">
          {LEARNING_STEPS.map((step, index) => {
            const stepStyle = MODULE_COLOR_STYLES[step.color];
            return (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/module/${step.id}`)}
                className="group flex flex-col items-center gap-3 cursor-pointer"
                type="button"
              >
                {/* 圆形序号节点 */}
                <div
                  className={`relative w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono-tech text-sm font-bold transition-all
                    border-slate-300 dark:border-white/15 text-slate-500 dark:text-gray-400
                    group-hover:border-cyan-400 group-hover:text-cyan-400
                    group-hover:shadow-[0_0_16px_rgba(34,211,238,0.45)]`}
                >
                  {String(index + 1).padStart(2, '0')}
                  {/* 节点背景 */}
                  <div className="absolute inset-0 rounded-full bg-white dark:bg-slate-950 -z-10" />
                </div>
                {/* 步骤信息 */}
                <div className="text-center">
                  <p className={`font-bold text-sm transition-colors group-hover:text-cyan-400 ${stepStyle.subtitle}`}>{step.label}</p>
                  <p className="font-mono-tech text-[10px] text-slate-400 dark:text-gray-600 mt-0.5 tracking-wider">{step.time}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 移动端竖向时间线 */}
      <div className="md:hidden relative pl-8">
        {/* 竖向连接线 */}
        <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent" />

        <div className="flex flex-col gap-5">
          {LEARNING_STEPS.map((step, index) => {
            const stepStyle = MODULE_COLOR_STYLES[step.color];
            return (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/module/${step.id}`)}
                className="group flex items-center gap-4 cursor-pointer text-left"
                type="button"
              >
                {/* 圆形节点（绝对定位到左侧线上）*/}
                <div className="absolute left-0 w-9 h-9 rounded-full border-2 border-slate-300 dark:border-white/15 bg-white dark:bg-slate-950 flex items-center justify-center font-mono-tech text-xs font-bold text-slate-500 dark:text-gray-400 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-all">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <p className={`font-bold text-sm ${stepStyle.subtitle}`}>{step.label}</p>
                  <p className="font-mono-tech text-[10px] text-slate-400 dark:text-gray-600 mt-0.5">{step.time}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GROWTH_STEPS: Array<{
  phase: string;
  time: string;
  title: string;
  desc: string;
  color: ModuleColor;
}> = [
  {
    phase: '阶段 0',
    time: '1-2 周',
    title: '建立 AI 基础认知',
    desc: '学会使用 ChatGPT/DeepSeek，掌握 Prompt 基础公式，搭建个人工具矩阵',
    color: 'blue',
  },
  {
    phase: '阶段 1',
    time: '1-3 月',
    title: '深度使用 AI 提效',
    desc: '在现有工作中深度使用 AI，搭建自动化工作流，开始积累个人品牌',
    color: 'purple',
  },
  {
    phase: '阶段 2',
    time: '3-6 月',
    title: '探索变现路径',
    desc: '基于垂直领域知识 + AI 能力，构建个人产品或服务，获得第一笔收入',
    color: 'emerald',
  },
  {
    phase: '阶段 3',
    time: '6-12 月',
    title: '规模化与护城河',
    desc: '从副业到全职，建立竞争壁垒，探索规模化增长路径',
    color: 'orange',
  },
];

export default function HomePage() {
  useDocumentTitle('AI 学习地图');

  return (
    <>
      <Hero />
      <LearningRoadmap />
      <Modules />

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">成长路径</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">先识别任务，再做提效，最后用最小验证来确认方向，而不是一开始就追求“大而全”。</p>
          </div>
          <div className="space-y-8">
            {GROWTH_STEPS.map((step, index) => {
              const stepStyle = MODULE_COLOR_STYLES[step.color];
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="card-scan relative flex items-start gap-6 p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-cyan-500/10 rounded-3xl hover:border-cyan-500/25 transition-all overflow-hidden"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold font-mono-tech leading-tight ${stepStyle.stepBadge}`}>
                    {step.phase}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                      <span className="text-xs font-medium text-slate-500 dark:text-gray-500 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">{step.time}</span>
                    </div>
                    <p className="text-slate-600 dark:text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="community" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 via-sky-600 to-indigo-700 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          {/* 纯 CSS 斜线纹理，替代外部 URL */}
          <div className="absolute inset-0 bg-carbon-lines rounded-[40px]" />
          {/* 发光边框效果 */}
          <div className="absolute inset-0 rounded-[40px] ring-1 ring-cyan-400/20" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
              准备好开启你的 <br /> 超级个体进化了吗？
            </h2>
            <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">从一个真实任务开始，把模板、流程和判断力慢慢搭起来。</p>
            <p className="text-lg text-white/55 mb-10">内容会持续更新，但所有高时效参数都建议回到官方文档复核。</p>
            <Link to="/module/super-individual">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,211,238,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-slate-950 text-cyan-400 font-black text-lg rounded-2xl hover:bg-slate-900 transition-all shadow-2xl cursor-pointer border border-cyan-500/30"
                type="button"
              >
                从入门开始学习
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
