import Types from "./types"

export const TREES = [
  {
    name: "Willow Tree",
    src: "plant-tree-1.png"
  },
  {
    name: "Pine Tree",
    src: "plant-tree-2.png"
  },
  {
    name: "Waste Pine Tree",
    src: "plant-tree-3.png"
  },
  {
    name: "Waste Willow Tree",
    src: "plant-tree-4.png"
  },
  {
    name: "Waste Tree",
    src: "plant-tree-5.png"
  },
  {
    name: "Cactus",
    src: ["plant-cactus-1.png", "plant-cactus-2.png", "plant-cactus-3.png"]
  }
].reduce(
  (obj, tree) => ({
    ...obj,
    [tree.name]: { ...tree, type: Types.TREE, collidable: true }
  }),
  {}
)

export const BUSHES = [
  {
    name: "Bush",
    src: ["plant-bush-1.png", "plant-bush-2.png"]
  },
  {
    name: "Small Bush",
    src: "plant-bush-5.png"
  },
  {
    name: "Bushes",
    src: ["plant-bush-3.png", "plant-bush-4.png"]
  }
].reduce(
  (obj, bush) => ({
    ...obj,
    [bush.name]: { ...bush, type: Types.BUSH, collidable: true }
  }),
  {}
)

export const FLOWERS = [
  {
    name: "Flower",
    src: ["plant-flower-1.png", "plant-flower-2.png", "plant-flower-3.png"]
  }
].reduce(
  (obj, bush) => ({
    ...obj,
    [bush.name]: { ...bush, type: Types.FLOWER, collidable: true }
  }),
  {}
)

export default {
  ...TREES,
  ...BUSHES,
  ...FLOWERS
}
