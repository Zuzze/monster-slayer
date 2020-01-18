<template>
  <div style="text-align: center;">
    <!--- Start screen -->
    <StartScreen
      v-if="gameStatus === gameStatuses.NOT_STARTED"
      :onStartGame="startGame"
    ></StartScreen>

    <!-- Game screen -->
    <div
      v-else-if="
        [gameStatuses.ONGOING, gameStatuses.ATTACK, gameStatuses.HEAL].includes(
          gameStatus
        )
      "
      class="game-screen fade-in"
    >
      <Monster :status="gameStatus" :health="monsterHealth"></Monster>

      <div class="game-controls">
        <div class="game-controls__buttons">
          <Button :disabled="monsterHealth <= 0" @click="attack">Attack</Button>
          <Button :disabled="monsterHealth <= 0" @click="specialAttack"
            >Special Attack</Button
          >
          <Button
            :disabled="playerHealth === 100 || monsterHealth <= 0"
            @click="heal"
            >Heal</Button
          >
          <Button :disabled="monsterHealth <= 0" @click="giveUp"
            >Give up</Button
          >
        </div>
        <h3 class="player-health-bar-title">Your Health</h3>
        <div class="player-health">
          <HealthBar
            :value="playerHealth"
            :healing="gameStatus === gameStatuses.HEAL"
          ></HealthBar>
        </div>
      </div>
    </div>

    <!-- Game ended screen -->
    <EndScreen class="fade-in" v-else :status="gameStatus" :onStartNewGame="startGame">
    </EndScreen>
  </div>
</template>

<script>
import HealthBar from "@/components/HealthBar"
import StartScreen from "@/components/StartScreen"
import Monster from "@/components/Monster"
import Button from "@/components/Button"
import EndScreen from "@/components/EndScreen"
import { MONSTER_SETTINGS, PLAYER_SETTINGS } from "@/assets/data/game-settings"
import { GAME_STATUSES } from "@/assets/data/game-statuses"

export default {
  name: "MonsterSlayer",

  data: () => ({
    // to access status constants in template, define them inside component
    gameStatuses: GAME_STATUSES,
    monsterSettings: MONSTER_SETTINGS,
    playerHealth: PLAYER_SETTINGS.MAX_HEALTH,
    monsterHealth: MONSTER_SETTINGS.MAX_HEALTH,
    gameStatus: GAME_STATUSES.NOT_STARTED,
    monsterSrc: MONSTER_SETTINGS.IMG_DEFAULT,
    log: []
  }),

  methods: {
    /** @description start a new game and reset game values */
    startGame: function() {
      this.gameStatus = GAME_STATUSES.ONGOING
      this.playerHealth = PLAYER_SETTINGS.MAX_HEALTH
      this.monsterHealth = MONSTER_SETTINGS.MAX_HEALTH
      this.monsterSrc = MONSTER_SETTINGS.IMG_DEFAULT
    },

    setMonsterImage: function() {
      if (this.gameStatus === GAME_STATUSES.ATTACK) {
        this.monsterSrc = MONSTER_SETTINGS.IMG_ATTACK
      } else {
        this.monsterSrc = require(MONSTER_SETTINGS.IMG_DEFAULT)
      }
    },

    monsterAttack: function() {
      this.monsterSrc = MONSTER_SETTINGS.IMG_ATTACK
      const playerDamage = this.calculateDamage(
        MONSTER_SETTINGS.ATTACK_MIN,
        MONSTER_SETTINGS.ATTACK_MAX
      )
      this.playerHealth -= playerDamage
      this.log.unshift({
        isPlayer: false,
        text: `You lost -${playerDamage} HP`
      })

      if (this.monsterHealth > 0 && this.playerHealth > 0) {
        // return player images to default after attack
        const vm = this
        setTimeout(function() {
          vm.gameStatus = GAME_STATUSES.ONGOING
          vm.monsterSrc = MONSTER_SETTINGS.IMG_DEFAULT
        }, MONSTER_SETTINGS.IMG_ATTACK_RECOVERY_MS)
      }
    },

    /** @description attacks enemy and makess */
    attack: function() {
      this.gameStatus = GAME_STATUSES.ATTACK
      const monsterDamage = this.calculateDamage(
        PLAYER_SETTINGS.ATTACK_MAX,
        PLAYER_SETTINGS.ATTACK_MAX
      )
      this.monsterHealth -= monsterDamage
      this.log.unshift({
        isPlayer: true,
        text: `Monster lost -${monsterDamage} HP`
      })
      // allow monster attack back
      this.monsterAttack()
      this.checkGameStatus()
    },

    /** @description more powerful attack availablee for user, not for monster  */
    specialAttack: function() {
      this.gameStatus = GAME_STATUSES.ATTACK
      const monsterDamage = this.calculateDamage(
        PLAYER_SETTINGS.SPECIAL_ATTACK_MIN,
        PLAYER_SETTINGS.SPECIAL_ATTACK_MAX
      )
      this.monsterHealth -= monsterDamage
      this.log.unshift({
        isPlayer: true,
        text: `Monster lost -${monsterDamage} HP`
      })
      // allow monster attack back
      this.monsterAttack()
      this.checkGameStatus()
    },

    /** @description increses player health and allows monster to attack */
    heal: function() {
      this.gameStatus = GAME_STATUSES.HEAL
      if (
        this.playerHealth + PLAYER_SETTINGS.HEAL_POWER >
        PLAYER_SETTINGS.MAX_HEALTH
      ) {
        // health cannot go over 100
        this.playerHealth = PLAYER_SETTINGS.MAX_HEALTH
      } else {
        this.playerHealth += PLAYER_SETTINGS.HEAL_POWER
      }

      this.gameStatus = GAME_STATUSES.HEAL
      // Monster attack while healing
      this.monsterAttack()

      // after half a second return back to normal
      const vm = this
      setTimeout(function() {
        vm.gameStatus = GAME_STATUSES.ONGOING
      }, 1000)
    },

    /** @desctiption Cancel game and return to start screen */
    giveUp: function() {
      this.gameStatus = GAME_STATUSES.LOSE
    },

    /** @description returns random damage value that will be substracted from player health
     * @param {number} min min number of damage caused to a player
     * @param {number} max max number of damage caused to a player
     */
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },

    /** @description Check if player or monster won, otherwise continue game */
    checkGameStatus: function() {
      if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
        console.log("checking win", GAME_STATUSES.WIN, GAME_STATUSES.LOSE)
        this.gameStatus =
          this.monsterHealth <= 0 ? GAME_STATUSES.WIN : GAME_STATUSES.LOSE
        console.log(this.gameStatus)
      }
    }
  },

  watch: {
    log: function() {
      console.log(this.log)
    }
  },

  components: {
    HealthBar,
    Button,
    StartScreen,
    EndScreen,
    Monster
  }
}
</script>

<style lang="scss" scoped>

.game-screen {
  background-image: url("~@/assets/img/bg.svg");
  background-size: 100vw auto;
  background-position: 50% 0;
  background-size: cover;
}

.game-controls {
  margin-top: auto;
}

.game-end-screen {
  margin: 5em auto;
}

.player-health-bar-title {
  margin-top: 1em;
}
</style>
