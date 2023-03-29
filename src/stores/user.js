import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  getters: {},
  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        role: values.role
      })
      userCred.user.updateProfile({
        displayName: values.name
      })

      this.userLoggedIn = true
    },
    async authenticate(values) {
      let abc = await auth.signInWithEmailAndPassword(values.email, values.password)

      console.log('from userstore' + abc)
      this.userLoggedIn = true
    },
    async logout() {
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})
