'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '@/app/proizvodi/product-card';
import { GarageDoorOrderWizard } from '@/components/garage-door-order-wizard';
import { QuoteProductWizard } from '@/components/quote-product-wizard';
import { useLocale, useTranslations } from '@/components/locale-provider';
import { ProductOrderSection } from '@/components/product-order-form';
import {
  getOrderPageProduct,
  isValidMotorVariant,
  MOTOR_VARIANT_OPTIONS,
  ORDER_PAGE_PRODUCTS,
} from '@/lib/order-page-products';
import { localizedPath, type Locale } from '@/lib/i18n/locales';
import { PERGOLI_COLORS, ZAVESI_COLORS } from '@/lib/product-colors';

function buildNaracajPath(
  locale: Locale,
  product?: string,
  variant?: string,
) {
  const params = new URLSearchParams();
  if (product) params.set('product', product);
  if (variant) params.set('variant', variant);
  const query = params.toString();
  return localizedPath(query ? `/naracaj?${query}` : '/naracaj', locale);
}

function OrderProductPicker({
  onSelect,
}: {
  onSelect: (productId: string) => void;
}) {
  const t = useTranslations();

  return (
    <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
      {ORDER_PAGE_PRODUCTS.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => onSelect(product.id)}
          className="text-left"
        >
          <ProductCard
            iconSrc={product.iconSrc}
            label={t(product.labelKey)}
            isNew={product.isNew}
            newLabel={t('common.new')}
          />
        </button>
      ))}
    </div>
  );
}

function MotorVariantPicker({
  onSelect,
  onBack,
}: {
  onSelect: (variant: string) => void;
  onBack: () => void;
}) {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
      >
        <ChevronLeft className="h-4 w-4" />
        {t('naracajPage.backToProducts')}
      </button>

      <div>
        <h2 className="text-xl font-bold text-slate-800">
          {t('naracajPage.chooseMotor')}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {t('orders.productLabels.motori-porti')}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        {MOTOR_VARIANT_OPTIONS.map((motor) => (
          <button
            key={motor.id}
            type="button"
            onClick={() => onSelect(motor.id)}
            className="text-left"
          >
            <ProductCard iconSrc={motor.iconSrc} label={t(motor.labelKey)} />
          </button>
        ))}
      </div>
    </div>
  );
}

function OrderFlow({
  productId,
  variant,
  onBack,
  onSelectVariant,
}: {
  productId: string;
  variant: string | null;
  onBack: () => void;
  onSelectVariant: (variant: string) => void;
}) {
  const t = useTranslations();
  const selectedProduct = getOrderPageProduct(productId);

  if (!selectedProduct) {
    return null;
  }

  if (selectedProduct.id === 'motori-porti' && !isValidMotorVariant(variant)) {
    return (
      <MotorVariantPicker onSelect={onSelectVariant} onBack={onBack} />
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
      >
        <ChevronLeft className="h-4 w-4" />
        {t('naracajPage.backToProducts')}
      </button>

      <div>
        <h2 className="text-xl font-bold text-slate-800">
          {t(selectedProduct.labelKey)}
        </h2>
      </div>

      {selectedProduct.id === 'vrati' && (
        <GarageDoorOrderWizard showHeader={false} />
      )}

      {selectedProduct.id === 'pergoli' && (
        <QuoteProductWizard
          product="pergoli"
          colors={PERGOLI_COLORS}
          showHeader={false}
        />
      )}

      {selectedProduct.id === 'zavesi' && (
        <QuoteProductWizard
          product="zavesi"
          colors={ZAVESI_COLORS}
          showHeader={false}
        />
      )}

      {selectedProduct.id === 'motori-porti' && isValidMotorVariant(variant) && (
        <ProductOrderSection product="motori-porti" motorVariant={variant} />
      )}
    </div>
  );
}

export function OrderPageHub() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const productId = searchParams.get('product');
  const variant = searchParams.get('variant');

  function goToProducts() {
    router.push(buildNaracajPath(locale));
  }

  function selectProduct(nextProductId: string) {
    router.push(buildNaracajPath(locale, nextProductId));
  }

  function selectVariant(nextVariant: string) {
    if (!productId) return;
    router.push(buildNaracajPath(locale, productId, nextVariant));
  }

  if (!productId) {
    return <OrderProductPicker onSelect={selectProduct} />;
  }

  const selectedProduct = getOrderPageProduct(productId);
  if (!selectedProduct) {
    return <OrderProductPicker onSelect={selectProduct} />;
  }

  return (
    <OrderFlow
      productId={productId}
      variant={variant}
      onBack={goToProducts}
      onSelectVariant={selectVariant}
    />
  );
}
