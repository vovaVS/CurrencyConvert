<script setup>
import ConvertReversIcon from "@/components/icons/СonvertReversIcon.vue";

const emit = defineEmits(["click"]);
</script>

<template>
  <button class="convert__button-reverse" @click="emit('click')"><ConvertReversIcon /></button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.convert__button-reverse {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  font-size: $default-fonts-size;

  &:hover {
    fill: brown;
  }
}
</style>
