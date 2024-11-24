import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { DownloadButtons } from '@/components/DownloadButtons';

export default function Download() {
  const t = useTranslations('download');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-primary-2">
      <main className="max-w-6xl w-full px-4 sm:px-6 py-8 sm:py-12 mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-base sm:text-lg mb-8 sm:mb-12 text-gray-700 max-w-2xl mx-auto px-4">
          {t('hero.subtitle')}
        </p>

        <DownloadButtons
          translations={{
            downloadApp: t('buttons.downloadApp'),
            appStore: t('buttons.appStore'),
            googlePlay: t('buttons.googlePlay'),
          }}
          variant="default"
        />

        <div className="mb-12 sm:mb-20 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            {t('benefits.title')}
          </h2>
          <p className="text-base sm:text-lg mb-8 sm:mb-12 text-gray-700 max-w-2xl mx-auto">
            {t('benefits.subtitle')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardContent className="flex flex-col items-center h-[300px] p-8">
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="h-32 w-32 relative flex items-center justify-center">
                    <Image
                      src="https://tethermax.io/static/icon/logo_fill.svg"
                      alt={t('features.contests')}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">
                  {t('features.contests')}
                </h3>
              </CardContent>
            </Card>
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardContent className="flex flex-col items-center h-[300px] p-8">
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="h-32 w-32 relative flex items-center justify-center">
                    <Image
                      src="https://tethermax.io/static/images/download/prize.svg"
                      alt={t('features.prizes')}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">
                  {t('features.prizes')}
                </h3>
              </CardContent>
            </Card>
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardContent className="flex flex-col items-center h-[300px] p-8">
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="h-32 w-32 relative flex items-center justify-center">
                    <Image
                      src="https://tethermax.io/static/images/download/gift.svg"
                      alt={t('features.airdrop')}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">
                  {t('features.airdrop')}
                </h3>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-xl mb-12 sm:mb-16 mx-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            {t('cta.question')}
          </h2>
          <Image
            src="https://tethermax.io/static/images/download/phone_view.png"
            alt={t('appScreenshot')}
            width={350}
            height={700}
            className="mx-auto rounded-3xl shadow-2xl max-w-full h-auto"
          />
        </div>

        <div className="bg-primary-1 text-white p-6 sm:p-12 rounded-2xl mx-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            {t('cta.tryApp')}
          </h2>
          <Image
            src="https://tethermax.io/static/images/landing/landingQr.png"
            alt={t('qrCode')}
            width={200}
            height={200}
            className="mx-auto mb-8 sm:mb-12 max-w-[150px] sm:max-w-[200px] h-auto"
          />
          <DownloadButtons
            translations={{
              downloadApp: t('buttons.downloadApp'),
              appStore: t('buttons.appStore'),
              googlePlay: t('buttons.googlePlay'),
            }}
            variant="secondary"
          />
        </div>
      </main>
    </div>
  );
}
