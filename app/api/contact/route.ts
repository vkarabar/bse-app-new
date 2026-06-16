import { NextResponse } from 'next/server';
import { validateContactPayload } from '@/lib/contact';
import { sendContactEmail } from '@/lib/send-contact-email';
import { getEmailErrorMessage } from '@/lib/smtp';

export const runtime = 'nodejs';

const rateLimit = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(ip: string) {
  const lastSent = rateLimit.get(ip);
  if (!lastSent) return false;

  if (Date.now() - lastSent < RATE_LIMIT_MS) return true;

  rateLimit.delete(ip);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Почекајте минута пред повторно испраќање.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = validateContactPayload(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await sendContactEmail(result.payload);
    rateLimit.set(ip, Date.now());

    return NextResponse.json({
      ok: true,
      message: 'Пораката е успешно испратена. Ќе ве контактираме наскоро.',
    });
  } catch (error) {
    console.error('Contact email failed:', error);

    return NextResponse.json(
      { error: getEmailErrorMessage(error) },
      { status: 500 },
    );
  }
}
