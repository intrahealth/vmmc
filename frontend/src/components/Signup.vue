<template>
  <v-container>
    <v-layout
      row
      wrap
    >
      <v-spacer />
      <v-flex xs6>
        <v-alert
          style="width: 500px"
          v-model="alertSuccess"
          type="success"
          dismissible
          transition="scale-transition"
        >
          {{alertMsg}}
        </v-alert>
        <v-alert
          style="width: 500px"
          v-model="alertFail"
          type="error"
          dismissible
          transition="scale-transition"
        >
          {{alertMsg}}
        </v-alert>
        <v-card
          class="mx-auto"
          style="max-width: 500px;"
        >
          <v-system-bar
            color="deep-purple darken-4"
            dark
          />
          <v-toolbar
            color="deep-purple accent-4"
            cards
            dark
            flat
          >
            <v-card-title class="title font-weight-regular">Create Account</v-card-title>
          </v-toolbar>
          <v-form
            ref="form"
            class="pa-3 pt-4"
          >
            <v-text-field
              required
              @blur="$v.firstname.$touch()"
              @change="$v.firstname.$touch()"
              :error-messages="firstnameErrors"
              v-model="firstname"
              box
              color="deep-purple"
              label="First Name"
            />
            <v-text-field
              v-model="othername"
              box
              color="deep-purple"
              label="Middle Names"
            />
            <v-text-field
              required
              @blur="$v.surname.$touch()"
              @change="$v.surname.$touch()"
              :error-messages="surnameErrors"
              v-model="surname"
              box
              color="deep-purple"
              label="Surname"
            />
            <v-text-field
              required
              @blur="$v.organization.$touch()"
              @change="$v.organization.$touch()"
              :error-messages="organizationErrors"
              v-model="organization"
              box
              color="deep-purple"
              label="Organization"
            />
            <v-text-field
              required
              @blur="$v.username.$touch()"
              @change="$v.surname.$touch()"
              :error-messages="usernameErrors"
              v-model="username"
              box
              color="deep-purple"
              label="Username"
            />
            <v-text-field
              required
              @blur="$v.password.$touch()"
              @change="$v.password.$touch()"
              :error-messages="passwordErrors"
              v-model="password"
              type="password"
              box
              color="deep-purple"
              label="Password"
            />
            <v-text-field
              required
              @blur="$v.retype_password.$touch()"
              @change="$v.retype_password.$touch()"
              :error-messages="retype_passwordErrors"
              v-model="retype_password"
              type="password"
              box
              color="deep-purple"
              label="Re-type Password"
            />
          </v-form>
          <v-divider />
          <v-card-actions>
            <v-btn
              @click="$refs.form.reset()"
              color="primary"
              round
            >
              <v-icon>clear</v-icon>Clear
            </v-btn>
            <v-spacer />
            <v-btn
              @click="displayLogin"
              color="primary"
              round
            >
              <v-icon>lock</v-icon>Back To Login
            </v-btn>
            <v-spacer />
            <v-btn
              @click="signup()"
              :disabled="$v.$invalid"
              class="white--text"
              color="primary"
              depressed
              round
            >
              <v-icon left>how_to_reg</v-icon>Create Account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-spacer />
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import VueCookies from 'vue-cookies'
const config = require('../../config')
const isProduction = process.env.NODE_ENV === 'production'
const backendServer = (isProduction ? config.build.backend : config.dev.backend)

export default {
  validations: {
    username: { required },
    retype_password: { required },
    password: { required },
    firstname: { required },
    surname: { required },
    organization: { required }
  },
  data () {
    return {
      firstname: '',
      othername: '',
      surname: '',
      organization: '',
      username: '',
      password: '',
      retype_password: '',
      alertFail: false,
      alertSuccess: false,
      alertMsg: ''
    }
  },
  methods: {
    signup () {
      if (this.password !== this.retype_password) {
        this.$store.state.dialogError = true
        this.$store.state.errorTitle = 'Error'
        this.$store.state.errorDescription = 'Password mismatch'
      }
      this.$store.state.dynamicProgress = true
      this.$store.state.progressTitle = 'Creating Account'
      let formData = new FormData()
      formData.append('firstName', this.firstname)
      formData.append('otherName', this.othername)
      formData.append('password', this.password)
      formData.append('userName', this.username)
      formData.append('surname', this.surname)
      formData.append('organization', this.organization)
      axios
        .post(backendServer + '/addUser/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          this.firstname = ''
          this.othername = ''
          this.surname = ''
          this.password = ''
          this.username = ''
          this.organization = ''
          this.retype_password = ''
          this.$store.state.dynamicProgress = false
          this.alertSuccess = true
          this.alertMsg = 'Account created successfully'
        })
        .catch(err => {
          this.$store.state.dynamicProgress = false
          this.alertFail = true
          this.alertMsg = 'This account was not added, try different username'
          console.log(err.response.data.error)
        })
    },
    displayLogin () {
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    codeErrors () {
      const errors = []
      if (!this.$v.code.$dirty) return errors
      !this.$v.code.required && errors.push('Code is required')
      return errors
    },
    firstnameErrors () {
      const errors = []
      if (!this.$v.firstname.$dirty) return errors
      !this.$v.firstname.required && errors.push('First Name is required')
      return errors
    },
    surnameErrors () {
      const errors = []
      if (!this.$v.surname.$dirty) return errors
      !this.$v.surname.required && errors.push('Surname is required')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required')
      return errors
    },
    organizationErrors () {
      const errors = []
      if (!this.$v.organization.$dirty) return errors
      !this.$v.organization.required && errors.push('Organization is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    retype_passwordErrors () {
      const errors = []
      if (!this.$v.retype_password.$dirty) return errors
      !this.$v.retype_password.required && errors.push('Re-type Password')
      return errors
    }
  },
  created () {
    this.$store.state.signupFields = VueCookies.get('signupFields')
  }
}
</script>