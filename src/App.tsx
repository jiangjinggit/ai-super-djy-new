import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ThemeProvider } from '@/components/ThemeProvider';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ModulePage = lazy(() => import('@/pages/ModulePage'));
const LessonPage = lazy(() => import('@/pages/LessonPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500 dark:text-gray-500">
    正在加载内容...
  </div>
);

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen overflow-x-hidden bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white selection:bg-blue-500/30">
          <Toaster position="top-center" richColors theme="system" />
          <Navbar />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/module/:id" element={<ModulePage />} />
              <Route path="/module/:id/lesson/:lessonSlug" element={<LessonPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
