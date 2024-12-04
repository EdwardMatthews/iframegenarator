import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Free IFrame Generator & Code Maker | Create Embed Codes Online',
    template: '%s | Best IFrame Generator Tool'
  },
  description: 'Create and customize iframes with our free online iframe generator. Generate secure embed codes, create responsive iframes, and customize embed settings. The best iframe maker for secure website embedding.',
  keywords: [
    'iframe generator',
    'iframe code generator',
    'generate iframe',
    'iframe embed code',
    'embed code generator',
    'iframe maker',
    'create iframe',
    'website embed code generator',
    'responsive iframe generator',
    'secure iframe generator'
  ],
  authors: [{ name: 'IFrame Generator Team' }],
  creator: 'IFrame Generator',
  publisher: 'IFrame Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Free Online IFrame Generator & Embed Code Maker',
    description: 'Generate secure, customizable iframes instantly. Create responsive embed codes with our free iframe generator tool. Perfect for web developers and content creators.',
    type: 'website',
    url: '/',
    siteName: 'IFrame Generator',
    locale: 'en_US',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'IFrame Generator - Create Custom Embeds'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IFrame Generator - Create Custom Embeds',
    description: 'Free online tool to generate secure, customizable iframes. Perfect for web developers and content creators.',
    images: ['/twitter-image.jpg'],
    creator: '@iframegenerator',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
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
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 