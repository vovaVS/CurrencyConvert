<script setup lang="js">
import ConvertCurrencyIcon from "../icons/ConvertCurrencyIcon.vue";
</script>

<template>
  <div class="currency__header">
    <ConvertCurrencyIcon />
    <h1 class="currency__header-title">CurrencyConvert</h1>
  </div>
</template>

<style scoped lang="scss">
.currency__header {
  display: flex;
  width: 100%;

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
