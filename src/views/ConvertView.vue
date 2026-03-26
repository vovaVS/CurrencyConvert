<script setup>
import { ref, onMounted, reactive } from "vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import ConvertHeader from "@/components/convert/ConvertHeader.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseButtonRevers from "@/components/convert/BaseButtonRevers.vue";
import { CurrencyRender } from "@/api/Service/CurrencyService";
import { useCurrencyStore } from "@/stores/CurrencyStore";
import { validator } from "@/utils/validator";
import router from "@/router";

const useCurrency = useCurrencyStore();
const emit = defineEmits(["select", "inputContent"]);
const currencyData = reactive({ value: "Выберите валюту", price: 0, inputValue: 0, tag: "" });
const options = ref([]);
const isActive = ref(false);

const handleConvert = () => {
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
  useCurrency.convert(currencyData.inputValue, currencyData.price, currencyData.tag);
};

const selectChange = (select) => {
  currencyData.value = select.name;
  currencyData.tag = select.tag;
  currencyData.price = select.price;

  emit("select", select);
};

const inputChange = (value) => {
  currencyData.inputValue = value;
  emit("inputContent", value);
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

onMounted(() => {
  currencyRender();
});
</script>

<template>
  <article class="convert">
    <ConvertHeader />
    <div class="convert__wrapper">
      <div class="convert__choice">
        <BaseSelect :option="options" :default_value="currencyData.value" @select="selectChange" />
        <BaseButtonRevers @click="reverseConvert" />
      </div>
      <BaseInput @input-content="inputChange" v-model="currencyData.inputValue" />
      <p class="convert__output" v-if="useCurrency.result">{{ useCurrency.result }}</p>
    </div>
    <div class="convert__response">
      <BaseButton @click="handleConvert">Конвертация</BaseButton>
      <BaseButton @click="router.push('/cours')">Курс</BaseButton>
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
  padding: 32px 32px 0px 32px;
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
    padding: 32px;
    gap: 20px;
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
    &__response {
      padding: 25px 0 25px 0;
    }
  }
}

</style>
