import { ContactForm } from '@/components/contact-form';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import {
  COMPANY_PHONE_PRIMARY,
  COMPANY_PHONE_PRIMARY_DISPLAY,
  COMPANY_PHONE_SECONDARY,
  COMPANY_PHONE_SECONDARY_DISPLAY,
  getWhatsAppPrefillMessage,
  getWhatsAppUrl,
} from '@/lib/company-contact';
const ContactPage = async () => {
  const { t } = await getServerTranslations();
  const whatsAppUrl = getWhatsAppUrl(getWhatsAppPrefillMessage(t, '/contact'));

  return (    <div>
      <h1 className="section-title text-xl border-b-4 !mb-6">{t('contact.title')}</h1>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <p className="text-slate-700">{t('contact.intro')}</p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">
                {t('contact.phone')}
              </p>
              <a
                href={`tel:${COMPANY_PHONE_PRIMARY}`}
                className="block font-semibold text-sky-700 hover:text-sky-800"
              >
                {COMPANY_PHONE_PRIMARY_DISPLAY}
              </a>
              <a
                href={`tel:${COMPANY_PHONE_SECONDARY}`}
                className="block font-semibold text-sky-700 hover:text-sky-800 mt-1"
              >
                {COMPANY_PHONE_SECONDARY_DISPLAY}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">
                {t('contact.whatsapp')}
              </p>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold text-green-700 hover:text-green-800"
              >
                {COMPANY_PHONE_SECONDARY_DISPLAY}
              </a>
            </div>            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">
                {t('contact.email')}
              </p>
              <a
                href="mailto:contact@bsekompani.mk"
                className="font-semibold text-sky-700 hover:text-sky-800"
              >
                contact@bsekompani.mk
              </a>
            </div>
          </div>
        </div>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-8">
          <h2 className="desc-title text-lg mb-1">{t('contact.formTitle')}</h2>
          <p className="text-slate-600 text-sm mb-6">{t('contact.formSubtitle')}</p>
          <ContactForm />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
