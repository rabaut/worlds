import * as PIXI from 'pixi.js'

import human from "assets/sprites/creatures/human-male-0.png"

export const Player = ({ id, x, y, name, guild }) => {
	const sprite = PIXI.Sprite.fromImage(human)

  guild = { name: 'Spaghetti Clan' }

	sprite.x = x
	sprite.y = y 

	sprite.anchor.set(0.5);

  const nameStyle = new PIXI.TextStyle({
    fontFamily: "Verdana",
    fontSize: 12,
    fill: "#fff",
    stroke: "#fff",
    strokeWidth: 1
  })

  const nameText = new PIXI.Text(name, nameStyle)

  nameText.anchor.x = 0.5
  nameText.anchor.y = 0.5

  nameText.x = 0
  nameText.y = -20

  sprite.addChild(nameText)

  if (guild) {
    const guildNameStyle = new PIXI.TextStyle({
      fontFamily: "Verdana",
      fontSize: 12,
      fill: "#000",
      stroke: "#000",
      strokeWidth: 2
    })

    const guildNameText = new PIXI.Text(
      `<${guild.name}>`,
      guildNameStyle
    )

    guildNameText.anchor.x = 0.5
    guildNameText.anchor.y = 0.5

    guildNameText.x = 0
    guildNameText.y = -36

    sprite.addChild(guildNameText)
  }

  return {
    id,
  	x,
  	y,
  	name,
  	guild,
  	sprite
  }
}