import { Link } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function PrivacyPage() {
  useDocumentTitle('隐私政策');

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-slate-700 dark:text-gray-300">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6">隐私政策</h1>
      <p className="mb-4">本项目仅用于学习与知识服务展示。我们不在页面中主动收集个人敏感信息。</p>
      <p className="mb-4">如果你通过邮件联系我们，相关信息仅用于沟通和问题处理，不用于营销转售。</p>
      <p className="mb-10">若后续引入账号系统、埋点或支付，会在此页更新具体的数据处理方式和生效日期。</p>
      <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">返回首页</Link>
    </div>
  );
}
