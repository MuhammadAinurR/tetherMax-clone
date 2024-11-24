'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function DownloadButtons({ translations, variant = 'default' }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const TopButtons = () => (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 max-w-2xl mx-auto mb-12 sm:mb-16 px-4">
      <Button
        variant="default"
        className="flex items-center justify-center space-x-3 py-8 bg-primary-1 text-white hover:bg-gray-700 transition-all"
        onClick={() => setIsDialogOpen(true)}
      >
        <Image
          src="https://tethermax.io/static/images/play_store.png"
          alt="Google Play"
          width={32}
          height={32}
        />
        <span className="text-lg">{translations.downloadApp}</span>
      </Button>
      <Button
        variant="default"
        className="flex items-center justify-center space-x-3 py-8 bg-primary-1 text-white hover:bg-gray-700 transition-all"
        onClick={() => setIsDialogOpen(true)}
      >
        <Image
          src="https://tethermax.io/static/images/apple.png"
          alt="App Store"
          width={32}
          height={32}
        />
        <span className="text-lg">{translations.downloadApp}</span>
      </Button>
    </div>
  );

  const BottomButtons = () => (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <Button
        variant="secondary"
        className="text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 bg-white text-primary-1 hover:text-white hover:bg-gray-700"
        onClick={() => setIsDialogOpen(true)}
      >
        {translations.appStore}
      </Button>
      <Button
        variant="secondary"
        className="text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 bg-white text-primary-1 hover:text-white hover:bg-gray-700"
        onClick={() => setIsDialogOpen(true)}
      >
        {translations.googlePlay}
      </Button>
    </div>
  );

  return (
    <>
      {variant === 'default' ? <TopButtons /> : <BottomButtons />}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Coming Soon!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-gray-600">
              {
                "We're working hard to bring you our mobile app. Please check back later!"
              }
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
