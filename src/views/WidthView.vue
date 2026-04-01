<script setup lang="ts">
import BaseSelect from "@/components/ui/BaseSelect.vue";
import MenuHeader from "@/components/menu/MenuHeader.vue";
import {reactive} from "vue";
import {unitsWidth} from "@/constants/unitsWidth";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import {useConvert} from "@/composable/useConvert.js";
import {useRouter} from "vue-router";

const selectsData = reactive([
  {
    label: 'Выберите валюту',
    tag: '',
    value: ''
  },
  {
    label: 'Выберите валюту',
    tag: '',
    inputValue: '',
    value: ''
  }
])

const {result, convert} = useConvert();

const router = useRouter();

const convertData = () => {
  return convert(selectsData[1], selectsData[0].value, selectsData[0].tag);
}

const backMenu = async () => {
  await router.push("/");
}

const widthChange = (index, value) => {
  console.log(index, value)
  selectsData[index].label = `${value.tag} | ${value.name}`;
  selectsData[index].tag = value.tag;
  selectsData[index].value = value.value;
}
</script>

<template>
  <article class="convert__width">
    <MenuHeader/>
    <div class="convert__width-wrapper">
      <div class="convert__width-choice">
        <BaseSelect :defaultValue="selectsData[0].label" :option="unitsWidth"
                    @update:select="args => widthChange(0, args)"/>
        <BaseSelect :defaultValue="selectsData[1].label" :option="unitsWidth"
                    @update:select="args => widthChange(1, args)"/>
        <BaseInput
          id="numberInput"
          name="numberInput"
          placeholder="Введите сумму"
          v-model="selectsData[1].inputValue"
        />
      </div>
      <p class="convert__width-output">{{ result }}</p>
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
