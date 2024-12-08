'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import UrlInput from '@/components/url-input';
import IframeConfig from '@/components/iframe-config';
import CodePreview from '@/components/code-preview';
import LivePreview from '@/components/live-preview';
import InfoSection from '@/components/info-section';
import { motion } from 'framer-motion';
import { IframeConfig as IframeConfigType, Locale } from '@/types';
import { useTranslation } from '@/lib/client-i18n';

export default function HomePage() {
  const params = useParams();
  const locale = (params.locale || 'en') as Locale;
  const { t } = useTranslation(locale);
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [iframeConfig, setIframeConfig] = useState<IframeConfigType>({
    width: '100%',
    height: '750px',
    padding: '0',
    margin: '0',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    sandbox: ['allow-scripts', 'allow-same-origin'],
    allow: ['camera', 'microphone'],
  });

  return (
    <main>
      <h1 className="sr-only">{t('page.h1')}</h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <section aria-label={t('page.label')} id="features-section">
            <h2 className="text-2xl font-bold mb-6">{t('page.heading')}</h2>
            <UrlInput 
              url={url} 
              setUrl={setUrl}
              setIsValidUrl={setIsValidUrl}
              locale={locale}
            />
            
            {isValidUrl && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <IframeConfig 
                  config={iframeConfig}
                  setConfig={setIframeConfig}
                  locale={locale}
                />
                <div className="space-y-8">
                  <CodePreview 
                    url={url}
                    config={iframeConfig}
                    locale={locale}
                  />
                  <LivePreview 
                    url={url}
                    config={iframeConfig}
                    locale={locale}
                  />
                </div>
              </div>
            )}
          </section>

          <InfoSection locale={locale} />
        </motion.div>
      </div>
    </main>
  );
} 