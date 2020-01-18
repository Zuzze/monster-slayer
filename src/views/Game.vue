<template>
  <v-container class="mb-6">
    <p>{{ gameStatus }}</p>
    <v-row align="center" no-gutters style="height: auto;">
      <!--- Start screen -->
      <v-col
        v-if="gameStatus === gameStatuses.NOT_STARTED"
        style="textAlign: center; margin: 3em;"
      >
        <Button @click="startGame">Start game</Button>
      </v-col>

      <!-- Game screen -->
      <template
        v-else-if="
          [
            gameStatuses.ONGOING,
            gameStatuses.ATTACK,
            gameStatuses.HEAL
          ].includes(gameStatus)
        "
      >
        <v-col id="player">
          <HealthBar
            :value="playerHealth"
            :healing="gameStatus === gameStatuses.HEAL"
          ></HealthBar>
          <div>
            <Button :disabled="monsterHealth <= 0" @click="attack"
              >Attack</Button
            >
            <br />
            <Button :disabled="monsterHealth <= 0" @click="specialAttack"
              >Special Attack</Button
            >
            <br />
            <Button
              :disabled="playerHealth === 100 || monsterHealth <= 0"
              @click="heal"
              >Heal</Button
            >
            <br />
            <Button :disabled="monsterHealth <= 0" @click="giveUp"
              >Give up</Button
            >
          </div>
        </v-col>
        <v-col id="battlefield"></v-col>
        <v-col>
          <HealthBar :value="monsterHealth"></HealthBar>
          <img
            width="500px"
            id="monster"
            :src="monsterSrc"
            :class="gameStatus"
            alt="cute red monster"
          />
        </v-col>
      </template>

      <!-- Game ended screen -->
      <v-col v-else>
        Game ended
        <div>
          <img
            v-if="gameStatus === gameStatuses.WIN"
            :src="monsterSettings.IMG_DEFEATED"
            width="50%"
            alt="defeated monster with bandage"
          />
          <img
            v-else
            :src="monsterSettings.IMG_WIN"
            width="50%"
            alt="monster with sunglasses smiling"
          />
        </div>
        <Button @click="startGame">New game</Button>
      </v-col>
    </v-row>
  </v-container>
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
  IMG_DEFAULT: require("../assets/img/monster.png"),
  IMG_ATTACK: require("../assets/img/monster-attack.png"),
  IMG_DEFEATED: require("../assets/img/monster-defeated.png"),
  IMG_WIN: require("../assets/img/monster-winner.png")
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
#battlefield {
  text-align: center;
}

#monster {
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
</style>
