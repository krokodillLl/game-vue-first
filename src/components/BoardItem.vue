<template>
  <span :class="getBoardItemClasses" :style="getBoardItemStyle" @click="select(field.id)"></span>
</template>

<script>
import {GAME_STATUS} from "@/constants";
import {computed} from "vue";

export default {
  name: 'BoardItem',
  props: {
    field: {
      type: Object,
      required: true,
    },
    gameStatus: {
      type: Number,
      required: false,
      default: GAME_STATUS.NONE
    }
  },
  setup(props) {
    const getBoardItemClasses = computed(() => {
      let classes = 'item ';
      if (props.gameStatus === GAME_STATUS.PREVIEW || props.field.clicked || props.field.matched) {
        classes += 'active ';
        classes += props.field.matched ? 'matched' : '';
      }

      return classes;
    });

    const getBoardItemStyle = computed(() => {
      return {
          background: props.gameStatus === GAME_STATUS.PREVIEW || props.field.clicked || props.field.matched ? props.field.value : '#ccc',
      }
    });

    return {
      getBoardItemClasses,
      getBoardItemStyle
    }
  },
  methods: {
    select(id) {
      if (this.gameStatus === GAME_STATUS.STARTED) {
        this.$emit('selectField', id);
      }
    }
  }
}
</script>

<style scoped>
.item {
  position: relative;
  width: 5em;
  height: 5em;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
  transition: .4s;
  transform-style: preserve-3d;
}

.active {
  transform: rotateY(180deg);
}

</style>
