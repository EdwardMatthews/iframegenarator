'use client';

import Link from 'next/link';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { useTranslation } from '@/lib/client-i18n';

export default function NotFound() {
  const { t } = useTranslation('en');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-bold text-gray-900">{t('site.title')}</h1>
        </div>
      </header>
      
      <main className="flex items-center justify-center flex-1 min-h-[calc(100vh-73px)]">
        <div className="text-center space-y-6 p-8">
          <div className="flex justify-center">
            <HiOutlineExclamationTriangle className="w-16 h-16 text-yellow-500" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900">{t('url.error.notFound.title')}</h1>
          <h2 className="text-2xl font-semibold text-gray-700">{t('url.error.notFound.heading')}</h2>
          <p className="text-gray-600 max-w-md mx-auto">{t('url.error.notFound.description')}</p>
          <Link
            href="/en"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t('url.error.notFound.backHome')}
          </Link>
        </div>
      </main>
    </div>
  );
} 