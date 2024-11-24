'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import LocaleLink from '@/components/LocaleLink';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { platforms, tradeFrequencyOptions } from './data';
import {
  calculateEstimatedCashback,
  calculateMonthlyCommissionFee,
} from './utils/calculations';
import ExchangeSelector from './components/ExchangeSelector';
import LeverageInput from './components/LeverageInput';
import SeedInput from './components/SeedInput';
import TradeFrequencySelector from './components/TradeFrequencySelector';
import Results from './components/Results';
import { useTranslations } from 'next-intl';

export default function PaybackPage() {
  const t = useTranslations();
  const [step, setStep] = useState(0);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [leverage, setLeverage] = useState('');
  const [seed, setSeed] = useState('');
  const [tradeFrequency, setTradeFrequency] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const estimatedCashback = calculateEstimatedCashback(
    selectedExchange,
    leverage,
    seed,
    tradeFrequency
  );
  const monthlyFee = calculateMonthlyCommissionFee(
    tradeFrequency,
    Number(leverage),
    Number(seed),
    selectedExchange
  );

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <ExchangeSelector
            platforms={platforms}
            selectedExchange={selectedExchange}
            setSelectedExchange={setSelectedExchange}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <LeverageInput
              leverage={leverage}
              setLeverage={setLeverage}
              onNext={handleNext}
              onPrev={handlePrev}
            />
            <SeedInput
              seed={seed}
              setSeed={setSeed}
              selectedExchange={selectedExchange}
              onNext={handleNext}
              onPrev={handlePrev}
            />
            <TradeFrequencySelector
              tradeFrequency={tradeFrequency}
              setTradeFrequency={setTradeFrequency}
              tradeFrequencyOptions={tradeFrequencyOptions}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        );
      case 2:
        return (
          <Results
            estimatedCashback={estimatedCashback}
            monthlyFee={monthlyFee}
            selectedExchange={selectedExchange}
            setShowDialog={setShowDialog}
            platforms={platforms}
            onPrev={handlePrev}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex justify-center h-full mt-20">
      <div className="w-3/3 md:w-2/3 px-6 flex flex-col gap-4 mb-5">
        {renderStepContent()}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTitle className="hidden">
            {t('payback.exchangeStatus.title')}
          </DialogTitle>
          <DialogContent className="sm:max-w-md bg-white">
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                  {t('payback.exchangeStatus.message', {
                    exchange: selectedExchange,
                  })}
                </h2>
                <p className="text-gray-900 font-medium">
                  {t('payback.exchangeStatus.chooseExchange')}
                </p>
              </div>

              <LocaleLink href="/affiliated">
                <div className="flex items-center gap-3 mt-5">
                  <div className="w-8 h-8">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                        stroke="#0066FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16H20"
                        stroke="#0066FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 12V20"
                        stroke="#0066FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      {t('payback.exchangeStatus.chooseExchange')}
                    </p>
                  </div>
                </div>
              </LocaleLink>
              <LocaleLink href="/registExchange">
                <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-6 mt-6">
                  {t('payback.exchangeStatus.browseExchanges')}
                </Button>
              </LocaleLink>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
