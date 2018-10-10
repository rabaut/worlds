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
};

firebase.initializeApp(config);

var db = firebase.database();

var entities = []

var ENTITY_COUNT = 100

var randomXY = () => {
	return {
		x: Math.floor(Math.random() * 600),
		y: Math.floor(Math.random() * 600)
	}
}

var generateEntity = () => {
	const { x, y } = randomXY()

	return {
		name: faker.name.firstName(),
		x,
		y
	}
}

for(let i = 0; i < ENTITY_COUNT; i++) {
	var entity = generateEntity()
	entities.push(entity)

	db.ref('entities/' + entity.name).set(entity)
}

var updateInterval = setInterval(() => {
	for(let i = 0; i < 10; i++) {
		const entity = entities[Math.floor(Math.random()*entities.length)]

		const { x, y } = randomXY()

		db.ref('entities/' + entity.name).update({
			tX: x,
			tY: y
		})
	}
}, 500)

setTimeout(() => {
	clearInterval(updateInterval)

	entities.forEach(({ name }) => {
		db.ref('entities/' + name).remove()
	})
}, 30000)