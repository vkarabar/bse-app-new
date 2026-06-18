import { getDictionary, createTranslator } from '@/lib/i18n/get-dictionary';
import {
  formatMotoriPortiSummary,
  formatOrderDimensionLines,
  getMotoriPortiTotal,
  type OrderPayload,
} from '@/lib/orders';
import { formatEur } from '@/lib/order-pricing';
import {
  escapeHtml,
  getNotificationEmail,
  getNotificationEmails,
  getTransporter,
} from '@/lib/smtp';

function getOrderTranslator() {
  return createTranslator(getDictionary('mk'));
}

function buildOrderDetailsLines(order: OrderPayload): string[] {
  const t = getOrderTranslator();

  if (order.product === 'motori-porti') {
    return formatMotoriPortiSummary(order, t).split('\n').filter(Boolean);
  }

  const lines = [...formatOrderDimensionLines(order, t)];
  if (order.color) {
    lines.push(`${t('orders.reviewLabels.color')}: ${t(`colors.${order.color}`)}`);
  }
  if (order.mountingRequested !== undefined) {
    lines.push(
      `${t('orders.reviewLabels.mountingRequested')}: ${order.mountingRequested ? t('wizard.garageDoor.summary.yes') : t('wizard.garageDoor.summary.no')}`,
    );
  }
  if (order.installTimeline) {
    lines.push(
      `${t('orders.reviewLabels.installTimeline')}: ${t(`wizard.garageDoor.contact.timeline.${order.installTimeline}`)}`,
    );
  }
  if (
    order.remoteCount !== undefined &&
    order.motorRequested !== false
  ) {
    lines.push(
      `${t('orders.reviewLabels.remoteCount')}: ${order.remoteCount}`,
    );
  }
  return lines;
}

function getProductLabel(order: OrderPayload) {
  const t = getOrderTranslator();
  return t(`orders.productLabels.${order.product}`);
}

function buildAdminEmailHtml(order: OrderPayload) {
  const productLabel = getProductLabel(order);

  const row = (label: string, value: string) =>
    `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`;

  const detailsHtml = buildOrderDetailsLines(order)
    .map(escapeHtml)
    .join('<br>');

  return `
    <h2>Нова нарачка од веб-страницата</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;">
      ${row('Производ', productLabel)}
      <tr><td><strong>Детали</strong></td><td>${detailsHtml}</td></tr>
      ${row('Име', order.name)}
      ${row('Телефон', order.phone)}
      ${row('Email', order.email)}
      ${order.city ? row('Град', order.city) : ''}
      ${order.notes ? row('Забелешка', order.notes) : ''}
    </table>
  `;
}

function buildCustomerConfirmationHtml(order: OrderPayload) {
  const productLabel = getProductLabel(order);
  const total = getMotoriPortiTotal(order);

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px 8px 0;color:#475569;vertical-align:top;">${label}</td><td style="padding:8px 0;"><strong>${escapeHtml(value)}</strong></td></tr>`;

  const detailsRows = buildOrderDetailsLines(order)
    .map((line) => {
      const colon = line.indexOf(':');
      if (colon === -1) return row('Детали', line);
      return row(line.slice(0, colon).trim(), line.slice(colon + 1).trim());
    })
    .join('');

  const priceBlock =
    total !== null
      ? `<p style="margin:20px 0 0;font-size:16px;"><strong>Проценета вкупна цена:</strong> ${escapeHtml(formatEur(total))}</p>`
      : `<p style="margin:20px 0 0;padding:14px 16px;background:#f8fafc;border-radius:8px;color:#334155;">За овој производ ќе ве контактираме наскоро со точна понуда за цена и рок за монтажа.</p>`;

  return `
    <div style="font-family:sans-serif;color:#0f172a;max-width:560px;">
      <p style="font-size:16px;">Почитуван/а ${escapeHtml(order.name)},</p>
      <p style="color:#334155;">Ви благодариме за вашата нарачка. Подолу се деталите што ги примивме:</p>
      <table cellpadding="0" cellspacing="0" style="margin-top:16px;border-top:1px solid #e2e8f0;width:100%;">
        ${row('Производ', productLabel)}
        ${detailsRows}
        ${order.city ? row('Град', order.city) : ''}
        ${order.notes ? row('Забелешка', order.notes) : ''}
      </table>
      ${priceBlock}
      <p style="margin:24px 0 0;color:#334155;">Ќе ве контактираме наскоро на ${escapeHtml(order.phone)} или ${escapeHtml(order.email)}.</p>
      <p style="margin:24px 0 0;color:#64748b;font-size:14px;">
        Со почит,<br>
        <strong>БСЕ Компани</strong><br>
        070/264-159 · 078/264-668<br>
        contact@bsekompani.mk
      </p>
    </div>
  `;
}

function buildCustomerConfirmationText(order: OrderPayload) {
  const productLabel = getProductLabel(order);
  const total = getMotoriPortiTotal(order);

  const lines = [
    `Почитуван/а ${order.name},`,
    '',
    'Ви благодариме за вашата нарачка. Подолу се деталите:',
    '',
    `Производ: ${productLabel}`,
    ...buildOrderDetailsLines(order),
  ];

  if (order.city) lines.push(`Град: ${order.city}`);
  if (order.notes) lines.push(`Забелешка: ${order.notes}`);

  lines.push('');

  if (total !== null) {
    lines.push(`Проценета вкупна цена: ${formatEur(total)}`);
  } else {
    lines.push(
      'За овој производ ќе ве контактираме наскоро со точна понуда за цена и рок за монтажа.',
    );
  }

  lines.push(
    '',
    `Ќе ве контактираме наскоро на ${order.phone} или ${order.email}.`,
    '',
    'Со почит,',
    'БСЕ Компани',
    '070/264-159 · 078/264-668',
    'contact@bsekompani.mk',
  );

  return lines.join('\n');
}

async function sendOrderNotificationToBusiness(order: OrderPayload) {
  const recipients = getNotificationEmails();
  if (recipients.length === 0) {
    throw new Error('ORDER_EMAIL or SMTP_USER must be set in .env');
  }

  const transporter = getTransporter();
  const productLabel = getProductLabel(order);

  await transporter.sendMail({
    from: `"BSE Web Нарачки" <${process.env.SMTP_USER}>`,
    to: recipients,
    replyTo: order.email,
    subject: `Нова нарачка: ${productLabel} — ${order.name}`,
    html: buildAdminEmailHtml(order),
    text: [
      `Производ: ${productLabel}`,
      ...buildOrderDetailsLines(order),
      `Име: ${order.name}`,
      `Телефон: ${order.phone}`,
      `Email: ${order.email}`,
      order.city ? `Град: ${order.city}` : '',
      order.notes ? `Забелешка: ${order.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  });
}

async function sendOrderConfirmationToCustomer(order: OrderPayload) {
  const transporter = getTransporter();
  const productLabel = getProductLabel(order);
  const businessEmail = getNotificationEmail() ?? process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"БСЕ Компани" <${process.env.SMTP_USER}>`,
    to: order.email,
    replyTo: businessEmail,
    subject: `Потврда на нарачка — ${productLabel}`,
    html: buildCustomerConfirmationHtml(order),
    text: buildCustomerConfirmationText(order),
  });
}

export async function sendOrderEmail(order: OrderPayload) {
  await sendOrderNotificationToBusiness(order);

  try {
    await sendOrderConfirmationToCustomer(order);
  } catch (error) {
    console.error('Customer order confirmation email failed:', error);
  }
}
