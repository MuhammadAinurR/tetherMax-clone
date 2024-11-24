'use client';

import Image from 'next/image';
import { Calendar, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LocaleLink from './LocaleLink';

export default function Events({ events }) {
  const t = useTranslations('events');

  return (
    <div className="w-full bg-background-1">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t('title')}</h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">{t('subtitle')}</p>
          </div>
          <LocaleLink href="/events">
            <button className="text-primary-1 hover:text-primary-1/80 transition-colors flex items-center text-sm font-medium">
              {t('viewAll')}
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </LocaleLink>
        </div>

        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4">
              {events?.map((event) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 w-[180px] group hover:transform hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="relative aspect-[4/4] mb-3">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      width={180}
                      height={180}
                      className="object-cover rounded-xl shadow-sm"
                    />
                  </div>
                  <h3 className="font-medium text-gray-600 text-sm mb-1">{event.title}</h3>
                  <p className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.subTitle}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time>{new Date(event.startDate).toLocaleDateString()}</time>
                    <span className="mx-2">-</span>
                    <time>{new Date(event.endDate).toLocaleDateString()}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
