import MainContent from '@/components/MainContent';
import InfoSection from '@/components/info-section';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { getTranslations } from '@/lib/server-i18n';
import { headers } from 'next/headers';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { languages } from '@/lib/settings';
import LanguageDialog from '@/components/language-dialog';

// 语言名称映射
const localeNames = {
  'en': 'English',
  'zh': '中文'
};

function getLocale(acceptLanguage: string): string | null {
    try {
      const negotiator = new Negotiator({
        headers: { 'accept-language': acceptLanguage },
      });
      const browserLocales = negotiator.languages();
      
      // 直接检查浏览器语言列表中是否包含我们支持的非英语语言
      for (const browserLocale of browserLocales) {
        // 获取语言的主要部分（例如 'zh-CN' -> 'zh'）
        const mainLang = browserLocale.split('-')[0];
        
        // 检查是否是支持的非英语语言
        if (languages.includes(mainLang) && mainLang !== 'en') {
          return mainLang;
        }
      }
      
      // 如果没有找到支持的非英语语言，返回 null
      return null;
    } catch {
      return null;
    }
}
  

export default async function HomePage() {
  // 默认使用英文
  const t = await getTranslations('en');

  // 获取浏览器语言
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const detectedLocale = getLocale(acceptLanguage);
  
  return (
    <>
      <Header locale="en" />
      <main>
        <h1 className="sr-only">{t('page.h1')}</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section aria-label={t('page.label')} id="features-section">
            <h2 className="text-2xl font-bold mb-6">{t('page.heading')}</h2>
            <MainContent locale="en" />
          </section>
          <InfoSection locale="en" />
        </div>
      </main>
      <Footer locale="en" />
      {detectedLocale && (
        <LanguageDialog 
          detectedLocale={detectedLocale} 
          localeName={localeNames[detectedLocale as keyof typeof localeNames]} 
        />
      )}
    </>
  );
}