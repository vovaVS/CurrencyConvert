<script setup>
const emit = defineEmits(["click"]);

defineProps({
  type:{
    default: 'button',
    type: String,
  },
  disabled: Boolean,
});
</script>

<template>
  <button :type="type" :disabled="disabled" class="convert__button" @click="emit('click')"><slot/></button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.convert__button {
  width: 50%;
  height: 45px;
  border-radius: $borderRadius-button;
  border: none;
  background-color: $backgroundColor-button;
  color: $colorText-white;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {

    transform: translateY(-3px);
    background: #48e7ea;
    color: $colorText-black;
  }

  &:active {
    transform: scale(0.96);
  }
}
</style>
