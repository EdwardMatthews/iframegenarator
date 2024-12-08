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

interface ToolLink {
  name: string;
  url: string;
  description: string;
}

export default function Footer({ locale }: FooterProps) {
  const { t } = useTranslation(locale);
  const [currentUrl, setCurrentUrl] = useState('');
  const [shareText, setShareText] = useState('');

  useEffect(() => {
    setCurrentUrl("https://iframegenerator.pro/");
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
      href: 'https://github.com/EdwardMatthews/iframegenarator',
      color: 'hover:text-gray-900'
    }
  ];

  const navigationLinks = [
    { key: 'home', href: '/' },
    { key: 'features', href: '#features-section' },
    { key: 'howToUse', href: '#how-to-use-section' },
    { key: 'faq', href: '#faq-section' }
  ];

  // 获取工具链接数组
  const toolLinks = t('footer.tools.links', { returnObjects: true }) as ToolLink[];

  if (!currentUrl) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 网站介绍 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t('site.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('footer.about.description')}
            </p>
          </div>

          {/* 页面导航 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {t('footer.navigation.title')}
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {t(`footer.navigation.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 推荐工具 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {t('footer.tools.title')}
            </h3>
            <ul className="space-y-3">
              {Array.isArray(toolLinks) && toolLinks.map((tool) => (
                <li key={tool.url}>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                    title={tool.description}
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 社交分享 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {t('footer.share')}
            </h3>
            <div className="flex space-x-4">
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
          </div>
        </div>

        {/* 版权��息 */}
        <div className="pt-8 mt-8 border-t border-gray-100">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
} 