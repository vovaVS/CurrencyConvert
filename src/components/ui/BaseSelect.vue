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
  emit("select", value);
  isActive.value = false;
}

const toggleSelect = () => {
  isActive.value = !isActive.value;
};

watch(()=> props.default_value, (newVal)=>{options_select.value = newVal});
</script>

<template>
  <div class="convertSelect">
    <div class="convertSelect__tab" @click="toggleSelect">{{ options_select}}</div>
    <transition name="convertSelect__transition">
      <div class="convertSelect__wrapper" v-if="isActive">
        <div
          class="convertSelect-row"
          v-for="index in option"
          :key="index"
          @click="selectChange(index)">
          <p class="convertSelect-content">{{ index.tag }} | {{ index.name }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/style/mixins" as *;

.convertSelect {
  width: 100%;
  position: relative;

  &__wrapper {
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

  &__tab {
    display: flex;
    align-items: center;
    height: 30px;
    color: black;
    font-size: 0.8rem;
    padding-left: 25px;
    border: 1px solid black;
  }

  &__wrapper::-webkit-scrollbar {
    width: 6px;
  }

  &__wrapper::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &__wrapper::-webkit-scrollbar-thumb {
    background-color: rgb(59, 59, 59);
    border-radius: 4px;
  }

  .convertSelect__transition {
    @include convertSelect-transtion();
  }
  @media screen and (max-width: 536px) {
    &__response {
      padding: 25px 0 0 0;
    }
  }
}
</style>
