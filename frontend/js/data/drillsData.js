// Daily Drills, Mindset & Micro-Decision Scenarios for Esports Underdogs

export const drillsData = {
  warmups: [
    {
      id: "warmup-15",
      title: "15-Minute Emergency Warm-Up",
      tag: "Before Sudden Scrim",
      duration: "15 mins",
      steps: [
        {
          time: "0:00 - 4:00",
          title: "Wrist & Tendon Activation",
          instruction: "Finger stretches, wrist circles, and 30 seconds of high-speed screen tapping to wake up nerve endings."
        },
        {
          time: "4:00 - 9:00",
          title: "Crosshair Placement & Recoil Reset",
          instruction: "Training Grounds: Spray 5 clips at 50m and 100m targets without stopping. Focus on first-bullet accuracy."
        },
        {
          time: "9:00 - 15:00",
          title: "1 Round of Fast TDM / 1v1 Arena",
          instruction: "Play hyper-aggressive close range. Do not worry about dying; prioritize snappy reaction speed and crosshair alignment."
        }
      ]
    },
    {
      id: "warmup-30",
      title: "30-Minute Tier-1 Standard Routine",
      tag: "Recommended Daily",
      duration: "30 mins",
      steps: [
        {
          time: "0:00 - 5:00",
          title: "Physical Warm-Up & Eye Focus",
          instruction: "20-20-20 rule for eye strain. Wrist stretches. Set device brightness and turn on Do Not Disturb."
        },
        {
          time: "5:00 - 15:00",
          title: "Mechanics Isolation Drill",
          instruction: "BGMI: 100m vehicle spray tracking + jiggle crouch-fire. Free Fire: 50 consecutive sit-down gloo walls in training yard. HoK: Practice full assassin dive-and-escape combo 10 times in practice mode."
        },
        {
          time: "15:00 - 25:00",
          title: "High-Intensity Deathmatch / 1v1",
          instruction: "Play 2 deathmatch games with primary competition weapons (e.g. M416+UMP / M1887+MP40 / assassin hero)."
        },
        {
          time: "25:00 - 30:00",
          title: "IGL & Strategy Mental Alignment",
          instruction: "Team gathers in voice chat. Review primary drop spot, fallback POI, and vehicle allocation for Match 1."
        }
      ]
    },
    {
      id: "warmup-45",
      title: "45-Minute Intensive Boot Camp Routine",
      tag: "Tournament Matchdays",
      duration: "45 mins",
      steps: [
        {
          time: "0:00 - 10:00",
          title: "Sens Calibration & Micro-Drills",
          instruction: "Fine-tune scope sensitivity. Run reaction trainer test to ensure reaction latency is under 220ms."
        },
        {
          time: "10:00 - 25:00",
          title: "Utility & Grenade Arc Training",
          instruction: "Practice cooking 2.0s grenades through compound windows, bank angles off doorframes, and deploy smoke walls."
        },
        {
          time: "25:00 - 40:00",
          title: "2x Scrim Simulations / Custom 4v4",
          instruction: "Play against a friendly rival clan in custom 4v4 room with tournament health and armor presets."
        },
        {
          time: "40:00 - 45:00",
          title: "Tactical Reset & Hydration",
          instruction: "Drink water, wash face to reset alertness, review map rotation playbook on tactical whiteboard."
        }
      ]
    }
  ],

  microDecisions: [
    {
      id: "dec-1",
      game: "BGMI",
      scenario: "Phase 4 zone hard-shifts South across the Military Island water. You have 3 players alive, 2 vehicles, and a squad is gatekeeping the Novorepnoye bridge with AWM and M416. What do you do?",
      options: [
        { text: "Ram the bridge barricade at top speed using both vehicles", correct: false, reason: "Suicide against an AWM and concentrated spray; your tires will be blown in seconds." },
        { text: "Send one scout with Buggy to bait, then cross bridge right after", correct: false, reason: "Losing your scout leaves you 2v4 with zero bridge progress." },
        { text: "Immediately abandon the bridge, drive to West beach, and swim/boat across under smoke line", correct: true, reason: "Correct! Tier-1 teams avoid known bridge camps. A boat or early swim to the cliff edge secures placement points and avoids zero-point elimination." }
      ]
    },
    {
      id: "dec-2",
      game: "Free Fire",
      scenario: "You are the last surviving player (1v3) in the final safe zone circle in Bermuda. The remaining 3 enemies are grouped behind a two-story wooden house. You have 4 Gloo Walls and an M1887. How do you clutch?",
      options: [
        { text: "Wait in the open until the blue zone pushes everyone", correct: false, reason: "You will be focused by all 3 crosshairs simultaneously." },
        { text: "Drop 2 Nairi/Dimitri gloo walls to split their line of sight, bait out their shotgun shots, then isolate them into three separate 1v1 duels", correct: true, reason: "Correct! Never fight 1v3 directly. Gloo walls are used to partition enemies into isolated 1v1 engagements where your M1887 burst can reset the fight." },
        { text: "Rush into the bottom floor of their house and spray your SMG", correct: false, reason: "Running into a trapped room against 3 players guarantees crossfire death." }
      ]
    },
    {
      id: "dec-3",
      game: "Honor of Kings",
      scenario: "It is 10:30 into the match. Enemy team has 4 players showing in Clash Lane taking your Tier-2 tower. The Shadow Tyrant (major dragon) is currently open on the bottom side of the river. What is your call?",
      options: [
        { text: "All 5 players run top to defend the Tier-2 tower", correct: false, reason: "By the time you walk across the map, the tower will fall and you surrender the Shadow Tyrant for free." },
        { text: "Send 1 wave-clearing hero to stall top while the other 4 instantly burst down the Shadow Tyrant", correct: true, reason: "Correct! An outer tower is worth far less than the game-winning Shadow Tyrant buff. Trading a Tier-2 tower for the Dragon is a huge net victory." },
        { text: "Wait in base until all enemies back off", correct: false, reason: "Passive play allows the enemy team to snowball all objectives and map control." }
      ]
    }
  ],

  underdogMindsetRules: [
    {
      title: "1. The 24-Hour Scrim Rule",
      rule: "Never argue about mistakes during the match. Note timestamps, and do a calm 15-minute VOD review the next day when emotions are cold."
    },
    {
      title: "2. The Re-Frag Commitment",
      rule: "If your teammate gets knocked in an engagement, you have 1.5 seconds to trade-damage or trade-knock. If you hide, their death was completely wasted."
    },
    {
      title: "3. Placement Over Ego",
      rule: "Amateurs chase high kill montages in scrims. Champions calculate placement multipliers. In esports point tables, consistent top 3 placements beat one 10-kill match with four early exits."
    },
    {
      title: "4. Hardware & Ping Equalization",
      rule: "If playing on a 60Hz or mid-range phone against 120Hz iPads, play tactical positioning and long-range utility rather than coin-flip face-to-face desync hipfire."
    }
  ]
};
