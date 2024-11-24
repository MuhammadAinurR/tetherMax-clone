'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { siteConfig } from '@/config/metadata';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useClerk } from '@clerk/nextjs';
import { showToast } from '@/utils/toastify';
import { useTranslations } from 'next-intl';

export default function InvitationCodePage() {
  const { user } = useClerk();
  const userId = user?.id;

  const [referralCode, setReferralCode] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations('benefits.invitation');

  useEffect(() => {
    const fetchReferralCode = async () => {
      if (!userId) return;
      setLoading(true);

      try {
        const response = await fetch(`/api/referralCode?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setReferralCode(data.referralCode);
        } else {
          setReferralCode(null);
        }
      } catch (error) {
        console.error('Error fetching referral code:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralCode();
  }, [userId]);

  const handleGenerateCode = async () => {
    if (!userId) return;

    try {
      const response = await fetch('/api/referralCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setReferralCode(data.referralCode);
      } else {
        console.error('Error generating referral code:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating referral code:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    showToast('success', 'Referral code copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50 flex items-center justify-center">
      <main className="container px-4 py-16 max-w-7xl">
        <div className="mx-auto max-w-7xl text-center space-y-20">
          <section className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              {t('hero.title')}{' '}
              <span className="text-primary-1 inline-block animate-pulse">
                {t('hero.inviteFriendsText')}
              </span>
            </h1>
            <div className="relative group flex items-center justify-center w-full">
              <div className="w-[400px] h-[240px] mt-5">
                <Image
                  src="/images/inviteFriends.jpg"
                  alt={`${siteConfig.name} calculator`}
                  width={900}
                  height={900}
                  className="transform group-hover:scale-125 transition-all duration-300 rounded-2xl shadow-lg"
                  priority
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </section>

          <section className="bg-green-50/80 backdrop-blur rounded-3xl p-10 space-y-6 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {t('profitSection.title.prefix')}{' '}
              <span className="text-primary-1">
                {t('profitSection.title.highlight')}
              </span>
              <br />
              {t('profitSection.title.suffix')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('profitSection.subtitle')}
            </p>

            <div className="space-y-8 mt-10">
              <Card className="p-6 inline-block hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    👤
                  </span>
                  <div className="flex-1 text-left">
                    <p className="text-sm">
                      {t('profitSection.friendCard.label')}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {t('profitSection.friendCard.cashbackLabel')}
                      </span>
                      <span className="text-primary-1">
                        {t('profitSection.friendCard.cashbackAmount')}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="text-center space-y-2">
                <div className="text-3xl animate-bounce">⬇</div>
              </div>

              <Card className="p-6 inline-block bg-primary-1/5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-2 flex items-center justify-center">
                    👤
                  </span>
                  <div className="flex-1 text-left">
                    <p className="text-sm">
                      {t('profitSection.yourCard.label')}
                    </p>
                    <p className="text-primary-1">
                      {t('profitSection.yourCard.profit')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="bg-blue-50/80 backdrop-blur rounded-3xl p-10 space-y-6 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {t('referralCodeSection.title')}
            </h2>
            <div className="max-w-md mx-auto space-y-4 rounded-xl overflow-hidden">
              {loading ? (
                <p>{t('referralCodeSection.loading')}</p>
              ) : referralCode ? (
                <div className="bg-white p-4 flex items-center justify-between border shadow-sm rounded-xl">
                  <code className="text-xl font-mono text-primary-1">
                    {referralCode}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-1 hover:text-primary-1/80"
                    onClick={copyToClipboard}
                  >
                    <span className="mr-2">📋</span>
                    {t('referralCodeSection.copyButton')}
                  </Button>
                </div>
              ) : (
                <div className="p-1">
                  <p>{t('referralCodeSection.noCode')}</p>
                  <Button
                    onClick={handleGenerateCode}
                    size="lg"
                    className="mt-6 text-lg px-8 py-6 hover:scale-105 transition-transform rounded-xl shadow-md"
                  >
                    {t('referralCodeSection.generateButton')}
                  </Button>
                </div>
              )}
            </div>
          </section>

          <section className="bg-purple-50/80 backdrop-blur rounded-3xl p-10 space-y-6 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {t('enterCodeSection.title')}
            </h2>
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder={t('enterCodeSection.inputPlaceholder')}
                  className="text-lg h-12 rounded-l-xl border-1 shadow-md focus:border-2"
                />
                <Button className="px-8 h-12 rounded-r-xl shadow-md">
                  {t('enterCodeSection.applyButton')}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('enterCodeSection.helperText')}
              </p>
            </div>
          </section>

          <section className="space-y-6 bg-white/50 backdrop-blur rounded-3xl p-10">
            <div className="w-20 h-20 mx-auto bg-primary-1/10 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎁</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {t('giftSection.title.prefix')}
              <br />
              <span className="text-primary-1">
                {t('giftSection.title.highlight')}
              </span>
              {t('giftSection.title.suffix')}
            </h2>
          </section>

          <section className="bg-primary-1/5 rounded-3xl p-10 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t('callToAction.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('callToAction.subtitle')}
            </p>
            <Button
              size="lg"
              className="mt-6 text-lg px-8 py-6 hover:scale-105 transition-transform rounded-xl shadow-md"
            >
              {t('callToAction.button')}
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}
