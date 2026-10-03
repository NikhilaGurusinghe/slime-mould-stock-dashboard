import TextMarquee from "./text-marquee";

export default function SlimeStatusHistory() {
  return (
    <div className="flex flex-row gap-x-2 px-3 py-2 -ml-3 max-w-1/2 items-center justify-start cursor-pointer transition-all bg-white/5 border-white/10 hover:bg-(--color-highlight)/30 border border-transparent hover:border-(--color-highlight-border)/20 rounded-2xl">
      <div className="rounded-full bg-green-500/90 size-3 backdrop-blur-md animate-radiate"></div>
      <TextMarquee
        marqueeText={
          "Phyasurum is currently..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa."
        }
      />
    </div>
  );
}
