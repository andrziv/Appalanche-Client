<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";

const open = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  if (!open.value) {
    window.dispatchEvent(new CustomEvent("close-all-dropdowns"));
  }
  open.value = !open.value;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    open.value = false;
  }
}

function handleGlobalClose() {
  open.value = false;
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("close-all-dropdowns", handleGlobalClose);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("close-all-dropdowns", handleGlobalClose);
});
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <button @click.stop="toggleDropdown"
       class="cursor-pointer transition">
      <slot name="dropdown-button" :dropdownOpen="open"/>
    </button>

    <transition enter-active-class="transition ease-out duration-150"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1">
      <div v-if="open">
        <slot name="dropdown-menu"/>
      </div>
    </transition>
  </div>
</template>

<style scoped>

</style>