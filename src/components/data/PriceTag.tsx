import React from 'react';
import { cn } from '@/lib/utils';
import { Tag, TagProps } from '@/components/data/Tag';

export interface PriceTagProps extends Omit<TagProps, 'children'> {
  price: number;
  currency?: string;
  locale?: string;
  showCurrency?: boolean;
  oldPrice?: number;
  discount?: number;
  discountType?: 'percentage' | 'amount';
  showDiscount?: boolean;
  priceClassName?: string;
  oldPriceClassName?: string;
  discountClassName?: string;
}

/**
 * Composant réutilisable pour afficher un prix
 */
export const PriceTag = ({
  price,
  currency = 'EUR',
  locale = 'fr-FR',
  showCurrency = true,
  oldPrice,
  discount,
  discountType = 'percentage',
  showDiscount = true,
  priceClassName,
  oldPriceClassName,
  discountClassName,
  ...tagProps
}: PriceTagProps) => {
  // Formater le prix
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(locale, {
      style: showCurrency ? 'currency' : 'decimal',
      currency: showCurrency ? currency : undefined,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Calculer la remise si elle n'est pas fournie
  const calculatedDiscount = React.useMemo(() => {
    if (discount !== undefined) return discount;
    if (!oldPrice || oldPrice <= price) return 0;
    
    if (discountType === 'percentage') {
      return Math.round(((oldPrice - price) / oldPrice) * 100);
    }
    
    return oldPrice - price;
  }, [price, oldPrice, discount, discountType]);

  // Formater la remise
  const formattedDiscount = React.useMemo(() => {
    if (!calculatedDiscount) return '';
    
    if (discountType === 'percentage') {
      return `-${calculatedDiscount}%`;
    }
    
    return `-${formatPrice(calculatedDiscount)}`;
  }, [calculatedDiscount, discountType]);

  return (
    <Tag {...tagProps}>
      <div className="flex items-center gap-2">
        <span className={cn('font-medium', priceClassName)}>
          {formatPrice(price)}
        </span>
        
        {oldPrice && oldPrice > price && (
          <span className={cn(
            'text-muted-foreground line-through text-xs',
            oldPriceClassName
          )}>
            {formatPrice(oldPrice)}
          </span>
        )}
        
        {showDiscount && calculatedDiscount > 0 && (
          <span className={cn(
            'text-green-600 dark:text-green-400 text-xs font-medium',
            discountClassName
          )}>
            {formattedDiscount}
          </span>
        )}
      </div>
    </Tag>
  );
};

export default PriceTag; 