'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { ColorSwatchPicker } from '@/components/color-swatches';
import { CitySearchSelect } from '@/components/city-search-select';
import { GarageDoorPreview } from '@/components/garage-door-preview';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from '@/components/locale-provider';
import { VRATI_COLORS, type ColorKey } from '@/lib/product-colors';
import { postJsonApi } from '@/lib/post-json-api';
import { cn } from '@/lib/utils';
import { useWizardStepScroll } from '@/hooks/use-wizard-step-scroll';
import { useScrollIntoViewWhen } from '@/hooks/use-scroll-into-view-when';

type StepId = 'options' | 'dimensions' | 'style' | 'contact';

type InstallTimeline = 'asap' | '30days' | '2-3months' | 'exploring';

type WizardState = {
  mountingRequested: boolean;
  remoteCount: number;
  remoteCountIsCustom: boolean;
  remoteCountCustomInput: string;
  width: string;
  height: string;
  color: ColorKey | '';
  name: string;
  phone: string;
  email: string;
  city: string;
  installTimeline: InstallTimeline | '';
  notes: string;
};

const STEPS: StepId[] = ['options', 'dimensions', 'style', 'contact'];
const REMOTE_PRESET_OPTIONS = [2, 3, 4] as const;
const INCLUDED_REMOTE_COUNT = 2;
const CUSTOM_REMOTE_MIN = 5;
const CUSTOM_REMOTE_MAX = 99;

function getEffectiveRemoteCount(state: WizardState): number {
  if (state.remoteCountIsCustom) {
    const parsed = Number(state.remoteCountCustomInput);
    return Number.isInteger(parsed) ? parsed : 0;
  }
  return state.remoteCount;
}

function isRemoteCountValid(state: WizardState): boolean {
  if (state.remoteCountIsCustom) {
    const parsed = Number(state.remoteCountCustomInput);
    return (
      Number.isInteger(parsed) &&
      parsed >= CUSTOM_REMOTE_MIN &&
      parsed <= CUSTOM_REMOTE_MAX
    );
  }
  return REMOTE_PRESET_OPTIONS.includes(
    state.remoteCount as (typeof REMOTE_PRESET_OPTIONS)[number],
  );
}

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 250;
const DIMENSION_STEP = 10;
const DIMENSION_ARROW_STEP = 1;
const MIN_DIMENSION = 50;
const MAX_DIMENSION = 2000;

function parseDimensionInput(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

function getDimensionValidationError(
  width: string,
  height: string,
): 'empty' | 'range' | null {
  const parsedWidth = parseDimensionInput(width);
  const parsedHeight = parseDimensionInput(height);

  if (parsedWidth === null || parsedHeight === null) {
    return 'empty';
  }

  if (
    parsedWidth < MIN_DIMENSION ||
    parsedHeight < MIN_DIMENSION ||
    parsedWidth > MAX_DIMENSION ||
    parsedHeight > MAX_DIMENSION
  ) {
    return 'range';
  }

  return null;
}

function areDimensionsValid(width: string, height: string): boolean {
  return getDimensionValidationError(width, height) === null;
}

const inputClassName =
  'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent';

type Props = {
  className?: string;
  showHeader?: boolean;
};

function OptionCard({
  title,
  description,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-xl border-2 p-5 text-left transition-all duration-200',
        selected
          ? 'border-sky-500 bg-sky-50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-800">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
            selected
              ? 'border-sky-500 bg-sky-500 text-white'
              : 'border-slate-300 bg-white',
          )}
        >
          {selected ? <Check className="h-3.5 w-3.5" /> : null}
        </span>
      </div>
    </button>
  );
}

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
      <div className="mt-3 flex gap-2">
        {[(-DIMENSION_STEP).toString(), `+${DIMENSION_STEP}`].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => adjust(i === 0 ? -DIMENSION_STEP : DIMENSION_STEP)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:border-sky-400 hover:text-sky-700"
          >
            {label} cm
          </button>
        ))}
      </div>
    </div>
  );
}

const WIZARD_STICKY_TOP = 'lg:top-20';

type SummaryRow = { label: string; value: string };

