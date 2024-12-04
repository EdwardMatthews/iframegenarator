import { Inter } from 'next/font/google';
import { languages } from '@/lib/settings';
import { Locale } from '@/types';
import Header from '@/components/header';
import Footer from '@/components/footer';
// import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'IFrame Generator',
//   description: 'Generate and customize iframe code with live preview',
// };

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
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
} 