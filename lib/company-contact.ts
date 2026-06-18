export const COMPANY_PHONE_PRIMARY = '+38970264159';
export const COMPANY_PHONE_PRIMARY_DISPLAY = '070/264-159';
export const COMPANY_PHONE_SECONDARY = '+38978264668';
export const COMPANY_PHONE_SECONDARY_DISPLAY = '078/264-668';
export const COMPANY_WHATSAPP_NUMBER = '38978264668';
export const COMPANY_WEBSITE_URL = 'https://bsekompani.mk';

export function getWhatsAppPageUrl(pagePath: string): string {
  const path = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;

  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }

  return `${COMPANY_WEBSITE_URL}${path === '/' ? '' : path}`;
}

type TranslateFn = (
  key: string,
  params?: Record<string, string | number>,
) => string;

export function getWhatsAppPrefillMessage(
  translate: TranslateFn,
  pagePath: string,
) {
  return translate('contact.whatsappPrefill', {
    website: COMPANY_WEBSITE_URL,
    page: getWhatsAppPageUrl(pagePath),
  });
}

export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}`;

  if (!message?.trim()) {
    return base;
  }

  return `${base}?text=${encodeURIComponent(message.trim())}`;
}
