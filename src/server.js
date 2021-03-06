import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"
import faker from "faker"

import Types from "./types"

var config = {
  apiKey: "AIzaSyB6ka4E1V31LnL-eSBZBiLPaYaTjQvZPGo",
  authDomain: "worlds-218723.firebaseapp.com",
  databaseURL: "https://worlds-218723.firebaseio.com",
  projectId: "worlds-218723",
  storageBucket: "worlds-218723.appspot.com",
  messagingSenderId: "680537427781"
}

firebase.initializeApp(config)

export default class Server {
  constructor() {
    this.db = firebase.database()
    this.auth = firebase.auth()

    this.messages = []
  }

  start = () => {
    this.auth.onAuthStateChanged(this.onSignIn)

    this.signIn()

    var entitiesRef = this.db.ref("entities/")
    var tilesRef = this.db.ref("tiles/")
    var messagesRef = this.db.ref("messages/")

    entitiesRef.on("child_added", this.entityAdded)
    entitiesRef.on("child_changed", this.entityUpdated)
    entitiesRef.on("child_removed", this.entityRemoved)

    tilesRef.on("child_added", this.tileAdded)
    tilesRef.on("child_changed", this.tileAdded)
    tilesRef.on("child_removed", this.tileRemoved)

    messagesRef.on("child_added", this.messageAdded)
    messagesRef.on("child_changed", this.messageUpdated)
    messagesRef.on("child_removed", this.messageRemoved)

    console.log("[SERVER]: Started")
  }

  signIn = () => {
    this.auth.signInAnonymously().catch(console.error)
  }

  onSignIn = user => {
    if (user) {
      window.anon = user.isAnonymous
      window.userId = user.uid

      this.getUser(window.userId)
        .then(snapshot => {
          let data = snapshot.val()

          if (!data) {
            data = {
              name: faker.name.firstName(),
              x: 42,
              y: 42
            }

            this.createUser(data).then(() => console.log("user created"))
          }
          window.user = data

          data.id = window.userId
          data.eid = 1

          return this.createEntity(data, window.userId)
        })
        .then(() => {
          this.db
            .ref("entities/" + window.userId)
            .onDisconnect()
            .remove()
            .then(() => console.log("entity disconnect synced"))
        })
    }
  }

  createUser = data => {
    return this.db
      .ref("users/" + window.userId)
      .set(data)
      .catch(console.error)
  }

  updateUser = data => {
    return this.db
      .ref("users/" + window.userId)
      .update(data)
      .catch(console.error)
  }

  getUser = id => {
    return this.db
      .ref("users/" + id)
      .once("value")
      .catch(console.error)
  }

  createEntity = (data, id) => {
    if (!id) {
      return this.db
        .ref("entities/")
        .push()
        .set(data)
        .catch(console.error)
    }

    return this.db
      .ref("entities/" + id)
      .set(data)
      .catch(console.error)
  }

  updateEntity = (id, data) => {
    return this.db
      .ref("entities/" + id)
      .update(data)
      .catch(console.error)
  }

  removeEntity = id => {
    this.db.ref("entities/" + id).remove()
  }

  entityAdded = data => {
    const clientData = data.val()
    clientData.id = data.key

    window.Game.addEntity(clientData)
  }

  entityUpdated = data => {
    window.Game.updateEntity(data.key, data.val())
  }

  entityRemoved = data => {
    window.Game.removeEntity(data.key)
  }

  createTile = (tid, { x, y }) => {
    const id = `${x}_${y}`

    const serverData = {
      tid
    }

    return this.db
      .ref("tiles/" + id)
      .set(serverData)
      .catch(console.error)
  }

  updateTile = (id, data) => {
    return this.db
      .ref("tiles/" + id)
      .update(data)
      .catch(console.error)
  }

  removeTile = id => {
    this.db.ref("tiles/" + id).remove()
  }

  tileAdded = data => {
    const position = data.key.split("_").map(n => parseInt(n))

    const tileData = {
      x: position[0],
      y: position[1],
      ...data.val()
    }

    window.Game.addTile(data.key, tileData)
  }

  tileRemoved = data => {
    window.Game.removeTile(data.key)
  }

  createMessage = data => {
    return this.db
      .ref("messages/")
      .push()
      .set({
        s: window.user.name,
        c: data
      })
  }

  messageAdded = data => {
    window.UI.messages.push(data.val())
  }

  messageRemoved = () => {}

  messageUpdated = () => {}
}
