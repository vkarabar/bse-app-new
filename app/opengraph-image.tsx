import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getLocale } from '@/lib/i18n/get-locale';
import { getDictionary, createTranslator } from '@/lib/i18n/get-dictionary';

export const runtime = 'nodejs';
export const alt = 'BSE Kompani';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const locale = await getLocale();
  const t = createTranslator(getDictionary(locale));

  const LOGO_ASPECT = 969.26 / 715.99;
  const LOGO_WIDTH = 200;
  const LOGO_HEIGHT = Math.round(LOGO_WIDTH / LOGO_ASPECT);

  const [logoFile, montserratLatinBold, montserratCyrillicBold] = await Promise.all([
    readFile(join(process.cwd(), 'public/BSE_NEW.svg')),
    fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/montserrat@latest/latin-700-normal.ttf',
    ).then((res) => res.arrayBuffer()),
    fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/montserrat@latest/cyrillic-700-normal.ttf',
    ).then((res) => res.arrayBuffer()),
  ]);

  const logoSrc = `data:image/svg+xml;base64,${logoFile.toString('base64')}`;
  const siteName = t('metadata.siteName');
  const tagline = t('metadata.og.tagline');
  const subtitle = t('metadata.og.subtitle');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0c4a6e 100%)',
          fontFamily: 'Montserrat',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 50%, #0ea5e9 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: -80,
            top: -40,
            width: 520,
            height: 520,
            borderRadius: '9999px',
            background: 'rgba(14, 165, 233, 0.12)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 48,
            bottom: 48,
            width: 280,
            height: 220,
            borderRadius: 12,
            border: '1px solid rgba(148, 163, 184, 0.25)',
            background:
              'repeating-linear-gradient(to bottom, #334155 0px, #334155 4px, #475569 4px, #475569 5px)',
            opacity: 0.35,
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 48,
            padding: '64px 72px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: LOGO_WIDTH + 40,
              height: LOGO_HEIGHT + 40,
              borderRadius: 28,
              background: 'rgba(15, 23, 42, 0.55)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
            }}
          >
            <img
              src={logoSrc}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              alt=""
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
            <div
              style={{
                fontSize: 54,
                fontWeight: 700,
                color: '#f8fafc',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {siteName}
            </div>

            <div
              style={{
                marginTop: 20,
                fontSize: 30,
                fontWeight: 700,
                color: '#38bdf8',
                lineHeight: 1.25,
              }}
            >
              {tagline}
            </div>

            <div
              style={{
                marginTop: 28,
                display: 'flex',
                gap: 12,
              }}
            >
              {subtitle.split(' · ').map((item) => (
                <div
                  key={item}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 999,
                    background: 'rgba(14, 165, 233, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#e2e8f0',
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 28,
                fontSize: 22,
                color: '#94a3b8',
                fontWeight: 700,
              }}
            >
              bsekompani.mk
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Montserrat',
          data: montserratLatinBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Montserrat',
          data: montserratCyrillicBold,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  );
}
