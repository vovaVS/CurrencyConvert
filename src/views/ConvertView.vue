<script setup>
import { ref, onMounted, reactive } from "vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import ConvertHeader from "@/components/convert/ConvertHeader.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseButtonRevers from "@/components/convert/ButtonRevers.vue";
import { CurrencyRender } from "@/api/service/currencyService";
import { useCurrencyStore } from "@/stores/currencyStore";
import { validator } from "@/utils/validator";
import router from "@/router";

const useCurrency = useCurrencyStore();
const currencyData = reactive({ value: "Выберите валюту", price: "", inputValue: "", tag: "" });
const options = ref([]);
const isActive = ref(false);

const convertData = () => {
  if (validator(currencyData.inputValue, currencyData.tag, currencyData.price)) return;
  useCurrency.convert(currencyData.inputValue, currencyData.price, currencyData.tag);
};

const reverseConvert = () => {
  if (validator(currencyData.inputValue, currencyData.tag, currencyData.price)) return;
  isActive.value = !isActive.value;

  if (isActive.value) {
    useCurrency.reverse(currencyData.inputValue, currencyData.price, currencyData.tag);
    return;
  }
  convertData();
};

const handleConvert = () => {
  convertData();
};

const selectChange = (select) => {
  currencyData.value = select.name;
  currencyData.tag = select.tag;
  currencyData.price = select.price;
};

const currencyRender = async () => {
  try {
    const response = await CurrencyRender();
    const array = response.data.Valute;

    options.value = Object.values(array).map((item) => ({
      tag: item.CharCode,
      name: item.Name,
      price: item.Value,
    }));
  } catch (error) {
    console.log(error);
  }
};

const cours = async () => {
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
          :default_value="currencyData.value"
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
      <BaseButton @click="cours">Курс</BaseButton>
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
