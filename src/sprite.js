import * as PIXI from "pixi.js"

import "assets/sheets/sheet.png"
import { randomItem } from "./util"

var data = require("../assets/sheets/sheet.json")

var spritesheet

PIXI.loader.add("sheetImage", data.meta.image).load((loader, resources) => {
  spritesheet = new PIXI.Spritesheet(
    resources.sheetImage.texture.baseTexture,
    data
  )
  spritesheet.parse(() => {
    console.log("sheet made")
  })
})

export default function Sprite({ src, frames, x, y, speed }) {
  let sprite

  if (frames) {
    sprite = new PIXI.extras.AnimatedSprite(
      frames.map(frame => PIXI.Texture.fromFrame(frame))
    )

    sprite.animationSpeed = speed || 0.05

    sprite.play()
  } else {
    src = Array.isArray(src) ? randomItem(src) : src

    const texture = spritesheet.textures[src]

    sprite = new PIXI.Sprite(texture)
  }

  sprite.anchor.x = 0.5
  sprite.anchor.y = 0.5

  sprite.position.x = x * 24
  sprite.position.y = y * 24

  return sprite
}
