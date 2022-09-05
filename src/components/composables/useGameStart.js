import {GAME_SPEED, GAME_STATUS, BACKGROUND_VALUES } from "@/constants";
import {computed} from "vue";

export default function useGameStart(init, fields, lvl, gameStatus) {
    const start = () => {
        init();
        prepareGame();
    };

    const prepareGame = () => {
        gameStatus.value = GAME_STATUS.PREVIEW;
        let usedIcons = [];
        let usedIndexes = [];
        for (let i = 0; i < lvl.value; i++) {
            if(contains(usedIndexes, i)) {
                continue;
            }

            const iconId = random(0, BACKGROUND_VALUES["888"]);
            if(contains(usedIcons, iconId)) {
                i --;
                continue;
            }
            usedIcons.push(iconId);
            usedIndexes.push(i);

            fields.value[i].value = BACKGROUND_VALUES[iconId];

            const pairIndex = getPairFreeIndex(lvl.value, usedIndexes);
            usedIndexes.push(pairIndex);

            fields.value[pairIndex].value = BACKGROUND_VALUES[iconId];
        }

        setTimeout(() => {
            gameStatus.value = GAME_STATUS.STARTED;
        }, GAME_SPEED);
    };

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const contains = (array, value) => {
        const index = array.findIndex((val) => {
            return val === value;
        });

        return index > -1;
    }

    const getPairFreeIndex = (maxIndex, usedIndexes) => {
        const index = random(0, maxIndex);

        if(contains(usedIndexes, index)) {
            return getPairFreeIndex(maxIndex, usedIndexes);
        }

        return index;
    }

    const enableStartButton = computed(() => {
        return gameStatus.value !== GAME_STATUS.PREVIEW && gameStatus.value !== GAME_STATUS.WIN;
    });

    const enableReloadGame = computed(() => {
        return gameStatus.value !== GAME_STATUS.NONE;
    });

    return {
        start,
        enableStartButton,
        enableReloadGame
    }
}
