'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/client-i18n';
import { motion } from 'framer-motion';
import { 
  HiOutlineClipboard,
  HiOutlineCheck 
} from 'react-icons/hi2';
import { Locale } from '@/types';

interface CodePreviewProps {
  url: string;
  locale: Locale;
  config: {
    width: string;
    height: string;
    padding: string;
    margin: string;
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
    borderRadius: string;
    backgroundColor: string;
    sandbox: string[];
    allow: string[];
  };
}

export default function CodePreview({ url, config, locale }: CodePreviewProps) {
  const { t } = useTranslation(locale);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
          <div className="h-5 w-24 bg-gray-700 rounded"></div>
          <div className="h-8 w-8 bg-gray-700 rounded"></div>
        </div>
        <div className="p-4">
          <div className="h-20 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  const generateCode = () => {
    const style = `style="width: ${config.width}; height: ${config.height}; padding: ${config.padding}; margin: ${config.margin}; border: ${config.borderWidth} ${config.borderStyle} ${config.borderColor}; border-radius: ${config.borderRadius}; background-color: ${config.backgroundColor};"`;
    const sandbox = config.sandbox.length ? ` sandbox="${config.sandbox.join(' ')}"` : '';
    const allow = config.allow.length ? ` allow="${config.allow.join('; ')}"` : '';
    
    return `<iframe src="${url}"${sandbox}${allow} ${style}></iframe>`;
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <h3 className="text-sm font-medium text-gray-200">{t('preview.code')}</h3>
        <button
          onClick={copyCode}
          className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
        >
          {copied ? (
            <HiOutlineCheck className="w-5 h-5" />
          ) : (
            <HiOutlineClipboard className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300">
          <code>{generateCode()}</code>
        </pre>
      </div>
    </motion.div>
  );
} 