<script setup lang="ts">
import {ref} from "vue";
import AddApplicationModal from "@/components/applications/add_position_buttons/AddApplicationModal.vue";

const isShowingAddModal = ref(false);

const showAddModal = () => {
  isShowingAddModal.value = true;
};

const hideAddModal = () => {
  isShowingAddModal.value = false;
};

</script>

<template>
  <div class="relative inline-block text-left">
    <a @click="showAddModal"
       class="px-4 py-2 rounded-sm cursor-pointer bg-red-800 dark:bg-red-900 text-white hover:bg-red-700">
      Add Application
    </a>

    <AddApplicationModal :show="isShowingAddModal" @close="hideAddModal"/>
  </div>
</template>

<style scoped>

</style>