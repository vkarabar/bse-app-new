'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/components/locale-provider';
import { postJsonApi } from '@/lib/post-json-api';
import { cn } from '@/lib/utils';

const inputClassName =
  'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent';

export function ContactForm() {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const formLoadedAt = useRef(Date.now());
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    if (!formRef.current.reportValidity()) return;

    setStatus('loading');
    setMessage('');

    const formData = new FormData(formRef.current);

    try {
      const result = await postJsonApi('/api/contact', {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        website: formData.get('website'),
        botcheck: formData.get('botcheck'),
        formLoadedAt: formLoadedAt.current,
      });

      if (!result.ok) {
        throw new Error(
          result.error === 'invalid_response'
            ? t('contact.errorServer')
            : result.error ?? t('contact.errorGeneric'),
        );
      }

      setStatus('success');
      setMessage(result.data?.message ?? '');
      formRef.current.reset();
      formLoadedAt.current = Date.now();
    } catch (err) {
      setStatus('error');
      setMessage(
        err instanceof Error ? err.message : t('contact.errorRetry'),
      );
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {t('contact.name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className={inputClassName}
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {t('contact.phoneLabel')}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            minLength={8}
            autoComplete="tel"
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          {t('contact.emailLabel')}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          {t('contact.subject')}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={200}
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          {t('contact.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          className={cn(inputClassName, 'resize-none')}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-main-dark w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? t('contact.submitting') : t('contact.submit')}
      </button>

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
  );
}
