"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Clock } from "lucide-react";

const exchanges = [
  "All",
  "MEXC",
  "Bitget",
  "OKX",
  "DeepCoin",
  "BVOX",
  "BingX",
  "CoinCatch",
  "Zoomex",
];
const affiliateExchanges = ["All", "Bybit", "BingX"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeAffiliateTab, setActiveAffiliateTab] = useState("All");

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="relative h-80 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="WSOT Competition"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-orange-600 opacity-75"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl font-bold mb-4">WSOT</h1>
            <h2 className="text-3xl font-semibold mb-2">
              Bybit 10,000,000 USDT
            </h2>
            <h3 className="text-2xl mb-4">Competition Open</h3>
            <p className="text-lg">
              degenMax is the only platform that distributes team bonuses.
            </p>
          </div>
        </div>

        <section className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Exclusive Events for degenMax Users
          </h2>
          <p className="text-gray-600 mb-4">Only for degenMax traders</p>

          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-9 gap-2">
              {exchanges.map((exchange) => (
                <TabsTrigger
                  key={exchange}
                  value={exchange}
                  onClick={() => setActiveTab(exchange)}
                >
                  {exchange}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <EventCard
                  title="Oct MEXC Competition"
                  reward="30,000 USDT Reward + Cashback"
                  timeLeft="68:29:19 left"
                />
                <EventCard
                  title="Zoomex Deposit & Trading Event"
                  reward="Up to 15,000 USDT"
                  timeRange="24.10.24 - 24.11.30"
                />
                <EventCard
                  title="DeepCoin Sign-up Event"
                  reward="Deposit to Earn 3,000 USDT"
                  timeLeft="44:20:19 left"
                />
                <EventCard
                  title="October Bitget Newbie Event"
                  reward="Sign up to get $15,730 worth of XRP and USDT"
                  timeRange="24.10.11 - 24.11.11"
                />
                <EventCard
                  title="Oct Bitget Competition"
                  reward="Up to 30,000 USDT + Cashback"
                  timeLeft="68:29:19 left"
                />
                <EventCard
                  title="Oct Coincatch Competition"
                  reward="Up to 500,000 TRX + Cashback!"
                  timeLeft="40:30:19 left"
                />
                <EventCard
                  title="Oct BVOX Competition"
                  reward="30,000 USDT Reward + Cashback"
                  timeLeft="68:29:19 left"
                />
                <EventCard
                  title="BVOX Signup Event"
                  reward="Sign up & Trade for 4,100 USDT!"
                  timeLeft="67:29:19 left"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Event hosted by affiliate exchanges for degenMax traders
          </h2>
          <p className="text-gray-600 mb-4">
            Enjoy trading events backed by exchanges
          </p>

          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid grid-cols-3 gap-2">
              {affiliateExchanges.map((exchange) => (
                <TabsTrigger
                  key={exchange}
                  value={exchange}
                  onClick={() => setActiveAffiliateTab(exchange)}
                >
                  {exchange}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeAffiliateTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EventCard
                  title="Bybit WSOT Competition"
                  reward="10,000,000 USDT Reward Pool"
                  timeLeft="68:29:19 left"
                />
                <EventCard
                  title="SuperX Futures Championship Contest"
                  reward="Share up to $600,000"
                  timeRange="24.10.21 - 24.11.01"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="bg-white rounded-lg p-6">
          <h3 className="font-semibold mb-2">Note:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>
              Event notes may vary by the exchange, so please check the event
              details of the exchange.
            </li>
            <li>
              Be sure to participate through your degenMax account on this page.
              There may be disadvantages if you participate through other
              channels.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function EventCard({ title, reward, timeLeft, timeRange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold mb-2">{reward}</p>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{timeLeft || timeRange}</span>
        </div>
      </CardContent>
    </Card>
  );
}
