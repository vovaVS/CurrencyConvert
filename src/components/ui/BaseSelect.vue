<script setup>
import {ref, watch } from "vue";

const props = defineProps({
  option: Array,
  default_value: String,
});

const options_select = ref(props.default_value);

const isActive = ref(false);
const emit = defineEmits(["update:select"]);

const selectChange = (value) =>
{
  emit("update:select", value);
  isActive.value = false;
}

const toggleSelect = () => {
  isActive.value = !isActive.value;
};

watch(()=> props.default_value, (newVal)=>{options_select.value = newVal});
</script>

<template>
  <div class="convert__select">
    <div class="convert__select-tab" @click="toggleSelect">{{ options_select}}</div>
    <transition name="convert__select-transition">
      <div class="convert__select-wrapper" v-if="isActive">
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
@use "@/assets/style/mixins" as *;

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
    padding-left: 25px;
    font-size: 0.8rem;
  }

  &-row:hover {
    background-color: #fff;
    color: black;
  }

  &-tab {
    display: flex;
    align-items: center;
    height: 30px;
    color: black;
    font-size: 0.8rem;
    padding-left: 25px;
    border: 1px solid black;
  }

  &-wrapper::-webkit-scrollbar {
    width: 6px;
  }

  &-wrapper::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &-wrapper::-webkit-scrollbar-thumb {
    background-color: rgb(59, 59, 59);
    border-radius: 4px;
  }

  &-transition {
    @include convertSelect-transtion();
  }
  @media screen and (max-width: 536px) {
    &-response {
      padding: 25px 0 0 0;
    }
  }
}
</style>
