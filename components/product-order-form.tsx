'use client';

import { useMemo, useRef, useState } from 'react';
import {
  ColorSwatchPicker,
  type ColorSwatchItem,
} from '@/components/color-swatches';
import {
  PERGOLI_DIMENSIONS,
  type PergolaDimensionId,
} from '@/lib/product-colors';
import { CitySearchSelect } from '@/components/city-search-select';
import {
  buildOrderReviewRows,
  getOrderReviewTotal,
} from '@/lib/order-review';
import {
  calculateMotoriPortiTotal,
  formatEur,
  getMotoriPortiPricing,
  productHasFixedPrice,
} from '@/lib/order-pricing';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { OrderProduct } from '@/lib/orders';
import type { MotorVariant } from '@/lib/motori-porti-data';

type Props = {
  product: OrderProduct;
  motorVariant?: MotorVariant;
  colors?: ColorSwatchItem[];
  widthLabel?: string;
  heightLabel?: string;
};

const inputClassName =
  'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent';

const SECTION_COPY: Record<OrderProduct, string> = {
  vrati:
    'Внесете димензии и контакт — ќе ви одговориме со цена и рок за монтажа.',
  pergoli:
    'Изберете димензии и боја — ќе ви одговориме со цена и рок за монтажа.',
  zavesi:
    'Внесете димензии и боја — ќе ви одговориме со цена и рок за монтажа.',
  'motori-porti':
    'Изберете опции — цените се прикажани подолу. Ќе ве контактираме за потврда.',
};

const SECTION_TITLE = {
  quote: 'Побарајте понуда',
  order: 'Нарачајте',
} as const;

const SUBMIT_LABEL = {
  quote: 'Побарај понуда',
  order: 'Испрати нарачка',
} as const;

const REVIEW_COPY = {
  quote: {
    title: 'Преглед на барањето',
    description: 'Проверете ги деталите пред да го испратите барањето.',
    confirm: 'Потврди барање',
  },
  order: {
    title: 'Преглед на нарачката',
    description: 'Проверете ги деталите пред да ја испратите нарачката.',
    confirm: 'Потврди и испрати',
  },
} as const;

