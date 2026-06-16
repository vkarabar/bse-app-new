export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  website?: string;
  botcheck?: string;
  formLoadedAt?: number;
};

const MIN_FORM_SECONDS = 2;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_SUBJECT_LENGTH = 200;
const MAX_URLS_IN_MESSAGE = 5;

function countUrls(text: string) {
  const matches = text.match(/https?:\/\/|www\./gi);
  return matches?.length ?? 0;
}

function hasHoneypotValue(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateContactPayload(data: unknown):
  | { ok: true; payload: ContactPayload }
  | { ok: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Невалидни податоци.' };
  }

  const body = data as Record<string, unknown>;

  if (hasHoneypotValue(body.website) || hasHoneypotValue(body.botcheck)) {
    return { ok: false, error: 'Невалидна порака.' };
  }

  const formLoadedAt = Number(body.formLoadedAt);
  if (
    !Number.isFinite(formLoadedAt) ||
    Date.now() - formLoadedAt < MIN_FORM_SECONDS * 1000
  ) {
    return { ok: false, error: 'Почекајте малку пред да ја испратите формата.' };
  }

  const name = String(body.name ?? '').trim();
  if (name.length < 2) {
    return { ok: false, error: 'Внесете име и презиме.' };
  }

  const phone = String(body.phone ?? '').trim();
  if (phone.length < 8) {
    return { ok: false, error: 'Внесете валиден телефон.' };
  }

  const email = String(body.email ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Внесете валидна email адреса.' };
  }

  const message = String(body.message ?? '').trim();
  if (message.length < 10) {
    return { ok: false, error: 'Пораката мора да има најмалку 10 карактери.' };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: 'Пораката е премногу долга.' };
  }

  if (countUrls(message) > MAX_URLS_IN_MESSAGE) {
    return { ok: false, error: 'Пораката содржи премногу линкови.' };
  }

  const subjectRaw = String(body.subject ?? '').trim();
  const subject = subjectRaw || undefined;

  if (subject && subject.length > MAX_SUBJECT_LENGTH) {
    return { ok: false, error: 'Насловот е премногу долг.' };
  }

  return {
    ok: true,
    payload: {
      name,
      phone,
      email,
      subject,
      message,
    },
  };
}
