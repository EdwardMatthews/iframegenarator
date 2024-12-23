'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IframeConfig as IframeConfigType, Locale } from '@/types';
import UrlInput from '@/components/url-input';
import IframeConfig from '@/components/iframe-config';
import CodePreview from '@/components/code-preview';
import LivePreview from '@/components/live-preview';
import { useTranslation } from '@/lib/client-i18n';

export default function MainContent({ locale }: { locale: Locale }) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
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
    </motion.div>
  );
}