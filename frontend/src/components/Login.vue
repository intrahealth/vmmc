<template>
  <v-container>
    <center>
      <v-layout
        row
        wrap
      >
        <v-flex xs3></v-flex>
        <v-flex xs6>
          <v-alert
            type="error"
            :value="authStatus"
          >
            Authentication Failed
          </v-alert>
        </v-flex>
      </v-layout>
      <v-card
        width="430px"
        hover
      >
        <v-card-title primary-title>
          <v-toolbar
            color="primary"
            style="color: white"
          >
            <v-layout
              row
              wrap
            >
              <v-flex
                xs2
                text-xs-left
              >
                <v-icon
                  x-large
                  color="white"
                >lock</v-icon>
              </v-flex>
              <v-flex
                xs9
                text-xs-right
              >
                <b>Login</b>
              </v-flex>
            </v-layout>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            class="pa-3 pt-4"
          >
            <v-text-field
              required
              v-on:keyup.enter="authenticate()"
              @blur="$v.username.$touch()"
              @change="$v.username.$touch()"
              :error-messages="usernameErrors"
              v-model="username"
              box
              color="deep-purple"
              label="Username"
            />
            <v-text-field    
              required    
              v-on:keyup.enter="authenticate()"    
              @blur="$v.password.$touch()"    
              @change="$v.password.$touch()"    
              :error-messages="passwordErrors"    
              v-model="password"    
              box    
              type="password"    
              color="deep-purple"    
              label="Password"    
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-toolbar>
            <v-btn
              color="primary"
              round
              @click="displaySignup"
            >Signup</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              @click="authenticate()"
              :disabled="$v.$invalid"
              class="white--text"
              color="primary"
              round
              depressed
            >Login</v-btn>
          </v-toolbar>
        </v-card-actions>
      </v-card>
    </center>
  </v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { eventBus } from '../main'
const config = require('../../config')
const isProduction = process.env.NODE_ENV === 'production'
const backendServer = (isProduction ? config.build.backend : config.dev.backend)

export default {
  validations: {
    username: { required },
    password: { required }
  },
  data () {
    return {
      username: '',
      password: '',
      authStatus: false,
      signupEnabled: false
    }
  },
  methods: {
    authenticate () {
      let formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      axios
        .post(backendServer + '/authenticate/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(authResp => {
          this.$store.state.auth.token = authResp.data.token
          this.$store.state.auth.username = this.username
          this.$store.state.auth.userID = authResp.data.userID
          this.$store.state.auth.role = authResp.data.role
          this.$store.state.auth.role = authResp.data.role
          VueCookies.config('30d')
          VueCookies.set('token', this.$store.state.auth.token, 'infinity')
          VueCookies.set('userID', this.$store.state.auth.userID, 'infinity')
          VueCookies.set('role', this.$store.state.auth.role, 'infinity')
          VueCookies.set('username', this.$store.state.auth.username, 'infinity')
          if (!authResp.data.token) {
            this.authStatus = true
          } else {
            this.$router.push({ name: 'Home' })
          }
        })
        .catch(err => {
          if (err.hasOwnProperty('response')) {
            console.log(err.response.data.error)
          }
        })
    },
    displaySignup () {
      this.$router.push({ name: 'Signup' })
    }
  },
  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required')
      return errors;
    },
    passwordErrors () {    
      const errors = []    
      if (!this.$v.password.$dirty) return errors    
      !this.$v.password.required && errors.push('Password is required')    
      return errors
    }
  }
}
</script>

