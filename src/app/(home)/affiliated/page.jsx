"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { useEffect, useRef } from "react";
const exchangesTable = [
  {
    name: "Bybit",
    label: "BEST",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/bybit.png",
    cashback: "30%",
    trading: "20%",
    rebate: "$578",
    limitPrice: "0.014%",
    marketPrice: "0.031%",
  },
  {
    name: "MEXC",
    label: "Returned",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/fb401999-b8d8-4bbf-a5f7-b739f5c9e10d.png",
    cashback: "70%",
    trading: "-",
    rebate: "$298",
    limitPrice: "0.000%",
    marketPrice: "0.006%",
  },
  {
    name: "Bitget",
    label: "TOP5",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/okx.png",
    cashback: "54%",
    trading: "50%",
    rebate: "$885",
    limitPrice: "0.009%",
    marketPrice: "0.018%",
  },
  {
    name: "OKX",
    label: "TOP vol.",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/okx.png",
    cashback: "54%",
    trading: "-",
    rebate: "$583",
    limitPrice: "0.009%",
    marketPrice: "0.023%",
  },
  {
    name: "DeepCoin",
    label: "TOP",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/f70a297d-abca-4cab-a19a-1bcf22adef8d.png",
    cashback: "70%",
    trading: "50%",
    rebate: "$472",
    limitPrice: "0.006%",
    marketPrice: "0.012%",
  },
  {
    name: "BVOX",
    label: "X200",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/a22ea981-fa8b-47f9-8fe2-ea644e3474cc.png",
    cashback: "60%",
    trading: "-",
    rebate: "$104",
    limitPrice: "0.016%",
    marketPrice: "0.024%",
  },
  {
    name: "BingX",
    label: "Signed",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/icon/bingx.png",
    cashback: "60%",
    trading: "-",
    rebate: "$116",
    limitPrice: "0.008%",
    marketPrice: "0.020%",
  },
  {
    name: "CoinCatch",
    label: "PoR",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/41e8fea2-5f9a-43b1-aeda-35bd5faad4b6.png",
    cashback: "60%",
    trading: "-",
    rebate: "$632",
    limitPrice: "0.008%",
    marketPrice: "0.024%",
  },
  {
    name: "Zoomex",
    label: "NEW",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/84725bcd-050f-4ded-b81f-5d167e5bf251.png",
    cashback: "40%",
    trading: "30%",
    rebate: "$73",
    limitPrice: "0.008%",
    marketPrice: "0.025%",
  },
  {
    name: "BitMEX",
    label: "Exclusive",
    icon: "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/a53d0158-e7b7-43c5-b22a-60bc097ae730.png",
    cashback: "70%",
    trading: "-",
    rebate: "$31",
    limitPrice: "-0.015%",
    marketPrice: "0.022%",
  },
];

export default function Component() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollContent = scrollContainer.firstElementChild;
    if (!scrollContent) return;

    const scrollAnimation = () => {
      if (scrollContainer.scrollLeft >= scrollContent.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const animationId = setInterval(scrollAnimation, 30);

    return () => clearInterval(animationId);
  }, []);

  return (
    <div className="flex-col flex items-center justify-center p-4">
      <div className="w-full space-y-8">
        <h1 className="text-4xl font-bold text-center">
          Explore the <span className="text-blue-600">Partner Exchanges</span>{" "}
          of degenMax !
        </h1>
        <p className="text-center text-gray-600">
          {"degenMax partners with the world's leading crypto exchanges"}
        </p>
        <p className="text-center text-sm text-gray-500">
          * The only place that has{" "}
          <span className="text-blue-600">
            official contracts with major partners
          </span>{" "}
          is degenMax .
        </p>

        <div className="relative overflow-hidden" style={{ height: "60px" }}>
          <div
            ref={scrollRef}
            className="absolute whitespace-nowrap overflow-x-scroll scrollbar-hide"
            style={{ width: "200%" }}
          >
            <div className="inline-block">
              {exchangesTable.concat(exchangesTable).map((exchange, index) => (
                <Image
                  key={index}
                  src={exchange.icon}
                  width={50}
                  height={50}
                  alt={`Partner logo ${index + 1}`}
                  className="inline-block w-12 h-12 mx-4 rounded-full bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Table */}
      <div className="bg-white pt-[39px]">
        <div className="px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {"degenMax's Partner Exchanges"}
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            {"We've prepared not only cashback but also trading contests"}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 overflow-hidden md:table">
            <thead className="hidden md:table-header-group">
              <tr className="border-t border-b">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exchange Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cashback Rate (%)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trading Discount (%)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Rebate per User
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Limit Price (%)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Price (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 md:table-row-group">
              {exchangesTable.map((exchange) => (
                <tr
                  key={exchange.name}
                  className="md:table-row block border-b md:border-none"
                >
                  <td className="px-4 py-4 md:px-4 md:py-4 md:whitespace-nowrap md:table-cell flex flex-col md:flex-row items-start md:items-center">
                    <span className="md:hidden text-xs font-semibold text-gray-500">
                      Exchange Name
                    </span>
                    <div className="flex items-center mt-1 md:mt-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={exchange.icon}
                        alt={exchange.name}
                        width={32}
                        height={32}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {exchange.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {exchange.label}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 md:whitespace-nowrap text-blue-600 md:table-cell flex flex-col">
                    <span className="md:hidden text-xs font-semibold text-gray-500">
                      Cashback Rate (%)
                    </span>
                    {exchange.cashback}
                  </td>
                  <td className="px-4 py-4 md:whitespace-nowrap text-blue-600 md:table-cell flex flex-col">
                    <span className="md:hidden text-xs font-semibold text-gray-500">
                      Trading Discount (%)
                    </span>
                    {exchange.trading}
                  </td>
                  <td className="px-4 py-4 md:whitespace-nowrap text-gray-500 md:table-cell flex flex-col">
                    <span className="md:hidden text-xs font-semibold text-gray-500">
                      Average Rebate per User
                    </span>
                    {exchange.rebate}
                  </td>
                  <td className="px-4 py-4 md:whitespace-nowrap text-gray-500 md:table-cell flex flex-col">
                    <span className="md:hidden text-xs font-semibold text-gray-500">
                      Limit Price (%)
                    </span>
                    {exchange.limitPrice}
                  </td>
                  <td className="px-4 py-4 md:whitespace-nowrap text-gray-500 md:table-cell flex flex-col">
                    <span className="md:hidden text-xs font-semibold text-gray-500">
                      Market Price (%)
                    </span>
                    {exchange.marketPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
