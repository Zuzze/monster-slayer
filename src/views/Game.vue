<template>
  <div style="text-align: center;">
    <!--- Start screen -->
    <div
      v-if="gameStatus === gameStatuses.NOT_STARTED"
      style="margin-top: 20vh"
    >
      <h2>Slay the monster!</h2>
      <img alt="Monster smiling" src="@/assets/img/monster.png" width="500" />
      <br />
      <Button @click="startGame">Start game</Button>
    </div>

    <!-- Game screen -->
    <div
      v-else-if="
        [gameStatuses.ONGOING, gameStatuses.ATTACK, gameStatuses.HEAL].includes(
          gameStatus
        )
      "
      class="game-screen"
    >
      <div class="health-bar-container">
        <HealthBar :value="monsterHealth"></HealthBar>
      </div>
      <div>
        <img
          id="monster"
          :src="monsterSrc"
          :class="gameStatus"
          alt="cute red monster"
        />
      </div>

      <div class="game-controls">
        <Button :disabled="monsterHealth <= 0" @click="attack">Attack</Button>

        <Button :disabled="monsterHealth <= 0" @click="specialAttack"
          >Special Attack</Button
        >

        <Button
          :disabled="playerHealth === 100 || monsterHealth <= 0"
          @click="heal"
          >Heal</Button
        >

        <Button :disabled="monsterHealth <= 0" @click="giveUp">Give up</Button>
        <div class="health-bar-container">
          <h3>Your Health</h3>
          <HealthBar
            :value="playerHealth"
            :healing="gameStatus === gameStatuses.HEAL"
          ></HealthBar>
        </div>
      </div>
    </div>

    <!-- Game ended screen -->
    <div v-else class="game-end-screen">
      <h2>
        {{
          gameStatus === gameStatuses.WIN
            ? "You defeated the monster!"
            : "Monster beat you!"
        }}
      </h2>
      <div>
        <img
          v-if="gameStatus === gameStatuses.WIN"
          :src="monsterSettings.IMG_DEFEATED"
          width="80%"
          alt="defeated monster with bandage"
        />
        <img
          v-else
          :src="monsterSettings.IMG_WIN"
          width="80%"
          alt="monster with sunglasses smiling"
        />
      </div>
      <Button @click="startGame">New game</Button>
    </div>
  </div>
</template>

<!--<v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <HealthBar :value="playerHealth"></HealthBar>
        <HealthBar :value="monsterHealth"></HealthBar>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
        <p class="subheading font-weight-regular">bla</p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center></v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center></v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center></v-layout>
      </v-flex>
    </v-layout>
  </v-container>-->

<script>
import HealthBar from "@/components/HealthBar"
import Button from "@/components/Button"

const _GAME_STATUSES = {
  NOT_STARTED: "not-started",
  ONGOING: "ongoing",
  ATTACK: "attack",
  HEAL: "heal",
  WIN: "win",
  LOSE: "lose!"
}

const _MONSTER_SETTINGS = {
  MAX_HEALTH: 100,
  ATTACK_MIN: 5,
  ATTACK_MAX: 12,
  IMG_DEFAULT: require("../assets/img/monster.svg"),
  IMG_ATTACK: require("../assets/img/monster-attack.svg"),
  IMG_DEFEATED: require("../assets/img/monster-defeated.svg"),
  IMG_WIN: require("../assets/img/monster-winner.svg")
}

const _PLAYER_SETTINGS = {
  MAX_HEALTH: 100,
  ATTACK_MIN: 3,
  ATTACK_MAX: 10,
  SPECIAL_ATTACK_MIN: 10,
  SPECIAL_ATTACK_MAX: 20,
  HEAL_POWER: 4
}

