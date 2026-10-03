export default function HistorySection() {
  return (
    <div className="flex flex-row w-full shrink-0 gap-x-4">
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-0.75 h-full bg-white ml-1.5" />
        <div className="absolute size-4 inset-shadow-2xs/50 shadow-sm/0 bg-amber-500 rounded-full top-1/2 -translate-y-1/2 left-0" />
      </div>
      <div className="relative flex flex-col items-start justify-start py-5">
        <h3 className="font-light text-sm">12 days ago</h3>
        <h2 className="leading-tight font-medium text-lg">
          Slime was initialised as as asds adas asd as sa d
        </h2>
      </div>
    </div>
  );
}
