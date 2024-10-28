import {
  Shield,
  Infinity,
  Smile,
  HandIcon,
  FileTextIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
export default function ServiceIntro() {
  const barData = [
    { label: "Top 5%", value: 3488, color: "bg-blue-500" },
    { label: "5-20%", value: 934, color: "bg-blue-500" },
    { label: "25-50%", value: 229, color: "bg-blue-500" },
    { label: "50-75%", value: 54, color: "bg-gray-400" },
    { label: "75-100%", value: 45, color: "bg-gray-400" },
    { label: "On average", value: 370, color: "bg-gray-300" },
  ];
  return (
    <div>
      {" "}
      <div className="bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center space-y-6">
          <h2 className="text-xl font-medium">
            The smartest way to use the exchange
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold">
            For your{" "}
            <span className="text-blue-400">stable futures trading</span>,
            <br />
            trust in degenMax
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mt-12">
            {[
              {
                icon: Shield,
                title: "Credibility",
                subtitle: "Tech-centered",
                color: "bg-blue-800",
              },
              {
                icon: Infinity,
                title: "Payback",
                subtitle: "Enjoy speedy service",
                color: "bg-blue-600",
              },
              {
                icon: Smile,
                title: "Simple & Easy",
                subtitle: "One-click process",
                color: "bg-purple-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.color} rounded-2xl p-6 flex-1 flex flex-col items-center justify-center transition-transform hover:scale-105`}
              >
                <item.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm opacity-80">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Our service is only for traders like you!
          </p>

          <h2 className="text-4xl font-bold mb-6">
            The unique selling point of degenMax
          </h2>

          <p className="text-gray-400 mb-12">
            degenMax is different from other cashback copycats
          </p>

          {/* Selling Point */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full p-6 mb-4">
                <HandIcon className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                The first Cashback service
              </h3>
              <p className="text-2xl font-bold">Started in August 2022</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full p-6 mb-4">
                <FileTextIcon className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High safety</h3>
              <p className="text-2xl font-bold">
                Official contracts with exchanges
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full p-6 mb-4">
                <UsersIcon className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                The choice of many users
              </h3>
              <p className="text-2xl font-bold">Over 23,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="bg-blue-600 rounded-2xl p-4 inline-block mb-6">
            <Infinity className="w-12 h-12 text-white" />
          </div>
          <p className="text-xl leading-relaxed text-white">
            <span className="text-blue-400 font-semibold">degenMax</span> is the
            only entity
            <br />
            that has entered into
            <br />
            <span className="text-blue-400 font-semibold">
              official contracts
            </span>
            <br />
            <span className="text-white">with major exchanges</span>
          </p>
        </div>
      </div>
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-400 mb-2">
            The process for degenMax cashback
          </p>
          <h2 className="text-4xl font-bold text-center mb-12">
            How to enjoy degenMax
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-800 rounded-lg p-8 relative">
              <Image
                src="/placeholder.svg"
                alt="Mobile phone mockup"
                width={300}
                height={600}
                className="mx-auto"
              />
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white text-black p-2 rounded-md shadow-lg">
                <p className="text-green-500 font-semibold">degenMax code</p>
                <p className="text-xs">
                  You will receive a 20% fee discount for 30 days
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  text: "Sign up for an exchange with degenMax's code",
                  highlight: true,
                },
                { text: "Connect your UID to degenMax" },
                { text: "Enjoy trading to the fullest" },
                { text: "Get your Cashback!" },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    step.highlight ? "bg-blue-900" : "bg-gray-800"
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      step.highlight ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {index + 1}. {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center">
            Cashback,
            <br />
            from 50 USDT to 3,500 USDT a month
          </h1>

          <div className="space-y-4 text-lg">
            <p>
              If you trade more than 5 times a month and seed money is over 100
              USDT, you can get cashback for{" "}
              <span className="text-blue-400">more than 50 USDT</span>
            </p>
            <p>
              If you are in the top 5% of cashback traders, you can get cashback{" "}
              <span className="text-blue-400">more than 3,500 USDT</span>
            </p>
          </div>

          <div className="space-y-4">
            {barData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-right">{item.label}</div>
                <div className="flex-1 h-8 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${(item.value / 3488) * 100}%` }}
                  ></div>
                </div>
                <div className="w-20">{item.value} USDT</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm text-gray-400">
            <p>
              The total statistics data looks as shown above, but this includes
              many users who trade with small seed money (below 100 USDT) or who
              rarely trade (less than 5 times a month).
            </p>
            <p>
              Typically, users who usually do futures trading{" "}
              <span className="text-blue-400">are at top 50%</span>.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-400 mb-2">
            The process for degenMax cashback
          </p>
          <h1 className="text-4xl font-bold text-center mb-12">
            Get your trading fees back through degenMax
          </h1>

          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <p className="text-center mb-2">Are you a Bitget user?</p>
            <p className="text-center text-2xl mb-4">
              By using degenMax, you can save an additional{" "}
              <span className="text-blue-400">$360</span>
            </p>
            <p className="text-center text-sm text-gray-400">
              *Based on seed money for $4000 and average monthly fees
            </p>

            <div className="flex justify-center space-x-4 mt-8">
              <div className="w-24 h-12 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-sm">degenMax</span>
              </div>
              <div className="w-24 h-12 bg-gray-700 rounded-md flex items-center justify-center">
                <span className="text-sm">General Signup</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-12">
            {["x", "h", "bybit", "s", "checkers", "flame"].map(
              (logo, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center"
                >
                  <Image
                    src={`/placeholder.svg?text=${logo}`}
                    alt={`Exchange logo ${index + 1}`}
                    width={24}
                    height={24}
                  />
                </div>
              )
            )}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              How to enjoy the service?
            </h2>
            <p className="text-xl">What should I do?</p>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md">
            Browse Partner Exchange
          </Button>
        </div>
      </div>
    </div>
  );
}
