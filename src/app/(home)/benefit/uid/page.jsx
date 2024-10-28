"use client";

import Image from "next/image";
import { Bell, ChevronDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function UIDBinding() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          First steop to get cashback
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-8">
          UID Binding
        </h2>

        <div className="flex flex-col items-center mb-12">
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-2">
            It is necessary to get cashback
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
            3 USDT coupon for binding UID
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <Image
            src="/placeholder.svg"
            alt="UID Envelope"
            width={200}
            height={200}
          />
        </div>

        <Card className="mb-12">
          <CardContent className="flex flex-col items-center p-6">
            <h3 className="text-xl font-semibold mb-4">
              Sign up for the exchange with tetherMax referral code
            </h3>
            <Image
              src="/placeholder.svg"
              alt="Mobile signup"
              width={300}
              height={600}
            />
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardContent className="flex flex-col items-center p-6">
            <h3 className="text-xl font-semibold mb-2">Bind UID,</h3>
            <p className="text-gray-600 mb-4">
              You can check the accumulated cashback
            </p>
            <Image
              src="/placeholder.svg"
              alt="UID Binding form"
              width={300}
              height={600}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-100 rounded-full p-4 mb-4">
            <DollarSign className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">3 USDT</h3>
          <p className="text-xl mb-2">coupon for you</p>
          <p className="text-gray-600 mb-4">
            This USDT coupon is available for withdrawal
          </p>
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => router.push("/registExchange")}
          >
            Bind your UID, Get 3 USDT
          </Button>
        </div>
      </main>
    </div>
  );
}
