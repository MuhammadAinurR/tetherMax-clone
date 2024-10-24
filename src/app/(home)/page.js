import Image from "next/image";
import { Search, InfinityIcon, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const exchanges = [
    { name: "Bybit", value: 577 },
    { name: "MEXC", value: 297 },
    { name: "Bitget", value: 885 },
    { name: "OKX", value: 583 },
    { name: "DeepCoin", value: 471 },
    { name: "BVOX", value: 103 },
    { name: "Bybit", value: 577 },
    { name: "MEXC", value: 297 },
    { name: "Bitget", value: 885 },
    { name: "OKX", value: 583 },
    { name: "DeepCoin", value: 471 },
    { name: "BVOX", value: 103 },
  ];

  const events = [
    {
      title: "Bybit WSOT Competition",
      reward: "10,000,000 USDT",
      subtext: "Reward Pool",
      date: "24.10.01 - 24.10.31",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/0360c2f1-d3e4-49fe-9552-c6106b6693a6.png",
    },
    {
      title: "Oct MEXC Competition",
      reward: "30,000 USDT",
      subtext: "Reward + Cashback",
      date: "24.10.01 - 24.10.31",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/431f5235-904b-4c1e-8efa-fe573f2c8eef.jpg",
    },
    {
      title: "Zoomex Deposit & Trading Event",
      reward: "Up to 15,000 USDT",
      date: "24.10.24 - 24.11.30",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/7e308d9e-00d1-42a3-bd7c-1ae16ea4d016.png",
    },
    {
      title: "DeepCoin Sign-up Event",
      reward: "Deposit to Earn 3,000 USDT",
      date: "24.10.01 - 24.10.30",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/f1f79a96-f3d3-40d2-8661-532c94e26cb2.png",
    },
    {
      title: "SuperX Futures Championship Contest",
      reward: "Share up to 600,000",
      date: "24.10.21 - 24.11.04",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/ed6338b8-4afe-459c-b492-71ca200c1540.png",
    },
    {
      title: "Bybit WSOT Competition",
      reward: "10,000,000 USDT",
      subtext: "Reward Pool",
      date: "24.10.01 - 24.10.31",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/0360c2f1-d3e4-49fe-9552-c6106b6693a6.png",
    },
    {
      title: "Oct MEXC Competition",
      reward: "30,000 USDT",
      subtext: "Reward + Cashback",
      date: "24.10.01 - 24.10.31",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/431f5235-904b-4c1e-8efa-fe573f2c8eef.jpg",
    },
    {
      title: "Zoomex Deposit & Trading Event",
      reward: "Up to 15,000 USDT",
      date: "24.10.24 - 24.11.30",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/7e308d9e-00d1-42a3-bd7c-1ae16ea4d016.png",
    },
    {
      title: "DeepCoin Sign-up Event",
      reward: "Deposit to Earn 3,000 USDT",
      date: "24.10.01 - 24.10.30",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/f1f79a96-f3d3-40d2-8661-532c94e26cb2.png",
    },
    {
      title: "SuperX Futures Championship Contest",
      reward: "Share up to 600,000",
      date: "24.10.21 - 24.11.04",
      image:
        "https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/ed6338b8-4afe-459c-b492-71ca200c1540.png",
    },
  ];

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

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Title */}
      <div className="pt-[39px] pb-[32px] px-[32px] flex flex-col items-center font-bold">
        <p className="text-[26px] mb-2">
          Enjoy <span className="text-[#0067FF]">Cashback</span> Seamlessly with
          One Click!
        </p>
        <p className="text-[17px] text-gray-500">
          Trading fee cashback platform,{" "}
          <span className="text-[#0067FF] ">tetherMax</span>
        </p>
      </div>

      {/* Search */}
      <div className="px-6 w-full">
        <div className="relative flex items-center w-full">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Image
              src="https://cryptologos.cc/logos/htx-token-ht-logo.png"
              alt="Bybit logo"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <input
            type="text"
            placeholder="Please enter your UID"
            className="placeholder:text-[#CDD1DC] text-xl w-full pl-12 pr-10 py-4 font-bold border border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-7 top-1/2 transform -translate-y-1/2">
            <Search className="h-7 w-7 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Average Cashback per User */}
      <div className="w-full items-start">
        <p className="text-[15px] font-bold mt-5 mb-4 mx-6 text-gray-400 flex-1">
          Average Cashback per User
        </p>
        <div className="flex gap-4 text-base mt-[30px] overflow-x-auto px-6 scrollbar-hide">
          {exchanges.map((exchange, idx) => (
            <div
              key={idx}
              className="bg-[#EAEEF4] hover:bg-gray-300 rounded-xl px-4 py-3 flex gap-2 hover:cursor-pointer"
            >
              {exchange.name}{" "}
              <span className="text-red-500">${exchange.value}</span>
            </div>
          ))}
        </div>

        <Card className="bg-blue-50 p-6 mx-6 mt-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://tethermax.io/static/images/calculator3DHome.png"
              alt="TetherMax device"
              width={130}
              height={130}
              className="mb-4"
            />
            <div className="mt-3">
              <p className="text-xl font-bold">
                Monthly average cashback is{" "}
                <span className="text-blue-600">$360</span> per user!
              </p>
              <p className="text-xl font-bold">Check in just one minute!</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-5 px-4 text-lg py-3">
              Calculate estimated cashback!
            </Button>
          </div>
        </Card>

        <div className="mx-6 mt-4 shadow-md border-[1px] border-gray-200 py-[18px] px-5 rounded-2xl flex gap-4">
          <InfinityIcon className="h-12 w-12" />
          <div>
            <div className="flex items-center gap-2 text-gray-400">
              <p className="font-medium text-[13px]">
                It's simpler and faster now
              </p>
            </div>
            <p className="text-blue-600 font-bold text-[17px]">
              Take a closer look at the tetherMax app
            </p>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="pt-[39px] w-full">
        <div className="flex justify-between items-center mb-2 px-6">
          <div>
            <p className="text-xl font-bold text-gray-800 text-[22px]">
              tetherMax's events are together with exchange partners.
            </p>
            <p className="text-gray-500 text-sm mb-4 text-[13px]">
              These are only for you, trader!
            </p>
          </div>
          <button className="text-blue-600 flex items-center text-sm">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto pb-6 scrollbar-hide">
          <div className="flex w-max px-6 overflow-x-auto scrollbar-hide">
            {events.map((event, index) => (
              <div key={index} className="w-[155px] mr-4">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={155}
                  height={155}
                  className="rounded-lg mb-2"
                />
                <h3 className="font-medium text-sm mb-1">{event.title}</h3>
                <p className="text-lg font-bold text-gray-900 mb-1">
                  {event.reward}
                </p>
                {event.subtext && (
                  <p className="text-sm text-gray-600 mb-1">{event.subtext}</p>
                )}
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  {event.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exchange Table */}
      <div className="bg-white pt-[39px]">
        <div className="px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              tetherMax's Partner Exchanges
            </h2>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-600 mb-6">
            We've prepared not only cashback but also trading contests
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
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
            <tbody className="bg-white divide-y divide-gray-200">
              {exchangesTable.map((exchange) => (
                <tr key={exchange.name}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={exchange.icon}
                          alt={exchange.name}
                          width={32}
                          height={32}
                        />
                      </div>
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
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                    {exchange.cashback}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                    {exchange.trading}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.rebate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.limitPrice}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
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
