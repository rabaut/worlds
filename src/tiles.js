import * as PIXI from 'pixi.js'

import grass1 from  "assets/sprites/tile-grass-1.png"
import grass2 from "assets/sprites/tile-grass-2.png"
import grass3 from "assets/sprites/tile-grass-3.png"
import grass4 from "assets/sprites/tile-grass-4.png"
import tree1 from "assets/sprites/plant-tree-1.png"
import tree2 from "assets/sprites/plant-tree-2.png"
import water1 from "assets/sprites/tile-water-1.png"
import water2 from "assets/sprites/tile-water-2.png"

const getSprite = type => {
	switch(type) {
		case 0: return grass1
		case 1: return grass2
		case 2: return grass3
		case 3: return grass4
		case 4: return tree1;
		case 5: return tree2;
		case 6: return water1;
		case 7: return water2;
	}
}

export const Ground = ({ id, x, y, t }) => {
	const sprite = PIXI.Sprite.fromImage(getSprite(t))

	sprite.x = x * 24
	sprite.y = y * 24

	return {
		id,
  	x,
  	y,
  	t,
  	sprite
  }
}

