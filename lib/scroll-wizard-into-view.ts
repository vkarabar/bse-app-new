function getSiteHeaderOffset(): number {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--site-header-offset')
    .trim();

  if (!value) return 0;

  const parsed = Number.parseFloat(value);
  if (Number.isFinite(parsed) && value.endsWith('px')) {
    return parsed;
  }

  if (value.endsWith('rem')) {
    const rootSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    return parsed * rootSize;
  }

  return 0;
}

export function scrollWizardIntoView(element: HTMLElement | null) {
  if (!element) return;

  const headerOffset = getSiteHeaderOffset();
  const formStart = element.getBoundingClientRect().top + window.scrollY;

  if (window.scrollY > formStart - headerOffset) {
    window.scrollTo({
      top: Math.max(0, formStart - headerOffset),
      behavior: 'smooth',
    });
  }
}

export function scrollIntoViewIfNeeded(
  element: HTMLElement | null,
  extraOffset = 16,
) {
  if (!element) return;

  const headerOffset = getSiteHeaderOffset();
  const rect = element.getBoundingClientRect();
  const visibleTop = headerOffset + extraOffset;
  const visibleBottom = window.innerHeight - extraOffset;
  const isVisible = rect.top >= visibleTop && rect.bottom <= visibleBottom;

  if (isVisible) return;

  const target = rect.top + window.scrollY - visibleTop;

  window.scrollTo({
    top: Math.max(0, target),
    behavior: 'smooth',
  });
}
