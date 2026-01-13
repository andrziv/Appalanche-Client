import {ref, type Ref, watch} from "vue";

export function createDelayedBinding(original: Ref<boolean>, delayMs = 500): Ref<boolean, boolean> {
    const newValue = ref(false);
    let timer: ReturnType<typeof setTimeout> | null = null;

    watch(original, (change) => {
        if (change) {
            timer = setTimeout(() => {
                newValue.value = true;
            }, delayMs);
        } else {
            if (timer) {
                clearTimeout(timer);
            }
            newValue.value = false;
        }
    });

    return newValue;
}