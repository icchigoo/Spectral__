<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        v-if="show_alert"
        class="text-white text-center font-bold p-4 mb-4"
        :class="alert_varient"
      >
        {{ alert_message }}
      </div>
      <vee-form :validation-schema="itemSchema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
        </div>
        <ErrorMessage class="text-red-600" name="modified_name" />
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
        </div>
        <ErrorMessage class="text-red-600" name="genre" />
        <br />
        <button
          type="submit"
          :disabled="in_submission"
          class="py-1.5 px-3 rounded text-white bg-green-600"
        >
          Submit
        </button>
        <button
          type="button"
          :disabled="in_submission"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>
<script>
import { songsCollection, storage } from '../includes/firebase'

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    updateUnsavedFlag: {
      type: Function
    }
  },
  data() {
    return {
      showForm: false,
      itemSchema: {
        modified_name: 'required|min:3',
        genre: 'required|min:3|alpha_spaces'
      },
      in_submission: false,
      show_alert: false,
      alert_varient: 'bg-blue-500',
      alert_message: 'Please wait. Updating song info'
    }
  },
  methods: {
    async edit(values) {
      console.log('edited')
      this.in_submission = true
      this.show_alert = true
      this.alert_varient = 'bg-blue-500'
      this.alert_message = 'Please wait! Updating song info'

      try {
        await songsCollection.doc(this.song.docID).update(values)
      } catch (err) {
        this.in_submission = false
        this.alert_varient = 'bg-red-500'
        this.alert_message = 'Something went wrong.try again later'
        return
      }

      this.updateSong(this.index, values)
      this.updateUnsavedFlag(false)

      this.in_submission = false
      this.alert_varient = 'bg-green-500'
      this.alert_message = 'success!'
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/songs/${this.song.original_name}`)

      await songRef.delete()

      await songsCollection.doc(this.song.docID).delete()

      this.removeSong(this.index)
    }
  }
}
</script>
