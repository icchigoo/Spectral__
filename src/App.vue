<template>
  <!-- Header -->
  <app-header />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <!-- Player -->
  <app-player />

  <!-- Auth Modal -->
  <app-auth />
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppAuth from './components/AppAuth.vue'
import AppPlayer from './components/AppPlayer.vue'
import { mapWritableState } from 'pinia'
import UseUserStore from './stores/user'
import { auth } from './includes/firebase'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(UseUserStore, ['userLoggedIn'])
  },
  created() {
    console.log('From app.vue ' + auth.currentUser)
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.12s linear;
}
.fade-leave-to {
  transition: all 0.12s linear;
  opacity: 0;
}
</style>
