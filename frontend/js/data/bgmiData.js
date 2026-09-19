// BGMI & PUBG Mobile Esports Underdog Data & Masterclasses

export const bgmiData = {
  title: "BGMI / PUBG Mobile Esports",
  bannerSubtitle: "From T3 Discord Scrims to BGIS / BGMS Tier-1 Lobby Domination",
  accentColor: "#f59e0b",
  roles: [
    {
      id: "igl",
      name: "In-Game Leader (IGL)",
      tagline: "The Brain of the Roster",
      icon: "crown",
      summary: "Responsible for circle prediction, compound pathfinding, split calls, and high-pressure endgame rotations.",
      coreDuties: [
        "Track flight path and predict enemy drop clusters (School/Pochinki/Novorepnoye).",
        "Phase 1 & 2: Secure 3-4 vehicles (Dacia/Buggy) early and establish split scouting.",
        "Phase 4 Shift Read: Determine whether to play edge compound or hard crash center dip.",
        "Endgame Smoke Lines: Dictate micro-smokes and crosshair focus during Phase 6/7 pinches."
      ],
      proTips: [
        "Never crash a blind compound without a Buggy scout doing a drive-by audio check.",
        "Always calculate the 'Weak Side' of the zone — the side with the water or blue zone that eliminates flankers."
      ]
    },
    {
      id: "entry-fragger",
      name: "Entry Fragger / Rusher",
      tagline: "The First Bullet & Space Creator",
      icon: "crosshair",
      summary: "The spearhead who opens knocks, masters close-quarters desync peeking, and breaches enemy compounds.",
      coreDuties: [
        "First person to breach stairs/doors with pre-firing and jiggle movement.",
        "Master the DBS / UMP45 / M416 switch in under 0.3 seconds.",
        "Call knock locations instantly ('One knocked on top balcony, low HP!').",
        "Control crosshair placement at head height around every corner."
      ],
      proTips: [
        "Don't commit to a 50/50 open aim duel if you don't have hard cover within one slide/crouch step.",
        "Master crouch-spam + hipfire spray: keeps your head hitbox shifting while maintaining 70%+ bullet spread density."
      ]
    },
    {
      id: "support-anchor",
      name: "Support & Anchor",
      tagline: "The Lifeline & Utility Specialist",
      icon: "shield",
      summary: "Controls grenades, smokes, and health economy. Provides immediate trade-knocks when the entry pushes.",
      coreDuties: [
        "Carry 5-6 Smokes and 3-4 Frag Grenades minimum per match.",
        "Cook grenades to 1.5 - 2.0 seconds before impact for zero-reaction airbursts.",
        "Provide suppressive DMR/AR fire to pin enemies while entry fraggers close the distance.",
        "Guard the team's rear and vehicles from third-party backstabs."
      ],
      proTips: [
        "Underdogs die to third parties because nobody watches the back. An anchor's eyes are always on the blue zone edge.",
        "Use molotovs not for damage, but to deny cover (force players out of small shacks or stairs)."
      ]
    },
    {
      id: "scout-sniper",
      name: "Scout / Long-Range DMR",
      tagline: "Vision & Intel Gatherer",
      icon: "eye",
      summary: "Pushes ahead in a high-speed vehicle to secure vision hills and tags enemies with Mini14/SLR.",
      coreDuties: [
        "Fast-drive Buggy to survey high ridge positions before team convoy commits.",
        "Continuous kill feed tracking: Note which squads are fighting and who is losing players.",
        "Apply long-range pressure with 6x Mini14 / SLR to drain enemy helmet/vest durability and heals.",
        "Mark safe vehicle parking spots inside compounds that shield tires from bullet poke."
      ],
      proTips: [
        "If you spot a team rotating, do not shoot immediately if you can't knock them. Intel is worth more than a 30-damage poke."
      ]
    }
  ],

  tactics: [
    {
      id: "hard-soft-shifts",
      title: "Hard Shifts vs Soft Shifts: How Underdogs Win Rotations",
      category: "Macro & Zone Prediction",
      readTime: "6 min read",
      description: "Amateur teams panic when the zone hard-shifts across the river or opposite mountain. Here is the tier-1 decision framework.",
      content: [
        {
          heading: "1. The 70/30 Land vs Water Rule",
          text: "When the zone circle includes river or sea (e.g., Georgopol river or Military Island channel), the next shift almost ALWAYS pulls towards the landmass that holds >60% of the circle area. Don't gamble on islands unless land is completely blocked."
        },
        {
          heading: "2. The 'Water City / Rozhok' River Dilemma",
          text: "If Erangel circle shifts south across the river, NEVER take the open metal bridge in Phase 3 or later — Tier-2 and Tier-1 teams set up crossfire ambushes. Instead: Send a scout with buggy to cross the sunken town shallow water, or commit to a full squad vehicle drive through the western lip before chokeholds form."
        },
        {
          heading: "3. Center Compound vs Edge Play",
          text: "If you have 4 vehicles and full armor at Phase 2, crash the dead center compound immediately. Even if surrounded, a two-story house grants 360-degree vision and guarantees Phase 4 placement points. If low on heals or vehicles, play the 'Slow Edge' trailing the blue zone."
        }
      ]
    },
    {
      id: "compound-crash-mastery",
      title: "The 4-Second Compound Breach Protocol",
      category: "Combat Execution",
      readTime: "5 min read",
      description: "How to crash a fortified enemy squad house without losing members to staircase sprays.",
      content: [
        {
          heading: "Step 1: The Vehicle Wall-Crash",
          text: "Never park directly in front of the door. Ram the Dacia or UAZ perpendicularly against the compound wall to create instant external head-glitch cover and block ground-floor window sightlines."
        },
        {
          heading: "Step 2: Utility Cross-Bombardment",
          text: "Do NOT run up the stairs immediately. Anchor cooks grenade for 2 seconds into the main top-floor bedroom window; Rusher banks a stun or molotov off the staircase ceiling. Wait for the explosion sound or burning ticks before stepping onto the staircase."
        },
        {
          heading: "Step 3: The 2-Man Synchronized Pinch",
          text: "Never push single file. Player 1 (Entry) jumps and pre-fires the corner; Player 2 stays 1.5 meters behind aiming upper torso. If Player 1 gets knocked, Player 2 instantly finishes the enemy before they can re-chamber or retreat."
        }
      ]
    },
    {
      id: "recoil-gyro-mechanics",
      title: "Recoil & Gyroscope Calibration Masterclass",
      category: "Mechanics",
      readTime: "7 min read",
      description: "Stop pulling your screen down with your thumb. Switch to full Gyroscope for laser sprays at 150m+.",
      content: [
        {
          heading: "Why Full Gyroscope is Mandatory for Esports",
          text: "Thumb dragging reaches a physical limit when spraying a 40-round M416 clip. Gyroscope uses phone tilt, leaving your right thumb completely free to crouch, jump, lean, and switch targets instantaneously."
        },
        {
          heading: "The 3x / 6x Scope Down-Step Technique",
          text: "Pros rarely spray with a raw 6x scope. Mount a 6x scope on an M416 or AUG, open scope settings, and dial the slider down to 3x zoom. This retains the clean, thin reticle of the 6x while utilizing the ultra-stable recoil pattern of the 3x scope."
        },
        {
          heading: "Attachment Hierarchy for Scrims",
          text: "Muzzle: Compensator > Flash Hider > Suppressor (Suppressor increases horizontal shake!). Grip: Ergonomic / Half Grip for sprays; Angled Foregrip for fast ADS; Vertical Foregrip if you struggle with pulling down."
        }
      ]
    }
  ],

  metaWeapons: [
    {
      name: "M416 + 6x (Adjusted to 3x)",
      tier: "S-Tier (Esports Staple)",
      type: "Assault Rifle (5.56mm)",
      verdict: "The absolute baseline for mid-to-long range vehicle spray tracking. Zero erratic horizontal bloom when equipped with Compensator & Half Grip.",
      recoilDifficulty: "Medium",
      esportsUsage: "96% of competitive rosters"
    },
    {
      name: "UMP45 / Thompson",
      tier: "S-Tier (Close-Quarter Meta)",
      type: "SMG (.45 ACP)",
      verdict: "Out-damages 5.56 ARs at 0-15 meters due to limb damage multipliers and virtually nonexistent hipfire spread during aggressive jiggling.",
      recoilDifficulty: "Very Easy",
      esportsUsage: "Entry Fraggers & House Breachers"
    },
    {
      name: "DBS Shotgun",
      tier: "S-Tier (Compound Defense)",
      type: "Double-Barrel Pump Shotgun",
      verdict: "Two quick pumps wipe out level 3 armor instantly at doorway distance. Lethal when holding staircase angles.",
      recoilDifficulty: "Easy (Crosshair reliant)",
      esportsUsage: "Staircase defense & tight rooms"
    },
    {
      name: "Mini14 / SLR",
      tier: "A-Tier (DMR Long Poke)",
      type: "Designated Marksman Rifle",
      verdict: "Essential for poking rotating vehicles and farming placement damage. Mini14 has highest bullet velocity (less bullet drop prediction needed).",
      recoilDifficulty: "Medium-High",
      esportsUsage: "Scouts & Support players"
    }
  ],

  sensitivityPresets: {
    deviceOptions: [
      { id: "android_budget", label: "Android Budget (60 FPS / 120Hz Touch)", tag: "Smooth 60" },
      { id: "android_flagship", label: "Android Flagship / ROG (90/120 FPS)", tag: "Ultra 90/120" },
      { id: "iphone", label: "iPhone 13/14/15/16 Pro (ProMotion)", tag: "iOS Ultra" },
      { id: "ipad", label: "iPad Pro / Mini 6 (Tablet Aspect)", tag: "iPad Screen" }
    ],
    gripStyles: [
      { id: "claw_4_gyro", label: "4-Finger Claw + Full Gyro (Pro Standard)", recommended: true },
      { id: "claw_3_gyro", label: "3-Finger Claw + Gyro", recommended: false },
      { id: "thumb_2_gyro", label: "2-Finger Thumbs + Gyro", recommended: false }
    ],
    presets: {
      "android_flagship_claw_4_gyro": {
        code: "7234-8910-4412-5890-321",
        description: "Aggressive close-range jiggle combined with laser-like 150m M416 3x spray control for 90/120 FPS phones.",
        camera: { tpp_no_scope: 120, fpp_no_scope: 110, red_dot: 55, scope_2x: 38, scope_3x: 28, scope_4x: 20, scope_6x: 14, scope_8x: 10 },
        ads: { tpp_no_scope: 115, fpp_no_scope: 105, red_dot: 52, scope_2x: 35, scope_3x: 27, scope_4x: 18, scope_6x: 12, scope_8x: 9 },
        gyro: { tpp_no_scope: 380, fpp_no_scope: 360, red_dot: 375, scope_2x: 350, scope_3x: 285, scope_4x: 215, scope_6x: 140, scope_8x: 85 },
        hudBlueprint: [
          { name: "Fire Button 1", finger: "Left Index", x: 12, y: 22, size: 140, opacity: 70 },
          { name: "Crouch", finger: "Right Index", x: 86, y: 24, size: 130, opacity: 75 },
          { name: "Jump/Climb", finger: "Right Index", x: 88, y: 42, size: 120, opacity: 70 },
          { name: "Scope Open", finger: "Right Thumb", x: 82, y: 72, size: 135, opacity: 80 },
          { name: "Left/Right Peek", finger: "Right Index", x: 74, y: 26, size: 125, opacity: 85 },
          { name: "Movement Joystick", finger: "Left Thumb", x: 18, y: 75, size: 85, opacity: 60 }
        ]
      },
      "iphone_claw_4_gyro": {
        code: "7199-5501-3829-1093-442",
        description: "Calibrated for iOS touch responsiveness with ultra-crisp micro-adjustments for Gyroscope.",
        camera: { tpp_no_scope: 115, fpp_no_scope: 105, red_dot: 50, scope_2x: 35, scope_3x: 25, scope_4x: 18, scope_6x: 12, scope_8x: 8 },
        ads: { tpp_no_scope: 110, fpp_no_scope: 100, red_dot: 48, scope_2x: 33, scope_3x: 24, scope_4x: 16, scope_6x: 11, scope_8x: 8 },
        gyro: { tpp_no_scope: 395, fpp_no_scope: 380, red_dot: 390, scope_2x: 360, scope_3x: 310, scope_4x: 230, scope_6x: 155, scope_8x: 95 },
        hudBlueprint: [
          { name: "Fire Button 1", finger: "Left Index", x: 14, y: 20, size: 145, opacity: 65 },
          { name: "Crouch", finger: "Right Index", x: 85, y: 22, size: 135, opacity: 70 },
          { name: "Prone", finger: "Right Index", x: 92, y: 18, size: 110, opacity: 60 },
          { name: "Scope Open", finger: "Right Thumb", x: 80, y: 70, size: 140, opacity: 75 },
          { name: "Movement Joystick", finger: "Left Thumb", x: 16, y: 72, size: 80, opacity: 55 }
        ]
      }
    }
  }
};
