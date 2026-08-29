import { CalendarPlus, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildIcs,
  calendarUrls,
  invitation,
  mapsLinks,
} from "@/lib/invitation-data";
import { FloralDivider } from "./ornaments";

function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "esra-mohammadsadegh.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function Location() {
  const links = mapsLinks(invitation.mapsQuery);
  const cal = calendarUrls();

  return (
    <section id="location" className="scroll-mt-20 px-6 py-10" aria-labelledby="loc-title">
      <div className="text-center">
        <p className="mb-2 font-body text-xs tracking-[0.3em] text-bronze">
          {invitation.locationTitle}
        </p>
        <h2 id="loc-title" className="font-display text-2xl text-ink">
          {invitation.locationKicker}
        </h2>
        <FloralDivider className="my-4 text-bronze" />
      </div>

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-ink/8">
        <img
          src="/images/venue.jpg"
          alt="نمایی از عمارت شمس در غروب"
          className="aspect-video w-full object-cover"
        />
      </div>

      <div className="mt-5 flex gap-3">
        <div className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-gold/20 text-bronze">
          <MapPin className="size-5" strokeWidth={1.6} />
        </div>
        <div>
          <p className="font-display text-xl text-ink">{invitation.venueName}</p>
          <p className="mt-1 font-body text-sm leading-7 text-ink-soft">
            {invitation.venueAddress}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {links.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-ink/12 bg-ivory-deep/50 font-body text-sm text-ink transition-colors duration-[var(--motion-quick)] hover:bg-gold/15"
          >
            <Navigation className="size-4 text-bronze" strokeWidth={1.6} />
            {item.label}
          </a>
        ))}
      </div>

      <p className="mt-3 text-center font-body text-xs text-ink-soft">
        مسیر رسیدن به عمارت شمس را با یکی از سرویس‌های بالا باز کنید.
      </p>

      <div className="mt-5 grid gap-2">
        <Button type="button" variant="ink" className="w-full" onClick={downloadIcs}>
          <CalendarPlus className="size-4" strokeWidth={1.6} />
          افزودن به تقویم
        </Button>
        <a
          href={cal.google}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border border-ink/12 font-body text-sm text-ink transition-colors hover:bg-ivory-deep"
        >
          افزودن به گوگل‌کلندر
        </a>
      </div>
    </section>
  );
}
