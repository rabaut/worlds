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

export const ENTITY_TYPES = [
  "TREE",
  "BUSH",
  "FLOWER",
  "BEAST",
  "PLAYER",
  "BOLT"
]

export const ITEM_TYPES = [...EQUIPMENT_TYPES, "BAG", "POTION", "KEY"]

export default {
  ...ITEM_TYPES.reduce((obj, type) => ({ ...obj, [type]: type }), {}),
  ...TILE_TYPES.reduce((obj, type) => ({ ...obj, [type]: type }), {}),
  ...ENTITY_TYPES.reduce((obj, type) => ({ ...obj, [type]: type }), {})
}
