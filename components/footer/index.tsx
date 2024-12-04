'use client';

import { useTranslation } from '@/lib/client-i18n';
import { Locale } from '@/types';
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaGithub
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const { t } = useTranslation(locale);
  const [currentUrl, setCurrentUrl] = useState('');
  const [shareText, setShareText] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
    setShareText(t('footer.shareText'));
  }, [t]);

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <FaTwitter className="w-5 h-5" />,
      getHref: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#1DA1F2]'
    },
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-5 h-5" />,
      getHref: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#4267B2]'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-5 h-5" />,
      getHref: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#0077B5]'
    },
    {
      name: 'GitHub',
      icon: <FaGithub className="w-5 h-5" />,
      href: 'https://github.com/yourusername/iframe-generator',
      color: 'hover:text-gray-900'
    }
  ];

  if (!currentUrl) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* 社交媒体分享按钮 */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href || link.getHref?.()}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 transition-colors ${link.color} hover:scale-110 transform`}
                aria-label={`Share on ${link.name}`}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* 版权信息 */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
} 