<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="convert__form-transition" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>
