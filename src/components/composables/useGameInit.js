import {onBeforeMount, ref, watch} from "vue";
import { LVL_COUNT, BACKGROUND_VALUES } from "@/constants";

export default function useGameInit() {
    let lvl = ref(LVL_COUNT["1"]);
    const lives = ref(5);
    let fields = ref([]);

    const init = () => {
        fields.value = [];
        lives.value = lvl.value / 2;

        for(let i = 0; i < lvl.value; i++) {
            fields.value.push({
                id: i,
                clicked: false,
                matched: false,
                value: BACKGROUND_VALUES["999"],
            });
        }
    }

    watch(lvl, (newLvl) => {
        if(newLvl > LVL_COUNT["6"]) {
            lvl.value = LVL_COUNT["6"];
        }
    });

    onBeforeMount(init);

    return {
        lvl,
        lives,
        fields,
        init
    }
}
