import { NextResponse } from 'next/server';
import { validateOrderPayload } from '@/lib/orders';
import { sendOrderEmail } from '@/lib/send-order-email';
import { getEmailErrorMessage } from '@/lib/smtp';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateOrderPayload(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await sendOrderEmail(result.payload);

    return NextResponse.json({
      ok: true,
      message: 'Нарачката е успешно испратена. Ќе ве контактираме наскоро.',
    });
  } catch (error) {
    console.error('Order email failed:', error);

    return NextResponse.json(
      { error: getEmailErrorMessage(error) },
      { status: 500 },
    );
  }
}
