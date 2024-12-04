'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/client-i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/types';
import { 
  HiOutlineShieldCheck,
  HiOutlineArrowPath,
  HiOutlineShieldExclamation,
  HiOutlineXCircle
} from 'react-icons/hi2';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  setIsValidUrl: (isValid: boolean) => void;
  locale: Locale;
}

export default function UrlInput({ url, setUrl, setIsValidUrl, locale }: UrlInputProps) {
  const { t } = useTranslation(locale);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
          <div className="w-24 h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  };

  const checkUrl = async (urlString: string) => {
    setIsChecking(true);
    setError('');

    if (!isValidUrl(urlString)) {
      setError('invalid');
      setIsValidUrl(false);
      setIsChecking(false);
      return;
    }
    
    try {
      // 直接使用后端代理进行检查，避免CORS问题
      const response = await fetch('/api/check-iframe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: urlString,
          origin: window.location.origin 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to check URL');
      }

      const data = await response.json();
      
      if (!data.allowed) {
        setError('notAllowed');
        setIsValidUrl(false);
        console.debug('URL not allowed:', data.reason); // 帮助调试
      } else {
        setIsValidUrl(true);
      }
    } catch (err) {
      console.error('Error checking URL:', err);
      setError('notAllowed');
      setIsValidUrl(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 mb-12"
    >
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('url.placeholder')}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all outline-none
              ${error 
                ? 'border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50' 
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }`}
          />
          <HiOutlineShieldCheck 
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
              ${error ? 'text-red-400' : 'text-gray-400'}`} 
          />
        </div>
        <button
          onClick={() => checkUrl(url)}
          disabled={!url || isChecking}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 min-w-[120px] justify-center"
        >
          {isChecking ? (
            <HiOutlineArrowPath className="w-5 h-5 animate-spin" />
          ) : (
            <HiOutlineShieldCheck className="w-5 h-5" />
          )}
          {isChecking ? t('url.checking') : t('url.check')}
        </button>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-lg p-4 flex items-start gap-3 ${
              error === 'notAllowed' ? 'bg-red-50' : 'bg-yellow-50'
            }`}
          >
            {error === 'notAllowed' ? (
              <HiOutlineShieldExclamation className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            ) : (
              <HiOutlineXCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className={`font-medium ${
                error === 'notAllowed' ? 'text-red-800' : 'text-yellow-800'
              }`}>
                {error === 'notAllowed' ? t('url.error.notAllowed.title') : t('url.error.invalid.title')}
              </p>
              <p className={`text-sm ${
                error === 'notAllowed' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {error === 'notAllowed' ? t('url.error.notAllowed.description') : t('url.error.invalid.description')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 