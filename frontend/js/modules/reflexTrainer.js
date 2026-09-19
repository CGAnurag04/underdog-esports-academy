// Esports Aim, Reaction & Micro-Decision Reflex Trainer

export class ReflexTrainer {
  constructor(arenaId, statsId) {
    this.arena = document.getElementById(arenaId);
    this.statsEl = document.getElementById(statsId);
    
    this.round = 0;
    this.maxRounds = 5;
    this.reactionTimes = [];
    this.spawnTime = 0;
    this.activeTarget = null;
    this.timeoutId = null;
    this.isRunning = false;

    // Web Audio API for sound feedback without external files
    this.audioCtx = null;

    this.bindEvents();
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  playBeep(freq = 600, duration = 0.08, type = 'sine') {
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  bindEvents() {
    if (!this.arena) return;

    this.arena.addEventListener('click', (e) => {
      if (!this.isRunning) return;

      if (e.target.classList.contains('aim-target')) {
        const reactionTime = Math.round(performance.now() - this.spawnTime);
        this.reactionTimes.push(reactionTime);
        this.playBeep(880, 0.08, 'sine'); // high success beep
        this.removeTarget();
        this.updateStats();

        if (this.round >= this.maxRounds) {
          this.endSession();
        } else {
          this.scheduleNextTarget();
        }
      } else {
        // Misclick penalty
        this.playBeep(220, 0.12, 'sawtooth'); // low buzz
      }
    });
  }

  startTest() {
    this.isRunning = true;
    this.round = 0;
    this.reactionTimes = [];
    this.removeTarget();
    this.statsEl.innerHTML = `
      <div class="text-primary font-sub uppercase tracking-wider text-sm">Round 0 of ${this.maxRounds}</div>
      <div class="text-xs text-slate-400 mt-1">Keep crosshair centered. Targets spawn randomly. Click as fast as you can!</div>
    `;
    this.scheduleNextTarget();
  }

  scheduleNextTarget() {
    this.round++;
    const delay = 1000 + Math.random() * 2000; // 1 to 3 seconds random delay
    
    this.statsEl.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-sub uppercase text-amber-400">Target ${this.round} / ${this.maxRounds} incoming...</span>
        <span class="text-xs text-slate-500">Wait for trigger...</span>
      </div>
    `;

    this.timeoutId = setTimeout(() => {
      if (!this.isRunning) return;
      this.spawnTarget();
    }, delay);
  }

  spawnTarget() {
    const arenaRect = this.arena.getBoundingClientRect();
    const targetSize = 48; // px

    const minX = targetSize;
    const maxX = arenaRect.width - targetSize;
    const minY = targetSize;
    const maxY = arenaRect.height - targetSize;

    const x = Math.floor(minX + Math.random() * (maxX - minX));
    const y = Math.floor(minY + Math.random() * (maxY - minY));

    const target = document.createElement('div');
    target.className = 'aim-target';
    target.style.width = `${targetSize}px`;
    target.style.height = `${targetSize}px`;
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    target.style.background = 'radial-gradient(circle, #00f0ff 30%, #ff5500 90%)';
    target.style.border = '2px solid #ffffff';
    target.style.cursor = 'crosshair';

    this.arena.appendChild(target);
    this.activeTarget = target;
    this.spawnTime = performance.now();
    this.playBeep(520, 0.05, 'triangle');
  }

  removeTarget() {
    if (this.activeTarget && this.activeTarget.parentElement) {
      this.activeTarget.parentElement.removeChild(this.activeTarget);
      this.activeTarget = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  updateStats() {
    const last = this.reactionTimes[this.reactionTimes.length - 1];
    const avg = Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length);
    
    this.statsEl.innerHTML = `
      <div class="flex items-center justify-between text-sm">
        <span class="text-slate-300">Round ${this.round}/${this.maxRounds}: <strong class="text-primary">${last} ms</strong></span>
        <span class="text-slate-400">Current Average: <strong class="text-amber-400">${avg} ms</strong></span>
      </div>
    `;
  }

  endSession() {
    this.isRunning = false;
    this.removeTarget();
    const avg = Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length);
    const best = Math.min(...this.reactionTimes);

    let rank = "";
    let badgeColor = "";
    let advice = "";

    if (avg < 190) {
      rank = "Tier-1 Pro Phenom (God Reflexes)";
      badgeColor = "text-emerald-400 border-emerald-400 bg-emerald-950/40";
      advice = "Your motor reaction speed is in the top 1% of competitive esports athletes. Focus 80% of training on macro and IGL positioning.";
    } else if (avg <= 230) {
      rank = "Scrim Demon (Tournament Ready)";
      badgeColor = "text-primary border-primary bg-cyan-950/40";
      advice = "Excellent reaction speed suitable for Tier-2 & Tier-1 LAN tournaments. Perfect for Entry Fraggers and Fast Gloo Wall rushers.";
    } else if (avg <= 280) {
      rank = "Contender (Solid Grassroots)";
      badgeColor = "text-amber-400 border-amber-400 bg-amber-950/40";
      advice = "Standard competitive speed. Implement 15 minutes of daily crosshair drills to shave off 30-40 milliseconds.";
    } else {
      rank = "Underdog Rookie (Pre-Warmup State)";
      badgeColor = "text-rose-400 border-rose-400 bg-rose-950/40";
      advice = "Nerve endings are cold or device touch response is lagging. Perform wrist stretches, hydrate, and run the 15-minute warmup routine.";
    }

    this.statsEl.innerHTML = `
      <div class="cyber-panel p-4 border border-cyan-500/30 rounded-lg animate-fade-in mt-2">
        <div class="flex items-center justify-between mb-2">
          <span class="cyber-badge ${badgeColor} border px-2 py-0.5">${rank}</span>
          <span class="text-xs text-slate-400 font-mono">Best: <span class="text-emerald-400 font-bold">${best} ms</span></span>
        </div>
        <div class="text-2xl font-heading text-white font-bold my-1">${avg} <span class="text-xs font-normal text-slate-400">ms avg</span></div>
        <p class="text-xs text-slate-300 leading-relaxed">${advice}</p>
        <button id="retryReflexBtn" class="mt-3 w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-sub font-bold uppercase rounded tracking-wider text-xs hover:opacity-90">
          Run Test Again (5 Rounds)
        </button>
      </div>
    `;

    const retryBtn = document.getElementById('retryReflexBtn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.startTest());
    }
  }
}
