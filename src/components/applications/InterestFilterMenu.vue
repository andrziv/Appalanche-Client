<script setup lang="ts">
import {ref} from 'vue'
import {useFilterStore} from '@/stores/useFilterStore'
import IconXMark from "@/components/icons/IconXMark.vue";

const store = useFilterStore()

const showConditionMenu = ref(false)
const interestOperator = ref<'>' | '>=' | '=' | 'range' | ''>('')
const interestValue = ref<number | null>(null)
const interestValue2 = ref<number | null>(null)

function finalizeCondition() {
  if (interestOperator.value === 'range' && interestValue.value != null && interestValue2.value != null) {
    store.interestFilters.push({
      operator: 'range',
      value: interestValue.value,
      value2: interestValue2.value
    })
  } else if (interestOperator.value && interestValue.value != null) {
    store.interestFilters.push({
      operator: interestOperator.value,
      value: interestValue.value
    })
  }
  resetCondition()
}

function removeInterest(index: number) {
  store.interestFilters.splice(index, 1)
}

function startNewCondition(operator: '>' | '>=' | '=' | 'range') {
  interestOperator.value = operator
}

function resetCondition() {
  interestOperator.value = ''
  interestValue.value = null
  interestValue2.value = null
  showConditionMenu.value = false
}
</script>

<template>
  <div @click.stop class="flex flex-col space-y-3 text-gray-800 dark:text-gray-100">
    <div v-if="store.interestFilters.length > 0" class="flex flex-wrap gap-2 max-w-60">
      <div v-for="(filter, index) in store.interestFilters"
           :key="index"
           class="inline-flex items-center w-fit space-x-2 px-3 py-1 bg-green-200 dark:bg-green-800 text-sm rounded-sm cursor-pointer hover:bg-green-300 dark:hover:bg-green-700 transition"
           @click="removeInterest(index)">
        <div>
          <span v-if="filter.operator === 'range'">
            {{ filter.value }} <= x <= {{ filter.value2 }}
          </span>
          <span v-else>
            x {{ filter.operator }} {{ filter.value }}
          </span>
        </div>

        <IconXMark class="h-3 w-auto dark:invert-75"/>
      </div>
    </div>

    <div>
      <div v-if="!interestOperator" class="flex space-x-2 items-center">
        <a v-if="!showConditionMenu"
           class="rounded-sm text-center text-sm font-semibold w-full px-2 py-1 bg-gray-200 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-100 transition"
           @click="showConditionMenu = true">
          Add
        </a>
        <div v-else class="flex flex-col space-y-2">
          <div class="grid grid-cols-3 gap-2">
            <a v-for="op in ['>', '>=', '=', '<=', '<', 'range']" :key="op"
               class="rounded-sm text-center text-sm font-semibold px-2 py-1 bg-gray-200 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-100 transition"
               @click="startNewCondition(op as string)">
              <template v-if="op === 'range'">x ≤ interest ≤ y</template>
              <template v-else>x {{ op }} interest</template>
            </a>
          </div>

          <a class="rounded-sm text-center text-sm font-semibold px-2 py-1 bg-gray-200 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-100 transition"
             @click="showConditionMenu = false">
            Cancel
          </a>
        </div>
      </div>
      <div v-else class="flex flex-wrap items-center space-x-2">
        <div class="flex items-center space-x-2 flex-1 min-w-0 text-sm text-black dark:text-white">
          <template v-if="interestOperator === 'range'">
            <input v-model.number="interestValue"
                   type="number"
                   min="0"
                   max="10"
                   class="w-16 px-2 py-1 rounded-sm bg-gray-200 dark:bg-zinc-800"
                   placeholder="min"/>
            <span class="text-sm">≤ x ≤</span>
            <input v-model.number="interestValue2"
                   type="number"
                   min="0"
                   max="10"
                   class="w-16 px-2 py-1 rounded-sm bg-gray-200 dark:bg-zinc-800"
                   placeholder="max"/>
          </template>
          <template v-else>
            <span class="text-sm flex-shrink-0">x {{ interestOperator }}</span>
            <input v-model.number="interestValue"
                   type="number"
                   min="0"
                   max="10"
                   placeholder="value"
                   class="flex-1 px-2 py-1 border border-gray-300 dark:border-zinc-700 rounded-sm bg-white dark:bg-zinc-800 text-sm min-w-0"/>
          </template>
        </div>

        <div class="flex items-center space-x-2 flex-shrink-0 text-sm font-semibold text-black dark:text-gray-100">
          <a class="rounded-sm text-center px-2 py-1 bg-green-500 hover:bg-green-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
             @click="finalizeCondition">
            Finalize
          </a>
          <a class="rounded-sm text-center px-2 py-1 bg-gray-200 hover:bg-gray-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
             @click="resetCondition">
            Cancel
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>