'use client';

import { useMemo, useRef, useState } from 'react';
import { CitySearchSelect } from '@/components/city-search-select';
import { useTranslations } from '@/components/locale-provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  buildOrderReviewRows,
  getOrderReviewTotal,
} from '@/lib/order-review';
import {
  RACKI_TENDI_LENGTH_OPTIONS,
  type RackiTendiLength,
} from '@/lib/racki-tendi-data';
import { formatEur } from '@/lib/order-pricing';
import { postJsonApi } from '@/lib/post-json-api';

const inputClassName =
  'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent';

export function RackiTendiOrderForm() {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const [length, setLength] = useState<RackiTendiLength | ''>('');
  const [quantity, setQuantity] = useState('1');
  const [city, setCity] = useState('');
  const [reviewOpen, setReviewOpen] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const parsedQuantity = Number(quantity);
  const quantityValid =
    Number.isInteger(parsedQuantity) && parsedQuantity >= 1 && parsedQuantity <= 999;

  const unitPrice = length
    ? RACKI_TENDI_LENGTH_OPTIONS.find((option) => option.id === length)?.priceEur ??
      null
    : null;

  const estimatedTotal = useMemo(() => {
    if (!length || !quantityValid || unitPrice === null) return null;
    return unitPrice * parsedQuantity;
  }, [length, parsedQuantity, quantityValid, unitPrice]);

  const reviewRows = useMemo(
    () => (pendingPayload ? buildOrderReviewRows(pendingPayload, t) : []),
    [pendingPayload, t],
  );

  const reviewTotal = useMemo(
    () => (pendingPayload ? getOrderReviewTotal(pendingPayload) : null),
    [pendingPayload],
  );

  const canSubmit = !!length && quantityValid;

  function buildPayload(formData: FormData): Record<string, unknown> {
    return {
      product: 'racki-tendi',
      rackiTendiLength: length,
      quantity: parsedQuantity,
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      city,
      notes: formData.get('notes'),
      website: formData.get('website'),
    };
  }

  function handleReviewRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || !formRef.current || !formRef.current.reportValidity()) {
      return;
    }

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
      setLength('');
      setQuantity('1');
      setCity('');
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

        <div>
          <label
            htmlFor="racki-tendi-length"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {t('forms.order.rackiTendi.lengthLabel')}
          </label>
          <select
            id="racki-tendi-length"
            value={length}
            onChange={(e) =>
              setLength(e.target.value as RackiTendiLength | '')
            }
            required
            className={inputClassName}
          >
            <option value="">{t('forms.order.rackiTendi.lengthPlaceholder')}</option>
            {RACKI_TENDI_LENGTH_OPTIONS.map((option) => (
              <option
                key={option.id}
                value={option.id}
              >
                {t(option.labelKey)} — {formatEur(option.priceEur)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="racki-tendi-quantity"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {t('forms.order.rackiTendi.quantityLabel')}
          </label>
          <input
            id="racki-tendi-quantity"
            type="number"
            min={1}
            max={999}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={inputClassName}
          />
        </div>

        {estimatedTotal !== null && (
          <p className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
            {t('forms.order.rackiTendi.estimatedTotal')}{' '}
            <span className="font-semibold">{formatEur(estimatedTotal)}</span>
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="racki-tendi-name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              {t('forms.order.name')}
            </label>
            <input
              id="racki-tendi-name"
              name="name"
              required
              minLength={2}
              className={inputClassName}
            />
          </div>
          <div>
            <label
              htmlFor="racki-tendi-phone"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              {t('forms.order.phone')}
            </label>
            <input
              id="racki-tendi-phone"
              name="phone"
              type="tel"
              required
              minLength={8}
              placeholder={t('forms.order.phonePlaceholder')}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="racki-tendi-email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {t('forms.order.email')}
          </label>
          <input
            id="racki-tendi-email"
            name="email"
            type="email"
            required
            className={inputClassName}
          />
        </div>

        <CitySearchSelect
          id="racki-tendi-city"
          value={city}
          onChange={setCity}
          label={t('forms.order.city')}
          placeholder={t('forms.order.cityPlaceholder')}
        />

        <div>
          <label
            htmlFor="racki-tendi-notes"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {t('forms.order.notes')}
          </label>
          <textarea
            id="racki-tendi-notes"
            name="notes"
            rows={3}
            placeholder={t('forms.order.notesPlaceholder')}
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit || status === 'loading'}
          className="btn-main-dark w-full sm:w-auto disabled:opacity-60"
        >
          {t('forms.order.titleOrder')}
        </button>

        {status === 'success' && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {message}
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {message}
          </p>
        )}
      </form>

      <Dialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('forms.order.reviewOrder.title')}</DialogTitle>
            <DialogDescription>
              {t('forms.order.reviewOrder.description')}
            </DialogDescription>
          </DialogHeader>

          <dl className="space-y-3 text-sm">
            {reviewRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-3"
              >
                <dt className="text-slate-500">{row.label}</dt>
                <dd className="font-medium text-slate-800">{row.value}</dd>
              </div>
            ))}
          </dl>

          {reviewTotal !== null && (
            <p className="text-base font-semibold text-sky-700">
              {t('forms.order.motoriPorti.total')} {formatEur(reviewTotal)}
            </p>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <button
              type="button"
              onClick={() => setReviewOpen(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {t('forms.order.back')}
            </button>
            <button
              type="button"
              onClick={submitOrder}
              disabled={status === 'loading'}
              className="btn-main-dark disabled:opacity-60"
            >
              {status === 'loading'
                ? t('forms.order.submitting')
                : t('forms.order.reviewOrder.confirm')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
