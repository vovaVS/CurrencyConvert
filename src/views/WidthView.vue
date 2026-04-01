<script setup>
import BaseSelect from "@/components/ui/BaseSelect.vue";
import MenuHeader from "@/components/menu/MenuHeader.vue";
import {reactive} from "vue";
import {unitsWidth} from "@/constains/unitsWidth";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import router from "@/router/index.js";
import {useConvert} from "@/composible/useConvert.js";

const onSelect = reactive({ label: 'Выберите валюту', tag: '', value: ''});
const twoSelect = reactive({label: 'Выберите валюту', tag: '', inputValue: '', value: ''});
const {result, convert} = useConvert();

const convertData = ()=>
{
  console.log(twoSelect.tag, onSelect.tag);
  return convert(twoSelect, onSelect.value, onSelect.tag);
}

const backMenu =  () => {
  router.push("/");
  console.log(router.push("/"))
}

const widthChangeOne = (value) =>
{
  onSelect.label = `${value.tag} | ${value.name}`;
  onSelect.tag= value.tag;
  onSelect.value= value.value;
}

const widthChangeTwo = (width) =>
{
  twoSelect.label = `${width.tag} | ${width.name}`;
  twoSelect.tag = width.tag;
  twoSelect.value = width.value;
}

</script>
<template>
  <article class="convert__width">
    <MenuHeader/>
    <div class="convert__width-wrapper">
      <div class="convert__width-choice">
        <BaseSelect :defaultValue="onSelect.label" :option="unitsWidth" @update:select="widthChangeOne"/>
        <BaseSelect :defaultValue="twoSelect.label" :option="unitsWidth" @update:select="widthChangeTwo"/>
        <BaseInput
          id="numberInput"
          name="numberInput"
          placeholder="Введите сумму"
          v-model="twoSelect.inputValue"
        />
      </div>
      <p class="convert__width-output">{{result}}</p>
      <div class="convert__width-response">
        <BaseButton @click="backMenu">Назад</BaseButton>
        <BaseButton @click="convertData">Конвертация</BaseButton>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.convert__width {
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
    grid-template-columns: 1fr;
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
    gap: 20px;
    flex-direction: column;
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
