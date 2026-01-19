<script setup lang="ts">
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  modelValue: number,
  totalPages: number,
  siblingCount?: number
}>(), {
  siblingCount: 1
});

const emit = defineEmits(['update:modelValue']);

const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({length}, (_, idx) => idx + start);
};

const paginationRange = computed(() => {
  const totalPageCount = props.totalPages;
  const siblingCount = props.siblingCount;
  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  const currentPage = props.modelValue + 1;

  const totalNumbers = siblingCount * 2 + 1;

  if (totalNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

  const accountedLeftIndex = currentPage == lastPageIndex ? Math.max(leftSiblingIndex - 1, firstPageIndex) : leftSiblingIndex;
  const accountedRightIndex = currentPage == firstPageIndex ? Math.min(rightSiblingIndex + 1, lastPageIndex) : rightSiblingIndex;

  const shouldShowLeftDots = accountedLeftIndex - firstPageIndex > 2;
  const shouldShowRightDots = totalPageCount - accountedRightIndex > 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftIndex = leftSiblingIndex - firstPageIndex <= 2 ? firstPageIndex : leftSiblingIndex;
    const visibleRange = range(leftIndex, accountedRightIndex);
    return [...visibleRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightIndex = lastPageIndex - rightSiblingIndex <= 2 ? lastPageIndex : rightSiblingIndex;
    const visibleRange = range(accountedLeftIndex, rightIndex);
    return [firstPageIndex, DOTS, ...visibleRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return range(firstPageIndex, lastPageIndex);
});

const onPageChange = (page: number | string) => {
  if (page === DOTS) {
    return;
  }

  emit('update:modelValue', (page as number) - 1);
};

const next = () => {
  if (props.modelValue < props.totalPages - 1) {
    emit('update:modelValue', props.modelValue + 1);
  }
};

const prev = () => {
  if (props.modelValue > 0) {
    emit('update:modelValue', props.modelValue - 1);
  }
};
</script>

<template>
  <div v-if="totalPages > 1" class="@container flex items-center justify-center space-x-2">
    <button @click="prev" :disabled="modelValue === 0"
            class="std-buttons page-buttons disabled:opacity-50 disabled:cursor-not-allowed">
      <
    </button>

    <span class="text-sm font-medium whitespace-nowrap px-2 @min-[30rem]:hidden">
      Page {{ modelValue + 1 }} of {{ totalPages }}
    </span>

    <div class="hidden items-center space-x-2 @min-[30rem]:flex">
      <div v-for="(page, index) in paginationRange" :key="index">
        <span v-if="page === DOTS" class="px-2 text-gray-400 dark:text-gray-500">
          ...
        </span>
        <button v-else @click="onPageChange(page)" class="std-buttons min-w-8"
                :class="[(page === modelValue + 1) ? 'active-page-button' : 'page-buttons']">
          {{ page }}
        </button>
      </div>
    </div>

    <button @click="next" :disabled="modelValue >= totalPages - 1"
            class="std-buttons page-buttons disabled:opacity-50 disabled:cursor-not-allowed">
      >
    </button>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
@reference '@/style.css';

.std-buttons {
  @apply px-3 py-1.5 text-sm font-medium rounded-sm transition;
}

.page-buttons {
  @apply bg-gray-200 text-gray-700 dark:bg-zinc-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-700;
}

.active-page-button {
  @apply text-white bg-red-800 dark:bg-red-900  hover:bg-red-700;
}
</style>