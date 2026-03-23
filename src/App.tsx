import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Brain, 
  Cpu, 
  Rocket, 
  ChevronRight, 
  Github, 
  Twitter, 
  Menu, 
  X,
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Code,
  Layers,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from "react-router-dom";

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// --- Data ---

const MODULE_CONTENT: Record<string, any> = {
  "ai-basics": {
    title: "AI 入门模块",
    subtitle: "开启您的超级个体进化之路",
    icon: Rocket,
    color: "blue",
    description: "从零开始了解 AI 的基本概念、历史发展及未来趋势。为你的超级个体之路打下坚实基础。",
    sections: [
      {
        title: "什么是人工智能？",
        content: "人工智能（AI）是模拟人类智能过程的计算机系统。在当今时代，生成式 AI（AIGC）正在重塑我们的工作和生活方式。",
        icon: Lightbulb
      },
      {
        title: "为什么现在是最佳时机？",
        content: "算力的突破和大模型的成熟，使得 AI 第一次成为了每个人都能触手可及的“外挂大脑”。",
        icon: Zap
      },
      {
        title: "您的第一个 AI 助手",
        content: "我们将教您如何选择适合自己的 AI 工具，并完成第一次有效的对话。这只是进化的开始。",
        icon: Star
      }
    ],
    lessons: ["AI 的前世今生", "大语言模型的工作原理", "常用 AI 工具清单", "如何克服 AI 焦虑"]
  },
  "llm": {
    title: "大模型模块",
    subtitle: "掌握核心，驾驭未来",
    icon: Brain,
    color: "purple",
    description: "深度解析 GPT、Claude、Gemini 等主流大模型。掌握 Prompt Engineering，释放模型最大潜力。",
    sections: [
      {
        title: "主流模型全景图",
        content: "对比分析 GPT-4o 的全能、Claude 3.5 的逻辑以及 Gemini 1.5 的超长上下文处理能力。",
        icon: Layers
      },
      {
        title: "提示词工程 (Prompting)",
        content: "学习结构化提示词（CO-STAR）、思维链（CoT）等高级技巧，让 AI 懂你所想。",
        icon: BookOpen
      },
      {
        title: "模型参数与微调",
        content: "了解模型背后的参数意义，以及在什么情况下我们需要对模型进行私有化微调。",
        icon: Cpu
      }
    ],
    lessons: ["Prompt Engineering 进阶", "多模态交互技巧", "模型幻觉的识别与规避", "API 调用与集成入门"]
  },
  "openclaw": {
    title: "OpenClaw 模块",
    subtitle: "开源力量，自由构建",
    icon: Cpu,
    color: "emerald",
    description: "探索 OpenClaw 生态系统，学习如何利用开源工具构建属于你自己的 AI 助手和自动化流程。",
    sections: [
      {
        title: "什么是 OpenClaw？",
        content: "OpenClaw 是一个致力于降低 AI 门槛的开源生态，提供了一系列开箱即用的工具和框架。",
        icon: Code
      },
      {
        title: "核心组件介绍",
        content: "深入了解 OpenClaw 的工作流引擎、知识库插件以及多智能体协作协议。",
        icon: Layers
      },
      {
        title: "快速部署指南",
        content: "手把手教您在本地或云端部署 OpenClaw 环境，开启您的私有化 AI 时代。",
        icon: Rocket
      }
    ],
    lessons: ["OpenClaw 环境搭建", "构建第一个 AI Agent", "知识库 RAG 实践", "社区插件开发指南"]
  },
  "scenarios": {
    title: "AI 应用场景",
    subtitle: "实战演练，生产力飞跃",
    icon: Zap,
    color: "orange",
    description: "实战演练：AI 在办公、创意、编程、生活等全场景的应用。将技术转化为真实的生产力。",
    sections: [
      {
        title: "职场办公自动化",
        content: "利用 AI 快速生成周报、PPT 大纲、会议纪要，让重复性工作缩短 80%。",
        icon: Zap
      },
      {
        title: "创意内容生产",
        content: "AI 辅助写作、设计、视频剪辑。一个人就是一支营销团队，释放无限创意。",
        icon: Star
      },
      {
        title: "个人知识库构建",
        content: "将碎片化信息转化为结构化知识，利用 AI 构建您的“第二大脑”，永不遗忘。",
        icon: BookOpen
      }
    ],
    lessons: ["AI 办公提效 36 计", "自媒体爆款内容生成", "AI 辅助编程实战", "生活助手：AI 旅游与理财"]
  }
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAction = () => {
    toast.success("即将开启您的超级个体之旅！", {
      description: "该功能正在开发中，敬请期待。",
    });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-white/10 py-4" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">AI Superman <span className="text-blue-500">DJY</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">首页</Link>
          {Object.entries(MODULE_CONTENT).map(([id, content]) => (
            <Link 
              key={id} 
              to={`/module/${id}`} 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {content.title.replace("模块", "")}
            </Link>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAction}
            className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
          >
            开启超级个体
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4"
          >
            <Link to="/" className="text-lg font-medium text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>首页</Link>
            {Object.entries(MODULE_CONTENT).map(([id, content]) => (
              <Link 
                key={id} 
                to={`/module/${id}`} 
                className="text-lg font-medium text-gray-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.title}
              </Link>
            ))}
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={handleAction}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl"
            >
              开启超级个体
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    const modulesSection = document.getElementById("modules");
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: "smooth" });
      toast("已为您定位到核心模块", {
        icon: <Rocket className="text-blue-500" size={16} />,
      });
    }
  };

  const handleLearnMore = () => {
    const communitySection = document.getElementById("community");
    if (communitySection) {
      communitySection.scrollIntoView({ behavior: "smooth" });
      toast.info("正在为您跳转到社区加入区域");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            让每个人成为超级个体
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
            AI Superman <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              EVOLUTION
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            探索人工智能的无限可能。从零基础入门到掌握前沿大模型，
            DJY 助你打破边界，重塑自我，成为时代的超级个体。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] cursor-pointer"
            >
              立即开始探索
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLearnMore}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 transition-all cursor-pointer"
            >
              了解更多
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const ModuleCard = ({ title, desc, icon: Icon, color, index, id }: any) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.08)" }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => {
        toast.success(`已进入: ${title}`, { description: "正在加载学习资源..." });
        navigate(`/module/${id}`);
      }}
      className="group relative p-8 bg-white/5 border border-white/10 rounded-3xl transition-all cursor-pointer overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-600/10 blur-3xl group-hover:bg-${color}-600/20 transition-all`} />
      
      <div className={`w-14 h-14 mb-6 rounded-2xl bg-${color}-600/20 flex items-center justify-center text-${color}-400 group-hover:scale-110 transition-transform`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">
        {desc}
      </p>
      
      <div className="flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
        进入模块 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};

