import type { ContactPayload } from '@/lib/contact';
import { escapeHtml, getNotificationEmails, getTransporter } from '@/lib/smtp';

function buildEmailHtml(contact: ContactPayload) {
  const row = (label: string, value: string) =>
    `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`;

  return `
    <h2>Нова контакт порака од веб-страницата</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;">
      ${contact.subject ? row('Наслов', contact.subject) : ''}
      ${row('Име', contact.name)}
      ${row('Телефон', contact.phone)}
      ${row('Email', contact.email)}
      <tr><td><strong>Порака</strong></td><td style="white-space:pre-wrap;">${escapeHtml(contact.message)}</td></tr>
    </table>
  `;
}

export async function sendContactEmail(contact: ContactPayload) {
  const recipients = getNotificationEmails();
  if (recipients.length === 0) {
    throw new Error('CONTACT_EMAIL, ORDER_EMAIL or SMTP_USER must be set in .env');
  }

  const transporter = getTransporter();
  const subjectLine = contact.subject
    ? `\u041a\u043e\u043d\u0442\u0430\u043a\u0442 \u043f\u043e\u0440\u0430\u043a\u0430: ${contact.subject} \u2014 ${contact.name}`
    : `\u041a\u043e\u043d\u0442\u0430\u043a\u0442 \u043f\u043e\u0440\u0430\u043a\u0430 \u2014 ${contact.name}`;

  await transporter.sendMail({
    from: `"BSE Web" <${process.env.SMTP_USER}>`,
    to: recipients,
    replyTo: contact.email,
    subject: subjectLine,
    html: buildEmailHtml(contact),
    text: [
      contact.subject ? `Наслов: ${contact.subject}` : '',
      `Име: ${contact.name}`,
      `Телефон: ${contact.phone}`,
      `Email: ${contact.email}`,
      `Порака:\n${contact.message}`,
    ]
      .filter(Boolean)
      .join('\n'),
  });
}
