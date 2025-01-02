import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

// 只为根路径 / 提供基本的 metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://www.iframegenerator.pro/'),
  title: 'Free IFrame Generator: Create Secure Embed Codes',
  description: 'Create secure, customized iframes effortlessly with our online generator. Preview changes live and ensure mobile-friendly, accessible embeds.',
  openGraph: {
    type: 'website',
    url: 'https://www.iframegenerator.pro/',
  },
  alternates: {
    canonical: 'https://www.iframegenerator.pro/',
    languages: {
      'en': 'https://www.iframegenerator.pro/',
      'zh': 'https://www.iframegenerator.pro/zh'
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        {children}
      </body>
    </html>
  );
} 