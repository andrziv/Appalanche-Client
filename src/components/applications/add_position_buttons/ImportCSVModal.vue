<script setup lang="ts">
import SimpleModal from "@/components/widget/SimpleModal.vue";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["close"]);

function importCsv() {
  emit("close");
}
</script>

<template>
  <SimpleModal :show="props.show" title="Import from CSV" @close="emit('close')">
    <div class="flex flex-col items-center justify-center text-center space-y-3 text-gray-700 dark:text-gray-200">
      <p>dummy text</p>
      <input type="file" accept=".csv" class="text-sm"/>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <button @click="importCsv()"
                class="px-3 py-1 rounded-sm bg-red-800 dark:bg-red-900 text-white hover:bg-red-700 transition">
          Import
        </button>
      </div>
    </template>
  </SimpleModal>
</template>

<style scoped>

</style>