export function ProductOrderForm({
  product,
  motorVariant: fixedMotorVariant,
  colors = [],
  widthLabel = 'Ширина (см)',
  heightLabel = 'Висина (см)',
}: Props) {
  const isFixedPrice = productHasFixedPrice(product);
  const formMode = isFixedPrice ? 'order' : 'quote';
  const copy = REVIEW_COPY[formMode];

  const formRef = useRef<HTMLFormElement>(null);
  const [color, setColor] = useState('');
  const [city, setCity] = useState('');
  const [dimension, setDimension] = useState<PergolaDimensionId | ''>('');
  const [mounting, setMounting] = useState(false);
  const [railMeters, setRailMeters] = useState('');
  const [reviewOpen, setReviewOpen] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const motorVariant = fixedMotorVariant;

  const motorPricing = motorVariant
    ? getMotoriPortiPricing(motorVariant)
    : null;

  const motorTotal = useMemo(() => {
    if (!motorVariant) return null;
    const meters = railMeters.trim() === '' ? 0 : Number(railMeters);
    if (!Number.isFinite(meters) || meters < 0) return null;
    return calculateMotoriPortiTotal(motorVariant, mounting, meters);
  }, [motorVariant, mounting, railMeters]);

  const reviewRows = useMemo(
    () => (pendingPayload ? buildOrderReviewRows(pendingPayload) : []),
    [pendingPayload],
  );

  const reviewTotal = useMemo(
    () => (pendingPayload ? getOrderReviewTotal(pendingPayload) : null),
    [pendingPayload],
  );

  const canSubmit =
    product === 'motori-porti'
      ? motorTotal !== null && !!motorVariant
      : !!color &&
        (product === 'pergoli'
          ? !!dimension
          : product === 'vrati' || product === 'zavesi');

  function buildPayload(formData: FormData): Record<string, unknown> {
    const base = {
      product,
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      city,
      notes: formData.get('notes'),
      website: formData.get('website'),
    };

    if (product === 'motori-porti') {
      return {
        ...base,
        motorVariant,
        mounting,
        railMeters: railMeters.trim() === '' ? 0 : Number(railMeters),
      };
    }

    if (product === 'pergoli') {
      return { ...base, dimension, color };
    }

    return {
      ...base,
      width: formData.get('width'),
      height: formData.get('height'),
      color,
    };
  }

  function handleReviewRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || !formRef.current) return;

    if (!formRef.current.reportValidity()) return;

    setPendingPayload(buildPayload(new FormData(formRef.current)));
    setReviewOpen(true);
  }

  async function submitOrder() {
    if (!pendingPayload) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Настана грешка.');
      }

      setStatus('success');
      setMessage(data.message);
      setReviewOpen(false);
      setPendingPayload(null);
      formRef.current?.reset();
      setColor('');
      setCity('');
      setDimension('');
      setMounting(false);
      setRailMeters('');
    } catch (err) {
      setStatus('error');
      setMessage(
        err instanceof Error
          ? err.message
          : 'Настана грешка. Обидете се повторно.',
      );
    }
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleReviewRequest}
        className="space-y-5"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        {product === 'motori-porti' && motorPricing ? (
          <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
            {motorPricing.packageIncludes ? (
              <>
                <p className="text-sm font-medium text-slate-800">
                  Комплет:{' '}
                  <span className="font-semibold text-sky-700">
                    {formatEur(motorPricing.motorEur)}
                  </span>
                </p>
                <div className="rounded-lg bg-slate-50 px-4 py-3">
                  <p className="text-sm font-medium text-slate-800 mb-2">
                    Во цената е вклучено:
                  </p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {motorPricing.packageIncludes.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p className="text-sm font-medium text-slate-800">
                Мотор за лизгачка порта:{' '}
                <span className="font-semibold text-sky-700">
                  {formatEur(motorPricing.motorEur)}
                </span>
              </p>
            )}

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50">
              <input
                type="checkbox"
                checked={mounting}
                onChange={(e) => setMounting(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="text-sm text-slate-800">
                <span className="font-semibold">Монтажа</span>
                <span className="block text-slate-600">
                  +{formatEur(motorPricing.mountingEur)}
                </span>
              </span>
            </label>

            <div>
              <label
                htmlFor={`${product}-rails`}
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {motorPricing.includedRailMeters > 0
                  ? `Дополнителни шини [метри] (опционално)`
                  : 'Шини за порта [метри] (опционално)'}
              </label>
              <p className="text-xs text-slate-500 mb-2">
                {motorPricing.includedRailMeters > 0
                  ? `${motorPricing.includedRailMeters} m шини се вклучени во комплетот · ${formatEur(motorPricing.railPerMeterEur)} / дополнителен метар`
                  : `${formatEur(motorPricing.railPerMeterEur)} / метар`}
              </p>
              <input
                id={`${product}-rails`}
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={railMeters}
                onChange={(e) => setRailMeters(e.target.value)}
                placeholder={
                  motorPricing.includedRailMeters > 0 ? 'на пр. 2' : 'на пр. 6'
                }
                className={inputClassName}
              />
            </div>

            {motorTotal !== null && (
              <p className="rounded-lg bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800">
                Проценета вкупна цена: {formatEur(motorTotal)}
              </p>
            )}
          </div>
        ) : product === 'pergoli' ? (
          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-2">
              Димензии
            </legend>
            <div className="grid sm:grid-cols-2 gap-3">
              {PERGOLI_DIMENSIONS.map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    'flex cursor-pointer items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold transition-colors',
                    dimension === option.id
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400',
                  )}
                >
                  <input
                    type="radio"
                    name="dimension"
                    value={option.id}
                    checked={dimension === option.id}
                    onChange={() => setDimension(option.id)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`${product}-width`}
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {widthLabel}
              </label>
              <input
                id={`${product}-width`}
                name="width"
                type="number"
                min={1}
                max={2000}
                step={1}
                required
                placeholder="на пр. 300"
                className={inputClassName}
              />
            </div>
            <div>
              <label
                htmlFor={`${product}-height`}
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {heightLabel}
              </label>
              <input
                id={`${product}-height`}
                name="height"
                type="number"
                min={1}
                max={2000}
                step={1}
                required
                placeholder="на пр. 250"
                className={inputClassName}
              />
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <ColorSwatchPicker
            colors={colors}
            value={color}
            onChange={setColor}
          />
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`${product}-name`}
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Име и презиме
            </label>
            <input
              id={`${product}-name`}
              name="name"
              type="text"
              required
              className={inputClassName}
            />
          </div>
          <div>
            <label
              htmlFor={`${product}-phone`}
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Телефон
            </label>
            <input
              id={`${product}-phone`}
              name="phone"
              type="tel"
              required
              placeholder="07X XXX XXX"
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor={`${product}-email`}
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email
          </label>
          <input
            id={`${product}-email`}
            name="email"
            type="email"
            required
            className={inputClassName}
          />
        </div>

        <CitySearchSelect
          id={`${product}-city`}
          value={city}
          onChange={setCity}
          inputClassName={inputClassName}
        />

        <div>
          <label
            htmlFor={`${product}-notes`}
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Забелешка (опционално)
          </label>
          <textarea
            id={`${product}-notes`}
            name="notes"
            rows={3}
            className={cn(inputClassName, 'resize-none')}
            placeholder="Дополнителни барања или прашања..."
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {product === 'motori-porti' && motorTotal !== null && (
            <p className="text-right text-base font-semibold text-slate-800 sm:mr-1">
              Вкупно:{' '}
              <span className="text-sky-700">{formatEur(motorTotal)}</span>
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'loading' || !canSubmit}
            className="btn-main-dark w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {SUBMIT_LABEL[formMode]}
          </button>
        </div>

        {message && (
          <p
            className={cn(
              'text-sm rounded-lg px-4 py-3',
              status === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200',
            )}
            role="status"
          >
            {message}
          </p>
        )}
      </form>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{copy.description}</DialogDescription>
          </DialogHeader>

          <dl className="divide-y divide-slate-100 rounded-lg border border-slate-200">
            {reviewRows.map((row) => (
              <div
                key={`${row.label}-${row.value}`}
                className="grid grid-cols-[minmax(0,38%)_1fr] gap-3 px-4 py-3 text-sm"
              >
                <dt className="font-medium text-slate-600">{row.label}</dt>
                <dd className="text-slate-900">{row.value}</dd>
              </div>
            ))}
          </dl>

          {reviewTotal !== null && (
            <p className="text-right text-base font-semibold text-slate-900">
              Вкупно:{' '}
              <span className="text-sky-700">{formatEur(reviewTotal)}</span>
            </p>
          )}

          <DialogFooter>
            <button
              type="button"
              onClick={() => setReviewOpen(false)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={submitOrder}
              disabled={status === 'loading'}
              className="btn-main-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Се испраќа...' : copy.confirm}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProductOrderSection({
  product,
  motorVariant,
  colors,
  widthLabel,
  heightLabel,
}: Props) {
  const isFixedPrice = productHasFixedPrice(product);

  return (
    <section className="mt-8 mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-8">
      <h2 className="desc-title text-lg md:text-xl mb-1">
        {isFixedPrice ? SECTION_TITLE.order : SECTION_TITLE.quote}
      </h2>
      <p className="text-slate-600 text-sm mb-6">{SECTION_COPY[product]}</p>
      <ProductOrderForm
        product={product}
        motorVariant={motorVariant}
        colors={colors}
        widthLabel={widthLabel}
        heightLabel={heightLabel}
      />
    </section>
  );
}
