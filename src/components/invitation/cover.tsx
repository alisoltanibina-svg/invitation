import { FloralDivider, Monogram } from "./ornaments";
import { FallingPetals } from "./petals";
import { ShamsiDate } from "./shamsi-date";
import { invitation } from "@/lib/invitation-data";
import { cn } from "@/lib/utils";

export function Cover({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-dvh flex-col items-center justify-end overflow-hidden bg-wine text-ivory",
        opening && "cover-exit",
      )}
      aria-label="روکش دعوت‌نامه"
    >
      <img
        src="/images/envelope.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="cover-veil absolute inset-0" />
      <FallingPetals />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16 text-center">
        <Monogram className="mb-6 size-14 border-gold/40 font-ceremony text-gold-bright" />
        <p className="font-ceremony text-3xl font-bold leading-none text-gold-bright">
          {invitation.coverKicker}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ivory">
          {invitation.coverTitle}
        </h1>
        <FloralDivider className="my-5 text-gold-bright" />
        <p className="font-display text-[2.75rem] font-bold leading-none text-ivory drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]">
          {invitation.bride}
        </p>
        <p className="my-1.5 font-display text-2xl font-bold text-gold-bright">و</p>
        <p className="font-display text-[2.35rem] font-bold leading-none text-ivory drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]">
          {invitation.groom}
        </p>
        <ShamsiDate className="mt-3 text-lg text-ivory/80" />

        <button
          type="button"
          onClick={onOpen}
          disabled={opening}
          className="group mt-10 flex flex-col items-center gap-3"
          aria-label={invitation.openLabel}
        >
          <span className="seal-pulse relative grid size-28 place-items-center">
            <img
              src="/images/seal.jpg"
              alt=""
              className="size-24 rounded-full object-cover ring-2 ring-gold/70 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform duration-[var(--motion-fast)] group-active:scale-[0.96]"
            />
          </span>
          <span className="font-display text-xl tracking-wide text-gold-bright">
            {invitation.openLabel}
          </span>
        </button>
      </div>
    </section>
  );
}
