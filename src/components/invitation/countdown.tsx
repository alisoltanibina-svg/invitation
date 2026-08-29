import { useEffect, useState } from "react";
import { invitation } from "@/lib/invitation-data";
import { pad2, toFaDigits } from "@/lib/persian";
import { FloralDivider } from "./ornaments";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(from: number, to: number): Parts | null {
  const ms = to - from;
  if (ms <= 0) return null;
  const seconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

const LABELS: { key: keyof Parts; label: string }[] = [
  { key: "days", label: "روز" },
  { key: "hours", label: "ساعت" },
  { key: "minutes", label: "دقیقه" },
  { key: "seconds", label: "ثانیه" },
];

export function Countdown() {
  const target = Date.parse(invitation.startIso);
  const [parts, setParts] = useState<Parts | null>(() =>
    diff(Date.now(), target),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(diff(Date.now(), target));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section id="countdown" className="scroll-mt-20 px-6 py-10 text-center" aria-labelledby="countdown-title">
      <p className="mb-2 font-body text-xs tracking-[0.3em] text-bronze">
        شمارش
      </p>
      <h2 id="countdown-title" className="font-display text-2xl text-ink">
        {invitation.countdownTitle}
      </h2>
      <FloralDivider className="my-4 text-bronze" />
      {parts ? (
        <div className="mt-6 grid grid-cols-4 gap-2">
          {LABELS.map((item) => (
            <div
              key={item.key}
              className="rounded-[var(--radius-lg)] border border-ink/8 bg-ivory-deep/60 px-1 py-3"
            >
              <div className="font-display text-2xl tabular-nums text-ink">
                {toFaDigits(pad2(parts[item.key]))}
              </div>
              <div className="mt-1 font-body text-[11px] text-ink-soft">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 font-display text-lg leading-relaxed text-ink-soft">
          {invitation.countdownPast}
        </p>
      )}
    </section>
  );
}
