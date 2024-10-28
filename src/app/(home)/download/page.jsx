import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-4">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          For every moment you need cashback, enjoy degenMax
        </h1>
        <p className="mb-8 text-gray-600">
          Enjoy degenMax through the mobile app to easily receive cashback
          anytime, anywhere
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button variant="outline" className="flex items-center py-6">
            <Image
              src="https://tethermax.io/static/images/play_store.png"
              alt="Google Play"
              width={24}
              height={24}
            />
            <span>Download mobile app</span>
          </Button>
          <Button variant="outline" className="flex items-center py-6">
            <Image
              src="https://tethermax.io/static/images/apple.png"
              alt="App Store"
              width={24}
              height={24}
            />
            <span>Download mobile app</span>
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          You can check exclusive benefits only in the app, including large
          exchange prizes
        </h2>
        <p className="mb-8 text-gray-600">
          Discover exclusive in-app rewards and exciting prize opportunities
          through exchange contests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Image
                src="https://tethermax.io/static/icon/logo_fill.svg"
                alt="Contests & Events"
                width={64}
                height={64}
              />
              <h3 className="mt-4 font-semibold">
                {"degenMax's Contests & Events"}
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Image
                src="https://tethermax.io/static/images/download/prize.svg"
                alt="Large-Scale Prize"
                width={64}
                height={64}
              />
              <h3 className="mt-4 font-semibold">
                {"Exchanges' Large-Scale Prize Competition"}
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Image
                src="https://tethermax.io/static/images/download/gift.svg"
                alt="Airdrop Event"
                width={64}
                height={64}
              />
              <h3 className="mt-4 font-semibold">Exchange Airdrop Event</h3>
            </CardContent>
          </Card>
        </div>

        <Image
          src="https://tethermax.io/static/icon/logo_fill.svg"
          alt="degenMax App Icon"
          width={128}
          height={128}
          className="mx-auto mb-8"
        />

        <h2 className="text-2xl font-semibold mb-12">
          Earn cashback faster and easier with the degenMax app!
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Are you already enjoying cashback at degenMax website?
          </h2>
          <Image
            src="https://tethermax.io/static/images/download/phone_view.png"
            alt="Mobile App Screenshot"
            width={300}
            height={600}
            className="mx-auto"
          />
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Then, try using the degenMax app too!
          </h2>
          <Image
            src="https://tethermax.io/static/images/landing/landingQr.png"
            alt="QR Code"
            width={200}
            height={200}
            className="mx-auto mb-8"
          />
          <div className="flex justify-center space-x-4">
            <Button variant="secondary">Download on the App Store</Button>
            <Button variant="secondary">GET IT ON Google Play</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
