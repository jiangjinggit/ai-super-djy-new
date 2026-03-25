import { BookOpen, Cpu, FileText, Rocket, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import { MODULE_CARDS } from '@/content/moduleCatalog';
import { ModuleCard } from '@/components/ModuleCard';
import type { ModuleColor } from '@/types/course';

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
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            让每个人成为超级个体
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-10 leading-[1.1]">
            AI Superman <br className="my-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">EVOLUTION</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            探索人工智能的无限可能。从零基础入门到掌握前沿大模型，
            DJY 助你打破边界，重塑自我，成为时代的超级个体。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-lg rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer"
              type="button"
            >
              开始探索
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLearnMore}
              className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl cursor-pointer"
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 z-20"
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
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">六大核心模块</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          从入门到实战，从工具到案例。六大模块覆盖超级个体进化全链路，助你一人成军。
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: '6', label: '核心模块' },
          { value: '20+', label: '实战课程' },
          { value: '50+', label: '工具推荐' },
          { value: '3+', label: '真实案例' },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
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
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Modules />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">免费资源</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">我们为你准备了入门必备的免费资源，扫码进群即可领取完整版。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, title: '入门电子书', desc: '《AI 超级个体入门指南》PDF，零基础友好' },
            { icon: FileText, title: 'Prompt 模板集', desc: '50+ 可直接复用的 Prompt 模板，按场景分类' },
            { icon: Cpu, title: 'OpenClaw 工作流', desc: '10 个超级个体必用自动化工作流详细教程' },
            { icon: Users, title: '案例合集', desc: '精选 3 个公开报道的真实 AI 创业案例拆解' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 transition-all"
            >
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="learning-roadmap" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">成长路径</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">从零基础到独立运营 AI 业务，循序渐进的务实成长路线。</p>
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
                  className="flex items-start gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/8 transition-all"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold ${stepStyle.stepBadge}`}>
                    {step.phase}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">{step.time}</span>
                    </div>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="community" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              准备好开启你的 <br /> 超级个体进化了吗？
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">加入 AI Superman DJY 社区，与数万名先行者一起，用 AI 重塑未来。</p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('欢迎加入社区！', { description: '请检查您的邮箱以完成注册。' })}
              className="px-10 py-5 bg-white text-blue-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl cursor-pointer"
              type="button"
            >
              立即免费加入
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
