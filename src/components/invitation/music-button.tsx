import { Music2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ambient } from "@/lib/ambient";
import { cn } from "@/lib/utils";

export function MusicButton({
  playing,
  onToggle,
  className,
}: {
  playing: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => {
        if (ambient.playing) {
          void ambient.stop();
          onToggle();
        } else {
          void ambient.start().then(onToggle);
        }
      }}
      aria-label={playing ? "خاموش کردن موسیقی" : "پخش موسیقی"}
      className={cn(
        "border border-gold/40 bg-wine/70 text-gold backdrop-blur-sm hover:bg-wine/90",
        className,
      )}
    >
      <span className="relative grid size-5 place-items-center">
        <Music2
          className={cn(
            "size-5 transition-[opacity,transform,filter] duration-[var(--motion-fast)]",
            playing
              ? "scale-100 opacity-100 blur-none"
              : "absolute scale-[0.25] opacity-0 blur-[4px]",
          )}
          strokeWidth={1.6}
        />
        <VolumeX
          className={cn(
            "size-5 transition-[opacity,transform,filter] duration-[var(--motion-fast)]",
            playing
              ? "absolute scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-none",
          )}
          strokeWidth={1.6}
        />
      </span>
    </Button>
  );
}
