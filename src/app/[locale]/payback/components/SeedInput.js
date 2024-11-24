import { Button } from '@/components/ui/button';

export default function SeedInput({ seed, setSeed, selectedExchange, onNext, onPrev }) {
  return (
    <>
      <h2 className="text-2xl font-bold">How much is your seed?</h2>
      <p className="text-gray-600">Please tell us the total seed you hold in {selectedExchange}</p>

      <div className="relative">
        <div className="flex items-center">
          <input
            type="number"
            value={seed}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value) || '');
              setSeed(value);
            }}
            placeholder="Please enter your seed"
            className="w-full p-4 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-4 text-gray-500">USDT</span>
        </div>
      </div>
    </>
  );
}
