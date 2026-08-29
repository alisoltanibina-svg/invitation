const MELODY = [
  293.66, 349.23, 440.0, 392.0, 349.23, 293.66, 261.63, 220.0, 246.94, 293.66,
  349.23, 329.63,
];

function tone(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  start: number,
  dur: number,
  gain: number,
  type: OscillatorType,
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

export class AmbientPlayer {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private drones: OscillatorNode[] = [];
  private step = 0;
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
    filter.Q.value = 0.7;
    master.connect(filter);
    filter.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.4);

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
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.45);
    window.setTimeout(() => this.teardown(), 500);
    this.playing = false;
  }

  private startDrone() {
    if (!this.ctx || !this.master) return;
    const freqs = [73.42, 110.0];
    for (const f of freqs) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      g.gain.value = 0.045;
      osc.connect(g);
      g.connect(this.master);
      osc.start();
      this.drones.push(osc);
    }
  }

  private tick() {
    if (!this.ctx || !this.master || !this.playing) return;
    const t = this.ctx.currentTime;
    const freq = MELODY[this.step % MELODY.length] ?? 293.66;
    tone(this.ctx, this.master, freq, t, 2.4, 0.07, "sine");
    tone(this.ctx, this.master, freq * 2, t + 0.04, 1.8, 0.018, "triangle");
    this.step += 1;
  }

  private teardown() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    for (const d of this.drones) {
      try {
        d.stop();
      } catch {
        /* already stopped */
      }
    }
    this.drones = [];
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
    this.filter = null;
  }
}

export const ambient = new AmbientPlayer();
