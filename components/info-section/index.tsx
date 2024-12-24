import { getTranslations, TranslationFunction } from '@/lib/server-i18n';
import { 
  HiOutlineShieldCheck,
  HiOutlineCog6Tooth,
  HiOutlineEye,
  HiOutlineLockClosed,
  HiOutlineDevicePhoneMobile,
  HiOutlineUserGroup,
  HiOutlineGlobeAlt,
  HiOutlinePencilSquare,
  HiOutlineBeaker,
  HiOutlineClipboardDocument,
  HiOutlineChevronUp
} from 'react-icons/hi2';
import { Locale } from '@/types';

interface InfoSectionProps {
  locale: Locale;
}

export default async function InfoSection({ locale }: InfoSectionProps) {
  const t: TranslationFunction = await getTranslations(locale);

  const steps = [
    {
      title: t('info.howToUse.steps.0.title'),
      description: t('info.howToUse.steps.0.description'),
      icon: <HiOutlineGlobeAlt className="w-8 h-8 text-blue-500" />,
    },
    {
      title: t('info.howToUse.steps.1.title'),
      description: t('info.howToUse.steps.1.description'),
      icon: <HiOutlinePencilSquare className="w-8 h-8 text-blue-500" />,
    },
    {
      title: t('info.howToUse.steps.2.title'),
      description: t('info.howToUse.steps.2.description'),
      icon: <HiOutlineBeaker className="w-8 h-8 text-blue-500" />,
    },
    {
      title: t('info.howToUse.steps.3.title'),
      description: t('info.howToUse.steps.3.description'),
      icon: <HiOutlineClipboardDocument className="w-8 h-8 text-blue-500" />,
    },
  ];

  const features = [
    {
      title: t('info.features.check.title'),
      description: t('info.features.check.description'),
      icon: <HiOutlineShieldCheck className="w-8 h-8 text-blue-500 mb-4" />,
    },
    {
      title: t('info.features.customize.title'),
      description: t('info.features.customize.description'),
      icon: <HiOutlineCog6Tooth className="w-8 h-8 text-blue-500 mb-4" />,
    },
    {
      title: t('info.features.preview.title'),
      description: t('info.features.preview.description'),
      icon: <HiOutlineEye className="w-8 h-8 text-blue-500 mb-4" />,
    },
    {
      title: t('info.features.security.title'),
      description: t('info.features.security.description'),
      icon: <HiOutlineLockClosed className="w-8 h-8 text-blue-500 mb-4" />,
    },
    {
      title: t('info.features.responsive.title'),
      description: t('info.features.responsive.description'),
      icon: <HiOutlineDevicePhoneMobile className="w-8 h-8 text-blue-500 mb-4" />,
    },
    {
      title: t('info.features.accessibility.title'),
      description: t('info.features.accessibility.description'),
      icon: <HiOutlineUserGroup className="w-8 h-8 text-blue-500 mb-4" />,
    },
  ];

  const faqs = [
    {
      question: t('info.faq.what.question'),
      answer: t('info.faq.what.answer'),
    },
    {
      question: t('info.faq.security.question'),
      answer: t('info.faq.security.answer'),
    },
    {
      question: t('info.faq.compatibility.question'),
      answer: t('info.faq.compatibility.answer'),
    },
    {
      question: t('info.faq.responsive.question'),
      answer: t('info.faq.responsive.answer'),
    },
    {
      question: t('info.faq.customize.question'),
      answer: t('info.faq.customize.answer'),
    },
    {
      question: t('info.faq.implementation.question'),
      answer: t('info.faq.implementation.answer'),
    },
  ];

  return (
    <div className="space-y-24">
      {/* Features Section */}
      <section id="features-section" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('info.features.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-100 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use-section" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('info.howToUse.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-8 h-8 text-lg font-semibold text-blue-600 bg-blue-100 rounded-full">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('info.faq.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <summary 
                    className="flex justify-between w-full px-6 py-4 bg-white text-left text-gray-900 rounded-t-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors hover:cursor-pointer"
                  >
                    <span className="font-medium pr-6">{faq.question}</span>
                    <HiOutlineChevronUp
                      className="w-5 h-5 text-gray-500 transition-transform flex-shrink-0"
                    />
                  </summary>
                  <div className="px-6 py-4 bg-gray-50 text-gray-600 rounded-b-xl border-x border-b border-gray-100 prose prose-sm max-w-none">
                    <p>{faq.answer}</p>
                  </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
} 