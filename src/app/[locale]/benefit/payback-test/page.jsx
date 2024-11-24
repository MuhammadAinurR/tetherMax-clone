import { useTranslations } from 'next-intl';
import LocaleLink from '@/components/LocaleLink';

export default function PaybackTest() {
  const t = useTranslations('paybackTest');

  return (
    <div className="flex flex-col items-center px-4 py-8 bg-white">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">
          {t('title.main')}
          <br />
          {t('title.sub')}
        </h1>

        <div className="flex items-center justify-center gap-2 mb-4">
          <span>{t('checkTime.icon')}</span>
          <p>{t('checkTime.text')}</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-500">{t('benefit.icon')}</span>
          <p>
            {t('benefit.text')}{' '}
            <span className="text-primary-1 font-semibold">
              {t('benefit.coupon')}
            </span>
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="w-full max-w-md bg-primary-2 rounded-3xl p-8 text-center">
        <div className="mb-6">
          <span className="text-3xl">⏰</span>
          <h2 className="text-xl font-semibold mt-2">
            {t('calculator.title')}
          </h2>
          <h3 className="text-lg font-semibold mb-2">
            {t('calculator.timeRequired')}
          </h3>
          <p className="text-gray-600">{t('calculator.description')}</p>
        </div>

        <div className="mb-6">
          <span className="text-3xl">🧮</span>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            {t('curious.title')}
          </h2>
          <p className="text-gray-600">{t('curious.description')}</p>
        </div>
        <LocaleLink href="/payback">
          <button className="w-full bg-primary-1 text-white rounded-lg py-4 px-6 font-semibold hover:bg-primary-1 transition-colors">
            {t('button')}
          </button>
        </LocaleLink>
      </div>
    </div>
  );
}
