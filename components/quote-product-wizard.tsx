'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import {
  ColorSwatchPicker,
  type ColorSwatchItem,
} from '@/components/color-swatches';
import { CitySearchSelect } from '@/components/city-search-select';
import { useTranslations } from '@/components/locale-provider';
import {
  areDimensionsValid,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DIMENSION_ARROW_STEP,
  getDimensionValidationError,
  MAX_DIMENSION,
  MIN_DIMENSION,
  parseDimensionInput,
} from '@/lib/order-wizard-dimensions';
import {
  PERGOLI_DIMENSIONS,
  type ColorKey,
  type PergolaDimensionId,
} from '@/lib/product-colors';
import { cn } from '@/lib/utils';
import { postJsonApi } from '@/lib/post-json-api';
import { useWizardStepScroll } from '@/hooks/use-wizard-step-scroll';
import { useScrollIntoViewWhen } from '@/hooks/use-scroll-into-view-when';

type QuoteProduct = 'pergoli' | 'zavesi';
type StepId = 'dimensions' | 'style' | 'contact';

type WizardState = {
  dimension: PergolaDimensionId | '';
  width: string;
  height: string;
  color: ColorKey | '';
  name: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
};

const STEPS: StepId[] = ['dimensions', 'style', 'contact'];

const inputClassName =
  'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent';

type Props = {
  product: QuoteProduct;
  colors: ColorSwatchItem[];
  className?: string;
  showHeader?: boolean;
};

function DimensionControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  function adjust(delta: number) {
    const current = parseDimensionInput(value) ?? MIN_DIMENSION;
    const next = Math.min(
      MAX_DIMENSION,
      Math.max(MIN_DIMENSION, current + delta),
    );
    onChange(String(next));
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <label className="block text-sm font-medium text-slate-700 mb-3">
        {label}
      </label>
      <div className="grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-x-3">
        <button
          type="button"
          onClick={() => adjust(-DIMENSION_ARROW_STEP)}
          className="col-start-1 row-start-1 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label={`-${DIMENSION_ARROW_STEP}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          inputMode="numeric"
          max={MAX_DIMENSION}
          step={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            inputClassName,
            'col-start-2 row-start-1 text-center text-lg font-semibold',
          )}
        />
        <button
          type="button"
          onClick={() => adjust(DIMENSION_ARROW_STEP)}
          className="col-start-3 row-start-1 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label={`+${DIMENSION_ARROW_STEP}`}
        >
          <Plus className="h-4 w-4" />
        </button>
        <p className="col-start-2 row-start-2 mt-1 text-center text-xs text-slate-500">
          cm
        </p>
      </div>
    </div>
  );
}

function WizardSummary({
  product,
  state,
  currentStep,
}: {
  product: QuoteProduct;
  state: WizardState;
  currentStep: StepId;
}) {
  const t = useTranslations();
  const translationKey = product === 'pergoli' ? 'pergola' : 'curtains';

  const dimensionLabel =
    product === 'pergoli'
      ? PERGOLI_DIMENSIONS.find((option) => option.id === state.dimension)
          ?.label
      : areDimensionsValid(state.width, state.height)
        ? `${parseDimensionInput(state.width)} × ${parseDimensionInput(state.height)} cm`
        : '—';

  const rows = [
    {
      label: t('wizard.garageDoor.summary.product'),
      value: t(`orders.productLabels.${product}`),
      show: true,
    },
    {
      label: t('wizard.garageDoor.summary.dimensions'),
      value: dimensionLabel ?? '—',
      show:
        currentStep !== 'dimensions' ||
        (product === 'pergoli' ? !!state.dimension : areDimensionsValid(state.width, state.height)),
    },
    {
      label: t('wizard.garageDoor.summary.color'),
      value: state.color ? t(`colors.${state.color}`) : '—',
      show: (currentStep === 'style' || currentStep === 'contact') && !!state.color,
    },
  ].filter((row) => row.show);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-800 p-6 text-slate-100 lg:sticky lg:top-20">
      <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
        {t('wizard.garageDoor.summary.live')}
      </p>
      <h3 className="mt-2 text-lg font-bold">
        {t(`wizard.${translationKey}.summary.title`)}
      </h3>

      <dl className="mt-5 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 text-sm">
            <dt className="text-slate-400">{row.label}</dt>
            <dd className="font-medium text-right text-slate-100">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-slate-400">
        {t('wizard.garageDoor.summary.disclaimer')}
      </p>
    </aside>
  );
}

