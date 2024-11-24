import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { formatCurrency } from '../utils/calculations';

export default function Results({ estimatedCashback, monthlyFee, selectedExchange, setShowDialog, platforms = [] }) {
  const getSelectedExchangeData = () => {
    return platforms.find((platform) => platform.name === selectedExchange) || null;
  };

  return (
    <>
      <h2 className="text-2xl font-bold">{"What's my estimated cashback amount?"}</h2>
      <p className="text-gray-600">
        AI has meticulously analyzed <span className="text-primary-1">30,629</span>
        {" users' data"}
      </p>

      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Estimated Cashback amount based on 30 days</p>
            <p className="text-primary-1 text-4xl font-bold">{formatCurrency(estimatedCashback)}</p>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <p className="text-gray-600">Amount based on tether</p>
          <p className="font-semibold">{estimatedCashback.toFixed(2)} USDT</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
          <span className="text-yellow-600">🔔</span>
        </div>
        <p className="text-gray-700">
          Traders similar to you in {selectedExchange} are getting back{' '}
          <span className="text-primary-1 font-bold">{formatCurrency(estimatedCashback)}</span> every month
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={getSelectedExchangeData()?.logo || ''}
            alt={selectedExchange || ''}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <p className="text-sm text-gray-600">Analyzed 30,629 people</p>
            <p className="font-semibold">{selectedExchange}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Match rate 90%</span>
          <span className="text-green-600">↑</span>
        </div>
      </div>

      <Button className="w-full bg-primary-1 hover:bg-primary-1 text-white mt-4" onClick={() => setShowDialog(true)}>
        Start your {selectedExchange} Cashback
      </Button>
    </>
  );
}
