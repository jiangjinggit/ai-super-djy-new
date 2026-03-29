import { Link } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function TermsPage() {
  useDocumentTitle('服务条款');

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-gray-300">
      <h1 className="text-4xl font-black text-white mb-6">服务条款</h1>
      <p className="mb-4">本站内容用于学习交流和方法参考，不构成投资、法律或财务建议。</p>
      <p className="mb-4">案例、模型价格和功能参数可能随官方更新发生变化，请以官方文档为准。</p>
      <p className="mb-10">使用本站内容进行商业实践时，请自行评估合规、版权和数据安全风险。</p>
      <Link to="/" className="text-blue-400 hover:underline">返回首页</Link>
    </div>
  );
}