function buildGarageDoorSummaryRows(
  state: WizardState,
  currentStep: StepId,
  t: (key: string, params?: Record<string, string | number>) => string,
): SummaryRow[] {
  const effectiveRemoteCount = getEffectiveRemoteCount(state);

  return [
    {
      label: t('wizard.garageDoor.summary.product'),
      value: t('orders.productLabels.vrati'),
      show: true,
    },
    {
      label: t('wizard.garageDoor.summary.motor'),
      value: t('wizard.garageDoor.summary.included'),
      show: true,
    },
    {
      label: t('wizard.garageDoor.summary.mounting'),
      value: state.mountingRequested
        ? t('wizard.garageDoor.summary.yes')
        : t('wizard.garageDoor.summary.no'),
      show: true,
    },
    {
      label: t('wizard.garageDoor.summary.remotes'),
      value: String(effectiveRemoteCount),
      show: currentStep !== 'options' || isRemoteCountValid(state),
    },
    {
      label: t('wizard.garageDoor.summary.dimensions'),
      value: areDimensionsValid(state.width, state.height)
        ? `${parseDimensionInput(state.width)} × ${parseDimensionInput(state.height)} cm`
        : '—',
      show:
        currentStep === 'dimensions' ||
        currentStep === 'style' ||
        currentStep === 'contact',
    },
    {
      label: t('wizard.garageDoor.summary.color'),
      value: state.color ? t(`colors.${state.color}`) : '—',
      show:
        (currentStep === 'style' || currentStep === 'contact') && !!state.color,
    },
    {
      label: t('wizard.garageDoor.contact.timeline.label'),
      value: state.installTimeline
        ? t(`wizard.garageDoor.contact.timeline.${state.installTimeline}`)
        : '—',
      show: currentStep === 'contact' && !!state.installTimeline,
    },
  ]
    .filter((row) => row.show)
    .map(({ label, value }) => ({ label, value }));
}

