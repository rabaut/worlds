import Types from "./types"

export const BEASTS = [
  {
    name: "Brown Bear",
    frames: ["creature-bear-brown-1.png", "creature-bear-brown-2.png"]
  },
  {
    name: "Black Bear",
    frames: ["creature-bear-black-1.png", "creature-bear-black-2.png"]
  },
  {
    name: "Brown Wolf",
    frames: ["creature-wolf-brown-1.png", "creature-wolf-brown-2.png"]
  },
  {
    name: "Black Wolf",
    frames: ["creature-wolf-black-1.png", "creature-wolf-black-2.png"]
  }
].reduce(
  (obj, beast) => ({ ...obj, [beast.name]: { ...beast, type: Types.BEAST } }),
  {}
)

export default {
  ...BEASTS
}
