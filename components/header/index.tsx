'use client';

import { useTranslation } from '@/lib/client-i18n';
import LanguageSwitcher from '@/components/language-switcher';
import { Locale } from '@/types';
import { LogoIcon } from '@/components/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeaderProps {
  locale: Locale;
}

// 为 Chrome API 添加类型定义
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        id?: string;
      };
    };
  }
}

export default function Header({ locale }: HeaderProps) {
  const { t } = useTranslation(locale);
  const handleInstallClick = () => {
    // Chrome 插件的 ID，需要替换成实际的 ID
    const extensionId = 'bobeijbaaieihblopaglekoopioccolk';
    const installUrl = `https://chrome.google.com/webstore/detail/${extensionId}`;
    
    window.open(installUrl, '_blank');
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link 
          href={`/${locale}`}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity text-blue-600 hover:text-blue-700"
        >
          <LogoIcon className="w-8 h-8" />
          <h1 className="text-xl font-bold text-gray-900">{t('site.title')}</h1>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={handleInstallClick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('header.installExtension')}
          </button>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}