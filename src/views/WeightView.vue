<script setup>
import BaseSelect from "@/components/ui/BaseSelect.vue";
import ConvertHeader from "@/components/ConvertHeader.vue";
import {reactive} from "vue";
import {unitsTime, unitsweight} from "@/constants/units.js";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import {useConvert} from "@/composable/useConvert.js";
import {useRouter} from "vue-router";
import {validator} from "@/utils/validator.js";

const selectsData = reactive([
  {
    label: 'Выберите еденицу массы',
    tag: '',
    value: ''
  },
  {
    label: 'Выберите единицу массы',
    tag: '',
    inputValue: '',
    value: ''
  }
])

const {result, convert} = useConvert();
const router = useRouter();

const convertData = () => {
  return validator(selectsData[0]) && validator(selectsData[1]) ? false : convert(selectsData[1],
    selectsData[0].value, selectsData[0].tag);
}

const backMenu = async () => {
  await router.push("/");
}

const weightChange = (index, value) => {
  selectsData[index].label = `${value.tag} | ${value.name}`;
  selectsData[index].tag = value.tag;
  selectsData[index].value = value.value;
}
</script>

<template>
  <article class="convert__weight">
    <ConvertHeader/>
    <div class="convert__weight-wrapper">
      <div class="convert__weight-choice">
        <BaseSelect :defaultValue="selectsData[0].label" :option="unitsweight"
                    @update:select="args => weightChange(0, args)"/>
        <BaseSelect :defaultValue="selectsData[1].label" :option="unitsweight"
                    @update:select="args => weightChange(1, args)"/>
        <BaseInput
          id="numberInput"
          name="numberInput"
          placeholder="Введите сумму"
          v-model="selectsData[1].inputValue"
        />
      </div>
      <p class="convert__weight-output" v-if="result">{{
          `${selectsData[1].inputValue} ${selectsData[0].tag} = ${result} ${selectsData[1].tag}`}}</p>
      <div class="convert__weight-response">
        <BaseButton @click="backMenu">Назад</BaseButton>
        <BaseButton @click="convertData">Конвертация</BaseButton>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.convert__weight {
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
