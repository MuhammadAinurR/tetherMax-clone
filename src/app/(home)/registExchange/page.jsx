"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 bg-[#F0F3F9]">
      <Card>
        <CardHeader>
          <CardTitle className="text-[22px] font-bold">
            1. Join the Exchange
          </CardTitle>
          <CardDescription>
            Create an exchange account eligible for Cashback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-16"
              onClick={() => {
                window.open(
                  "https://www.bybit.com/en/sign-up?affiliate_id=39156&group_id=88421&group_type=1",
                  "_blank"
                );
              }}
            >
              <Image
                src="https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/logo/bybit.png"
                alt="Bybit logo"
                width={80}
                height={24}
              />
            </Button>
            <Button
              variant="outline"
              className="h-16"
              onClick={() => {
                window.open(
                  "https://www.mexc.com/ko-KR/login?inviteCode=mexc-1PsaL",
                  "_blank"
                );
              }}
            >
              <Image
                src="https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/998b7445-2213-4e86-9675-c8b79b967c54.png"
                alt="MEXC logo"
                width={80}
                height={24}
              />
            </Button>
            <Button
              variant="outline"
              className="h-16"
              onClick={() => {
                window.open(
                  "https://www.bitget.com/asia/expressly?channelCode=zx6x&vipCode=wh4h&languageType=3",
                  "_blank"
                );
              }}
            >
              <Image
                src="https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/logo/bitget.png"
                alt="Bitget logo"
                width={80}
                height={24}
              />
            </Button>
            <Button
              variant="outline"
              className="h-16"
              onClick={() => {
                window.open(
                  "https://www.okx.com/join/paybacks",
                  "_blank" // This specifies that the link should open in a new tab
                );
              }}
            >
              <Image
                src="https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/logo/okx.png"
                alt="OKX logo"
                width={80}
                height={24}
              />
            </Button>
          </div>
          <Button variant="link" className="mt-4 w-full">
            Curious about the benefits of each exchange?
          </Button>
          <Button variant="link" className="w-full text-blue-600">
            More
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[22px] font-bold">2. Bind UID</CardTitle>
          <CardDescription>
            Please verify the UID and bind it to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            onClick={() => router.push("/uidlinking")}
          >
            Bind UID
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[22px] font-bold">
            3. If completed, receive USDT
          </CardTitle>
          <CardDescription>
            {
              "If you've completed binding the UID, please collect your reward 🎉"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            onClick={() => router.push("/benefit/uid")}
          >
            Receive 3 USDT
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
