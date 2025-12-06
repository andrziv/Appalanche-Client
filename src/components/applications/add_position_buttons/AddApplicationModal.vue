<script setup lang="ts">
import SimpleModal from "@/components/widget/SimpleModal.vue";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["close"]);

function save() {
  emit("close");
}
</script>

<template>
  <SimpleModal :show="props.show" title="Add Application" @close="emit('close')">
    <div class="flex flex-col space-y-3 text-gray-700 dark:text-gray-200">
      <p>dummy text</p>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <button @click="save()"
                class="px-3 py-1 rounded-sm bg-red-800 dark:bg-red-900 text-white hover:bg-red-700 transition">
          Save
        </button>
      </div>
    </template>
  </SimpleModal>
</template>

<style scoped>

</style>