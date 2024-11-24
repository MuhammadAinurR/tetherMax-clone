import { useTranslations } from 'next-intl';
import LocaleLink from '@/components/LocaleLink';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Exchanges() {
  const t = useTranslations('benefits.exchanges');

  const rankings = [
    {
      position: t('rankings.positions.first.position'),
      reward: t('rankings.positions.first.reward'),
      icon: t('rankings.positions.first.icon'),
    },
    {
      position: t('rankings.positions.second.position'),
      reward: t('rankings.positions.second.reward'),
      icon: t('rankings.positions.second.icon'),
    },
    {
      position: t('rankings.positions.third.position'),
      reward: t('rankings.positions.third.reward'),
      icon: t('rankings.positions.third.icon'),
    },
    {
      position: t('rankings.positions.topTen.position'),
      reward: t('rankings.positions.topTen.reward'),
      icon: t('rankings.positions.topTen.icon'),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <main className="container px-4 py-16 flex justify-center">
        <div className="max-w-3xl text-center space-y-16">
          <section className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('title')}
              <br />
              {t('subtitle')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('withdrawalNote')}
            </p>
            <Card className="p-8 mt-8 inline-block shadow-md">
              <span className="bg-primary-2 text-primary-1 px-3 py-1.5 rounded-full text-sm font-medium">
                {t('monthlyReward')}
              </span>
              <p className="text-5xl py-6">🎉</p>
              <p className="font-semibold text-xl mb-2">
                {t('greeting.title')}
              </p>
              <p className="text-muted-foreground">{t('greeting.message')}</p>
            </Card>
          </section>

          <section className="bg-primary-1 text-white rounded-3xl p-8 sm:p-10 space-y-8 w-full shadow-lg">
            <h2 className="text-2xl font-semibold">{t('rankings.title')}</h2>
            <div className="w-full mx-auto space-y-4">
              {rankings.map((rank, index) => (
                <Card
                  key={index}
                  className="p-5 w-full hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{rank.icon}</span>
                      <span className="text-base font-medium">
                        {rank.position}
                      </span>
                    </div>
                    <span className="text-primary-1 font-semibold text-lg">
                      {rank.reward}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-[#F0F3F9] rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="text-5xl mb-6">💩</div>
            <h2 className="text-2xl font-semibold">{t('noRanking.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t('noRanking.message')}
            </p>
            <LocaleLink href="/uidlinking">
              <Button size="lg" className="mt-6 px-8 py-6 text-lg font-medium">
                {t('noRanking.button')}
              </Button>
            </LocaleLink>
          </section>

          <section className="text-base text-muted-foreground space-y-6 text-left">
            <h3 className="font-semibold text-xl text-foreground">
              {t('notes.title')}
            </h3>
            <ul className="list-disc pl-6 space-y-3">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <li key={num}>{t(`notes.item${num}`)}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
