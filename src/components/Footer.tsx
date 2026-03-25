import { Github, Twitter, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-blue-500 fill-blue-500" size={20} />
            <span className="text-lg font-bold text-white tracking-tighter">AI Superman DJY</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 AI Superman DJY. 让每个人成为超级个体。</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="X"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-500">
          <Link to="/privacy" className="hover:text-white transition-colors">
            隐私政策
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            服务条款
          </Link>
          <a href="mailto:hello@aisupermandjy.com" className="hover:text-white transition-colors">
            联系我们
          </a>
        </div>
      </div>
    </footer>
  );
};
