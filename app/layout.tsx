import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

// 只为根路径 / 提供基本的 metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://www.iframegenerator.pro/'),
  title: 'Free IFrame Generator & Code Maker | Create Embed Codes Online',
  description: 'Create and customize iframes with our free online iframe generator. Generate secure embed codes, create responsive iframes, and customize embed settings. The best iframe maker for secure website embedding.',
  openGraph: {
    type: 'website',
    url: 'https://www.iframegenerator.pro/',
  },
  alternates: {
    canonical: 'https://www.iframegenerator.pro/',
    languages: {
      'en': 'https://www.iframegenerator.pro/en',
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