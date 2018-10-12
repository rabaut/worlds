import Types from "./types"

export const Tiers = {
  COMMON: "COMMON",
  RARE: "RARE",
  EPIC: "EPIC",
  LEGENDARY: "LEGENDARY",
  ICE: "ICE",
  MAGMA: "MAGMA",
  LIGHT: "LIGHT",
  SHADOW: "SHADOW"
}

export const SWORDS = [
  {
    name: "Wood Sword",
    tier: Tiers.COMMON,
    src: "item-sword-wood.png"
  },
  {
    name: "Magma Sword",
    tier: Tiers.MAGMA,
    src: "item-sword-magma.png"
  },
  {
    name: "Ice Sword",
    tier: Tiers.ICE,
    src: "item-sword-ice.png"
  }
].map(sword => ({ ...sword, type: Types.SWORD }))

export const SHIELDS = [
  {
    name: "Wood Shield",
    tier: Tiers.COMMON,
    src: "item-shield-wood.png"
  },

  {
    name: "Copper Shield",
    tier: Tiers.COMMON,
    src: "item-shield-copper.png"
  },
  {
    name: "Iron Shield",
    tier: Tiers.COMMON,
    src: "item-shield-iron.png"
  },
  {
    name: "Lead Shield",
    tier: Tiers.COMMON,
    src: "item-shield-lead.png"
  },

  {
    name: "Silver Shield",
    tier: Tiers.RARE,
    src: "item-shield-silver.png"
  },
  {
    name: "Gold Shield",
    tier: Tiers.RARE,
    src: "item-shield-gold.png"
  },

  {
    name: "Magma Shield",
    tier: Tiers.MAGMA,
    src: "item-shield-magma.png"
  },

  {
    name: "Ice Shield",
    tier: Tiers.ICE,
    src: "item-shield-ice.png"
  }
].map(shield => ({ ...shield, type: Types.SHIELD }))

export const HELMETS = [
  {
    name: "Wood Helmet",
    src: "item-helmet-wood.png"
  },
  {
    name: "Magma Helmet",
    src: "item-helmet-magma.png"
  }
].map(helmet => ({ ...helmet, type: Types.HELMET }))

export const BREASTPLATES = [
  {
    name: "Wood Breastplate",
    src: "item-breastplate-wood.png",
    def: 5
  },

  {
    name: "Magma Breastplate",
    src: "item-breastplate-magma.png",
    def: 240
  }
].map(breastplate => ({ ...breastplate, type: Types.BREASTPLATE }))

export const GREAVES = [
  {
    name: "Wood Greaves",
    src: "greaves-wood.png",
    def: 4
  },

  {
    name: "Magma Greaves",
    src: "item-greaves-magma.png",
    def: 230
  }
].map(greave => ({ ...greave, type: Types.GREAVES }))

export const CAPES = [
  {
    name: "Guild Cape",
    src: "cape-guild.png"
  }
].map(cape => ({ ...cape, type: Types.CAPE }))

export const BELTS = [
  {
    name: "Wood Belt",
    src: "item-belt-wood.png"
  },

  {
    name: "Magma Belt",
    src: "item-belt-magma.png"
  }
].map(belt => ({ ...belt, type: Types.BELT }))

export const BOOTS = [
  {
    name: "Wood Boots",
    src: "item-boots-wood.png"
  },

  {
    name: "Magma Boots",
    src: "item-boots-magma.png"
  }
].reduce(
  (obj, boot) => ({ ...obj, [boot.name]: { ...boot, type: Types.BOOT } }),
  {}
)

export const GLOVES = [
  {
    name: "Wood Gloves",
    src: "item-gloves-wood.png"
  },

  {
    name: "Magma Gloves",
    src: "item-gloves-magma.png"
  }
].reduce(
  (obj, glove) => ({ ...obj, [glove.name]: { ...glove, type: Types.GLOVE } }),
  {}
)

export const RINGS = [
  {
    name: "Silver Ring",
    src: "item-ring-silver.png"
  },
  {
    name: "Gold Ring",
    src: "item-ring-gold.png"
  }
].reduce(
  (obj, ring) => ({ ...obj, [ring.name]: { ...ring, type: Types.RING } }),
  {}
)

export const NECKLACES = [
  {
    name: "Silver Necklace",
    src: "item-necklace-silver.png"
  }
].reduce(
  (obj, necklace) => ({
    ...obj,
    [necklace.name]: { ...necklace, type: Types.NECKLACE }
  }),
  {}
)

export const TRINKETS = [
  {
    name: "Skull",
    tier: Tiers.RARE,
    src: "item-trinket-skull.png"
  },
  {
    name: "Stopwatch",
    tier: Tiers.LEGENDARY,
    src: "item-trinket-stopwatch.png"
  },
  {
    name: "Eyeball",
    tier: Tiers.EPIC,
    src: "item-trinket-eyeball.png"
  }
].reduce(
  (obj, trinket) => ({
    ...obj,
    [trinket.name]: { ...trinket, type: Types.TRINKET }
  }),
  {}
)

export const BAGS = [
  {
    name: "Rucksack",
    src: "item-bag-rucksack.png",
    width: 10,
    height: 2
  }
].reduce(
  (obj, bag) => ({ ...obj, [bag.name]: { ...bag, type: Types.BAG } }),
  {}
)

export const POTIONS = [
  {
    name: "Small Health Potion",
    src: "item-potion-health-1.png", //'potion-health-small.png'
    use: { type: ENTITY_ACTIONS.GAIN_HEALTH, payload: { amount: 10 } },
    stack: 1
  },
  {
    name: "Small Mana Potion",
    src: "item-potion-mana-1.png",
    use: { type: ENTITY_ACTIONS.GAIN_MANA, payload: { amount: 10 } },
    stack: 1
  }
].reduce(
  (obj, potion) => ({
    ...obj,
    [potion.name]: { ...potion, type: Types.POTION }
  }),
  {}
)

export const KEYS = [
  {
    name: "Realm Key",
    src: "key-realm.png",
    use: { type: ENTITY_ACTIONS.USE_KEY, payload: "Realm Key" }
  }
].reduce(
  (obj, key) => ({ ...obj, [key.name]: { ...key, type: Types.KEY } }),
  {}
)

export const WOOD = [
  {
    name: "Log",
    src: ".png"
  }
].reduce(
  (obj, wood) => ({ ...obj, [wood.name]: { ...wood, type: Types.WOOD } }),
  {}
)

export const ROCK = [
  {
    name: "Rock",
    src: ".png"
  }
].reduce(
  (obj, rock) => ({ ...obj, [rock.name]: { ...rock, type: Types.ROCK } }),
  {}
)

export const ORE = [
  {
    name: "Copper",
    src: ".png"
  },
  {
    name: "Iron",
    src: ".png"
  },
  {
    name: "Lead",
    src: ".png"
  },
  {
    name: "Silver",
    src: ".png"
  },
  {
    name: "Gold",
    src: ".png"
  }
].reduce(
  (obj, ore) => ({ ...obj, [ore.name]: { ...ore, type: Types.ORE } }),
  {}
)

export const GEMS = {
  Diamond: {},
  Sapphire: {},
  Topaz: {},
  Ruby: {},
  Obsidian: {}
}

export default {
  ...SWORDS,
  ...SHIELDS,

  ...HELMETS,
  ...BREASTPLATES,
  ...BELTS,
  ...GREAVES,
  ...BOOTS,
  ...GLOVES,
  ...CAPES,

  ...RINGS,
  ...NECKLACES,

  ...TRINKETS,

  ...BAGS,

  ...POTIONS,
  ...KEYS
}
