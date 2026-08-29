import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as MapPin, c as ChevronLeft, d as CalendarPlus, i as Music2, l as Check, o as Heart, r as Navigation, s as Clock, t as VolumeX, u as Calendar } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BxBE9D15.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MELODY = [
	293.66,
	349.23,
	440,
	392,
	349.23,
	293.66,
	261.63,
	220,
	246.94,
	293.66,
	349.23,
	329.63
];
function tone(ctx, dest, freq, start, dur, gain, type) {
	const osc = ctx.createOscillator();
	const g = ctx.createGain();
	osc.type = type;
	osc.frequency.value = freq;
	g.gain.setValueAtTime(0, start);
	g.gain.linearRampToValueAtTime(gain, start + .08);
	g.gain.exponentialRampToValueAtTime(1e-4, start + dur);
	osc.connect(g);
	g.connect(dest);
	osc.start(start);
	osc.stop(start + dur + .05);
}
var AmbientPlayer = class {
	ctx = null;
	master = null;
	filter = null;
	timer = null;
	drones = [];
	step = 0;
	playing = false;
	async start() {
		if (this.playing) return;
		const ctx = new AudioContext();
		if (ctx.state === "suspended") await ctx.resume();
		const master = ctx.createGain();
		master.gain.value = 0;
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 1600;
		filter.Q.value = .7;
		master.connect(filter);
		filter.connect(ctx.destination);
		master.gain.linearRampToValueAtTime(.16, ctx.currentTime + 1.4);
		this.ctx = ctx;
		this.master = master;
		this.filter = filter;
		this.playing = true;
		this.startDrone();
		this.tick();
		this.timer = setInterval(() => this.tick(), 1680);
	}
	async stop() {
		if (!this.playing || !this.ctx || !this.master) return;
		const { ctx, master } = this;
		master.gain.cancelScheduledValues(ctx.currentTime);
		master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
		master.gain.linearRampToValueAtTime(0, ctx.currentTime + .45);
		window.setTimeout(() => this.teardown(), 500);
		this.playing = false;
	}
	startDrone() {
		if (!this.ctx || !this.master) return;
		for (const f of [73.42, 110]) {
			const osc = this.ctx.createOscillator();
			const g = this.ctx.createGain();
			osc.type = "sine";
			osc.frequency.value = f;
			g.gain.value = .045;
			osc.connect(g);
			g.connect(this.master);
			osc.start();
			this.drones.push(osc);
		}
	}
	tick() {
		if (!this.ctx || !this.master || !this.playing) return;
		const t = this.ctx.currentTime;
		const freq = MELODY[this.step % MELODY.length] ?? 293.66;
		tone(this.ctx, this.master, freq, t, 2.4, .07, "sine");
		tone(this.ctx, this.master, freq * 2, t + .04, 1.8, .018, "triangle");
		this.step += 1;
	}
	teardown() {
		if (this.timer) clearInterval(this.timer);
		this.timer = null;
		for (const d of this.drones) try {
			d.stop();
		} catch {}
		this.drones = [];
		this.ctx?.close();
		this.ctx = null;
		this.master = null;
		this.filter = null;
	}
};
var ambient = new AmbientPlayer();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function FloralDivider({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 280 36",
		className: cn("mx-auto h-8 w-56 text-gold", className),
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 18 H112",
				stroke: "currentColor",
				strokeWidth: "0.7",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M168 18 H270",
				stroke: "currentColor",
				strokeWidth: "0.7",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M140 6 C146 12 146 24 140 30 C134 24 134 12 140 6 Z",
				stroke: "currentColor",
				strokeWidth: "0.9",
				fill: "currentColor",
				fillOpacity: "0.15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "140",
				cy: "18",
				r: "2.2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M118 18 C124 10 132 10 140 18 C148 10 156 10 162 18",
				stroke: "currentColor",
				strokeWidth: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M118 18 C124 26 132 26 140 18 C148 26 156 26 162 18",
				stroke: "currentColor",
				strokeWidth: "0.8"
			})
		]
	});
}
function CornerFlourish({ className, flipX, flipY }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className: cn("size-14 text-gold", className),
		style: { transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` },
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 8 C8 28 12 40 32 48 C20 36 18 22 22 8",
				stroke: "currentColor",
				strokeWidth: "0.9",
				opacity: "0.85"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 8 C28 8 40 12 48 32 C36 20 22 18 8 22",
				stroke: "currentColor",
				strokeWidth: "0.9",
				opacity: "0.85"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 28 C18 22 28 22 32 28 C26 26 18 30 12 28 Z",
				fill: "currentColor",
				fillOpacity: "0.35"
			})
		]
	});
}
function Monogram({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex size-16 items-center justify-center rounded-full border border-gold/50 font-display text-lg tracking-wide text-gold", className),
		"aria-hidden": "true",
		children: "ا‌م"
	});
}
var PETALS = [
	{
		left: "8%",
		delay: "0s",
		duration: "14s",
		size: 10,
		drift: 18,
		rotate: 220
	},
	{
		left: "18%",
		delay: "2.4s",
		duration: "16s",
		size: 14,
		drift: -22,
		rotate: 280
	},
	{
		left: "32%",
		delay: "5.1s",
		duration: "13s",
		size: 9,
		drift: 12,
		rotate: 190
	},
	{
		left: "47%",
		delay: "1.2s",
		duration: "18s",
		size: 16,
		drift: -16,
		rotate: 340
	},
	{
		left: "61%",
		delay: "3.8s",
		duration: "15s",
		size: 11,
		drift: 24,
		rotate: 250
	},
	{
		left: "73%",
		delay: "6.2s",
		duration: "17s",
		size: 13,
		drift: -10,
		rotate: 300
	},
	{
		left: "84%",
		delay: "0.7s",
		duration: "14s",
		size: 8,
		drift: 14,
		rotate: 210
	},
	{
		left: "92%",
		delay: "4.5s",
		duration: "16s",
		size: 12,
		drift: -20,
		rotate: 270
	}
];
function FallingPetals() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": "true",
		children: PETALS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "petal",
			style: {
				left: p.left,
				animationDelay: p.delay,
				animationDuration: p.duration,
				width: p.size,
				height: p.size * 1.4,
				["--drift"]: `${p.drift}px`,
				["--spin"]: `${p.rotate}deg`
			}
		}, p.left))
	});
}
var invitation = {
	bride: "اسراء",
	groom: "محمدصادق",
	monogram: "ا‌م",
	title: "جشن پیوند اسراء و محمدصادق",
	coverKicker: "جشن پیوند",
	coverTitle: "به ضیافت ما دعوتید",
	openLabel: "باز کنید",
	bismillah: "به نام خالق عشق",
	letter: "با مهر و شوق، از شما دعوت می‌کنیم آغاز فصل تازه زندگی‌مان را در کنار ما جشن بگیرید.",
	storyTitle: "داستان عاشقانه‌ی ما، از این روز آغاز می‌شود",
	story: "تمام مسیرهای زندگی، ما را به این لحظه رساند؛ لحظه‌ای که با عشق، زندگی را آغاز می‌کنیم.",
	detailsTitle: "جزئیات مراسم",
	timelineTitle: "یک غروب، یک آغاز",
	timelineLead: "دوشنبه، بیست‌وسوم شهریور ۱۴۰۵ از هفت عصر تا ده شب",
	countdownTitle: "تا غروب جشن ما",
	countdownPast: "این غروب به زیبایی در خاطره‌ها ماند",
	rsvpTitle: "پاسخ به دعوت",
	rsvpLead: "حضور شما، بهترین هدیه‌ی این شب خواهد بود. شما را صمیمانه دعوت می‌کنیم تا در جشن آغاز زندگی مشترکمان، همراه و شادی‌بخش این شب خاطره‌انگیز باشید.",
	rsvpHint: "لطفاً در صورت امکان پاسخ خود را پیش از مراسم ثبت کنید.",
	locationTitle: "نشانی مراسم",
	locationKicker: "محل میعاد ما",
	venueName: "عمارت شمس",
	venueAddress: "تهران، بزرگراه همت شرق به غرب، بلوار عدل شمالی، عمارت شمس",
	jalali: {
		year: 1405,
		month: 6,
		day: 23,
		weekday: "دوشنبه",
		monthName: "شهریور",
		dayName: "بیست‌وسوم"
	},
	timeRange: "۱۹:۰۰ — ۲۲:۰۰",
	timeLead: "ساعت ۱۹:۰۰ الی ۲۲:۰۰",
	startIso: "2026-09-14T15:30:00.000Z",
	endIso: "2026-09-14T18:30:00.000Z",
	schedule: [
		{
			time: "۱۹:۰۰",
			title: "پذیرایی و خوش‌آمدگویی"
		},
		{
			time: "۲۰:۰۰",
			title: "آغاز مراسم"
		},
		{
			time: "۲۱:۰۰",
			title: "صرف شام"
		},
		{
			time: "۲۲:۰۰",
			title: "بدرقه مهمانان"
		}
	],
	mapsQuery: "تالار پذیرایی عمارت شمس همت بلوار عدل تهران",
	neshanPlace: "https://neshan.org/maps/places/334dfd52e43bacaa25e3c576d1273bc0"
};
var rsvpOptions = [
	{
		id: "yes",
		label: "حضور دارم",
		hint: "با شوق می‌آیم"
	},
	{
		id: "maybe",
		label: "هنوز مشخص نیست",
		hint: "به‌زودی خبر می‌دهم"
	},
	{
		id: "no",
		label: "نمی‌توانم بیایم",
		hint: "در دلم کنار شمایم"
	}
];
function mapsLinks(query) {
	const q = encodeURIComponent(query);
	return [
		{
			id: "neshan",
			label: "نشان",
			href: invitation.neshanPlace
		},
		{
			id: "balad",
			label: "بلد",
			href: `https://balad.ir/search/?query=${q}`
		},
		{
			id: "google",
			label: "گوگل‌مپ",
			href: `https://www.google.com/maps/search/?api=1&query=${q}`
		},
		{
			id: "waze",
			label: "ویز",
			href: `https://waze.com/ul?q=${q}&navigate=yes`
		}
	];
}
function calendarUrls() {
	return { google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(invitation.title)}&dates=20260914T190000/20260914T220000&ctz=Asia/Tehran&details=${encodeURIComponent(`${invitation.venueName} — ${invitation.venueAddress}`)}&location=${encodeURIComponent(`${invitation.venueName}، ${invitation.venueAddress}`)}` };
}
function buildIcs() {
	return [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//EsraMohammadsadegh//Invitation//FA",
		"CALSCALE:GREGORIAN",
		"BEGIN:VEVENT",
		"DTSTAMP:20260801T000000Z",
		"DTSTART;TZID=Asia/Tehran:20260914T190000",
		"DTEND;TZID=Asia/Tehran:20260914T220000",
		`SUMMARY:${invitation.title}`,
		`LOCATION:${invitation.venueName}، ${invitation.venueAddress}`,
		`DESCRIPTION:${invitation.letter}`,
		"END:VEVENT",
		"END:VCALENDAR"
	].join("\r\n");
}
var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toFaDigits(value) {
	return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)] ?? d);
}
function pad2(n) {
	return n.toString().padStart(2, "0");
}
function formatJalaliLong(parts) {
	return `${toFaDigits(parts.day)} ${parts.monthName}ماه ${toFaDigits(parts.year)}`;
}
function ShamsiDate({ className, dateTime = "2026-09-14" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
		dateTime,
		dir: "rtl",
		className: cn("block w-full text-center font-display", className),
		children: formatJalaliLong(invitation.jalali)
	});
}
function Cover({ opening, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("relative isolate flex min-h-dvh flex-col items-center justify-end overflow-hidden bg-wine text-ivory", opening && "cover-exit"),
		"aria-label": "روکش دعوت‌نامه",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/envelope.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cover-veil absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallingPetals, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex w-full max-w-md flex-col items-center px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, { className: "mb-6 size-14 border-gold/40 font-ceremony text-gold-bright" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ceremony text-3xl font-bold leading-none text-gold-bright",
						children: invitation.coverKicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-4xl leading-tight text-ivory",
						children: invitation.coverTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloralDivider, { className: "my-5 text-gold-bright" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[2.75rem] font-bold leading-none text-ivory drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]",
						children: invitation.bride
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "my-1.5 font-display text-2xl font-bold text-gold-bright",
						children: "و"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[2.35rem] font-bold leading-none text-ivory drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]",
						children: invitation.groom
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShamsiDate, { className: "mt-3 text-lg text-ivory/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onOpen,
						disabled: opening,
						className: "group mt-10 flex flex-col items-center gap-3",
						"aria-label": invitation.openLabel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "seal-pulse relative grid size-28 place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/images/seal.jpg",
								alt: "",
								className: "size-24 rounded-full object-cover ring-2 ring-gold/70 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform duration-[var(--motion-fast)] group-active:scale-[0.96]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl tracking-wide text-gold-bright",
							children: invitation.openLabel
						})]
					})
				]
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-body font-medium select-none transition-[transform,background-color,color,border-color,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)] active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2", {
	variants: {
		variant: {
			gold: "bg-gold text-wine hover:bg-gold-bright ring-offset-wine",
			outline: "border border-gold/55 bg-transparent text-gold hover:bg-gold/10 ring-offset-wine",
			paper: "border border-ink/12 bg-ivory text-ink hover:bg-ivory-deep ring-offset-ivory",
			ink: "bg-ink text-ivory hover:bg-wine ring-offset-ivory",
			ghost: "bg-transparent text-gold hover:bg-gold/10 ring-offset-wine"
		},
		size: {
			sm: "h-10 rounded-[var(--radius-sm)] px-4 text-sm",
			md: "h-12 rounded-[var(--radius-md)] px-5 text-sm",
			lg: "h-14 rounded-[var(--radius-lg)] px-6 text-base",
			icon: "size-12 rounded-full"
		}
	},
	defaultVariants: {
		variant: "gold",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
function diff(from, to) {
	const ms = to - from;
	if (ms <= 0) return null;
	const seconds = Math.floor(ms / 1e3);
	return {
		days: Math.floor(seconds / 86400),
		hours: Math.floor(seconds % 86400 / 3600),
		minutes: Math.floor(seconds % 3600 / 60),
		seconds: seconds % 60
	};
}
var LABELS = [
	{
		key: "days",
		label: "روز"
	},
	{
		key: "hours",
		label: "ساعت"
	},
	{
		key: "minutes",
		label: "دقیقه"
	},
	{
		key: "seconds",
		label: "ثانیه"
	}
];
function Countdown() {
	const target = Date.parse(invitation.startIso);
	const [parts, setParts] = (0, import_react.useState)(() => diff(Date.now(), target));
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			setParts(diff(Date.now(), target));
		}, 1e3);
		return () => window.clearInterval(id);
	}, [target]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "countdown",
		className: "scroll-mt-20 px-6 py-10 text-center",
		"aria-labelledby": "countdown-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 font-body text-xs tracking-[0.3em] text-bronze",
				children: "شمارش"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "countdown-title",
				className: "font-display text-2xl text-ink",
				children: invitation.countdownTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloralDivider, { className: "my-4 text-bronze" }),
			parts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-4 gap-2",
				children: LABELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] border border-ink/8 bg-ivory-deep/60 px-1 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl tabular-nums text-ink",
						children: toFaDigits(pad2(parts[item.key]))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-body text-[11px] text-ink-soft",
						children: item.label
					})]
				}, item.key))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-display text-lg leading-relaxed text-ink-soft",
				children: invitation.countdownPast
			})
		]
	});
}
function downloadIcs() {
	const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "esra-mohammadsadegh.ics";
	a.click();
	URL.revokeObjectURL(url);
}
function Location() {
	const links = mapsLinks(invitation.mapsQuery);
	const cal = calendarUrls();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "location",
		className: "scroll-mt-20 px-6 py-10",
		"aria-labelledby": "loc-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 font-body text-xs tracking-[0.3em] text-bronze",
						children: invitation.locationTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "loc-title",
						className: "font-display text-2xl text-ink",
						children: invitation.locationKicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloralDivider, { className: "my-4 text-bronze" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-[var(--radius-xl)] border border-ink/8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/venue.jpg",
					alt: "نمایی از عمارت شمس در غروب",
					className: "aspect-video w-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-gold/20 text-bronze",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						className: "size-5",
						strokeWidth: 1.6
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-ink",
					children: invitation.venueName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-body text-sm leading-7 text-ink-soft",
					children: invitation.venueAddress
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-2",
				children: links.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: item.href,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-ink/12 bg-ivory-deep/50 font-body text-sm text-ink transition-colors duration-[var(--motion-quick)] hover:bg-gold/15",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {
						className: "size-4 text-bronze",
						strokeWidth: 1.6
					}), item.label]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center font-body text-xs text-ink-soft",
				children: "مسیر رسیدن به عمارت شمس را با یکی از سرویس‌های بالا باز کنید."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ink",
					className: "w-full",
					onClick: downloadIcs,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, {
						className: "size-4",
						strokeWidth: 1.6
					}), "افزودن به تقویم"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: cal.google,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border border-ink/12 font-body text-sm text-ink transition-colors hover:bg-ivory-deep",
					children: "افزودن به گوگل‌کلندر"
				})]
			})
		]
	});
}
function MusicButton({ playing, onToggle, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "ghost",
		size: "icon",
		onClick: () => {
			if (ambient.playing) {
				ambient.stop();
				onToggle();
			} else ambient.start().then(onToggle);
		},
		"aria-label": playing ? "خاموش کردن موسیقی" : "پخش موسیقی",
		className: cn("border border-gold/40 bg-wine/70 text-gold backdrop-blur-sm hover:bg-wine/90", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative grid size-5 place-items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, {
				className: cn("size-5 transition-[opacity,transform,filter] duration-[var(--motion-fast)]", playing ? "scale-100 opacity-100 blur-none" : "absolute scale-[0.25] opacity-0 blur-[4px]"),
				strokeWidth: 1.6
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
				className: cn("size-5 transition-[opacity,transform,filter] duration-[var(--motion-fast)]", playing ? "absolute scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"),
				strokeWidth: 1.6
			})]
		})
	});
}
var STORAGE_KEY = "esra-mohammadsadegh-rsvp";
var NOTE_MAX = 500;
function Rsvp({ onAfterSave }) {
	const [status, setStatus] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(null);
	const [justSaved, setJustSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			if (parsed.status) {
				setStatus(parsed.status);
				setNote(parsed.note ?? "");
				setSaved(parsed);
			}
		} catch {}
	}, []);
	function submit(e) {
		e.preventDefault();
		if (!status) return;
		const next = {
			status,
			note: note.trim().slice(0, NOTE_MAX),
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		setSaved(next);
		setJustSaved(true);
	}
	const selectedLabel = rsvpOptions.find((o) => o.id === saved?.status)?.label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "rsvp",
		className: "scroll-mt-20 px-6 py-10",
		"aria-labelledby": "rsvp-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-body text-xs tracking-[0.3em] text-bronze",
					children: "پاسخ شما"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "rsvp-title",
					className: "font-display text-2xl text-ink",
					children: invitation.rsvpTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloralDivider, { className: "my-4 text-bronze" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-sm leading-7 text-ink-soft",
					children: invitation.rsvpLead
				})
			]
		}), saved && justSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-[var(--radius-xl)] border border-ink/10 bg-ivory-deep/70 px-5 py-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-3 grid size-12 place-items-center rounded-full bg-gold/20 text-bronze",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-6",
						strokeWidth: 1.6
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-ink",
					children: "پاسخ شما ثبت شد"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-body text-sm text-ink-soft",
					children: selectedLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ink",
					className: "mt-6 w-full",
					onClick: onAfterSave,
					children: "مشاهده لوکیشن مراسم"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-8 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "mb-3 font-body text-sm text-ink",
					children: "وضعیت حضور"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: rsvpOptions.map((opt) => {
						const active = status === opt.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: cn("flex cursor-pointer items-center justify-between rounded-[var(--radius-lg)] border px-4 py-3.5 transition-[border-color,background-color] duration-[var(--motion-quick)]", active ? "border-bronze bg-gold/15" : "border-ink/10 bg-ivory-deep/40 hover:border-ink/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-body text-sm text-ink",
								children: opt.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-body text-xs text-ink-soft",
								children: opt.hint
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "rsvp",
								value: opt.id,
								checked: active,
								onChange: () => setStatus(opt.id),
								className: "size-4 accent-[var(--color-bronze)]"
							})]
						}, opt.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "rsvp-note",
						className: "mb-2 block font-body text-sm text-ink",
						children: "یادداشت اختیاری"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "rsvp-note",
						value: note,
						maxLength: NOTE_MAX,
						onChange: (e) => setNote(e.target.value),
						rows: 4,
						placeholder: "چند کلمه برای عروس و داماد…",
						className: "w-full resize-none rounded-[var(--radius-lg)] border border-ink/12 bg-ivory px-4 py-3 font-body text-sm leading-6 text-ink placeholder:text-ink-soft/70 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-gold/40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-left font-body text-[11px] text-ink-soft",
						dir: "ltr",
						children: [
							toFaDigits(note.length),
							" از ",
							toFaDigits(NOTE_MAX)
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-xs leading-6 text-ink-soft",
					children: invitation.rsvpHint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "ink",
					className: "w-full",
					disabled: !status,
					children: saved ? "به‌روزرسانی پاسخ" : "ثبت پاسخ"
				})
			]
		})]
	});
}
function scrollToId(id) {
	document.getElementById(id)?.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
}
function Inner({ musicOn, onMusicToggle }) {
	const { jalali } = invitation;
	const dateFull = `${jalali.weekday}، ${formatJalaliLong(jalali)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-wine-deep text-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/garden.jpg",
				alt: "",
				className: "pointer-events-none fixed inset-0 size-full object-cover opacity-30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none fixed inset-0 bg-gradient-to-b from-wine-deep/80 via-wine/70 to-wine-deep" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-dvh max-w-md flex-col pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed top-5 start-4 z-30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MusicButton, {
						playing: musicOn,
						onToggle: onMusicToggle
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "inner-enter relative mx-3 mb-8 overflow-hidden rounded-3xl bg-ivory text-ink shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerFlourish, { className: "pointer-events-none absolute start-3 top-3 z-10 size-12 text-gold-bright/80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerFlourish, {
							flipX: true,
							className: "pointer-events-none absolute end-3 top-3 z-10 size-12 text-gold-bright/80"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerFlourish, {
							flipY: true,
							className: "pointer-events-none absolute start-3 bottom-3 z-10 size-12 text-gold-bright/70"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerFlourish, {
							flipX: true,
							flipY: true,
							className: "pointer-events-none absolute end-3 bottom-3 z-10 size-12 text-gold-bright/70"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "relative aspect-[3/4] overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/couple-veiled.jpg",
									alt: "عروس و داماد در باغ، از پشت",
									className: "size-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ivory via-ivory/20 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-x-0 bottom-0 px-6 pb-8 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-ceremony text-2xl font-bold leading-none text-bronze",
											children: "جشن پیوند"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "mt-3 font-display text-5xl leading-none text-ink",
											children: invitation.bride
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "my-1 font-display text-2xl text-bronze",
											children: "و"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "font-display text-4xl leading-none text-ink",
											children: invitation.groom
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-6 pb-4 pt-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl text-ink",
									children: invitation.bismillah
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShamsiDate, { className: "mt-3 text-2xl text-ink" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloralDivider, { className: "my-6 text-bronze" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ink",
										className: "w-full",
										onClick: () => scrollToId("details"),
										children: "مشاهده اطلاعات مراسم"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "paper",
										className: "w-full",
										onClick: () => scrollToId("letter"),
										children: "متن دعوت"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "letter",
							className: "scroll-mt-20 px-6 py-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									className: "mx-auto mb-4 size-5 text-bronze",
									strokeWidth: 1.4
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-ceremony text-2xl font-bold leading-none text-ink",
									children: invitation.coverKicker
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-body text-sm leading-8 text-ink-soft",
									children: invitation.letter
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/images/roses.jpg",
								alt: "گل‌های سفید روی کاغذ کرم",
								className: "aspect-[3/2] w-full rounded-[var(--radius-xl)] object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "details",
							className: "scroll-mt-20 px-6 py-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 font-body text-xs tracking-[0.3em] text-bronze",
									children: invitation.detailsTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl leading-9 text-ink",
									children: invitation.storyTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloralDivider, { className: "my-4 text-bronze" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body text-sm leading-8 text-ink-soft",
									children: invitation.story
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 grid gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
												className: "size-5",
												strokeWidth: 1.5
											}),
											label: "تاریخ مراسم",
											value: dateFull,
											href: "#countdown"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
												className: "size-5",
												strokeWidth: 1.5
											}),
											label: "زمان‌بندی مراسم",
											value: invitation.timeLead,
											href: "#schedule"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												className: "size-5",
												strokeWidth: 1.5
											}),
											label: "محل مراسم",
											value: invitation.venueName,
											href: "#location"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "px-6 pb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-[var(--radius-xl)] border border-ink/8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/table.jpg",
									alt: "میز شام جشن در عمارت",
									className: "aspect-video w-full object-cover"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "schedule",
							className: "scroll-mt-20 px-6 py-8",
							"aria-labelledby": "timeline-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										id: "timeline-title",
										className: "font-display text-2xl text-ink",
										children: invitation.timelineTitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-body text-sm leading-7 text-ink-soft",
										children: invitation.timelineLead
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-lg text-bronze",
										children: invitation.timeRange
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "relative mt-8 ms-3 border-s border-gold/50 ps-6",
								children: invitation.schedule.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative mb-6 last:mb-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -start-7 top-1.5 size-3.5 rounded-full border-2 border-ivory bg-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-lg text-ink",
											children: item.time
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-body text-sm text-ink-soft",
											children: item.title
										})
									]
								}, item.time))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rsvp, { onAfterSave: () => scrollToId("location") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Location, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "px-6 pb-12 pt-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloralDivider, { className: "mb-5 text-bronze" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-ceremony text-xl font-bold text-ink",
									children: "جشن پیوند"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-display text-xl text-ink",
									children: [
										invitation.bride,
										" و ",
										invitation.groom
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-body text-xs text-ink-soft",
									children: "با عشق، در انتظار دیدارتان"
								})
							]
						})
					]
				})]
			})
		]
	});
}
function DetailRow({ icon, label, value, href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		onClick: (e) => {
			e.preventDefault();
			scrollToId(href.slice(1));
		},
		className: "flex items-center gap-3 rounded-[var(--radius-lg)] border border-ink/8 bg-ivory-deep/50 px-4 py-3 text-start transition-colors duration-[var(--motion-quick)] hover:border-bronze/40 hover:bg-gold/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-10 shrink-0 place-items-center rounded-full bg-gold/20 text-bronze",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-xs text-ink-soft",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					dir: "rtl",
					className: "font-body text-sm text-ink",
					children: value
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
				className: "size-4 shrink-0 text-bronze",
				strokeWidth: 1.6
			})
		]
	});
}
var OPEN_KEY = "esra-mohammadsadegh-opened";
function InvitationApp() {
	const [opened, setOpened] = (0, import_react.useState)(false);
	const [opening, setOpening] = (0, import_react.useState)(false);
	const [musicOn, setMusicOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			if (sessionStorage.getItem(OPEN_KEY) === "1") setOpened(true);
		} catch {}
	}, []);
	const handleOpen = (0, import_react.useCallback)(() => {
		if (opening || opened) return;
		setOpening(true);
		ambient.start().then(() => setMusicOn(true));
		window.setTimeout(() => {
			setOpened(true);
			setOpening(false);
			try {
				sessionStorage.setItem(OPEN_KEY, "1");
			} catch {}
		}, 900);
	}, [opening, opened]);
	const toggleMusic = (0, import_react.useCallback)(() => {
		setMusicOn(ambient.playing);
	}, []);
	if (!opened) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
		opening,
		onOpen: handleOpen
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner, {
		musicOn,
		onMusicToggle: toggleMusic
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationApp, {});
}
//#endregion
export { Home as component };
