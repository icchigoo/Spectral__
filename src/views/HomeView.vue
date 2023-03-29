<script>
// import AppAuth from './components/AppAuth.vue'
import AppDescription from '@/components/AppDescription.vue'
import AppMainContent from '@/components/AppMainContent.vue'
// import AppPlayer from './components/AppPlayer.vue'

export default {
  name: 'HomeView',
  components: {
    // AppAuth,
    AppDescription,
    AppMainContent
    // AppPlayer
  }
}
</script>

<template>
  <main>
    <!-- Introduction -->
    <app-description />

    <!-- Main Content -->
    <app-main-content />
  </main>
</template>
