'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/client-i18n';
import { languages } from '@/lib/settings';
import { Locale } from '@/types';
import { HiOutlineChevronDown } from 'react-icons/hi2';

interface LanguageSwitcherProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation(locale);

  const handleChange = (newLocale: string) => {
    // 从当前路径中移除当前语言代码，并添加新的语言代码
    const currentPathWithoutLocale = pathname.replace(`/${locale}`, '');
    if(newLocale === "en") {
      const newPath = `/${currentPathWithoutLocale}`;
      router.push(newPath);
    } else {
      const newPath = `/${newLocale}${currentPathWithoutLocale}`;
      router.push(newPath);
    }
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none bg-white px-4 py-2 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
      >
        {languages.map((lng) => (
          <option key={lng} value={lng}>
            {t(`language.${lng}`)}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <HiOutlineChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
} 