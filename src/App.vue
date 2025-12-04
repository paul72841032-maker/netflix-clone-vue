<template>
  <div>
    <SiteHeader />
    <main class="container-nx py-8">
      <RouterView :key="$route.fullPath" v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
</script>

<style>
.fade-enter-from,.fade-leave-to{ opacity:0; transform: translateY(6px); }
.fade-enter-active,.fade-leave-active{ transition: all .22s ease; }
</style>
