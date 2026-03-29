<script setup>
import { ref, onMounted, reactive } from "vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import ConvertHeader from "@/components/convert/ConvertHeader.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseButtonRevers from "@/components/convert/ButtonRevers.vue";
import { useCurrencyStore } from "@/stores/currencyStore";
import { validator } from "@/utils/validator";
import router from "@/router";
import {CurrencyRender} from "@/api/service/currencyRender.js";

const useCurrency = useCurrencyStore();
const currencyData = reactive({price: "", inputValue: "", tag: "" });
const defaultValue = ref("Выберите валюту");
const options = ref([]);
const isActive = ref(false);

const convertData = () => {
  return validator(currencyData) ? false : useCurrency.convert(currencyData);
};

const reverseConvert = () => {
  const validation = validator(currencyData) ? false : isActive.value = !isActive.value;
  return validation ? useCurrency.reverse(currencyData) : convertData();
};

const handleConvert = () => {
  convertData();
};

const selectChange = (select) => {
  defaultValue.value = select.name;
  currencyData.tag = select.tag;
  currencyData.price = select.price;
};

const currencyRender = async () => {
  try {
    const response = await CurrencyRender();
    const array = response.data.Valute;
    console.log(array);
    options.value = Object.values(array).map((item) => ({
      tag: item.CharCode,
      name: item.Name,
      price: item.Value,
    }));
  } catch (error) {
    console.log(error);
  }
};

const course = async () => {
  await router.push("/course");
  useCurrency.result = "";
};

onMounted(() => {
  currencyRender();
});
</script>

<template>
  <article class="convert">
    <ConvertHeader />
    <div class="convert__wrapper">
      <div class="convert__choice">
        <BaseSelect
          :option="options"
          :default_value="defaultValue"
          @update:select="selectChange"
        />
        <BaseButtonRevers @click="reverseConvert" />
      </div>
      <BaseInput
        v-model="currencyData.inputValue"
        id="numberInput"
        name="numberInput"
        placeholder="Введите сумму"
      />
      <p class="convert__output" v-if="useCurrency.result">{{ useCurrency.result }}</p>
    </div>
    <div class="convert__response">
      <BaseButton :disabled="false" type="button" @click="handleConvert">Конвертация</BaseButton>
      <BaseButton @click="course">Курс</BaseButton>
    </div>
  </article>
</template>

<style scoped lang="scss">
.convert {
  display: flex;
  width: 100%;
  max-width: 537px;
  min-height: 337px;
  gap: 12px;
  background-color: white;
  padding: 32px 32px 32px 32px;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;

  &__wrapper {
    display: grid;
    width: 100%;
    grid-template-columns: 2fr;
    gap: 15px;
  }

  &__response {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }

  &__choice {
    display: flex;
    gap: 20px;
  }

  &__output {
    font-size: 1.3rem;
    text-align: center;
  }

  @media screen and (max-width: 375px) {
    padding: 25px 25px 25px 25px;
  }
}
</style>
