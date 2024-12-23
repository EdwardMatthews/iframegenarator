import MainContent from '@/components/MainContent';
import InfoSection from '@/components/info-section';
import { Locale } from '@/types';
import { getTranslations, TranslationFunction } from '@/lib/server-i18n';

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const t: TranslationFunction = await getTranslations(locale);
  return (
    <main>
      <h1 className="sr-only">{t('page.h1')}</h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section aria-label={t('page.label')} id="features-section">
          <h2 className="text-2xl font-bold mb-6">{t('page.heading')}</h2>
          <MainContent locale={locale} />
        </section>
        <InfoSection locale={locale} />
      </div>
    </main>
  );
}