const Modules = () => {
  const modules = [
    {
      id: "ai-basics",
      title: "AI 入门模块",
      desc: "从零开始了解 AI 的基本概念、历史发展及未来趋势。为你的超级个体之路打下坚实基础。",
      icon: Rocket,
      color: "blue",
    },
    {
      id: "llm",
      title: "大模型模块",
      desc: "深度解析 GPT、Claude、Gemini 等主流大模型。掌握 Prompt Engineering，释放模型最大潜力。",
      icon: Brain,
      color: "purple",
    },
    {
      id: "openclaw",
      title: "OpenClaw 模块",
      desc: "探索 OpenClaw 生态系统，学习如何利用开源工具构建属于你自己的 AI 助手 and 自动化流程。",
      icon: Cpu,
      color: "emerald",
    },
    {
      id: "scenarios",
      title: "AI 应用场景",
      desc: "实战演练：AI 在办公、创意、编程、生活等全场景的应用。将技术转化为真实的生产力。",
      icon: Zap,
      color: "orange",
    },
  ];

  return (
    <section id="modules" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">核心学习模块</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          我们精心设计了四大核心模块，涵盖从理论到实战的全方位内容，助你全方位进化。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((mod, i) => (
          <ModuleCard key={mod.title} {...mod} index={i} />
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-blue-500 fill-blue-500" size={20} />
            <span className="text-lg font-bold text-white tracking-tighter">AI Superman DJY</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2026 AI Superman DJY. 让每个人成为超级个体。
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-white transition-colors">隐私政策</a>
          <a href="#" className="hover:text-white transition-colors">服务条款</a>
          <a href="#" className="hover:text-white transition-colors">联系我们</a>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <Modules />
      
      {/* CTA Section */}
      <section id="community" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              准备好开启你的 <br /> 超级个体进化了吗？
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              加入 AI Superman DJY 社区，与数万名先行者一起，
              用 AI 重塑未来。
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success("欢迎加入社区！", { description: "请检查您的邮箱以完成注册。" })}
              className="px-10 py-5 bg-white text-blue-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl cursor-pointer"
            >
              立即免费加入
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const ModulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const content = id ? MODULE_CONTENT[id] : null;

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">模块未找到</h2>
        <button onClick={() => navigate("/")} className="text-blue-500 hover:underline">返回首页</button>
      </div>
    </div>
  );

  const Icon = content.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 max-w-5xl mx-auto"
    >
      <button 
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>

      <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
        <div className={`w-24 h-24 rounded-3xl bg-${content.color}-600/20 flex items-center justify-center text-${content.color}-400 shrink-0`}>
          <Icon size={48} />
        </div>
        <div>
          <span className={`text-sm font-bold uppercase tracking-widest text-${content.color}-400 mb-4 block`}>
            {content.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">{content.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">{content.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {content.sections.map((section: any, i: number) => {
          const SIcon = section.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                <SIcon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[40px] p-12">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <BookOpen className="text-blue-500" /> 课程大纲
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.lessons.map((lesson: string, i: number) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                {i + 1}
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors">{lesson}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
        <Toaster position="top-center" richColors theme="dark" />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/module/:id" element={<ModulePage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
