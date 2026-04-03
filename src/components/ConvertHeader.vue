<script setup lang="js">
import ConvertCurrencyIcon from "./icons/ConvertCurrencyIcon.vue";
</script>

<template>
  <div class="convertHeader">
    <ConvertCurrencyIcon />
    <h1 class="convertHeader-title">Converter</h1>
  </div>
</template>

<style scoped lang="scss">
.convertHeader {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 15px;

  &-title {
    font-size: 2.7rem;
  }
}

@media screen and (max-width: 536px) {
  .convertHeader {
    justify-content: center;

    &-title {
      display: none;
    }

  }
}


</style>
