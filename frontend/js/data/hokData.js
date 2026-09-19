// Honor of Kings (HoK) Esports Underdog Data & Masterclasses

export const hokData = {
  title: "Honor of Kings (HoK) Esports Academy",
  bannerSubtitle: "From King Rank to KIC (Honor of Kings International Championship) Dominance",
  accentColor: "#38bdf8",
  roles: [
    {
      id: "hok-jungle",
      name: "Jungler & Tempo Commander",
      tagline: "The Match Dictator",
      icon: "swords",
      summary: "Controls smite (Punish), clears jungle camps on exact timers, executes 1:30 ganks, and secures Tyrant/Overlord.",
      coreDuties: [
        "Clear all 6 jungle camps within 1:15 to hit Level 4 before lane heroes.",
        "Secure the 2:00 minute Primal Tyrant (Damage Buff) or Overlord (Vanguard wave pressure).",
        "Invade opposing jungle when enemy Jungler shows on the opposite side of the map.",
        "Flank the backline in 5v5 teamfights to assassinate the enemy Farm Lane Marksman."
      ],
      proTips: [
        "Always check enemy jungler's buff at 0:45 with your Roamer. If enemy started Blue Buff, their 1:30 gank WILL hit your Clash Lane. Ping your teammate to retreat early!"
      ]
    },
    {
      id: "hok-roamer",
      name: "Roamer / Support",
      tagline: "The Fog of War Controller",
      icon: "shield",
      summary: "Provides vision in river bushes, assists Mid Lane with fast wave clearing, peels for Marksman, and initiates teamfights.",
      coreDuties: [
        "0:00 - 0:30: Help Mid Lane clear first wave immediately to unlock level 2 roam priority.",
        "Check river bushes before dragon spawns; never face-check without using a probe skill.",
        "Buy Active Support item (e.g., Star Spring / Genesis shield) to counter burst damage.",
        "Body-block skillshots aimed at your squishy Farm Lane marksman."
      ],
      proTips: [
        "Do NOT sit in Farm Lane babysitting your marksman for 10 minutes. A pro Roamer controls the river vision line and prevents enemy ganks before they even enter the lane."
      ]
    },
    {
      id: "hok-mid",
      name: "Mid Lane / Mage",
      tagline: "The Map Pivot & AOE Control",
      icon: "sparkles",
      summary: "Clears middle minion wave in 4 seconds, then rotates to side lanes to create 3v2 or 4v2 numbers advantages.",
      coreDuties: [
        "Clear mid wave rapidly with AOE skills, then immediately vanish into the fog of war.",
        "Control the River Sprite at 1:00 for bonus team gold and XP.",
        "Zone enemy carries away from dragon pits with control spells (stuns, freezes, walls).",
        "Position safely in teamfights behind the frontline tank/roamer."
      ],
      proTips: [
        "Never rotate through the open river if the enemy jungler is missing. Take the safe path behind your own jungle walls to avoid bush ambushes."
      ]
    },
    {
      id: "hok-farm",
      name: "Farm Lane / Marksman",
      tagline: "The Inevitable Late Game Win Condition",
      icon: "crosshair",
      summary: "Farms gold relentlessly, destroys towers, and outputs continuous physical DPS from the safe edge of teamfights.",
      coreDuties: [
        "Focus on last-hitting minions for 50% bonus gold.",
        "Respect the 4-minute mark: Never over-extend past river before the 4-minute tower protection shields drop.",
        "Positioning rule: Hit the closest target in front of you; do NOT dive into the enemy backline.",
        "Keep Flash or Purify ready to react to assassin engage."
      ],
      proTips: [
        "Underdog marksmen throw games by getting caught 1v1 in side lanes at minute 12. Group with your Roamer and stay behind your frontline at all times."
      ]
    },
    {
      id: "hok-clash",
      name: "Clash Lane / Solo Top",
      tagline: "The Unmovable Wall & Split-Push Menace",
      icon: "mountain",
      summary: "Masters 1v1 micro-trading, controls teleportation portals, cuts minion waves, and dives the enemy backline.",
      coreDuties: [
        "Win Level 2 trade: Clear the melee minion first to hit level 2 ahead of opponent.",
        "Use the teleportation flower/portal to instantly flank bottom-lane teamfights.",
        "Split-push side lane towers to force multiple enemies to respond.",
        "In late game teamfights, bypass the enemy tank and pin down the enemy Mid/ADC."
      ],
      proTips: [
        "If you see 4 enemies showing in Farm Lane on the minimap, do not freeze: push your lane aggressively and take the Clash tier-1 tower or steal their top jungle."
      ]
    }
  ],

  tactics: [
    {
      id: "first-4-minutes-macro",
      title: "The First 4 Minutes: Wave Control & Gold Efficiency",
      category: "Macro Strategy",
      readTime: "6 min read",
      description: "How esports teams build a 2,000 gold lead without taking a single coin-flip teamfight.",
      content: [
        {
          heading: "1. The 4-Minute Tower Protection Shield",
          text: "During the first 4:00 minutes, outer towers have a 50% damage reduction shield. Diving under tower is suicide. Focus on last hits, clearing the 1:00 River Sprite, and securing jungle farm instead of forcing early tower dives."
        },
        {
          heading: "2. Freezing vs Bouncing Waves",
          text: "When ahead in lane: Only hit the minion at 5% HP. This keeps the wave near your tower, starving the enemy of gold and forcing them into a vulnerable over-extended position for your Jungler to gank."
        },
        {
          heading: "3. The 2:00 Dragon Decision",
          text: "At 2:00, the first Tyrant and Overlord spawn. Tyrant gives team-wide bonus attack/damage; Overlord spawns dragon vanguards that push minion waves automatically. Pro priority: Take Tyrant if looking to fight; take Overlord if your lanes are being pushed."
        }
      ]
    },
    {
      id: "jungler-pathing-mastery",
      title: "Jungle Pathing: Red Start vs Blue Start & Counter-Invades",
      category: "Jungle Playbook",
      readTime: "7 min read",
      description: "Pathing route optimization to achieve Level 4 and gank before the enemy laner can react.",
      content: [
        {
          heading: "Path A: Red Buff Start (Gank Farm Lane)",
          text: "Order: Red Buff -> Small Bird -> Boar -> Blue Buff -> Wolves -> Lizard. Completes at 1:20 right beside Farm Lane bush. This matches the exact moment enemy Marksman pushes forward for minion trade."
        },
        {
          heading: "Path B: Blue Buff Start (Level 4 CDR Rush)",
          text: "Ideal for mana-hungry / cooldown reliant assassins (e.g., Lam, Nakoruru). Grants 20% CDR early, allowing fast skill cycles to clear entire jungle by 1:12."
        },
        {
          heading: "When to Steal Enemy Buff (Level 1 Invade)",
          text: "If your squad drafts an aggressive Level 1 Roamer (Donghuang, Da Qiao, Zhang Fei): Invade enemy Red Buff as 3 players (Mid, Roamer, Jungler) at 0:35 while the enemy jungler is solo."
        }
      ]
    },
    {
      id: "draft-pick-ban",
      title: "Esports Draft Strategy: Counter-Picks & Team Synergies",
      category: "Draft & Ban Phase",
      readTime: "5 min read",
      description: "Underdog teams often lose in the draft lobby before the match even starts. Here is how to construct a winning 5-man composition.",
      content: [
        {
          heading: "Rule 1: The '3 Core Pillars' Principle",
          text: "Every balanced competitive composition MUST have: 1 hard CC initiator (e.g. Lian Po / Lu Bu), 1 reliable AP burst/control (e.g. Mai Shiranui / Princess Frost), and 1 sustained physical hypercarry (e.g. Luban / Consort Yu)."
        },
        {
          heading: "Rule 2: Ban Counters, Not Just Pub-Stompers",
          text: "Amateurs ban flashy heroes like Li Bai. Pros ban enablers like Da Qiao (who can teleport entire teams across the map) or Dolia (who refreshes ultimate cooldowns instantly)."
        },
        {
          heading: "Rule 3: Cleanse vs Flash Adaptation",
          text: "If the enemy team drafts 3+ hard stuns (e.g., Liang, Daji, Zhang Fei), your Marksman MUST take Purify (Cleanse), not Flash. Staying alive through the initial stun is worth 10x more than an escape blink."
        }
      ]
    }
  ],

  metaHeroes: [
    {
      name: "Lam (Assassin / Jungle)",
      tier: "S+ Tier (Tournament Permaban)",
      role: "Jungle",
      verdict: "Insane dive speed in river swimming form. Skill 2 multi-dash deals continuous burst damage and provides untargetable invulnerability frames.",
      coreBuild: "Boots of Resistance, Axe of Torment, Master Sword, Pure Sky, Cuirass of Savagery, Siegebreaker",
      counterTip: "Pick heavy hard-suppression heroes like Donghuang or Liang; Lam cannot dive while suppressed."
    },
    {
      name: "Consort Yu (Marksman / Farm)",
      tier: "S Tier (Anti-Assassin Carry)",
      role: "Farm Lane",
      verdict: "Skill 2 grants physical damage immunity and movement speed boost, making her virtually unkillable against AD assassins like Wukong or Nakoruru.",
      coreBuild: "Boots of Dexterity, Shadow Ripper, Infinity Blade, Bloodweeper, Daybreaker, Sage's Sanctuary",
      counterTip: "Burst her down with high magical damage mages before her immunity can matter."
    },
    {
      name: "Mai Shiranui (Mage / Mid)",
      tier: "S Tier (High Mobility Playmaker)",
      role: "Mid Lane",
      verdict: "High-burst poke fan with zero mana costs. Chained knock-ups and dash combos can 100-to-0 multiple squishies in a single flank.",
      coreBuild: "Boots of the Arcane, Mask of Agony, Savant's Wrath, Void Staff, Tome of Wisdom, Splendor",
      counterTip: "Build Boots of Resistance early to reduce stun duration."
    },
    {
      name: "Dun (Tank / Clash / Support)",
      tier: "A+ Tier (Unyielding Frontline)",
      role: "Clash Lane / Roamer",
      verdict: "Passive restores 4% max HP per hit when under 50% health. Has true damage, shields, and low-cooldown AOE airborne stun.",
      coreBuild: "Boots of Resistance, Blazing Cape, Succubus Cloak, Ominous Premonition, Eye of the Phoenix, Overlord's Platemail",
      counterTip: "Requires percentage HP true-damage heroes (like Marco Polo or Lu Bu) to melt his massive health pool."
    }
  ]
};
