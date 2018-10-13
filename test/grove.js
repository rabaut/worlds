var firebase = require("firebase/app")
var faker = require("faker")
require("firebase/database")

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB6ka4E1V31LnL-eSBZBiLPaYaTjQvZPGo",
  authDomain: "worlds-218723.firebaseapp.com",
  databaseURL: "https://worlds-218723.firebaseio.com",
  projectId: "worlds-218723",
  storageBucket: "worlds-218723.appspot.com",
  messagingSenderId: "680537427781"
}

firebase.initializeApp(config)

var db = firebase.database()

var start = -20
var end = Math.abs(start)

var randomXY = () => {
  return {
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 600)
  }
}

var tid

var promises = []

for (let x = start; x <= end; x++) {
  for (let y = start; y <= end; y++) {
    if (x === 0 && y === 0) {
      tid = 1
    } else if (x > -2 && x < 2 && y > -2 && y < 2) {
      tid = 1
    } else if (x > -9 && x < 9 && y > -9 && y < 9) {
      tid = 5
    } else if (
      x === -1 ||
      y === -1 ||
      x === 1 ||
      y === 1 ||
      x === 0 ||
      y === 0 ||
      x === start ||
      y === start ||
      x === start + 1 ||
      y === start + 1 ||
      x === start + 2 ||
      y === start + 2 ||
      x === end ||
      y === end ||
      x === end - 1 ||
      y === end - 1 ||
      x === end - 2 ||
      y === end - 2
    ) {
      tid = 5
    } else {
      t = Math.floor(Math.random() * 20)
      if (t > 4) {
        tid = 1
      }
    }

    var tile = {
      tid
    }

    promises.push(db.ref("tiles/" + `${x}_${y}`).set(tile))
  }
}

Promise.all(promises).then(() => {
  console.log("Grove generated")
  process.exit()
})

// var updateInterval = setInterval(() => {
// 	for(let i = 0; i < 10; i++) {
// 		const tile = tiles[Math.floor(Math.random()*tiles.length)]

// 		const { x, y } = randomXY()

// 		db.ref('tiles/' + tile.name).update({
// 			tX: x,
// 			tY: y
// 		})
// 	}
// }, 500)

// setTimeout(() => {
// 	clearInterval(updateInterval)

// 	tiles.forEach(({ name }) => {
// 		db.ref('tiles/' + name).remove()
// 	})
// }, 30000)
