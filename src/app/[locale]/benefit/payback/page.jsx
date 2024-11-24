import LocaleLink from '@/components/LocaleLink';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Payback() {
  const t = useTranslations('payback');

  return (
    <div className="w-full">
      <main className="py-12 w-full">
        <div className="mx-auto text-center space-y-12">
          <section className="space-y-4">
            <h1 className="text-2xl font-bold">{t('firstCashback.title')}</h1>
            <p className="text-muted-foreground">
              {t('firstCashback.subtitle')}
            </p>
            <div className="flex flex-col items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-green-500">🎉</span>
                <span className="font-medium">
                  {t('firstCashback.benefits')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-primary-1 font-medium">10 USDT</span>
                <span>{t('firstCashback.couponInfo')}</span>
              </div>
              <Image
                src="https://tethermax.io/static/images/animation/Payback.gif"
                alt="Cashback"
                width={256}
                height={256}
              />
            </div>
          </section>
          <section className="bg-[#F0F3F9] p-8 space-y-4 mx-12 rounded-xl">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">$</span>
            </div>
            <h2 className="text-2xl font-bold">
              {t('extraCoupon.title', { amount: '10 USDT' })}
            </h2>
            <p className="text-muted-foreground">{t('extraCoupon.subtitle')}</p>
            <LocaleLink href="/benefit/cashback-history">
              <Button className="mt-4" size="lg">
                {t('extraCoupon.button', { amount: '10 USDT' })}
              </Button>
            </LocaleLink>
          </section>
        </div>
      </main>
    </div>
  );
}
