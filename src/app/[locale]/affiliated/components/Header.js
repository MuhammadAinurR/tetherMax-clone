import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('affiliated');

  return (
    <div className="w-full bg-background-1">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          {t.rich('title', {
            highlight: (chunks) => <span className="text-primary-1">{chunks}</span>,
          })}
        </h1>
        <div className="space-y-2 mt-4">
          <p className="text-center text-gray-600">{t('subtitle')}</p>
          <p className="text-center text-sm text-gray-500">
            {t.rich('disclaimer', {
              highlight: (chunks) => <span className="text-primary-1">{chunks}</span>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
