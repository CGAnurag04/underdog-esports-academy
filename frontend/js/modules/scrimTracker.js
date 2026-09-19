// Scrim Performance Logger & Root-Cause Mistake Diagnostic Module

export class ScrimTracker {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.storageKey = 'underdog_esports_scrims_v1';
    this.matches = this.loadMatches();

    if (this.container) {
      this.render();
    }
  }

  loadMatches() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : this.getDefaultMatches();
    } catch (e) {
      return this.getDefaultMatches();
    }
  }

  saveMatches() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.matches));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }

  getDefaultMatches() {
    return [
      {
        id: "match-1",
        game: "BGMI",
        date: "2026-09-01",
        map: "Erangel",
        placement: 3,
        kills: 7,
        points: 12, // 5 placement + 7 kills
        fatalMistake: "Missed Smokes/Utility",
        notes: "Held North ridge well, ran out of smokes crossing the final open field in Phase 6."
      },
      {
        id: "match-2",
        game: "BGMI",
        date: "2026-09-02",
        map: "Miramar",
        placement: 11,
        kills: 2,
        points: 2, // 0 placement + 2 kills
        fatalMistake: "Late Zone Rotation",
        notes: "Looted too long in El Pozo, got gatekept on the mountain pass by Tier-1 team."
      }
    ];
  }

  calculateBrPoints(placement, kills) {
    const pointTable = {
      1: 10,
      2: 6,
      3: 5,
      4: 4,
      5: 3,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
      10: 1
    };
    const placePts = pointTable[placement] || 0;
    return placePts + (parseInt(kills, 10) || 0);
  }

  addMatch(matchData) {
    this.matches.unshift(matchData);
    this.saveMatches();
    this.render();
  }

  deleteMatch(id) {
    this.matches = this.matches.filter(m => m.id !== id);
    this.saveMatches();
    this.render();
  }

  getAnalytics() {
    if (this.matches.length === 0) {
      return { totalMatches: 0, totalPts: 0, avgPts: 0, topMistake: "None" };
    }

    const totalPts = this.matches.reduce((acc, m) => acc + (m.points || 0), 0);
    const avgPts = (totalPts / this.matches.length).toFixed(1);

    const mistakeCounts = {};
    this.matches.forEach(m => {
      if (m.fatalMistake && m.fatalMistake !== 'None (Clean Match)') {
        mistakeCounts[m.fatalMistake] = (mistakeCounts[m.fatalMistake] || 0) + 1;
      }
    });

    let topMistake = "No repeated blunders recorded yet!";
    let maxCount = 0;
    for (const [mistake, count] of Object.entries(mistakeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topMistake = `${mistake} (${count} matches)`;
      }
    }

    return {
      totalMatches: this.matches.length,
      totalPts,
      avgPts,
      topMistake,
      mistakeCounts
    };
  }

  render() {
    if (!this.container) return;
    const stats = this.getAnalytics();

    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="cyber-panel p-3.5 rounded-xl">
            <div class="text-[11px] font-sub uppercase text-slate-400">Total Scrims Logged</div>
            <div class="text-2xl font-heading font-bold text-white mt-1">${stats.totalMatches}</div>
          </div>
          <div class="cyber-panel p-3.5 rounded-xl border border-primary/20">
            <div class="text-[11px] font-sub uppercase text-primary">Total Tournament Pts</div>
            <div class="text-2xl font-heading font-bold text-primary mt-1">${stats.totalPts}</div>
          </div>
          <div class="cyber-panel p-3.5 rounded-xl border border-amber-500/20">
            <div class="text-[11px] font-sub uppercase text-amber-400">Avg Points / Scrim</div>
            <div class="text-2xl font-heading font-bold text-amber-400 mt-1">${stats.avgPts}</div>
          </div>
          <div class="cyber-panel p-3.5 rounded-xl border border-rose-500/20">
            <div class="text-[11px] font-sub uppercase text-rose-400">#1 Underdog Blunder</div>
            <div class="text-xs font-bold text-rose-300 truncate mt-2">${stats.topMistake}</div>
          </div>
        </div>

        <!-- Add Scrim Form & Diagnostic -->
        <div class="cyber-panel p-5 rounded-xl border border-slate-700/60">
          <h4 class="text-sm font-heading font-bold uppercase text-white tracking-wider mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            Log New Scrim & Diagnose Root Mistake
          </h4>
          <form id="scrimLogForm" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-sub uppercase tracking-wider text-slate-400 mb-1">Game</label>
              <select id="logGame" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white">
                <option value="BGMI">BGMI / PUBG Mobile</option>
                <option value="Free Fire">Free Fire</option>
                <option value="Honor of Kings">Honor of Kings</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-sub uppercase tracking-wider text-slate-400 mb-1">Placement / Finish Rank (1-16)</label>
              <input type="number" id="logPlacement" min="1" max="25" value="1" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white" required />
            </div>
            <div>
              <label class="block text-[11px] font-sub uppercase tracking-wider text-slate-400 mb-1">Team Kills / Frags</label>
              <input type="number" id="logKills" min="0" max="50" value="4" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white" required />
            </div>

            <div class="md:col-span-2">
              <label class="block text-[11px] font-sub uppercase tracking-wider text-rose-400 mb-1">Root Cause of Elimination / Throw</label>
              <select id="logMistake" class="w-full bg-slate-900 border border-rose-900/60 rounded-lg p-2 text-xs text-rose-200">
                <option value="None (Clean Match)">None (Clean Match / Won Without Throws)</option>
                <option value="Late Zone Rotation">Late Zone Rotation (Got gatekept outside circle)</option>
                <option value="Blind Compound Crash">Blind Compound Crash (Drove into occupied house without scout)</option>
                <option value="Failed 0.15s Gloo Wall">Failed 0.15s Gloo Wall (Exposed body after shotgun shot)</option>
                <option value="Missed Smokes/Utility">Missed Smokes/Utility (Ran out of smokes in open zone)</option>
                <option value="No Re-Frag (Un-traded Death)">No Re-Frag (Teammate died and nobody traded kill)</option>
                <option value="Face-checked Bush">Face-checked Bush (Ambushed by camping enemy)</option>
                <option value="Over-extended / Split">Over-extended (Caught solo 1v4 without backup)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-sub uppercase tracking-wider text-slate-400 mb-1">Match Date / Map</label>
              <input type="text" id="logMap" placeholder="e.g. Erangel Match 3" value="Erangel T3 Scrim" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white" />
            </div>

            <div class="md:col-span-3">
              <label class="block text-[11px] font-sub uppercase tracking-wider text-slate-400 mb-1">VOD Review Notes & Team Action Plan</label>
              <input type="text" id="logNotes" placeholder="e.g. Need 6 smokes minimum per player. Scout should keep buggy 50m ahead." class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300" />
            </div>

            <div class="md:col-span-3">
              <button type="submit" class="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-sub font-bold uppercase rounded-lg text-xs tracking-wider transition-all">
                Save Scrim & Update Diagnostic Table
              </button>
            </div>
          </form>
        </div>

        <!-- Recent Matches Table -->
        <div class="cyber-panel p-4 rounded-xl border border-slate-800">
          <h4 class="text-sm font-sub font-bold uppercase text-slate-300 tracking-wider mb-3">Recent Scrim Logs</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="text-[10px] font-sub uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th class="py-2 px-3">Game / Map</th>
                  <th class="py-2 px-3">Rank</th>
                  <th class="py-2 px-3">Kills</th>
                  <th class="py-2 px-3">Points</th>
                  <th class="py-2 px-3">Fatal Mistake</th>
                  <th class="py-2 px-3">Review Notes</th>
                  <th class="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                ${this.matches.map(m => `
                  <tr class="hover:bg-slate-800/30 transition-colors">
                    <td class="py-2.5 px-3 font-semibold text-white">
                      <span class="inline-block w-2 h-2 rounded-full ${m.game === 'BGMI' ? 'bg-amber-400' : m.game === 'Free Fire' ? 'bg-rose-500' : 'bg-sky-400'} mr-1.5"></span>
                      ${m.game} <span class="text-slate-400 text-[10px]">(${m.map || 'Custom'})</span>
                    </td>
                    <td class="py-2.5 px-3 text-primary font-bold">#${m.placement}</td>
                    <td class="py-2.5 px-3 text-slate-300">${m.kills}</td>
                    <td class="py-2.5 px-3 font-bold text-emerald-400">${m.points} pts</td>
                    <td class="py-2.5 px-3">
                      <span class="cyber-badge text-[10px] ${m.fatalMistake.includes('None') ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'}">
                        ${m.fatalMistake}
                      </span>
                    </td>
                    <td class="py-2.5 px-3 text-slate-400 text-[11px] max-w-xs truncate">${m.notes || '-'}</td>
                    <td class="py-2.5 px-3 text-right">
                      <button data-delete-id="${m.id}" class="text-rose-400 hover:text-rose-300 text-xs font-mono">Delete</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.attachFormListeners();
  }

  attachFormListeners() {
    const form = document.getElementById('scrimLogForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const placement = parseInt(document.getElementById('logPlacement').value, 10);
        const kills = parseInt(document.getElementById('logKills').value, 10);
        const pts = this.calculateBrPoints(placement, kills);

        const newMatch = {
          id: `match-${Date.now()}`,
          game: document.getElementById('logGame').value,
          date: new Date().toISOString().split('T')[0],
          map: document.getElementById('logMap').value || 'Scrim Room',
          placement,
          kills,
          points: pts,
          fatalMistake: document.getElementById('logMistake').value,
          notes: document.getElementById('logNotes').value
        };

        this.addMatch(newMatch);
      });
    }

    const deleteBtns = this.container.querySelectorAll('[data-delete-id]');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-delete-id');
        if (id) this.deleteMatch(id);
      });
    });
  }
}
