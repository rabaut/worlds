import { Player } from './entities'
import { Ground } from './tiles'

import { calculateMoveVector } from './util'

export default class Game {
	static TICK = 10
	static SPEED = 1
	static EPSILON = 1

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

			if(entity.tX && entity.tY) {
				if(entity.vX === undefined && entity.vY === undefined) {
					const { vX, vY } = calculateMoveVector(entity, { x: entity.tX, y: entity.tY })

					entity.vX = vX
					entity.vY = vY
				}

				if(entity.vX) {
					entity.x += entity.vX * Game.SPEED
					entity.sprite.x = Math.floor(entity.x)

					if(entity.x <= entity.tX + Game.EPSILON && entity.x >= entity.tX - Game.EPSILON) {
						entity.x = entity.tX
						entity.sprite.x = entity.tX
						entity.vX = 0
					}
				}

				if(entity.vY) {
					entity.y += entity.vY * Game.SPEED
					entity.sprite.y = Math.floor(entity.y)

					if(entity.y <= entity.tY + Game.EPSILON && entity.y >= entity.tY - Game.EPSILON) {
						entity.y = entity.tY
						entity.sprite.y = entity.tY
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

		if(updates.tX && updates.tY) {
			delete entity.vX
			delete entity.vY
		}

		if(entity.x && entity.y) {
			delete updates.x
			delete updates.y
		}

		this.entities[id] = {
			...entity,
			...updates
		}
	}

	addEntity = (id, data) => {
		const entity = Player({ id, ...data })

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
		const tile = new Ground(data)

		if(tile.sprite) {
			window.Renderer.addTile(tile.sprite)
		}

		this.tiles[id] = tile
	}

	updateTile = (id, updates) => {
		this.tiles[id] = {
			...this.tiles[id],
			...updates
		}
	}

	removeTile = (id) => {
		delete this.tiles[id]
	}
}
