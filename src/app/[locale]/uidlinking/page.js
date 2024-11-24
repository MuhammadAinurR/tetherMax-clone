import { getPlatforms } from '@/services/platformService';
import { getTranslations } from 'next-intl/server';
import ExchangeSelectionClient from './ExchangeSelectionClient';

export default async function ExchangeSelection() {
  const exchanges = await getPlatforms();
  const plainExchanges = exchanges.map((exchange) => exchange.toJSON());
  const t = await getTranslations('uidLinking');

  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    uidPlaceholder: t('uidPlaceholder'),
    submitButton: t('submitButton'),
    signupButton: t('signupButton'),
  };

  return (
    <ExchangeSelectionClient
      exchanges={plainExchanges}
      translations={translations}
    />
  );
}
