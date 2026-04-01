<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";
import router from "@/router";
import {getCurrentInstance, onMounted, ref} from "vue";
import {CurrencyRender} from "@/api/service/currencyRender.js";

const currency = ref([]);
const {proxy} = getCurrentInstance()

const currencyRenderTable = async () => {
  try {
    const response = await CurrencyRender(proxy.$api);
    const array = response.data.Valute;

    currency.value = Object.values(array).map((item) => ({
      tag: item.CharCode,
      price: item.Value,
    }));
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  currencyRenderTable();
});

const back = async () => {
  await router.push("/currency");
};
</script>

<template>
  <article class="course">
    <header class="course__header">
      <h2 class="course-title">Курс валюты</h2>
    </header>
    <div class="course__content">
      <div class="course__сontent-wrapper">
        <div class="course__table">
          <table>
            <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс валюты</th>
            </tr>
            </thead>
            <tbody class="course__table-body">
            <tr v-for="index in currency" :key="index">
              <td class="course__table-tag">{{ index.tag }}</td>
              <td class="course__table-price">{{ index.price }}₽</td>
            </tr>
            </tbody>
          </table>
        </div>
        <BaseButton @click="back">Назад</BaseButton>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.course {
  display: flex;
  width: 100%;
  max-width: 537px;
  gap: 12px;
  background-color: white;
  padding: 32px 32px 32px 32px;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;

  &__сontent-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__content {
    width: 100%;
  }

  &__table-body {
    overflow-y: auto;
  }

  &__table::-webkit-scrollbar {
    width: 0;
  }

  &__table::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &__table::-webkit-scrollbar-thumb {
    background-color: rgb(59, 59, 59);
    border-radius: 4px;
  }

  &__table {
    width: 100%;
    text-align: center;
    overflow-y: auto;
    max-height: 450px;
  }

  &__table-tag {
    font-weight: bold;

  }

  &__table-price {
    font-style: italic;

  }
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  width: 50%;
}

tr {
  height: 35px;
}
</style>
