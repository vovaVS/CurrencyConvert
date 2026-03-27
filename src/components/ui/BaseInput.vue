<script setup>
const modelValue = defineModel();

defineProps({
  placeholder: String,
  id: String,
  name: String,
  type:{
    type: String,
    default: 'text',
  }
})
</script>

<template>
  <input
    class="convert__input"
    :id="id"
    :name="id"
    :type="type"
    :placeholder="placeholder"
    v-model="modelValue"
   />
</template>

<style scoped lang="scss">
.convert__input {
  z-index: 1;
  height: 35px;
  text-align: center;
}
</style>
