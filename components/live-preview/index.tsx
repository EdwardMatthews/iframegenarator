'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/client-i18n';
import { motion } from 'framer-motion';
import { IframeConfig, Locale } from '@/types';

interface LivePreviewProps {
  url: string;
  config: IframeConfig;
  locale: Locale;
}

export default function LivePreview({ url, config, locale }: LivePreviewProps) {
  const { t } = useTranslation(locale);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-100">
          <div className="h-5 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-[500px] bg-gray-100"></div>
      </div>
    );
  }

  const handleLoad = () => {
    setIframeLoading(false);
    setError('');
  };

  const handleError = () => {
    setIframeLoading(false);
    setError(t('preview.error'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-4 py-2 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-700">{t('preview.live')}</h3>
      </div>
      <div className="relative">
        {iframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <iframe
          src={url}
          sandbox={config.sandbox.join(' ')}
          allow={config.allow.join('; ')}
          style={{
            width: config.width,
            height: config.height,
            padding: config.padding,
            margin: config.margin,
            border: `${config.borderWidth} ${config.borderStyle} ${config.borderColor}`,
            borderRadius: config.borderRadius,
            backgroundColor: config.backgroundColor,
          }}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full"
        />
      </div>
    </motion.div>
  );
} 