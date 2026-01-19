<script setup lang="ts">
import {ref} from "vue";
import ImportCSVModal from "@/components/applications/function_bar/add_position_buttons/ImportCSVModal.vue";

const isShowingCSVModal = ref(false);

const showCSVModal = () => {
  isShowingCSVModal.value = true;
};

const hideCSVModal = () => {
  isShowingCSVModal.value = false;
};
</script>

<template>
  <div class="relative inline-block text-left">
    <button @click="showCSVModal"
       class="px-4 py-2 rounded-sm cursor-pointer bg-gray-600 dark:bg-zinc-900 hover:bg-gray-500 dark:hover:bg-zinc-800 transition">
      Import CSV
    </button>

    <ImportCSVModal :show="isShowingCSVModal" @close="hideCSVModal"/>
  </div>
</template>

<style scoped>

</style>