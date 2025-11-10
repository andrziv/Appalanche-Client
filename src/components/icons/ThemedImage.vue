<script setup lang="ts">
interface Props {
  lightSrc: string;
  darkSrc: string;
  alt?: string;
  imgClass?: string;
}

defineProps<Props>();
</script>

<template>
  <picture>
    <source :srcset="darkSrc" media="(prefers-color-scheme: dark)"/>
    <img :src="lightSrc" :alt="alt" :class="imgClass"/>
  </picture>
</template>

<style scoped>

</style>