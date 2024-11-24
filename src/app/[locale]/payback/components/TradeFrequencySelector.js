import { Button } from '@/components/ui/button';

export default function TradeFrequencySelector({
  tradeFrequency,
  setTradeFrequency,
  tradeFrequencyOptions,
  onNext,
  onPrev,
}) {
  return (
    <>
      <h2 className="text-2xl font-bold">How many times do you trade per day?</h2>
      <p className="text-gray-600">Tell us about your trading patterns</p>

      <div className="space-y-2">
        {tradeFrequencyOptions.map((option) => (
          <button
            key={option.value}
            className={`w-full p-4 text-left border rounded-lg hover:bg-gray-50 ${
              tradeFrequency === option.value ? 'bg-gray-100 border-primary-1' : ''
            }`}
            onClick={() => setTradeFrequency(option.value)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  tradeFrequency === option.value ? 'border-primary-1' : 'border-gray-300'
                }`}
              >
                {tradeFrequency === option.value && <div className="w-3 h-3 rounded-full bg-primary-1" />}
              </div>
              <span className="text-gray-700">{option.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        <Button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800" onClick={onPrev}>
          Previous
        </Button>
        <Button
          className={`flex-1 text-white ${
            tradeFrequency ? 'bg-primary-1 hover:bg-primary-1' : 'bg-primary-1 cursor-not-allowed'
          }`}
          disabled={!tradeFrequency}
          onClick={onNext}
        >
          Check Results
        </Button>
      </div>
    </>
  );
}
