// Sensitivity & HUD Layout Generator Module for BGMI, Free Fire & Honor of Kings

import { bgmiData } from '../data/bgmiData.js';
import { freeFireData } from '../data/freeFireData.js';

export class SensGenerator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentGame = 'bgmi';
    this.currentDevice = 'android_flagship';
    this.currentGrip = 'claw_4_gyro';

    if (this.container) {
      this.render();
      this.bindEvents();
    }
  }

  setGame(game) {
    this.currentGame = game;
    if (game === 'bgmi') {
      this.currentDevice = 'android_flagship';
      this.currentGrip = 'claw_4_gyro';
    } else if (game === 'freefire') {
      this.currentDevice = 'ff_mid_high';
      this.currentGrip = 'claw_3';
    } else if (game === 'hok') {
      this.currentDevice = 'hok_flagship';
      this.currentGrip = 'thumb_2';
    }
    this.render();
  }

  render() {
    if (!this.container) return;

    if (this.currentGame === 'bgmi') {
      this.renderBgmiSens();
    } else if (this.currentGame === 'freefire') {
      this.renderFreeFireSens();
    } else if (this.currentGame === 'hok') {
      this.renderHokSens();
    }
  }

  renderBgmiSens() {
    const isIphone = this.currentDevice === 'iphone';
    const presetKey = isIphone ? 'iphone_claw_4_gyro' : 'android_flagship_claw_4_gyro';
    const preset = bgmiData.sensitivityPresets.presets[presetKey] || bgmiData.sensitivityPresets.presets['android_flagship_claw_4_gyro'];

    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- Controls -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-sub uppercase tracking-wider text-slate-400 mb-1">Target Device Hardware</label>
            <select id="bgmiDeviceSelect" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-amber-400 font-sub focus:border-amber-400 outline-none">
              <option value="android_flagship" ${this.currentDevice === 'android_flagship' ? 'selected' : ''}>Flagship Android / ROG (90/120 FPS)</option>
              <option value="iphone" ${this.currentDevice === 'iphone' ? 'selected' : ''}>Apple iPhone 13/14/15/16 Pro (ProMotion)</option>
              <option value="android_budget" ${this.currentDevice === 'android_budget' ? 'selected' : ''}>Budget Android (60 FPS / 120Hz Touch)</option>
              <option value="ipad" ${this.currentDevice === 'ipad' ? 'selected' : ''}>iPad Pro / Mini 6 (Tablet Wide Ratio)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-sub uppercase tracking-wider text-slate-400 mb-1">Hand Grip & Input Method</label>
            <select id="bgmiGripSelect" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-primary font-sub focus:border-primary outline-none">
              <option value="claw_4_gyro" selected>4-Finger Claw + Always-On Gyro (Esports Meta)</option>
              <option value="claw_3_gyro">3-Finger Claw + Scope-Only Gyro</option>
              <option value="thumb_2_gyro">2-Finger Thumb + Full Gyro</option>
            </select>
          </div>
        </div>

        <!-- Sensitivity Share Code -->
        <div class="cyber-panel p-4 rounded-xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <div class="text-xs font-sub uppercase text-amber-400 tracking-wider">Official Cloud Sensitivity Code</div>
            <div class="text-lg font-mono font-bold text-white tracking-widest mt-0.5" id="sensCodeText">${preset.code}</div>
            <div class="text-xs text-slate-400">${preset.description}</div>
          </div>
          <button id="copySensBtn" class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-sub font-bold uppercase rounded-lg text-xs tracking-wider transition-all">
            Copy Cloud Code
          </button>
        </div>

        <!-- Sensitivity Tables -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Gyroscope -->
          <div class="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30">
            <div class="text-xs font-sub uppercase text-cyan-400 font-bold mb-3 flex items-center justify-between">
              <span>Gyroscope (Always-On)</span>
              <span class="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded">Core Laser</span>
            </div>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>TPP No Scope:</span><strong class="text-white">${preset.gyro.tpp_no_scope}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>Red Dot / Holographic:</span><strong class="text-white">${preset.gyro.red_dot}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>3x Scope (M416 Spray):</span><strong class="text-cyan-400 font-bold">${preset.gyro.scope_3x}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>4x Scope (DMR):</span><strong class="text-white">${preset.gyro.scope_4x}%</strong></div>
              <div class="flex justify-between"><span>6x Scope (Down-scaled):</span><strong class="text-white">${preset.gyro.scope_6x}%</strong></div>
            </div>
          </div>

          <!-- ADS Sensitivity -->
          <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div class="text-xs font-sub uppercase text-slate-300 font-bold mb-3 flex items-center justify-between">
              <span>ADS (Firing Recoil)</span>
              <span class="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Screen Drag</span>
            </div>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>TPP No Scope:</span><strong class="text-white">${preset.ads.tpp_no_scope}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>Red Dot / Holo:</span><strong class="text-white">${preset.ads.red_dot}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>3x Scope:</span><strong class="text-white">${preset.ads.scope_3x}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>4x Scope:</span><strong class="text-white">${preset.ads.scope_4x}%</strong></div>
              <div class="flex justify-between"><span>6x Scope:</span><strong class="text-white">${preset.ads.scope_6x}%</strong></div>
            </div>
          </div>

          <!-- Camera Sensitivity -->
          <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div class="text-xs font-sub uppercase text-slate-300 font-bold mb-3 flex items-center justify-between">
              <span>Camera (Free View)</span>
              <span class="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Target Acquisition</span>
            </div>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>TPP No Scope:</span><strong class="text-white">${preset.camera.tpp_no_scope}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>Red Dot / Holo:</span><strong class="text-white">${preset.camera.red_dot}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>3x Scope:</span><strong class="text-white">${preset.camera.scope_3x}%</strong></div>
              <div class="flex justify-between border-b border-slate-800 pb-1"><span>4x Scope:</span><strong class="text-white">${preset.camera.scope_4x}%</strong></div>
              <div class="flex justify-between"><span>6x Scope:</span><strong class="text-white">${preset.camera.scope_6x}%</strong></div>
            </div>
          </div>
        </div>

        <!-- 4-Finger Claw HUD Visualizer -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-sub font-bold uppercase text-white tracking-wider">Tier-1 4-Finger Claw HUD Blueprint</h4>
            <span class="text-xs text-slate-400">Emulated Mobile Touchscreen (16:9)</span>
          </div>
          <div class="claw-screen p-4">
            <div class="absolute inset-0 tactical-grid pointer-events-none opacity-40"></div>
            ${preset.hudBlueprint.map(btn => `
              <div class="claw-button bg-cyan-500/20 border-cyan-400 text-cyan-200" 
                   style="left: ${btn.x}%; top: ${btn.y}%; width: ${btn.size * 0.4}px; height: ${btn.size * 0.4}px;">
                <span>${btn.name}<br/><small class="text-[9px] text-amber-300">(${btn.finger})</small></span>
              </div>
            `).join('')}
            <!-- Center Crosshair reference -->
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-rose-500/40 rounded-full flex items-center justify-center pointer-events-none">
              <div class="w-1 h-1 bg-rose-500 rounded-full"></div>
            </div>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
            <span>Left Index: Top-Left Primary Fire (instant reflex)</span>
            <span>Right Index: Crouch & Peek (rapid jiggle)</span>
            <span>Right Thumb: Aim Drag & Scope</span>
          </div>
        </div>
      </div>
    `;

    this.attachListeners();
  }

  renderFreeFireSens() {
    const isLow = this.currentDevice === 'ff_low_end';
    const isIphone = this.currentDevice === 'ff_iphone';
    const key = isLow ? 'ff_low_end' : isIphone ? 'ff_iphone' : 'ff_mid_high';
    const preset = freeFireData.sensitivityPresets.presets[key];

    this.container.innerHTML = `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-sub uppercase tracking-wider text-slate-400 mb-1">Target Phone Specification</label>
            <select id="ffDeviceSelect" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-rose-400 font-sub focus:border-rose-400 outline-none">
              <option value="ff_mid_high" ${this.currentDevice === 'ff_mid_high' ? 'selected' : ''}>Mid-Range & Flagship Android (6-12 GB RAM)</option>
              <option value="ff_low_end" ${this.currentDevice === 'ff_low_end' ? 'selected' : ''}>Budget Android (2-4 GB RAM / High Touch Drag)</option>
              <option value="ff_iphone" ${this.currentDevice === 'ff_iphone' ? 'selected' : ''}>Apple iPhone (Zero Touch Delay)</option>
            </select>
          </div>
          <div class="cyber-panel p-3 rounded-lg border border-rose-500/30 flex items-center gap-3">
            <div class="text-rose-400 font-sub font-bold text-xs uppercase">DPI Recommendation</div>
            <div class="text-xs text-slate-300">${preset.dpiRecommendation}</div>
          </div>
        </div>

        <div class="cyber-panel p-4 rounded-xl border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <div class="text-xs font-sub uppercase text-rose-400 tracking-wider">Free Fire Pro Sensitivity Profile</div>
            <div class="text-sm font-mono font-bold text-white mt-1">${preset.code}</div>
            <div class="text-xs text-slate-400 mt-0.5">${preset.description}</div>
          </div>
          <button id="copyFfCodeBtn" class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-sub font-bold uppercase rounded-lg text-xs tracking-wider transition-all">
            Copy Values
          </button>
        </div>

        <!-- 3-Finger Custom HUD Visualizer -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-sub font-bold uppercase text-white tracking-wider">Fast Gloo Wall 3-Finger HUD Blueprint</h4>
            <span class="text-xs text-slate-400">Designed for 0.15s Sit-Down Gloo Wall Execution</span>
          </div>
          <div class="claw-screen p-4">
            <div class="absolute inset-0 tactical-grid pointer-events-none opacity-40"></div>
            ${preset.hudBlueprint.map(btn => `
              <div class="claw-button bg-rose-500/20 border-rose-400 text-rose-200" 
                   style="left: ${btn.x}%; top: ${btn.y}%; width: ${btn.size * 0.55}px; height: ${btn.size * 0.55}px;">
                <span>${btn.name}<br/><small class="text-[9px] text-amber-300">(${btn.finger})</small></span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const select = document.getElementById('ffDeviceSelect');
    if (select) {
      select.addEventListener('change', (e) => {
        this.currentDevice = e.target.value;
        this.render();
      });
    }

    const copyBtn = document.getElementById('copyFfCodeBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(preset.code);
        copyBtn.innerText = "COPIED!";
        setTimeout(() => copyBtn.innerText = "Copy Values", 2000);
      });
    }
  }

  renderHokSens() {
    this.container.innerHTML = `
      <div class="space-y-6">
        <div class="cyber-panel p-4 rounded-xl border border-sky-500/30">
          <div class="text-xs font-sub uppercase text-sky-400 tracking-wider">Honor of Kings (HoK) Competitive Settings</div>
          <h4 class="text-base font-heading font-bold text-white mt-1">Targeting & Skill Cast Optimization for Underdogs</h4>
          <p class="text-xs text-slate-300 mt-1 leading-relaxed">
            By default, HoK attacks whatever target is nearest. In competitive tournaments, this results in hitting the enemy tank while the low-HP marksman escapes. Configure these exact settings:
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            <div class="font-sub font-bold text-sm text-sky-400 uppercase">Target Selection Method</div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-slate-300">Attack Target Priority:</span>
              <strong class="text-amber-400">Lowest Absolute HP (Priority)</strong>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-slate-300">Target Lock Mode:</span>
              <strong class="text-emerald-400">Avatar Target Lock (Enabled)</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-300">Minion & Tower Push Button:</span>
              <strong class="text-sky-400">Separate Tower/Minion Buttons (Enabled)</strong>
            </div>
          </div>

          <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            <div class="font-sub font-bold text-sm text-sky-400 uppercase">Skill Casting & Camera Sensitivity</div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-slate-300">Skill Cast Method:</span>
              <strong class="text-white">Quick Cast with Indicator</strong>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-slate-300">Skill Wheel Wheel Sensitivity:</span>
              <strong class="text-amber-400">85% - 90% (Instant Snap)</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-300">Minimap Tap Roam Camera:</span>
              <strong class="text-emerald-400">Slide to Drag Camera Enabled</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachListeners() {
    const devSelect = document.getElementById('bgmiDeviceSelect');
    if (devSelect) {
      devSelect.addEventListener('change', (e) => {
        this.currentDevice = e.target.value;
        this.render();
      });
    }

    const copyBtn = document.getElementById('copySensBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const code = document.getElementById('sensCodeText')?.innerText;
        if (code) {
          navigator.clipboard.writeText(code);
          copyBtn.innerText = "COPIED TO CLIPBOARD!";
          setTimeout(() => copyBtn.innerText = "Copy Cloud Code", 2000);
        }
      });
    }
  }
}
