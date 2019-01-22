<template>
	<v-container>
		<template v-if="$store.state.moduleProgress.two.status === 'completed'">
			<v-alert type="info" :value="true" style="text-align: justify">
				<b style="font-size: 24px">Congratulations</b>
				<p v-if="accummulatedPoints >= 13">
					The wound was covered with petroleum jelly impregnated gauze, then a sterile dry gauze was placed over this, secured by adhesive tape.  The surgical space is ready for the next patient.  Congratulations on a successful MC procedure!
				</p>
				<p v-else>
					The wound was covered with petroleum jelly impregnated gauze, then a sterile dry gauze was placed over this, secured by adhesive tape.  The surgical space is ready for the next patient.  Unfortunately, a few mistakes were made so this procedure cannot be considered a success.
				</p>
			</v-alert>
			<v-card color="cyan">
				<v-card-title style="color: white;font-weight: bold;font-size: 24px">
					Summary <v-spacer></v-spacer> <v-btn to='/'><v-icon left>home</v-icon>Home</v-btn>
				</v-card-title>
				<v-card-title primary-title>
					<v-container fluid grid-list-lg>
						<v-layout justify-start fill-height row wrap>
							<v-flex xs4 v-for="(answerTracker,qNumber) in answersTracker">
								<v-card hover>
									<v-card-title>
										<v-toolbar color="purple" style="color: white">
											Question {{qNumber}}
										</v-toolbar>
									</v-card-title>
									<v-card-text style="text-align: justify">
										<v-layout align-start fill-height column>
											<v-flex v-for="(answer,letter) in answerTracker">
												<template v-if="typeof answer === 'object'">
													{{letter}}: {{answer.parent}} (Pause)
													<template v-for="(subAnswer,subLetter) in answer">
														<label v-if="subLetter !== 'parent'">
															&nbsp;&nbsp;&nbsp;&nbsp; {{subLetter}}: {{subAnswer}}
														</label>
														<br>
													</template>
												</template>
												<template v-else>
													{{letter}}: {{answer}}
												</template>
											</v-flex>
										</v-layout>
									</v-card-text>
								</v-card>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-title>
			</v-card>
		</template>
		<template>
			<v-layout column>
				<v-flex>
					<v-toolbar color="#566573">
						<v-layout row wrap>
							<v-flex xs4 text-sm-left style="color:white">
								<b>MALE CIRCUMCISION CHALLENGE</b>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex xs1 text-sm-right style="color:white">
								<b>MODULE 2</b>
							</v-flex>
						</v-layout>
					</v-toolbar>
				</v-flex>
				<v-flex id="question" height="1" text-sm-left>
					<v-card class="scroll" height="400">
						<v-card-text>
							<v-layout column>
								<v-flex>
									<v-layout>
										<v-flex xs1>
											{{questionNumber}}
										</v-flex>
										<v-flex xs11 style="text-align:left">
											{{question}}
										</v-flex>
									</v-layout>
								</v-flex>
								<v-flex>
									<div id="answer">
										<v-layout column>
											<template v-for="(choice,index) in choices">
												<v-radio-group v-model="selectedParentChoice" @change="choiceSelected()">
													<label style="cursor: pointer;">
														<v-radio style="font-weight: bold;color: black" :ref="'choice' + index" :label="choice.choiceText" :value="index" color="red"></v-radio>
													</label>
												</v-radio-group>
                        <template v-if="choice.hasOwnProperty('choices') && showSubChoices" v-for="(pausedChoice,subIndex) in choice.choices">
                          <v-radio-group style="margin-left: 40px" v-model="selectedChildChoice">
                            <label style="cursor: pointer;">
                              <v-radio :disabled="radioDisabled" style="font-weight: bold;color: black" :ref="'subChoice' + subIndex" :label="pausedChoice.choiceText" :value="subIndex" color="red"></v-radio>
                            </label>
                          </v-radio-group>
                        </template>
											</template>
										</v-layout>
									</div>
								</v-flex>
							</v-layout>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<br><br>
			<v-layout row wrap>
				<v-flex height="100px" style="background-color: white">
					<v-layout row>
						<v-flex xs4 text-sm-left>
              <label @click="loadPrevQuestion()" style="cursor:pointer">
                <img src="../../assets/images/prev.png">
                BACK
              </label>
						</v-flex>
						<v-flex xs4 text-sm-center>
							<v-btn color="error" to='/'><v-icon left>cancel</v-icon>Exit Game</v-btn>
						</v-flex>
						<v-flex xs4 text-sm-right>
              <label @click="checkAnswer()" style="cursor:pointer">
                NEXT<img src="../../assets/images/next.png">
              </label>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</template>
	</v-container>
