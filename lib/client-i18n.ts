'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getOptions } from './settings';

// 初始化标志
let initialized = false;

// 初始化i18next实例
const i18n = i18next.createInstance();

const initI18next = async (locale: string) => {
  if (initialized) {
    return;
  }

  // 预加载当前语言的翻译文件
  const translation = await import(`../public/locales/${locale}/common.json`);

  await i18n
    .use(initReactI18next)
    .init({
      ...getOptions(locale),
      lng: locale,
      resources: {
        [locale]: {
          common: translation
        }
      },
      react: {
        useSuspense: false
      }
    });

  initialized = true;
};

export function useTranslation(locale: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initI18next(locale);
      
      if (i18n.language !== locale) {
        const translation = await import(`../public/locales/${locale}/common.json`);
        i18n.addResourceBundle(locale, 'common', translation);
        await i18n.changeLanguage(locale);
      }
      
      setIsReady(true);
    };

    init();
  }, [locale]);

  if (!isReady) {
    return {
      t: (key: string) => key,
      i18n: i18n
    };
  }

  return {
    t: i18n.getFixedT(locale, 'common'),
    i18n: i18n
  };
} 