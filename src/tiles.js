import Sprite from "./sprite"

import Types from "./types"

const GRASS = [
  {
    tid: 1,
    name: "Grass",
    src: "tile-grass-1.png"
  },
  {
    tid: 2,
    name: "Messy Grass",
    src: "tile-grass-2.png"
  },
  {
    tid: 3,
    name: "Dirty Grass",
    src: "tile-grass-3.png"
  },
  {
    tid: 4,
    name: "Filthy Grass",
    src: "tile-grass-4.png"
  }
].map(grass => ({ ...grass, type: Types.GRASS }))

const WATER = [
  {
    tid: 5,
    name: "Water",
    frames: ["tile-water-1.png", "tile-water-2.png"]
  }
].map(water => ({ ...water, type: Types.WATER }))

const SAND = [
  {
    tid: 6,
    name: "Sand",
    src: "tile-sand-1.png"
  }
].map(sand => ({ ...sand, type: Types.SAND }))

const WASTE = [
  {
    tid: 7,
    name: "Waste",
    src: ["tile-waste-1.png", "tile-waste-5.png"]
  },
  {
    tid: 8,
    name: "Messy Waste",
    src: "tile-waste-2.png"
  },
  {
    tid: 9,
    name: "Dirty Waste",
    src: "tile-waste-3.png"
  },
  {
    tid: 10,
    name: "Filthy Waste",
    src: "tile-waste-4.png"
  }
].map(waste => ({ ...waste, type: Types.WASTE }))

export const TILES = [...GRASS, ...WATER, ...SAND, ...WASTE].reduce(
  (obj, tile) => ({
    ...obj,
    [tile.tid]: tile
  }),
  {}
)

export default function Tile(serverData) {
  const clientData = TILES[serverData.tid]

  if (!clientData) {
    return
  }

  console.log("Creating Tile")

  const spriteData = {
    ...clientData,
    ...serverData
  }

  const sprite = Sprite(spriteData)

  return {
    ...serverData,
    sprite
  }
}
