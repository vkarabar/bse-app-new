import nodemailer from 'nodemailer';

function readEnv(name: string) {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : undefined;
}

export function getSmtpConfig() {
  const host = readEnv('SMTP_HOST');
  const user = readEnv('SMTP_USER');
  const pass = readEnv('SMTP_PASS');
  const port = Number(readEnv('SMTP_PORT') ?? 465);

  if (!host || !user || !pass) {
    throw new Error(
      'SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local',
    );
  }

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error('SMTP_PORT must be a valid port number.');
  }

  return { host, user, pass, port };
}

export function getTransporter() {
  const { host, user, pass, port } = getSmtpConfig();
  const rejectUnauthorized = readEnv('SMTP_TLS_REJECT_UNAUTHORIZED') !== 'false';

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    requireTLS: port === 587,
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized,
    },
  });
}

export function getNotificationEmail() {
  return (
    readEnv('CONTACT_EMAIL') ??
    readEnv('ORDER_EMAIL') ??
    readEnv('SMTP_USER')
  );
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getEmailErrorMessage(error: unknown): string {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  if (
    message.includes('smtp is not configured') ||
    message.includes('must be set in .env')
  ) {
    return 'Email серверот не е конфигуриран. Контактирајте го администраторот.';
  }

  if (
    message.includes('invalid login') ||
    message.includes('authentication') ||
    message.includes('eauth') ||
    message.includes('username and password') ||
    message.includes('535')
  ) {
    return 'Email најавата не успеа. Проверете SMTP_USER и SMTP_PASS во .env.local.';
  }

  if (
    message.includes('etimedout') ||
    message.includes('econnrefused') ||
    message.includes('connect') ||
    message.includes('getaddrinfo')
  ) {
    return 'Не може да се поврзе со email серверот. Проверете SMTP_HOST и SMTP_PORT.';
  }

  if (message.includes('certificate') || message.includes('tls')) {
    return 'TLS грешка кон email серверот. За cPanel користете SMTP_PORT=465 или поставете SMTP_TLS_REJECT_UNAUTHORIZED=false.';
  }

  return 'Настана грешка при испраќање. Обидете се повторно или јавете се директно.';
}
