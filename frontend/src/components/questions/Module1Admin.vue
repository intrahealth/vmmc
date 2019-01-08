<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="(item,i) in clients.length"
        :key="i"
      >
        <div slot="header">{{clients[item-1]}}</div>
        <v-btn color="success" @click='displayAddQnDialog(clients[item-1])'>Add Question</v-btn>
        <v-card>
          <v-card-text>
            <ol>
              <li v-for="(qn, key) in Object.keys(questions[clients[item-1]]).length">
                {{questions[clients[item-1]][key].situationText}}
                <ul>
                  <li v-for="ch in questions[clients[item-1]][key].choices.length">
                    <v-list two-line>
                      <li>
                        Choice Text -> {{questions[clients[item-1]][key].choices[ch-1].choiceText}}
                      </li>
                      <li>
                        Comment -> {{questions[clients[item-1]][key].choices[ch-1].comment}}
                      </li>
                      <li>
                        Impact -> {{questions[clients[item-1]][key].choices[ch-1].impact}}
                      </li>
                    </v-list>
                  </li>
                </ul>
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-dialog persistent v-model="addQnDialog" transition="scale-transition" max-width="560px" max-height="647px">
      <v-card >
        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            Add Question
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon @click="addQnDialog = false">close</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-layout column>
            <v-flex>
              <v-text-field v-model="situationText" 
                @blur="$v.situationText.$touch()"
                @change="$v.situationText.$touch()"
                :error-messages="situationTextErrors"
                required
                label="Question Text">
              </v-text-field>
            </v-flex>
            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <img :src="imageUrl" height="150" v-if="imageUrl"/>
              <v-text-field label="Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
            </v-flex>
            <v-flex>
              <v-text-field v-model="choice1" 
                @blur="$v.choice1.$touch()"
                @change="$v.choice1.$touch()"
                :error-messages="choice1Errors"
                required
                label="Choice1 Text">
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="choice1Comment" 
                @blur="$v.choice1Comment.$touch()"
                @change="$v.choice1Comment.$touch()"
                :error-messages="choice1CommentErrors"
                required
                label="Choice1 Comment">
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="choice1Impact" 
                @blur="$v.choice1Impact.$touch()"
                @change="$v.choice1Impact.$touch()"
                :error-messages="choice1ImpactErrors"
                required
                label="Choice1 Impact">
              </v-text-field>
            </v-flex>
            <v-divider></v-divider>
            <v-flex>
              <v-text-field v-model="choice2" 
                @blur="$v.choice2.$touch()"
                @change="$v.choice2.$touch()"
                :error-messages="choice2Errors"
                required
                label="choice2 Text">
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="choice2Comment" 
                @blur="$v.choice2Comment.$touch()"
                @change="$v.choice2Comment.$touch()"
                :error-messages="choice2CommentErrors"
                required
                label="choice2 Comment">
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="choice2Impact" 
                @blur="$v.choice2Impact.$touch()"
                @change="$v.choice2Impact.$touch()"
                :error-messages="choice2ImpactErrors"
                required
                label="choice2 Impact">
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="choice3" 
                @blur="$v.choice3.$touch()"
                @change="$v.choice3.$touch()"
                :error-messages="choice3Errors"
                required
                label="choice3 Text">
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="choice3Comment" 
                @blur="$v.choice3Comment.$touch()"
                @change="$v.choice3Comment.$touch()"
                :error-messages="choice3CommentErrors"
                required
                label="choice3 Comment">
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="choice3Impact" 
                @blur="$v.choice3Impact.$touch()"
                @change="$v.choice3Impact.$touch()"
                :error-messages="choice3ImpactErrors"
                required
                label="choice3 Impact">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        
        <v-toolbar color="brown lighten-6">
          <v-btn color="error" @click.native="addQnDialog = false"><v-icon left>cancel</v-icon> Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="$v.$invalid" dark @click="saveQuestion"><v-icon left>save</v-icon>Save Question</v-btn>
          <v-btn color="primary" @click="saveQuestion"><v-icon left>save</v-icon>Save Question</v-btn>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
