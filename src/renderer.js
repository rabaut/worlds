import * as PIXI from 'pixi.js'

import * as Events from './events'

export default class Renderer {
	static TILE_SIZE = 24.0

	static VIEWPORT_SPEED = 3
	static VIEWPORT_EPSILON = 6
	static VIEWPORT_TOLERANCE = 6 // Keep above 4

	constructor() {
		PIXI.settings.PRECISION_FRAGMENT = 'highp'; //this makes text looks better
		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

		window.pixi = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {
		  transparent: true,
		  roundPixels: true,
		  antialiasing: false,
			antialias: false,
		  resolution: window.devicePixelRatio,
			powerPreference: "high-performance" 
		});

		window.addEventListener("resize", this.resize)
		window.addEventListener("deviceOrientation", this.resize)

		document.getElementById('game').appendChild(window.pixi.view);

		this.canvasRef = document.getElementsByTagName("canvas")[0]
		this.uiRef = document.getElementById('vue')

		this.setupStage()
		this.resize()
	}

	onPointerDown = (event) => {
		const position = event.data.getLocalPosition(window.stage)

		const pixelPosition = {
			x: Math.floor(position.x),
			y: Math.floor(position.y)
		}

		const tilePosition = {
			x: Math.floor(position.x / Renderer.TILE_SIZE),
			y: Math.floor(position.y / Renderer.TILE_SIZE)
		}

		let newEvent;

		if(event.data.button === 0) {
			newEvent = Events.leftClick({ pixelPosition, tilePosition, target: null })
		} else {
			newEvent = Events.rightClick(tilePosition)
		}

		window.dispatchEvent(newEvent)
	}

	setupStage = () => {
		window.stage = new PIXI.Container()

		window.stage.hitArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight)

		window.stage.interactive = true
		window.stage.on("pointerdown", this.onPointerDown)

		window.stage.width = Renderer.TARGET_WIDTH
		window.stage.height = Renderer.TARGET_HEIGHT

		this.tilesContainer = new PIXI.Container()
		this.entitiesContainer = new PIXI.Container()

		window.stage.addChild(this.tilesContainer)
		window.stage.addChild(this.entitiesContainer)
	}

	resize = () => {
	  let width = window.innerWidth
	  let height = window.innerHeight

	  this.canvasRef.width = width
	  this.canvasRef.height = height

	  this.canvasRef.style.width = width + "px"
	  this.canvasRef.style.height = height + "px"

	  this.uiRef.width = width
	  this.uiRef.height = height

	  this.uiRef.style.width = width + "px"
	  this.uiRef.style.height = height + "px"

	  window.stage.position.x = this.canvasRef.width / 2
	  window.stage.position.y = this.canvasRef.height / 2

	  window.pixi.resize(this.canvasRef.width, this.canvasRef.height)

	  window.stage.hitArea.width = this.canvasRef.width
	  window.stage.hitArea.height = this.canvasRef.height

	  window.stage.scale.x = 1
	  window.stage.scale.y = 1

	  window.scrollTo(0, 0)
	}

	addEntity = (sprite) => {
		this.entitiesContainer.addChild(sprite)
	}

	addTile = (sprite) => {
		this.tilesContainer.addChild(sprite)
	}

	removeEntity = (sprite) => {
		this.entitiesContainer.removeChild(sprite)
	}

	removeTile = sprite => {
		this.tilesContainer.removeChild(sprite)
	}

	start = () => {
		requestAnimationFrame(this.render)

		console.log('[RENDERER]: Started')
	}

	render = () => {
		requestAnimationFrame(this.render)

		const entity = window.Game.getEntity(window.userId)

		if(entity) {
			window.stage.pivot.x = entity.sprite.x
			window.stage.pivot.y = entity.sprite.y

			window.stage.hitArea.x = entity.sprite.x - this.canvasRef.width / 2
	  	window.stage.hitArea.y = entity.sprite.y - this.canvasRef.height / 2
		}

		window.pixi.render(window.stage)
	}
}






