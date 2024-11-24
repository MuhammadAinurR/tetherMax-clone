'use client';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import LocaleLink from '@/components/LocaleLink';

export default function ExchangeSelectionClient({ exchanges, translations }) {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [uid, setUid] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useUser();
  const [error, setError] = useState('');
  const [bindStatuses, setBindStatuses] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showAffiliatedModal, setShowAffiliatedModal] = useState(false);
  const router = useRouter();

  const fetchUserBinds = async () => {
    try {
      const response = await fetch(`/api/binds?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        const statusMap = data.reduce(
          (acc, bind) => ({
            ...acc,
            [bind.platformId]: {
              isBind: bind.isBind,
              uid: bind.uid,
            },
          }),
          {}
        );
        setBindStatuses(statusMap);
      }
    } catch (error) {
      console.error('Error fetching user binds:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserBinds();
    }
  }, [user?.id]);

  const getPlatformStatus = (platformId) => {
    return bindStatuses[platformId] || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/binds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platformId: selectedExchange.id,
          uid: uid,
          userId: user.id,
        }),
      });
      const data = await response.json();

      if (response.status === 409) {
        setError(
          translations.alreadyBoundError ||
            'This account is already bound to this platform'
        );
        return;
      }

      if (response.ok || response.status === 500) {
        setIsOpen(false);
        setUid('');
        setShowSuccessModal(true);
        fetchUserBinds();
      } else {
        throw new Error(data.error || 'Failed to bind account');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(
        translations.genericError || 'An error occurred. Please try again.'
      );
    }
  };

  const handleAffiliatedClick = (e) => {
    e.preventDefault();
    setShowAffiliatedModal(true);
  };

  const handleAffiliatedConfirm = () => {
    setShowAffiliatedModal(false);
    router.push('/affiliated');
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {translations.title}
        </h1>
        <p className="text-gray-600 text-center mb-10">
          {translations.subtitle}
        </p>

        <ul className="space-y-2">
          {exchanges
            .slice()
            .sort((a, b) => {
              const statusA = getPlatformStatus(a.id);
              const statusB = getPlatformStatus(b.id);

              const getPriority = (status) => {
                if (!status) return 0;
                if (!status.isBind) return 1;
                return 2;
              };

              const priorityA = getPriority(statusA);
              const priorityB = getPriority(statusB);

              if (priorityA !== priorityB) {
                return priorityA - priorityB;
              }

              return a.name.localeCompare(b.name);
            })
            .map((exchange) => {
              const status = getPlatformStatus(exchange.id);
              const isDisabled = status !== null;
              const isPending = status && !status.isBind;
              const isBound = status && status.isBind;
              return (
                <li key={exchange.id}>
                  <Button
                    variant="outline"
                    className={`w-full justify-between text-left font-normal transition-colors duration-200 p-6 rounded-xl overflow-hidden bg-white py-10 ${
                      isBound
                        ? 'border-green-200 bg-green-50 cursor-not-allowed'
                        : isPending
                        ? 'border-yellow-200 bg-yellow-50 cursor-not-allowed'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelectedExchange(exchange);
                        setIsOpen(true);
                      }
                    }}
                    disabled={isDisabled}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg shadow-sm">
                        <Image
                          src={exchange.imageUrl}
                          alt={`${exchange.name} logo`}
                          width={48}
                          height={48}
                          className={`rounded-lg ${
                            !isDisabled &&
                            'hover:scale-125 transition-transform duration-200'
                          }`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-medium text-gray-700">
                          {exchange.name}
                        </span>
                        {status && (
                          <span
                            className={`text-sm ${
                              isBound ? 'text-green-600' : 'text-yellow-600'
                            }`}
                          >
                            {isBound
                              ? translations.boundStatus || 'Already Bound'
                              : translations.pendingStatus ||
                                'Waiting for verification'}
                          </span>
                        )}
                        {status && (
                          <span className="text-sm text-gray-500">
                            UID {status.uid}
                          </span>
                        )}
                      </div>
                    </div>
                    {!isDisabled && (
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    )}
                  </Button>
                </li>
              );
            })}

          <li className="mt-6 pt-6 border-t border-gray-200">
            <LocaleLink href="/registExchange">
              <Button
                variant="outline"
                className="w-full justify-between text-left font-normal hover:bg-blue-50 transition-colors duration-200 p-4 md:p-6 rounded-xl border-blue-200 overflow-hidden md:py-10"
              >
                <div className="flex items-center gap-2 md:space-x-4">
                  <div className="hidden md:block p-1 md:p-2 rounded-lg shadow-sm">
                    <Image
                      src="https://tethermax.io/static/images/exchange/TethermaxIcon.png"
                      alt="degenMax logo"
                      width={48}
                      height={48}
                      className="rounded-lg w-8 h-8 md:w-12 md:h-12"
                    />
                  </div>
                  <span className="text-sm md:text-lg font-medium text-blue-600 break-words">
                    {translations.signupButton}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-blue-400 flex-shrink-0" />
              </Button>
            </LocaleLink>
          </li>
        </ul>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                {selectedExchange && (
                  <>
                    <Image
                      src={selectedExchange.imageUrl}
                      alt={`${selectedExchange.name} logo`}
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    {selectedExchange.name}
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder={translations.uidPlaceholder}
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                required
              />
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              <Button type="submit" className="w-full">
                {translations.submitButton}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-center">
                {translations.successTitle || 'Success!'}
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                {translations.successMessage ||
                  'Your request has been submitted. The process will take approximately 2-5 business days to complete.'}
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full"
            >
              {translations.okButton || 'OK'}
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog
          open={showAffiliatedModal}
          onOpenChange={setShowAffiliatedModal}
        >
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-center">
                {translations.browseExchangesTitle ||
                  'Shall we browse partner exchanges?'}
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                {translations.browseExchangesDescription ||
                  'Take a look at exchanges and enjoy cashback benefits!'}
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAffiliatedModal(false)}
              >
                {translations.noThanks || 'No, thanks.'}
              </Button>
              <Button className="flex-1" onClick={handleAffiliatedConfirm}>
                {translations.yes || 'Yes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
