'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/client-i18n';
import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import { IframeConfig as IframeConfigType, Locale } from '@/types';

interface IframeConfigProps {
  config: IframeConfigType;
  setConfig: (config: IframeConfigType) => void;
  locale: Locale;
}

export default function IframeConfig({ config, setConfig, locale }: IframeConfigProps) {
  const { t } = useTranslation(locale);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="h-7 bg-gray-200 w-1/3 rounded"></div>
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 w-1/4 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const sandboxOptions = [
    'allow-scripts',
    'allow-same-origin',
    'allow-forms',
    'allow-popups',
    'allow-modals',
    'allow-orientation-lock',
    'allow-pointer-lock',
    'allow-presentation',
    'allow-top-navigation',
    'allow-downloads',
    'allow-storage-access-by-user-activation',
  ];

  const allowOptions = [
    'camera',
    'microphone',
    'display-capture',
    'geolocation',
    'fullscreen',
    'autoplay',
    'clipboard-write',
    'clipboard-read',
    'payment',
  ];

  const updateConfig = (key: string, value: string | string[]) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900">{t('config.title')}</h2>
      
      {/* 尺寸设置 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">{t('config.dimensions')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t('config.width')}</label>
            <input
              type="text"
              value={config.width}
              onChange={(e) => updateConfig('width', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t('config.height')}</label>
            <input
              type="text"
              value={config.height}
              onChange={(e) => updateConfig('height', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 边框设置 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">{t('config.border')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t('config.borderWidth')}</label>
            <input
              type="text"
              value={config.borderWidth}
              onChange={(e) => updateConfig('borderWidth', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t('config.borderStyle')}</label>
            <select
              value={config.borderStyle}
              onChange={(e) => updateConfig('borderStyle', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="none">{t('config.borderStyles.none')}</option>
              <option value="solid">{t('config.borderStyles.solid')}</option>
              <option value="dashed">{t('config.borderStyles.dashed')}</option>
              <option value="dotted">{t('config.borderStyles.dotted')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t('config.borderColor')}</label>
            <input
              type="color"
              value={config.borderColor}
              onChange={(e) => updateConfig('borderColor', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t('config.borderRadius')}</label>
            <input
              type="text"
              value={config.borderRadius}
              onChange={(e) => updateConfig('borderRadius', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Sandbox 选项 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">
          {t('config.sandbox.title')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {sandboxOptions.map((option) => (
            <div key={option} className="flex items-center">
              <Switch
                checked={config.sandbox.includes(option)}
                onChange={(checked) => {
                  const newSandbox = checked
                    ? [...config.sandbox, option]
                    : config.sandbox.filter((item) => item !== option);
                  updateConfig('sandbox', newSandbox);
                }}
                className={`${
                  config.sandbox.includes(option) ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors mr-3`}
              >
                <span
                  className={`${
                    config.sandbox.includes(option) ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <span className="text-sm text-gray-600">
                {t(`config.sandbox.options.${option}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Allow 选项 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">
          {t('config.allow.title')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {allowOptions.map((option) => (
            <div key={option} className="flex items-center">
              <Switch
                checked={config.allow.includes(option)}
                onChange={(checked) => {
                  const newAllow = checked
                    ? [...config.allow, option]
                    : config.allow.filter((item) => item !== option);
                  updateConfig('allow', newAllow);
                }}
                className={`${
                  config.allow.includes(option) ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors mr-3`}
              >
                <span
                  className={`${
                    config.allow.includes(option) ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <span className="text-sm text-gray-600">{t(`config.allow.options.${option}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 