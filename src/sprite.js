import { random } from "shared/utils"

export default function Sprite({ src, frames, x, y, speed }) {
  let sprite

  if (frames) {
    sprite = new PIXI.extras.AnimatedSprite(
      frames.map(frame => PIXI.Texture.fromFrame(frame))
    )

    sprite.animationSpeed = speed || 0.05

    sprite.play()
  } else {
    src = Array.isArray(src) ? random(src) : src

    sprite = new PIXI.Sprite(PIXI.loader.resources["sheet"].textures[src])
  }

  sprite.anchor.x = 0.5
  sprite.anchor.y = 0.5

  sprite.position.x = x * 24 + 12
  sprite.position.y = y * 24 + 12

  return sprite
}
