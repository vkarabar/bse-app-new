import { NextResponse } from 'next/server';
import { getLocale } from '@/lib/i18n/get-locale';
import { getDictionary, createTranslator } from '@/lib/i18n/get-dictionary';
import { validateOrderPayload } from '@/lib/orders';
import { sendOrderEmail } from '@/lib/send-order-email';
import { getEmailErrorMessage } from '@/lib/smtp';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const locale = await getLocale();
    const t = createTranslator(getDictionary(locale));

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: t('orders.validation.invalidData') },
        { status: 400 },
      );
    }

    const result = validateOrderPayload(body, t);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await sendOrderEmail(result.payload);

    return NextResponse.json({
      ok: true,
      message: t('orders.success'),
    });
  } catch (error) {
    console.error('Order email failed:', error);

    return NextResponse.json(
      { error: getEmailErrorMessage(error) },
      { status: 500 },
    );
  }
}
