import * as PIXI from "pixi.js"

import grass1 from "assets/sprites/tile-grass-1.png"
import grass2 from "assets/sprites/tile-grass-2.png"
import grass3 from "assets/sprites/tile-grass-3.png"
import grass4 from "assets/sprites/tile-grass-4.png"

import water1 from "assets/sprites/tile-water-1.png"
import water2 from "assets/sprites/tile-water-2.png"

import Types from "./types"

export const GRASS = [
  {
    name: "Grass",
    src: "tile-grass-1.png"
  },
  {
    name: "Messy Grass",
    src: "tile-grass-2.png"
  },
  {
    name: "Dirty Grass",
    src: "tile-grass-3.png"
  },
  {
    name: "Filthy Grass",
    src: "tile-grass-4.png"
  }
].reduce(
  (obj, tile) => ({ ...obj, [tile.name]: { ...tile, type: Types.GRASS } }),
  {}
)

export const SAND = [
  {
    name: "Sand",
    src: "tile-sand-1.png"
  }
].reduce(
  (obj, tile) => ({ ...obj, [tile.name]: { ...tile, type: Types.SAND } }),
  {}
)

export const WASTE = [
  {
    name: "Waste",
    src: ["tile-waste-1.png", "tile-waste-5.png"]
  },
  {
    name: "Messy Waste",
    src: "tile-waste-2.png"
  },
  {
    name: "Dirty Waste",
    src: "tile-waste-3.png"
  },
  {
    name: "Filthy Waste",
    src: "tile-waste-4.png"
  }
].reduce(
  (obj, tile) => ({ ...obj, [tile.name]: { ...tile, type: Types.WASTE } }),
  {}
)

export const WATER = [
  {
    name: "Water",
    frames: ["tile-water-1.png", "tile-water-2.png"]
  }
].reduce(
  (obj, tile) => ({
    ...obj,
    [tile.name]: { ...tile, type: Types.WATER, collidable: true }
  }),
  {}
)

const getSprite = type => {
  switch (type) {
    case 0:
      return grass1
    case 1:
      return grass2
    case 2:
      return grass3
    case 3:
      return grass4
    case 4:
      return water1
    case 5:
      return water2
  }
}

export default function Tile({ id, x, y, t }) {
  const sprite = PIXI.Sprite.fromImage(getSprite(t))

  sprite.x = x * 24
  sprite.y = y * 24

  sprite.anchor.set(0.5)

  return {
    id,
    x,
    y,
    t,
    sprite
  }
}
