<template>
  <v-container>
    <v-btn color="success" @click='displayAddQnDialog()'>Add Question</v-btn>
    <v-card>
      <v-card-text>
        <ol>
          <li v-for="(qn, key) in Object.keys(questions).length">
            {{questions[key].situationText}}
            <ul>
              <li v-for="ch in questions[key].choices.length">
                <v-list two-line>
                  <li>
                    Choice Text -> {{questions[key].choices[ch-1].choiceText}}
                  </li>
                  <li>
                    Comment -> {{questions[key].choices[ch-1].comment}}
                  </li>
                  <li>
                    Correct -> {{questions[key].choices[ch-1].correct}}
                  </li>
                  <li>
                    Impact -> {{questions[key].choices[ch-1].impact}}
                  </li>
                  <li>
                    Bonus -> {{questions[key].choices[ch-1].bonus}}
                  </li>
                </v-list>
              </li>
            </ul>
          </li>
        </ol>
      </v-card-text>
    </v-card>
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
              <v-select
                :items="choiceCorrect"
                v-model="choice1Correct"
                label="Choice1 Correct"
              ></v-select>
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
            <v-flex>
              <v-text-field v-model="choice1Bonus" 
                @blur="$v.choice1Bonus.$touch()"
                @change="$v.choice1Bonus.$touch()"
                :error-messages="choice1BonusErrors"
                required
                label="Choice1 Bonus">
              </v-text-field>
            </v-flex>
            <v-flex v-if="showSubChoice1">
              <v-toolbar color="success" height="10" />
              <v-layout column>
                <v-flex>
                  <v-text-field v-model="subchoice11" 
                    label="SubChoice1.1 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice11Correct"
                    label="SubChoice1.1 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice11Impact" 
                    label="SubChoice1.1 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice11Bonus" 
                    label="SubChoice1.1 Bonus">
                  </v-text-field>
                </v-flex>

                <v-toolbar color="success" height="10"/>
                <v-flex>
                  <v-text-field v-model="subchoice12" 
                    label="SubChoice1.2 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice12Correct"
                    label="SubChoice1.2 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice12Impact" 
                    label="SubChoice1.2 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice12Bonus" 
                    label="SubChoice1.2 Bonus">
                  </v-text-field>
                </v-flex>
                <v-toolbar color="success" height="10"/>
                <v-flex>
                  <v-text-field v-model="subchoice13" 
                    label="SubChoice1.3 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice13Correct"
                    label="SubChoice1.3 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice13Impact" 
                    label="SubChoice1.3 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice13Bonus" 
                    label="SubChoice1.3 Bonus">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-flex xs4>
                  <v-btn v-if="!showSubChoice1" color="success" @click="showSubChoice1 = true">Add Sub-Choice</v-btn>
                  <v-btn v-if="showSubChoice1" color="error" @click="showSubChoice1 = false">Remove Sub-Choice</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-toolbar color="primary" height="10" />
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
              <v-select
                :items="choiceCorrect"
                v-model="choice2Correct"
                label="Choice2 Correct"
              ></v-select>
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
              <v-text-field v-model="choice2Bonus" 
                @blur="$v.choice2Bonus.$touch()"
                @change="$v.choice2Bonus.$touch()"
                :error-messages="choice2BonusErrors"
                required
                label="Choice2 Bonus">
              </v-text-field>
            </v-flex>
            <v-flex v-if="showSubChoice2">
              <v-toolbar color="success" height="10" />
              <v-layout column>
                <v-flex>
                  <v-text-field v-model="subchoice21" 
                    label="SubChoice2.1 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice21Correct"
                    label="SubChoice2.1 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice21Impact" 
                    label="SubChoice2.1 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice21Bonus" 
                    label="SubChoice2.1 Bonus">
                  </v-text-field>
                </v-flex>
                <v-toolbar color="success" height="10"/>
                <v-flex>
                  <v-text-field v-model="subchoice22" 
                    label="SubChoice2.2 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice22Correct"
                    label="SubChoice2.2 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice22Impact" 
                    label="SubChoice2.2 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice22Bonus" 
                    label="SubChoice2.2 Bonus">
                  </v-text-field>
                </v-flex>
                <v-toolbar color="success" height="10"/>
                <v-flex>
                  <v-text-field v-model="subchoice23" 
                    label="SubChoice2.3 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice23Correct"
                    label="SubChoice2.3 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice23Impact" 
                    label="SubChoice2.3 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice23Bonus" 
                    label="SubChoice2.3 Bonus">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-flex xs4>
                  <v-btn v-if="!showSubChoice2" color="success" @click="showSubChoice2 = true">Add Sub-Choice</v-btn>
                  <v-btn v-if="showSubChoice2" color="error" @click="showSubChoice2 = false">Remove Sub-Choice</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-toolbar color="primary" height="10" />
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
              <v-select
                :items="choiceCorrect"
                v-model="choice3Correct"
                label="Choice3 Correct"
              ></v-select>
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
            <v-flex>
              <v-text-field v-model="choice3Bonus" 
                @blur="$v.choice3Bonus.$touch()"
                @change="$v.choice3Bonus.$touch()"
                :error-messages="choice3BonusErrors"
                required
                label="Choice3 Bonus">
              </v-text-field>
            </v-flex>
            <v-flex v-if="showSubChoice3">
              <v-toolbar color="success" height="10" />
              <v-layout column>
                <v-flex>
                  <v-text-field v-model="subchoice31" 
                    label="SubChoice3.1 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice31Correct"
                    label="SubChoice3.1 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice31Impact" 
                    label="SubChoice3.1 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice31Bonus" 
                    label="SubChoice3.1 Bonus">
                  </v-text-field>
                </v-flex>
                <v-toolbar color="success" height="10"/>
                <v-flex>
                  <v-text-field v-model="subchoice32" 
                    label="SubChoice3.2 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice32Correct"
                    label="SubChoice3.2 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice32Impact" 
                    label="SubChoice3.2 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice32Bonus" 
                    label="SubChoice3.2 Bonus">
                  </v-text-field>
                </v-flex>
                <v-toolbar color="success" height="10"/>
                <v-flex>
                  <v-text-field v-model="subchoice33" 
                    label="SubChoice3.3 Text">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="choiceCorrect"
                    v-model="subchoice33Correct"
                    label="SubChoice3.3 Correct"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice33Impact" 
                    label="SubChoice3.3 Impact">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subchoice33Bonus" 
                    label="SubChoice3.3 Bonus">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-flex xs4>
                  <v-btn v-if="!showSubChoice3" color="success" @click="showSubChoice3 = true">Add Sub-Choice</v-btn>
                  <v-btn v-if="showSubChoice3" color="error" @click="showSubChoice3 = false">Remove Sub-Choice</v-btn>
                </v-flex>
              </v-layout>
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
let module2 = require('./module2.js')
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
    choice1Bonus: { required },
    choice2Bonus: { required },
    choice3Bonus: { required }
  },
  data () {
    return {
      imageName: '',
      imageUrl: '',
      imageFile: '',
      questions: module2,
      addQnDialog: false,
      situationText: "",
      choice1: "",
      choice1Comment: "",
      choice1Correct: "",
      choice1Impact: "",
      choice1Bonus: "",
      choice2: "",
      choice2Comment: "",
      choice2Correct: "",
      choice2Impact: "",
      choice2Bonus: "",
      choice3: "",
      choice3Comment: "",
      choice3Correct: "",
      choice3Impact: "",
      choice3Bonus: "",
      subchoice11: "",
      subchoice11Correct: "",
      subchoice11Impact: "",
      subchoice11Bonus: "",
      subchoice12: "",
      subchoice12Correct: "",
      subchoice12Impact: "",
      subchoice12Bonus: "",
      subchoice13: "",
      subchoice13Correct: "",
      subchoice13Impact: "",
      subchoice13Bonus: "",
      subchoice21: "",
      subchoice21Correct: "",
      subchoice21Impact: "",
      subchoice21Bonus: "",
      subchoice22: "",
      subchoice22Correct: "",
      subchoice22Impact: "",
      subchoice22Bonus: "",
      subchoice23: "",
      subchoice23Correct: "",
      subchoice23Impact: "",
      subchoice23Bonus: "",
      subchoice31: "",
      subchoice31Correct: "",
      subchoice31Impact: "",
      subchoice31Bonus: "",
      subchoice32: "",
      subchoice32Correct: "",
      subchoice32Impact: "",
      subchoice32Bonus: "",
      subchoice33: "",
      subchoice33Correct: "",
      subchoice33Impact: "",
      subchoice33Bonus: "",
      choiceCorrect: ["yes", "no"],
      showSubChoice1: false,
      showSubChoice2: false,
      showSubChoice3: false
    }
  },
  methods: {
    displayAddQnDialog () {
      this.addQnDialog = true
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
					this.imageFile = files[0]
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
    saveQuestion () {
      let formData = new FormData()
      formData.append('situationText', this.situationText)
      formData.append('choice1', this.choice1)
      formData.append('choice1Comment', this.choice1Comment)
      formData.append('choice1Correct', this.choice1Correct)
      formData.append('choice1Impact', this.choice1Impact)
      formData.append('choice1Bonus', this.choice1Bonus)
      formData.append('choice2', this.choice2)
      formData.append('choice2Comment', this.choice2Comment)
      formData.append('choice2Correct', this.choice2Correct)
      formData.append('choice2Impact', this.choice2Impact)
      formData.append('choice2Bonus', this.choice2Bonus)
      formData.append('choice3', this.choice3)
      formData.append('choice3Comment', this.choice3Comment)
      formData.append('choice3Correct', this.choice3Correct)
      formData.append('choice3Impact', this.choice3Impact)
      formData.append('choice3Bonus', this.choice3Bonus)
      formData.append('subchoice11', this.subchoice11)
      formData.append('subchoice11Correct', this.subchoice11Correct)
      formData.append('subchoice11Impact', this.subchoice11Impact)
      formData.append('subchoice11Bonus', this.subchoice11Bonus)
      formData.append('subchoice12', this.subchoice12)
      formData.append('subchoice12Correct', this.subchoice12Correct)
      formData.append('subchoice12Impact', this.subchoice12Impact)
      formData.append('subchoice12Bonus', this.subchoice12Bonus)
      formData.append('subchoice13', this.subchoice13)
      formData.append('subchoice13Correct', this.subchoice13Correct)
      formData.append('subchoice13Impact', this.subchoice13Impact)
      formData.append('subchoice13Bonus', this.subchoice13Bonus)
      formData.append('subchoice21', this.subchoice21)
      formData.append('subchoice21Correct', this.subchoice21Correct)
      formData.append('subchoice21Impact', this.subchoice21Impact)
      formData.append('subchoice21Bonus', this.subchoice21Bonus)
      formData.append('subchoice22', this.subchoice22)
      formData.append('subchoice22Correct', this.subchoice22Correct)
      formData.append('subchoice22Impact', this.subchoice22Impact)
      formData.append('subchoice22Bonus', this.subchoice22Bonus)
      formData.append('subchoice23', this.subchoice23)
      formData.append('subchoice23Correct', this.subchoice23Correct)
      formData.append('subchoice23Impact', this.subchoice23Impact)
      formData.append('subchoice23Bonus', this.subchoice23Bonus)
      formData.append('subchoice31', this.subchoice31)
      formData.append('subchoice31Correct', this.subchoice31Correct)
      formData.append('subchoice31Impact', this.subchoice31Impact)
      formData.append('subchoice31Bonus', this.subchoice31Bonus)
      formData.append('subchoice32', this.subchoice32)
      formData.append('subchoice32Correct', this.subchoice32Correct)
      formData.append('subchoice32Impact', this.subchoice32Impact)
      formData.append('subchoice32Bonus', this.subchoice32Bonus)
      formData.append('subchoice33', this.subchoice33)
      formData.append('subchoice33Correct', this.subchoice33Correct)
      formData.append('subchoice33Impact', this.subchoice33Impact)
      formData.append('subchoice33Bonus', this.subchoice33Bonus)
      formData.append('image', this.imageFile)
      axios.post(backendServer + '/saveModule2Question/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        this.addQnDialog = false
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
      !this.$v.choice3Impact.required && errors.push('choice3 Impact is required')
      return errors
    },
    choice1BonusErrors () {
      const errors = []
      if (!this.$v.choice1Bonus.$dirty) return errors
      !this.$v.choice1Bonus.required && errors.push('choice1 Bonus is required')
      return errors
    },
    choice2BonusErrors () {
      const errors = []
      if (!this.$v.choice2Bonus.$dirty) return errors
      !this.$v.choice2Bonus.required && errors.push('choice2 Bonus is required')
      return errors
    },
    choice3BonusErrors () {
      const errors = []
      if (!this.$v.choice3Bonus.$dirty) return errors
      !this.$v.choice3Bonus.required && errors.push('choice3 Bonus is required')
      return errors
    }
  }
}
</script>
