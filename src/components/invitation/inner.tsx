import type { ReactNode } from "react";
import { Calendar, ChevronLeft, Clock, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { invitation } from "@/lib/invitation-data";
import { formatJalaliLong } from "@/lib/persian";
import { CornerFlourish, FloralDivider } from "./ornaments";
import { Countdown } from "./countdown";
import { Location } from "./location";
import { MusicButton } from "./music-button";
import { Rsvp } from "./rsvp";
import { ShamsiDate } from "./shamsi-date";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Inner({
  musicOn,
  onMusicToggle,
}: {
  musicOn: boolean;
  onMusicToggle: () => void;
}) {
  const { jalali } = invitation;
  const dateFull = `${jalali.weekday}، ${formatJalaliLong(jalali)}`;

  return (
    <div className="relative min-h-dvh bg-wine-deep text-ivory">
      <img
        src="/images/garden.jpg"
        alt=""
        className="pointer-events-none fixed inset-0 size-full object-cover opacity-30"
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-wine-deep/80 via-wine/70 to-wine-deep" />

      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col pt-6">
        <div className="fixed top-5 start-4 z-30">
          <MusicButton playing={musicOn} onToggle={onMusicToggle} />
        </div>

        <article className="inner-enter relative mx-3 mb-8 overflow-hidden rounded-3xl bg-ivory text-ink shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <CornerFlourish className="pointer-events-none absolute start-3 top-3 z-10 size-12 text-gold-bright/80" />
          <CornerFlourish
            flipX
            className="pointer-events-none absolute end-3 top-3 z-10 size-12 text-gold-bright/80"
          />
          <CornerFlourish
            flipY
            className="pointer-events-none absolute start-3 bottom-3 z-10 size-12 text-gold-bright/70"
          />
          <CornerFlourish
            flipX
            flipY
            className="pointer-events-none absolute end-3 bottom-3 z-10 size-12 text-gold-bright/70"
          />

          <header className="relative aspect-[3/4] overflow-hidden">
            <img
              src="/images/couple-veiled.jpg"
              alt="عروس و داماد در باغ، از پشت"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-8 text-center">
              <p className="font-ceremony text-2xl font-bold leading-none text-bronze">
                جشن پیوند
              </p>
              <h1 className="mt-3 font-display text-5xl leading-none text-ink">
                {invitation.bride}
              </h1>
              <p className="my-1 font-display text-2xl text-bronze">و</p>
              <h1 className="font-display text-4xl leading-none text-ink">
                {invitation.groom}
              </h1>
            </div>
          </header>

          <div className="px-6 pb-4 pt-8 text-center">
            <p className="font-display text-xl text-ink">{invitation.bismillah}</p>
            <ShamsiDate className="mt-3 text-2xl text-ink" />
            <FloralDivider className="my-6 text-bronze" />
            <div className="grid gap-2">
              <Button
                type="button"
                variant="ink"
                className="w-full"
                onClick={() => scrollToId("details")}
              >
                مشاهده اطلاعات مراسم
              </Button>
              <Button
                type="button"
                variant="paper"
                className="w-full"
                onClick={() => scrollToId("letter")}
              >
                متن دعوت
              </Button>
            </div>
          </div>

          <section id="letter" className="scroll-mt-20 px-6 py-10 text-center">
            <Heart className="mx-auto mb-4 size-5 text-bronze" strokeWidth={1.4} />
            <h2 className="font-ceremony text-2xl font-bold leading-none text-ink">
              {invitation.coverKicker}
            </h2>
            <p className="mt-4 font-body text-sm leading-8 text-ink-soft">
              {invitation.letter}
            </p>
          </section>

          <div className="px-6">
            <img
              src="/images/roses.jpg"
              alt="گل‌های سفید روی کاغذ کرم"
              className="aspect-[3/2] w-full rounded-[var(--radius-xl)] object-cover"
            />
          </div>

          <section id="details" className="scroll-mt-20 px-6 py-10 text-center">
            <p className="mb-2 font-body text-xs tracking-[0.3em] text-bronze">
              {invitation.detailsTitle}
            </p>
            <h2 className="font-display text-2xl leading-9 text-ink">
              {invitation.storyTitle}
            </h2>
            <FloralDivider className="my-4 text-bronze" />
            <p className="font-body text-sm leading-8 text-ink-soft">
              {invitation.story}
            </p>

            <div className="mt-8 grid gap-2">
              <DetailRow
                icon={<Calendar className="size-5" strokeWidth={1.5} />}
                label="تاریخ مراسم"
                value={dateFull}
                href="#countdown"
              />
              <DetailRow
                icon={<Clock className="size-5" strokeWidth={1.5} />}
                label="زمان‌بندی مراسم"
                value={invitation.timeLead}
                href="#schedule"
              />
              <DetailRow
                icon={<MapPin className="size-5" strokeWidth={1.5} />}
                label="محل مراسم"
                value={invitation.venueName}
                href="#location"
              />
            </div>
          </section>

          <section className="px-6 pb-6">
            <div className="overflow-hidden rounded-[var(--radius-xl)] border border-ink/8">
              <img
                src="/images/table.jpg"
                alt="میز شام جشن در عمارت"
                className="aspect-video w-full object-cover"
              />
            </div>
          </section>

          <section
            id="schedule"
            className="scroll-mt-20 px-6 py-8"
            aria-labelledby="timeline-title"
          >
            <div className="text-center">
              <h2 id="timeline-title" className="font-display text-2xl text-ink">
                {invitation.timelineTitle}
              </h2>
              <p className="mt-2 font-body text-sm leading-7 text-ink-soft">
                {invitation.timelineLead}
              </p>
              <p className="mt-1 font-display text-lg text-bronze">
                {invitation.timeRange}
              </p>
            </div>
            <ol className="relative mt-8 ms-3 border-s border-gold/50 ps-6">
              {invitation.schedule.map((item) => (
                <li key={item.time} className="relative mb-6 last:mb-0">
                  <span className="absolute -start-7 top-1.5 size-3.5 rounded-full border-2 border-ivory bg-gold" />
                  <p className="font-display text-lg text-ink">{item.time}</p>
                  <p className="font-body text-sm text-ink-soft">{item.title}</p>
                </li>
              ))}
            </ol>
          </section>

          <Countdown />
          <Rsvp onAfterSave={() => scrollToId("location")} />
          <Location />

          <footer className="px-6 pb-12 pt-4 text-center">
            <FloralDivider className="mb-5 text-bronze" />
            <p className="font-ceremony text-xl font-bold text-ink">جشن پیوند</p>
            <p className="mt-2 font-display text-xl text-ink">
              {invitation.bride} و {invitation.groom}
            </p>
            <p className="mt-2 font-body text-xs text-ink-soft">
              با عشق، در انتظار دیدارتان
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(href.slice(1));
      }}
      className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-ink/8 bg-ivory-deep/50 px-4 py-3 text-start transition-colors duration-[var(--motion-quick)] hover:border-bronze/40 hover:bg-gold/10"
    >
      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/20 text-bronze">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-body text-xs text-ink-soft">{label}</p>
        <div dir="rtl" className="font-body text-sm text-ink">
          {value}
        </div>
      </div>
      <ChevronLeft className="size-4 shrink-0 text-bronze" strokeWidth={1.6} />
    </a>
  );
}