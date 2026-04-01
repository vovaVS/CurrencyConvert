<script setup>
import BaseSelect from "@/components/ui/BaseSelect.vue";
import MenuHeader from "@/components/menu/MenuHeader.vue";
import {reactive, ref} from "vue";
import router from "@/router/index";
import BaseButton from "@/components/ui/BaseButton.vue";

const defaultValue = ref("Что будем конвертировать....дружок?");
const menu = reactive([
  {name: 'Валюта', path: '/currency'},
  {name: 'Длина', path: '/width'},
  {name: 'Время', path: '/time'},
  {name: 'Масса', path: '/weigth'}]);

const menuData = reactive({path: ''});

const pathNavigation = (value) =>
{
  menuData.path = value.path;
  router.push(menuData.path)
}
</script>

<template>
    <article class="convert">
      <MenuHeader/>
      <div class="convert__wrapper">
        <div class="convert__choice">
          <BaseSelect :defaultValue="defaultValue" :option="menu" @update:select="pathNavigation"/>
        </div>
      </div>
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

