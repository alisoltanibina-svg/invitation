const PETALS = [
  { left: "8%", delay: "0s", duration: "14s", size: 10, drift: 18, rotate: 220 },
  { left: "18%", delay: "2.4s", duration: "16s", size: 14, drift: -22, rotate: 280 },
  { left: "32%", delay: "5.1s", duration: "13s", size: 9, drift: 12, rotate: 190 },
  { left: "47%", delay: "1.2s", duration: "18s", size: 16, drift: -16, rotate: 340 },
  { left: "61%", delay: "3.8s", duration: "15s", size: 11, drift: 24, rotate: 250 },
  { left: "73%", delay: "6.2s", duration: "17s", size: 13, drift: -10, rotate: 300 },
  { left: "84%", delay: "0.7s", duration: "14s", size: 8, drift: 14, rotate: 210 },
  { left: "92%", delay: "4.5s", duration: "16s", size: 12, drift: -20, rotate: 270 },
];

export function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PETALS.map((p) => (
        <span
          key={p.left}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size * 1.4,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
