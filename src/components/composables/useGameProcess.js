import {GAME_SPEED, GAME_STATUS, LVL_COUNT} from "@/constants";
import {computed, nextTick} from "vue";


export default function useGameProcess(fields, gameStatus, lvl, lives, start, result) {

    const selectField = (id) => {
        const index = fields.value.findIndex((field) => {
            return field.id === id;
        });

        let numberOfClicked = 0;

        for(const field of fields.value) {
            numberOfClicked += field.clicked ? 1 : 0;
        }

        if (numberOfClicked < 2 && index > -1 && !fields.value[index].clicked) {
            fields.value[index].clicked = true;
            if (numberOfClicked === 1) { // if after select will 2
                checkMatch();
            }
        }
    }

    const checkMatch = () => {
        let clickedIndexes = [];
        for (let i = 0; i < fields.value.length; i++) {
            if (fields.value[i].clicked) {
                clickedIndexes.push(i);
            }
        }

        if (fields.value[clickedIndexes[0]].value !== fields.value[clickedIndexes[1]].value) {
            if (lives.value >= 0) {
                lives.value--;
            }
            setTimeout(async () => {
                await nextTick();
                fields.value[clickedIndexes[0]].clicked = false;
                fields.value[clickedIndexes[1]].clicked = false;
                if (lives.value <= 0) {
                    setGameOver();
                }
            }, GAME_SPEED / 2);
        } else {
            fields.value[clickedIndexes[0]].matched = true;
            fields.value[clickedIndexes[1]].matched = true;
            fields.value[clickedIndexes[0]].clicked = false;
            fields.value[clickedIndexes[1]].clicked = false;

            const notMatchedItemIndex = fields.value.findIndex(field => {
                return !field.matched;
            });

            if (notMatchedItemIndex === -1) {
                setWin();
            }
        }
    }

    const setGameOver = () => {
        gameStatus.value = GAME_STATUS.FAIL;
        setResultByCount(lvl.value);
        lvl.value = LVL_COUNT["1"];
    }

    const setWin = () => {
        gameStatus.value = GAME_STATUS.WIN;

        setTimeout(async () => {
            lvl.value *= 2;
            setResultByCount(lvl.value);

            await nextTick();
            start();
        }, GAME_SPEED);
    }

    const setResultByCount = (count) => {
        result.value = Math.log2(count / 2);
    }

    const isWin = computed(() => {
        return gameStatus.value === GAME_STATUS.WIN;
    });

    const isFail = computed(() => {
        return gameStatus.value === GAME_STATUS.FAIL;
    });

    const reload = () => {
        result.value = 1;
        lvl.value = LVL_COUNT["1"];
        gameStatus.value = GAME_STATUS.NONE;
    }

    return {
        selectField,
        isWin,
        isFail,
        setGameOver,
        reload
    }
}
