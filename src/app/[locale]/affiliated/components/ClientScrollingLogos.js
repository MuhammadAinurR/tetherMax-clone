'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const SCROLL_SPEED = 3;
const SCROLL_INTERVAL = 30;

export default function ClientScrollingLogos({ exchanges }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollContent = scrollContainer.firstElementChild;
    if (!scrollContent) return;

    const scrollAnimation = () => {
      if (scrollContainer.scrollLeft >= scrollContent.scrollWidth / 3) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
      } else {
        scrollContainer.scrollLeft += SCROLL_SPEED;
      }
    };

    const animationId = setInterval(scrollAnimation, SCROLL_INTERVAL);
    return () => clearInterval(animationId);
  }, []);

  // Create three sets of logos for smooth infinite scroll
  const tripleExchanges = [
    ...exchanges,
    ...exchanges,
    ...exchanges,
    ...exchanges,
    ...exchanges,
    ...exchanges,
    ...exchanges,
    ...exchanges,
    ...exchanges,
  ];

  return (
    <div className="relative overflow-hidden h-20">
      <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-background-1 to-transparent" />
      <div ref={scrollRef} className="absolute whitespace-nowrap overflow-x-scroll scrollbar-hide w-[300%]">
        <div className="inline-block">
          {tripleExchanges.map((exchange, index) => (
            <Image
              key={`${exchange.id}-${index}`}
              src={exchange.imageUrl}
              width={150}
              height={150}
              alt={`${exchange.name} logo`}
              className="inline-block w-20 h-20 mx-4 rounded-full bg-background-1"
            />
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-background-1 to-transparent" />
    </div>
  );
}
