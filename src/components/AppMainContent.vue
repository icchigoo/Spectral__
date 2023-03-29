<template>
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div
        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        v-icon.right.yellow="'headphones-alt'"
      >
        <!-- 'v-icon:full' to use an alternative class rather than the directives default -->
        <span class="card-title">Songs</span>
        <!-- Icon -->
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <app-song-item v-for="song in songs" :key="song.docID" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import AppSongItem from './SongItem.vue'
import { songsCollection } from '../includes/firebase'

export default {
  name: 'AppMainContent',
  components: {
    AppSongItem
  },
  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pending_request: false
    }
  },
  async created() {
    this.getSongs()

    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if (bottomOfWindow) {
        console.log('bottom of page')
        this.getSongs()
      }
    },
    async getSongs() {
      if (this.pending_request) {
        return
      }
      this.pending_request = true
      let snapshots
      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docID).get()
        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get()
      } else {
        snapshots = await songsCollection.orderBy('modified_name').limit(this.maxPerPage).get()
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data()
        })
      })
      this.pending_request = false
    }
  }
}
</script>
