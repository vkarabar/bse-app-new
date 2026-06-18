'use client';

import { useMemo, useRef, useState } from 'react';
import {
  ColorSwatchPicker,
  type ColorSwatchItem,
} from '@/components/color-swatches';
import { useTranslations } from '@/components/locale-provider';
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
import { postJsonApi } from '@/lib/post-json-api';
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

export function ProductOrderForm({
  product,
  motorVariant: fixedMotorVariant,
  colors = [],
  widthLabel,
  heightLabel,
}: Props) {
  const t = useTranslations();
  const isFixedPrice = productHasFixedPrice(product);
  const formMode = isFixedPrice ? 'order' : 'quote';

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
    ? getMotoriPortiPricing(motorVariant, t)
    : null;

  const motorTotal = useMemo(() => {
    if (!motorVariant) return null;
    const meters = railMeters.trim() === '' ? 0 : Number(railMeters);
    if (!Number.isFinite(meters) || meters < 0) return null;
    return calculateMotoriPortiTotal(motorVariant, mounting, meters);
  }, [motorVariant, mounting, railMeters]);

  const reviewRows = useMemo(
    () => (pendingPayload ? buildOrderReviewRows(pendingPayload, t) : []),
    [pendingPayload, t],
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
      const result = await postJsonApi('/api/order', pendingPayload);

      if (!result.ok) {
        throw new Error(
          result.error === 'invalid_response'
            ? t('forms.order.errorServer')
            : result.error ?? t('forms.order.errorGeneric'),
        );
      }

      setStatus('success');
      setMessage(result.data?.message ?? t('orders.success'));
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
        err instanceof Error ? err.message : t('forms.order.errorRetry'),
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
                  {t('forms.order.motoriPorti.packageLabel')}{' '}
                  <span className="font-semibold text-sky-700">
                    {formatEur(motorPricing.motorEur)}
                  </span>
                </p>
                <div className="rounded-lg bg-slate-50 px-4 py-3">
                  <p className="text-sm font-medium text-slate-800 mb-2">
                    {t('forms.order.motoriPorti.includedTitle')}
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
                {t('forms.order.motoriPorti.motorLabel')}{' '}
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
                <span className="font-semibold">
                  {t('forms.order.motoriPorti.mounting')}
                </span>
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
                  ? t('forms.order.motoriPorti.extraRailsOptional')
                  : t('forms.order.motoriPorti.railsOptional')}
              </label>
              <p className="text-xs text-slate-500 mb-2">
                {motorPricing.includedRailMeters > 0
                  ? t('forms.order.motoriPorti.includedRailsHint', {
                      meters: motorPricing.includedRailMeters,
                      price: formatEur(motorPricing.railPerMeterEur),
                    })
                  : t('forms.order.motoriPorti.perMeterHint', {
                      price: formatEur(motorPricing.railPerMeterEur),
                    })}
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
                  motorPricing.includedRailMeters > 0
                    ? t('forms.order.motoriPorti.extraRailsPlaceholder')
                    : t('forms.order.motoriPorti.railsPlaceholder')
                }
                className={inputClassName}
              />
            </div>

            {motorTotal !== null && (
              <p className="rounded-lg bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800">
                {t('forms.order.motoriPorti.estimatedTotal')}{' '}
                {formatEur(motorTotal)}
              </p>
            )}
          </div>
        ) : product === 'pergoli' ? (
          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-2">
              {t('forms.order.dimensions')}
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
                {widthLabel ?? t('forms.order.width')}
              </label>
              <input
                id={`${product}-width`}
                name="width"
                type="number"
                min={1}
                max={2000}
                step={1}
                required
                placeholder={t('forms.order.widthPlaceholder')}
                className={inputClassName}
              />
            </div>
            <div>
              <label
                htmlFor={`${product}-height`}
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {heightLabel ?? t('forms.order.height')}
              </label>
              <input
                id={`${product}-height`}
                name="height"
                type="number"
                min={1}
                max={2000}
                step={1}
                required
                placeholder={t('forms.order.heightPlaceholder')}
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
              {t('forms.order.name')}
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
              {t('forms.order.phone')}
            </label>
            <input
              id={`${product}-phone`}
              name="phone"
              type="tel"
              required
              placeholder={t('forms.order.phonePlaceholder')}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor={`${product}-email`}
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {t('forms.order.email')}
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
          label={t('forms.order.city')}
          placeholder={t('forms.order.cityPlaceholder')}
          inputClassName={inputClassName}
        />

        <div>
          <label
            htmlFor={`${product}-notes`}
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {t('forms.order.notes')}
          </label>
          <textarea
            id={`${product}-notes`}
            name="notes"
            rows={3}
            className={cn(inputClassName, 'resize-none')}
            placeholder={t('forms.order.notesPlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {product === 'motori-porti' && motorTotal !== null && (
            <p className="text-right text-base font-semibold text-slate-800 sm:mr-1">
              {t('forms.order.motoriPorti.total')}{' '}
              <span className="text-sky-700">{formatEur(motorTotal)}</span>
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'loading' || !canSubmit}
            className="btn-main-dark w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formMode === 'order'
              ? t('forms.order.submitOrder')
              : t('forms.order.submitQuote')}
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
            <DialogTitle>
              {t(`forms.order.review${formMode === 'order' ? 'Order' : 'Quote'}.title`)}
            </DialogTitle>
            <DialogDescription>
              {t(
                `forms.order.review${formMode === 'order' ? 'Order' : 'Quote'}.description`,
              )}
            </DialogDescription>
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
              {t('forms.order.motoriPorti.total')}{' '}
              <span className="text-sky-700">{formatEur(reviewTotal)}</span>
            </p>
          )}

          <DialogFooter>
            <button
              type="button"
              onClick={() => setReviewOpen(false)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t('forms.order.back')}
            </button>
            <button
              type="button"
              onClick={submitOrder}
              disabled={status === 'loading'}
              className="btn-main-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading'
                ? t('forms.order.submitting')
                : t(
                    `forms.order.review${formMode === 'order' ? 'Order' : 'Quote'}.confirm`,
                  )}
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
  const t = useTranslations();
  const isFixedPrice = productHasFixedPrice(product);

  const sectionDescriptionKey =
    product === 'pergoli'
      ? 'forms.order.descriptionPergoli'
      : product === 'zavesi'
        ? 'forms.order.descriptionZavesi'
        : product === 'motori-porti'
          ? 'forms.order.descriptionMotoriPorti'
          : 'forms.order.descriptionVrati';

  return (
    <section className="mt-8 mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-8">
      <h2 className="desc-title text-lg md:text-xl mb-1">
        {isFixedPrice ? t('forms.order.titleOrder') : t('forms.order.titleQuote')}
      </h2>
      <p className="text-slate-600 text-sm mb-6">{t(sectionDescriptionKey)}</p>
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
