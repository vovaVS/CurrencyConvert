<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  option: Array,
  defaultValue: String,
});
const emit = defineEmits(["update:select"]);
const options_select = ref(props.defaultValue);
const isActive = ref(false);

const selectChange = (value) => {
  emit("update:select", value);
  isActive.value = false;
}

const focusFalse = ()=>
{
  isActive.value = false;
}

const toggleSelect = () => {
  isActive.value = !isActive.value;
};

watch(() => props.defaultValue, (newVal) => {
  options_select.value = newVal;
});
</script>

<template>
  <div class="convert__select">
    <div class="convert__select-tab" tabindex="0" @click="toggleSelect" @focusout="focusFalse">{{ options_select }}</div>
    <transition name="convert__select-transition" mode="out-in">
      <div class="convert__select-wrapper" v-show="isActive">
        <div
          class="convert__select-row"
          v-for="index in option"
          :key="index"
          @click="selectChange(index)">
          <p class="convert__select-content">{{ index.tag }} | {{ index.name }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.convert__select {
  width: 100%;
  position: relative;

  &-wrapper {
    display: block;
    width: 100%;
    flex-direction: column;
    max-height: 250px;
    overflow-y: scroll;
    position: absolute;
    z-index: 99;
    padding-top: 0.1rem;
  }

  &-row {
    background-color: black;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 15px;
    height: 45px;
    padding-left: $paddingLeft-select;
    font-size: $fontsize;

    @media screen and (max-width: 536px) {
      padding-left: 10px;
      text-align: initial;
      font-size: 0.7rem;
    }
  }

  &-row:hover {
    background-color: #fff;
    color: $colorText-black;
  }

  &-tab {
    display: flex;
    align-items: center;
    height: 30px;
    color: black;
    font-size: $fontsize;
    padding-left: $paddingLeft-select;
    border: 1px solid black;

    @media screen and (max-width: 536px) {
      padding-left: 10px;
    }
  }

  &-wrapper::-webkit-scrollbar {
    width: 6px;
    display: none;
  }

  &-wrapper::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &-wrapper::-webkit-scrollbar-thumb {
    background-color: rgb(59, 59, 59);
    border-radius: 4px;
  }

  @media screen and (max-width: 536px) {
    &-response {
      padding: 25px 0 0 0;
    }
  }
}
</style>
