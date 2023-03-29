<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active-color"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <RouterLink class="px-2 text-white" to="/about">About</RouterLink>
          </li>
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a @click.prevent="toggleAuthModal()" class="px-2 text-white" href="#"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage">Manage</router-link>
              <a class="px-2 text-white" @click.prevent="signOut" href="#">Logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a href="" class="px-2 text-white" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores, mapActions } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  data() {
    return {}
  },
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLocale() {
      return this.$i18n.locale === 'ja' ? '日本語' : 'English'
    }
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    toggleAuthModal() {
      ;(this.modalStore.isOpen = !this.modalStore.isOpen), console.log(this.modalStore.isOpen)
    },
    signOut() {
      this.userStore.logout()
      // console.log(this.$route)
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' })
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'ja' ? 'en' : 'ja'
    }
  }
}
</script>
