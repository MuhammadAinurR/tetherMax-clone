import Image from "next/image";
import { Bell, Calculator, DollarSign, Gift, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
          <h1 className="text-xl font-semibold mb-2">
            {"degenMax's Benefits"}
          </h1>
          <p className="text-2xl font-bold mb-4">
            Complete simple missions to earn USDT, Boost your earnings with
            degenMax!
          </p>

          <Card className="bg-white text-black p-4">
            <CardContent className="flex justify-between items-center p-0">
              <div>
                <p className="text-gray-600">{"So far, you've received"}</p>
                <p className="text-2xl font-bold">0 USDT</p>
                <p className="text-gray-600">for cashback at degenMax</p>
              </div>
              <DollarSign className="h-24 w-24" />
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <DollarSign className="h-5 w-5 text-yellow-500" />
          <p>
            You can earn up to{" "}
            <span className="font-bold text-blue-500">1623 USDT more</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: (
                <Image
                  src="/placeholder.svg"
                  alt="Bybit"
                  width={24}
                  height={24}
                />
              ),
              title: "Join Bybit WSOT event",
              reward: "Get up to 1502 USDT",
            },
            {
              icon: <Gift className="h-6 w-6 text-red-500" />,
              title: "It's your first time visiting our site",
              reward: "Get up to 5 USDT",
              isNew: true,
            },
            {
              icon: <Bell className="h-6 w-6 text-yellow-500" />,
              title: "Turn on alarm",
              reward: "Get 1 USDT",
              isNew: true,
            },
            {
              icon: <Calculator className="h-6 w-6 text-blue-500" />,
              title: "Calculate estimated cashback",
              reward: "Get 2 USDT",
              isNew: true,
            },
            {
              icon: (
                <Image
                  src="/placeholder.svg"
                  alt="degenMax"
                  width={24}
                  height={24}
                />
              ),
              title: "Bind your UID",
              reward: "Get 3 USDT",
              isNew: true,
            },
            {
              icon: <DollarSign className="h-6 w-6 text-green-500" />,
              title: "Claim your first cashback",
              reward: "Get 10 USDT",
              isNew: true,
            },
            {
              icon: <Gift className="h-6 w-6 text-purple-500" />,
              title: "Join events",
              reward: "Get extra profits",
              isNew: true,
            },
            {
              icon: (
                <Image
                  src="/placeholder.svg"
                  alt="Cashback"
                  width={24}
                  height={24}
                />
              ),
              title: "Claim cashback monthly",
              reward: "Get up to 100 USDT",
              isNew: true,
            },
            {
              icon: <Users className="h-6 w-6 text-blue-400" />,
              title: "Invite friends",
              reward: "Get extra profits",
              isNew: true,
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-blue-600">{item.title}</p>
                    <p className="font-semibold">{item.reward}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {item.isNew && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Details</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
