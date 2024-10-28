"use client";
import Image from "next/image";
import { ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const exchanges = [
  {
    name: "Bybit",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/bybit.png",
  },
  {
    name: "MEXC",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/fb401999-b8d8-4bbf-a5f7-b739f5c9e10d.png",
  },
  {
    name: "Bitget",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/bitget.png",
  },
  {
    name: "OKX",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/okx.png",
  },
  {
    name: "DeepCoin",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/f70a297d-abca-4cab-a19a-1bcf22adef8d.png",
  },
  {
    name: "BVOX",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/a22ea981-fa8b-47f9-8fe2-ea644e3474cc.png",
  },
  {
    name: "BingX",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/bingx.png",
  },
  {
    name: "CoinCatch",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/41e8fea2-5f9a-43b1-aeda-35bd5faad4b6.png",
  },
  {
    name: "Zoomex",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/84725bcd-050f-4ded-b81f-5d167e5bf251.png",
  },
  {
    name: "BitMEX",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/a53d0158-e7b7-43c5-b22a-60bc097ae730.png",
  },
  {
    name: "BitMart",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/885ffad0-35f4-41cc-a2d3-77bba1c09615.png",
  },
  {
    name: "WOOX",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/ba9c3ce9-e94d-4464-9e95-674a4349e46e.png",
  },
  {
    name: "BloFin",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/c340b25d-db6a-42bb-bb4b-bf72a90837b4.png",
  },
  {
    name: "HTX",
    logo: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/htx.png",
  },
];

export default function ExchangeSelection() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Which exchange have you joined as a referral of degenMax?
        </h1>

        <ul className="space-y-1">
          {exchanges.map((exchange, index) => (
            <li key={index}>
              <Button
                variant="outline"
                className="w-full justify-between text-left font-normal py-8"
              >
                <div className="flex items-center">
                  <Image
                    src={exchange.logo}
                    alt={`${exchange.name} logo`}
                    width={44}
                    height={44}
                    className="mr-3 rounded-full"
                  />
                  {exchange.name}
                </div>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </li>
          ))}
          <li>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal py-8"
              onClick={() => router.push("/affiliated")}
            >
              <div className="flex items-center">
                <Image
                  src="https://tethermax.io/static/images/exchange/TethermaxIcon.png"
                  alt="degenMax logo"
                  width={44}
                  height={44}
                  className="mr-3"
                />
                I will sign up first with invitation code of degenMax
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </li>
        </ul>
      </main>
    </div>
  );
}
