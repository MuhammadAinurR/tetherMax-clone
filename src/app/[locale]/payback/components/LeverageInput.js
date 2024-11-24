export default function LeverageInput({ leverage, setLeverage, onNext, onPrev }) {
  return (
    <>
      <h2 className="text-2xl font-bold">What leverage do you usually use?</h2>
      <p className="text-gray-600">Please let us know the average leverage multiplier</p>

      <div className="relative">
        <input
          type="number"
          min="1"
          max="125"
          value={leverage}
          onChange={(e) => {
            const value = Math.min(125, Math.max(1, Number(e.target.value) || ''));
            setLeverage(value);
          }}
          placeholder="1 ~ 125 (Enter the number)"
          className="w-full p-4 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </>
  );
}