export function QuoteProductWizard({
  product,
  colors,
  className,
  showHeader = true,
}: Props) {
  const t = useTranslations();
  const translationKey = product === 'pergoli' ? 'pergola' : 'curtains';
  const wizardRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [message, setMessage] = useState('');
  const [dimensionsError, setDimensionsError] = useState<
    'empty' | 'range' | null
  >(null);
  const [state, setState] = useState<WizardState>({
    dimension: '',
    width: String(DEFAULT_WIDTH),
    height: String(DEFAULT_HEIGHT),
    color: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    notes: '',
  });

  const currentStep = STEPS[stepIndex];

  useWizardStepScroll(stepIndex, wizardRef);
  useScrollIntoViewWhen(status === 'success', successRef);

  const stepLabels = STEPS.map((step) =>
    t(`wizard.garageDoor.steps.${step}`),
  );

  function patchState(partial: Partial<WizardState>) {
    if ('width' in partial || 'height' in partial) {
      setDimensionsError(null);
    }
    setState((prev) => ({ ...prev, ...partial }));
  }

  function canProceedFromStep(step: StepId): boolean {
    switch (step) {
      case 'dimensions':
        return product === 'pergoli'
          ? !!state.dimension
          : areDimensionsValid(state.width, state.height);
      case 'style':
        return !!state.color;
      case 'contact':
        return (
          state.name.trim().length >= 2 &&
          state.phone.trim().length >= 8 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())
        );
      default:
        return false;
    }
  }

  function goNext() {
    if (currentStep === 'dimensions' && product === 'zavesi') {
      const error = getDimensionValidationError(state.width, state.height);
      if (error) {
        setDimensionsError(error);
        return;
      }
      setDimensionsError(null);
    }

    if (!canProceedFromStep(currentStep)) return;
    setStepIndex((index) => Math.min(index + 1, STEPS.length - 1));
  }

  function goBack() {
    setStepIndex((index) => Math.max(index - 1, 0));
  }

  function canNavigateToStep(index: number): boolean {
    if (status === 'loading') return false;
    if (index < 0 || index >= STEPS.length || index === stepIndex) return false;

    for (let i = 0; i < index; i++) {
      if (!canProceedFromStep(STEPS[i])) return false;
    }

    return true;
  }

  function goToStep(index: number) {
    if (canNavigateToStep(index)) {
      setStepIndex(index);
    }
  }

  const payload = useMemo(() => {
    const base = {
      product,
      color: state.color,
      name: state.name.trim(),
      phone: state.phone.trim(),
      email: state.email.trim(),
      city: state.city.trim() || undefined,
      notes: state.notes.trim() || undefined,
      website: '',
    };

    if (product === 'pergoli') {
      return { ...base, dimension: state.dimension };
    }

    return {
      ...base,
      width: parseDimensionInput(state.width) ?? DEFAULT_WIDTH,
      height: parseDimensionInput(state.height) ?? DEFAULT_HEIGHT,
    };
  }, [product, state]);

  async function handleSubmit() {
    if (!canProceedFromStep('contact')) return;

    setStatus('loading');
    setMessage('');

    try {
      const result = await postJsonApi('/api/order', payload);

      if (!result.ok) {
        throw new Error(
          result.error === 'invalid_response'
            ? t('forms.order.errorServer')
            : result.error ?? t('forms.order.errorGeneric'),
        );
      }

      setStatus('success');
      setMessage(result.data?.message ?? t('orders.success'));
    } catch (err) {
      setStatus('error');
      setMessage(
        err instanceof Error ? err.message : t('forms.order.errorRetry'),
      );
    }
  }

  function resetWizard() {
    setStepIndex(0);
    setStatus('idle');
    setMessage('');
    setDimensionsError(null);
    setState({
      dimension: '',
      width: String(DEFAULT_WIDTH),
      height: String(DEFAULT_HEIGHT),
      color: '',
      name: '',
      phone: '',
      email: '',
      city: '',
      notes: '',
    });
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        className={cn(
          'rounded-2xl border border-emerald-200 bg-emerald-50 p-8 md:p-10 text-center',
          className,
        )}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-slate-800">
          {t('wizard.garageDoor.success.title')}
        </h3>
        <p className="mt-3 text-slate-600">{message}</p>
        <p className="mt-2 text-sm text-slate-500">
          {t('wizard.garageDoor.success.subtitle')}
        </p>
        <button
          type="button"
          onClick={resetWizard}
          className="btn-main-dark mt-8"
        >
          {t('wizard.garageDoor.success.newQuote')}
        </button>
      </div>
    );
  }

  return (
    <div
      ref={wizardRef}
      className={cn('rounded-2xl border border-slate-200 bg-white shadow-sm', className)}
    >
      {showHeader && (
        <div className="border-b border-slate-100 px-5 py-6 md:px-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            {t(`wizard.${translationKey}.title`)}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t(`wizard.${translationKey}.subtitle`)}
          </p>
        </div>
      )}

      <div className="border-b border-slate-100 px-5 py-4 md:px-8">
        <ol className="flex w-full items-center justify-center gap-2 sm:gap-3">
          {STEPS.map((step, index) => {
            const isActive = index === stepIndex;
            const isComplete = index < stepIndex;
            const isClickable = canNavigateToStep(index);

            const circleClassName = cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all',
              isActive && 'bg-sky-500 text-white',
              isComplete && 'bg-sky-100 text-sky-700',
              isClickable &&
                !isComplete &&
                'border-2 border-sky-300 bg-white text-sky-600 hover:bg-sky-50 hover:ring-2 hover:ring-sky-200',
              !isActive &&
                !isComplete &&
                !isClickable &&
                'bg-slate-100 text-slate-400',
            );

            return (
              <Fragment key={step}>
                <li className="flex items-center gap-2">
                  {isClickable || isActive ? (
                    <button
                      type="button"
                      onClick={() => goToStep(index)}
                      disabled={isActive}
                      className={cn(
                        circleClassName,
                        isClickable &&
                          !isActive &&
                          'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
                        isActive && 'cursor-default',
                      )}
                      aria-current={isActive ? 'step' : undefined}
                      aria-label={`${index + 1}. ${stepLabels[index]}`}
                    >
                      {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                    </button>
                  ) : (
                    <span className={circleClassName} aria-label={`${index + 1}. ${stepLabels[index]}`}>
                      {index + 1}
                    </span>
                  )}
                  <span
                    className={cn(
                      'text-sm font-medium whitespace-nowrap',
                      isActive
                        ? 'inline text-sky-700'
                        : 'hidden md:inline text-slate-500',
                    )}
                  >
                    {stepLabels[index]}
                  </span>
                </li>
                {index < STEPS.length - 1 && (
                  <li aria-hidden>
                    <span
                      className={cn(
                        'block h-1.5 w-1.5 rounded-full',
                        index < stepIndex ? 'bg-sky-400' : 'bg-slate-300',
                      )}
                    />
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 lg:gap-8 p-5 md:p-8">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {currentStep === 'dimensions' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {t(`wizard.${translationKey}.dimensions.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {t(`wizard.${translationKey}.dimensions.subtitle`)}
                    </p>
                  </div>

                  {product === 'pergoli' ? (
                    <fieldset className="rounded-xl border border-slate-200 bg-white p-5">
                      <legend className="sr-only">
                        {t(`wizard.${translationKey}.dimensions.title`)}
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {PERGOLI_DIMENSIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => patchState({ dimension: option.id })}
                            className={cn(
                              'rounded-lg border px-4 py-4 text-sm font-semibold transition-colors',
                              state.dimension === option.id
                                ? 'border-sky-500 bg-sky-50 text-sky-700'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300',
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ) : (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <DimensionControl
                          label={t('forms.order.width')}
                          value={state.width}
                          onChange={(width) => patchState({ width })}
                        />
                        <DimensionControl
                          label={t('forms.order.height')}
                          value={state.height}
                          onChange={(height) => patchState({ height })}
                        />
                      </div>
                      {dimensionsError && (
                        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                          {dimensionsError === 'empty'
                            ? t('wizard.garageDoor.dimensions.validationEmpty')
                            : t('wizard.garageDoor.dimensions.validationRange', {
                                min: MIN_DIMENSION,
                                max: MAX_DIMENSION,
                              })}
                        </p>
                      )}
                    </>
                  )}

                  <p className="text-xs text-slate-500">
                    {t(`wizard.${translationKey}.dimensions.hint`)}
                  </p>
                </div>
              )}

              {currentStep === 'style' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {t(`wizard.${translationKey}.style.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {t(`wizard.${translationKey}.style.subtitle`)}
                    </p>
                  </div>
                  <ColorSwatchPicker
                    colors={colors}
                    value={state.color}
                    onChange={(color) => patchState({ color: color as ColorKey })}
                  />
                </div>
              )}

              {currentStep === 'contact' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {t(`wizard.${translationKey}.contact.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {t(`wizard.${translationKey}.contact.subtitle`)}
                    </p>
                  </div>

                  {state.color && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-700 mb-3">
                        {t('wizard.garageDoor.summary.color')}
                      </p>
                      <ColorSwatchPicker
                        colors={colors}
                        value={state.color}
                        onChange={(color) =>
                          patchState({ color: color as ColorKey })
                        }
                      />
                    </div>
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
                        type="text"
                        value={state.name}
                        onChange={(e) => patchState({ name: e.target.value })}
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
                        type="tel"
                        value={state.phone}
                        onChange={(e) => patchState({ phone: e.target.value })}
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
                      type="email"
                      value={state.email}
                      onChange={(e) => patchState({ email: e.target.value })}
                      className={inputClassName}
                    />
                  </div>

                  <CitySearchSelect
                    id={`${product}-city`}
                    value={state.city}
                    onChange={(city) => patchState({ city })}
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
                      rows={3}
                      value={state.notes}
                      onChange={(e) => patchState({ notes: e.target.value })}
                      className={cn(inputClassName, 'resize-none')}
                      placeholder={t('forms.order.notesPlaceholder')}
                    />
                  </div>

                  {message && status === 'error' && (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      {message}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0 || status === 'loading'}
              className="wizard-btn-back sm:min-w-[8.5rem]"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('wizard.garageDoor.back')}
            </button>

            {currentStep === 'contact' ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceedFromStep('contact') || status === 'loading'}
                className="wizard-btn-primary sm:min-w-[8.5rem]"
              >
                {status === 'loading'
                  ? t('forms.order.submitting')
                  : t('wizard.garageDoor.submit')}
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                disabled={
                  currentStep === 'dimensions' && product === 'zavesi'
                    ? status === 'loading'
                    : !canProceedFromStep(currentStep) || status === 'loading'
                }
                className="wizard-btn-primary sm:min-w-[8.5rem]"
              >
                {t('wizard.garageDoor.next')}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <WizardSummary
            product={product}
            state={state}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
}
