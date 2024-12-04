'use client';

import { useTranslation } from '@/lib/client-i18n';
import LanguageSwitcher from '@/components/language-switcher';
import { Locale } from '@/types';
import { LogoIcon } from '@/components/icons';
import Link from 'next/link';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const { t } = useTranslation(locale);

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
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
} 