<script setup>
import {ref, onMounted, reactive, getCurrentInstance} from "vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import {useConvert} from "@/composable/useConvert";
import {validator} from "@/utils/validator";
import {CurrencyRender} from "@/api/service/currencyRender";
import {useRouter} from "vue-router";
import ConvertHeader from "@/components/ConvertHeader.vue";

let {convert, result} = useConvert();

const currencyData = reactive([
  {value: "", label: "Выберите валюту", inputValue: "", tag: ""},
  {value: "", label: "Выберите валюту", inputValue: "", tag: ""}]);

const options = ref([]);
const {proxy} = getCurrentInstance();
const router = useRouter();

const convertData = () => {
  console.log(result)
  return validator(currencyData[1]) ? false : convert(currencyData[1], currencyData[0].value);
};

const selectChange = (index, value) => {
  currencyData[index].label = `${value.tag} | ${value.name}`;
  currencyData[index].tag = value.tag;
  currencyData[index].value = value.value;
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
    <ConvertHeader/>
    <div class="convert__currency-wrapper">
      <div class="convert__currency-choice">
        <BaseSelect
          :option="options"
          :defaultValue="currencyData[0].label"
          @update:select="args => selectChange(0, args)"
        />
        <BaseSelect
          :option="options"
          :defaultValue="currencyData[1].label"
          @update:select="args => selectChange(1, args)"
        />
      </div>
      <BaseInput
        v-model="currencyData[1].inputValue"
        id="numberInput"
        name="numberInput"
        placeholder="Введите сумму"
      />
      <p class="convert__currency-output" v-if="result">{{
          `${currencyData[1].inputValue} ${currencyData[0].tag} = ${result} ${currencyData[1].tag}`}}</p>
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
