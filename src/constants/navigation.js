export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const getMenuItems = (t) => ({
  authenticated: [
    {
      name: t('partnerExchange'),
      path: '/affiliated',
      icon: 'https://tethermax.io/static/images/sideMenu/exchange.png',
    },
    {
      name: t('benefits'),
      path: '/benefit',
      icon: 'https://tethermax.io/static/images/sideMenu/benefit.png',
    },
    {
      name: t('appDownload'),
      path: '/download',
      icon: 'https://tethermax.io/static/images/sideMenu/download.png',
    },
  ],
  unauthenticated: [
    {
      name: t('partnerExchange'),
      path: '/affiliated',
      icon: 'https://tethermax.io/static/images/sideMenu/exchange.png',
    },
    {
      name: t('serviceIntro'),
      path: '/service-intro',
      icon: null,
    },
    {
      name: t('calculator'),
      path: '/payback',
      icon: null,
    },
  ],
});
