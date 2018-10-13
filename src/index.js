import "@babel/polyfill"

import Vue from "vue"
import { Howl } from "howler"
import MainLoop from "mainloop.js"

import "style/index.css"

import Renderer from "./renderer"
import Server from "./server"
import Game from "./game"
import UI from "./ui.vue"

import { PLANTS } from "./entities"

import { addEntity } from "./events"
import { randomItem } from "./util"

Vue.config.productionTip = false

window.Server = new Server()
window.Game = new Game()
window.Renderer = new Renderer()

MainLoop.setUpdate(window.Game.update).setDraw(window.Renderer.render)

window.addEventListener("beforeunload", () => {
  render.unload()
  server.unload()
  game.unload()
})

window.addEventListener("leftclick", event => {
  console.log("click", event.detail)

  const { tilePosition, target } = event.detail

  const tileId = `${tilePosition.x}_${tilePosition.y}`

  const targetTile = window.Game.tiles[tileId]

  if (targetTile) {
    window.targetTile = targetTile
    window.UI.selectedTile = targetTile
    window.Server.updateEntity(window.userId, {
      tX: tilePosition.x,
      tY: tilePosition.y
    })
  }
})

window.addEventListener("rightclick", event => {
  console.log("click", event.detail)

  if (window.UI.selectedSlot === 4) {
    const { eid } = randomItem(PLANTS)

    event.detail.eid = eid

    window.Server.createEntity(event.detail)
    return
  }

  let tid

  if (window.UI.selectedSlot === 1) {
    tid = Math.floor(Math.random() * Math.floor(12))
    if (tid === 0 || tid > 4) {
      tid = 1
    }
  } else if (window.UI.selectedSlot === 2) {
    tid = 5
  } else if (window.UI.selectedSlot === 3) {
    tid = 6
  }

  window.Server.createTile(tid, event.detail)
})

window.addEventListener("keydown", event => {
  switch (event.key) {
    case "1":
    case "2":
    case "3":
    case "4":
      window.UI.selectedSlot = +event.key
  }
})

window.startGame = () => {
  window.Server.start()
  MainLoop.start()

  //logFPS()
}

function logFPS() {
  setInterval(() => console.log("FPS: ", MainLoop.getFPS()), 2000)
}

window.UI = new Vue(UI)

// var backgroundMusic = new Howl({
//   src: groveBackground,
//   loop: true,
//   volume: 0
// })