export default {
  name: "Game",

  data: () => ({
    // to access status constants in template, define them inside component
    gameStatuses: _GAME_STATUSES,
    monsterSettings: _MONSTER_SETTINGS,
    playerHealth: 100,
    monsterHealth: 100,
    gameStatus: _GAME_STATUSES.NOT_STARTED,
    monsterSrc: _MONSTER_SETTINGS.IMG_DEFAULT
  }),

  methods: {
    /** @description start a new game and reset game values */
    startGame: function() {
      this.gameStatus = _GAME_STATUSES.ONGOING
      this.playerHealth = _PLAYER_SETTINGS.MAX_HEALTH
      this.monsterHealth = _MONSTER_SETTINGS.MAX_HEALTH
      this.monsterSrc = _MONSTER_SETTINGS.IMG_DEFAULT
    },

    setMonsterImage: function() {
      if (this.gameStatus === _GAME_STATUSES.ATTACK) {
        this.monsterSrc = _MONSTER_SETTINGS.IMG_ATTACK
      } else {
        this.monsterSrc = require(_MONSTER_SETTINGS.IMG_DEFAULT)
      }
    },

    monsterAttack: function() {
      this.gameStatus = _GAME_STATUSES.ATTACK
      this.playerHealth -= this.calculateDamage(
        _MONSTER_SETTINGS.ATTACK_MIN,
        _MONSTER_SETTINGS.ATTACK_MAX
      )
      this.monsterSrc = _MONSTER_SETTINGS.IMG_ATTACK

      if (this.monsterHealth > 0) {
        // return player images to default after attack
        const vm = this
        setTimeout(function() {
          vm.gameStatus = _GAME_STATUSES.ONGOING
          vm.monsterSrc = _MONSTER_SETTINGS.IMG_DEFAULT
        }, 500)
      }
    },

    /** @description attacks enemy and makess */
    attack: function() {
      this.monsterHealth -= this.calculateDamage(
        _PLAYER_SETTINGS.ATTACK_MAX,
        _PLAYER_SETTINGS.ATTACK_MAX
      )
      this.monsterAttack()
      this.checkGameStatus()
    },

    /** @description more powerful attack  */
    specialAttack: function() {
      this.monsterHealth -= this.calculateDamage(
        _PLAYER_SETTINGS.SPECIAL_ATTACK_MIN,
        _PLAYER_SETTINGS.SPECIAL_ATTACK_MAX
      )
      this.monsterAttack()
      this.checkGameStatus()
    },

    /** @description increses player health */
    heal: function() {
      this.playerHealth += _PLAYER_SETTINGS.HEAL_POWER
      this.gameStatus = _GAME_STATUSES.HEAL
      // after half a second return back to normal
      const vm = this
      setTimeout(function() {
        vm.gameStatus = _GAME_STATUSES.ONGOING
      }, 1000)
    },

    /** @desctiption Cancel game and return to start screen */
    giveUp: function() {
      this.gameStatus = _GAME_STATUSES.LOSE
    },

    /** @description returns random damage value that will be substracted from player health
     * @param {number} min min number of damage caused to a player
     * @param {number} max max number of damage caused to a player
     */
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * min), max)
    },

    /** @description Check if player or monster won, otherwise continue game */
    checkGameStatus: function() {
      if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
        this.gameStatus =
          this.monsterHealth <= 0 ? _GAME_STATUSES.WIN : _GAME_STATUSES.LOSE
      }
    }
  },

  components: {
    HealthBar,
    Button
  }
}
</script>

<style lang="scss" scoped>
.health-bar-container {
  padding: 1em 5em;
  align-content: center;
}

.game-screen {
  /*background-color: #abe9cd;
  background-image: linear-gradient(315deg, $PRIMARY 0%, $SECONDARY 94%);*/
  background-image: url("~@/assets/img/bg.svg");
  background-size: 100vw auto;
  background-position: 50% 0;
}

.game-controls {
  margin-top: auto;
}

.game-end-screen {
  margin: 5em auto;
}

#monster {
  margin-top: 12vh;
  width: 50%;
  transition: 1s;
  -webkit-animation: spin 1.8s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(-2deg);
  }
  33% {
    -webkit-transform: rotate(2deg);
  }

  100% {
    -webkit-transform: rotate(-2deg);
  }
}

@media screen and (max-width: 1024px) {
  .game-screen {
    background-size: cover;
  }
  #monster {
    margin-top: 20vh;
    width: 80%;
  }
}
</style>
