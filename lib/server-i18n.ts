import { createInstance } from 'i18next';
import type { Locale } from '@/types';

const initI18next = async (locale: Locale) => {
  const i18nInstance = createInstance();
  
  // 直接加载翻译文件
  const translations = await import(`../public/locales/${locale}/common.json`);
  
  await i18nInstance.init({
    lng: locale,
    resources: {
      [locale]: {
        common: translations
      }
    },
    defaultNS: 'common',
    fallbackLng: false,
    interpolation: {
      escapeValue: false
    },
    returnNull: false,
    returnEmptyString: false,
    returnObjects: false
  });

  return i18nInstance;
};

export async function getTranslations(locale: Locale) {
  const i18nInstance = await initI18next(locale);
  
  return function translate(key: string, options?: Record<string, unknown>): string {
    const translated = i18nInstance.t(key, { ...options, lng: locale });
    return typeof translated === 'string' ? translated : key;
  };
}

export type TranslationFunction = (key: string, options?: Record<string, unknown>) => string;