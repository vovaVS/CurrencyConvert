<script setup>
import ConvertReversIcon from "@/components/icons/СonvertReversIcon.vue";

const emit = defineEmits(["click"]);
</script>

<template>
  <button class="convert__button-reverse" @click="emit('click')"><ConvertReversIcon /></button>
</template>

<style scoped lang="scss">
.convert__button-reverse {
  width: 30px;
  height: 30px;
  background: none;
  border: none;

  &:hover {
    fill: brown;
  }
}
</style>
