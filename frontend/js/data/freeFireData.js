// Free Fire Esports Underdog Data & Masterclasses

export const freeFireData = {
  title: "Free Fire Esports Pro Hub",
  bannerSubtitle: "From Ranked Heroic to FFIC / FFWS Esports World Series Domination",
  accentColor: "#ef4444",
  roles: [
    {
      id: "ff-rusher",
      name: "Frontline Rusher",
      tagline: "Headshot Demons & Space Invaders",
      icon: "zap",
      summary: "Masters lightning-fast gloo wall placement, 1-tap drag headshots with shotgun/SMG, and breaks open enemy compounds.",
      coreDuties: [
        "Master 0.15s sit-down gloo wall deployment immediately following a shot.",
        "Primary user of Shotgun (M1887 / Charge Buster) or SMG (MP40 / Bizon).",
        "Coordinate active ability trigger (Tatsuya dash / Homer drone) to disorient opponents.",
        "Initiate close-range 1v1 duels and instantly call for team trade-kill backup."
      ],
      proTips: [
        "Never run in a straight line towards an enemy holding cover. Use 'Z-zag' sprint with switch-weapon cancellation to bait their first shot, then drag-headshot while they are in shot recovery animation."
      ]
    },
    {
      id: "ff-igl",
      name: "Captain / IGL",
      tagline: "Zone Architect & Safe Zone Rotator",
      icon: "compass",
      summary: "Calculates the high-ground advantage in Bermuda/Purgatory, manages squad utility, and controls circle edge entry.",
      coreDuties: [
        "Select safe drop spots (e.g., Rim Nam Village, Moathouse, Brasilia split).",
        "Monitor blue zone shrinkage speed and enforce 30-second early departure.",
        "Control Gloo Wall economy: Distribute gloo walls so all 4 members have at least 3 walls for Phase 4.",
        "Designate target priority during multi-squad crossfires."
      ],
      proTips: [
        "In Free Fire tournament lobbies, 80% of squads die outside the zone trying to loot late. Prioritize position over a level 3 vest."
      ]
    },
    {
      id: "ff-sniper",
      name: "Sniper / Long-Range Marksman",
      tagline: "Armor Piercer & Knock Finisher",
      icon: "target",
      summary: "Double AWM / M82B master who pierces through enemy gloo walls and prevents opponent revives.",
      coreDuties: [
        "Equip M82B (Barrett) to shoot through gloo walls and hit enemies healing behind them.",
        "Master quick-switch double sniper technique (no reload delay animation).",
        "Maintain high-ground vantage to break vehicle rotations (Monster Truck / Jeep).",
        "Instantly confirm knocks into eliminations to deny Dimitri / Thiva self-revives."
      ],
      proTips: [
        "M82B penetrates gloo walls. When you see an enemy place a gloo wall after taking damage, predict their head behind the center crest and fire immediately for a wall-bang kill."
      ]
    },
    {
      id: "ff-support",
      name: "Support / Medic & Utility",
      tagline: "The Unbreakable Foundation",
      icon: "shield-plus",
      summary: "Equipped with healing characters (Dimitri, Olivia, Nairi) and flash grenades; ensures the squad survives lethal pushes.",
      coreDuties: [
        "Deploys Nairi reinforced gloo walls that heal over time under enemy fire.",
        "Activates Dimitri healing / self-revival aura when teammates get knocked.",
        "Carries Grenade Launcher / Frag Grenades to clear enemy gloo clusters.",
        "Provides smoke grenade cover for open-ground revive attempts."
      ],
      proTips: [
        "Always stack Nairi with gloo walls. If enemy rushers try to spray your wall down with ARs, Nairi restores your gloo HP and recovers your shield."
      ]
    }
  ],

  tactics: [
    {
      id: "fast-sitdown-gloo",
      title: "The 0.15s Sit-Down Gloo Wall Drill",
      category: "Mechanics Masterclass",
      readTime: "4 min read",
      description: "How pro esports rushers deploy defensive cover the exact microsecond they fire a bullet.",
      content: [
        {
          heading: "Why Sit-Down Gloo Wall is Faster",
          text: "When you stand, the gloo wall spawns 2-3 meters forward, often leaving your feet exposed or spawning behind the enemy. Pressing Crouch snaps the gloo placement anchor right against your toes, creating an impenetrable 100% barrier."
        },
        {
          heading: "The 3-Step Execution Sequence",
          text: "1. Fire (Drag Right Fire Button Upwards for headshot) -> 2. Drag Down + Tap Gloo Wall icon with Left Index -> 3. Tap Crouch + Left Fire Button simultaneously. With 15 minutes of daily training grounds drill, this becomes pure muscle memory."
        },
        {
          heading: "The 360-Degree Cage Emergency Move",
          text: "If caught in an open field surrounded by 2 squads: Tap Gloo -> Hold Left Fire Button -> Spin camera 360 degrees using high General Sensitivity. Deploys 3 connected gloo walls forming a bunker."
        }
      ]
    },
    {
      id: "drag-headshot-physics",
      title: "Drag Headshot Mechanics: Straight, Rotation & J-Drag",
      category: "Aim Science",
      readTime: "5 min read",
      description: "Free Fire's auto-aim locks onto the chest. Here is how to break the chest lock and force the crosshair onto the head.",
      content: [
        {
          heading: "1. Straight Up-Drag (Mid-to-Long Range)",
          text: "When the enemy is stationary or running straight at you: Drag the fire button straight upwards with moderate speed. If you drag too fast, bullets fly above their head; if too slow, it sticks to their vest."
        },
        {
          heading: "2. Rotation Drag (Moving Enemies)",
          text: "If the enemy is running left to right: Curve your drag trajectory in an arc matching their sprint vector. If running right, drag down-then-swoop right-upwards."
        },
        {
          heading: "3. J-Drag (Extreme Close Range)",
          text: "When an opponent is within 3 meters: Drag the fire button down slightly to release chest lock, then snap violently upwards in the shape of a 'J'. This produces 100% red numbers with M1887 or Shotguns."
        }
      ]
    },
    {
      id: "character-combos-meta",
      title: "Tier-1 Tournament Character Skill Combos",
      category: "Meta Loadouts",
      readTime: "6 min read",
      description: "Underdogs often run random characters. In competitive FFWS, squad skill combinations must be strictly synchronized.",
      content: [
        {
          heading: "Preset A: The Aggressive Rusher (Tatsuya Core)",
          text: "Active: Tatsuya (Double rapid dash to bypass enemy crosshair) | Passives: Kelly (Awakened speed boost) + Hayato (Awakened armor penetration when HP drops) + Sonia / Luna (Extra fire rate and clutch shield)."
        },
        {
          heading: "Preset B: The Immortal Clutch Defense (Dimitri + Nairi Core)",
          text: "Active: Dimitri (3.5 HP/s self-revival aura) | Passives: Thiva (Instant 1-second revive speed) + Nairi (Gloo walls recover HP and give defense) + Olivia (Extra HP given to revived teammates). A squad with this combo can withstand multiple orbital bombardment strikes."
        },
        {
          heading: "Preset C: The Tactical Anti-Rusher (Homer Disruption)",
          text: "Active: Homer (Releases tracking drone that slows enemy move speed by 60% and fire rate by 35%) | Passives: Moco (Hacker's Eye tags enemies for entire squad) + Maro (Extra damage at long range) + Rafael (Silent sniper & fast bleed-out)."
        }
      ]
    }
  ],

  metaWeapons: [
    {
      name: "M1887 (Double Barrel)",
      tier: "S-Tier (Close Range King)",
      type: "Shotgun",
      verdict: "Highest burst damage in Free Fire. Two clean J-drag shots break any vest and down the enemy in 0.4s.",
      recoilDifficulty: "High (Requires fast switch)",
      esportsUsage: "Mandatory for Rushers"
    },
    {
      name: "MP40 / Bizon",
      tier: "S-Tier (SMG Spray)",
      type: "Submachine Gun",
      verdict: "Insane fire rate that easily converts rotation drag into consecutive headshots.",
      recoilDifficulty: "Low",
      esportsUsage: "Close-to-mid range sweepers"
    },
    {
      name: "M82B (Barrett)",
      tier: "S-Tier (Anti-Gloo Sniper)",
      type: "Sniper Rifle",
      verdict: "The only weapon that penetrates gloo walls and deals 80% damage to vehicles.",
      recoilDifficulty: "Medium",
      esportsUsage: "Designated team sniper"
    },
    {
      name: "Woodpecker / AC80",
      tier: "A-Tier (Armor Piercing DMR)",
      type: "Marksman Rifle",
      verdict: "Every second consecutive hit deals devastating bonus critical damage; one-taps level 2 helmets.",
      recoilDifficulty: "Medium",
      esportsUsage: "Mid-lane support fire"
    }
  ],

  sensitivityPresets: {
    deviceOptions: [
      { id: "ff_low_end", label: "Budget Android (2GB - 4GB RAM)", tag: "High Sensitivity Needed" },
      { id: "ff_mid_high", label: "Mid & Flagship Android (6GB - 12GB RAM)", tag: "Balanced DPI" },
      { id: "ff_iphone", label: "iPhone (iOS High Touch Rate)", tag: "Precision Touch" }
    ],
    presets: {
      "ff_low_end": {
        code: "General: 100 | Red Dot: 98 | 2x: 95 | 4x: 92 | Sniper: 60 | Free Look: 75",
        dpiRecommendation: "Stock DPI (Avoid high DPI on low RAM to prevent thermal throttle & frame drops)",
        description: "Low-end devices have high screen touch resistance; General must be maxed out to 100 to allow smooth upward drag headshots.",
        hudBlueprint: [
          { name: "Right Fire Button", finger: "Right Thumb", x: 78, y: 70, size: 48, opacity: 80 },
          { name: "Gloo Wall", finger: "Left Thumb", x: 18, y: 55, size: 95, opacity: 85 },
          { name: "Crouch", finger: "Right Thumb", x: 74, y: 84, size: 85, opacity: 75 },
          { name: "Jump", finger: "Right Thumb", x: 88, y: 58, size: 85, opacity: 75 },
          { name: "Quick Weapon Switch", finger: "Left Index", x: 30, y: 70, size: 80, opacity: 70 }
        ]
      },
      "ff_mid_high": {
        code: "General: 94 | Red Dot: 88 | 2x: 84 | 4x: 80 | Sniper: 50 | Free Look: 65",
        dpiRecommendation: "480 - 520 DPI (Provides silky 360-spin without crosshair over-jumping)",
        description: "Optimal balance between tight hipfire accuracy and fast 360 gloo deployment.",
        hudBlueprint: [
          { name: "Right Fire Button", finger: "Right Thumb", x: 80, y: 68, size: 44, opacity: 75 },
          { name: "Gloo Wall", finger: "Left Index", x: 16, y: 30, size: 100, opacity: 90 },
          { name: "Crouch", finger: "Right Index", x: 82, y: 28, size: 90, opacity: 80 },
          { name: "Jump", finger: "Right Thumb", x: 90, y: 55, size: 80, opacity: 75 }
        ]
      },
      "ff_iphone": {
        code: "General: 88 | Red Dot: 82 | 2x: 78 | 4x: 74 | Sniper: 45 | Free Look: 60",
        dpiRecommendation: "Default iOS Cursor Speed: 120 (Max Sliding Control)",
        description: "iOS has zero touch delay; lower sensitivity prevents the crosshair from floating over enemy heads.",
        hudBlueprint: [
          { name: "Right Fire Button", finger: "Right Thumb", x: 82, y: 66, size: 42, opacity: 70 },
          { name: "Gloo Wall", finger: "Left Index", x: 18, y: 25, size: 95, opacity: 85 },
          { name: "Crouch", finger: "Right Index", x: 84, y: 25, size: 90, opacity: 75 }
        ]
      }
    }
  }
};
