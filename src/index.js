import "@babel/polyfill";

import Vue from "vue"

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

	const { tilePosition, pixelPosition, target } = event.detail

	if(window.Game.tiles[`${tilePosition.x}_${tilePosition.y}`]) {
		window.Server.updateEntity(window.userId, { tX: pixelPosition.x, tY: pixelPosition.y })
	}
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
