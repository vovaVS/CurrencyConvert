<script setup>
import {ref, onMounted, reactive, getCurrentInstance} from "vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import CurrencyHeader from "@/components/currency/CurrencyHeader.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseButtonRevers from "@/components/currency/ButtonRevers.vue";
import {useConvert} from "@/composable/useConvert";
import {validator} from "@/utils/validator";
import router from "@/router";
import {CurrencyRender} from "@/api/service/currencyRender";

let {convert, result, reverse} = useConvert();

const currencyData = reactive({value: "", inputValue: "", tag: ""});
const currencyData_1 = reactive({value: "", inputValue: "", tag: ""});
const placeholderSelect = reactive({selectOne: "Выберите валюту", selectTwo: "Выберите валюту"});
const options = ref([]);
const isActive = ref(false);
const {proxy} = getCurrentInstance();

const convertData = () => {
  console.log(currencyData, currencyData_1.value)
  return validator(currencyData) ? false : convert(currencyData, currencyData_1.value, currencyData_1.tag);
};

const reverseConvert = () => {
  const validation = validator(currencyData) ? false : isActive.value = !isActive.value;
  return validation ? reverse(currencyData, 'RUB') : convertData();
};

const selectChangeOne = (select) => {
  placeholderSelect.selectOne = `${select.tag} | ${select.name}`;
  currencyData_1.tag = select.tag;
  currencyData_1.value = select.value;
};

const selectChangeTwo = (select) => {
  placeholderSelect.selectTwo = `${select.tag} | ${select.name}`;
  currencyData.tag = select.tag;
  currencyData.value = select.value;
};

const currencyRender = async () => {
  try {
    const response = await CurrencyRender(proxy.$api);
    const array = response.data.Valute;

    options.value = Object.values(array).map((item) => ({
      tag: item.CharCode,
      name: item.Name,
      value: item.Value,
    }));
  } catch (error) {
    console.log(error);
  }
};

const course = async () => {
  await router.push("/course");
  result = "";
};

const backMenu = async () => {
  await router.push("/");
  result = "";
}

onMounted(() => {
  currencyRender();
});
</script>

<template>
  <article class="convert__currency">
    <CurrencyHeader/>
    <div class="convert__currency-wrapper">
      <div class="convert__currency-choice">
        <BaseSelect
          :option="options"
          :defaultValue="placeholderSelect.selectOne"
          @update:select="selectChangeOne"
        />
        <BaseButtonRevers @click="reverseConvert"/>
        <BaseSelect
          :option="options"
          :defaultValue="placeholderSelect.selectTwo"
          @update:select="selectChangeTwo"
        />
      </div>
      <BaseInput
        v-model="currencyData.inputValue"
        id="numberInput"
        name="numberInput"
        placeholder="Введите сумму"
      />
      <p class="convert__currency-output" v-if="result">{{result }}</p>
    </div>
    <div class="convert__currency-response">
      <BaseButton @click="backMenu">Назад</BaseButton>
      <BaseButton @click="convertData">Конвертировать</BaseButton>
      <BaseButton @click="course">Курс</BaseButton>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.convert__currency {
  display: flex;
  width: 100%;
  max-width: $max-widthForm;
  min-height: 337px;
  gap: 12px;
  background-color: white;
  padding: $padding-form;
  flex-direction: column;
  align-items: center;
  border-radius: $borderRadius-button;

  &-wrapper {
    display: grid;
    width: 100%;
    grid-template-columns: 2fr;
    gap: 15px;
  }

  &-response {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }

  &-choice {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }

  &-output {
    font-size: 1.3rem;
    text-align: center;

    @media screen and (max-width: 536px) {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 375px) {
    padding: 25px 25px 25px 25px;
  }

}
</style>
