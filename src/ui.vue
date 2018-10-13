<template>
	<div class="ui">
		<div class="actionbar-container">
			<div class="actionbar">
				<div v-on:click="selectedSlot = 1" :class="{ slot: true, selected: selectedSlot === 1 }" />
				<div v-on:click="selectedSlot = 2" :class="{ slot: true, selected: selectedSlot === 2 }" />
				<div v-on:click="selectedSlot = 3" :class="{ slot: true, selected: selectedSlot === 3 }" />
				<div v-on:click="selectedSlot = 4" :class="{ slot: true, selected: selectedSlot === 4 }" />
			</div>
		</div>

		<div class="chat" v-on:click="focusChatInput">
			<div ref="messages" class="messages">
				<div class="message" v-for="message in messages">
					{{ message.s }}: {{ message.c }}
				</div>
			</div>

			<div class="row">
				<form v-on:submit.prevent>
					<input ref="chatInput" v-model="chatInput" />
					<button v-on:click="sendMessage">Send</button>
				</form>
			</div>
		</div>

		<div class="selection-container">
			<div class="tile" v-if="selectedTile">{{ selectedTile.x }} , {{ selectedTile.y }}</div>
		</div>

	</div>
</template>

<script>
export default {
	el: "#vue",

  data: {
 		chatInput: '',
		messages: [],
		selectedSlot: 1,
		slots: [],
		selectedTile: null
  },

  watch: {
    messages: function() {
    	const { scrollHeight, scrollTop } = this.$refs.messages

    	if(scrollTop < 100 || scrollHeight > scrollTop - 100) {
    		this.$nextTick(function () {
    			this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
	      })
    	}
    }
  },

  methods: {
  	sendMessage: function() {
  		if(this.chatInput) {
  			window.Server.createMessage(this.chatInput)
  			this.chatInput = ''
  		}
  	},

  	focusChatInput: function() {
  		this.$refs.chatInput.focus()
  	}
  },

  created: function() {
  	window.startGame()
  }
}
</script>

<style scoped>
button {
	appearance: none;
	border-radius: 0;
}

.row {
	flex-shrink: 0;
	padding-top: .4rem;
}

form {
	display: flex;
	flex-shrink: 0;
	flex-direction: row;
	width: 100%;
}

form input {
	width: 100%;
}

.selection-container {
	z-index: 3;
	position: absolute;
	width: 4rem;
	height: 3rem;
	top: 0;
	right: 0;
	align-items: center;
	justify-content: center;
	background-color: black;
	color: white;
}

.actionbar-container {
	z-index: 3;
	position: absolute;
	bottom: 0;
	left: 0;
	align-items: center;
	width: 100%;
}

.actionbar {
	flex-direction: row;
	background-color: black;
	padding: .2rem;
}

.slot {
	background-color: lightgray;
	width: 2.6rem;
	height: 2.6rem;
	margin: .4rem;
	border: 2px solid black;
}

.slot.selected {
	border: 2px solid red;
}

.ui {
	position: relative;
	width: 100%;
	height: 100%;
}

.chat {
	z-index: 3;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 30%;
	height: 25%;
	background-color: black;
	color: white;
	padding: .4rem;
}

.messages {
	flex-grow: 1;
	overflow-y: scroll;
}

.message {
	flex-shrink: 0;
}

.chat input {
	width: 100%;
	margin-right: .4rem;
}
</style>