<script setup lang="ts">
import {ref} from 'vue';
import IconXMark from "@/components/icons/simple-characters/IconXMark.vue";
import type {OperatorType} from '@/models/InterestCondition';
import {InterestCondition, OPERATORS, operatorTypeMapping} from "@/models/InterestCondition";

const props = defineProps<{
  interestCriteria: InterestCondition[]
}>();

const emit = defineEmits(['update:interestCriteria']);

const showConditionMenu = ref(false);
const interestCondition = ref<InterestCondition | null>(null);

function finalizeCondition() {
  if (interestCondition.value === null) {
    return;
  }

  const copy = props.interestCriteria.slice();
  if (interestCondition.value.isValid()) {
    copy.push(interestCondition.value);
  }
  resetCondition();
  emit('update:interestCriteria', copy);
}

function removeInterest(index: number) {
  const copy = props.interestCriteria.slice();
  copy.splice(index, 1);
  emit('update:interestCriteria', copy);
}

function startNewCondition(operator: OperatorType) {
  interestCondition.value = new InterestCondition(operator, 0, 0);
}

function resetCondition() {
  interestCondition.value = null;
}
</script>

<template>
  <div @click.stop class="flex flex-col space-y-3 text-gray-800 dark:text-gray-100">
    <div v-if="props.interestCriteria.length > 0" class="flex flex-wrap gap-2 max-w-60">
      <div v-for="(filter, index) in props.interestCriteria" :key="index" @click="removeInterest(index)"
           class="inline-flex items-center w-fit space-x-2 px-3 py-1 bg-green-200 dark:bg-green-800 text-sm rounded-sm cursor-pointer hover:bg-green-300 dark:hover:bg-green-700 transition">
        <div>
          <span>
            {{ filter.displayString() }}
          </span>
        </div>

        <IconXMark class="h-3 w-auto dark:invert-75"/>
      </div>
    </div>

    <div>
      <div v-if="!interestCondition" class="flex space-x-2 items-center">
        <button v-if="!showConditionMenu"
           class="rounded-sm text-center text-sm font-semibold w-full px-2 py-1 bg-gray-200 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-100 transition"
           @click="showConditionMenu = true">
          Add
        </button>
        <div v-else class="flex flex-col space-y-2">
          <div class="grid grid-cols-3 gap-2">
            <button v-for="op in OPERATORS" :key="op"
               class="rounded-sm text-center text-sm font-semibold px-2 py-1 bg-gray-200 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-100 transition"
               @click="startNewCondition(op as OperatorType)">
              <template v-if="op === 'between'">x ≤ interest ≤ y</template>
              <template v-else>x {{ operatorTypeMapping(op) }} interest</template>
            </button>
          </div>

          <button class="rounded-sm text-center text-sm font-semibold px-2 py-1 bg-gray-200 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-100 transition"
             @click="showConditionMenu = false">
            Cancel
          </button>
        </div>
      </div>
      <div v-else class="flex flex-wrap items-center space-x-2">
        <div class="flex items-center space-x-2 flex-1 min-w-0 text-sm text-black dark:text-white">
          <template v-if="interestCondition.operator === 'between'">
            <input v-model.number="interestCondition.conditionNum"
                   type="number"
                   min="0"
                   max="10"
                   class="w-16 px-2 py-1 rounded-sm bg-gray-200 dark:bg-zinc-800"
                   placeholder="min"/>
            <span class="text-sm">{{ operatorTypeMapping('between') }} x {{ operatorTypeMapping('between') }}</span>
            <input v-model.number="interestCondition.conditionNum2"
                   type="number"
                   min="0"
                   max="10"
                   class="w-16 px-2 py-1 rounded-sm bg-gray-200 dark:bg-zinc-800"
                   placeholder="max"/>
          </template>
          <template v-else>
            <span class="text-sm shrink-0">x {{ operatorTypeMapping(interestCondition.operator) }}</span>
            <input v-model.number="interestCondition.conditionNum"
                   type="number"
                   min="0"
                   max="10"
                   placeholder="value"
                   class="flex-1 px-2 py-1 border border-gray-300 dark:border-zinc-700 rounded-sm bg-white dark:bg-zinc-800 text-sm min-w-0"/>
          </template>
        </div>

        <div class="flex items-center space-x-2 shrink-0 text-sm font-semibold text-black dark:text-gray-100">
          <button class="rounded-sm text-center px-2 py-1 bg-green-500 hover:bg-green-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
             @click="finalizeCondition">
            Finalize
          </button>
          <button class="rounded-sm text-center px-2 py-1 bg-gray-200 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
             @click="resetCondition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>