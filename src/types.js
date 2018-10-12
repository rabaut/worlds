export const EQUIPMENT_TYPES = [
  "SWORD",
  "SHIELD",
  "HELMET",
  "BREASTPLATE",
  "BELT",
  "GREAVES",
  "BOOTS",
  "GLOVES",
  "CAPE",
  "RING",
  "NECKLACE",
  "TRINKET"
]

export const TILE_TYPES = ["GRASS", "WATER", "SAND", "WASTE"]

export const PLANT_TYPES = ["TREE", "BUSH", "FLOWER"]

export const ITEM_TYPES = [...EQUIPMENT_TYPES, "BAG", "POTION", "KEY"]

export const CREATURE_TYPES = ["BEAST"]

export default {
  PLAYER: "PLAYER",
  BOLT: "BOLT",
  ...ITEM_TYPES.reduce((obj, type) => ({ ...obj, [type]: type }), {}),
  ...TILE_TYPES.reduce((obj, type) => ({ ...obj, [type]: type }), {}),
  ...PLANT_TYPES.reduce((obj, type) => ({ ...obj, [type]: type }), {}),
  ...CREATURE_TYPES.reduce((obj, type) => ({ ...obj, [type]: type }), {})
}
