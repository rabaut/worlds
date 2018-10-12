import "@babel/polyfill";

import Vue from "vue"
import { Howl } from 'howler'

import "style/index.css"

import Renderer from './renderer'
import Server from './server'
import Game from './game'
import UI from './ui.vue'

import { addEntity } from './events'

Vue.config.productionTip = false;

window.Server = new Server()
window.Game = new Game()
window.Renderer = new Renderer()

window.addEventListener('beforeunload', () => {
	render.unload()
	server.unload()
	game.unload()
})

window.addEventListener('leftclick', (event) => {
	console.log('click', event.detail)

	const { tilePosition, target } = event.detail

	const tileId = `${tilePosition.x}_${tilePosition.y}`

	const targetTile = window.Game.tiles[tileId]

	if(window.targetTile) {
		window.Renderer.removeFilters(window.targetTile.sprite)
		window.targetTile = null
	}

	window.targetTile = targetTile
	window.UI.selectedTile = targetTile
	window.Renderer.addOutlineFilter(window.targetTile.sprite)

	window.Server.updateEntity(window.userId, { tX: tilePosition.x, tY: tilePosition.y })
})

window.addEventListener('rightclick', (event) => {
	console.log('click', event.detail)

	window.Server.createTile(event.detail)
})

window.startGame = () => {
	window.Server.start()
	window.Game.start()
	window.Renderer.start()
}

window.UI = new Vue(UI)

// var backgroundMusic = new Howl({
//   src: groveBackground,
//   loop: true,
//   volume: 0
// })
