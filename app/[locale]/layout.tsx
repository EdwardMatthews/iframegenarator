import { Inter } from 'next/font/google';
import { languages } from '@/lib/settings';
import { Locale } from '@/types';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Metadata } from 'next';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  // 动态导入当前语言的翻译文件
  const translation = await import(`@/public/locales/${locale}/common.json`);
  const metadata = translation.metadata;

  return {
    metadataBase: new URL('https://www.iframegenerator.pro'),
    title: metadata.title,
    description: metadata.description,
    authors: [{ name: metadata.authors }],
    creator: metadata.creator,
    publisher: metadata.publisher,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: metadata.og.title,
      description: metadata.og.description,
      type: 'website',
      url: '/',
      siteName: metadata.og.siteName,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      images: [{
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IFrame Generator - Create Custom Embeds'
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.twitter.title,
      description: metadata.twitter.description,
      images: ['/twitter-image.jpg'],
      creator: metadata.twitter.creator,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/',
        'zh': '/zh',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: '7mDEZmv48BopWb7DXy2L56EF5u1ZrXkojc5DcmyiNec',
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <>
      <GoogleAnalytics />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}