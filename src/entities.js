import * as PIXI from 'pixi.js'

import human from "assets/sprites/creatures/human-male-0.png"
import tree1 from "assets/sprites/plant-tree-1.png"
import tree2 from "assets/sprites/plant-tree-2.png"

const Player = ({ id, x, y, name, guild }) => {
	const sprite = PIXI.Sprite.fromImage(human)

  guild = { name: 'Spaghetti Clan' }

	sprite.x = Math.floor(x * 24)
	sprite.y = Math.floor(y * 24) 

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

const Tree = (type, { x, y }) => {
  const image = type === 0 ? tree1 : tree2
  const sprite = PIXI.Sprite.fromImage(image)

  guild = { name: 'Spaghetti Clan' }

  sprite.x = x
  sprite.y = y 

  sprite.anchor.set(0.5);
}

const Entity = ({ t: type, ...data }) => {
  switch(type) {
    case 0: 
      return Player(data)
    case 1:
    case 2:
      return Tree(type, data)
  }
}

export default Entity