</template>

<script>
import moment from 'moment'
import { eventBus } from '../../main'
let module2 = require('../questions/module2.js')
export default {
	data () {
		return {
			radioDisabled: false,
			question: '',
			choices: [],
			answersTracker: {},
			selectedParentChoice: null,
			selectedChildChoice: null,
			subChoices: [],
			showSubChoices: false,
			gameRunning: false,
			nextQuestion: null,
			prevQuestion: null,
			questionNumber: 1,
			selectedChoice: {},
			selectedPausedChoice: {},
			selectedIndex: {},
			accummulatedPoints: 0,
			selectedAnswers: {},
			waitingPercent: 0,
			choiceLetters: [
				'A','B','C','D','E','F'
			],
			subChoicesLetters: [
				'I','II','III','IV','V','VI'
			]
		}
	},
	methods: {
		choiceSelected () {
			let selectedAnswer = this.selectedAnswers[this.questionNumber - 1]
			if (this.selectedParentChoice &&
        this.choices[this.selectedParentChoice].hasOwnProperty('choices') &&
        this.showSubChoices === false && !selectedAnswer) {
				this.showSubChoices = true
			} else if (!this.choices[this.selectedParentChoice].hasOwnProperty('choices') && this.showSubChoices === true) {
				this.selectedChildChoice = null
				this.showSubChoices = false
			}
			// if there was an answer already selected then reset back to that answer
			this.markSelected()
		},
		markSelected () {
			let selectedAnswer = this.selectedAnswers[this.questionNumber - 1]
			if (!selectedAnswer) {
				return
			}
			for (let choice in this.choices) {
				choice = parseInt(choice)
				if (selectedAnswer.parentChoice === choice) {
					setTimeout(() => {
						this.selectedParentChoice = choice
					}, 0);
					if (selectedAnswer.childChoice !== null) {
						this.selectedChildChoice = selectedAnswer.childChoice
						setTimeout(() => {
							this.showSubChoices = true
							this.radioDisabled = true
						}, 0);
					}
				}
			}
		},
		checkAnswer () {
			let selectedAnswer = this.selectedAnswers[this.questionNumber - 1]
			if (selectedAnswer) {
				this.loadNextQuestion()
				return
			}
			if (this.selectedParentChoice === null) {
				this.$store.state.dialogError = true
				this.$store.state.errorTitle = 'Error'
				this.$store.state.errorDescription = 'Select an answer to proceed'
				return
			} else if (this.choices[this.selectedParentChoice].hasOwnProperty('choices') && this.selectedChildChoice === null) {
					this.$store.state.dialogError = true
					this.$store.state.errorTitle = 'Error'
					this.$store.state.errorDescription = 'Select an answer for the sub-choices'
					return
			}	else {
				if (this.choices[this.selectedParentChoice].correct === 'no'
					|| (this.choices[this.selectedParentChoice].hasOwnProperty('choices') && this.choices[this.selectedParentChoice]['choices'][this.selectedChildChoice].correct === 'no')) {
					this.displayCorrectAnswer()
					this.trackAnswers('Wrong')

				} else {
					this.trackAnswers('Correct')
				}
				this.selectedAnswers[this.questionNumber - 1] = {}
				this.selectedAnswers[this.questionNumber - 1].parentChoice = this.selectedParentChoice
				if (this.choices[this.selectedParentChoice].hasOwnProperty('choices')) {
					this.selectedAnswers[this.questionNumber - 1].childChoice = this.selectedChildChoice
					this.accummulatedPoints += this.choices[this.selectedParentChoice]['choices'][this.selectedChildChoice].impact
					this.accummulatedPoints += this.choices[this.selectedParentChoice]['choices'][this.selectedChildChoice].bonus
				} else {
					this.accummulatedPoints += this.choices[this.selectedParentChoice].impact
					this.accummulatedPoints += this.choices[this.selectedParentChoice].bonus
					this.selectedAnswers[this.questionNumber - 1].childChoice = null
				}
				this.loadNextQuestion()
			}
		},
		displayCorrectAnswer () {
			let correctAnswer
			for (let choice of this.choices) {
				if (choice.correct === 'yes') {
					if (correctAnswer) {
						correctAnswer += '<br> <b>OR</b> <br>' + choice.choiceText
					} else {
						correctAnswer = choice.choiceText
					}
					if (choice.hasOwnProperty('choices')) {
						let subCorrectAnswer
						for (let subChoice of choice.choices) {
							if (subChoice.correct === 'yes') {
								if (subCorrectAnswer) {
									subCorrectAnswer += '<br><p style="margin-left: 30px;text-align: justify"><b>OR</b></p> <br><p style="margin-left: 30px;text-align: justify">' + subChoice.choiceText + '</p>'
								} else {
									subCorrectAnswer = '<br><p style="margin-left: 30px;text-align: justify">' + subChoice.choiceText + '</p>'
								}
							}
						}
						correctAnswer += subCorrectAnswer
					}
				}
			}

			this.$store.state.dialogError = true
			this.$store.state.errorTitle = 'That is not correct,below is the correct answer'
			this.$store.state.errorDescription = correctAnswer
		},
		trackAnswers () {
			let choiceCorrectness = 'Correct'
			let subChoiceCorrectness = 'Correct'
			if (this.choices[this.selectedParentChoice].correct === 'no') {
				choiceCorrectness = 'Wrong'
			}
			if (this.choices[this.selectedParentChoice].hasOwnProperty('choices') && this.choices[this.selectedParentChoice]['choices'][this.selectedChildChoice].correct === 'no') {
				subChoiceCorrectness = 'Wrong'
			}
			if (!this.answersTracker.hasOwnProperty(this.questionNumber)) {
				this.answersTracker[this.questionNumber] = {}
			}
			let choiceLetter = this.choiceLetters[this.selectedParentChoice]
			if (this.selectedChildChoice === null) {
				this.answersTracker[this.questionNumber][choiceLetter] = choiceCorrectness
			}
			
			if (this.selectedChildChoice !== null) {
				let subChoiceLetter = this.subChoicesLetters[this.selectedChildChoice]
				if (!this.answersTracker[this.questionNumber].hasOwnProperty(choiceLetter)) {
					this.answersTracker[this.questionNumber][choiceLetter] = {}
				}
				this.answersTracker[this.questionNumber][choiceLetter]['parent'] = choiceCorrectness
				this.answersTracker[this.questionNumber][choiceLetter][subChoiceLetter] = subChoiceCorrectness
			}
		},
		loadPrevQuestion () {
			if (this.prevQuestion === null) {
				return
			}
			if (this.questionNumber > 1) {
				this.questionNumber--
			}
			this.selectedParentChoice = null
			this.selectedChildChoice = null
			this.showSubChoices = false
			this.radioDisabled = false
			this.question = module2[this.prevQuestion].situationText
			this.choices = module2[this.prevQuestion].choices
			this.nextQuestion = module2[this.prevQuestion].nextMove
			this.prevQuestion = module2[this.prevQuestion].prevMove
			this.markSelected()
		},
		loadNextQuestion () {
			if (this.gameRunning === false) {
				this.nextQuestion = 0
				this.gameRunning = true
			} else {
				this.questionNumber++
			}
			if (this.nextQuestion === null) {
				this.$store.state.moduleProgress.two.status = 'completed'
				this.questionNumber--
				this.markSelected()
				return
			}
			this.selectedParentChoice = null
			this.selectedChildChoice = null
			this.showSubChoices = false
			this.radioDisabled = false
			this.question = module2[this.nextQuestion].situationText
			this.choices = module2[this.nextQuestion].choices
			this.prevQuestion = module2[this.nextQuestion].prevMove
			this.nextQuestion = module2[this.nextQuestion].nextMove
			this.markSelected()
		}
	},
	created: function () {
		this.loadNextQuestion()
		this.$store.state.moduleProgress.two.status = 'pending'
	}
}
</script>

<style scoped>
#question {
  padding: 20px 0px 20px;
}
#answer {
	padding: 0px 70px;
}
.scroll {
  overflow-y: auto;
}
</style>
