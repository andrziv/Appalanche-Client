import {computed, type Ref, type WritableComputedRef} from 'vue';

type InputType = 'date' | 'datetime-local';

export function getUserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function createIsoBinding(isoRef: Ref<string | null>, type: InputType = 'date'): WritableComputedRef<string, string> {
    return computed({
        get: () => {
            if (!isoRef.value) {
                return '';
            }

            const date = new Date(isoRef.value);

            if (type === 'date') {
                const localIsoDate = toLocalIsoString(date);
                return localIsoDate.split('T')[0] || localIsoDate;
            } else {
                return toLocalIsoString(date).slice(0, 16);
            }
        },

        set: (val: string) => {
            if (!val) {
                isoRef.value = null;
                return;
            }

            const dateStr = type === 'date' ? `${val}T00:00:00` : val;
            isoRef.value = new Date(dateStr).toISOString();
        }
    });
}

function toLocalIsoString(date: Date): string {
    const offsetMilliseconds = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date.getTime() - offsetMilliseconds);
    return localTime.toISOString();
}