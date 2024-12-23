'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { useTranslation } from '@/lib/client-i18n';

interface LanguageDialogProps {
  detectedLocale: string;
  localeName: string;
}

export default function LanguageDialog({ detectedLocale, localeName }: LanguageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('en'); // 使用英文翻译，因为这是根路径

  useEffect(() => {
    // 检查用户是否已经做出了语言选择
    const languagePreference = localStorage.getItem('languagePreference');
    
    // 如果用户还没有做出选择，显示对话框
    if (!languagePreference) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    localStorage.setItem('languagePreference', detectedLocale);
    router.push(`/${detectedLocale}`);
  };

  const handleCancel = () => {
    setIsOpen(false);
    localStorage.setItem('languagePreference', 'en');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {t('languageDialog.title')}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-6">
            {t('languageDialog.description', { language: localeName })}
          </Dialog.Description>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={handleCancel}
            >
              {t('languageDialog.stayInEnglish')}
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={handleConfirm}
            >
              {t('languageDialog.switchLanguage', { language: localeName })}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}