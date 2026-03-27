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
.convert__button {
  width: 50%;
  height: 45px;
  border-radius: 8px;
  border: none;
  background-color: #00b4d8;
  color: #fff;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    
    transform: translateY(-3px);
    background: #48e7ea;
    color: #ffffff;
  }

  &:active {
    transform: scale(0.96);
  }
}
</style>
