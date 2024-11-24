import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ExchangeSelector({ platforms, selectedExchange, setSelectedExchange, onNext }) {
  return (
    <>
      <h2 className="text-2xl font-bold">Please choose just one exchange you use most frequently</h2>
      <p className="text-gray-600">Which exchange are you using?</p>

      <div className="grid grid-cols-2 gap-4">
        {platforms.map((exchange) => (
          <button
            key={exchange.name}
            className={`p-1 h-[50px] border rounded-lg flex items-center justify-center hover:bg-gray-50 
              ${selectedExchange === exchange.name ? 'bg-gray-200' : ''}`}
            onClick={() => setSelectedExchange(exchange.name)}
          >
            <Image src={exchange.textLogo} alt={exchange.name} width={75} height={75} />
          </button>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          className={`flex-1 text-white ${
            selectedExchange ? 'bg-primary-1 hover:bg-primary-1' : 'bg-primary-1 cursor-not-allowed'
          }`}
          disabled={!selectedExchange}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </>
  );
}