function GarageDoorSummaryList({
  rows,
  dark = false,
}: {
  rows: SummaryRow[];
  dark?: boolean;
}) {
  return (
    <dl className="space-y-3">
      {rows.map((row) => (
        <div key={row.label} className="flex justify-between gap-4 text-sm">
          <dt className={dark ? 'text-slate-400' : 'text-slate-600'}>
            {row.label}
          </dt>
          <dd
            className={cn(
              'font-medium text-right',
              dark ? 'text-slate-100' : 'text-slate-900',
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function WizardSummary({
  state,
  currentStep,
  onViewPreview,
}: {
  state: WizardState;
  currentStep: StepId;
  onViewPreview?: () => void;
}) {
  const t = useTranslations();
  const parsedWidth = parseDimensionInput(state.width) ?? DEFAULT_WIDTH;
  const parsedHeight = parseDimensionInput(state.height) ?? DEFAULT_HEIGHT;
  const rows = buildGarageDoorSummaryRows(state, currentStep, t);

  if (currentStep === 'style' && state.color) {
    const effectiveRemoteCount = getEffectiveRemoteCount(state);
    return (
      <div className={cn('lg:sticky space-y-4', WIZARD_STICKY_TOP)}>
        <GarageDoorPreview
          width={parsedWidth}
          height={parsedHeight}
          color={state.color}
          colorLabel={t(`colors.${state.color}`)}
          motorRequested
          mountingRequested={state.mountingRequested}
          remoteCount={effectiveRemoteCount}
          remotesLabel={t('wizard.garageDoor.summary.remotes')}
          previewTitle={t('wizard.garageDoor.preview.title')}
          previewNote={t('wizard.garageDoor.preview.note')}
          motorLabel={t('wizard.garageDoor.preview.motorBadge')}
          mountingLabel={t('wizard.garageDoor.preview.mountingBadge')}
          dimensionsLabel={t('wizard.garageDoor.summary.dimensions')}
          compact
        />
        <aside className="rounded-2xl border border-slate-200 bg-slate-800 p-5 text-slate-100">
          <p className="text-xs leading-relaxed text-slate-400">
            {t('wizard.garageDoor.summary.disclaimer')}
          </p>
        </aside>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        'rounded-2xl border border-slate-200 bg-slate-800 p-6 text-slate-100 lg:sticky',
        WIZARD_STICKY_TOP,
      )}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
        {currentStep === 'contact'
          ? t('wizard.garageDoor.summary.title')
          : t('wizard.garageDoor.summary.live')}
      </p>
      <h3 className="mt-2 text-lg font-bold">
        {currentStep === 'contact'
          ? t('wizard.garageDoor.contact.configSummary')
          : t('wizard.garageDoor.summary.title')}
      </h3>

      <div className="mt-5">
        <GarageDoorSummaryList rows={rows} dark />
      </div>

      {currentStep === 'contact' && state.color && onViewPreview && (
        <button
          type="button"
          onClick={onViewPreview}
          className="mt-5 w-full rounded-lg border border-sky-400/40 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-200 transition-colors hover:bg-sky-500/20"
        >
          {t('wizard.garageDoor.contact.viewPreview')}
        </button>
      )}

      <p className="mt-6 text-xs leading-relaxed text-slate-400">
        {t('wizard.garageDoor.summary.disclaimer')}
      </p>
    </aside>
  );
}

export function GarageDoorOrderWizard({
  className,
  showHeader = true,
}: Props) {
  const t = useTranslations();
  const wizardRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [message, setMessage] = useState('');
  const [state, setState] = useState<WizardState>({
    mountingRequested: true,
    remoteCount: 2,
    remoteCountIsCustom: false,
    remoteCountCustomInput: '',
    width: String(DEFAULT_WIDTH),
    height: String(DEFAULT_HEIGHT),
    color: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    installTimeline: '',
    notes: '',
  });

  const [dimensionsError, setDimensionsError] = useState<
    'empty' | 'range' | null
  >(null);
  const [configPreviewOpen, setConfigPreviewOpen] = useState(false);

  const currentStep = STEPS[stepIndex];
  const summaryRows = buildGarageDoorSummaryRows(state, currentStep, t);

  useWizardStepScroll(stepIndex, wizardRef);
  useScrollIntoViewWhen(status === 'success', successRef);

  const stepLabels = STEPS.map((step) => t(`wizard.garageDoor.steps.${step}`));

  const timelineOptions: { value: InstallTimeline; label: string }[] = [
    { value: 'asap', label: t('wizard.garageDoor.contact.timeline.asap') },
    { value: '30days', label: t('wizard.garageDoor.contact.timeline.30days') },
    {
      value: '2-3months',
      label: t('wizard.garageDoor.contact.timeline.2-3months'),
    },
    {
      value: 'exploring',
      label: t('wizard.garageDoor.contact.timeline.exploring'),
    },
  ];

  function patchState(partial: Partial<WizardState>) {
    if ('width' in partial || 'height' in partial) {
      setDimensionsError(null);
    }
    setState((prev) => ({ ...prev, ...partial }));
  }

  function canProceedFromStep(step: StepId): boolean {
    switch (step) {
      case 'options':
        return isRemoteCountValid(state);
      case 'dimensions':
        return areDimensionsValid(state.width, state.height);
      case 'style':
        return !!state.color;
      case 'contact':
        return (
          state.name.trim().length >= 2 &&
          state.phone.trim().length >= 8 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim()) &&
          !!state.installTimeline
        );
      default:
        return false;
    }
  }

  function goNext() {
    if (currentStep === 'dimensions') {
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

  const payload = useMemo(
    () => ({
      product: 'vrati' as const,
      width: parseDimensionInput(state.width) ?? DEFAULT_WIDTH,
      height: parseDimensionInput(state.height) ?? DEFAULT_HEIGHT,
      color: state.color,
      motorRequested: true,
      mountingRequested: state.mountingRequested,
      remoteCount: getEffectiveRemoteCount(state),
      installTimeline: state.installTimeline,
      name: state.name.trim(),
      phone: state.phone.trim(),
      email: state.email.trim(),
      city: state.city.trim() || undefined,
      notes: state.notes.trim() || undefined,
      website: '',
    }),
    [state],
  );

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
    setState({
      mountingRequested: true,
      remoteCount: 2,
      remoteCountIsCustom: false,
      remoteCountCustomInput: '',
      width: String(DEFAULT_WIDTH),
      height: String(DEFAULT_HEIGHT),
      color: '',
      name: '',
      phone: '',
      email: '',
      city: '',
      installTimeline: '',
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
            {t('wizard.garageDoor.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t('wizard.garageDoor.subtitle')}
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
                    <span
                      className={circleClassName}
                      aria-label={`${index + 1}. ${stepLabels[index]}`}
                    >
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
              {currentStep === 'options' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {t('wizard.garageDoor.options.title')}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {t('wizard.garageDoor.options.subtitle')}
                    </p>
                  </div>

                  <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
                    {t('wizard.garageDoor.options.motorIncluded')}
                  </div>

                  <fieldset className="space-y-3">
                    <legend className="block text-sm font-medium text-slate-700 px-1">
                      {t('wizard.garageDoor.options.mounting.label')}
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <OptionCard
                        title={t('wizard.garageDoor.options.mounting.with.title')}
                        description={t(
                          'wizard.garageDoor.options.mounting.with.description',
                        )}
                        selected={state.mountingRequested}
                        onClick={() => patchState({ mountingRequested: true })}
                      />
                      <OptionCard
                        title={t('wizard.garageDoor.options.mounting.without.title')}
                        description={t(
                          'wizard.garageDoor.options.mounting.without.description',
                        )}
                        selected={!state.mountingRequested}
                        onClick={() => patchState({ mountingRequested: false })}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="rounded-xl border border-slate-200 bg-white p-5">
                    <legend className="block text-sm font-medium text-slate-700 mb-3 px-1">
                      {t('wizard.garageDoor.options.remotes.label')}
                    </legend>
                    <p className="text-sm text-slate-600 mb-3">
                      {t('wizard.garageDoor.options.remotes.subtitle')}
                    </p>
                    <p className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800 mb-4">
                      {t('wizard.garageDoor.options.remotes.includedInPrice', {
                        count: INCLUDED_REMOTE_COUNT,
                      })}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {REMOTE_PRESET_OPTIONS.map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() =>
                            patchState({
                              remoteCount: count,
                              remoteCountIsCustom: false,
                              remoteCountCustomInput: '',
                            })
                          }
                          className={cn(
                            'min-w-[3rem] rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors',
                            !state.remoteCountIsCustom &&
                              state.remoteCount === count
                              ? 'border-sky-500 bg-sky-50 text-sky-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300',
                          )}
                        >
                          {count === INCLUDED_REMOTE_COUNT
                            ? t('wizard.garageDoor.options.remotes.includedOption', {
                                count,
                              })
                            : count}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          patchState({
                            remoteCountIsCustom: true,
                          })
                        }
                        className={cn(
                          'rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors',
                          state.remoteCountIsCustom
                            ? 'border-sky-500 bg-sky-50 text-sky-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300',
                        )}
                      >
                        {t('wizard.garageDoor.options.remotes.more')}
                      </button>
                    </div>

                    {state.remoteCountIsCustom && (
                      <div className="mt-4">
                        <label
                          htmlFor="garage-door-custom-remotes"
                          className="block text-sm font-medium text-slate-700 mb-1"
                        >
                          {t('wizard.garageDoor.options.remotes.customLabel')}
                        </label>
                        <input
                          id="garage-door-custom-remotes"
                          type="number"
                          min={CUSTOM_REMOTE_MIN}
                          max={CUSTOM_REMOTE_MAX}
                          step={1}
                          value={state.remoteCountCustomInput}
                          onChange={(e) =>
                            patchState({
                              remoteCountCustomInput: e.target.value,
                            })
                          }
                          placeholder={t(
                            'wizard.garageDoor.options.remotes.customPlaceholder',
                          )}
                          className={inputClassName}
                        />
                        <p className="mt-2 text-xs text-slate-500">
                          {t('wizard.garageDoor.options.remotes.customHint', {
                            min: CUSTOM_REMOTE_MIN,
                            max: CUSTOM_REMOTE_MAX,
                          })}
                        </p>
                      </div>
                    )}
                  </fieldset>
                </div>
              )}

              {currentStep === 'dimensions' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {t('wizard.garageDoor.dimensions.title')}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {t('wizard.garageDoor.dimensions.subtitle')}
                    </p>
                  </div>
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
                  <p className="text-xs text-slate-500">
                    {t('wizard.garageDoor.dimensions.hint')}
                  </p>
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
                </div>
              )}

              {currentStep === 'style' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {t('wizard.garageDoor.style.title')}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {t('wizard.garageDoor.style.subtitle')}
                    </p>
                  </div>
                  <ColorSwatchPicker
                    colors={VRATI_COLORS}
                    value={state.color}
                    onChange={(color) =>
                      patchState({ color: color as ColorKey })
                    }
                  />

                  {state.color && (
                    <div className="lg:hidden">
                      <GarageDoorPreview
                        width={
                          parseDimensionInput(state.width) ?? DEFAULT_WIDTH
                        }
                        height={
                          parseDimensionInput(state.height) ?? DEFAULT_HEIGHT
                        }
                        color={state.color}
                        colorLabel={t(`colors.${state.color}`)}
                        motorRequested
                        mountingRequested={state.mountingRequested}
                        remoteCount={getEffectiveRemoteCount(state)}
                        remotesLabel={t('wizard.garageDoor.summary.remotes')}
                        previewTitle={t('wizard.garageDoor.preview.title')}
                        previewNote={t('wizard.garageDoor.preview.note')}
                        motorLabel={t('wizard.garageDoor.preview.motorBadge')}
                        mountingLabel={t('wizard.garageDoor.preview.mountingBadge')}
                        dimensionsLabel={t('wizard.garageDoor.summary.dimensions')}
                      />
                    </div>
                  )}
                </div>
              )}

              {currentStep === 'contact' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {t('wizard.garageDoor.contact.title')}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {t('wizard.garageDoor.contact.subtitle')}
                    </p>
                  </div>

                  <div className="lg:hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-sm font-bold text-slate-800">
                      {t('wizard.garageDoor.contact.configSummary')}
                    </h4>
                    <div className="mt-4">
                      <GarageDoorSummaryList rows={summaryRows} />
                    </div>
                    {state.color && (
                      <button
                        type="button"
                        onClick={() => setConfigPreviewOpen(true)}
                        className="mt-4 w-full rounded-lg border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100"
                      >
                        {t('wizard.garageDoor.contact.viewPreview')}
                      </button>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {t('forms.order.name')}
                      </label>
                      <input
                        type="text"
                        value={state.name}
                        onChange={(e) => patchState({ name: e.target.value })}
                        className={inputClassName}
                        required
                        minLength={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {t('forms.order.phone')}
                      </label>
                      <input
                        type="tel"
                        value={state.phone}
                        onChange={(e) => patchState({ phone: e.target.value })}
                        placeholder={t('forms.order.phonePlaceholder')}
                        className={inputClassName}
                        required
                        minLength={8}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t('forms.order.email')}
                    </label>
                    <input
                      type="email"
                      value={state.email}
                      onChange={(e) => patchState({ email: e.target.value })}
                      className={inputClassName}
                      required
                    />
                  </div>

                  <CitySearchSelect
                    id="garage-door-wizard-city"
                    value={state.city}
                    onChange={(city) => patchState({ city })}
                    label={t('forms.order.city')}
                    placeholder={t('forms.order.cityPlaceholder')}
                    inputClassName={inputClassName}
                  />

                  <fieldset>
                    <legend className="block text-sm font-medium text-slate-700 mb-2">
                      {t('wizard.garageDoor.contact.timeline.label')}
                    </legend>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {timelineOptions.map((option) => (
                        <label
                          key={option.value}
                          className={cn(
                            'flex cursor-pointer items-center rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
                            state.installTimeline === option.value
                              ? 'border-sky-500 bg-sky-50 text-sky-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
                          )}
                        >
                          <input
                            type="radio"
                            name="installTimeline"
                            value={option.value}
                            checked={state.installTimeline === option.value}
                            onChange={() =>
                              patchState({ installTimeline: option.value })
                            }
                            className="sr-only"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t('forms.order.notes')}
                    </label>
                    <textarea
                      rows={3}
                      value={state.notes}
                      onChange={(e) => patchState({ notes: e.target.value })}
                      placeholder={t('forms.order.notesPlaceholder')}
                      className={cn(inputClassName, 'resize-none')}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {message && status === 'error' && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {message}
            </p>
          )}

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
                  currentStep === 'dimensions'
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
            state={state}
            currentStep={currentStep}
            onViewPreview={() => setConfigPreviewOpen(true)}
          />
        </div>
      </div>

      <Dialog open={configPreviewOpen} onOpenChange={setConfigPreviewOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('wizard.garageDoor.contact.viewPreviewTitle')}</DialogTitle>
          </DialogHeader>

          {state.color && (
            <GarageDoorPreview
              width={parseDimensionInput(state.width) ?? DEFAULT_WIDTH}
              height={parseDimensionInput(state.height) ?? DEFAULT_HEIGHT}
              color={state.color}
              colorLabel={t(`colors.${state.color}`)}
              motorRequested
              mountingRequested={state.mountingRequested}
              remoteCount={getEffectiveRemoteCount(state)}
              remotesLabel={t('wizard.garageDoor.summary.remotes')}
              previewTitle={t('wizard.garageDoor.preview.title')}
              previewNote={t('wizard.garageDoor.preview.note')}
              motorLabel={t('wizard.garageDoor.preview.motorBadge')}
              mountingLabel={t('wizard.garageDoor.preview.mountingBadge')}
              dimensionsLabel={t('wizard.garageDoor.summary.dimensions')}
            />
          )}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <GarageDoorSummaryList
              rows={buildGarageDoorSummaryRows(state, 'contact', t)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
