<script setup>
const emit = defineEmits(['inputContent']);
</script>

<template>
  <input
    class="convertSelect__input"
    placeholder="Введите сумму"
    @input="emit('inputContent', $event.target.value)"
  />
</template>

<style scoped lang="scss">
.convertSelect__input {
  z-index: 1;
  height: 35px;
  text-align: center;
}
</style>
