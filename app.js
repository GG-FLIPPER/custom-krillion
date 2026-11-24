// Shrimpion — The Daily Trivia Dive & Unlimited Oceans
(function () {
  'use strict';

  // --- Tier Definitions & Scoring ---
  const TIERS = {
    plankton: { id: 'plankton', name: 'Plankton', score: 10, meters: 100, emoji: '🫧', color: 'var(--tier-plankton)', blurb: 'The answer everyone blurts out.' },
    tooclever: { id: 'tooclever', name: 'Too Clever', score: 15, meters: 150, emoji: '🤡', color: 'var(--tier-tooclever)', blurb: 'A famously “obscure” pick. Everyone reaches for it.' },
    schooler: { id: 'schooler', name: 'Schooler', score: 30, meters: 300, emoji: '🐟', color: 'var(--tier-schooler)', blurb: 'Solid — swims with the school.' },
    rare: { id: 'rare', name: 'Rare', score: 60, meters: 600, emoji: '🦑', color: 'var(--tier-rare)', blurb: 'Genuinely uncommon. Nice pull.' },
    deepcut: { id: 'deepcut', name: 'Deep Cut', score: 85, meters: 850, emoji: '🏮', color: 'var(--tier-deepcut)', blurb: 'True obscurity. Few go this deep.' },
    shrimpion: { id: 'shrimpion', name: 'One in a Shrimpion', score: 100, meters: 1000, emoji: '🌟', color: 'var(--tier-krillion)', blurb: 'The designated gem. Trench floor.' }
  };

  const TIER_IDS = ['plankton', 'tooclever', 'schooler', 'rare', 'deepcut', 'shrimpion'];
  const REACTION_ASSET_KEYS = ['plankton', 'tooclever', 'schooler', 'rare', 'deepcut', 'shrimpion', 'miss'];
  const REACTION_ASSET_META = {
    plankton: { label: 'Plankton', description: 'Common answer' },
    tooclever: { label: 'Too Clever', description: 'Disappointed face' },
    schooler: { label: 'Schooler', description: 'Happy face' },
    rare: { label: 'Rare', description: 'Uncommon answer' },
    deepcut: { label: 'Deep Cut', description: 'Impressed face' },
    shrimpion: { label: 'One in a Shrimpion', description: 'Perfect answer' },
    miss: { label: 'Skipped / Missed', description: 'Angry face' }
  };

  const TIER_COLORS = {
    plankton: '#8fa3c4',
    tooclever: '#ff9f43',
    schooler: '#4de3ff',
    rare: '#ff5252',
    deepcut: '#9d7bff',
    shrimpion: '#ffd166',
    miss: '#3d4f6e'
  };

  const SCORE_BANDS = [
    { min: 0, tier: 'plankton', range: '0–150', verdict: 'Plankton. Plenty of ocean left down there.' },
    { min: 151, tier: 'schooler', range: '151–250', verdict: 'Schooler. Swimming with the school.' },
    { min: 251, tier: 'rare', range: '251–350', verdict: 'Rare. Below the thermocline. Nice.' },
    { min: 351, tier: 'deepcut', range: '351–449', verdict: 'Deep cut. Seriously deep dive.' },
    { min: 450, tier: 'shrimpion', range: '450+', verdict: 'One in a shrimpion. Trench dweller. Absurd.' }
  ];

  const AMBIENT_OCEAN = [
    [60, 'light begins to fade', 'L'],
    [200, 'most sunlight stops here', 'R'],
    [332, 'deepest scuba dive ever — 332m', 'R'],
    [385, 'sperm whales hunt below here', 'L'],
    [535, 'emperor penguins dive this deep', 'R'],
    [660, 'pressure: 67x the surface', 'L'],
    [800, 'siphonophore drift zone', 'R'],
    [1040, 'THE MIDNIGHT ZONE', 'L', true],
    [1240, 'anglerfish territory', 'R'],
    [1550, 'sperm whales duel giant squid here', 'L'],
    [1850, 'giant squid territory', 'R'],
    [2150, 'colossal squid eyes: football-sized', 'L'],
    [2500, 'the water is 2°C and utterly black', 'R'],
    [3000, 'THE ABYSSAL ZONE', 'L', true],
    [3800, 'the Titanic rests here — 3,800m', 'R'],
    [4400, 'cusk eels patrol the plain', 'L'],
    [4900, 'the abyssal plain stretches out', 'R'],
    [5500, 'deeper than most submarines survive', 'L'],
    [6000, 'THE HADAL ZONE', 'R', true],
    [6500, 'named for Hades. fitting.', 'L'],
    [7000, 'the trench floor — a perfect dive ends here', 'R', true]
  ];

  const AMBIENT_CINEMA = [
    [80, 'Sunset Boulevard — neon palms at twilight', 'L'],
    [250, 'Walk of Fame — 2,700 brass stars embedded', 'R'],
    [450, 'Paramount Studios — historic double arched gates', 'L'],
    [700, 'Rodeo Drive — luxury beneath neon palm trees', 'R'],
    [1040, 'THE MIDNIGHT SCREENING', 'L', true],
    [1400, 'Griffith Observatory — city lights twinkling below', 'R'],
    [2000, 'Mulholland Drive — winding above the canyon', 'L'],
    [3000, 'THE GOLDEN AGE STUDIOS', 'L', true],
    [3800, 'Grauman’s Chinese Theatre — cement footprints of legends', 'R'],
    [4800, 'Cinerama Dome — geodesic marvel of 1963', 'L'],
    [5800, 'The Hollywood Sign — glowing high on Mount Lee', 'R', true],
    [7000, 'Academy Stage — red carpet walk of champions', 'R', true]
  ];

  const OCEAN_STOPS = [
    [0, '#1d5580'],
    [150, '#123a5e'],
    [350, '#0b1526'],
    [800, '#081020'],
    [1400, '#050a14'],
    [2600, '#03070f'],
    [5200, '#02050b']
  ];

  const CINEMA_STOPS = [
    [0, '#d136a8'],
    [150, '#ae26a8'],
    [350, '#8a1d9c'],
    [800, '#681788'],
    [1400, '#681788'],
    [2600, '#681788'],
    [5200, '#681788']
  ];

  const AMBIENT_TREK = [
    [80, 'The Trailhead — strapping on boots at the valley base', 'L'],
    [250, 'Pine Forest — scent of pine needles along the switchbacks', 'R'],
    [450, 'Babbling Cascade — crystal meltwater rushing over granite', 'L'],
    [700, 'The Treeline — trees thin as cold mountain wind arrives', 'R'],
    [1040, 'ALPINE BASE CAMP', 'L', true],
    [1400, 'Glacial Cirque — ancient amphitheater carved by ice', 'R'],
    [2000, 'Turquoise Tarn — mirror lake reflecting soaring cliffs', 'L'],
    [3000, 'THE CONTINENTAL DIVIDE', 'L', true],
    [3800, 'Granite Col — sheer drop-offs into neighboring valleys', 'R'],
    [4800, 'Scree Slope — navigating sharp loose shale near the sky', 'L'],
    [5800, 'The Ridge Spine — razor edge between two cloud banks', 'R', true],
    [7000, 'The Summit Cairn — prayer flags fluttering on the highest peak', 'R', true]
  ];

  const TREK_STOPS = [
    [0, '#2d6a4f'],
    [150, '#1b4332'],
    [350, '#081c15'],
    [800, '#1c2541'],
    [1400, '#0b132b'],
    [2600, '#1d2d44'],
    [5200, '#0d1b2a']
  ];

  const BUDDIES = [
    { id: 'shrimp', name: 'Riff the Shrimp', alt: 'detailed shrimp buddy', color: '#ff5d8f', blub: 'blub!', poke: 'roll', pokeMs: 950, unlockStreak: 0, desc: 'Detailed, quick, and ready to dive.' },
    { id: 'schooler', name: 'Finn Schooler', alt: 'schooler fish buddy', color: '#4de3ff', blub: 'glub!', poke: 'dart', pokeMs: 900, unlockStreak: 5, desc: 'Solid swimmer with the crowd.' },
    { id: 'rare', name: 'Inky Squid', alt: 'rare squid buddy', color: '#ff5252', blub: 'blorp!', poke: 'jet', pokeMs: 1050, unlockStreak: 14, desc: 'Uncommon sightings below the light.' },
    { id: 'deepcut', name: 'Deep Cut Angler', alt: 'deep cut angler buddy', color: '#9d7bff', blub: 'chomp!', poke: 'chomp', pokeMs: 950, unlockStreak: 30, desc: 'True abyss navigator.' },
    { id: 'golden', name: 'Empress Shrimpion', alt: 'crowned golden shrimpion buddy', color: '#ffd166', blub: 'mwahaha!', poke: 'roll', pokeMs: 950, unlockStreak: 45, desc: 'Master of the 7,000m trench.' }
  ];

  // --- Highly Detailed Pixel-Art SVG Sprites ---
  function getTierSvg(tierId) {
    switch (tierId) {
      case 'plankton':
        return `<svg viewBox="0 0 20 20" shape-rendering="crispEdges" fill="currentColor"><rect x="7" y="3" width="6" height="2"/><rect x="5" y="5" width="2" height="2"/><rect x="13" y="5" width="2" height="2"/><rect x="3" y="7" width="2" height="6"/><rect x="15" y="7" width="2" height="6"/><rect x="5" y="13" width="2" height="2"/><rect x="13" y="13" width="2" height="2"/><rect x="7" y="15" width="6" height="2"/><rect x="6" y="7" width="3" height="3" fill="#ffffff" opacity="0.8"/></svg>`;
      case 'tooclever':
        return `<svg viewBox="0 0 20 20" shape-rendering="crispEdges" fill="currentColor"><rect x="6" y="2" width="8" height="2"/><rect x="4" y="4" width="12" height="2"/><rect x="3" y="6" width="14" height="8"/><rect x="5" y="8" width="2" height="2" fill="#050a14"/><rect x="13" y="8" width="2" height="2" fill="#050a14"/><rect x="9" y="10" width="2" height="2" fill="#ff5d8f"/><rect x="6" y="12" width="8" height="2" fill="#050a14"/><rect x="4" y="14" width="12" height="2"/><rect x="6" y="16" width="8" height="2"/></svg>`;
      case 'schooler':
        return `<svg viewBox="0 0 20 20" shape-rendering="crispEdges" fill="currentColor"><rect x="4" y="8" width="10" height="4"/><rect x="6" y="6" width="6" height="2"/><rect x="6" y="12" width="6" height="2"/><rect x="14" y="7" width="2" height="6"/><rect x="16" y="6" width="2" height="8"/><rect x="18" y="5" width="2" height="10"/><rect x="6" y="9" width="2" height="2" fill="#050a14"/><rect x="2" y="9" width="2" height="2"/></svg>`;
      case 'rare':
        return `<svg viewBox="0 0 20 20" shape-rendering="crispEdges" fill="currentColor"><rect x="7" y="2" width="6" height="2"/><rect x="5" y="4" width="10" height="6"/><rect x="6" y="6" width="2" height="2" fill="#050a14"/><rect x="12" y="6" width="2" height="2" fill="#050a14"/><rect x="4" y="10" width="12" height="3"/><rect x="4" y="13" width="2" height="5"/><rect x="7" y="13" width="2" height="6"/><rect x="11" y="13" width="2" height="6"/><rect x="14" y="13" width="2" height="5"/></svg>`;
      case 'deepcut':
        return `<svg viewBox="0 0 20 20" shape-rendering="crispEdges" fill="currentColor"><rect x="11" y="1" width="2" height="2" fill="#ffd166"/><rect x="13" y="2" width="2" height="3"/><rect x="11" y="4" width="2" height="2"/><rect x="5" y="6" width="10" height="8"/><rect x="3" y="8" width="2" height="4"/><rect x="1" y="7" width="2" height="6"/><rect x="13" y="8" width="2" height="2" fill="#ffffff"/><rect x="9" y="12" width="6" height="2" fill="#050a14"/><rect x="10" y="11" width="1" height="2" fill="#ffffff"/><rect x="12" y="11" width="1" height="2" fill="#ffffff"/><rect x="14" y="11" width="1" height="2" fill="#ffffff"/></svg>`;
      case 'shrimpion':
        return `<svg viewBox="0 0 20 20" shape-rendering="crispEdges" fill="currentColor"><rect x="9" y="1" width="2" height="2" fill="#ffeaa7"/><rect x="6" y="2" width="2" height="2" fill="#ffeaa7"/><rect x="12" y="2" width="2" height="2" fill="#ffeaa7"/><rect x="7" y="4" width="6" height="2"/><rect x="5" y="6" width="10" height="3"/><rect x="12" y="7" width="2" height="2" fill="#050a14"/><rect x="3" y="9" width="13" height="3"/><rect x="2" y="12" width="12" height="2"/><rect x="1" y="14" width="8" height="2"/><rect x="2" y="16" width="4" height="2"/><rect x="14" y="12" width="2" height="4"/><rect x="16" y="14" width="3" height="2"/><rect x="16" y="5" width="4" height="1" fill="#ffeaa7"/></svg>`;
      default:
        return `<svg viewBox="0 0 20 20" shape-rendering="crispEdges" fill="currentColor"><rect x="4" y="4" width="12" height="12"/></svg>`;
    }
  }

  function isSafeReactionAsset(value) {
    return typeof value === 'string'
      && value.length <= 3_000_000
      && /^data:image\/(?:png|jpeg|gif|webp);base64,/i.test(value);
  }

  function sanitizeReactionAssets(value) {
    if (!value || typeof value !== 'object') return {};
    return Object.fromEntries(
      REACTION_ASSET_KEYS
        .filter((key) => isSafeReactionAsset(value[key]))
        .map((key) => [key, value[key]])
    );
  }

  function getReactionAssetHtml(tierId) {
    const key = tierId || 'miss';
    const asset = store.reactionAssets && store.reactionAssets[key];
    if (isSafeReactionAsset(asset)) {
      const label = REACTION_ASSET_META[key]?.label || 'Reaction';
      return `<img class="reaction-asset" src="${asset}" alt="${label} reaction" />`;
    }
    if (key === 'miss') {
      return '<svg viewBox="0 0 20 20" shape-rendering="crispEdges" fill="currentColor"><rect x="4" y="4" width="12" height="12"/><rect x="6" y="7" width="2" height="2" fill="#050a14"/><rect x="12" y="7" width="2" height="2" fill="#050a14"/><rect x="7" y="13" width="6" height="2" fill="#050a14"/></svg>';
    }
    return getTierSvg(key === 'miss' ? 'plankton' : key);
  }

  // Smaller, High-Detail Pixel Mascot Shrimp
  function getBuddySvg(buddyId, isGold = false, isCinema = false, isTrek = false) {
    if (isTrek && (buddyId === 'shrimp' || buddyId === 'golden')) {
      // Expedition Hiker Shrimp: backpack with sleeping roll, hiking boots, trekking pole & expedition beanie
      const main = isGold ? '#ffd166' : '#ff5d8f';
      const shadow = isGold ? '#c99a2e' : '#d6336c';
      const highlight = isGold ? '#fff3b0' : '#ffa8be';
      return `<svg viewBox="0 0 40 32" shape-rendering="crispEdges">
        <!-- Bedroll on top of pack -->
        <rect x="5" y="6" width="9" height="3" fill="#ffd166"/>
        <rect x="6" y="5" width="7" height="1" fill="#fff3b0"/>
        <!-- Rugged Expedition Hiker Backpack -->
        <rect x="4" y="9" width="10" height="12" fill="#386641"/>
        <rect x="3" y="11" width="2" height="8" fill="#1b4332"/>
        <rect x="6" y="12" width="6" height="4" fill="#6a994e"/>
        <rect x="5" y="18" width="8" height="2" fill="#7f5539"/>
        <!-- Trekking Walking Stick / Pole -->
        <rect x="31" y="8" width="2" height="21" fill="#ced4da"/>
        <rect x="30" y="7" width="4" height="3" fill="#495057"/>
        <rect x="29" y="10" width="3" height="2" fill="#adb5bd"/>
        <!-- Woolly Hiker Beanie Hat with Pom-pom -->
        <rect x="23" y="2" width="3" height="2" fill="#ffffff"/>
        <rect x="20" y="4" width="9" height="3" fill="#e76f51"/>
        <rect x="19" y="6" width="11" height="2" fill="#f4a261"/>
        <!-- Tail Fan & Pleopods -->
        <rect x="1" y="16" width="3" height="2" fill="${main}"/>
        <rect x="2" y="14" width="2" height="6" fill="${main}"/>
        <!-- Shrimp Curled Carapace -->
        <rect x="14" y="8" width="11" height="5" fill="${main}"/>
        <rect x="13" y="9" width="13" height="6" fill="${main}"/>
        <rect x="12" y="12" width="15" height="4" fill="${main}"/>
        <rect x="15" y="7" width="9" height="1" fill="${highlight}"/>
        <rect x="11" y="15" width="16" height="3" fill="${shadow}"/>
        <!-- Friendly Eye with mountain gleam -->
        <rect x="25" y="9" width="4" height="4" fill="#0b132b"/>
        <rect x="26" y="9" width="2" height="2" fill="#ffffff"/>
        <rect x="24" y="12" width="2" height="1" fill="#e76f51"/>
        <!-- Hiker Hiking Boots -->
        <rect x="15" y="24" width="6" height="5" fill="#582f0e"/>
        <rect x="14" y="27" width="8" height="3" fill="#331800"/>
        <rect x="24" y="24" width="6" height="5" fill="#582f0e"/>
        <rect x="23" y="27" width="8" height="3" fill="#331800"/>
        <!-- Boot Laces (yellow alpine laces) -->
        <rect x="17" y="25" width="2" height="1" fill="#ffd166"/>
        <rect x="26" y="25" width="2" height="1" fill="#ffd166"/>
      </svg>`;
    }
    if (isCinema && (buddyId === 'shrimp' || buddyId === 'golden')) {
      // Shrimp cruising in a retro convertible red roadster through LA (wheels grounded at y=20..27)
      return `<svg viewBox="0 0 48 28" shape-rendering="crispEdges">
        <!-- Floating Gold Silk Scarf waving in wind -->
        <rect x="13" y="10" width="6" height="2" fill="#ffd166"/>
        <rect x="7" y="9" width="7" height="2" fill="#ffd166"/>
        <rect x="3" y="8" width="5" height="2" fill="#ffeaa7"/>
        <rect x="1" y="10" width="3" height="1" fill="#e5b842"/>

        <!-- Shrimp driver with aviator shades -->
        <rect x="18" y="4" width="2" height="1" fill="#ffd2a0"/>
        <rect x="15" y="5" width="3" height="1" fill="#ffd2a0"/>
        <rect x="20" y="7" width="7" height="7" fill="${isGold ? '#ffd166' : '#ff5d8f'}"/>
        <rect x="21" y="7" width="5" height="1" fill="${isGold ? '#fff8d6' : '#ffa8be'}"/>
        <rect x="26" y="8" width="2" height="1" fill="${isGold ? '#fff8d6' : '#ffa8be'}"/>
        <!-- Cheek blush -->
        <rect x="25" y="11" width="1" height="1" fill="${isGold ? '#e5b842' : '#ff3366'}"/>
        <!-- Aviator sunglasses with cyan reflection -->
        <rect x="23" y="8" width="5" height="3" fill="#050a14"/>
        <rect x="24" y="8" width="2" height="1" fill="#4de3ff"/>
        <rect x="22" y="9" width="1" height="1" fill="#050a14"/>

        <!-- Steering Wheel & Curved Windshield -->
        <rect x="29" y="10" width="1" height="5" fill="#a0aab8"/>
        <rect x="27" y="12" width="3" height="1" fill="#505a6e"/>
        <rect x="29" y="7" width="1" height="8" fill="rgba(77, 227, 255, 0.78)"/>
        <rect x="30" y="8" width="1" height="7" fill="rgba(255, 255, 255, 0.88)"/>

        <!-- Car Body (Cherry Red Classic Hollywood Convertible) -->
        <rect x="6" y="14" width="36" height="7" fill="#e82c4e"/>
        <rect x="4" y="12" width="6" height="4" fill="#e82c4e"/>
        <rect x="3" y="11" width="4" height="2" fill="#ff6b85"/>
        <rect x="10" y="13" width="20" height="1" fill="#ff6b85"/>
        <rect x="30" y="14" width="12" height="4" fill="#ff4d6d"/>
        <rect x="41" y="16" width="3" height="5" fill="#c41a37"/>
        <rect x="5" y="15" width="4" height="6" fill="#c41a37"/>
        <rect x="6" y="20" width="36" height="2" fill="#8c0d24"/>

        <!-- Chrome Trim, Tailfin, Headlights & Bumpers -->
        <rect x="8" y="17" width="32" height="1" fill="#ffe8f5" opacity="0.65"/>
        <rect x="43" y="16" width="2" height="3" fill="#ffd166"/>
        <rect x="44" y="15" width="3" height="5" fill="#ffffff" opacity="0.45"/>
        <rect x="42" y="20" width="4" height="2" fill="#e0e6ed"/>
        <rect x="4" y="15" width="2" height="3" fill="#ff2a6d"/>
        <rect x="3" y="20" width="4" height="2" fill="#e0e6ed"/>

        <!-- Grounded Whitewall Tires with Chrome Hubcaps -->
        <rect x="10" y="19" width="8" height="8" fill="#0d0814"/>
        <rect x="11" y="20" width="6" height="6" fill="#f4eee1"/>
        <rect x="12" y="21" width="4" height="4" fill="#ffd166"/>
        <rect x="32" y="19" width="8" height="8" fill="#0d0814"/>
        <rect x="33" y="20" width="6" height="6" fill="#f4eee1"/>
        <rect x="34" y="21" width="4" height="4" fill="#ffd166"/>
      </svg>`;
    }

    if (isGold || buddyId === 'golden') {
      // Crowned Empress Shrimpion
      return `<svg viewBox="0 0 32 32" shape-rendering="crispEdges">
        <!-- Royal Crown -->
        <rect x="19" y="3" width="1" height="2" fill="#ffeaa7"/>
        <rect x="22" y="2" width="1" height="3" fill="#ffeaa7"/>
        <rect x="25" y="3" width="1" height="2" fill="#ffeaa7"/>
        <rect x="19" y="5" width="7" height="2" fill="#ffd166"/>
        <rect x="22" y="5" width="1" height="1" fill="#ff385c"/>

        <!-- Golden Antennae -->
        <rect x="23" y="1" width="1" height="2" fill="#fff8d6"/>
        <rect x="21" y="3" width="2" height="1" fill="#fff8d6"/>
        <rect x="18" y="4" width="3" height="1" fill="#ffeaa7"/>
        <rect x="15" y="5" width="3" height="1" fill="#ffd166"/>

        <!-- Rostrum & Head -->
        <rect x="26" y="8" width="4" height="1" fill="#fff8d6"/>
        <rect x="24" y="7" width="2" height="1" fill="#fff8d6"/>
        <rect x="23" y="9" width="4" height="2" fill="#ffd166"/>
        <rect x="18" y="8" width="6" height="6" fill="#ffd166"/>
        <rect x="19" y="8" width="4" height="2" fill="#fff8d6"/>

        <!-- Eye -->
        <rect x="21" y="9" width="3" height="3" fill="#050a14"/>
        <rect x="22" y="9" width="1" height="1" fill="#ffffff"/>

        <!-- Segmented Pleon (Golden) -->
        <rect x="13" y="9" width="6" height="6" fill="#ffd166"/>
        <rect x="14" y="9" width="4" height="1" fill="#fff8d6"/>
        <rect x="13" y="14" width="5" height="1" fill="#c99700"/>

        <rect x="9" y="11" width="5" height="6" fill="#ffd166"/>
        <rect x="10" y="11" width="3" height="1" fill="#fff8d6"/>
        <rect x="9" y="16" width="4" height="1" fill="#c99700"/>

        <rect x="6" y="14" width="4" height="5" fill="#ffd166"/>
        <rect x="7" y="14" width="2" height="1" fill="#fff8d6"/>
        <rect x="6" y="18" width="3" height="1" fill="#c99700"/>

        <!-- Legs & Uropod Tail Fan -->
        <rect x="19" y="14" width="1" height="3" fill="#c99700"/>
        <rect x="21" y="14" width="1" height="3" fill="#c99700"/>
        <rect x="3" y="17" width="4" height="4" fill="#ffd166"/>
        <rect x="1" y="20" width="4" height="2" fill="#fff8d6"/>
        <rect x="2" y="22" width="3" height="2" fill="#c99700"/>
      </svg>`;
    }

    if (buddyId === 'schooler') {
      return `<svg viewBox="0 0 28 28" shape-rendering="crispEdges" fill="#4de3ff">
        <rect x="6" y="10" width="14" height="8"/>
        <rect x="9" y="7" width="8" height="3"/>
        <rect x="9" y="18" width="8" height="3"/>
        <rect x="20" y="9" width="3" height="10"/>
        <rect x="23" y="8" width="3" height="12"/>
        <rect x="9" y="12" width="3" height="3" fill="#050a14"/>
        <rect x="10" y="12" width="1" height="1" fill="#ffffff"/>
        <rect x="3" y="12" width="3" height="4"/>
        <rect x="10" y="8" width="2" height="2" fill="#ffeaa7"/>
      </svg>`;
    }

    if (buddyId === 'rare') {
      return `<svg viewBox="0 0 28 28" shape-rendering="crispEdges" fill="#ff5252">
        <rect x="9" y="3" width="10" height="3"/>
        <rect x="6" y="6" width="16" height="10"/>
        <rect x="8" y="9" width="3" height="3" fill="#050a14"/>
        <rect x="9" y="9" width="1" height="1" fill="#ffffff"/>
        <rect x="17" y="9" width="3" height="3" fill="#050a14"/>
        <rect x="18" y="9" width="1" height="1" fill="#ffffff"/>
        <rect x="5" y="16" width="18" height="4"/>
        <rect x="6" y="20" width="3" height="6"/>
        <rect x="10" y="20" width="3" height="7"/>
        <rect x="15" y="20" width="3" height="7"/>
        <rect x="19" y="20" width="3" height="6"/>
      </svg>`;
    }

    if (buddyId === 'deepcut') {
      return `<svg viewBox="0 0 28 28" shape-rendering="crispEdges" fill="#9d7bff">
        <rect x="15" y="2" width="3" height="3" fill="#ffd166"/>
        <rect x="18" y="4" width="3" height="4"/>
        <rect x="15" y="6" width="3" height="3"/>
        <rect x="7" y="9" width="14" height="12"/>
        <rect x="4" y="12" width="3" height="6"/>
        <rect x="1" y="11" width="3" height="8"/>
        <rect x="18" y="12" width="3" height="3" fill="#ffffff"/>
        <rect x="13" y="18" width="8" height="3" fill="#050a14"/>
        <rect x="14" y="17" width="2" height="2" fill="#ffffff"/>
        <rect x="17" y="17" width="2" height="2" fill="#ffffff"/>
      </svg>`;
    }

    // Default Detailed Mascot Shrimp (Riff)
    return `<svg viewBox="0 0 32 32" shape-rendering="crispEdges">
      <!-- Layered Antennae with Segmented Joints & Curve -->
      <rect x="23" y="1" width="1" height="2" fill="#ffd2a0"/>
      <rect x="21" y="3" width="2" height="1" fill="#ffd2a0"/>
      <rect x="18" y="4" width="3" height="1" fill="#ffd2a0"/>
      <rect x="15" y="5" width="3" height="1" fill="#ffd2a0"/>
      <rect x="20" y="2" width="1" height="2" fill="#ffeaa7"/>
      <rect x="17" y="4" width="3" height="1" fill="#ffeaa7"/>
      <rect x="13" y="6" width="3" height="1" fill="#ffeaa7"/>

      <!-- Serrated Rostrum Horn (3 notches) -->
      <rect x="27" y="8" width="4" height="1" fill="#ffa8be"/>
      <rect x="25" y="7" width="2" height="1" fill="#ffa8be"/>
      <rect x="24" y="9" width="4" height="2" fill="#ff5d8f"/>
      <rect x="26" y="9" width="1" height="1" fill="#ffffff" opacity="0.5"/>

      <!-- Cephalothorax (Head) with highlight contour -->
      <rect x="18" y="8" width="6" height="7" fill="#ff5d8f"/>
      <rect x="19" y="8" width="5" height="2" fill="#ffa8be"/>
      <rect x="18" y="14" width="6" height="1" fill="#b8244b"/>

      <!-- Expressive Retro Eye with white specular & cyan glint -->
      <rect x="21" y="9" width="3" height="3" fill="#050a14"/>
      <rect x="22" y="9" width="1" height="1" fill="#ffffff"/>
      <rect x="23" y="11" width="1" height="1" fill="#4de3ff"/>

      <!-- Cheek blush -->
      <rect x="24" y="12" width="1" height="1" fill="#ff3366"/>

      <!-- Jointed Pereiopods (Walking legs) -->
      <rect x="19" y="15" width="1" height="3" fill="#e03b6d"/>
      <rect x="20" y="17" width="1" height="1" fill="#e03b6d"/>
      <rect x="21" y="15" width="1" height="3" fill="#e03b6d"/>
      <rect x="22" y="17" width="1" height="1" fill="#e03b6d"/>
      <rect x="23" y="15" width="1" height="2" fill="#e03b6d"/>

      <!-- Segmented Pleon (5 Articulated Segments) with dorsal shine and depth shadow -->
      <!-- Segment 1 -->
      <rect x="13" y="9" width="6" height="7" fill="#ff5d8f"/>
      <rect x="14" y="9" width="4" height="1" fill="#ffa8be"/>
      <rect x="13" y="15" width="5" height="1" fill="#b8244b"/>
      <!-- Segment 2 -->
      <rect x="9" y="11" width="5" height="7" fill="#ff5d8f"/>
      <rect x="10" y="11" width="3" height="1" fill="#ffa8be"/>
      <rect x="9" y="17" width="4" height="1" fill="#b8244b"/>
      <!-- Segment 3 -->
      <rect x="6" y="14" width="4" height="6" fill="#ff5d8f"/>
      <rect x="7" y="14" width="2" height="1" fill="#ffa8be"/>
      <rect x="6" y="19" width="3" height="1" fill="#b8244b"/>
      <!-- Segment 4 -->
      <rect x="4" y="16" width="3" height="5" fill="#ff5d8f"/>
      <rect x="4" y="20" width="2" height="1" fill="#b8244b"/>

      <!-- Translucent Swimmerets (Pleopods) -->
      <rect x="11" y="18" width="1" height="2" fill="#ffa8be"/>
      <rect x="14" y="16" width="1" height="2" fill="#ffa8be"/>
      <rect x="8" y="19" width="1" height="2" fill="#ffa8be"/>

      <!-- Uropod & Telson Tail Fan (4 blades with highlights) -->
      <rect x="2" y="17" width="3" height="4" fill="#ff7f9d"/>
      <rect x="1" y="20" width="4" height="2" fill="#ffa8be"/>
      <rect x="2" y="22" width="3" height="2" fill="#ff5d8f"/>
      <rect x="3" y="18" width="1" height="5" fill="#ffffff" opacity="0.45"/>
    </svg>`;
  }

  // Curated, approachable general-knowledge prompts (7 tracks x 32 prompts).
  const PROMPT_TRACKS = window.CUSTOM_KRILLION_PROMPT_DATA.tracks;
  const SURPLUS_UNLIMITED_PROMPTS = [];
  const PACKS = window.CUSTOM_KRILLION_PROMPT_DATA.packs;

  // Curated sources: 224 daily-track prompts + 49 themed-pack prompts; exact wording is deduplicated below.
  const MASTER_PROMPT_POOL = (() => {
    const seen = new Set();
    const combined = [...PROMPT_TRACKS.flat(), ...SURPLUS_UNLIMITED_PROMPTS];
    Object.entries(PACKS).forEach(([packKey, packObj]) => {
      const slug = packKey.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      (packObj && Array.isArray(packObj.prompts) ? packObj.prompts : []).forEach((q, idx) => {
        combined.push(q.id ? q : Object.assign({}, q, { id: `pack_${slug}_${idx + 1}` }));
      });
    });
    return combined.filter((q) => {
      const key = (q.question || '').trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  })();
  const UNLIMITED_DECK = MASTER_PROMPT_POOL;

  // --- Persistence & State Management ---
  const STORE_KEY = 'shrimpion_v2';

  function loadStore() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      return {
        runs: Array.isArray(raw.runs) ? raw.runs : [],
        maxStreak: Number(raw.maxStreak || 0),
        curStreak: Number(raw.curStreak || 0),
        lastPlayedDate: raw.lastPlayedDate || '',
        equippedBuddy: raw.equippedBuddy || 'shrimp',
        sound: raw.sound !== false,
        lowPower: raw.lowPower === true,
        colorblind: raw.colorblind === true,
        corrections: raw.corrections !== false,
        clearRejected: raw.clearRejected === true,
        onlineLookup: raw.onlineLookup !== false,
        reactionAssets: sanitizeReactionAssets(raw.reactionAssets),
        customAnswers: raw.customAnswers && typeof raw.customAnswers === 'object' ? raw.customAnswers : {},
        seenDailyMap: raw.seenDailyMap && typeof raw.seenDailyMap === 'object' ? raw.seenDailyMap : {},
        seenUnlimitedIds: Array.isArray(raw.seenUnlimitedIds) ? raw.seenUnlimitedIds : [],
        dynamicPrompts: Array.isArray(raw.dynamicPrompts) ? raw.dynamicPrompts : [],
        lastSeenDateKey: raw.lastSeenDateKey || '',
        seenWikiCategories: Array.isArray(raw.seenWikiCategories) ? raw.seenWikiCategories : [],
        dailyOnlineDecks: raw.dailyOnlineDecks && typeof raw.dailyOnlineDecks === 'object' ? raw.dailyOnlineDecks : {}
      };
    } catch (_) {
      return {
        runs: [],
        maxStreak: 0,
        curStreak: 0,
        lastPlayedDate: '',
        equippedBuddy: 'shrimp',
        sound: true,
        lowPower: false,
        colorblind: false,
        corrections: true,
        clearRejected: false,
        onlineLookup: true,
        reactionAssets: {},
        customAnswers: {},
        seenDailyMap: {},
        seenUnlimitedIds: [],
        dynamicPrompts: [],
        lastSeenDateKey: '',
        seenWikiCategories: [],
        dailyOnlineDecks: {}
      };
    }
  }

  const store = loadStore();

  function saveStore() {
    try {
      if (store.seenDailyMap && typeof store.seenDailyMap === 'object') {
        const keys = Object.keys(store.seenDailyMap);
        if (keys.length > 90) {
          keys.sort((a, b) => Number(a) - Number(b));
          keys.slice(0, keys.length - 90).forEach((k) => {
            delete store.seenDailyMap[k];
          });
        }
      }
      if (Array.isArray(store.dynamicPrompts) && store.dynamicPrompts.length > 64) {
        store.dynamicPrompts = store.dynamicPrompts.slice(-64);
      }
      if (Array.isArray(store.seenWikiCategories) && store.seenWikiCategories.length > 500) {
        store.seenWikiCategories = store.seenWikiCategories.slice(-500);
      }
      if (store.dailyOnlineDecks && typeof store.dailyOnlineDecks === 'object') {
        const dateKeys = Object.keys(store.dailyOnlineDecks).sort();
        if (dateKeys.length > 14) {
          dateKeys.slice(0, dateKeys.length - 14).forEach((k) => {
            delete store.dailyOnlineDecks[k];
          });
        }
      }
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch (_) { }
  }

  // --- Live Wikipedia Category Aggregation & Dynamic Subcategory Discovery ---
  const WIKI_CAT_CACHE_KEY = 'shrimpion_wiki_cat_v1';
  const WIKI_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  const TRACK_PARENT_WIKI_CATS = [
    ['Category:Geography_by_country', 'Category:Landforms', 'Category:Capitals', 'Category:Islands_by_ocean', 'Category:Rivers_by_continent', 'Category:Mountain_ranges', 'Category:Lakes_by_country', 'Category:Port_cities', 'Category:National_parks_by_country', 'Category:UNESCO_World_Heritage_Sites_by_country'],
    ['Category:Mammals', 'Category:Birds', 'Category:Marine_animals', 'Category:Reptiles', 'Category:Botany', 'Category:Amphibians', 'Category:Fish', 'Category:Trees', 'Category:Fungi', 'Category:Insects'],
    ['Category:Films', 'Category:Television_series', 'Category:Popular_music', 'Category:Video_games', 'Category:Comics', 'Category:Animated_films', 'Category:Musical_groups_by_genre', 'Category:Academy_Award_winners', 'Category:Sitcoms', 'Category:Science_fiction_films'],
    ['Category:Astronomy', 'Category:Chemical_elements', 'Category:Computer_science', 'Category:Mathematics', 'Category:Inventions', 'Category:Physics', 'Category:Planets', 'Category:Programming_languages', 'Category:Minerals', 'Category:Spacecraft'],
    ['Category:Cuisine', 'Category:Cheeses', 'Category:Beverages', 'Category:Handicrafts', 'Category:Clothing', 'Category:Breads', 'Category:Pastries', 'Category:Cocktails', 'Category:Spices', 'Category:Fruit'],
    ['Category:Ancient_history', 'Category:Mythology', 'Category:Paintings', 'Category:Literature', 'Category:Archaeological_sites', 'Category:Sculptures', 'Category:Greek_mythology', 'Category:Novels_by_genre', 'Category:Castles', 'Category:Classical_composers'],
    ['Category:Sports', 'Category:Games', 'Category:Festivals', 'Category:National_parks', 'Category:Tourism', 'Category:Board_games', 'Category:Olympic_sports', 'Category:Martial_arts', 'Category:Card_games', 'Category:Stadiums']
  ];
  const wikiInflightRequests = new Map();
  const wikiClaimedCategories = new Set();

  function normAnswerKey(val) {
    if (typeof normalizeText === 'function') return normalizeText(val);
    return String(val || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function loadWikiCatCache() {
    try {
      const parsed = JSON.parse(localStorage.getItem(WIKI_CAT_CACHE_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function saveWikiCatCache(cache) {
    try {
      const entries = Object.entries(cache);
      if (entries.length > 80) {
        entries.sort((a, b) => (b[1]?.ts || 0) - (a[1]?.ts || 0));
        cache = Object.fromEntries(entries.slice(0, 80));
      }
      localStorage.setItem(WIKI_CAT_CACHE_KEY, JSON.stringify(cache));
    } catch (_) { }
  }

  function isPlayableWikiPageTitle(title) {
    if (!title || typeof title !== 'string') return false;
    const t = title.trim();
    if (t.length < 2 || t.length > 52) return false;
    if (/^\d+$/.test(t)) return false;
    if (/^(Lists? of|Category:|Index of|Outline of|Glossary of|Timeline of|Portal:|Template:|Wikipedia:|Help:|File:|Draft:)/i.test(t)) {
      return false;
    }
    if (/\(disambiguation\)$/i.test(t) || /\bdisambiguation\b/i.test(t)) {
      return false;
    }
    return true;
  }

  function cleanWikiTitle(title) {
    const full = String(title || '').trim();
    const stripped = full.replace(/\s*\([^)]*\)\s*$/, '').trim();
    const aliases = stripped && stripped.toLowerCase() !== full.toLowerCase() ? [full] : [];
    return { name: stripped || full, aliases };
  }

  function assignWikiTier(rankIdx, totalCount) {
    const ratio = rankIdx / Math.max(1, totalCount);
    if (ratio < 0.12) return 'plankton';
    if (ratio < 0.22) return 'tooclever';
    if (ratio < 0.48) return 'schooler';
    if (ratio < 0.72) return 'rare';
    if (ratio < 0.88) return 'deepcut';
    return 'shrimpion';
  }

  function mergeWikiEntriesIntoPrompt(promptObj, entries) {
    if (!promptObj || !Array.isArray(promptObj.answers) || !Array.isArray(entries)) return 0;
    const seen = new Set();
    for (const ans of promptObj.answers) {
      if (!Array.isArray(ans)) continue;
      if (ans[0]) seen.add(normAnswerKey(ans[0]));
      if (Array.isArray(ans[3])) {
        ans[3].forEach((al) => seen.add(normAnswerKey(al)));
      }
    }
    let added = 0;
    const maxCap = Math.max(42, promptObj.answers.length + 14);
    for (const entry of entries) {
      if (promptObj.answers.length >= maxCap) break;
      if (!Array.isArray(entry) || !entry[0]) continue;
      const key = normAnswerKey(entry[0]);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      if (Array.isArray(entry[3])) {
        entry[3].forEach((al) => seen.add(normAnswerKey(al)));
      }
      promptObj.answers.push(entry);
      added++;
    }
    return added;
  }

  async function fetchWithTimeout(url, timeoutMs = 4500) {
    if (typeof fetch !== 'function') return null;
    let controller = null;
    let timer = null;
    if (typeof AbortController === 'function') {
      controller = new AbortController();
      timer = setTimeout(() => controller.abort(), timeoutMs);
    }
    try {
      const resp = await fetch(url, controller ? { signal: controller.signal } : undefined);
      if (!resp || !resp.ok) return null;
      return await resp.json();
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  async function hydratePromptFromWikipedia(promptObj) {
    if (!promptObj || !promptObj.wikiCategory || store.onlineLookup === false || typeof fetch !== 'function') {
      return promptObj;
    }
    if (promptObj._wikiHydrated === true) return promptObj;

    const wikiCat = promptObj.wikiCategory;
    const cache = loadWikiCatCache();
    const cached = cache[wikiCat];
    if (cached && Array.isArray(cached.entries) && cached.entries.length > 0 && (Date.now() - Number(cached.ts || 0)) < WIKI_CACHE_TTL_MS) {
      mergeWikiEntriesIntoPrompt(promptObj, cached.entries);
      promptObj._wikiHydrated = true;
      return promptObj;
    }

    if (wikiInflightRequests.has(wikiCat)) {
      const sharedEntries = await wikiInflightRequests.get(wikiCat);
      if (Array.isArray(sharedEntries) && sharedEntries.length) {
        mergeWikiEntriesIntoPrompt(promptObj, sharedEntries);
        promptObj._wikiHydrated = true;
      }
      return promptObj;
    }

    const workPromise = (async () => {
      try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=${encodeURIComponent(wikiCat)}&gcmnamespace=0&gcmlimit=50&prop=info|description&format=json&origin=*`;
        const data = await fetchWithTimeout(url);
        const pages = Object.values((data && data.query && data.query.pages) || {});
        const filtered = pages
          .filter((pg) => pg && pg.title && isPlayableWikiPageTitle(pg.title) && !(pg.pageprops && pg.pageprops.disambiguation !== undefined))
          .sort((a, b) => Number(b.length || 0) - Number(a.length || 0));

        const prettyCat = wikiCat.replace(/^Category:/i, '').replace(/_/g, ' ');
        const entries = [];
        for (let i = 0; i < filtered.length; i++) {
          const pg = filtered[i];
          const { name, aliases } = cleanWikiTitle(pg.title);
          if (!name || name.length < 2) continue;
          const tier = assignWikiTier(i, filtered.length);
          const desc = typeof cleanQuip === 'function' ? cleanQuip(pg.description || '') : String(pg.description || '').slice(0, 140);
          const quip = desc || `Live Wikipedia entry under ${prettyCat}.`;
          entries.push([name, tier, quip, aliases]);
        }

        if (entries.length > 0) {
          const latestCache = loadWikiCatCache();
          latestCache[wikiCat] = { ts: Date.now(), entries };
          saveWikiCatCache(latestCache);
        }
        return entries;
      } catch (_) {
        return null;
      } finally {
        wikiInflightRequests.delete(wikiCat);
      }
    })();

    wikiInflightRequests.set(wikiCat, workPromise);
    const fetchedEntries = await workPromise;
    if (Array.isArray(fetchedEntries) && fetchedEntries.length > 0) {
      mergeWikiEntriesIntoPrompt(promptObj, fetchedEntries);
      promptObj._wikiHydrated = true;
    }
    return promptObj;
  }

  function hydrateDeckOnline(deck) {
    if (store.onlineLookup === false || typeof fetch !== 'function' || !Array.isArray(deck) || deck.length === 0) {
      return Promise.resolve([]);
    }
    return Promise.allSettled(deck.slice(0, 10).map((q) => hydratePromptFromWikipedia(q)));
  }

  function isPlayableSubcategoryTitle(catTitle) {
    if (!catTitle || typeof catTitle !== 'string' || !catTitle.startsWith('Category:')) return false;
    const raw = catTitle.slice('Category:'.length).replace(/_/g, ' ').trim();
    if (raw.length < 5 || raw.length > 48) return false;
    if (/^\d+$/.test(raw) || raw.includes(':')) return false;
    if (/\b(articles|stubs|lists|redirects|wikidata|wikipedia|template|images|navbox|cs1|births|deaths|people by|by year|by decade|by century|by location|by country|by medium|by topic|by type|all |commons category|categories named after|redirects from)\b/i.test(raw)) {
      return false;
    }
    return true;
  }

  function formatWikiCategoryAsQuestion(catTitle) {
    const label = String(catTitle || '')
      .replace(/^Category:/i, '')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!label) return 'Name a fitting Wikipedia entry.';
    const keepCap = /^(I\b|II|III|IV|US\b|UK\b|UN\b|EU\b|African|American|Ancient|Arab|Asian|Australian|British|Canadian|Chinese|Dutch|Egyptian|English|European|French|German|Greek|Indian|Irish|Italian|Japanese|Korean|Latin|Mediterranean|Mexican|Nordic|Pacific|Persian|Polish|Portuguese|Roman|Russian|Scottish|Spanish|Swedish|Swiss|Turkish|World)/;
    const formatted = keepCap.test(label)
      ? label
      : (label.charAt(0).toLowerCase() + label.slice(1));
    const headPhrase = label
      .split(/\s+(?:of|in|on|from|by|for|with|at|about|under|over|near|around|introduced|based|created|named)\b/i)[0]
      .trim();
    const pluralRx = /([a-z]{3,}[^su]s|series|species|people|men|women|children|taxa|media)$/i;
    const uncountableRx = /(physics|mathematics|mechanics|dynamics|thermodynamics|electronics|linguistics|statistics|athletics|politics|economics|acoustics|optics|genetics|robotics|ethics|aesthetics|news)$/i;
    const looksPlural = (pluralRx.test(headPhrase) && !uncountableRx.test(headPhrase))
      || (pluralRx.test(label) && !uncountableRx.test(label))
      || /\bseries$/i.test(label);
    return looksPlural
      ? `Name one of the ${formatted}.`
      : `Name a well-known topic in ${formatted}.`;
  }

  function buildPromptFromWikiCategory(catTitle, safeTrackId) {
    const label = String(catTitle || '').replace(/^Category:/i, '').replace(/_/g, ' ').trim();
    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 32) || 'topic';
    const stopWords = new Set(['with', 'from', 'that', 'this', 'into', 'over', 'under', 'other', 'various', 'about', 'their']);
    const kwTokens = label
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 4 && !stopWords.has(w))
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    return {
      id: `wiki_dyn_${safeTrackId}_${slug}`,
      question: formatWikiCategoryAsQuestion(catTitle),
      category: 'wiki_dynamic',
      wikiCategory: catTitle,
      wikiKeywords: kwTokens.length ? kwTokens.join('|') : label.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      answers: []
    };
  }

  async function fetchPlayableSubcategories(catTitle, knownWikiCats, prefix = '') {
    const prefixParam = prefix ? `&cmstartsortkeyprefix=${encodeURIComponent(prefix)}` : '';
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(catTitle)}&cmtype=subcat${prefixParam}&cmlimit=50&format=json&origin=*`;
    const data = await fetchWithTimeout(url);
    return ((data && data.query && data.query.categorymembers) || [])
      .map((c) => c && c.title)
      .filter((title) => isPlayableSubcategoryTitle(title) && !knownWikiCats.has(title.toLowerCase()) && !wikiClaimedCategories.has(title.toLowerCase()));
  }

  async function discoverDynamicWikipediaPrompt(trackId, seed) {
    if (store.onlineLookup === false || typeof fetch !== 'function') return null;
    try {
      const safeTrackId = ((Number(trackId) || 0) % 7 + 7) % 7;
      const parents = TRACK_PARENT_WIKI_CATS[safeTrackId];
      const rng = mulberry32((Number(seed) || Date.now()) >>> 0);
      const startIdx = Math.floor(rng() * parents.length);

      const knownWikiCats = new Set(
        MASTER_PROMPT_POOL.concat(store.dynamicPrompts || [])
          .map((q) => (q.wikiCategory || '').toLowerCase())
          .concat((store.seenWikiCategories || []).map((c) => String(c || '').toLowerCase()))
          .filter(Boolean)
      );

      for (let attempt = 0; attempt < Math.min(3, parents.length); attempt++) {
        const parentCat = parents[(startIdx + attempt) % parents.length];
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const prefix = attempt === 0 ? letters[Math.floor(rng() * letters.length)] : '';
        let subcats = await fetchPlayableSubcategories(parentCat, knownWikiCats, prefix);
        if (subcats.length === 0 && prefix) {
          subcats = await fetchPlayableSubcategories(parentCat, knownWikiCats, '');
        }
        if (subcats.length === 0) continue;

        const maxSubTries = Math.min(3, subcats.length);
        const subOffset = Math.floor(rng() * subcats.length);
        for (let sTry = 0; sTry < maxSubTries; sTry++) {
          let pickedSubcat = subcats[(subOffset + sTry) % subcats.length];
          if (wikiClaimedCategories.has(pickedSubcat.toLowerCase())) continue;
          wikiClaimedCategories.add(pickedSubcat.toLowerCase());

          let candidate = buildPromptFromWikiCategory(pickedSubcat, safeTrackId);
          await hydratePromptFromWikipedia(candidate);

          // Traverse 1 hop deeper if the picked category is a container with too few direct articles
          if (candidate.answers.length < 8) {
            const childSubcats = await fetchPlayableSubcategories(pickedSubcat, knownWikiCats, '');
            if (childSubcats.length > 0) {
              const leafSubcat = childSubcats[Math.floor(rng() * childSubcats.length)];
              if (!wikiClaimedCategories.has(leafSubcat.toLowerCase())) {
                wikiClaimedCategories.add(leafSubcat.toLowerCase());
                const leafCandidate = buildPromptFromWikiCategory(leafSubcat, safeTrackId);
                await hydratePromptFromWikipedia(leafCandidate);
                if (leafCandidate.answers.length >= candidate.answers.length) {
                  pickedSubcat = leafSubcat;
                  candidate = leafCandidate;
                }
              }
            }
          }

          if (candidate.answers.length >= 8) {
            if (!Array.isArray(store.seenWikiCategories)) store.seenWikiCategories = [];
            if (!store.seenWikiCategories.some((c) => c.toLowerCase() === pickedSubcat.toLowerCase())) {
              store.seenWikiCategories.push(pickedSubcat);
            }
            if (!Array.isArray(store.dynamicPrompts)) store.dynamicPrompts = [];
            if (!store.dynamicPrompts.some((p) => p.id === candidate.id || p.wikiCategory === candidate.wikiCategory)) {
              store.dynamicPrompts.push({
                id: candidate.id,
                question: candidate.question,
                category: candidate.category,
                wikiCategory: candidate.wikiCategory,
                wikiKeywords: candidate.wikiKeywords,
                answers: candidate.answers
              });
            }
            saveStore();
            return candidate;
          }
        }
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  // Deterministic Mulberry32 32-bit PRNG
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Generates a fair bijective cycle permutation guaranteeing 0 repeats within a 32-day sliding window
  function getTrackPermutation(trackId, trackLength, cycle) {
    const cache = getTrackPermutation._cache || (getTrackPermutation._cache = new Map());
    const cacheKey = `${trackId}:${trackLength}:${cycle}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const rng = mulberry32((trackId + 1) * 10007 + cycle * 49297);
    const indices = Array.from({ length: trackLength }, (_, i) => i);
    for (let i = trackLength - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    if (cycle > 0 && trackLength > 3) {
      const prevIndices = getTrackPermutation(trackId, trackLength, cycle - 1);
      const windowSize = Math.min(31, Math.floor(trackLength / 2) - 1);
      const forbiddenTail = new Set(prevIndices.slice(trackLength - windowSize));
      for (let i = 0; i < windowSize; i++) {
        if (forbiddenTail.has(indices[i])) {
          for (let k = windowSize; k < trackLength; k++) {
            if (!forbiddenTail.has(indices[k])) {
              [indices[i], indices[k]] = [indices[k], indices[i]];
              break;
            }
          }
        }
      }
    }

    cache.set(cacheKey, indices);
    return indices;
  }

  // Resolves the 7 balanced prompts for any given dive number with 30-day collision avoidance
  function getDailyDeckForDive(diveNumber, options = {}) {
    const recentQuestions = new Set();
    if (typeof store !== 'undefined' && store) {
      if (Array.isArray(store.runs)) {
        for (const r of store.runs) {
          if (r && r.diveNumber && r.diveNumber !== diveNumber && Math.abs(diveNumber - r.diveNumber) <= 30) {
            for (const res of (r.results || [])) {
              if (res && res.promptText) recentQuestions.add(res.promptText.trim().toLowerCase());
              if (res && res.promptId) recentQuestions.add(String(res.promptId).toLowerCase());
            }
          }
        }
      }
      if (store.seenDailyMap && typeof store.seenDailyMap === 'object') {
        for (const [dKey, seenList] of Object.entries(store.seenDailyMap)) {
          const dNum = Number(dKey);
          if (!Number.isNaN(dNum) && dNum !== diveNumber && Math.abs(diveNumber - dNum) <= 30 && Array.isArray(seenList)) {
            for (const item of seenList) {
              recentQuestions.add(String(item).trim().toLowerCase());
            }
          }
        }
      }
    }

    const deck = [];
    const chosenQuestions = new Set();
    for (let trackId = 0; trackId < 7; trackId++) {
      const track = PROMPT_TRACKS[trackId];
      const trackLength = track.length;
      const cycle = Math.floor(diveNumber / trackLength);
      const pos = ((diveNumber % trackLength) + trackLength) % trackLength;
      const perm = getTrackPermutation(trackId, trackLength, cycle);

      let picked = track[perm[pos]];
      for (let step = 0; step < trackLength; step++) {
        const candidate = track[perm[(pos + step) % trackLength]];
        const idKey = (candidate.id || '').toLowerCase();
        const qKey = (candidate.question || '').trim().toLowerCase();
        if (!recentQuestions.has(idKey) && !recentQuestions.has(qKey) && !chosenQuestions.has(qKey)) {
          picked = candidate;
          break;
        }
      }
      deck.push(picked);
      chosenQuestions.add((picked.question || '').trim().toLowerCase());
    }

    if (options.recordSeen && typeof store !== 'undefined' && store) {
      if (!store.seenDailyMap || typeof store.seenDailyMap !== 'object') store.seenDailyMap = {};
      store.seenDailyMap[String(diveNumber)] = deck.map((p) => p.id || p.question);
      saveStore();
    }
    if (options.hydrate) {
      hydrateDeckOnline(deck);
    }
    return deck;
  }

  // Local calendar YYYY-MM-DD key matching player's local midnight
  function getLocalDateKey(targetDate = null) {
    const d = targetDate ? new Date(targetDate) : new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // DST-safe local midnight dive number so dives roll over at local midnight consistently
  function getEpochDiveNumber(targetDate = null) {
    const d = targetDate ? new Date(targetDate) : new Date();
    const localMidnight = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const epochLocal = new Date(2026, 0, 1);
    return Math.max(1, Math.round((localMidnight - epochLocal) / (1000 * 60 * 60 * 24)) + 1);
  }

  // Compatibility aliases
  const DAILY_DECK = getDailyDeckForDive(getEpochDiveNumber(), { recordSeen: false, hydrate: false });

  // --- Krillion-Authentic Web Audio Synthesizer ---
  class AudioEngine {
    constructor() {
      this.ac = null;
      this.gain = null;
    }
    init() {
      if (!this.ac && typeof AudioContext !== 'undefined') {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        this.ac = new AudioClass();
        this.gain = this.ac.createGain();
        this.gain.gain.value = 0.75 * (store.sound ? 1 : 0);
        this.gain.connect(this.ac.destination);
      }
      if (this.ac && this.ac.state === 'suspended') {
        this.ac.resume().catch(() => { });
      }
    }
    updateMute() {
      if (this.gain) {
        this.gain.gain.value = 0.75 * (store.sound ? 1 : 0);
      }
    }
    env(g, t, a, p, d) {
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(p, t + a);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    }
    tone({ type = 'sine', f0 = 440, f1 = null, dur = 0.2, a = 0.005, peak = 0.3, lp = null, delay = 0 }) {
      if (!store.sound) return;
      this.init();
      if (!this.ac || !this.gain) return;
      const t = this.ac.currentTime + delay;
      const osc = this.ac.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(f0, t);
      if (f1 !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
      }
      const u = this.ac.createGain();
      this.env(u, t, a, peak, dur);
      let out = osc;
      if (lp) {
        const f = this.ac.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.value = lp;
        osc.connect(f);
        out = f;
      }
      out.connect(u);
      u.connect(this.gain);
      osc.start(t);
      osc.stop(t + dur + a + 0.05);
    }
    noise({ dur = 0.3, lp = 1200, hp = null, peak = 0.25, a = 0.003, delay = 0, sweepTo = null }) {
      if (!store.sound) return;
      this.init();
      if (!this.ac || !this.gain) return;
      const t = this.ac.currentTime + delay;
      const count = Math.ceil(this.ac.sampleRate * (dur + 0.1));
      const buf = this.ac.createBuffer(1, count, this.ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < count; i++) data[i] = 2 * Math.random() - 1;
      const src = this.ac.createBufferSource();
      src.buffer = buf;
      const f = this.ac.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.setValueAtTime(lp, t);
      if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
      let out = f;
      src.connect(f);
      if (hp) {
        const hf = this.ac.createBiquadFilter();
        hf.type = 'highpass';
        hf.frequency.value = hp;
        f.connect(hf);
        out = hf;
      }
      const u = this.ac.createGain();
      this.env(u, t, a, peak, dur);
      out.connect(u);
      u.connect(this.gain);
      src.start(t);
      src.stop(t + dur + 0.1);
    }
    arp(notes, { type = 'triangle', step = 0.12, dur = 0.5, peak = 0.16, lp = 3000 } = {}) {
      notes.forEach((f0, i) => this.tone({ type, f0, dur, peak, lp, delay: i * step }));
    }
    event(name) {
      if (!store.sound) return;
      switch (name) {
        case 'submit':
          this.tone({ f0: 1150, dur: 0.16, a: 0.003, peak: 0.16 });
          break;
        case 'reject':
          this.noise({ dur: 0.22, lp: 420, peak: 0.2 });
          this.tone({ f0: 150, f1: 62, dur: 0.36, peak: 0.22, lp: 700 });
          break;
        case 'tierline':
          this.tone({ type: 'triangle', f0: 780, f1: 1560, dur: 0.07, peak: 0.13, lp: 2500 });
          break;
        case 'sink':
          this.tone({ f0: 1150, dur: 0.7, a: 0.01, peak: 0.1 });
          this.noise({ dur: 1.3, lp: 1400, sweepTo: 180, peak: 0.16 });
          this.tone({ f0: 300, f1: 60, dur: 1.3, peak: 0.1 });
          break;
        case 'land_small':
          this.tone({ f0: 140, f1: 70, dur: 0.25, peak: 0.28, lp: 600 });
          this.noise({ dur: 0.14, lp: 500, peak: 0.1 });
          break;
        case 'land_big':
          this.tone({ f0: 80, f1: 45, dur: 0.6, peak: 0.38 });
          this.noise({ dur: 0.7, lp: 900, sweepTo: 200, peak: 0.18, delay: 0.02 });
          this.tone({ type: 'triangle', f0: 523, dur: 0.4, peak: 0.09, delay: 0.15 });
          break;
        case 'krillion':
          this.tone({ f0: 60, f1: 40, dur: 1.2, peak: 0.34 });
          this.arp([784, 988, 1175, 1568], { step: 0.13, dur: 0.7, peak: 0.15, lp: 3000 });
          this.noise({ dur: 1.4, lp: 2500, hp: 1200, peak: 0.05, delay: 0.3 });
          break;
        case 'miss':
          this.tone({ f0: 220, f1: 52, dur: 0.7, peak: 0.24 });
          this.noise({ dur: 0.5, lp: 400, peak: 0.14, delay: 0.05 });
          break;
        case 'tick':
          this.tone({ f0: 880, dur: 0.07, peak: 0.16 });
          this.tone({ f0: 880, dur: 0.05, peak: 0.06, delay: 0.12 });
          break;
        case 'surface':
          this.noise({ dur: 1.6, lp: 300, sweepTo: 3000, peak: 0.16 });
          this.tone({ f0: 80, f1: 600, dur: 1.5, peak: 0.08 });
          break;
        case 'blub': {
          const e = 0.85 + 0.45 * Math.random();
          this.tone({ f0: 260 * e, f1: 720 * e, dur: 0.13, peak: 0.22, lp: 2200 });
          this.noise({ dur: 0.05, lp: 1800, hp: 700, peak: 0.05 });
          break;
        }
        case 'descend':
        case 'begin':
          this.noise({ dur: 1.1, lp: 2000, sweepTo: 240, peak: 0.15 });
          this.tone({ f0: 110, f1: 48, dur: 1.2, peak: 0.32 });
          this.tone({ type: 'triangle', f0: 784, dur: 0.5, peak: 0.12, lp: 3000 });
          this.tone({ type: 'triangle', f0: 523, dur: 0.75, peak: 0.12, lp: 3000, delay: 0.22 });
          break;
      }
    }
  }

  const audio = new AudioEngine();

  // --- Normalization & Matching ---
  function normalizeText(val) {
    return String(val || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/['’`]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/^(the|a|an)\s+/, '');
  }

  function levDistance(a, b) {
    const d = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) d[i][0] = i;
    for (let j = 0; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[a.length][b.length];
  }

  function matchAnswerLocal(rawInput, question) {
    const norm = normalizeText(rawInput);
    if (!norm) return null;

    const list = [...question.answers];
    const custom = store.customAnswers[question.question] || [];
    list.push(...custom);

    // Exact match
    for (const item of list) {
      const [canon, tier, quip, aliases = []] = item;
      for (const name of [canon, ...aliases]) {
        const nName = normalizeText(name);
        if (nName === norm || nName.replace(/ /g, '') === norm.replace(/ /g, '')) {
          return { answer: canon, tier, quip, matchedName: name, corrected: false };
        }
      }
    }

    // Fuzzy match
    const normCompact = norm.replace(/ /g, '');
    let best = null;
    let minD = 99;

    for (const item of list) {
      const [canon, tier, quip, aliases = []] = item;
      for (const name of [canon, ...aliases]) {
        const candNorm = normalizeText(name);
        const candCompact = candNorm.replace(/ /g, '');
        const maxLen = Math.max(normCompact.length, candCompact.length);
        const allowed = maxLen >= 8 ? 2 : maxLen >= 5 ? 1 : 0;
        if (allowed > 0 && Math.abs(normCompact.length - candCompact.length) <= allowed) {
          const dist = levDistance(normCompact, candCompact);
          if (dist <= allowed && dist < minD) {
            minD = dist;
            best = { answer: canon, tier, quip, matchedName: name, corrected: true };
          }
        }
      }
    }

    return best;
  }

  // --- Live Multi-API Answer Verification & Obscurity/Rarity Engine ---
  async function verifyAnswerOnline(rawInput, question) {
    const query = rawInput.trim();
    if (!query || query.length < 2) return null;

    try {
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=extracts|categories|pageprops|info&inprop=watchers&exintro=1&explaintext=1&exchars=600&cllimit=50&titles=${encodeURIComponent(query)}`;
      let res = await fetch(wikiUrl);
      let data = await res.json();
      let pages = data?.query?.pages || {};
      let page = Object.values(pages)[0];

      // Fallback search
      if (!page || page.missing !== undefined) {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srlimit=3&srsearch=${encodeURIComponent(query)}`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        const topHit = searchData?.query?.search?.[0];
        if (topHit && topHit.title) {
          const retryUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=extracts|categories|pageprops|info&inprop=watchers&exintro=1&explaintext=1&exchars=600&cllimit=50&titles=${encodeURIComponent(topHit.title)}`;
          res = await fetch(retryUrl);
          data = await res.json();
          pages = data?.query?.pages || {};
          page = Object.values(pages)[0];
        }
      }

      if (!page || page.missing !== undefined) {
        // Fallback to Wikidata
        const wdUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&language=en&limit=3&search=${encodeURIComponent(query)}`;
        const wdRes = await fetch(wdUrl);
        const wdData = await wdRes.json();
        const wdHit = wdData?.search?.[0];
        if (!wdHit) return null;

        const isMatch = validateCategoryMatch(wdHit.description || '', [], question);
        if (!isMatch) return null;

        const quip = wdHit.description || 'verified entity in the archives.';
        return {
          answer: wdHit.label || query,
          tier: 'deepcut',
          quip: cleanQuip(quip),
          source: 'wikidata'
        };
      }

      const title = page.title || query;
      const extract = page.extract || '';
      const categories = (page.categories || []).map((c) => c.title || '');
      const isDisambig = page.pageprops && 'disambiguation' in page.pageprops;
      if (isDisambig) return null;

      const isMatch = validateCategoryMatch(extract, categories, question);
      if (!isMatch) return null;

      const pageLen = Number(page.length || 0);
      const watchers = Number(page.watchers || 0);

      let tier = 'deepcut';
      if (pageLen > 70000 || watchers > 120) {
        tier = 'schooler';
      } else if (pageLen > 24000 || watchers > 35) {
        tier = 'rare';
      } else if (pageLen > 6500) {
        tier = 'deepcut';
      } else {
        tier = 'shrimpion';
      }

      const quip = cleanQuip(extract) || `Verified entry: ${title}.`;
      return {
        answer: title,
        tier: tier,
        quip: quip,
        source: 'wikipedia'
      };
    } catch {
      return null;
    }
  }

  function testWikiKeywordPattern(pattern, text) {
    if (!pattern) return false;
    if (pattern instanceof RegExp) return pattern.test(text);
    try {
      return new RegExp(pattern, 'i').test(text);
    } catch (_) {
      return String(pattern)
        .split('|')
        .some((tok) => tok && text.includes(tok.trim().toLowerCase()));
    }
  }

  function validateCategoryMatch(extract, categories, question) {
    const text = (extract + ' ' + categories.join(' ')).toLowerCase();
    const cat = question.category || '';

    if (question && question.wikiKeywords && testWikiKeywordPattern(question.wikiKeywords, text)) {
      if (!question.wikiMustAlsoMatch || testWikiKeywordPattern(question.wikiMustAlsoMatch, text)) {
        return true;
      }
    }

    switch (cat) {
      case 'med_island': {
        const hasMed = /mediterranean|aegean|ionian|adriatic|tyrrhenian|ligurian|balearic|greece|italy|croatia|spain|turkey|cyprus|malta/.test(text);
        const hasIsland = /island|islet|archipelago|atoll/.test(text);
        return hasIsland && (hasMed || /island of greece|island of italy|balearic islands/.test(text));
      }
      case 'reef_creature':
        return /coral reef|marine|fish|crustacean|mollusc|mollusk|cnidari|echinoderm|sponge|sea slug|nudibranch|sea turtle|shark|anemone|ocean|reef/.test(text);
      case 'planet_moon':
        return /moon of|natural satellite|satellites of|orbiting jupiter|orbiting saturn|orbiting uranus|orbiting neptune|orbiting mars|orbiting pluto/.test(text);
      case 'pasta_shape':
        return /pasta|variety of pasta|type of pasta|italian cuisine|noodle|alimentary paste/.test(text);
      case 'constellation':
        return /constellation|iau constellation|88 modern constellations|star pattern/.test(text);
      case 'freshwater_fish':
        return /freshwater fish|freshwater|fresh water|river|lake|stream|aquarium fish|teleost|ichthyol/.test(text);
      case 'sea_mythology':
        return /sea deity|god of the sea|goddess of the sea|marine deity|sea monster|mythology|mythological|ocean|sea god|water god|greek god|norse god/.test(text);
      case 'shelled_creature':
        return /shell|mollusk|mollusc|crustacean|bivalve|gastropod|turtle|carapace|exoskeleton/.test(text);
      case 'shark_species':
        return /shark|elasmobranch|selachimorpha/.test(text);
      case 'star_name':
        return /star|stellar|binary star|giant star|supergiant|astronomy/.test(text);
      case 'med_country':
        return /mediterranean|country in southern europe|middle east|north africa/.test(text);
      case 'director_movies':
        return /tarantino|scorsese|directed by|film|movie/.test(text);
      case 'la_shows':
        return /television|series|sitcom|los angeles|california|hollywood/.test(text);
      case 'best_picture':
        return /academy award for best picture|best picture|academy award|oscar/.test(text);
      case 'animated_movie':
        return /pixar|ghibli|animated film|animation|anime film/.test(text);
      case 'eighties_movie':
        return /198\d|1980s|film|movie|science fiction|adventure/.test(text);
      case 'sitcom_show':
        return /sitcom|television series|comedy series/.test(text);
      case 'bond_batman_actor':
        return /james bond|batman|actor|film/.test(text);
      case 'volcano':
        return /volcano|eruption|caldera|lava|magma|stratovolcano|shield volcano/.test(text);
      case 'island_nation':
        return /island nation|island country|archipelagic state|island state|sovereign island/.test(text);
      case 'us_state_capital':
        return /capital of the state of|state capital|capital city of .* united states|capital of .* u\.s\./.test(text);
      case 'marine_mammal':
        return /marine mammal|whale|cetacean|dolphin|porpoise|pinniped|seal|sea lion|walrus|sea otter|manatee|sirenian/.test(text);
      case 'deepsea_creature':
        return /deep-sea|deep sea|abyssal|bathypelagic|hadal|mesopelagic|benthic|trench|ocean floor|bioluminesc/.test(text);
      case 'seabird':
        return /seabird|sea bird|marine bird|pelagic bird|penguin|albatross|petrel|puffin|gull|tern|cormorant|gannet/.test(text);
      case 'solar_system_body':
        return /planet|dwarf planet|asteroid|minor planet|kuiper belt|celestial body|solar system/.test(text);
      case 'human_bone':
        return /bone|skeleton|skeletal system|human anatomy|human skeleton|cranium|ossicle/.test(text);
      case 'herb_spice':
        return /herb|spice|culinary herb|seasoning|condiment|flavoring|flavouring|aromatic plant/.test(text);
      case 'bread_variety':
        return /bread|flatbread|loaf|sourdough|baked dough|pastry|flour dough/.test(text);
      case 'greek_roman_god':
        return /greek mythology|roman mythology|olympian|deity|god|goddess|greek religion|roman religion/.test(text);
      case 'norse_mythology':
        return /norse mythology|norse deity|aesir|vanir|jotunn|valhalla|asgard|ragnarok/.test(text);
      case 'ancient_civilization':
        return /ancient|civilization|empire|bronze age|iron age|antiquity|historical state/.test(text);
      case 'roman_emperor':
        return /roman emperor|caesar|principate|dominate|roman empire|augustus/.test(text);
      case 'historic_battle':
        return /battle of|siege of|naval battle|military campaign|war of/.test(text);
      case 'ball_racket_sport':
        return /ball game|racket sport|racquet sport|team sport|sport played with|ball sport/.test(text);
      case 'mountain_peak':
        return /mountain|peak|summit|elevation|himalayas|alps|andes|rockies|stratovolcano|range/.test(text);
      case 'world_river':
        return /river|waterway|tributary|drainage basin|delta|estuary/.test(text);
      case 'world_capital':
        return /capital city|capital of|national capital|seat of government/.test(text);
      case 'desert_region':
        return /desert|arid|sand sea|erg|dunes|badlands|polar desert/.test(text);
      case 'nolan_spielberg_kubrick':
        return /christopher nolan|steven spielberg|stanley kubrick|directed by|film|movie/.test(text);
      case 'movie_villain':
        return /villain|antagonist|fictional character|film villain|character created by/.test(text);
      case 'olympic_sport':
        return /olympic|summer olympics|winter olympics|sport|athletic|discipline/.test(text);
      case 'martial_art':
        return /martial art|combat sport|fighting system|karate|judo|kung fu|boxing|wrestling|taekwondo/.test(text);
      case 'car_brand':
        return /automobile|car manufacturer|automotive brand|car make|vehicle manufacturer/.test(text);
      case 'board_game':
        return /board game|tabletop game|strategy game|card game|dice game/.test(text);
      case 'dog_breed':
        return /dog breed|breed of dog|canine|hound|terrier|retriever|spaniel|shepherd/.test(text);
      case 'tree_species':
        return /tree|species of tree|conifer|deciduous|evergreen|pinus|quercus|oak|pine|wood/.test(text);
      case 'cheese_variety':
        return /cheese|dairy product|curd|fromage|formaggio|queso/.test(text);
      case 'cocktail_drink':
        return /cocktail|mixed drink|alcoholic beverage|iba official cocktail|liquor|aperitif/.test(text);
      case 'coffee_drink':
        return /coffee|espresso|caffeine|brewed beverage|caffè|latte|roast/.test(text);
      case 'musical_instrument':
        return /musical instrument|string instrument|wind instrument|percussion instrument|brass instrument|keyboard/.test(text);
      case 'chemical_element':
        return /chemical element|periodic table|atomic number|isotope|transition metal|noble gas|metalloid/.test(text);
      case 'gemstone_mineral':
        return /gemstone|mineral|crystal|precious stone|silicate mineral|gemological/.test(text);
      case 'dinosaur_species':
        return /dinosaur|theropod|sauropod|fossil|cretaceous|jurassic|triassic|paleontology|extinct reptile/.test(text);
      default: {
        const qWords = question.question.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
        return qWords.some((w) => text.includes(w));
      }
    }
  }

  function cleanQuip(text) {
    if (!text) return '';
    const firstSentence = text.split(/\.\s+/)[0] || '';
    return firstSentence
      .replace(/\([^)]*\)/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 140);
  }

  // --- Easing Helpers for Krillion Physics ---
  const easeIO = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
  const easeOutCubic = (e) => 1 - Math.pow(1 - e, 3);
  const lerp = (a, b, t) => a + (b - a) * t;
  const randRange = (min, max) => min + Math.random() * (max - min);

  const PLUNGE_DURATIONS = {
    plankton: { dur: 3400, ease: (e) => -(Math.cos(Math.PI * e) - 1) / 2 },
    tooclever: { dur: 3000, ease: easeIO },
    schooler: { dur: 3000, ease: easeIO },
    rare: { dur: 3400, ease: easeIO },
    deepcut: { dur: 4300, ease: easeIO },
    shrimpion: { dur: 4600, ease: easeIO }
  };

  function parseHexToRgb(hex) {
    const val = parseInt(hex.slice(1), 16);
    return [val >> 16 & 255, val >> 8 & 255, val & 255];
  }

  function getDepthColor(meters, isCinema = false) {
    const STOPS = isCinema ? CINEMA_STOPS : OCEAN_STOPS;
    if (meters <= STOPS[0][0]) return STOPS[0][1];
    for (let i = 0; i < STOPS.length - 1; i++) {
      const [m0, c0] = STOPS[i];
      const [m1, c1] = STOPS[i + 1];
      if (meters <= m1) {
        const t = (meters - m0) / (m1 - m0);
        const rgb0 = parseHexToRgb(c0);
        const rgb1 = parseHexToRgb(c1);
        return `rgb(${Math.round(lerp(rgb0[0], rgb1[0], t))}, ${Math.round(lerp(rgb0[1], rgb1[1], t))}, ${Math.round(lerp(rgb0[2], rgb1[2], t))})`;
      }
    }
    return STOPS[STOPS.length - 1][1];
  }

  // --- Persistent Descent Engine (Ocean & Cinema LA Worlds) ---
  function createDescentEngine(rootEl) {
    let currentTheme = 'ocean';

    rootEl.innerHTML = `
      <div class="ds-stage">
        <canvas class="ds-sea"></canvas>
        <div class="ds-world">
          <div class="ds-surface">
            <h1 class="ds-title"></h1>
            <div class="ds-tagline">THE DAILY DIVE</div>
            <div class="ds-subline">7 prompts · 25 seconds each · rarer answers sink deeper</div>
          </div>
          <div class="ds-floor" style="top: 14020px;"></div>
        </div>
        <canvas class="ds-fore"></canvas>
        <div class="ds-dim"></div>
        <div class="ds-vignette"></div>
        <div class="ds-edge"></div>
        <div class="ds-flash"></div>
        <div class="ds-hud">
          <div class="ds-pod ds-px">
            <div class="label">DEPTH</div>
            <div class="ds-depth-num">0m</div>
          </div>
          <div class="ds-hud-mid">
            <div class="ds-dots"></div>
            <div class="ds-prompt-count">SURFACE</div>
          </div>
          <div class="ds-pod ds-px ds-score-pod">
            <div class="label">SCORE</div>
            <div class="ds-score-num">0</div>
          </div>
        </div>
        <div class="ds-mascot" title="Click for a trick">
          <span class="ds-mascot-sprite">
            ${getBuddySvg(store.equippedBuddy, false, false)}
          </span>
          <span class="ds-blub">blub!</span>
        </div>
        <div class="ds-crt"></div>
      </div>
    `;

    const stageEl = rootEl.querySelector('.ds-stage');
    const seaCanvas = rootEl.querySelector('.ds-sea');
    const foreCanvas = rootEl.querySelector('.ds-fore');
    const worldEl = rootEl.querySelector('.ds-world');
    const dimEl = rootEl.querySelector('.ds-dim');
    const edgeEl = rootEl.querySelector('.ds-edge');
    const flashEl = rootEl.querySelector('.ds-flash');
    const crtEl = rootEl.querySelector('.ds-crt');
    const mascotEl = rootEl.querySelector('.ds-mascot');
    const mascotSprite = mascotEl.querySelector('.ds-mascot-sprite');
    const blubEl = rootEl.querySelector('.ds-blub');
    const depthNumEl = rootEl.querySelector('.ds-depth-num');
    const scoreNumEl = rootEl.querySelector('.ds-score-num');
    const dotsEl = rootEl.querySelector('.ds-dots');
    const promptCountEl = rootEl.querySelector('.ds-prompt-count');
    const surfaceEl = rootEl.querySelector('.ds-surface');
    const titleEl = rootEl.querySelector('.ds-title');

    function renderTitle(text = 'SHRIMPION') {
      titleEl.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${0.18 * i}s`;
        titleEl.appendChild(span);
      });
    }
    renderTitle('SHRIMPION');
    surfaceEl.style.top = '-336px';

    for (let i = 0; i < 7; i++) {
      dotsEl.appendChild(document.createElement('i'));
    }

    function buildAmbientMarkers() {
      worldEl.querySelectorAll('.ds-amb, .ds-amb-h').forEach((el) => el.remove());
      const isCinema = currentTheme === 'cinema';
      const isTrek = currentTheme === 'trek';
      const milestones = isCinema ? AMBIENT_CINEMA : (isTrek ? AMBIENT_TREK : AMBIENT_OCEAN);
      const unit = isCinema ? 'ft' : 'm';
      const horizonY = Math.floor((rootEl.clientHeight || window.innerHeight) * (isTrek ? 0.65 : 0.58));
      for (const [m, text, align, major] of milestones) {
        const amb = document.createElement('div');
        if (isCinema || isTrek) {
          amb.className = `ds-amb-h${major ? ' major' : ''}`;
          amb.innerHTML = `${isTrek ? '⛰️' : '★'} ${m}${unit} · ${text} ${isTrek ? '⛰️' : '★'}`;
          amb.style.left = `${2 * m}px`;
          amb.style.top = `${horizonY - 22}px`;
        } else {
          amb.className = `ds-amb ${align}${major ? ' major' : ''}`;
          amb.innerHTML = align === 'L' ? `<span class="dash">──</span> ${m}${unit} ${text}` : `${text} ${m}${unit} <span class="dash">──</span>`;
          amb.style.top = `${2 * m - 9}px`;
        }
        worldEl.appendChild(amb);
      }
    }
    buildAmbientMarkers();

    const seaCtx = seaCanvas.getContext('2d');
    const foreCtx = foreCanvas.getContext('2d');

    let width = rootEl.clientWidth || window.innerWidth;
    let height = rootEl.clientHeight || window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = rootEl.clientWidth || window.innerWidth;
      height = rootEl.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      seaCanvas.width = width * dpr;
      seaCanvas.height = height * dpr;
      seaCanvas.style.width = `${width}px`;
      seaCanvas.style.height = `${height}px`;
      seaCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seaCtx.imageSmoothingEnabled = false;

      foreCanvas.width = width * dpr;
      foreCanvas.height = height * dpr;
      foreCanvas.style.width = `${width}px`;
      foreCanvas.style.height = `${height}px`;
      foreCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      foreCtx.imageSmoothingEnabled = false;
    }
    resize();
    window.addEventListener('resize', resize);

    // Particles & Pixel-Art Sea Creatures
    const snowParticles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.3 + Math.random() * 0.7,
      size: Math.random() < 0.7 ? 2 : 3,
      alpha: 0.15 + Math.random() * 0.5,
      ph: Math.random() * Math.PI * 2
    }));

    const creatureTypes = ['fish', 'fish', 'jelly', 'turtle', 'ray', 'angler', 'fish', 'jelly'];
    const ambientFish = Array.from({ length: 8 }, (_, idx) => ({
      x: Math.random() * width,
      dOff: randRange(-220, 220),
      speed: randRange(16, 36) * (Math.random() < 0.5 ? -1 : 1),
      size: randRange(8, 14),
      ph: Math.random() * 9,
      type: creatureTypes[idx % creatureTypes.length]
    }));

    // Animation & Coordinates State
    let camDepth = -45;
    let targetCamDepth = -45;
    let smoothCamDepth = -45;
    let currentScore = 0;
    let displayedScore = 0;
    let currentMeters = 0;
    let displayedMeters = 0;
    let enginePhase = 'intro';
    let roundsDone = 0;
    let isUnlimited = false;
    let activeCardEl = null;
    let tierLineEls = [];
    let chipDepth = 0;
    let chipHorizontalOffset = 0;
    let isPlunging = false;
    let activeTier = null;
    let mascotX = width * 0.72;
    let mascotY = height * 0.5;
    let mascotRot = 0;
    let mascotPerchedIcon = null;
    let isGoldMascot = false;
    let lastMascotBubbleTime = 0;
    let tweens = [];
    let bubbleParticles = [];
    let sparkleParticles = [];
    let inkParticles = [];
    let orbitingShrimps = null;
    let orbitExpansion = 0;
    let carWorldD = -60;

    function addTween(duration, easeFn, onUpdate, onDone) {
      tweens.push({ t0: performance.now(), dur: duration, ease: easeFn, upd: onUpdate, done: onDone });
    }

    function screenY(meters) {
      return (meters - smoothCamDepth) * 2 + height / 2;
    }

    function screenX(feet) {
      return (feet - smoothCamDepth) * 2 + width / 2;
    }

    function clearTierLines(immediate = false) {
      if (immediate) {
        for (const tl of tierLineEls) tl.el.remove();
        worldEl.querySelectorAll('.ds-tierline').forEach((el) => el.remove());
        tierLineEls = [];
        return;
      }
      const toRemove = [...tierLineEls];
      tierLineEls = [];
      for (const tl of toRemove) {
        tl.el.style.transition = 'opacity 0.4s ease-out';
        tl.el.style.opacity = '0';
        setTimeout(() => tl.el.remove(), 450);
      }
      worldEl.querySelectorAll('.ds-tierline').forEach((el) => {
        el.style.transition = 'opacity 0.4s ease-out';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 450);
      });
    }

    function playMascotAnim(cls, durationMs) {
      mascotSprite.classList.remove('celebrate', 'faint', 'sad', 'roll', 'dart', 'jet', 'chomp');
      void mascotSprite.offsetWidth;
      mascotSprite.classList.add(cls);
      if (durationMs) {
        setTimeout(() => mascotSprite.classList.remove(cls), durationMs);
      }
    }

    function emitBubbles(x, y, count = 1, col = '200,235,255') {
      for (let i = 0; i < count; i++) {
        if (bubbleParticles.length > 90) break;
        const d = (smoothCamDepth + (y - height / 2) / 2);
        bubbleParticles.push({
          x: x + randRange(-3, 3),
          d: d,
          r: 1.5 + Math.random() * 2,
          speedD: 14 + Math.random() * 18,
          wobble: Math.random() * 9,
          life: 4,
          col: col
        });
      }
    }

    function emitSparkles(x, y, color = '#ffd166', count = 16) {
      const d = (smoothCamDepth + (y - height / 2) / 2);
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 40 + Math.random() * 120;
        sparkleParticles.push({
          x: x,
          d: d,
          vx: Math.cos(ang) * sp,
          vd: Math.sin(ang) * sp * 0.5,
          r: 1.5 + Math.random() * 2.5,
          life: 0.6 + Math.random() * 0.8,
          t: 0,
          color: color
        });
      }
    }

    function emitInk(x, y, count = 12) {
      const d = (smoothCamDepth + (y - height / 2) / 2);
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = randRange(8, 55);
        inkParticles.push({
          x: x,
          d: d,
          vx: Math.cos(ang) * sp,
          vd: Math.sin(ang) * sp * 0.5,
          r: randRange(14, 40),
          life: randRange(1.2, 2.0),
          t: 0
        });
      }
    }

    function triggerScreenShake() {
      stageEl.classList.remove('ds-shake');
      void stageEl.offsetWidth;
      stageEl.classList.add('ds-shake');
    }

    function triggerCrtZap() {
      crtEl.classList.remove('zap');
      void crtEl.offsetWidth;
      crtEl.classList.add('zap');
    }

    function triggerColorFlash(bgColor, times = 1, ms = 200) {
      flashEl.style.transition = 'none';
      flashEl.style.background = bgColor;
      flashEl.style.opacity = '0.45';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          flashEl.style.transition = `opacity ${ms}ms ease-out`;
          flashEl.style.opacity = '0';
        });
      });
    }

    function setSpotlight(x, y, radius = 66) {
      dimEl.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent ${radius}px, rgba(2,4,10,0.72) ${radius + 90}px, rgba(2,4,10,0.96) ${radius + 260}px)`;
    }

    function spawnSchoolerSwarm(duration = 2400) {
      if (currentTheme === 'cinema') {
        const busSvg = `<svg viewBox="0 0 28 12" shape-rendering="crispEdges" fill="currentColor">
          <rect x="2" y="4" width="22" height="5"/>
          <rect x="4" y="2" width="14" height="3" fill="#ffe8f5" opacity="0.35"/>
          <rect x="22" y="5" width="4" height="4"/>
          <rect x="25" y="6" width="2" height="2" fill="#ffd166"/>
          <rect x="1" y="5" width="2" height="2" fill="#ff2a6d"/>
          <rect x="5" y="8" width="4" height="3" fill="#08040e"/>
          <rect x="6" y="9" width="2" height="1" fill="#ffd166"/>
          <rect x="19" y="8" width="4" height="3" fill="#08040e"/>
          <rect x="20" y="9" width="2" height="1" fill="#ffd166"/>
        </svg>`;
        const count = width < 700 ? 5 : 8;
        for (let i = 0; i < count; i++) {
          const bus = document.createElement('div');
          bus.className = 'dr-swarm-bus';
          bus.innerHTML = busSvg;
          stageEl.appendChild(bus);
          const ltr = i % 2 === 0;
          const startX = ltr ? -90 : width + 90;
          const endX = ltr ? width + 90 : -90;
          const y = height * 0.76 + randRange(-26, 36);
          const delay = 140 * i;
          const dur = randRange(1300, 1900);
          bus.animate([
            { transform: `translate(${startX}px, ${y}px) scaleX(${ltr ? 1 : -1})` },
            { transform: `translate(${endX}px, ${y}px) scaleX(${ltr ? 1 : -1})` }
          ], { duration: dur, delay: delay, easing: 'linear', fill: 'both' });
          setTimeout(() => bus.remove(), delay + dur + 100);
        }
        return;
      }
      const count = width < 700 ? 8 : 12;
      for (let i = 0; i < count; i++) {
        const fish = document.createElement('div');
        fish.className = 'ds-swarm-fish';
        fish.innerHTML = getTierSvg('schooler');
        stageEl.appendChild(fish);
        const ltr = i % 2 === 0;
        const startX = ltr ? -60 : width + 60;
        const endX = ltr ? width + 60 : -60;
        const y = height * 0.42 + randRange(-120, 120);
        const delay = 100 * i;
        const dur = randRange(1400, 2000);
        fish.animate([
          { transform: `translate(${startX}px, ${y}px) scaleX(${ltr ? 1 : -1})` },
          { transform: `translate(${(startX + endX) / 2}px, ${height * 0.42 + randRange(-30, 30)}px) scaleX(${ltr ? 1 : -1}) rotate(${randRange(-12, 12)}deg)`, offset: 0.5 },
          { transform: `translate(${endX}px, ${y + randRange(-50, 50)}px) scaleX(${ltr ? 1 : -1})` }
        ], { duration: dur, delay: delay, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'both' });
        setTimeout(() => fish.remove(), delay + dur + 100);
      }
    }

    function updateHud() {
      const isCinema = currentTheme === 'cinema';
      const isTrek = currentTheme === 'trek';
      const depthPodLabel = rootEl.querySelector('.ds-hud .ds-pod .label');
      if (depthPodLabel) {
        depthPodLabel.textContent = isCinema ? 'BLOCK' : (isTrek ? 'ELEVATION' : 'DEPTH');
      }
      const targetStr = isCinema
        ? `${Math.floor(Math.max(0, displayedMeters) / 100)} (${Math.round(displayedMeters).toLocaleString()}ft)`
        : (isTrek ? `+${Math.round(displayedMeters).toLocaleString()}m` : `${Math.round(displayedMeters).toLocaleString()}m`);
      if (depthNumEl.textContent !== targetStr) {
        depthNumEl.textContent = targetStr;
      }
      scoreNumEl.textContent = String(Math.round(displayedScore));

      if (isUnlimited) {
        dotsEl.innerHTML = '<span style="color: var(--color-lumen-cyan); font-size: 20px; line-height: 10px;">∞</span>';
        promptCountEl.textContent = enginePhase === 'intro' ? (isCinema ? 'HOLLYWOOD' : (isTrek ? 'BASE CAMP' : 'SURFACE')) : `UNLIMITED · PROMPT ${roundsDone + 1}`;
      } else {
        const total = isCinema ? 10 : 7;
        if (dotsEl.children.length !== total) {
          dotsEl.innerHTML = '';
          for (let i = 0; i < total; i++) dotsEl.appendChild(document.createElement('i'));
        }
        Array.from(dotsEl.children).forEach((dot, idx) => {
          dot.className = idx < roundsDone ? 'done' : (idx === roundsDone && enginePhase !== 'intro' ? 'cur' : '');
        });
        promptCountEl.textContent = enginePhase === 'intro'
          ? (isCinema ? 'HOLLYWOOD' : (isTrek ? 'BASE CAMP' : 'SURFACE'))
          : (roundsDone >= total
            ? (isCinema ? 'WRAP' : (isTrek ? 'EXPEDITION SUMMIT' : 'DIVE COMPLETE'))
            : `${isCinema ? 'SCENE' : (isTrek ? 'LEG' : 'PROMPT')} ${Math.min(roundsDone + 1, total)} OF ${total}`);
      }
    }

    function updateMascotSprite() {
      const isCinema = currentTheme === 'cinema';
      const isTrek = currentTheme === 'trek';
      mascotEl.classList.toggle('cinema-car', isCinema && (store.equippedBuddy === 'shrimp' || store.equippedBuddy === 'golden'));
      mascotEl.classList.toggle('trek-hiker', isTrek && (store.equippedBuddy === 'shrimp' || store.equippedBuddy === 'golden'));
      mascotSprite.innerHTML = getBuddySvg(store.equippedBuddy, isGoldMascot, isCinema, isTrek);
      blubEl.textContent = isCinema ? 'vroom!' : (isTrek ? 'onward!' : (BUDDIES.find((b) => b.id === store.equippedBuddy)?.blub || 'blub!'));
    }

    // Mascot Tap Trick
    mascotEl.addEventListener('click', () => {
      audio.event('blub');
      const isCinema = currentTheme === 'cinema';
      const isTrek = currentTheme === 'trek';
      const buddy = BUDDIES.find((b) => b.id === store.equippedBuddy) || BUDDIES[0];
      playMascotAnim(buddy.poke, buddy.pokeMs);
      blubEl.textContent = isCinema ? 'vroom!' : (isTrek ? 'onward!' : buddy.blub);
      blubEl.classList.remove('show');
      void blubEl.offsetWidth;
      blubEl.classList.add('show');
      emitBubbles(mascotX + 15, mascotY - 10, 6);
      emitSparkles(mascotX, mascotY, isGoldMascot ? '#ffd166' : buddy.color, 12);
    });

    // --- Genuine Pixel-Art Engine & Procedural Asset Caching ---
    const PIXEL_FONT = {
      A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
      B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
      C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
      D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
      E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
      F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
      G: ['01111', '10000', '10000', '10111', '10001', '10001', '01110'],
      H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
      I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
      J: ['00111', '00010', '00010', '00010', '00010', '10010', '01100'],
      K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
      L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
      M: ['10001', '11011', '10101', '10001', '10001', '10001', '10001'],
      N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
      O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
      P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
      Q: ['01110', '10001', '10001', '10001', '10101', '10011', '01111'],
      R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
      S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
      T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
      U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
      V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
      W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
      X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
      Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
      Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
      '0': ['01110', '10011', '10101', '11001', '10001', '10001', '01110'],
      '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
      '2': ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
      '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
      '4': ['10001', '10001', '10001', '11111', '00001', '00001', '00001'],
      '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
      '6': ['01110', '10000', '11110', '10001', '10001', '10001', '01110'],
      '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
      '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
      '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
      '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
      '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
      "'": ['01100', '01100', '00100', '00000', '00000', '00000', '00000'],
      '★': ['00100', '01110', '11111', '01110', '10001', '10001', '00000'],
      '/': ['00001', '00010', '00100', '01000', '10000', '00000', '00000']
    };

    function drawPixelText(ctx, str, x, y, scale = 2, col = '#ffffff', shadowCol = null) {
      let curX = Math.floor(x);
      const startY = Math.floor(y);
      for (const ch of str.toUpperCase()) {
        if (ch === ' ') { curX += scale * 4; continue; }
        const rows = PIXEL_FONT[ch];
        if (rows) {
          for (let r = 0; r < rows.length; r++) {
            for (let c = 0; c < rows[r].length; c++) {
              if (rows[r][c] === '1') {
                if (shadowCol) {
                  ctx.fillStyle = shadowCol;
                  ctx.fillRect(curX + c * scale + scale, startY + r * scale + scale, scale, scale);
                }
                ctx.fillStyle = col;
                ctx.fillRect(curX + c * scale, startY + r * scale, scale, scale);
              }
            }
          }
          curX += (rows[0].length + 1) * scale;
        } else {
          curX += scale * 4;
        }
      }
      return curX;
    }

    const pseudoRand = (seed) => {
      const t = 43758.5453 * Math.sin(127.1 * seed + 3.7);
      return t - Math.floor(t);
    };
    const pseudoNoise2D = (x, y) => pseudoRand(x + 7919 * y);

    let cachedCinemaTile = null;
    let cachedCinemaTileKey = '';

    function getCinemaTile(w, h, currentDpr) {
      const key = `${w}x${h}@${currentDpr}`;
      if (cachedCinemaTile && cachedCinemaTileKey === key) return cachedCinemaTile;

      const sidewalkY = Math.round(0.58 * h);
      const roadY = Math.round(0.70 * h);
      const sidewalkH = roadY - sidewalkY;
      const roadH = h - roadY;
      const totalH = sidewalkH + roadH;

      const tile = document.createElement('canvas');
      tile.width = 1400 * currentDpr;
      tile.height = totalH * currentDpr;
      const ctx = tile.getContext('2d');
      ctx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);
      ctx.imageSmoothingEnabled = false;

      const fillPx = (x, y, w, h, col) => {
        ctx.fillStyle = col;
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
      };

      // 1. Slabs with varied slate-purple colors
      const slabs = [];
      for (let e = 0; e <= 14; e++) {
        slabs.push(100 * e + Math.round((pseudoRand(2.3 * e + 1) - 0.5) * 36));
      }
      const slabColors = ['#2a2043', '#2d2347', '#281f40', '#2b2145', '#2e2449'];
      for (let e = 0; e < slabs.length - 1; e++) {
        const sx = slabs[e];
        const sw = slabs[e + 1] - sx;
        fillPx(sx, 0, sw, sidewalkH, slabColors[Math.floor(pseudoRand(5.9 * e + 2) * slabColors.length)]);
      }

      // 2. Per-pixel speckle dither texture
      for (let y = 0; y < sidewalkH; y += 2) {
        for (let x = 0; x < 1400; x += 2) {
          const n = pseudoNoise2D(x, y);
          if (n < 0.05) fillPx(x, y, 2, 2, '#362b52');
          else if (n < 0.08) fillPx(x, y, 2, 2, '#1f1836');
          else if (n < 0.09) fillPx(x, y, 2, 2, '#463a68');
        }
      }

      // 3. Slab joints, cracks & Walk of Fame stars
      for (let e = 0; e < slabs.length - 1; e++) {
        const sx = slabs[e];
        const ex = slabs[e + 1];
        const r = pseudoRand(3.1 * e);
        fillPx(sx, 0, 2, sidewalkH, '#170f2b');
        fillPx(sx + 2, 0, 2, sidewalkH, '#3b2f58');

        // Cracks in slab
        if (r > 0.75) {
          const crackY = Math.floor(pseudoRand(7.7 * e) * sidewalkH * 0.6) + 4;
          for (let x = sx + 6; x < ex - 6; x += 3) {
            fillPx(x, crackY + Math.round(1.5 * Math.sin(0.4 * x)), 3, 2, '#1c1533');
          }
        }

        // Walk of Fame 5-pointed star
        if (r >= 0.14) {
          const starX = Math.round((sx + ex) / 2 + (pseudoRand(1.7 * e + 4) - 0.5) * 16);
          const starY = Math.round(0.55 * sidewalkH);
          const starSize = Math.min(11, Math.round(0.16 * sidewalkH));

          fillPx(starX - starSize - 3, starY - starSize - 1, (starSize + 3) * 2, (starSize + 1) * 2, '#1a102b');
          fillPx(starX - starSize - 2, starY - starSize, (starSize + 2) * 2, starSize * 2, '#5e4c27');
          fillPx(starX - starSize - 1, starY - starSize + 1, (starSize + 1) * 2, starSize * 2 - 2, '#8a733d');
          fillPx(starX - starSize, starY - starSize + 2, starSize * 2, starSize * 2 - 4, '#311b40');

          ctx.fillStyle = '#ff7aa8';
          for (let dy = -starSize + 2; dy <= starSize - 2; dy += 2) {
            const span = Math.round((starSize - 2 - Math.abs(dy) * 0.45));
            if (span > 0) fillPx(starX - span, starY + dy, span * 2, 2, '#ff7aa8');
          }
          fillPx(starX - 2, starY - 1, 4, 3, '#ffd166');
          fillPx(starX - 8, starY + starSize + 1, 16, 3, '#5e4c27');
          fillPx(starX - 7, starY + starSize + 2, 14, 1, '#8a733d');
        }
      }

      // 4. Sidewalk Props (Krillion's exact 5 props)
      const drawSidewalkProp = (type, px) => {
        const baseGroundY = sidewalkH - 10;
        fillPx(px - 1, baseGroundY + 8, type === 4 ? 16 : 10, 2, 'rgba(0,0,0,0.5)');
        if (type === 0) {
          // Red fire hydrant
          fillPx(px + 2, baseGroundY - 12, 3, 2, '#d04a58');
          fillPx(px + 1, baseGroundY - 10, 5, 3, '#d04a58');
          fillPx(px + 1, baseGroundY - 7, 5, 12, '#b3323f');
          fillPx(px, baseGroundY - 4, 7, 3, '#8c2431');
          fillPx(px + 2, baseGroundY - 7, 2, 10, '#d86470');
          fillPx(px + 3, baseGroundY - 14, 2, 2, '#ffffff');
        } else if (type === 1) {
          // Ribbed metal trash can
          fillPx(px - 1, baseGroundY - 9, 11, 3, '#3f4c5e');
          fillPx(px, baseGroundY - 6, 9, 12, '#2f3a4a');
          fillPx(px + 1, baseGroundY - 5, 2, 10, '#1e2632');
          fillPx(px + 4, baseGroundY - 5, 2, 10, '#1e2632');
          fillPx(px + 7, baseGroundY - 5, 2, 10, '#3a4759');
        } else if (type === 2) {
          // Blue newspaper vending box
          fillPx(px, baseGroundY - 10, 10, 15, '#2a5b8f');
          fillPx(px + 1, baseGroundY - 9, 8, 6, '#c9d9f5');
          fillPx(px + 2, baseGroundY - 8, 6, 2, '#7f93b8');
          fillPx(px, baseGroundY + 5, 10, 2, '#132a45');
          fillPx(px + 8, baseGroundY - 10, 2, 15, '#1c4470');
        } else if (type === 3) {
          // Coin parking meter
          fillPx(px + 2, baseGroundY - 4, 3, 12, '#5a5a6a');
          fillPx(px + 1, baseGroundY - 10, 5, 6, '#8a8a9a');
          fillPx(px + 2, baseGroundY - 9, 3, 3, '#ffd166');
        } else {
          // Potted shrub planter box
          fillPx(px, baseGroundY - 2, 16, 8, '#4a3a2a');
          fillPx(px, baseGroundY - 2, 16, 2, '#6a5438');
          fillPx(px + 2, baseGroundY - 9, 12, 8, '#173a2a');
          fillPx(px + 3, baseGroundY - 12, 10, 5, '#1f4a34');
          fillPx(px + 5, baseGroundY - 14, 6, 3, '#27573d');
        }
      };

      for (let e = 0; e < 5; e++) {
        drawSidewalkProp(Math.floor(5 * pseudoRand(8.3 * e + 5)), 70 + 270 * e + Math.floor(120 * pseudoRand(6.7 * e)));
      }

      // 5. Curb edge & Granite joint lines
      fillPx(0, sidewalkH - 7, 1400, 2, '#7a6a94');
      fillPx(0, sidewalkH - 5, 1400, 2, '#574868');
      fillPx(0, sidewalkH - 3, 1400, 3, '#1a1230');
      for (let e = 0; e < 1400; e += 90) {
        fillPx(e, sidewalkH - 7, 2, 7, '#120c22');
      }

      // 6. Asphalt Roadbed
      fillPx(0, sidewalkH, 1400, 2, '#050310');
      fillPx(0, sidewalkH + 2, 1400, 1, 'rgba(206,220,255,0.09)');
      fillPx(0, sidewalkH + 3, 1400, roadH - 3, '#100b1b');

      for (let y = sidewalkH + 3; y < totalH; y += 2) {
        for (let x = 0; x < 1400; x += 2) {
          const n = pseudoNoise2D(x + 31, y);
          if (n < 0.05) fillPx(x, y, 2, 2, 'rgba(60,48,80,0.35)');
          else if (n < 0.09) fillPx(x, y, 2, 2, 'rgba(3,2,8,0.5)');
        }
      }

      // Asphalt repair patches
      for (let e = 0; e < 7; e++) {
        const pw = 40 + Math.floor(100 * pseudoRand(7.7 * e));
        const ph = 6 + Math.floor(9 * pseudoRand(3.3 * e));
        const px = Math.floor(pseudoRand(11.3 * e + 2) * (1400 - pw));
        const py = sidewalkH + 12 + Math.floor(pseudoRand(6.1 * e + 3) * (roadH - 30));
        fillPx(px, py, pw, ph, 'rgba(20,14,32,0.85)');
        fillPx(px, py, pw, 2, 'rgba(60,48,80,0.45)');
      }

      // Curb storm drain grates
      for (const gx of [180, 880]) {
        fillPx(gx, sidewalkH + 1, 36, 6, '#04030a');
        for (let t = 0; t < 6; t++) {
          fillPx(gx + 3 + 5 * t, sidewalkH + 2, 3, 4, '#181026');
        }
      }

      // Circular pixel manhole cover
      const mhY = Math.round(sidewalkH + 0.48 * roadH);
      fillPx(682, mhY - 8, 36, 16, '#2b2242');
      fillPx(684, mhY - 6, 32, 12, '#0f0b19');
      fillPx(688, mhY - 4, 24, 8, '#2b2242');
      fillPx(690, mhY - 2, 20, 4, '#0f0b19');

      // Dashed Yellow Center Lane Lines
      const laneOffset = Math.round(0.862 * h) - roadY;
      for (let e = 0; e < 20; e++) {
        const lx = 70 * e + 15;
        const lr = pseudoRand(4.7 * e + 9);
        const alpha = lr < 0.2 ? 0.35 : 0.9;
        fillPx(lx, sidewalkH + laneOffset - 2, 32, 3, `rgba(232,190,96,${alpha})`);
        fillPx(lx, sidewalkH + laneOffset + 1, 32, 1, `rgba(120,92,40,${alpha})`);
        if (lr > 0.6) {
          fillPx(lx + 10 + Math.floor(10 * lr), sidewalkH + laneOffset - 2, 4, 4, 'rgba(16,11,27,0.9)');
        }
      }

      cachedCinemaTile = tile;
      cachedCinemaTileKey = key;
      return tile;
    }

    function drawPixelCreature(ctx, type, x, y, size, facing, ph, now) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      const dir = facing >= 0 ? 1 : -1;
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(dir, 1);

      if (type === 'fish') {
        const wag = Math.sin(now * 0.008 + ph) * 2;
        for (let f = 0; f < 3; f++) {
          const ox = f === 0 ? 0 : (f === 1 ? -16 : -22);
          const oy = f === 0 ? 0 : (f === 1 ? -10 : 8);
          ctx.fillStyle = f === 0 ? '#4de3ff' : '#38b2d6';
          ctx.fillRect(ox - 6, oy - 3, 10, 6);
          ctx.fillRect(ox + 4, oy - 2, 4, 4);
          ctx.fillRect(ox - 10, oy - 4 + wag, 4, 8);
          ctx.fillStyle = '#050a14';
          ctx.fillRect(ox + 4, oy - 1, 2, 2);
        }
      } else if (type === 'jelly') {
        const pulse = Math.sin(now * 0.004 + ph);
        const jw = Math.round(14 + pulse * 2);
        const jh = Math.round(10 - pulse * 2);
        ctx.fillStyle = 'rgba(180, 130, 255, 0.75)';
        ctx.fillRect(-jw / 2, -jh, jw, jh);
        ctx.fillStyle = 'rgba(255, 180, 240, 0.9)';
        ctx.fillRect(-jw / 2 + 2, -jh + 2, jw - 4, 3);
        for (let t = -jw / 2 + 2; t <= jw / 2 - 2; t += 3) {
          const twag = Math.sin(now * 0.005 + ph + t) * 3;
          ctx.fillStyle = 'rgba(180, 130, 255, 0.6)';
          ctx.fillRect(t + twag, 0, 2, 12);
          ctx.fillRect(t + twag * 1.5, 12, 2, 8);
        }
      } else if (type === 'turtle') {
        const flipper = Math.sin(now * 0.004 + ph) * 4;
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(-12, -8, 22, 16);
        ctx.fillStyle = '#1e824c';
        ctx.fillRect(-8, -6, 14, 12);
        ctx.fillStyle = '#f39c12';
        ctx.fillRect(-5, -4, 8, 8);
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(10, -4, 6, 8);
        ctx.fillStyle = '#050a14';
        ctx.fillRect(13, -2, 2, 2);
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(2, -14 + flipper, 8, 6);
        ctx.fillRect(2, 8 - flipper, 8, 6);
        ctx.fillRect(-12, -10, 5, 4);
        ctx.fillRect(-12, 6, 5, 4);
      } else if (type === 'ray') {
        const wing = Math.sin(now * 0.004 + ph) * 3;
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(-12, -4, 24, 8);
        ctx.fillRect(-6, -12 + wing, 12, 8);
        ctx.fillRect(-6, 4 - wing, 12, 8);
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(12, -3, 4, 6);
        ctx.fillStyle = '#1a252f';
        ctx.fillRect(-22, -1, 10, 2);
      } else if (type === 'angler') {
        ctx.fillStyle = '#1b1b2f';
        ctx.fillRect(-14, -10, 24, 20);
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(4, -6, 2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(8, -4, 4, 2);
        ctx.fillRect(10, 0, 4, 2);
        ctx.fillRect(8, 4, 4, 2);
        ctx.fillStyle = '#162447';
        ctx.fillRect(-20, -7, 6, 14);
        ctx.strokeStyle = '#e43f5a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(2, -10);
        ctx.lineTo(8, -18);
        ctx.lineTo(14, -14);
        ctx.stroke();
        const glow = 0.6 + 0.4 * Math.sin(now * 0.008 + ph);
        ctx.fillStyle = `rgba(255, 235, 120, ${glow})`;
        ctx.fillRect(13, -16, 5, 5);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(14, -15, 3, 3);
      }
      ctx.restore();
    }

    function drawOceanLandmarks(ctx, w, h, now) {
      // 1. Surface (0m): Research Vessel / Dive Ship
      const surfY = screenY(0);
      if (surfY > -120 && surfY < h + 120) {
        const shipX = Math.floor(w * 0.5 - 75);
        const shipY = Math.floor(surfY - 28 + 2 * Math.sin(now * 0.002));
        ctx.fillStyle = '#b71c1c';
        ctx.fillRect(shipX, shipY + 12, 130, 16);
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(shipX + 10, shipY + 4, 110, 8);
        ctx.fillStyle = '#b71c1c';
        ctx.fillRect(shipX + 130, shipY + 12, 12, 8);
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(shipX + 30, shipY - 12, 54, 16);
        ctx.fillStyle = '#29b6f6';
        for (let wx = shipX + 36; wx < shipX + 78; wx += 8) {
          ctx.fillRect(wx, shipY - 8, 5, 6);
        }
        ctx.fillStyle = '#37474f';
        ctx.fillRect(shipX + 54, shipY - 26, 3, 14);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(shipX + 50, shipY - 28, 11, 3);
        ctx.fillStyle = '#ff9800';
        ctx.fillRect(shipX + 8, shipY - 16, 4, 20);
        ctx.fillRect(shipX + 8, shipY - 16, 18, 4);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shipX + 22, shipY - 12);
        ctx.lineTo(w / 2, h);
        ctx.stroke();
        drawPixelText(ctx, 'R/V SHRIMPION', shipX + 16, shipY + 16, 1, '#ffffff');
      }

      // 2. 200m: Scuba Diver & Shark Cage
      const y200 = screenY(200);
      if (y200 > -80 && y200 < h + 80) {
        const cageX = Math.floor(w * 0.25);
        ctx.strokeStyle = '#78909c';
        ctx.lineWidth = 2;
        ctx.strokeRect(cageX - 16, y200 - 24, 32, 48);
        for (let b = -10; b <= 10; b += 7) {
          ctx.beginPath();
          ctx.moveTo(cageX + b, y200 - 24);
          ctx.lineTo(cageX + b, y200 + 24);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(cageX, -50);
        ctx.lineTo(cageX, y200 - 24);
        ctx.stroke();

        const diverX = cageX + 44;
        const diverY = y200 + Math.sin(now * 0.003) * 6;
        ctx.fillStyle = '#263238';
        ctx.fillRect(diverX, diverY, 18, 8);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(diverX + 6, diverY - 4, 8, 4);
        ctx.fillStyle = '#ffab91';
        ctx.fillRect(diverX + 18, diverY + 1, 5, 5);
        ctx.fillStyle = '#37474f';
        ctx.fillRect(diverX - 8, diverY + 1, 8, 4);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let b = 1; b <= 4; b++) {
          ctx.fillRect(diverX + 22 + b * 2, diverY - b * 8 - (now * 0.02 % 12), 2, 2);
        }
      }

      // 3. 500m: Yellow Research Submersible ALVIN
      const y500 = screenY(500);
      if (y500 > -80 && y500 < h + 80) {
        const subX = Math.floor(w * 0.72);
        const subY = Math.floor(y500 + Math.sin(now * 0.002) * 8);
        ctx.fillStyle = '#ffc107';
        ctx.fillRect(subX - 26, subY - 14, 52, 28);
        ctx.fillRect(subX + 26, subY - 8, 8, 16);
        ctx.fillRect(subX - 16, subY - 20, 28, 6);
        ctx.fillStyle = '#0288d1';
        ctx.fillRect(subX + 16, subY - 6, 8, 8);
        ctx.fillRect(subX + 6, subY - 6, 6, 6);
        ctx.fillStyle = '#37474f';
        ctx.fillRect(subX - 32, subY - 4, 6, 8);
        ctx.strokeStyle = '#546e7a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(subX + 24, subY + 8);
        ctx.lineTo(subX + 38, subY + 14);
        ctx.lineTo(subX + 44, subY + 8);
        ctx.stroke();

        const beamGrad = ctx.createLinearGradient(subX + 32, subY - 2, subX + 180, subY - 2);
        beamGrad.addColorStop(0, 'rgba(255, 245, 180, 0.45)');
        beamGrad.addColorStop(1, 'rgba(255, 245, 180, 0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(subX + 32, subY - 4);
        ctx.lineTo(subX + 180, subY - 36);
        ctx.lineTo(subX + 180, subY + 32);
        ctx.lineTo(subX + 32, subY + 2);
        ctx.closePath();
        ctx.fill();

        drawPixelText(ctx, 'ALVIN', subX - 12, subY - 2, 1, '#050a14');
      }

      // 4. 1,000m: Giant Squid vs Sperm Whale
      const y1000 = screenY(1000);
      if (y1000 > -120 && y1000 < h + 120) {
        const sqX = Math.floor(w * 0.35);
        const sqY = Math.floor(y1000);
        ctx.fillStyle = 'rgba(168, 24, 48, 0.65)';
        ctx.fillRect(sqX - 18, sqY - 14, 36, 18);
        ctx.fillRect(sqX - 28, sqY - 8, 10, 8);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(sqX + 12, sqY - 10, 4, 4);
        ctx.strokeStyle = 'rgba(168, 24, 48, 0.65)';
        ctx.lineWidth = 2.5;
        for (let t = -8; t <= 8; t += 4) {
          ctx.beginPath();
          ctx.moveTo(sqX + 18, sqY + t);
          ctx.lineTo(sqX + 48, sqY + t + Math.sin(now * 0.003 + t) * 8);
          ctx.lineTo(sqX + 78, sqY + t * 1.5 + Math.cos(now * 0.002 + t) * 12);
          ctx.stroke();
        }

        const whX = Math.floor(w * 0.78);
        const whY = Math.floor(y1000 - 15);
        ctx.fillStyle = 'rgba(8, 16, 32, 0.85)';
        ctx.fillRect(whX - 60, whY - 20, 80, 36);
        ctx.fillRect(whX - 95, whY - 12, 35, 20);
        ctx.fillRect(whX - 120, whY - 22, 25, 40);
      }

      // 5. 2,200m: Hydrothermal Black Smokers
      const y2200 = screenY(2200);
      if (y2200 > -120 && y2200 < h + 120) {
        const ventX = Math.floor(w * 0.45);
        ctx.fillStyle = '#1c1b22';
        ctx.fillRect(ventX - 30, y2200, 60, 45);
        ctx.fillRect(ventX - 16, y2200 - 24, 18, 24);
        ctx.fillRect(ventX + 8, y2200 - 16, 14, 16);
        ctx.fillStyle = '#b8860b';
        ctx.fillRect(ventX - 18, y2200 - 26, 22, 3);
        ctx.fillRect(ventX + 6, y2200 - 18, 18, 3);

        for (let p = 0; p < 14; p++) {
          const py = y2200 - 26 - (now * 0.04 + p * 9) % 80;
          const px = ventX - 8 + Math.sin(now * 0.003 + p) * (10 + p * 1.5);
          ctx.fillStyle = `rgba(18, 14, 24, ${Math.max(0, 0.8 - p * 0.05)})`;
          ctx.fillRect(px, py, 4 + p * 0.8, 4 + p * 0.8);
        }

        for (let tw = -28; tw <= 28; tw += 5) {
          const th = 14 + Math.sin(tw * 7) * 6;
          ctx.fillStyle = '#ecf0f1';
          ctx.fillRect(ventX + tw, y2200 + 45 - th, 2, th);
          ctx.fillStyle = '#e74c3c';
          ctx.fillRect(ventX + tw - 1, y2200 + 45 - th - 4, 4, 5);
        }
      }

      // 6. 3,800m: RMS Titanic Bow Wreck
      const yTitanic = screenY(3800);
      if (yTitanic > -140 && yTitanic < h + 140) {
        const tx = Math.floor(w * 0.5);
        const ty = Math.floor(yTitanic);
        ctx.fillStyle = '#060a12';
        ctx.fillRect(tx - 150, ty + 24, 300, 20);

        ctx.fillStyle = '#0d1522';
        ctx.fillRect(tx - 120, ty - 14, 180, 38);
        for (let s = 0; s < 12; s++) {
          ctx.fillRect(tx - 120 - s * 3, ty - 14 + s * 3, 4, 38 - s * 2);
        }
        ctx.fillStyle = '#1c2432';
        ctx.fillRect(tx - 140, ty - 18, 160, 5);
        ctx.fillStyle = '#8a4b27';
        for (let r = -140; r < 20; r += 6) {
          ctx.fillRect(tx + r, ty - 22, 2, 4);
          ctx.fillRect(tx + r, ty - 13, 2, 5 + ((r * 17) % 7));
        }
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(tx - 138, ty - 4, 6, 8);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(tx + 4, ty - 26, 3, 8);
        ctx.fillStyle = '#111822';
        for (let f = 0; f < 3; f++) {
          ctx.fillRect(tx - 70 + f * 34, ty - 34, 12, 16);
        }
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(tx - 86, ty - 48, 3, 30);
        ctx.fillRect(tx - 90, ty - 38, 11, 4);

        drawPixelText(ctx, 'RMS TITANIC', tx - 60, ty + 6, 1, 'rgba(255,255,255,0.7)', '#000000');
      }

      // 7. 6,000m: Sunken Spanish Treasure Galleon
      const y6000 = screenY(6000);
      if (y6000 > -120 && y6000 < h + 120) {
        const gx = Math.floor(w * 0.45);
        const gy = Math.floor(y6000);
        ctx.fillStyle = '#2d1810';
        ctx.fillRect(gx - 70, gy - 6, 140, 24);
        for (let rib = -60; rib <= 60; rib += 12) {
          ctx.fillRect(gx + rib, gy - 20, 4, 20);
        }
        ctx.fillStyle = '#b8860b';
        ctx.fillRect(gx - 34, gy + 4, 18, 5);
        ctx.fillRect(gx + 16, gy + 8, 18, 5);
        ctx.fillStyle = '#4a2511';
        ctx.fillRect(gx + 48, gy - 10, 20, 14);
        ctx.fillStyle = '#b8860b';
        ctx.fillRect(gx + 46, gy - 14, 24, 5);
        for (let g = 0; g < 6; g++) {
          const spark = 0.5 + 0.5 * Math.sin(now * 0.006 + g);
          ctx.fillStyle = `rgba(255, 209, 102, ${spark})`;
          ctx.fillRect(gx + 50 + g * 3, gy - 8, 2, 2);
        }
      }

      // 8. 10,900m: Challenger Deep — Trieste Bathyscaphe
      const yTrench = screenY(10900);
      if (yTrench > -140 && yTrench < h + 140) {
        const bx = Math.floor(w * 0.5);
        const by = Math.floor(yTrench);
        ctx.fillStyle = '#040208';
        ctx.fillRect(0, by + 20, w, h - by);

        for (let c = -140; c <= 140; c += 28) {
          const glow = 0.5 + 0.5 * Math.sin(now * 0.004 + c);
          ctx.fillStyle = `rgba(77, 227, 255, ${glow})`;
          ctx.fillRect(bx + c, by + 14, 4, 8);
          ctx.fillRect(bx + c + 2, by + 8, 3, 14);
          ctx.fillStyle = `rgba(255, 93, 143, ${glow * 0.8})`;
          ctx.fillRect(bx + c + 8, by + 12, 3, 10);
        }

        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(bx - 45, by - 14, 90, 26);
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(bx - 14, by + 4, 28, 22);
        ctx.fillStyle = '#0288d1';
        ctx.fillRect(bx - 4, by + 10, 8, 8);
        ctx.fillStyle = 'rgba(77, 227, 255, 0.45)';
        ctx.fillRect(bx - 30, by + 18, 60, 6);

        drawPixelText(ctx, 'TRIESTE 10916M', bx - 55, by - 22, 1, '#ffd166');
      }
    }

    function drawOceanReefAndWalls(ctx, w, h, camD, now) {
      const rockCol = '#050c18';
      const ledgeStep = 24;
      for (let y = 0; y < h; y += ledgeStep) {
        const d = camD + (y - h / 2) / 2;
        const leftW = Math.floor(18 + 12 * Math.sin(d * 0.02) + 6 * Math.sin(d * 0.05));
        const rightW = Math.floor(18 + 12 * Math.cos(d * 0.02) + 6 * Math.cos(d * 0.05));

        ctx.fillStyle = rockCol;
        ctx.fillRect(0, y, leftW, ledgeStep);
        ctx.fillRect(w - rightW, y, rightW, ledgeStep);

        if (d >= 0 && d <= 350) {
          const kelpSway = Math.sin(now * 0.003 + y * 0.05) * 6;
          ctx.fillStyle = '#1e824c';
          ctx.fillRect(leftW + kelpSway, y, 3, ledgeStep);
          ctx.fillRect(w - rightW - kelpSway - 3, y, 3, ledgeStep);
          ctx.fillStyle = '#27ae60';
          ctx.fillRect(leftW + kelpSway + 3, y + 4, 6, 3);
          ctx.fillRect(w - rightW - kelpSway - 9, y + 10, 6, 3);

          if (y % 48 === 0) {
            ctx.fillStyle = '#ff7aa8';
            ctx.fillRect(leftW - 4, y - 6, 8, 6);
            ctx.fillStyle = '#ff9f43';
            ctx.fillRect(w - rightW - 4, y - 6, 8, 6);
          }
        }
      }
    }

    // Main Canvas Render Loop
    function renderFrame(now) {
      for (let i = tweens.length - 1; i >= 0; i--) {
        const tw = tweens[i];
        const progress = (now - tw.t0) / tw.dur;
        if (progress >= 1) {
          tw.upd(tw.ease(1));
          tweens.splice(i, 1);
          if (tw.done) tw.done();
        } else {
          tw.upd(tw.ease(Math.max(0, progress)));
        }
      }

      targetCamDepth += (camDepth - targetCamDepth) * 0.12;
      smoothCamDepth = targetCamDepth + (store.lowPower ? 0 : 2.0 * Math.sin(now * 0.001));

      if (currentTheme === 'cinema' || currentTheme === 'trek') {
        worldEl.style.transform = `translate3d(${width / 2 - 2 * smoothCamDepth}px, 0, 0)`;
      } else {
        worldEl.style.transform = `translate3d(0, ${height / 2 - 2 * smoothCamDepth}px, 0)`;
      }

      // Background Sea/Cinema Canvas
      seaCtx.clearRect(0, 0, width, height);

      if (currentTheme === 'trek') {
        // --- HORIZONTAL MOUNTAIN EXPEDITION / GEOGRAPHY TREK WORLD (Krillion Alpine Trek) ---
        const trailY = Math.floor(height * 0.68);

        // 1. Alpine Twilight-to-Dawn Sky Gradient (Deep sapphire down to warm sunrise gold)
        const skyBands = ['#080e1a', '#0d182b', '#13233d', '#1d3557', '#2a4d70', '#5c677d', '#b08968', '#ddb892'];
        const skyBandH = Math.floor(trailY / skyBands.length);
        for (let b = 0; b < skyBands.length; b++) {
          const sy = b * skyBandH;
          const sh = (b === skyBands.length - 1) ? (trailY - sy) : skyBandH;
          seaCtx.fillStyle = skyBands[b];
          seaCtx.fillRect(0, sy, width, sh);
        }

        // 2. High Alpine Crescent Moon
        const moonX = Math.floor(width * 0.78);
        const moonY = Math.floor(height * 0.16);
        seaCtx.fillStyle = '#fffae8';
        seaCtx.beginPath();
        seaCtx.arc(moonX, moonY, 18, 0, Math.PI * 2);
        seaCtx.fill();
        seaCtx.fillStyle = '#0d182b';
        seaCtx.beginPath();
        seaCtx.arc(moonX + 7, moonY - 3, 16, 0, Math.PI * 2);
        seaCtx.fill();

        // 3. Clear Mountain Air Twinkling Stars
        for (let i = 0; i < 40; i++) {
          const sx = Math.floor(((i * 211 + 43 - smoothCamDepth * 0.04) % width + width) % width);
          const sy = Math.floor((i * 97 + 19) % (trailY * 0.60));
          const twinkle = Math.sin(now * 0.0025 + 2.3 * i);
          if (twinkle > -0.1) {
            seaCtx.fillStyle = (i % 5 === 0) ? '#ffd166' : '#ffffff';
            seaCtx.fillRect(sx, sy, (i % 7 === 0) ? 3 : 2, (i % 7 === 0) ? 3 : 2);
          }
        }

        // 4. Distant Parallax Alpine Snow Peaks (Back layer, slow scroll)
        const peakLoop = 1400;
        const peakOffset = ((smoothCamDepth * 0.12) % peakLoop + peakLoop) % peakLoop;
        for (let pTile = -1; pTile <= 1; pTile++) {
          const px = pTile * peakLoop - peakOffset;
          if (px + peakLoop < -100 || px > width + 100) continue;
          for (let x = 0; x < peakLoop; x += 4) {
            const sx = px + x;
            if (sx < -10 || sx > width + 10) continue;
            const peakH = 140 + Math.floor((65 * Math.sin(x * 0.0035) + 35 * Math.sin(x * 0.009 + 2)) / 4) * 4;
            const topY = trailY - peakH;
            // Mountain slate body
            seaCtx.fillStyle = '#1c2d42';
            seaCtx.fillRect(sx, topY, 4, peakH);
            // Crisp White Snowy Summit Cap (top 38px of peaks)
            if (peakH > 130) {
              const snowH = Math.min(38, Math.floor((peakH - 120) * 0.8));
              seaCtx.fillStyle = '#edf2f4';
              seaCtx.fillRect(sx, topY, 4, snowH);
            }
          }
        }

        // 5. Midground Pine Ridge & Granite Cliffs (Medium parallax)
        const ridgeLoop = 900;
        const ridgeOffset = ((smoothCamDepth * 0.28) % ridgeLoop + ridgeLoop) % ridgeLoop;
        for (let rTile = -1; rTile <= 1; rTile++) {
          const rx = rTile * ridgeLoop - ridgeOffset;
          if (rx + ridgeLoop < -100 || rx > width + 100) continue;
          for (let x = 0; x < ridgeLoop; x += 4) {
            const sx = rx + x;
            if (sx < -10 || sx > width + 10) continue;
            const ridgeH = 65 + Math.floor((28 * Math.sin(x * 0.007) + 14 * Math.sin(x * 0.018 + 1)) / 4) * 4;
            const rTop = trailY - ridgeH;
            seaCtx.fillStyle = '#14281d';
            seaCtx.fillRect(sx, rTop, 4, ridgeH);
            // Occasional Pine Tree silhouettes along the ridge crest
            if (x % 24 === 0) {
              seaCtx.fillStyle = '#0b1d13';
              seaCtx.fillRect(sx - 2, rTop - 12, 6, 12);
              seaCtx.fillRect(sx, rTop - 16, 2, 4);
            }
          }
        }

        // 6. Foreground Alpine Turf & Expedition Trail (Ground)
        seaCtx.fillStyle = '#2d6a4f';
        seaCtx.fillRect(0, trailY, width, height - trailY);
        // Rocky Soil Base
        seaCtx.fillStyle = '#1b4332';
        seaCtx.fillRect(0, trailY + 28, width, height - (trailY + 28));

        // Stepped Winding Trail Path (Stones and dirt track)
        const pathH = 26;
        seaCtx.fillStyle = '#7f5539';
        seaCtx.fillRect(0, trailY + 6, width, pathH);
        seaCtx.fillStyle = '#9c6644';
        seaCtx.fillRect(0, trailY + 9, width, pathH - 6);

        // Trail Stones, Cairn Markers & Wildflowers along the trail
        for (let i = 0; i < 45; i++) {
          const gx = Math.floor(((i * 137 + 17 - smoothCamDepth * 2.0) % width + width) % width);
          // Cairns (stacked trail rocks)
          if (i % 7 === 0) {
            seaCtx.fillStyle = '#adb5bd';
            seaCtx.fillRect(gx - 4, trailY - 6, 8, 6);
            seaCtx.fillRect(gx - 2, trailY - 12, 4, 6);
            seaCtx.fillStyle = '#e76f51'; // Trail marker flag
            seaCtx.fillRect(gx - 1, trailY - 16, 6, 4);
          } else if (i % 3 === 0) {
            // Little yellow & purple alpine flowers
            seaCtx.fillStyle = (i % 2 === 0) ? '#ffd166' : '#c77dff';
            seaCtx.fillRect(gx, trailY + 2, 3, 3);
            seaCtx.fillStyle = '#52b788';
            seaCtx.fillRect(gx + 1, trailY + 5, 2, 3);
          } else {
            // Small trail pebbles
            seaCtx.fillStyle = '#b7b7a4';
            seaCtx.fillRect(gx, trailY + 12 + (i % 8), 3, 2);
          }
        }
      } else if (currentTheme === 'cinema') {
        // --- HORIZONTAL CINEMA / LOS ANGELES WORLD & BUILDINGS (Krillion Hollywood Layout) ---
        const sidewalkY = Math.floor(height * 0.58);
        const roadY = Math.floor(height * 0.70);

        // 1. Hollywood Dithered Twilight Sky (Bright, vibrant Hollywood sunset glow — never gets dark!)
        const skyBands = ['#1e0836', '#320d52', '#4a126e', '#681788', '#8a1d9c', '#ae26a8', '#d136a8'];
        const skyBandH = Math.floor(sidewalkY / skyBands.length);
        for (let b = 0; b < skyBands.length; b++) {
          const sy = b * skyBandH;
          const sh = (b === skyBands.length - 1) ? (sidewalkY - sy) : skyBandH;
          seaCtx.fillStyle = skyBands[b];
          seaCtx.fillRect(0, sy, width, sh);

          if (b < skyBands.length - 1) {
            seaCtx.fillStyle = skyBands[b + 1];
            for (let dy = sh - 6; dy < sh; dy += 2) {
              const ditherStep = (dy - (sh - 6)) / 2;
              for (let x = 0; x < width; x += 4) {
                if (ditherStep === 0 && (x / 4 + dy / 2) % 4 === 0) seaCtx.fillRect(x, sy + dy, 2, 2);
                else if (ditherStep === 1 && (x / 4 + dy / 2) % 2 === 0) seaCtx.fillRect(x, sy + dy, 2, 2);
                else if (ditherStep === 2 && (x / 4 + dy / 2) % 4 !== 0) seaCtx.fillRect(x, sy + dy, 2, 2);
              }
            }
          }
        }

        // 2. Stepped Pixel Full Moon with Craters & Halo
        const moonX = Math.floor(width * 0.82);
        const moonY = Math.floor(height * 0.14);
        const moonR = 22;
        for (let dy = -moonR - 8; dy <= moonR + 8; dy += 3) {
          const span = Math.round(Math.sqrt(Math.max(0, (moonR + 8) * (moonR + 8) - dy * dy)));
          seaCtx.fillStyle = 'rgba(255, 209, 102, 0.08)';
          seaCtx.fillRect(moonX - span, moonY + dy, span * 2, 3);
        }
        for (let dy = -moonR; dy <= moonR; dy += 2) {
          const span = Math.round(Math.sqrt(Math.max(0, moonR * moonR - dy * dy)));
          seaCtx.fillStyle = '#fff4ce';
          seaCtx.fillRect(moonX - span, moonY + dy, span * 2, 2);
          seaCtx.fillStyle = '#edd198';
          seaCtx.fillRect(moonX - span, moonY + dy, 2, 2);
          seaCtx.fillRect(moonX + span - 2, moonY + dy, 2, 2);
        }
        seaCtx.fillStyle = '#d6b87d';
        seaCtx.fillRect(moonX - 8, moonY - 4, 6, 4);
        seaCtx.fillRect(moonX + 3, moonY + 2, 6, 6);
        seaCtx.fillRect(moonX - 3, moonY + 8, 4, 4);

        // 3. Twinkling Pixel Stars (Squares & Crosses)
        for (let i = 0; i < 48; i++) {
          const sx = Math.floor(((i * 197 + 31 - smoothCamDepth * 0.05) % width + width) % width);
          const sy = Math.floor((i * 89 + 13) % (sidewalkY * 0.65));
          const twinkle = Math.sin(now * 0.002 + 1.9 * i);
          if (twinkle > -0.2) {
            seaCtx.fillStyle = i % 4 === 0 ? '#ffd166' : '#ffffff';
            if (i % 6 === 0) {
              seaCtx.fillRect(sx, sy - 2, 2, 6);
              seaCtx.fillRect(sx - 2, sy, 6, 2);
            } else {
              seaCtx.fillRect(sx, sy, 2, 2);
            }
          }
        }

        // 4. Stepped Premiere Searchlights (Scanline Beams)
        for (let s = 0; s < 2; s++) {
          const baseX = width * (s === 0 ? 0.24 : 0.68);
          const ang = -Math.PI / 2 + 0.38 * Math.sin(now * 0.0007 + 2.1 * s);
          const len = height * 0.72;
          seaCtx.save();
          seaCtx.translate(baseX, sidewalkY);
          seaCtx.rotate(ang);
          seaCtx.globalCompositeOperation = 'screen';
          for (let step = 0; step < len; step += 6) {
            const beamW = 4 + (step / len) * 70;
            const alpha = Math.max(0, 0.18 * (1 - step / len));
            seaCtx.fillStyle = s === 0 ? `rgba(255, 209, 102, ${alpha})` : `rgba(255, 93, 143, ${alpha})`;
            seaCtx.fillRect(step, -beamW / 2, 5, beamW);
          }
          seaCtx.restore();
        }

        // 5. Stepped Hollywood Hills, Mount Lee Sign & Griffith Observatory
        const hillLoop = 1200;
        const hillOffset = ((smoothCamDepth * 0.18) % hillLoop + hillLoop) % hillLoop;
        for (let hTile = -1; hTile <= 1; hTile++) {
          const hx = hTile * hillLoop - hillOffset;
          if (hx + hillLoop < -100 || hx > width + 100) continue;

          // Back Mountain Ridge (dark violet silhouette #0d061a)
          for (let x = 0; x < hillLoop; x += 4) {
            const sx = hx + x;
            if (sx < -20 || sx > width + 20) continue;
            const backH = 110 + Math.floor((36 * Math.sin(x * 0.004) + 18 * Math.sin(x * 0.011 + 1)) / 4) * 4;
            seaCtx.fillStyle = '#0d061a';
            seaCtx.fillRect(sx, sidewalkY - backH, 4, backH);
          }

          // Front Mountain Ridge (stepped terraces #170b2c)
          for (let x = 0; x < hillLoop; x += 4) {
            const sx = hx + x;
            if (sx < -20 || sx > width + 20) continue;
            const frontH = 75 + Math.floor((28 * Math.sin(x * 0.006 + 2) + 14 * Math.sin(x * 0.015)) / 4) * 4;
            seaCtx.fillStyle = '#170b2c';
            seaCtx.fillRect(sx, sidewalkY - frontH, 4, frontH);

            if ((x % 80 === 0 && frontH > 75) || (x % 140 === 0)) {
              seaCtx.fillStyle = '#080312';
              seaCtx.fillRect(sx, sidewalkY - frontH - 10, 4, 10);
              seaCtx.fillRect(sx + 1, sidewalkY - frontH - 14, 2, 4);
            }
          }

          // Mount Lee Radio Tower with blinking red LED
          const towerX = hx + 195;
          const towerY = sidewalkY - 140;
          seaCtx.fillStyle = '#37474f';
          seaCtx.fillRect(towerX, towerY, 2, 40);
          seaCtx.fillRect(towerX - 4, towerY + 12, 10, 2);
          seaCtx.fillRect(towerX - 7, towerY + 24, 16, 2);
          if (Math.sin(now * 0.008) > 0) {
            seaCtx.fillStyle = '#ff1744';
            seaCtx.fillRect(towerX - 1, towerY - 3, 4, 4);
          }

          // Illuminated Pixel-Art HOLLYWOOD Sign on Mount Lee
          const signX = hx + 220;
          const signY = sidewalkY - 122;
          seaCtx.fillStyle = '#2c1640';
          for (let p = 0; p < 9; p++) {
            seaCtx.fillRect(signX + p * 13 + 3, signY + 14, 2, 12);
          }
          drawPixelText(seaCtx, 'HOLLYWOOD', signX, signY, 2, '#fff6e0', '#0a0316');

          // Griffith Observatory with stepped pixel domes
          const obsX = hx + 860;
          const obsY = sidewalkY - 138;
          seaCtx.fillStyle = '#e0d8cc';
          seaCtx.fillRect(obsX - 32, obsY, 64, 16);
          seaCtx.fillStyle = '#1b0f2a';
          for (let w = obsX - 26; w < obsX + 26; w += 8) {
            seaCtx.fillRect(w, obsY + 4, 4, 8);
          }
          seaCtx.fillStyle = '#2a8a82';
          seaCtx.fillRect(obsX - 12, obsY - 14, 24, 14);
          seaCtx.fillRect(obsX - 10, obsY - 18, 20, 4);
          seaCtx.fillRect(obsX - 6, obsY - 21, 12, 3);
          seaCtx.fillStyle = '#12081f';
          seaCtx.fillRect(obsX - 2, obsY - 19, 4, 19);
          seaCtx.fillStyle = '#2a8a82';
          seaCtx.fillRect(obsX - 30, obsY - 8, 14, 8);
          seaCtx.fillRect(obsX - 28, obsY - 11, 10, 3);
          seaCtx.fillRect(obsX + 16, obsY - 8, 14, 8);
          seaCtx.fillRect(obsX + 18, obsY - 11, 10, 3);
        }

        // 6. Mid-Far Parallax: Downtown LA Skyscraper Skyline
        const skyLoop = 1100;
        const skyOffset = ((smoothCamDepth * 0.45) % skyLoop + skyLoop) % skyLoop;
        const dtlaTowers = [
          { x: 40, w: 44, h: 120, type: 'aon', col: '#1c0a2c' },
          { x: 110, w: 52, h: 162, type: 'usbank', col: '#230d36' },
          { x: 185, w: 36, h: 98, type: 'flat', col: '#190828' },
          { x: 245, w: 50, h: 170, type: 'wilshire', col: '#260f3a' },
          { x: 320, w: 42, h: 128, type: 'stepped', col: '#1e0a2f' },
          { x: 390, w: 46, h: 112, type: 'cityhall', col: '#220c34' },
          { x: 465, w: 38, h: 136, type: 'twin', col: '#1b092a' },
          { x: 515, w: 38, h: 136, type: 'twin', col: '#200b31' },
          { x: 585, w: 48, h: 115, type: 'flat', col: '#180726' },
          { x: 660, w: 54, h: 152, type: 'usbank', col: '#240d38' },
          { x: 740, w: 40, h: 104, type: 'stepped', col: '#1c092c' },
          { x: 810, w: 46, h: 145, type: 'wilshire', col: '#210c34' },
          { x: 885, w: 42, h: 108, type: 'aon', col: '#1a0829' },
          { x: 955, w: 50, h: 124, type: 'flat', col: '#1f0b30' }
        ];

        for (let sTile = -1; sTile <= 1; sTile++) {
          const baseBx = sTile * skyLoop - skyOffset;
          if (baseBx + skyLoop < -100 || baseBx > width + 100) continue;

          for (const t of dtlaTowers) {
            const tx = baseBx + t.x;
            const ty = sidewalkY - t.h;
            if (tx + t.w < -20 || tx > width + 20) continue;

            seaCtx.fillStyle = t.col;
            seaCtx.fillRect(tx, ty, t.w, t.h);

            if (t.type === 'usbank') {
              seaCtx.fillRect(tx + 6, ty - 12, t.w - 12, 12);
              seaCtx.fillRect(tx + 12, ty - 20, t.w - 24, 8);
              seaCtx.fillStyle = 'rgba(255, 240, 190, 0.85)';
              seaCtx.fillRect(tx + 10, ty - 14, t.w - 20, 3);
            } else if (t.type === 'wilshire') {
              for (let ws = 0; ws < t.w; ws += 4) {
                const sh = Math.floor((ws / t.w) * 24);
                seaCtx.fillRect(tx + ws, ty - sh, 4, sh);
              }
              seaCtx.fillStyle = '#4de3ff';
              seaCtx.fillRect(tx + t.w - 4, ty - 52, 2, 28);
              if (Math.sin(now * 0.006 + t.x) > 0) {
                seaCtx.fillStyle = '#ff2a55';
                seaCtx.fillRect(tx + t.w - 5, ty - 54, 4, 4);
              }
            } else if (t.type === 'cityhall') {
              seaCtx.fillRect(tx + 10, ty - 18, t.w - 20, 18);
              seaCtx.fillRect(tx + 16, ty - 32, t.w - 32, 14);
              seaCtx.fillRect(tx + t.w / 2 - 2, ty - 40, 4, 8);
            }

            // Crisp 2x3 Pixel Windows
            for (let wy = ty + 10; wy < sidewalkY - 12; wy += 9) {
              for (let wx = tx + 5; wx < tx + t.w - 5; wx += 7) {
                const hash = (wx * 17 + wy * 31 + t.x) % 9;
                if (hash === 0 || hash === 3) {
                  seaCtx.fillStyle = hash === 0 ? 'rgba(255, 225, 145, 0.75)' : 'rgba(120, 225, 255, 0.55)';
                  seaCtx.fillRect(wx, wy, 3, 3);
                }
              }
            }
          }
        }

        // 7. Street Level Iconic Hollywood Buildings (Drawn on 0.58 * height)
        const streetLoop = 1750;
        const streetScroll = ((smoothCamDepth * 1.6) % streetLoop + streetLoop) % streetLoop;
        for (let bTile = -1; bTile <= 1; bTile++) {
          const sx = bTile * streetLoop - streetScroll;
          if (sx + streetLoop < -200 || sx > width + 200) continue;

          // Building 0: SHRIMPION / KRILLION STUDIO ENTRANCE GATE ARCH at 0ft
          const gateX = sx;
          if (gateX > -180 && gateX < width + 180) {
            seaCtx.fillStyle = '#f5eedb';
            seaCtx.fillRect(gateX - 70, sidewalkY - 88, 18, 88);
            seaCtx.fillRect(gateX + 70, sidewalkY - 88, 18, 88);
            seaCtx.fillStyle = '#d4af37';
            seaCtx.fillRect(gateX - 73, sidewalkY - 94, 24, 6);
            seaCtx.fillRect(gateX + 67, sidewalkY - 94, 24, 6);
            seaCtx.fillStyle = '#ffd166';
            seaCtx.fillRect(gateX - 52, sidewalkY - 82, 122, 4);
            drawPixelText(seaCtx, 'SHRIMPION STUDIOS', gateX - 60, sidewalkY - 104, 1, '#ffd166', '#000000');
            seaCtx.fillStyle = '#e53935';
            seaCtx.fillRect(gateX - 48, sidewalkY - 4, 114, 4);
            seaCtx.fillStyle = '#ffd166';
            seaCtx.fillRect(gateX - 48, sidewalkY - 14, 3, 10);
            seaCtx.fillRect(gateX + 64, sidewalkY - 14, 3, 10);
          }

          // Building A: CAPITOL RECORDS TOWER (Stacked Vinyl Discs + Morse Spire)
          const capX = sx + 80;
          if (capX > -120 && capX < width + 120) {
            const capW = 74;
            const capH = 118;
            const capY = sidewalkY - capH;
            seaCtx.fillStyle = '#381e4c';
            seaCtx.fillRect(capX - 10, sidewalkY - 22, capW + 20, 22);
            seaCtx.fillStyle = '#d8cfc2';
            seaCtx.fillRect(capX + 6, capY, capW - 12, capH - 22);
            for (let d = 0; d < 11; d++) {
              const dy = capY + d * 8.5;
              seaCtx.fillStyle = '#f4eee1';
              seaCtx.fillRect(capX, dy, capW, 3);
              seaCtx.fillStyle = '#2d1c3d';
              seaCtx.fillRect(capX + 10, dy + 3, capW - 20, 4.5);
              seaCtx.fillStyle = '#ffd166';
              seaCtx.fillRect(capX + 16, dy + 4, 12, 2.5);
              seaCtx.fillRect(capX + 42, dy + 4, 14, 2.5);
            }
            seaCtx.fillStyle = '#e0e6ed';
            seaCtx.fillRect(capX + capW / 2 - 1, capY - 36, 3, 36);
            if (Math.sin(now * 0.008) > -0.2) {
              seaCtx.fillStyle = '#ff1744';
              seaCtx.fillRect(capX + capW / 2 - 3, capY - 40, 6, 6);
            }
            drawPixelText(seaCtx, 'CAPITOL', capX + 10, sidewalkY - 14, 1, '#ffd166', '#000000');
          }

          // Building B: GRAUMAN'S CHINESE THEATRE (Stepped Pagoda Roof & Jade Columns)
          const chiX = sx + 320;
          if (chiX > -150 && chiX < width + 150) {
            const chiW = 126;
            const chiH = 102;
            const chiY = sidewalkY - chiH;
            seaCtx.fillStyle = '#7a1224';
            seaCtx.fillRect(chiX, chiY + 22, chiW, chiH - 22);
            seaCtx.fillStyle = '#b81d38';
            seaCtx.fillRect(chiX + 24, chiY + 14, 14, chiH - 14);
            seaCtx.fillRect(chiX + chiW - 38, chiY + 14, 14, chiH - 14);
            // Stepped Jade Pagoda Eaves
            seaCtx.fillStyle = '#1abc9c';
            for (let r = 0; r < 14; r++) {
              const rw = chiW + 28 - r * 4;
              seaCtx.fillRect(chiX - 14 + r * 2, chiY + 10 + r, rw, 2);
            }
            seaCtx.fillStyle = '#ffd166';
            seaCtx.fillRect(chiX + chiW / 2 - 12, chiY + 36, 24, 24); // gold dragon medallion
            seaCtx.fillStyle = '#b81d38';
            seaCtx.fillRect(chiX + chiW / 2 - 8, chiY + 40, 16, 16);
            seaCtx.fillStyle = '#ffd166';
            seaCtx.fillRect(chiX + chiW / 2 - 4, chiY + 44, 8, 8);
            drawPixelText(seaCtx, 'CHINESE THEATRE', chiX + 10, chiY + 68, 1, '#ffeaa7', '#ff2a55');
          }

          // Building C: EL CAPITAN THEATRE (Vertical Neon Blade & Marquee Chaser Bulbs)
          const elcX = sx + 590;
          if (elcX > -140 && elcX < width + 140) {
            const elcW = 94;
            const elcH = 106;
            const elcY = sidewalkY - elcH;
            seaCtx.fillStyle = '#4a2340';
            seaCtx.fillRect(elcX, elcY, elcW, elcH);
            seaCtx.fillStyle = '#d4a373';
            seaCtx.fillRect(elcX - 3, elcY, elcW + 6, 7);
            // Vertical neon blade sign
            seaCtx.fillStyle = '#900c3f';
            seaCtx.fillRect(elcX + elcW / 2 - 11, elcY - 44, 22, 72);
            seaCtx.strokeStyle = '#ffd166';
            seaCtx.lineWidth = 2;
            seaCtx.strokeRect(elcX + elcW / 2 - 11, elcY - 44, 22, 72);
            drawPixelText(seaCtx, 'EL', elcX + elcW / 2 - 6, elcY - 36, 1, '#ffffff', '#ff2a85');
            drawPixelText(seaCtx, 'CAP', elcX + elcW / 2 - 9, elcY - 22, 1, '#ffffff', '#ff2a85');
            drawPixelText(seaCtx, 'ITAN', elcX + elcW / 2 - 12, elcY - 8, 1, '#ffffff', '#ff2a85');
            // Animated Marquee Chaser Bulbs
            seaCtx.fillStyle = '#fff3b0';
            seaCtx.fillRect(elcX + 6, sidewalkY - 32, elcW - 12, 16);
            const chaserFrame = Math.floor(now * 0.006) % 3;
            for (let bx = 0; bx < elcW - 16; bx += 6) {
              const bulbOn = (Math.floor(bx / 6) + chaserFrame) % 3 === 0;
              seaCtx.fillStyle = bulbOn ? '#ffd166' : '#573d1c';
              seaCtx.fillRect(elcX + 8 + bx, sidewalkY - 18, 3, 3);
            }
            drawPixelText(seaCtx, 'NOW PLAYING', elcX + 12, sidewalkY - 28, 1, '#900c3f');
          }

          // Building D: MEL'S 1950s RETRO GOOGIE DRIVE-IN DINER
          const melX = sx + 830;
          if (melX > -140 && melX < width + 140) {
            const melW = 112;
            const melH = 62;
            const melY = sidewalkY - melH;
            seaCtx.fillStyle = 'rgba(77, 227, 255, 0.32)';
            seaCtx.fillRect(melX + 8, melY + 18, melW - 16, melH - 18);
            seaCtx.fillStyle = '#ff4d6d';
            for (let b = 0; b < 3; b++) {
              seaCtx.fillRect(melX + 16 + b * 27, sidewalkY - 14, 18, 10);
            }
            // Stepped Googie wedge roof
            seaCtx.fillStyle = '#f8f9fa';
            for (let gr = 0; gr < 10; gr++) {
              seaCtx.fillRect(melX - 10 + gr * 4, melY + 22 - gr * 2, melW + 20, 3);
            }
            drawPixelText(seaCtx, "MEL'S DRIVE-IN", melX + 6, melY + 4, 1, '#ff2a85', '#33001a');
            // Parked 1950s Turquoise Retro Coupe Car
            const pCarX = melX + 54;
            const pCarY = sidewalkY - 8;
            seaCtx.fillStyle = '#1abc9c';
            seaCtx.fillRect(pCarX, pCarY - 8, 32, 8);
            seaCtx.fillStyle = '#f8f9fa';
            seaCtx.fillRect(pCarX + 6, pCarY - 14, 18, 6);
            seaCtx.fillStyle = '#100b1b';
            seaCtx.fillRect(pCarX + 4, pCarY, 6, 6);
            seaCtx.fillRect(pCarX + 22, pCarY, 6, 6);
            seaCtx.fillStyle = '#ffffff';
            seaCtx.fillRect(pCarX + 5, pCarY + 1, 4, 4);
            seaCtx.fillRect(pCarX + 23, pCarY + 1, 4, 4);
          }

          // Building E: THE HOLLYWOOD ROOSEVELT HOTEL & WATER TOWER
          const rooX = sx + 1090;
          if (rooX > -160 && rooX < width + 160) {
            const rooW = 130;
            const rooH = 128;
            const rooY = sidewalkY - rooH;
            seaCtx.fillStyle = '#3c1f36';
            seaCtx.fillRect(rooX, rooY, rooW, rooH);
            seaCtx.fillStyle = 'rgba(255, 220, 150, 0.72)';
            for (let wy = rooY + 12; wy < sidewalkY - 24; wy += 13) {
              for (let wx = rooX + 12; wx < rooX + rooW - 14; wx += 18) {
                seaCtx.fillRect(wx, wy, 8, 8);
              }
            }
            drawPixelText(seaCtx, 'ROOSEVELT', rooX + 16, rooY - 12, 1, '#ff2a55', '#30000a');
            // Studio Water Tower on steel legs
            const wtX = rooX + rooW + 14;
            const wtY = sidewalkY - 110;
            seaCtx.fillStyle = '#5d4037';
            seaCtx.fillRect(wtX - 14, wtY, 28, 24);
            seaCtx.fillStyle = '#8d6e63';
            seaCtx.fillRect(wtX - 16, wtY - 4, 32, 4);
            seaCtx.fillStyle = '#37474f';
            seaCtx.fillRect(wtX - 12, wtY + 24, 3, 34);
            seaCtx.fillRect(wtX + 9, wtY + 24, 3, 34);
            seaCtx.fillRect(wtX - 12, wtY + 38, 24, 2);
            drawPixelText(seaCtx, 'WB', wtX - 6, wtY + 6, 1, '#ffd166');
          }

          // Building F: CINERAMA DOME & ROCK CLUBS (THE ROXY / WHISKY)
          const cinX = sx + 1390;
          if (cinX > -160 && cinX < width + 160) {
            // Geodesic Dome with stepped pixel hexagons
            const domeR = 52;
            const domeCenterX = cinX + 65;
            const domeBaseY = sidewalkY - 18;
            for (let dy = -domeR; dy <= 0; dy += 3) {
              const span = Math.round(Math.sqrt(domeR * domeR - dy * dy));
              seaCtx.fillStyle = '#e2ece9';
              seaCtx.fillRect(domeCenterX - span, domeBaseY + dy, span * 2, 3);
              if (dy % 9 === 0) {
                seaCtx.fillStyle = '#8a9a95';
                for (let hx = -span; hx <= span; hx += 12) {
                  seaCtx.fillRect(domeCenterX + hx, domeBaseY + dy, 2, 3);
                }
              }
            }
            seaCtx.fillStyle = '#291138';
            seaCtx.fillRect(cinX, sidewalkY - 20, 130, 20);
            drawPixelText(seaCtx, 'CINERAMA DOME', cinX + 10, sidewalkY - 14, 1, '#4de3ff', '#000000');

            const roxyX = cinX + 155;
            seaCtx.fillStyle = '#1f0b29';
            seaCtx.fillRect(roxyX, sidewalkY - 68, 110, 68);
            drawPixelText(seaCtx, 'THE ROXY', roxyX + 18, sidewalkY - 54, 1, '#ffd166', '#ff2a85');
            drawPixelText(seaCtx, 'WHISKY A GO GO', roxyX + 4, sidewalkY - 28, 1, '#ff2a85', '#000000');
          }
        }

        // 8. California Fan Palm Trees (Segmented Pixel Trunks & Stepped Fronds)
        const palmSpacing = 155;
        const palmOffset = ((smoothCamDepth * 1.6) % palmSpacing + palmSpacing) % palmSpacing;
        for (let px = -palmOffset - 40; px < width + 80; px += palmSpacing) {
          const sway = Math.sin(now * 0.0018 + px * 0.02) * 4;
          const trunkH = 122 + ((Math.round(px + smoothCamDepth * 1.6) * 13) % 24);
          const topX = px + sway;
          const topY = sidewalkY - trunkH;

          // Segmented notched trunk
          for (let seg = 0; seg < trunkH; seg += 8) {
            const segX = px + (sway * seg) / trunkH;
            const segY = sidewalkY - seg;
            seaCtx.fillStyle = seg % 16 === 0 ? '#1b0d26' : '#2c143d';
            seaCtx.fillRect(segX - 3, segY - 8, 6, 8);
            seaCtx.fillStyle = '#3f1f54';
            seaCtx.fillRect(segX - 4, segY - 2, 8, 2);
          }

          // Stepped Fan Palm Fronds
          seaCtx.fillStyle = '#0e0418';
          for (let fa = -2.6; fa <= 0.8; fa += 0.45) {
            for (let fStep = 0; fStep < 18; fStep += 3) {
              const fx = topX + Math.cos(fa) * fStep * 1.1;
              const fy = topY + Math.sin(fa) * fStep * 0.7 + (fStep * fStep) * 0.015;
              seaCtx.fillRect(fx - 2, fy - 1, 4, 3);
            }
          }
          // Hanging Coconuts
          seaCtx.fillStyle = '#3e2723';
          seaCtx.fillRect(topX - 4, topY + 2, 3, 3);
          seaCtx.fillRect(topX + 1, topY + 2, 3, 3);
        }

        // 9. Procedural Sidewalk & Boulevard Tile (Krillion m3.js implementation)
        const cinemaTile = getCinemaTile(width, height, dpr);
        const tileOffset = ((width / 2 - 2 * smoothCamDepth) % 1400 + 1400) % 1400 - 1400;
        for (let x = tileOffset; x < width + 1400; x += 1400) {
          seaCtx.drawImage(cinemaTile, x, sidewalkY, 1400, height - sidewalkY);
        }

        // 10. Vintage Streetlamps with Stepped Radial Light Pools
        const lampSpacing = 220;
        const lampOffset = ((smoothCamDepth * 2) % lampSpacing + lampSpacing) % lampSpacing;
        for (let lx = -lampOffset; lx < width + lampSpacing; lx += lampSpacing) {
          const lampTopY = sidewalkY - 78;
          // Stepped radial light pool on sidewalk
          for (let lr = 80; lr >= 10; lr -= 14) {
            const alpha = 0.04 + (1 - lr / 80) * 0.16;
            seaCtx.fillStyle = `rgba(255, 214, 140, ${alpha})`;
            seaCtx.fillRect(lx - lr, sidewalkY - 14, lr * 2, 18);
          }
          seaCtx.fillStyle = '#12081c';
          seaCtx.fillRect(lx - 2, lampTopY, 4, 82);
          seaCtx.fillRect(lx - 7, sidewalkY, 14, 4);
          seaCtx.fillRect(lx - 10, lampTopY - 2, 20, 3);
          seaCtx.fillStyle = '#ffe9a8';
          seaCtx.fillRect(lx - 7, lampTopY - 9, 14, 7);
          seaCtx.fillStyle = '#fffdf0';
          seaCtx.fillRect(lx - 4, lampTopY - 7, 8, 4);
        }
      } else {
        // --- OCEAN WORLD BACKGROUND ART (Deep Pixel-Art Overhaul) ---
        // 1. Banded, Dithered Ocean Depth Gradient
        const bandH = 16;
        for (let y = 0; y < height; y += bandH) {
          const depth = smoothCamDepth + (y - height / 2) / 2;
          const col = getDepthColor(Math.max(0, depth), false);
          seaCtx.fillStyle = col;
          seaCtx.fillRect(0, y, width, bandH);

          if (y + bandH < height) {
            const nextCol = getDepthColor(Math.max(0, depth + bandH / 2), false);
            if (nextCol !== col) {
              seaCtx.fillStyle = nextCol;
              for (let dy = bandH - 4; dy < bandH; dy += 2) {
                for (let x = 0; x < width; x += 4) {
                  if ((x / 4 + dy / 2) % 2 === 0) {
                    seaCtx.fillRect(x, y + dy, 2, 2);
                  }
                }
              }
            }
          }
        }

        // 2. Animated Ocean Surface Waves at 0m with Research Vessel
        const surfaceY = screenY(0);
        if (surfaceY > -50 && surfaceY < height + 50) {
          const skyH = Math.max(0, surfaceY);
          seaCtx.fillStyle = '#6ec6e8';
          seaCtx.fillRect(0, 0, width, skyH);

          for (let c = 0; c < 3; c++) {
            const cx = ((c * 180 + now * 0.015) % (width + 120)) - 60;
            const cy = 20 + c * 25;
            seaCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            seaCtx.fillRect(cx, cy, 54, 14);
            seaCtx.fillRect(cx + 8, cy - 8, 36, 12);
            seaCtx.fillRect(cx + 18, cy - 14, 20, 8);
          }

          for (let x = 0; x < width; x += 4) {
            const waveY = surfaceY + Math.floor((3.5 * Math.sin(0.02 * x + now * 0.003) + 2.5 * Math.sin(0.012 * x - now * 0.002)) / 2) * 2;
            seaCtx.fillStyle = getDepthColor(0, false);
            seaCtx.fillRect(x, waveY, 4, height - waveY);
            seaCtx.fillStyle = '#ffffff';
            seaCtx.fillRect(x, waveY, 4, 3);
            seaCtx.fillStyle = '#b0e0ff';
            seaCtx.fillRect(x, waveY + 3, 4, 2);
          }
        }

        // 3. Stepped Canyon Walls & Coral Reef Shelf (0m–350m)
        drawOceanReefAndWalls(seaCtx, width, height, smoothCamDepth, now);

        // 4. Underwater Landmarks at Depths (Ship, Diver, Sub, Squid, Smokers, Titanic, Galleon, Trieste)
        drawOceanLandmarks(seaCtx, width, height, now);

        // 5. Swimming Pixel-Art Sea Creatures
        for (const fish of ambientFish) {
          fish.x += fish.speed * 0.016;
          if (fish.speed > 0 && fish.x > width + 60) { fish.x = -60; fish.dOff = randRange(-200, 200); }
          if (fish.speed < 0 && fish.x < -60) { fish.x = width + 60; fish.dOff = randRange(-200, 200); }
          const fy = screenY(smoothCamDepth + fish.dOff) + 8 * Math.sin(now * 0.002 + fish.ph);
          if (fy > -20 && fy < height + 20) {
            drawPixelCreature(seaCtx, fish.type || 'fish', fish.x, fy, fish.size, fish.speed, fish.ph, now);
          }
        }
      }

      // Foreground Canvas (Particles, Glow, Ruler)
      foreCtx.clearRect(0, 0, width, height);

      foreCtx.fillStyle = currentTheme === 'cinema' ? 'rgba(255, 220, 150, 0.35)' : 'rgba(220, 235, 255, 0.35)';
      for (const p of snowParticles) {
        if (currentTheme === 'cinema') {
          p.x -= p.speed * 1.3;
          p.y += 0.3 * Math.sin(now * 0.001 + p.ph);
        } else {
          p.y += p.speed;
          p.x += 0.4 * Math.sin(now * 0.001 + p.ph);
        }
        if (p.y > height) p.y = 0;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        foreCtx.fillRect(p.x, p.y, p.size, p.size);
      }

      // Plunging Chip Aura
      if (isPlunging) {
        const isCinema = currentTheme === 'cinema';
        const cx = isCinema ? screenX(chipDepth) + 40 : width / 2 + chipHorizontalOffset;
        const cy = isCinema ? Math.floor(height * 0.72) - 48 : screenY(chipDepth);
        const glow = foreCtx.createRadialGradient(cx, cy - 28, 4, cx, cy - 28, 75);
        glow.addColorStop(0, activeTier === 'shrimpion' ? 'rgba(255, 209, 102, 0.35)' : 'rgba(77, 227, 255, 0.22)');
        glow.addColorStop(1, 'rgba(77, 227, 255, 0)');
        foreCtx.fillStyle = glow;
        foreCtx.beginPath();
        foreCtx.arc(cx, cy - 28, 75, 0, Math.PI * 2);
        foreCtx.fill();
      }

      // Orbiting Golden Shrimps
      if (orbitingShrimps) {
        const cx = width / 2 + chipHorizontalOffset;
        const cy = isPlunging ? screenY(chipDepth) : height * 0.45;
        for (const s of orbitingShrimps) {
          const rad = s.rad * (1 + 4 * orbitExpansion);
          const ox = cx + Math.cos(s.ang + now * 0.002 * s.w) * rad * 1.1;
          const oy = cy + Math.sin(s.ang + now * 0.002 * s.w) * rad * 0.6 + 4 * Math.sin(now * 0.003 + s.ph);
          foreCtx.fillStyle = 'rgba(255, 209, 102, 0.85)';
          foreCtx.fillRect(ox - 3, oy - 2, 6, 4);
          foreCtx.fillStyle = 'rgba(255, 238, 170, 0.95)';
          foreCtx.fillRect(ox - 1, oy - 1, 2, 2);
        }
      }

      // Squid Ink
      for (let i = inkParticles.length - 1; i >= 0; i--) {
        const p = inkParticles[i];
        p.t += 0.016;
        const progress = p.t / p.life;
        if (progress >= 1) { inkParticles.splice(i, 1); continue; }
        p.vx *= 0.96;
        p.vd *= 0.96;
        p.x += p.vx * 0.016;
        p.d += p.vd * 0.016;
        const iy = screenY(p.d);
        const r = p.r * (0.4 + progress);
        foreCtx.globalAlpha = 0.55 * (1 - progress);
        const inkGrad = foreCtx.createRadialGradient(p.x, iy, 0, p.x, iy, r);
        inkGrad.addColorStop(0, 'rgba(60, 4, 14, 0.95)');
        inkGrad.addColorStop(1, 'rgba(20, 0, 6, 0)');
        foreCtx.fillStyle = inkGrad;
        foreCtx.beginPath();
        foreCtx.arc(p.x, iy, r, 0, Math.PI * 2);
        foreCtx.fill();
      }
      foreCtx.globalAlpha = 1;

      // Sparkles
      for (let i = sparkleParticles.length - 1; i >= 0; i--) {
        const sp = sparkleParticles[i];
        sp.t += 0.016;
        if (sp.t > sp.life) { sparkleParticles.splice(i, 1); continue; }
        sp.x += sp.vx * 0.016;
        sp.d += sp.vd * 0.016;
        sp.vx *= 0.95;
        sp.vd *= 0.95;
        const sy = screenY(sp.d);
        foreCtx.globalAlpha = 1 - sp.t / sp.life;
        foreCtx.fillStyle = sp.color;
        foreCtx.fillRect(sp.x - sp.r / 2, sy - sp.r / 2, sp.r, sp.r);
      }
      foreCtx.globalAlpha = 1;

      // Bubbles
      for (let i = bubbleParticles.length - 1; i >= 0; i--) {
        const b = bubbleParticles[i];
        b.d -= b.speedD * 0.016;
        b.life -= 0.016;
        const by = screenY(b.d);
        if (b.life <= 0 || by < -30 || by > height + 60) {
          bubbleParticles.splice(i, 1);
          continue;
        }
        const bx = b.x + 3 * Math.sin(now * 0.003 + b.wobble);
        foreCtx.strokeStyle = `rgba(${b.col}, ${Math.min(0.7, b.life * 0.5)})`;
        foreCtx.lineWidth = 1.2;
        foreCtx.beginPath();
        foreCtx.arc(bx, by, b.r, 0, Math.PI * 2);
        foreCtx.stroke();
      }

      // Depth / Distance Ruler
      if (currentTheme === 'cinema') {
        // Horizontal Boulevard Distance Ruler along bottom edge
        const rulerY = height - 12;
        foreCtx.strokeStyle = 'rgba(255, 209, 102, 0.45)';
        foreCtx.lineWidth = 2;
        foreCtx.font = '12px monospace';
        foreCtx.textAlign = 'center';

        const minFoot = Math.max(0, 10 * Math.floor((smoothCamDepth - width / 4) / 10));
        const maxFoot = smoothCamDepth + width / 2;
        for (let f = minFoot; f <= maxFoot; f += 10) {
          const fx = screenX(f);
          if (fx < -10 || fx > width + 10) continue;
          const tickH = f % 100 === 0 ? 12 : (f % 50 === 0 ? 8 : 4);
          foreCtx.beginPath();
          foreCtx.moveTo(fx, rulerY - tickH);
          foreCtx.lineTo(fx, rulerY);
          foreCtx.stroke();

          if (f % 100 === 0) {
            foreCtx.fillStyle = 'rgba(255, 230, 160, 0.85)';
            foreCtx.fillText(`${f.toLocaleString()}ft`, fx, rulerY - 15);
          }
        }
      } else {
        const rulerX = width - 14;
        foreCtx.strokeStyle = 'rgba(125, 147, 184, 0.55)';
        foreCtx.lineWidth = 2;
        foreCtx.font = '13px monospace';
        foreCtx.textAlign = 'right';

        const surfaceLineY = Math.max(0, screenY(0));
        if (surfaceLineY < height) {
          foreCtx.beginPath();
          foreCtx.moveTo(rulerX, surfaceLineY);
          foreCtx.lineTo(rulerX, height);
          foreCtx.stroke();
        }

        const playerY = screenY(currentMeters);
        const minMeter = Math.max(0, 10 * Math.floor((smoothCamDepth - height / 4) / 10));
        const maxMeter = smoothCamDepth + height / 4;
        const unit = 'm';

        for (let m = minMeter; m <= maxMeter; m += 10) {
          const my = screenY(m);
          if (my < -4 || my > height + 4) continue;
          const tickLen = m % 100 === 0 ? 16 : (m % 50 === 0 ? 10 : 5);
          foreCtx.beginPath();
          foreCtx.moveTo(rulerX - tickLen, my);
          foreCtx.lineTo(rulerX, my);
          foreCtx.stroke();

          if (m % 100 === 0 && Math.abs(my - playerY) > 14) {
            foreCtx.fillStyle = 'rgba(125, 147, 184, 0.95)';
            foreCtx.fillText(m === 0 ? `0${unit}` : `-${m.toLocaleString()}${unit}`, rulerX - tickLen - 5, my + 4);
          }
        }

        // Pink "YOU" Indicator Arrow
        if (playerY > -20 && playerY < height + 20) {
          foreCtx.fillStyle = '#ff5d8f';
          foreCtx.beginPath();
          foreCtx.moveTo(rulerX + 4, playerY);
          foreCtx.lineTo(rulerX + 12, playerY - 5);
          foreCtx.lineTo(rulerX + 12, playerY + 5);
          foreCtx.closePath();
          foreCtx.fill();

          foreCtx.strokeStyle = 'rgba(255, 93, 143, 0.85)';
          foreCtx.beginPath();
          foreCtx.moveTo(rulerX - 20, playerY);
          foreCtx.lineTo(rulerX + 4, playerY);
          foreCtx.stroke();

          foreCtx.font = '12px monospace';
          foreCtx.fillText('YOU', rulerX - 24, playerY + 4);
        }
      }

      // Mascot Position
      if (currentTheme === 'trek') {
        // Trekker Hiker walks on the alpine trail, bobbing forward with each step
        const trailY = Math.floor(height * 0.68);
        const trekWorldTarget = enginePhase === 'intro' ? -60 : (enginePhase === 'plunge' && isPlunging ? chipDepth : currentMeters);
        carWorldD += (trekWorldTarget - carWorldD) * (enginePhase === 'plunge' ? 0.35 : 0.1);
        const targetHikerX = Math.max(60, Math.min(width - 60, screenX(carWorldD)));

        mascotX += (targetHikerX - mascotX) * 0.25;
        const walkBob = (enginePhase === 'plunge' || isPlunging) ? Math.abs(Math.sin(now * 0.015)) * 6 : Math.sin(now * 0.003) * 2;
        mascotY += ((trailY - 10 - walkBob) - mascotY) * 0.25;
        mascotRot = 0;

        const halfW = mascotEl.offsetWidth / 2;
        const hikerH = mascotEl.offsetHeight;
        mascotEl.style.transform = `translate3d(${mascotX - halfW}px, ${mascotY - hikerH}px, 0)`;

        // Contact shadow on the trail
        foreCtx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        foreCtx.fillRect(mascotX - halfW * 0.7, mascotY - 2, halfW * 1.4, 4);

        // Small puff of mountain trail dust when plunging/walking
        if ((enginePhase === 'plunge' || isPlunging) && Math.random() < 0.4) {
          foreCtx.fillStyle = 'rgba(180, 160, 130, 0.5)';
          foreCtx.fillRect(mascotX - halfW - randRange(2, 8), mascotY - randRange(2, 6), 3, 3);
        }
      } else if (currentTheme === 'cinema') {
        // Car sits ON the asphalt driving lane (78% of height), tires on the pavement, never tilted
        const laneY = Math.floor(height * 0.78);
        const carWorldTarget = enginePhase === 'intro' ? -60 : (enginePhase === 'plunge' && isPlunging ? chipDepth : currentMeters);
        carWorldD += (carWorldTarget - carWorldD) * (enginePhase === 'plunge' ? 0.35 : 0.1);
        const targetCarX = Math.max(60, Math.min(width - 60, screenX(carWorldD)));

        mascotX += (targetCarX - mascotX) * 0.25;
        mascotY += (laneY - mascotY) * 0.25;
        mascotRot = 0;

        const halfW = mascotEl.offsetWidth / 2;
        const carH = mascotEl.offsetHeight;
        // Bottom of car sprite (tires) rests exactly on laneY
        mascotEl.style.transform = `translate3d(${mascotX - halfW}px, ${mascotY - carH}px, 0)`;

        // Crisp pixel contact shadow under the tires
        foreCtx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        foreCtx.fillRect(mascotX - halfW * 0.85, mascotY - 2, halfW * 1.7, 4);

        // Stepped pixel headlight beams projecting forward along the road
        const beamX = mascotX + halfW - 4;
        const beamY = mascotY - carH * 0.35;
        for (let bx = 0; bx < 220; bx += 8) {
          const bH = 6 + (bx / 220) * 40;
          const bAlpha = Math.max(0, 0.26 * (1 - bx / 220));
          foreCtx.fillStyle = `rgba(255, 240, 180, ${bAlpha})`;
          foreCtx.fillRect(beamX + bx, beamY - bH * 0.4, 7, bH);
        }
      } else {
        let targetMascot = { x: width * 0.72, y: height * 0.4, rot: 0 };
        if (mascotPerchedIcon && mascotPerchedIcon.isConnected) {
          const rect = mascotPerchedIcon.getBoundingClientRect();
          const stageRect = rootEl.getBoundingClientRect();
          targetMascot = {
            x: rect.left - stageRect.left + rect.width / 2,
            y: rect.top - stageRect.top + rect.height / 2,
            rot: 0
          };
          mascotEl.classList.add('perched');
        } else if (enginePhase === 'intro') {
          targetMascot = { x: width * 0.72, y: screenY(0) + 105, rot: 0 };
        } else if (enginePhase === 'plunge') {
          targetMascot = { x: Math.min(width / 2 + 85, width - 44), y: screenY(chipDepth) - 14, rot: 24 };
        } else if (enginePhase === 'landed') {
          targetMascot = { x: width * 0.18, y: height * 0.28, rot: -8 };
        } else if (enginePhase === 'round') {
          targetMascot = { x: 50, y: height - 165, rot: 0 };
        }

        const mascotLerp = 0.12;
        mascotX += (targetMascot.x - mascotX) * mascotLerp;
        mascotY += (targetMascot.y - mascotY) * mascotLerp;
        mascotRot += (targetMascot.rot - mascotRot) * mascotLerp;

        const mascotBob = Math.sin(now * 0.002) * (mascotPerchedIcon ? 2 : 5);
        const halfSize = mascotEl.offsetWidth / 2;
        mascotEl.style.transform = `translate3d(${mascotX - halfSize}px, ${mascotY - halfSize + mascotBob}px, 0) rotate(${mascotRot + Math.sin(now * 0.0015) * 3}deg)`;

        if (!store.lowPower && now - lastMascotBubbleTime > 2400) {
          lastMascotBubbleTime = now;
          emitBubbles(mascotX + 18, mascotY + mascotBob - 6, 2);
        }
      }

      requestAnimationFrame(renderFrame);
    }

    requestAnimationFrame(renderFrame);

    return {
      setTheme(newTheme) {
        currentTheme = newTheme;
        rootEl.dataset.theme = newTheme;
        buildAmbientMarkers();
        updateMascotSprite();
      },

      refreshReactionAssets() {
        worldEl.querySelectorAll('.ds-landed[data-tier] .landed-icon').forEach((icon) => {
          icon.innerHTML = getReactionAssetHtml(icon.closest('.ds-landed').dataset.tier);
        });
      },

      setUnlimited(unlimited) {
        isUnlimited = unlimited;
        updateHud();
      },

      intro() {
        worldEl.querySelectorAll('.ds-landed, .ds-card, .ds-tierline, .ds-chip').forEach((el) => el.remove());
        tierLineEls = [];
        activeCardEl = null;
        mascotPerchedIcon = null;
        mascotEl.classList.remove('perched', 'gold');
        mascotSprite.classList.remove('celebrate', 'faint', 'sad', 'roll', 'dart', 'jet', 'chomp');
        isGoldMascot = false;
        updateMascotSprite();
        enginePhase = 'intro';
        camDepth = (currentTheme === 'cinema' || currentTheme === 'trek') ? 0 : -45;
        carWorldD = -60;
        roundsDone = 0;
        currentScore = 0;
        displayedScore = 0;
        currentMeters = 0;
        displayedMeters = 0;
        updateHud();
      },

      descendToRound(roundIdx, promptText, onComplete) {
        worldEl.querySelectorAll('.ds-landed').forEach((el) => {
          el.style.transition = 'opacity 0.5s ease-out';
          el.style.opacity = '0';
          setTimeout(() => el.remove(), 550);
        });
        clearTierLines(false);
        mascotPerchedIcon = null;
        mascotEl.classList.remove('perched');
        mascotSprite.classList.remove('celebrate', 'faint', 'sad', 'roll', 'dart', 'jet', 'chomp');

        enginePhase = 'descend';
        roundsDone = roundIdx;
        triggerCrtZap();
        audio.event('descend');

        const isCinema = currentTheme === 'cinema';
        const isTrek = currentTheme === 'trek';
        if (activeCardEl) activeCardEl.remove();
        const card = document.createElement('div');
        card.className = 'ds-card ds-px';
        if (isCinema || isTrek) {
          // Card centered on screen once the camera settles at currentMeters
          card.style.left = `${2 * currentMeters}px`;
          card.style.top = isCinema ? '11%' : '14%';
        } else {
          card.style.top = `${2 * currentMeters}px`;
        }
        const total = isCinema ? 10 : 7;
        const promptLabel = isUnlimited
          ? `UNLIMITED · PROMPT ${roundIdx + 1}`
          : `${isCinema ? 'SCENE' : (isTrek ? 'EXPEDITION LEG' : 'PROMPT')} ${roundIdx + 1} OF ${total}`;
        card.innerHTML = `
          <div class="rnd">${promptLabel}</div>
          <div class="prompt"></div>
          <div class="hint">${isCinema ? 'rarer answers drive farther →' : (isTrek ? 'rarer answers trek higher ↗' : '▼ rarer answers sink deeper ▼')}</div>
        `;
        card.querySelector('.prompt').textContent = promptText;
        worldEl.appendChild(card);
        activeCardEl = card;

        const targetDepth = (isCinema || isTrek) ? currentMeters : currentMeters + (height / 2 - 180) / 2;
        addTween(1800, easeIO, (t) => {
          camDepth = lerp(camDepth, targetDepth, t);
        }, () => {
          enginePhase = 'round';
          updateHud();
          if (onComplete) onComplete();
        });
      },

      plunge(outcome, onComplete) {
        enginePhase = 'plunge';
        isPlunging = true;
        activeTier = outcome.tier;
        worldEl.classList.add('ds-reveal');

        const isCinema = currentTheme === 'cinema';
        const isTrek = currentTheme === 'trek';
        const isH = isCinema || isTrek;
        const roadY = Math.floor(height * (isTrek ? 0.68 : 0.70));
        clearTierLines(true);

        if (activeCardEl) {
          emitSparkles(width / 2, isH ? 120 : screenY(currentMeters + 60), isTrek ? '#52b788' : '#4de3ff', 12);
          const goneCard = activeCardEl;
          goneCard.classList.add('gone');
          setTimeout(() => goneCard.remove(), 600);
          activeCardEl = null;
        }

        const startDepth = currentMeters;
        const targetPlungeDepth = outcome.tier ? startDepth + 10 * outcome.points : startDepth + 40;

        tierLineEls = [];
        TIER_IDS.forEach((tid, idx) => {
          const tierInfo = TIERS[tid];
          const lineDepth = startDepth + 10 * tierInfo.score;
          const line = document.createElement('div');
          line.className = 'ds-tierline';
          if (isH) {
            line.style.left = `${2 * lineDepth}px`;
            // Alternate tag heights so neighbouring tiers (10 / 15) never collide
            line.style.setProperty('--tag-y', idx % 2 ? '-52px' : '-24px');
          } else {
            line.style.top = `${2 * lineDepth}px`;
          }
          line.style.setProperty('--tc', `var(--tier-${tid})`);
          line.innerHTML = `
            <div class="tag"${!isCinema && idx % 2 ? ' style="right: auto; left: 0;"' : ''}><!-- ocean: alternate tags left/right so close tiers never stack -->
              <span class="tier-mini-icon">${getTierSvg(tid)}</span>
              ${tierInfo.name.toUpperCase()} · ${tierInfo.score}
            </div>
          `;
          line.style.opacity = '0';
          worldEl.appendChild(line);
          requestAnimationFrame(() => {
            line.style.transition = 'opacity 0.4s ease-out';
            line.style.opacity = '1';
          });
          tierLineEls.push({ depth: lineDepth, el: line, tier: tid, passed: false });
        });

        if (!outcome.tier) {
          triggerScreenShake();
          triggerCrtZap();
          audio.event('miss');
          triggerColorFlash('rgba(61, 79, 110, 0.5)', 1, 200);
          playMascotAnim('sad', 2600);
          setTimeout(() => {
            currentMeters = startDepth;
            roundsDone += 1;
            camDepth = (isCinema || isTrek) ? startDepth : targetPlungeDepth + 30;
            enginePhase = 'landed';
            isPlunging = false;
            clearTierLines(false);
            updateHud();
            const banner = document.createElement('div');
            banner.className = 'ds-landed ds-missed';
            banner.dataset.tier = 'miss';
            if (isCinema || isTrek) {
              banner.style.left = `${2 * startDepth}px`;
            } else {
              banner.style.top = `${2 * startDepth}px`;
            }
            banner.style.setProperty('--tc', 'var(--tier-miss)');
            banner.innerHTML = `
              <div class="landed-icon">${getReactionAssetHtml('miss')}</div>
              <div class="tname">MISSED</div>
              <div class="tans">No answer</div>
              <div class="tsub">the clock beat you to it.</div>
            `;
            worldEl.appendChild(banner);
            if (onComplete) onComplete();
          }, 900);
          return;
        }

        const chip = document.createElement('div');
        chip.className = 'ds-chip ds-px';
        chip.style.setProperty('--cc', `var(--tier-${outcome.tier})`);
        chip.textContent = `“${outcome.answerText.toUpperCase()}”`;
        worldEl.appendChild(chip);

        const startChipDepth = (isCinema || isTrek) ? startDepth + 20 : startDepth + 90;
        chipDepth = startChipDepth;
        audio.event('sink');

        const config = PLUNGE_DURATIONS[outcome.tier] || PLUNGE_DURATIONS.plankton;
        if (outcome.tier === 'tooclever') {
          triggerColorFlash('rgba(255, 159, 67, 0.7)', 3, 130);
          triggerScreenShake();
          playMascotAnim('faint', 2400);
          spawnSchoolerSwarm(config.dur);
        } else if (outcome.tier === 'rare') {
          triggerColorFlash('rgba(255, 82, 82, 0.45)', 1, 220);
          emitInk(width / 2, isCinema ? roadY - 40 : screenY(startChipDepth), 12);
        } else if (outcome.tier === 'deepcut') {
          if (!isCinema) {
            dimEl.classList.add('on');
            setSpotlight(width / 2, screenY(startChipDepth));
          } else {
            triggerColorFlash('rgba(157, 123, 255, 0.45)', 1, 240);
          }
        } else if (outcome.tier === 'shrimpion') {
          triggerColorFlash('rgba(255, 209, 102, 0.5)', 1, 180);
          chip.classList.add('gold');
          isGoldMascot = true;
          updateMascotSprite();
          mascotEl.classList.add('gold');
          orbitingShrimps = Array.from({ length: 18 }, () => ({
            ang: Math.random() * Math.PI * 2,
            rad: 35 + Math.random() * 45,
            w: (0.8 + Math.random() * 1.5) * (Math.random() < 0.5 ? -1 : 1),
            ph: Math.random() * 9
          }));
        }

        addTween(config.dur, config.ease, (t) => {
          chipDepth = lerp(startChipDepth, targetPlungeDepth, t);

          let wobble = 0;
          if (outcome.tier === 'plankton') {
            chipHorizontalOffset = 36 * Math.sin(7 * t) * (1 - 0.25 * t);
            wobble = 0.55 * chipHorizontalOffset;
          } else if (outcome.tier === 'tooclever') {
            chipHorizontalOffset = 7 * Math.sin(42 * t) + randRange(-2, 2);
            wobble = randRange(-3, 3);
          } else if (outcome.tier === 'shrimpion') {
            chipHorizontalOffset = Math.sin(24 * t) * (1 - t) * 26;
            wobble = 0.5 * chipHorizontalOffset;
          } else {
            chipHorizontalOffset = Math.sin(16 * t) * (1 - t) * 14;
            wobble = 0.4 * chipHorizontalOffset;
          }

          if (isCinema || isTrek) {
            // Chip rides horizontally centered on chipDepth
            const bounce = Math.sin(20 * t) * 2;
            chip.style.transform = `translate3d(calc(${2 * chipDepth}px - 50%), ${bounce}px, 0)`;
            camDepth = chipDepth;
          } else {
            chip.style.transform = `translate3d(calc(-50% + ${chipHorizontalOffset}px), ${2 * chipDepth}px, 0) rotate(${wobble}deg)`;
            camDepth = chipDepth + 30;
          }
          displayedMeters = lerp(startDepth, targetPlungeDepth, t);
          updateHud();

          if (!isCinema && Math.random() < 0.6) {
            emitBubbles(width / 2 + chipHorizontalOffset, screenY(chipDepth), 1);
          }
          if (outcome.tier === 'deepcut' && !isCinema) {
            setSpotlight(width / 2 + chipHorizontalOffset, screenY(chipDepth));
          }

          for (const tl of tierLineEls) {
            if (!tl.passed && chipDepth > tl.depth - 4) {
              tl.passed = true;
              tl.el.classList.add('passed');
              audio.event('tierline');
              emitSparkles(isH ? screenX(tl.depth) : width / 2, isH ? roadY - 60 : screenY(tl.depth), TIER_COLORS[tl.tier] || '#4de3ff', 8);
            }
          }
        }, () => {
          isPlunging = false;
          chip.remove();
          clearTierLines(false);

          currentMeters = targetPlungeDepth;
          currentScore = outcome.newScore;
          roundsDone += 1;
          camDepth = (isCinema || isTrek) ? targetPlungeDepth : targetPlungeDepth + 30;

          audio.event(outcome.tier === 'shrimpion' ? 'krillion' : (outcome.tier === 'rare' || outcome.tier === 'deepcut' ? 'land_big' : 'land_small'));

          const banner = document.createElement('div');
          banner.className = 'ds-landed';
          banner.dataset.tier = outcome.tier;
          if (isCinema || isTrek) {
            banner.style.left = `${2 * targetPlungeDepth}px`;
          } else {
            banner.style.top = `${2 * targetPlungeDepth}px`;
          }
          banner.style.setProperty('--tc', `var(--tier-${outcome.tier})`);
          const unit = isCinema ? 'ft' : 'm';
          const verb = isCinema ? 'cruise' : (isTrek ? 'trek' : 'sink');
          const prefix = isTrek ? '+' : '';
          banner.innerHTML = `
            <div class="landed-icon">${getReactionAssetHtml(outcome.tier)}</div>
            <div class="tname">${TIERS[outcome.tier].name.toUpperCase()}</div>
            <div class="tans">“${outcome.answerText}”</div>
            <div class="tpts"><b>+${outcome.points} PTS</b> · ${verb} ${prefix}${(10 * outcome.points).toLocaleString()}${unit}</div>
            <div class="tsub">${outcome.sub}</div>
          `;
          worldEl.appendChild(banner);

          if (outcome.tier === 'shrimpion') {
            if (!isCinema && !isTrek) {
              banner.classList.add('perched');
              mascotPerchedIcon = banner.querySelector('.landed-icon');
            }
            playMascotAnim('celebrate', 1250);
            dimEl.classList.remove('on');
            addTween(1500, easeOutCubic, (t) => { orbitExpansion = t; }, () => { orbitingShrimps = null; });
          } else if (outcome.tier === 'deepcut') {
            if (!isCinema) {
              setTimeout(() => dimEl.classList.remove('on'), 1800);
            }
          }

          addTween(800, easeOutCubic, (t) => {
            displayedScore = lerp(displayedScore, outcome.newScore, t);
            displayedMeters = lerp(displayedMeters, currentMeters, t);
            updateHud();
          }, () => {
            displayedScore = outcome.newScore;
            displayedMeters = currentMeters;
            updateHud();
          });

          enginePhase = 'landed';
          if (onComplete) onComplete();
        });
      },

      setUrgency(factor) {
        edgeEl.classList.toggle('danger', factor > 0.85);
      },

      typeFx(x, y) {
        emitBubbles(x, y, 1);
      },

      submitFx(rect) {
        triggerCrtZap();
        audio.event('submit');
        emitBubbles(rect.left + rect.width / 2, rect.top, 8);
        edgeEl.classList.remove('danger');
      },

      rejectFx() {
        triggerCrtZap();
        audio.event('reject');
        emitBubbles(mascotX, mascotY, 3, '143,163,196');
      }
    };
  }

  // --- Main Application Controller ---
  class ShrimpionApp {
    constructor() {
      this.appEl = document.getElementById('app');
      this.mode = 'daily';
      this.packName = '';
      this.activeDateKey = getLocalDateKey();
      this.isArchiveReplay = false;
      this.countdownTimerId = null;
      this.rolloverCheckTimerId = null;
      this._refreshingDateKey = '';
      this.currentDiveNumber = this.getDiveNumber();
      const cachedTodayOnline = store.onlineLookup !== false
        && store.dailyOnlineDecks
        && Array.isArray(store.dailyOnlineDecks[this.activeDateKey])
        && store.dailyOnlineDecks[this.activeDateKey].length === 7
        ? store.dailyOnlineDecks[this.activeDateKey]
        : null;
      this.currentDeck = cachedTodayOnline || getDailyDeckForDive(this.currentDiveNumber);
      this.roundIdx = 0;
      this.phase = 'intro';
      this.timerSeconds = 25;
      this.timerId = null;
      this.previewSeconds = 3;
      this.previewTimerId = null;
      this.roundResults = [];
      this.score = 0;
      this.pendingCorrection = null;
      this.rejectMessage = '';
      this.isCheckingOnline = false;
      this.isPlunging = false;
      this.isTransitioning = false;

      // Shrimp Relay Party state
      this.party = {
        players: ['Alex', 'Sam', 'Jo'],
        turn: 0,
        fuse: 18,
        lives: [2, 2, 2],
        meter: 0,
        prompt: 'Name a movie or TV show',
        used: [],
        running: false,
        timer: null
      };

      this.init();
    }

    init() {
      this.updateStreak();
      this.checkDayRollover();
      this.mountStage();
      this.initGlobalEvents();
      this.applySettings();
      if (!this._rolloverBound && typeof window !== 'undefined') {
        this._rolloverBound = true;
        window.addEventListener('focus', () => this.checkDayRollover());
        window.addEventListener('pageshow', () => this.checkDayRollover());
        if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
          document.addEventListener('visibilitychange', () => {
            if (!document.hidden) this.checkDayRollover();
          });
        }
        this.rolloverCheckTimerId = setInterval(() => this.checkDayRollover(), 15000);
      }
      if (this.mode === 'daily') {
        hydrateDeckOnline(this.currentDeck);
        void this.refreshDailyDeckOnline(this.currentDiveNumber, this.activeDateKey);
      }
    }

    updateStreak() {
      const today = getLocalDateKey();
      if (store.lastPlayedDate) {
        const [ly, lm, ld] = String(store.lastPlayedDate).split('-').map(Number);
        const [cy, cm, cd] = today.split('-').map(Number);
        if (ly && lm && ld && cy && cm && cd) {
          const last = new Date(ly, lm - 1, ld);
          const cur = new Date(cy, cm - 1, cd);
          const diffDays = Math.round((cur - last) / (1000 * 60 * 60 * 24));
          if (diffDays > 1) {
            store.curStreak = 0;
          }
        }
      }
    }

    applySettings() {
      document.documentElement.classList.toggle('colorblind', store.colorblind);
      const root = document.querySelector('.ds-root');
      if (root) root.dataset.lowPower = String(store.lowPower);
    }

    mountStage() {
      this.appEl.innerHTML = `
        <div class="ds-root" data-phase="${this.phase}" data-low-power="${store.lowPower}">
          <!-- Fixed Menu Trigger -->
          <button class="kr-menu-trigger" aria-label="Open menu" data-diving="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <!-- Top Right Controls -->
          <button class="kr-corner-btn kr-mute-btn ${store.sound ? '' : 'off'}" aria-label="Toggle sound" title="Mute">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4z"/></svg>
          </button>
          <button class="kr-corner-btn kr-settings-btn" aria-label="Settings" title="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
          <button class="kr-corner-btn kr-wardrobe-btn" aria-label="Wardrobe" title="Dive Buddies">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
          </button>

          <!-- Descent Stage Container -->
          <div id="descent-container"></div>

          <!-- Dynamic Overlay Docks -->
          <div id="dock-layer"></div>
        </div>
      `;

      const descentMount = document.getElementById('descent-container');
      this.descent = createDescentEngine(descentMount);
      this.renderDockLayer();
    }

    setPhase(newPhase) {
      this.phase = newPhase;
      const root = document.querySelector('.ds-root');
      if (root) root.dataset.phase = newPhase;
      const menuTrigger = document.querySelector('.kr-menu-trigger');
      if (menuTrigger) menuTrigger.dataset.diving = String(newPhase !== 'intro');
      this.renderDockLayer();
    }

    renderDockLayer() {
      const dock = document.getElementById('dock-layer');
      if (!dock) return;

      if (this.phase === 'intro') {
        dock.innerHTML = `
          <div class="ds-intro">
            <div class="ds-intro-inner">
              <details class="ds-howto">
                <summary>HOW TO PLAY</summary>
                <ul>
                  <li>7 PROMPTS · 25 SECONDS EACH</li>
                  <li>NAME AN ITEM THAT FITS THE PROMPT</li>
                  <li>COMMON PICKS REST NEAR THE SUNLIT SURFACE</li>
                  <li>RARER AND TRULY OBSCURE ANSWERS PLUNGE YOU TO THE TRENCH FLOOR</li>
                </ul>
              </details>
              <div class="ds-intro-actions">
                <button class="ds-party-card ds-px" data-action="go-party">
                  <span class="ds-party-badge">BETA · PASS THE SHRIMP</span>
                  <span class="ds-party-title">🦐 SHRIMP RELAY</span>
                  <span class="ds-party-meta"><i class="ds-live-dot"></i> LIVE</span>
                </button>
                <button class="ds-begin-btn ds-px" data-action="begin-descent">
                  ▼ &nbsp; BEGIN DESCENT &nbsp; ▼
                </button>
              </div>
              <div class="ds-intro-meta">
                <span>DIVE #${this.currentDiveNumber || this.getDiveNumber()} · STREAK ${store.curStreak}D</span>
                <div style="font-size: 11px; color: var(--color-lumen-cyan); letter-spacing: 0.08em; margin: 4px 0 2px 0;">
                  🌊 7 FRESH PROMPTS EVERY MIDNIGHT · NEVER REPEATS
                </div>
                <div class="ds-intro-links">
                  <button class="ds-meta-link" data-action="open-archive">ARCHIVE ↺</button>
                  <button class="ds-meta-link" data-action="go-packs">THEMED PACKS</button>
                  <button class="ds-meta-link" data-action="go-endless">UNLIMITED ∞</button>
                </div>
              </div>
            </div>
          </div>
        `;
        return;
      }

      if (this.phase === 'preview') {
        const isCinema = this.descentTheme === 'cinema';
        const isTrek = this.descentTheme === 'trek';
        dock.innerHTML = `
          <div class="ds-preview-pill ds-px">
            ${isCinema ? `cruising down Sunset Blvd · action in <b>${this.previewSeconds}</b>…` : (isTrek ? `hiking along the alpine pass · expedition starts in <b>${this.previewSeconds}</b>…` : `descending · the clock starts in <b>${this.previewSeconds}</b>…`)}
          </div>
        `;
        return;
      }

      if (this.phase === 'answering') {
        const isCinema = this.descentTheme === 'cinema';
        const isTrek = this.descentTheme === 'trek';
        const isHot = this.timerSeconds <= 3;
        const fusePct = (this.timerSeconds / 25) * 100;
        const btnActionText = isCinema ? 'DRIVE' : (isTrek ? 'TREK' : 'DIVE');
        dock.innerHTML = `
          ${this.isCheckingOnline ? `
            <div class="ds-preview-pill ds-px" style="color: var(--color-lumen-cyan); bottom: calc(96px + env(safe-area-inset-bottom)); border-color: var(--color-lumen-cyan);">
              📡 ${isCinema ? 'STUDIO ARCHIVES' : (isTrek ? 'TOPOGRAPHIC ATLAS' : 'SONAR PING')} · SEARCHING FOR “${this.checkingRaw}”…
            </div>
          ` : ''}

          ${this.pendingCorrection ? `
            <div class="ds-correction">
              <div class="ds-preview-pill ds-correction-panel ds-px">
                “${this.pendingCorrection.raw}” <span class="ds-correction-arrow">→</span> “${this.pendingCorrection.match.answer}”
                <small class="ds-correction-hint">submit again to confirm · or edit</small>
              </div>
            </div>
          ` : ''}

          ${this.rejectMessage ? `
            <div class="ds-reject">
              ${this.rejectMessage}
              <div class="ds-reject-actions">
                <button class="ds-reject-btn" data-action="accept-as-note">ACCEPT AS NOTE (+15 pts)</button>
              </div>
            </div>
          ` : ''}

          <div class="ds-dock ${isHot ? 'hot' : ''}">
            <div class="ds-dock-inner">
              <div class="ds-sonar-wrap">
                <div class="ds-sonar-scope">
                  <div class="ds-sweep"></div>
                  <div class="ds-time-digits ${isHot ? 'hot' : ''}">${this.timerSeconds}</div>
                </div>
              </div>
              <div class="ds-input-col">
                <input class="ds-input ds-px" id="dive-input" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Type an answer…" autofocus />
                <div class="ds-fuse">
                  <div class="ds-fuse-fill" style="transform: scaleX(${fusePct / 100});"></div>
                </div>
              </div>
              <button class="ds-dive-btn ds-px" id="dive-submit-btn">${btnActionText}</button>
            </div>
          </div>
        `;

        const input = document.getElementById('dive-input');
        if (input && !this.isCheckingOnline) input.focus();
        return;
      }

      // STRICT PROTECTION: In plunge or transition phase, dock layer has NO DESCEND BUTTON!
      if (this.phase === 'plunge') {
        dock.innerHTML = '';
        return;
      }

      if (this.phase === 'transition') {
        const isCinema = this.descentTheme === 'cinema';
        const isTrek = this.descentTheme === 'trek';
        dock.innerHTML = `
          <div class="ds-preview-pill ds-px">
            ${isCinema ? `cruising · scene ${this.roundIdx + 1} ahead…` : (isTrek ? `trekking onward · leg ${this.roundIdx + 1} ahead…` : `descending · prompt ${this.roundIdx + 1} ahead…`)}
          </div>
        `;
        return;
      }

      if (this.phase === 'feedback') {
        const isUnlimitedMode = this.mode === 'endless';
        const isCinema = this.descentTheme === 'cinema';
        const isTrek = this.descentTheme === 'trek';
        const isLast = !isUnlimitedMode && this.roundIdx >= this.currentDeck.length - 1;
        const nextBtnText = isLast
          ? (isCinema ? 'RED CARPET ★' : (isTrek ? 'EXPEDITION SUMMIT ⛰️' : 'SURFACE ▲'))
          : (isUnlimitedMode ? `CONTINUE DIVE ▼ (PROMPT ${this.roundIdx + 2})` : (isCinema ? 'CRUISE ON ▶' : (isTrek ? 'TREK ON ▶' : 'DESCEND ▼')));

        dock.innerHTML = `
          <div class="ds-next-wrap">
            <button class="ds-next-btn ds-px" data-action="next-round" id="next-round-btn" disabled>
              ${nextBtnText}
            </button>
            ${isUnlimitedMode ? `
              <button class="btn-quiet ds-px" data-action="finish-unlimited" style="padding: 12px 20px; font-size: 18px;">
                SURFACE NOW ▲
              </button>
            ` : ''}
          </div>
        `;

        // Delay button activation by 400ms so stray touch/click immediately upon landing does not trigger
        setTimeout(() => {
          const btn = document.getElementById('next-round-btn');
          if (btn && this.phase === 'feedback') {
            btn.disabled = false;
          }
        }, 400);
        return;
      }

      if (this.phase === 'done') {
        dock.innerHTML = this.renderResultsView();
        this.startCountdownTimer();
        return;
      }

      dock.innerHTML = '';
    }

    renderResultsView() {
      const bestBand = SCORE_BANDS.slice().reverse().find((b) => this.score >= b.min) || SCORE_BANDS[0];
      const streak = store.curStreak;
      const played = store.runs.length;
      const avg = played ? Math.round(store.runs.reduce((acc, r) => acc + r.score, 0) / played) : this.score;
      const best = played ? Math.max(...store.runs.map((r) => r.score)) : this.score;
      const isCinema = this.descentTheme === 'cinema';
      const isTrek = this.descentTheme === 'trek';
      const unit = isCinema ? 'ft' : 'm';
      const scorePrefix = isTrek ? '+' : '-';
      const scoreColor = isTrek ? '#52b788' : 'var(--color-lumen-cyan)';
      const doneHeading = this.mode === 'endless'
        ? 'UNLIMITED DIVE'
        : (isTrek ? 'EXPEDITION COMPLETE' : (this.packName ? this.packName.toUpperCase() : 'SHRIMPION'));
      const subHeading = this.mode === 'endless'
        ? `${this.roundResults.length} PROMPTS COMPLETED`
        : (isTrek ? '7 EXPEDITION LEGS CONQUERED' : `DIVE #${this.currentDiveNumber || this.getDiveNumber()} COMPLETE`);

      return `
        <div class="ds-done">
          <div class="ds-done-inner">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="ds-done-krill">${doneHeading}</span>
              <span class="fathom" style="font-size: 13px;">${subHeading}</span>
            </div>

            <!-- Giant Score -->
            <div style="text-align: center; margin: 10px 0;">
              <div style="font-family: var(--font-display); font-size: 5.2rem; color: var(--color-foam); line-height: 0.9;">
                ${this.score}
              </div>
              <div style="color: ${scoreColor}; font-size: 24px; letter-spacing: 0.12em; margin-top: 4px;">
                ${scorePrefix}${(this.score * 10).toLocaleString()}${unit}${isTrek ? ' ELEVATION' : ''}
              </div>
            </div>

            <!-- Percentile Distribution Curve SVG -->
            <div style="background: rgba(11, 21, 38, 0.75); border: 1px solid var(--hairline); padding: 14px 16px;">
              <div class="fathom" style="font-size: 12px; margin-bottom: 6px;">
                PERCENTILE · BETTER THAN ${Math.min(99, Math.max(1, Math.round((this.score / Math.max(100, this.roundResults.length * 100)) * 100)))}% OF EXPLORERS
              </div>
              <svg viewBox="0 0 300 80" style="width: 100%; height: auto; overflow: visible;">
                <path d="M 0 75 Q 75 75, 120 40 T 150 10 T 180 40 Q 225 75, 300 75" fill="none" stroke="rgba(125, 147, 184, 0.45)" stroke-width="2"/>
                <circle cx="${Math.min(290, Math.max(10, (this.score / (this.roundResults.length * 100)) * 300))}" cy="${75 - Math.sin((this.score / (this.roundResults.length * 100)) * Math.PI) * 65}" r="5" fill="var(--color-lumen-pink)"/>
                <text x="${Math.min(270, Math.max(30, (this.score / (this.roundResults.length * 100)) * 300))}" y="${55 - Math.sin((this.score / (this.roundResults.length * 100)) * Math.PI) * 65}" fill="var(--color-lumen-pink)" font-size="12" font-family="var(--font-mono-ui)" text-anchor="middle">YOU</text>
              </svg>
            </div>

            <!-- Dive Log Drop-Line Chart -->
            <div>
              <div class="fathom" style="margin-bottom: 12px;">DIVE LOG · DEEPER = RARER</div>
              <div class="divelog-wrap">
                <div class="divelog-rule" style="top: 0%;"><span>0${unit}</span><i></i></div>
                <div class="divelog-rule" style="top: 30%;"><span>-25</span><i></i></div>
                <div class="divelog-rule" style="top: 60%;"><span>-60</span><i></i></div>
                <div class="divelog-rule" style="top: 85%;"><span>-85</span><i></i></div>
                <div class="divelog-rule" style="top: 100%;"><span>-100</span><i></i></div>
                <div class="divelog-cols" style="grid-template-columns: repeat(${Math.max(1, this.roundResults.length)}, minmax(0, 1fr));">
                  ${this.roundResults.map((r) => {
        const pct = r.tier ? (TIERS[r.tier]?.depth || 0) * 100 : 0;
        const tier = TIERS[r.tier] || { color: 'var(--tier-miss)' };
        return `
                      <div class="divelog-col">
                        <div class="divelog-line" style="height: ${pct}%; background: ${tier.color};"></div>
                        <div class="divelog-node" style="top: ${pct}%; color: ${tier.color};">
                          ${r.tier ? getTierSvg(r.tier) : '<svg viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10"/></svg>'}
                        </div>
                      </div>
                    `;
      }).join('')}
                </div>
              </div>
            </div>

            <!-- The Bearing -->
            <div>
              <div class="fathom" style="margin-bottom: 8px;">THE BEARING</div>
              <div style="border: 1px solid var(--hairline); background: rgba(11, 21, 38, 0.75);">
                ${SCORE_BANDS.map((b) => {
        const isCurrent = b.tier === bestBand.tier;
        return `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px dashed var(--hairline); ${isCurrent ? 'background: rgba(77, 227, 255, 0.12); color: var(--color-lumen-cyan);' : 'color: var(--color-drift);'}">
                      <span style="font-size: 15px; font-weight: ${isCurrent ? 'bold' : 'normal'};">${b.range} ${b.verdict}</span>
                      ${isCurrent ? '<span>◀ YOU</span>' : ''}
                    </div>
                  `;
      }).join('')}
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button class="btn-descend ds-px" data-action="share-result">COPY RESULT</button>
              <button class="btn-cyan ds-px" data-action="go-endless">DIVE UNLIMITED ∞</button>
              <div style="display: flex; gap: 8px;">
                <button class="btn-quiet ds-px" style="flex: 1;" data-action="open-archive">ARCHIVE ↺</button>
                <button class="btn-quiet ds-px" style="flex: 1;" data-action="go-packs">THEMED PACKS 🎬</button>
              </div>
            </div>

            <!-- The Catch (Expandable Round Answers) -->
            <div>
              <div class="fathom" style="margin-bottom: 8px;">THE CATCH · TAP A ROUND FOR EVERY ANSWER</div>
              <div style="border: 1px solid var(--hairline); background: rgba(11, 21, 38, 0.75);">
                ${this.roundResults.map((r, idx) => `
                  <div class="catch-item" data-round="${idx}">
                    <button class="catch-btn" data-action="toggle-catch" data-round="${idx}">
                      <span style="color: var(--color-lumen-pink); font-size: 16px; width: 18px;">${idx + 1}</span>
                      <div style="flex: 1;">
                        <div class="catch-prompt" style="font-size: 16px; color: var(--color-foam);">${r.promptText}</div>
                        <div style="font-size: 14px; color: var(--color-drift);">
                          ${r.tier ? `“${r.answer}” · ${TIERS[r.tier].name}` : 'No catch this round'}
                        </div>
                      </div>
                      <span style="color: ${r.tier ? TIERS[r.tier].color : 'var(--tier-miss)'}; font-size: 16px;">
                        +${r.score}
                      </span>
                    </button>
                    <div class="catch-sheet" id="catch-sheet-${idx}" style="display: none;">
                      <div class="catch-pills">
                        <button class="catch-pill active" data-action="filter-tier" data-round="${idx}" data-tier="all">ALL</button>
                        ${Object.keys(TIERS).map((tid) => `
                          <button class="catch-pill" data-action="filter-tier" data-round="${idx}" data-tier="${tid}">${TIERS[tid].name}</button>
                        `).join('')}
                      </div>
                      <div class="catch-grid" id="catch-grid-${idx}">
                        ${this.renderCatchAnswers(idx, 'all')}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Stats & Countdown -->
            <div style="border-top: 1px dashed var(--hairline); padding-top: 14px; display: flex; justify-content: space-between; font-size: 14px; color: var(--color-drift);">
              <span>STREAK ${streak}D · PLAYED ${played} · AVG ${avg} · BEST ${best}</span>
              <span id="next-dive-countdown">NEXT DIVE IN --:--:--</span>
            </div>
          </div>
        </div>
      `;
    }

    renderCatchAnswers(roundIdx, tierFilter) {
      const q = this.currentDeck[roundIdx];
      if (!q) return '';
      let answers = [...q.answers];
      const custom = store.customAnswers[q.question] || [];
      answers.push(...custom);

      if (tierFilter !== 'all') {
        answers = answers.filter((a) => a[1] === tierFilter);
      }
      return answers.map(([ans, tid, quip]) => {
        const tier = TIERS[tid] || TIERS.plankton;
        return `
          <div class="catch-ans-row" style="--tc: ${tier.color};">
            <div>
              <strong style="color: var(--color-foam);">${ans}</strong>
              <small style="display: block; color: var(--color-drift); font-size: 12px;">${quip || tier.blurb}</small>
            </div>
            <span style="color: ${tier.color}; font-size: 13px;">+${tier.score}</span>
          </div>
        `;
      }).join('');
    }

    startCountdownTimer() {
      if (this.countdownTimerId) {
        clearInterval(this.countdownTimerId);
        this.countdownTimerId = null;
      }
      const countdownStartedDive = this.getDiveNumber();
      const updateCountdown = () => {
        if (!this.isArchiveReplay && this.getDiveNumber() !== countdownStartedDive) {
          if (this.checkDayRollover()) return;
        }
        const el = document.getElementById('next-dive-countdown');
        if (!el) return;
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = tomorrow - now;
        const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        el.textContent = `NEXT DIVE IN ${h}:${m}:${s}`;
      };
      updateCountdown();
      this.countdownTimerId = setInterval(updateCountdown, 1000);
    }

    getDiveNumber(date = null) {
      return getEpochDiveNumber(date);
    }

    beginDescent() {
      if (this.mode === 'daily' && !this.isArchiveReplay) {
        const latestDive = this.getDiveNumber();
        const nowKey = getLocalDateKey();
        if (latestDive !== this.currentDiveNumber || nowKey !== this.activeDateKey) {
          this.currentDiveNumber = latestDive;
          this.activeDateKey = nowKey;
          store.lastSeenDateKey = nowKey;
          const cachedOnline = store.onlineLookup !== false
            && store.dailyOnlineDecks
            && Array.isArray(store.dailyOnlineDecks[nowKey])
            && store.dailyOnlineDecks[nowKey].length === 7
            ? store.dailyOnlineDecks[nowKey]
            : null;
          this.currentDeck = cachedOnline || getDailyDeckForDive(this.currentDiveNumber, { hydrate: true });
          saveStore();
          void this.refreshDailyDeckOnline(this.currentDiveNumber, nowKey);
        }
      }
      audio.event('begin');
      this.roundIdx = 0;
      this.score = 0;
      this.roundResults = [];
      this.previewSeconds = 3;
      this.isPlunging = false;
      this.isTransitioning = false;
      this.setPhase('preview');

      const q = this.currentDeck[this.roundIdx];
      this.descent.descendToRound(this.roundIdx, q.question, () => {
        this.previewTimerId = setInterval(() => {
          this.previewSeconds -= 1;
          if (this.previewSeconds <= 0) {
            clearInterval(this.previewTimerId);
            this.startAnsweringRound();
          } else {
            this.renderDockLayer();
          }
        }, 1000);
      });
    }

    startAnsweringRound() {
      this.timerSeconds = 25;
      this.pendingCorrection = null;
      this.rejectMessage = '';
      this.isCheckingOnline = false;
      this.isPlunging = false;
      this.isTransitioning = false;
      this.setPhase('answering');

      clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        if (this.isCheckingOnline) return;

        this.timerSeconds -= 1;
        const urgency = Math.max(0, 1 - this.timerSeconds / 25);
        this.descent.setUrgency(urgency);

        if (this.timerSeconds <= 3 && this.timerSeconds > 0) {
          audio.event('tick');
        }

        if (this.timerSeconds <= 0) {
          clearInterval(this.timerId);
          this.handleTimeout();
        } else {
          const digits = document.querySelector('.ds-time-digits');
          if (digits) {
            digits.textContent = this.timerSeconds;
            digits.classList.toggle('hot', this.timerSeconds <= 3);
          }
          const fill = document.querySelector('.ds-fuse-fill');
          if (fill) {
            fill.style.transform = `scaleX(${this.timerSeconds / 25})`;
          }
          const dock = document.querySelector('.ds-dock');
          if (dock) {
            dock.classList.toggle('hot', this.timerSeconds <= 3);
          }
        }
      }, 1000);
    }

    async handleAnswerSubmit(rawInput) {
      if (!rawInput.trim() || this.isCheckingOnline || this.isPlunging) return;

      const q = this.currentDeck[this.roundIdx];
      const match = matchAnswerLocal(rawInput, q);

      // Autocorrect confirmation preview
      if (match && match.corrected && store.corrections && (!this.pendingCorrection || this.pendingCorrection.raw !== rawInput)) {
        this.pendingCorrection = { raw: rawInput, match };
        this.renderDockLayer();
        const input = document.getElementById('dive-input');
        if (input) {
          input.value = match.answer;
          input.focus();
        }
        return;
      }

      if (match) {
        clearInterval(this.timerId);
        const submitBtn = document.getElementById('dive-submit-btn');
        if (submitBtn) {
          this.descent.submitFx(submitBtn.getBoundingClientRect());
        }
        this.commitRoundResult(rawInput, match);
        return;
      }

      // Automatic live Wikipedia / Wikidata API verification
      if (store.onlineLookup) {
        this.isCheckingOnline = true;
        this.checkingRaw = rawInput;
        this.renderDockLayer();

        const onlineMatch = await verifyAnswerOnline(rawInput, q);
        this.isCheckingOnline = false;

        if (onlineMatch) {
          clearInterval(this.timerId);
          if (!store.customAnswers[q.question]) store.customAnswers[q.question] = [];
          store.customAnswers[q.question].push([
            onlineMatch.answer,
            onlineMatch.tier,
            onlineMatch.quip,
            [rawInput]
          ]);
          saveStore();

          const submitBtn = document.getElementById('dive-submit-btn');
          if (submitBtn) {
            this.descent.submitFx(submitBtn.getBoundingClientRect());
          }
          this.commitRoundResult(rawInput, onlineMatch);
          return;
        }
      }

      // Rejection
      this.descent.rejectFx();
      this.lastRejectedAnswer = rawInput;
      this.rejectMessage = `“${rawInput}”: no echo. try again.`;
      this.renderDockLayer();

      if (store.clearRejected) {
        const input = document.getElementById('dive-input');
        if (input) {
          input.value = '';
          input.focus();
        }
      }
    }

    acceptAsNote() {
      if (!this.lastRejectedAnswer || this.isPlunging) return;
      const q = this.currentDeck[this.roundIdx];
      const match = {
        answer: this.lastRejectedAnswer,
        tier: 'tooclever',
        quip: 'Logged as a field observation note.'
      };
      clearInterval(this.timerId);
      this.commitRoundResult(this.lastRejectedAnswer, match);
    }

    handleTimeout() {
      if (this.isPlunging) return;
      audio.event('miss');
      const q = this.currentDeck[this.roundIdx];
      this.recordPromptPlayed(q);
      const outcome = {
        answerText: '',
        tier: null,
        points: 0,
        newScore: this.score,
        sub: 'the clock beat you to it.'
      };
      this.roundResults.push({
        promptText: q.question,
        rawAnswer: '',
        answer: '',
        tier: null,
        score: 0,
        meters: 0,
        quip: 'the clock beat you to it.',
        timeout: true
      });

      this.isPlunging = true;
      this.setPhase('plunge');
      this.descent.plunge(outcome, () => {
        this.isPlunging = false;
        this.setPhase('feedback');
      });
    }

    commitRoundResult(rawInput, match) {
      if (this.isPlunging) return;
      const q = this.currentDeck[this.roundIdx];
      this.recordPromptPlayed(q);
      const tier = TIERS[match.tier] || TIERS.plankton;
      const pts = tier.score;
      const meters = pts * 10;

      this.score += pts;
      const outcome = {
        answerText: match.answer,
        tier: match.tier,
        points: pts,
        newScore: this.score,
        sub: match.quip || tier.blurb
      };

      this.roundResults.push({
        promptText: q.question,
        rawAnswer: rawInput,
        answer: match.answer,
        tier: match.tier,
        score: pts,
        meters: meters,
        quip: match.quip || tier.blurb,
        timeout: false
      });

      // Enter plunge phase and disable buttons/input completely
      this.isPlunging = true;
      this.setPhase('plunge');
      this.descent.plunge(outcome, () => {
        this.isPlunging = false;
        this.setPhase('feedback');
      });
    }

    nextRound() {
      // STRICT GUARD: Reject clicks if sinking animation is running or transition is already underway!
      if (this.isPlunging || this.isTransitioning || this.phase !== 'feedback') {
        return;
      }
      this.isTransitioning = true;
      this.setPhase('transition');

      const isUnlimitedMode = this.mode === 'endless';
      if (!isUnlimitedMode && this.roundIdx >= this.currentDeck.length - 1) {
        this.finishDive();
      } else {
        this.roundIdx += 1;
        // In unlimited mode, wrap around if needed or keep pulling
        if (isUnlimitedMode && this.roundIdx >= this.currentDeck.length) {
          this.currentDeck = this.buildUnlimitedDeck();
          this.roundIdx = 0;
        }

        const q = this.currentDeck[this.roundIdx];
        if (isUnlimitedMode) {
          hydrateDeckOnline(this.currentDeck.slice(this.roundIdx + 1, this.roundIdx + 4));
        }
        this.descent.descendToRound(this.roundIdx, q.question, () => {
          this.startAnsweringRound();
        });
      }
    }

    finishDive() {
      this.isPlunging = false;
      this.isTransitioning = false;
      store.runs.unshift({
        date: new Date().toISOString(),
        diveNumber: this.currentDiveNumber || this.getDiveNumber(),
        mode: this.mode,
        pack: this.packName,
        score: this.score,
        depth: this.score * 10,
        results: [...this.roundResults]
      });

      const today = getLocalDateKey();
      store.lastSeenDateKey = today;
      if (store.lastPlayedDate !== today) {
        store.curStreak += 1;
        if (store.curStreak > store.maxStreak) {
          store.maxStreak = store.curStreak;
        }
        store.lastPlayedDate = today;
      }
      saveStore();

      this.setPhase('done');
    }

    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    recordPromptPlayed(q) {
      if (!q) return;
      const pKey = q.id || q.question;
      if (!pKey) return;
      if (this.mode === 'endless') {
        if (!Array.isArray(store.seenUnlimitedIds)) store.seenUnlimitedIds = [];
        if (!store.seenUnlimitedIds.includes(pKey)) {
          store.seenUnlimitedIds.push(pKey);
          saveStore();
        }
        if (store.seenUnlimitedIds.length % 7 === 0 && store.onlineLookup !== false && typeof fetch === 'function') {
          void discoverDynamicWikipediaPrompt(this.roundIdx % 7, Date.now() ^ store.seenUnlimitedIds.length);
        }
      } else if (this.mode === 'daily') {
        if (!store.seenDailyMap || typeof store.seenDailyMap !== 'object') store.seenDailyMap = {};
        const dKey = String(this.currentDiveNumber || this.getDiveNumber());
        const list = Array.isArray(store.seenDailyMap[dKey]) ? store.seenDailyMap[dKey] : [];
        if (!list.includes(pKey)) {
          list.push(pKey);
          store.seenDailyMap[dKey] = list;
          saveStore();
        }
      }
    }

    buildUnlimitedDeck() {
      const dynamicPool = Array.isArray(store.dynamicPrompts) ? store.dynamicPrompts : [];
      const combinedPool = MASTER_PROMPT_POOL.concat(dynamicPool);
      const seenSet = new Set(Array.isArray(store.seenUnlimitedIds) ? store.seenUnlimitedIds : []);
      let remaining = combinedPool.filter((q) => !seenSet.has(q.id || q.question));
      if (remaining.length === 0) {
        store.seenUnlimitedIds = [];
        saveStore();
        remaining = [...combinedPool];
      }
      const deck = this.shuffleArray(remaining);
      hydrateDeckOnline(deck.slice(0, 7));
      if (store.onlineLookup !== false && typeof fetch === 'function') {
        const trackId = Math.floor(Math.random() * 7);
        void discoverDynamicWikipediaPrompt(trackId, Date.now() ^ (store.seenUnlimitedIds.length * 7919));
      }
      return deck;
    }

    startUnlimitedMode() {
      this.mode = 'endless';
      this.packName = '';
      this.descentTheme = 'ocean';
      this.descent.setTheme('ocean');
      this.descent.setUnlimited(true);
      this.currentDeck = this.buildUnlimitedDeck();
      this.roundIdx = 0;
      this.roundResults = [];
      this.score = 0;
      this.descent.intro();
      this.setPhase('intro');
      this.beginDescent();
      const totalPool = MASTER_PROMPT_POOL.length + (Array.isArray(store.dynamicPrompts) ? store.dynamicPrompts.length : 0);
      this.showToast(`UNLIMITED MODE: ${totalPool}+ ZERO-REPEAT PROMPTS!`);
    }

    startPack(packName) {
      const pack = PACKS[packName];
      if (!pack) return;
      this.mode = 'pack';
      this.packName = packName;
      this.descentTheme = pack.theme || 'ocean';
      this.descent.setTheme(this.descentTheme);
      this.descent.setUnlimited(false);
      this.currentDeck = pack.prompts;
      this.descent.intro();
      this.setPhase('intro');
      this.beginDescent();
      if (pack.theme === 'cinema') {
        this.showToast('AT THE MOVIES: CRUISE HOLLYWOOD BLVD!');
      } else if (pack.theme === 'trek') {
        this.showToast('EXPEDITION: TREK THE ALPINE RANGE!');
      } else if (pack.theme === 'sports') {
        this.showToast('THE DEEP BENCH: TAKE THE FIELD!');
      } else if (pack.theme === 'food') {
        this.showToast("CHEF'S TABLE: SAVOR THE SPREAD!");
      } else if (pack.theme === 'sky') {
        this.showToast('COSMOS: LAUNCH INTO DEEP SPACE!');
      } else if (pack.theme === 'history') {
        this.showToast('CHRONICLES: UNEARTH ANCIENT LORE!');
      } else if (pack.theme === 'ocean') {
        this.showToast('REEF & TRENCH: PLUNGE INTO THE ABYSS!');
      }
    }

    checkDayRollover() {
      const nowKey = getLocalDateKey();
      const latestDive = this.getDiveNumber();
      const wasStaleSession = nowKey !== this.activeDateKey
        || (!this.isArchiveReplay && this.mode === 'daily' && latestDive !== this.currentDiveNumber);
      const storedDateChanged = Boolean(store.lastSeenDateKey && store.lastSeenDateKey !== nowKey);

      if (!wasStaleSession && !storedDateChanged) {
        if (!store.lastSeenDateKey) {
          store.lastSeenDateKey = nowKey;
          saveStore();
        }
        return false;
      }

      this.activeDateKey = nowKey;
      store.lastSeenDateKey = nowKey;
      saveStore();

      if (wasStaleSession && this.mode === 'daily' && !this.isArchiveReplay && (this.phase === 'intro' || this.phase === 'done')) {
        if (this.countdownTimerId) {
          clearInterval(this.countdownTimerId);
          this.countdownTimerId = null;
        }
        this.currentDiveNumber = latestDive;
        const cachedOnline = store.onlineLookup !== false
          && store.dailyOnlineDecks
          && Array.isArray(store.dailyOnlineDecks[nowKey])
          && store.dailyOnlineDecks[nowKey].length === 7
          ? store.dailyOnlineDecks[nowKey]
          : null;
        this.currentDeck = cachedOnline || getDailyDeckForDive(this.currentDiveNumber, { hydrate: true });
        this.roundIdx = 0;
        this.roundResults = [];
        this.score = 0;
        if (this.descent && typeof this.descent.intro === 'function') {
          this.descent.intro();
        }
        this.setPhase('intro');
        void this.refreshDailyDeckOnline(this.currentDiveNumber, nowKey);
        this.showToast(`NEW DAY · DIVE #${latestDive} LOADED!`);
      }
      return true;
    }

    async refreshDailyDeckOnline(diveNumber, dateKey) {
      if (store.onlineLookup === false || typeof fetch !== 'function') return null;
      if (store.dailyOnlineDecks && Array.isArray(store.dailyOnlineDecks[dateKey]) && store.dailyOnlineDecks[dateKey].length === 7) {
        if (!this.isArchiveReplay && this.mode === 'daily' && this.currentDiveNumber === diveNumber && this.phase === 'intro') {
          this.currentDeck = store.dailyOnlineDecks[dateKey];
        }
        return store.dailyOnlineDecks[dateKey];
      }
      if (!this._refreshPromises) this._refreshPromises = new Map();
      if (this._refreshPromises.has(dateKey)) {
        return await this._refreshPromises.get(dateKey);
      }
      const work = (async () => {
        try {
          const fallbackDeck = getDailyDeckForDive(diveNumber, { hydrate: true });
          const results = await Promise.allSettled(
            Array.from({ length: 7 }, (_, trackId) =>
              discoverDynamicWikipediaPrompt(trackId, diveNumber * 131071 + trackId * 8191 + 17)
            )
          );
          let onlineHits = 0;
          const mergedDeck = fallbackDeck.map((fallbackPrompt, trackId) => {
            const res = results[trackId];
            if (res && res.status === 'fulfilled' && res.value && Array.isArray(res.value.answers) && res.value.answers.length >= 8) {
              onlineHits++;
              return res.value;
            }
            return fallbackPrompt;
          });
          if (onlineHits > 0) {
            if (!store.dailyOnlineDecks || typeof store.dailyOnlineDecks !== 'object') {
              store.dailyOnlineDecks = {};
            }
            store.dailyOnlineDecks[dateKey] = mergedDeck;
            saveStore();
            if (!this.isArchiveReplay && this.mode === 'daily' && this.currentDiveNumber === diveNumber && this.phase === 'intro') {
              this.currentDeck = mergedDeck;
            }
          }
          return mergedDeck;
        } finally {
          this._refreshPromises.delete(dateKey);
        }
      })();
      this._refreshPromises.set(dateKey, work);
      return await work;
    }

    startDailyDive(targetDiveNumber = null) {
      const todayDive = this.getDiveNumber();
      this.isArchiveReplay = targetDiveNumber !== null && targetDiveNumber !== todayDive;
      this.activeDateKey = getLocalDateKey();
      store.lastSeenDateKey = this.activeDateKey;
      saveStore();
      this.mode = 'daily';
      this.packName = '';
      this.descentTheme = 'ocean';
      this.descent.setTheme('ocean');
      this.descent.setUnlimited(false);
      this.currentDiveNumber = targetDiveNumber !== null ? targetDiveNumber : todayDive;
      const cachedOnline = !this.isArchiveReplay
        && store.onlineLookup !== false
        && store.dailyOnlineDecks
        && Array.isArray(store.dailyOnlineDecks[this.activeDateKey])
        && store.dailyOnlineDecks[this.activeDateKey].length === 7
        ? store.dailyOnlineDecks[this.activeDateKey]
        : null;
      this.currentDeck = cachedOnline || getDailyDeckForDive(this.currentDiveNumber, { hydrate: true });
      this.roundIdx = 0;
      this.roundResults = [];
      this.score = 0;
      this.descent.intro();
      this.setPhase('intro');
      if (!this.isArchiveReplay) {
        void this.refreshDailyDeckOnline(this.currentDiveNumber, this.activeDateKey);
      }
      this.beginDescent();
    }

    // --- Modal Management ---
    openModal(dialogId, contentHtml) {
      const dialog = document.getElementById(dialogId);
      if (!dialog) return;
      dialog.innerHTML = contentHtml;
      if (!dialog.open) {
        dialog.showModal();
      }

      if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.onclick = (e) => {
          if (e.target === dialog) {
            const rect = dialog.getBoundingClientRect();
            const inContent = (
              rect.top <= e.clientY &&
              e.clientY <= rect.top + rect.height &&
              rect.left <= e.clientX &&
              e.clientX <= rect.left + rect.width
            );
            if (!inContent) dialog.close();
          }
        };
      }
    }

    showToast(msg) {
      const toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    initGlobalEvents() {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('button, [data-action]');
        if (!btn) return;

        if (btn.classList.contains('kr-mute-btn')) {
          store.sound = !store.sound;
          saveStore();
          audio.updateMute();
          btn.classList.toggle('off', !store.sound);
          this.showToast(store.sound ? 'SOUND UNMUTED' : 'SOUND MUTED');
          return;
        }

        if (btn.classList.contains('kr-menu-trigger')) {
          this.openMenuModal();
          return;
        }

        if (btn.classList.contains('kr-settings-btn')) {
          this.openSettingsModal();
          return;
        }

        if (btn.classList.contains('kr-wardrobe-btn')) {
          this.openWardrobeModal();
          return;
        }

        const action = btn.dataset.action;
        if (!action) return;

        switch (action) {
          case 'begin-descent':
            this.beginDescent();
            break;
          case 'next-round':
            this.nextRound();
            break;
          case 'finish-unlimited':
            this.finishDive();
            break;
          case 'accept-as-note':
            this.acceptAsNote();
            break;
          case 'go-home':
            this.startDailyDive();
            break;
          case 'go-endless':
            this.startUnlimitedMode();
            break;
          case 'go-packs':
            this.openPacksModal();
            break;
          case 'go-party':
            this.openPartyModal();
            break;
          case 'open-archive':
            this.openArchiveModal();
            break;
          case 'toggle-catch': {
            const round = btn.dataset.round;
            const sheet = document.getElementById(`catch-sheet-${round}`);
            if (sheet) {
              sheet.style.display = sheet.style.display === 'none' ? 'block' : 'none';
            }
            break;
          }
          case 'filter-tier': {
            const round = btn.dataset.round;
            const tier = btn.dataset.tier;
            const container = btn.closest('.catch-sheet');
            if (container) {
              container.querySelectorAll('.catch-pill').forEach((p) => p.classList.toggle('active', p.dataset.tier === tier));
              const grid = document.getElementById(`catch-grid-${round}`);
              if (grid) grid.innerHTML = this.renderCatchAnswers(Number(round), tier);
            }
            break;
          }
          case 'share-result': {
            const unit = this.descentTheme === 'cinema' ? 'ft' : 'm';
            const text = `SHRIMPION #${this.currentDiveNumber || this.getDiveNumber()} 🦐\nScore: ${this.score}/700 (-${(this.score * 10).toLocaleString()}${unit})\n${this.roundResults.map((r) => r.tier ? TIERS[r.tier]?.emoji || '🫧' : '⬛').join('')}\nhttps://shrimpion.io`;
            if (navigator.clipboard) {
              navigator.clipboard.writeText(text).then(() => this.showToast('COPIED TO CLIPBOARD!'));
            } else {
              this.showToast('COPIED RESULT!');
            }
            break;
          }
          case 'equip-buddy': {
            const buddyId = btn.dataset.buddy;
            store.equippedBuddy = buddyId;
            saveStore();
            this.descent.setTheme(this.descentTheme || 'ocean');
            this.openWardrobeModal();
            this.showToast(`EQUIPPED ${buddyId.toUpperCase()}`);
            break;
          }
          case 'reset-reaction-assets':
            store.reactionAssets = {};
            saveStore();
            this.descent.refreshReactionAssets();
            this.openSettingsModal();
            this.showToast('DEFAULT REACTION ICONS RESTORED');
            break;
        }
      });

      document.addEventListener('submit', (e) => {
        if (e.target.id === 'party-turn-form') {
          e.preventDefault();
          const input = document.getElementById('party-turn-input');
          if (input && input.value) {
            this.party.used.push(input.value);
            this.party.turn += 1;
            this.party.meter = Math.min(600, this.party.meter + 40);
            input.value = '';
            this.renderDockLayer();
          }
          return;
        }

        e.preventDefault();
        const input = document.getElementById('dive-input');
        if (input && input.value) {
          const val = input.value;
          this.handleAnswerSubmit(val);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const input = document.getElementById('dive-input');
          if (input && document.activeElement === input) {
            e.preventDefault();
            this.handleAnswerSubmit(input.value);
          }
        }
      });

      document.addEventListener('input', (e) => {
        if (e.target.id === 'dive-input') {
          const rect = e.target.getBoundingClientRect();
          this.descent.typeFx(rect.left + rect.width / 2, rect.top);
        }
      });

      document.addEventListener('change', (e) => {
        const input = e.target.closest('.reaction-asset-input');
        if (!input || !input.files || !input.files[0]) return;
        const file = input.files[0];
        const key = input.dataset.reaction;
        if (!REACTION_ASSET_KEYS.includes(key)) return;
        if (!/^image\/(?:png|jpeg|gif|webp)$/i.test(file.type) || file.size > 2 * 1024 * 1024) {
          input.value = '';
          this.showToast('USE A PNG, JPEG, GIF, OR WEBP UNDER 2 MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          if (!isSafeReactionAsset(reader.result)) {
            this.showToast('THAT IMAGE COULD NOT BE SAVED');
            return;
          }
          store.reactionAssets[key] = reader.result;
          saveStore();
          this.descent.refreshReactionAssets();
          this.openSettingsModal();
          this.showToast(`${REACTION_ASSET_META[key].label.toUpperCase()} FACE SAVED`);
        };
        reader.onerror = () => this.showToast('THAT IMAGE COULD NOT BE READ');
        reader.readAsDataURL(file);
      });
    }

    openMenuModal() {
      this.openModal('dialog-menu', `
        <div class="kr-dialog-panel ds-px">
          <div class="kr-dialog-header">
            <div>
              <div class="kr-dialog-eyebrow">MENU</div>
              <h2 class="kr-dialog-title">NAVIGATION</h2>
            </div>
            <button class="kr-dialog-close ds-px" onclick="document.getElementById('dialog-menu').close()">✕</button>
          </div>
          <div class="kr-menu-grid">
            <button class="kr-menu-card ds-px" onclick="document.getElementById('dialog-menu').close(); window._shrimpion.startDailyDive();" ${this.mode === 'daily' ? 'aria-current="page"' : ''}>
              <span style="font-size: 26px;">🌊</span>
              <span>DAILY DIVE</span>
            </button>
            <button class="kr-menu-card ds-px" onclick="document.getElementById('dialog-menu').close(); window._shrimpion.startUnlimitedMode();" ${this.mode === 'endless' ? 'aria-current="page"' : ''}>
              <span style="font-size: 26px;">∞</span>
              <span>UNLIMITED</span>
            </button>
            <button class="kr-menu-card ds-px" onclick="document.getElementById('dialog-menu').close(); window._shrimpion.openPacksModal();" ${this.mode === 'pack' ? 'aria-current="page"' : ''}>
              <span style="font-size: 26px;">🎬</span>
              <span>THEMED PACKS</span>
            </button>
            <button class="kr-menu-card ds-px" onclick="document.getElementById('dialog-menu').close(); window._shrimpion.openArchiveModal();">
              <span style="font-size: 26px;">↺</span>
              <span>ARCHIVE</span>
            </button>
            <button class="kr-menu-card ds-px" onclick="document.getElementById('dialog-menu').close(); window._shrimpion.openWardrobeModal();">
              <span style="font-size: 26px;">🦐</span>
              <span>BUDDIES</span>
            </button>
            <button class="kr-menu-card ds-px" onclick="document.getElementById('dialog-menu').close(); window._shrimpion.openSettingsModal();">
              <span style="font-size: 26px;">⚙️</span>
              <span>SETTINGS</span>
            </button>
          </div>
        </div>
      `);
    }

    openSettingsModal() {
      this.openModal('dialog-settings', `
        <div class="kr-dialog-panel ds-px">
          <div class="kr-dialog-header">
            <div>
              <div class="kr-dialog-eyebrow">PREFERENCES</div>
              <h2 class="kr-dialog-title">SETTINGS</h2>
            </div>
            <button class="kr-dialog-close ds-px" onclick="document.getElementById('dialog-settings').close()">✕</button>
          </div>
          <div style="display: flex; flex-direction: column;">
            <div class="kr-pref-row" onclick="
              window._shrimpion.toggleSetting('sound');
              this.querySelector('.kr-switch').setAttribute('aria-checked', String(window._shrimpion.getSetting('sound')));
            ">
              <div>
                <div class="kr-pref-label">SOUND FX</div>
                <div class="kr-pref-desc">Web Audio synthesis chimes, plunge noise, and sonar ticks</div>
              </div>
              <div class="kr-switch ds-px" aria-checked="${store.sound}">
                <div class="kr-switch-thumb ds-px"></div>
              </div>
            </div>

            <div class="kr-pref-row" onclick="
              window._shrimpion.toggleSetting('colorblind');
              this.querySelector('.kr-switch').setAttribute('aria-checked', String(window._shrimpion.getSetting('colorblind')));
            ">
              <div>
                <div class="kr-pref-label">HIGH CONTRAST / COLORBLIND</div>
                <div class="kr-pref-desc">Enhanced outlines and distinct palette for tier lines</div>
              </div>
              <div class="kr-switch ds-px" aria-checked="${store.colorblind}">
                <div class="kr-switch-thumb ds-px"></div>
              </div>
            </div>

            <div class="kr-pref-row" onclick="
              window._shrimpion.toggleSetting('corrections');
              this.querySelector('.kr-switch').setAttribute('aria-checked', String(window._shrimpion.getSetting('corrections')));
            ">
              <div>
                <div class="kr-pref-label">ANSWER CORRECTIONS</div>
                <div class="kr-pref-desc">Preview fuzzy spelling matches before plunging</div>
              </div>
              <div class="kr-switch ds-px" aria-checked="${store.corrections}">
                <div class="kr-switch-thumb ds-px"></div>
              </div>
            </div>

            <div class="kr-pref-row" onclick="
              window._shrimpion.toggleSetting('onlineLookup');
              this.querySelector('.kr-switch').setAttribute('aria-checked', String(window._shrimpion.getSetting('onlineLookup')));
            ">
              <div>
                <div class="kr-pref-label">LIVE ARCHIVE SEARCH</div>
                <div class="kr-pref-desc">Check Wikipedia & Wikidata when niche answers are typed</div>
              </div>
              <div class="kr-switch ds-px" aria-checked="${store.onlineLookup}">
                <div class="kr-switch-thumb ds-px"></div>
              </div>
            </div>

            <div class="kr-pref-row" onclick="
              window._shrimpion.toggleSetting('lowPower');
              this.querySelector('.kr-switch').setAttribute('aria-checked', String(window._shrimpion.getSetting('lowPower')));
            ">
              <div>
                <div class="kr-pref-label">LOW POWER MODE</div>
                <div class="kr-pref-desc">Limits canvas framerate and pauses ambient background loops</div>
              </div>
              <div class="kr-switch ds-px" aria-checked="${store.lowPower}">
                <div class="kr-switch-thumb ds-px"></div>
              </div>
            </div>
          </div>
          <div class="kr-reaction-assets">
            <div class="kr-pref-label">FRIEND-FACE REACTIONS</div>
            <div class="kr-pref-desc">Choose PNG, JPEG, GIF, or WebP images. They stay in this browser and replace the result icons.</div>
            <div class="kr-reaction-grid">
              ${REACTION_ASSET_KEYS.map((key) => {
        const meta = REACTION_ASSET_META[key];
        return `
                <label class="kr-reaction-item">
                  <span class="kr-reaction-preview">${getReactionAssetHtml(key)}</span>
                  <span class="kr-reaction-copy">
                    <strong>${meta.label}</strong>
                    <small>${meta.description}</small>
                  </span>
                  <input class="reaction-asset-input" type="file" accept="image/png,image/jpeg,image/gif,image/webp" data-reaction="${key}" />
                </label>
              `;
      }).join('')}
            </div>
            <button class="btn-quiet ds-px kr-reaction-reset" data-action="reset-reaction-assets">USE DEFAULT PIXEL ICONS</button>
          </div>
        </div>
      `);
    }

    openWardrobeModal() {
      this.openModal('dialog-wardrobe', `
        <div class="kr-dialog-panel ds-px">
          <div class="kr-dialog-header">
            <div>
              <div class="kr-dialog-eyebrow">WARDROBE</div>
              <h2 class="kr-dialog-title">DIVE BUDDIES</h2>
            </div>
            <button class="kr-dialog-close ds-px" onclick="document.getElementById('dialog-wardrobe').close()">✕</button>
          </div>
          <div class="kr-buddy-grid">
            ${BUDDIES.map((b) => {
        const unlocked = store.maxStreak >= b.unlockStreak;
        const isEquipped = store.equippedBuddy === b.id;
        return `
                <div class="kr-buddy-card ${unlocked ? '' : 'locked'} ds-px" aria-pressed="${isEquipped}">
                  <div class="kr-buddy-sprite">${getBuddySvg(b.id, false, false)}</div>
                  <strong style="font-size: 16px; color: var(--color-foam);">${b.name}</strong>
                  <small style="font-size: 12px; color: var(--color-drift); text-align: center;">${b.desc}</small>
                  ${unlocked ? `
                    <button class="btn-quiet ds-px" style="margin-top: 8px; width: 100%; font-size: 14px; padding: 6px;" data-action="equip-buddy" data-buddy="${b.id}">
                      ${isEquipped ? 'EQUIPPED' : 'EQUIP'}
                    </button>
                  ` : `
                    <span style="font-size: 12px; color: var(--color-drift); margin-top: 8px;">UNLOCKS AT ${b.unlockStreak}D STREAK</span>
                  `}
                </div>
              `;
      }).join('')}
          </div>
        </div>
      `);
    }

    openPacksModal() {
      const PACK_META = {
        'Expeditions: Geography Trek': {
          themeColor: '#52b788',
          panelColor: '#0a2114',
          badge: '🧭 EXPEDITION',
          status: 'MOUNTAIN TREK',
          cta: 'TREK NOW ↗'
        },
        'At the Movies': {
          themeColor: '#ff2a70',
          panelColor: '#240833',
          badge: '🎬 HOLLYWOOD',
          status: 'NOW SHOWING',
          cta: 'CRUISE NOW ↗'
        },
        'The Deep Bench': {
          themeColor: '#f77f00',
          panelColor: '#261300',
          badge: '🏟️ ATHLETICS',
          status: 'MATCH DAY',
          cta: 'TAKE FIELD ↗'
        },
        "Chef's Table": {
          themeColor: '#e76f51',
          panelColor: '#281008',
          badge: '🍳 CULINARY',
          status: 'GRAND TASTING',
          cta: 'SAVOR NOW ↗'
        },
        'Cosmos & Stargazer': {
          themeColor: '#9d4edd',
          panelColor: '#19072b',
          badge: '🔭 ASTRONOMY',
          status: 'DEEP ORBIT',
          cta: 'ORBIT NOW ↗'
        },
        'Chronicles & Lore': {
          themeColor: '#d4af37',
          panelColor: '#261e05',
          badge: '🏛️ ANCIENT HISTORY',
          status: 'CHRONICLES',
          cta: 'UNEARTH ↗'
        },
        'Reef & Trench': {
          themeColor: '#00b4d8',
          panelColor: '#031e2e',
          badge: '🌊 MARINE LIFE',
          status: 'ABYSSAL DIVE',
          cta: 'PLUNGE NOW ↗'
        }
      };

      this.openModal('dialog-packs', `
        <div class="kr-dialog-panel ds-px">
          <div class="kr-dialog-header">
            <div>
              <div class="kr-dialog-eyebrow">CHARTED WORLDS &amp; EXPEDITIONS</div>
              <h2 class="kr-dialog-title">7 THEMED PACKS</h2>
            </div>
            <button class="kr-dialog-close ds-px" onclick="document.getElementById('dialog-packs').close()">✕</button>
          </div>
          <p style="color: var(--color-drift); font-size: 14px; margin-bottom: 12px;">
            Choose a themed expedition — 7 specialized prompts per pack:
          </p>
          <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
            ${Object.keys(PACKS).map((pName) => {
        const pack = PACKS[pName];
        const meta = PACK_META[pName] || {
          themeColor: '#4de3ff',
          panelColor: '#101d33',
          badge: pack.theme.toUpperCase(),
          status: 'FREE PLAY',
          cta: 'PLAY NOW ↗'
        };
        return `
                <button class="pack-card ds-px" onclick="
                  document.getElementById('dialog-packs').close();
                  window._shrimpion.startPack('${pName}');
                " style="--pc: ${meta.themeColor}; --pc-panel: ${meta.panelColor};">
                  <div class="pack-banner">
                    <span>${meta.badge}</span>
                    <span>${meta.status}</span>
                  </div>
                  <div class="pack-body">
                    <div class="pack-name">${pName}</div>
                    <div class="pack-tagline">${pack.tagline}</div>
                    <div class="pack-foot">
                      <span>${pack.prompts.length} PROMPTS</span>
                      <span style="color: var(--pc, var(--color-lumen-cyan));">${meta.cta}</span>
                    </div>
                  </div>
                </button>
              `;
      }).join('')}
          </div>
        </div>
      `);
    }

    openArchiveModal() {
      const todayDive = this.getDiveNumber();
      const days = Array.from({ length: 14 }, (_, i) => {
        const diveNum = Math.max(1, todayDive - (13 - i));
        const isDone = store.runs.some((r) => r.diveNumber === diveNum);
        return {
          day: diveNum,
          done: isDone,
          isToday: diveNum === todayDive
        };
      });
      this.openModal('dialog-archive', `
        <div class="kr-dialog-panel ds-px">
          <div class="kr-dialog-header">
            <div>
              <div class="kr-dialog-eyebrow">CHRONICLES &amp; LOGS</div>
              <h2 class="kr-dialog-title">DAILY DIVE ARCHIVE</h2>
            </div>
            <button class="kr-dialog-close ds-px" onclick="document.getElementById('dialog-archive').close()">✕</button>
          </div>
          <p style="color: var(--color-drift); font-size: 14px; margin-bottom: 12px;">
            Replay any past daily dive with its original 7 prompts from that calendar date:
          </p>
          <div class="kr-archive-grid">
            ${days.map((d) => `
              <button class="kr-archive-tile ds-px ${d.done ? 'done' : ''} ${d.isToday ? 'current' : ''}" onclick="
                document.getElementById('dialog-archive').close();
                window._shrimpion.startDailyDive(${d.day});
              ">
                <span style="font-size: 11px; color: ${d.isToday ? 'var(--color-lumen-pink)' : 'var(--color-drift)'};">${d.isToday ? 'TODAY' : 'DIVE'}</span>
                <strong style="font-size: 20px; color: var(--color-foam);">${d.day}</strong>
                <span style="font-size: 11px; color: ${d.done ? 'var(--color-lumen-cyan)' : (d.isToday ? 'var(--color-lumen-pink)' : 'var(--color-drift)')};">
                  ${d.done ? 'COMPLETED' : (d.isToday ? 'PLAY TODAY' : 'PLAY')}
                </span>
              </button>
            `).join('')}
          </div>
        </div>
      `);
    }

    openPartyModal() {
      this.openModal('dialog-party', `
        <div class="kr-dialog-panel ds-px">
          <div class="kr-dialog-header">
            <div>
              <div class="kr-dialog-eyebrow">LOCAL PARTY MODE</div>
              <h2 class="kr-dialog-title">SHRIMP RELAY</h2>
            </div>
            <button class="kr-dialog-close ds-px" onclick="document.getElementById('dialog-party').close()">✕</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <p style="color: var(--color-drift); font-size: 15px; line-height: 1.4;">
              Pass the device between friends! Name an answer in the prompt, pass it along. The secret fuse carries over — if it pops on your turn, you lose a shell!
            </p>
            <div>
              <label style="display: block; font-size: 12px; color: var(--color-drift); margin-bottom: 4px;">PLAYERS (COMMA-SEPARATED)</label>
              <input class="ds-input ds-px" id="modal-party-players" value="${this.party.players.join(', ')}" />
            </div>
            <button class="btn-descend ds-px" onclick="
              const val = document.getElementById('modal-party-players').value;
              window._shrimpion.party.players = val.split(',').map(s => s.trim()).filter(Boolean);
              document.getElementById('dialog-party').close();
              window._shrimpion.startPartyGame();
            ">
              START RELAY ↗
            </button>
          </div>
        </div>
      `);
    }

    startPartyGame() {
      this.mode = 'party';
      this.party.running = true;
      this.party.turn = 0;
      this.party.fuse = 18;
      this.party.meter = 0;
      this.party.used = [];
      this.setPhase('answering');
    }

    toggleSetting(key) {
      store[key] = !store[key];
      saveStore();
      this.applySettings();
      if (key === 'sound') audio.updateMute();
    }

    getSetting(key) {
      return store[key];
    }
  }

  // Mount Application instance
  window.addEventListener('DOMContentLoaded', () => {
    window._shrimpion = new ShrimpionApp();
  });
})();