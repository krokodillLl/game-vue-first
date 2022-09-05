<template>
  <div class="board-wrapper">
    <div class="board">
      <BoardItem v-for="field in fields" :field="field" :game-status="gameStatus" :key="'item-' + field.id"
      @selectField="selectField($event)"/>
    </div>

    <p class="lvl">Level: <strong>{{ result + ' / 6' }}</strong></p>
    <p class="lvl">Lives: <strong>{{ lives }}</strong></p>
    <p class="win" v-if="isWin">{{ result === 7 ? 'You complete this game, good job!' : 'You complete this round, be ready!' }}</p>
    <p class="fail" v-if="isFail">Nice try, i hope, you will win in next time! Your result: <strong>{{ result + ' / 6' }}</strong></p>

    <button class="btn start" @click="start" :disabled="!enableStartButton" v-if="!enableReloadGame">Start game</button>
    <button class="btn reload" @click="reload" :disabled="!enableStartButton" v-if="enableReloadGame">Reload game</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import BoardItem from './BoardItem';
import useGameInit from "@/components/composables/useGameInit";
import useGameStart from "@/components/composables/useGameStart";
import useGameProcess from "@/components/composables/useGameProcess";
import {GAME_STATUS} from "@/constants";

export default {
  name: 'BoardComponent',
  props: {},
  components: {
    BoardItem,
  },

  setup() {
    let result = ref(1);

    const gameStatus = ref(GAME_STATUS.NONE);

    const { lvl, lives, fields, init } = useGameInit();

    const { start, enableStartButton, enableReloadGame } = useGameStart(init, fields, lvl, gameStatus);

    const { selectField, isWin, isFail, reload } = useGameProcess(fields, gameStatus, lvl, lives, start, result);

    return {
      lvl,
      lives,
      fields,
      init,
      start,
      reload,
      gameStatus,
      enableStartButton,
      selectField,
      isWin,
      isFail,
      result,
      enableReloadGame
    }
  },

  methods: {
  }
}
</script>

<style scoped>
.board-wrapper {
  margin-bottom: 100px;
}
.board {
  min-width: 50%;
  max-width: 50%;
  margin: 0 auto;
}
.start {
  background: #42b983;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 10px 30px;
  margin: 10px 0;
  cursor: pointer;
  outline: none;
}
.reload {
  background: orange;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 10px 30px;
  margin: 10px 0;
  cursor: pointer;
  outline: none;
}
button:hover {
  background: #A19320CC;
}

button:disabled {
  opacity: .5;
}
.win {
  color: #42b983;
}
.fail {
  color: #ff000055;
}

</style>
