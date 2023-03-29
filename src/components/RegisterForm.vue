<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_varient"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage name="age" class="text-red-600" />
    </div>
    <!-- Role -->
    <div class="mb-3">
      <label class="inline-block mb-2">Role</label>
      <vee-field
        as="select"
        name="role"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Listener">Listener</option>
        <option value="Artist">Artist</option>
      </vee-field>
      <ErrorMessage name="role" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="err in errors" :key="err">
          {{ err }}
        </div>
      </vee-field>
      <!-- <ErrorMessage name="password" class="text-red-600" /> -->
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage name="confirm_password" class="text-red-600" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">Nepal</option>
        <option value="Mexico">USA</option>
        <option value="Germany">India</option>
        <option value="Afganistan">UK</option>
      </vee-field>
      <ErrorMessage name="country" class="text-red-600" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="#">{{ $t('register.tos') }}</a>
      </i18n-t>
      <br /><ErrorMessage name="tos" class="text-red-600" />
    </div>
    <button
      :disabled="reg_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import UseUserStore from '@/stores/user'

export default {
  name: 'RegisterForm',
  data() {
    return {
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_varient: 'bg-blue-500',
      reg_alert_msg: 'Please wait. creating account',
      schema: {
        name: 'required|min:3|max:80|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'min_value:18',
        password: 'required|min:3|max:40|excluded:password',
        confirm_password: 'confirmed:@password',
        country: 'required|country_excluded:Afganistan',
        tos: 'tos',
        role: 'required'
      }
    }
  },
  props: {
    tab: String
  },
  methods: {
    ...mapActions(UseUserStore, {
      createUser: 'register'
    }),
    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_varient = 'bg-blue-500'
      this.reg_alert_msg = 'Please wait. creating account'

      try {
        await this.createUser(values)
      } catch (error) {
        this.reg_in_submission = true
        this.reg_alert_varient = 'bg-red-500'
        this.reg_alert_msg = error.message
        return
      }

      this.reg_alert_varient = 'bg-green-500'
      this.reg_alert_msg = 'Success! account created'
      window.location.reload()
      console.log(values)
    }
  }
}
</script>