let module1 = require('./module1.js')
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
const config = require('../../../config')
const isProduction = process.env.NODE_ENV === 'production'
const backendServer = (isProduction ? config.build.backend : config.dev.backend)
export default {
  validations: {
    situationText: { required },
    choice1: { required },
    choice1Comment: { required },
    choice1Impact: { required },
    choice2: { required },
    choice2Comment: { required },
    choice2Impact: { required },
    choice3: { required },
    choice3Comment: { required },
    choice3Impact: { required },
  },
  data () {
    return {
      imageName: '',
      imageUrl: '',
      imageFile: '',
      clients: Object.keys(module1),
      questions: module1,
      addQnDialog: false,
      situationText: "",
      choice1: "",
      choice1Comment: "",
      choice1Impact: "",
      choice2: "",
      choice2Comment: "",
      choice2Impact: "",
      choice3: "",
      choice3Comment: "",
      choice3Impact: "",
      activeClient: "",
    }
  },
  methods: {
    displayAddQnDialog (client) {
      this.addQnDialog = true
      this.activeClient = client
    },
    pickFile () {
      this.$refs.image.click ()
    },
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
    saveQuestion () {
      let formData = new FormData()
      formData.append('client', this.activeClient)
      formData.append('situationText', this.situationText)
      formData.append('choice1', this.choice1)
      formData.append('choice1Comment', this.choice1Comment)
      formData.append('choice1Impact', this.choice1Impact)
      formData.append('choice2', this.choice2)
      formData.append('choice2Comment', this.choice2Comment)
      formData.append('choice2Impact', this.choice2Impact)
      formData.append('choice3', this.choice3)
      formData.append('choice3Comment', this.choice3Comment)
      formData.append('choice3Impact', this.choice3Impact)
      formData.append('image', this.imageFile)
      axios.post(backendServer + '/saveModule2Question/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        // this.addQnDialog = false
      })
    }
  },
  computed: {
    situationTextErrors () {
      const errors = []
      if (!this.$v.situationText.$dirty) return errors
      !this.$v.situationText.required && errors.push('situation Text is required')
      return errors
    },
    choice1Errors () {
      const errors = []
      if (!this.$v.choice1.$dirty) return errors
      !this.$v.choice1.required && errors.push('choice1 Text is required')
      return errors
    },
    choice1CommentErrors () {
      const errors = []
      if (!this.$v.choice1Comment.$dirty) return errors
      !this.$v.choice1Comment.required && errors.push('situation Text is required')
      return errors
    },
    choice1ImpactErrors () {
      const errors = []
      if (!this.$v.choice1Impact.$dirty) return errors
      !this.$v.choice1Impact.required && errors.push('Choice1 Impact Text is required')
      if(parseInt(this.choice1Impact) !== 0) {
        if(this.choice1Impact[0] !== undefined) {
          if (this.choice1Impact[0] !== "-" && this.choice1Impact[0] !== "+") {
            errors.push("Impact must start with + or -")
          }
          else if(!Number.isInteger(parseInt(this.choice1Impact[1]))) {
            errors.push("Impact must be a number")
          }
        }
      }
      return errors
    },
    choice2Errors () {
      const errors = []
      if (!this.$v.choice2.$dirty) return errors
      !this.$v.choice2.required && errors.push('choice2 Text is required')
      return errors
    },
    choice2CommentErrors () {
      const errors = []
      if (!this.$v.choice2Comment.$dirty) return errors
      !this.$v.choice2Comment.required && errors.push('situation Text is required')
      return errors
    },
    choice2ImpactErrors () {
      const errors = []
      if (!this.$v.choice2Impact.$dirty) return errors
      !this.$v.choice2Impact.required && errors.push('choice2 Impact Text is required')
      return errors
    },
    choice3Errors () {
      const errors = []
      if (!this.$v.choice3.$dirty) return errors
      !this.$v.choice3.required && errors.push('choice3 Text is required')
      return errors
    },
    choice3CommentErrors () {
      const errors = []
      if (!this.$v.choice3Comment.$dirty) return errors
      !this.$v.choice3Comment.required && errors.push('situation Text is required')
      return errors
    },
    choice3ImpactErrors () {
      const errors = []
      if (!this.$v.choice3Impact.$dirty) return errors
      !this.$v.choice3Impact.required && errors.push('choice3 Impact Text is required')
      return errors
    }
  }
}
</script>
