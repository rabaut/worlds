import * as PIXI from "pixi.js"

import Sprite from "./sprite"

import Types from "./types"

export const PLAYERS = [
  {
    eid: 1,
    src: "player-male-0.png"
  },
  {
    eid: 2,
    src: "player-female-0.png"
  }
].map(player => ({ ...player, type: Types.PLAYER }))

export const BEASTS = [
  {
    eid: 3,
    name: "Brown Bear",
    frames: ["creature-bear-brown-1.png", "creature-bear-brown-2.png"]
  },
  {
    eid: 4,
    name: "Black Bear",
    frames: ["creature-bear-black-1.png", "creature-bear-black-2.png"]
  },
  {
    eid: 5,
    name: "Brown Wolf",
    frames: ["creature-wolf-brown-1.png", "creature-wolf-brown-2.png"]
  },
  {
    eid: 6,
    name: "Black Wolf",
    frames: ["creature-wolf-black-1.png", "creature-wolf-black-2.png"]
  }
].map(beast => ({ ...beast, type: Types.BEAST }))

export const PLANTS = [
  {
    eid: 7,
    name: "Willow Tree",
    src: "plant-tree-1.png"
  },
  {
    eid: 8,
    name: "Pine Tree",
    src: "plant-tree-2.png"
  },
  {
    eid: 9,
    name: "Waste Pine Tree",
    src: "plant-tree-3.png"
  },
  {
    eid: 10,
    name: "Waste Willow Tree",
    src: "plant-tree-4.png"
  },
  {
    eid: 11,
    name: "Waste Tree",
    src: "plant-tree-5.png"
  },
  {
    eid: 12,
    name: "Cactus",
    src: ["plant-cactus-1.png", "plant-cactus-2.png", "plant-cactus-3.png"]
  },
  {
    eid: 13,
    name: "Bush",
    src: ["plant-bush-1.png", "plant-bush-2.png"]
  },
  {
    eid: 14,
    name: "Small Bush",
    src: "plant-bush-5.png"
  },
  {
    eid: 15,
    name: "Bushes",
    src: ["plant-bush-3.png", "plant-bush-4.png"]
  },
  {
    eid: 16,
    name: "Flower",
    src: ["plant-flower-1.png", "plant-flower-2.png", "plant-flower-3.png"]
  }
].map(plant => ({ ...plant, type: Types.PLANT, collidable: true }))

export const ENTITIES = [...PLAYERS, ...BEASTS, ...PLANTS].reduce(
  (obj, entity) => ({
    ...obj,
    [entity.eid]: entity
  }),
  {}
)

const Player = data => {
  console.log("Creating Player")
  const sprite = Sprite(data)

  const guild = { name: "Spaghetti Clan" }

  const nameStyle = new PIXI.TextStyle({
    fontFamily: "Verdana",
    fontSize: 12,
    fill: "#fff",
    stroke: "#fff",
    strokeWidth: 1
  })

  const nameText = new PIXI.Text(data.name, nameStyle)

  nameText.anchor.x = 0.5
  nameText.anchor.y = 0.5

  nameText.x = 0
  nameText.y = -20

  sprite.addChild(nameText)

  if (guild) {
    const guildNameStyle = new PIXI.TextStyle({
      fontFamily: "Verdana",
      fontSize: 10,
      fill: "#fff",
      stroke: "#fff",
      strokeWidth: 1
    })

    const guildNameText = new PIXI.Text(guild.name, guildNameStyle)

    guildNameText.anchor.x = 0.5
    guildNameText.anchor.y = 0.5

    guildNameText.x = 0
    guildNameText.y = -36

    sprite.addChild(guildNameText)
  }

  return {
    ...data,
    sprite
  }
}

const Plant = data => {
  console.log("Creating Plant")
  const sprite = Sprite(data)

  return {
    ...data,
    sprite
  }
}

export default function Entity(serverData) {
  const entity = ENTITIES[serverData.eid]

  if (!entity) {
    return
  }

  const clientData = { ...entity, ...serverData }

  switch (entity.type) {
    case Types.PLAYER:
      return Player(clientData)
    case Types.PLANT:
      return Plant(clientData)
  }
}
