<script setup>
import BaseSelect from "@/components/ui/BaseSelect.vue";
import ConvertHeader from "@/components/ConvertHeader.vue";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import BaseButton from "@/components/ui/BaseButton.vue";

const menu = reactive([
  {name: 'Валюту', path: '/currency'},
  {name: 'Длину', path: '/width'},
  {name: 'Время', path: '/time'},
  {name: 'Массу', path: '/weight'}]);

const router = useRouter();
const isActive = ref(true);
const defaultValue = ref("Что будем конвертировать?");
const menuData = reactive({path: ''});

const pathNavigation = (value) =>
{
  menuData.path = value.path;
  router.push(menuData.path)
}

const close = () => {
  isActive.value = false;
  console.log(isActive.value)
}
</script>

<template>
    <article class="convert" v-if="isActive">
      <ConvertHeader/>
      <div class="convert__wrapper">
        <div class="convert__choice">
          <BaseSelect :defaultValue="defaultValue" :option="menu" @update:select="pathNavigation" @cancel="isActive"/>
        </div>
      </div>
      <BaseButton @click="close">Закрыть</BaseButton>
    </article>
</template>

  <style scoped lang="scss">
    @use "@/assets/styles/variables" as *;

    .convert {
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

      &__wrapper {
        display: grid;
        width: 100%;
        grid-template-columns: 2fr;
        gap: 15px;
        padding-bottom: 70px;
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

        @media screen and (max-width: 536px) {
          font-size: 1rem;
        }
      }

      @media screen and (max-width: 375px) {
        padding: 25px 25px 25px 25px;
      }

    }
  </style>

