import Entity from './entities'
import Tile from './tiles'

import { calculateMoveVector } from './util'

export default class Game {
	static TICK = 10
	static SPEED = .05
	static EPSILON = 4

	constructor() {
		this.entities = {}
		this.tiles = {}
	}

	start = () => {
		setInterval(this.update, Game.TICK)

		console.log('[GAME]: Started')
	}

	update = () => {
		Object.keys(this.entities).forEach(id => {
			const entity = this.entities[id]

			if(entity.tX !== undefined && entity.tY !== undefined) {
				if(entity.vX === undefined && entity.vY === undefined) {
					const { vX, vY } = calculateMoveVector(entity, { x: entity.tX, y: entity.tY })

					entity.vX = vX
					entity.vY = vY
				}

				if(entity.vX) {
					entity.x += entity.vX * Game.SPEED

					const pixelX = Math.round(entity.x * 24)
					const pixelDestX = Math.round(entity.tX * 24)

					entity.sprite.x = pixelX

					if(entity.sprite.x <= pixelDestX + Game.EPSILON && entity.sprite.x >= pixelDestX - Game.EPSILON) {
						entity.x = entity.tX
						entity.sprite.x = pixelDestX
						entity.vX = 0
					}
				}

				if(entity.vY) {
					entity.y += entity.vY * Game.SPEED

					const pixelY = Math.round(entity.y * 24)
					const pixelDestY = Math.round(entity.tY * 24)

					entity.sprite.y = pixelY

					if(entity.sprite.y <= pixelDestY + Game.EPSILON && entity.sprite.y >= pixelDestY - Game.EPSILON) {
						entity.y = entity.tY
						entity.sprite.y = pixelDestY
						entity.vY = 0
					}
				}
			}

			if(entity.vX === 0 && entity.vY === 0) {
				delete entity.vX
				delete entity.vY

				if(id === window.userId) {
					const updates = { x: entity.x, y: entity.y }
					window.Server.updateUser(updates)
					window.Server.updateEntity(window.userId, updates)
				}
			}
		})
	}

	unload = () => {}

	getEntity = (id) => {
		return this.entities[id]
	}

	updateEntity = (id, updates) => {
		const entity = this.entities[id]

		if(!entity) {
			return
		}

		if(updates.tX !== undefined && updates.tY !== undefined && (updates.tX !== entity.tX || updates.tY !== entity.tY)) {
			delete entity.vX
			delete entity.vY
		}

		delete updates.x
		delete updates.y

		this.entities[id] = {
			...entity,
			...updates
		}
	}

	addEntity = (id, data) => {
		const entity = Entity(data)

		if(entity.sprite) {
			window.Renderer.addEntity(entity.sprite)
		}

		this.entities[id] = entity
	}

	removeEntity = id => {
		const entity = this.entities[id]

		if(entity) {
			if(entity.sprite) {
				window.Renderer.removeEntity(entity.sprite)
			}

			delete this.entities[id]
		}
	}

	addTile = (id, data) => {
		const tile = Tile(data)

		if(this.tiles[id]) {
			this.removeTile(id)
		}

		if(tile.sprite) {
			window.Renderer.addTile(tile.sprite)
		}

		this.tiles[id] = tile
	}

	removeTile = (id) => {
		if(this.tiles[id].sprite) {
			window.Renderer.removeEntity(this.tiles[id].sprite)
		}

		delete this.tiles[id]
	}
}
