<template>
	<v-container>
		<template v-if="$store.state.moduleProgress.completed == true">
			<v-alert type="info" :value="true">
				<b>Congratulations</b>
				<p>
					You have Completed Module 1
				</p>
			</v-alert>
		</template>
		<template v-else>
			<v-layout column>
				<v-flex>
					<v-toolbar color="#566573">
						<v-layout row wrap>
							<v-flex xs4 text-sm-left style="color:white">
								<b>MALE CIRCUMCISION CHALLENGE</b>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex xs1 text-sm-right style="color:white">
								<b>MODULE {{$store.state.moduleProgress.module}}</b>
							</v-flex>
						</v-layout>
					</v-toolbar>
				</v-flex>
				<v-flex id='moduleIntro'>
					Module 1 presents three preoperative counseling scenarios with hypothetical clients.  Make choices about how you counsel certain clients, and try to end the counseling session with a well-informed client who agrees to undergo circumcision.
				</v-flex>
				<v-flex id="question" v-if='loadingNextClient'>
					{{client | formatClient}} Comming Now<v-progress-linear v-model="waitingPercent" color="primary" class="mb-0"></v-progress-linear>
				</v-flex>
				<v-flex id="question" height="1" v-else text-sm-left>
					<b>{{client | formatClient}}</b>
					<v-card class="scroll" height="200">
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
												<v-radio-group>
													<label style="cursor: pointer;" @click="choiceSelected(index)">
														<v-radio :key="index" style="font-weight: bold;color: black" :label="choice.choiceText" :value="index" :ref='index' color="red"></v-radio>
													</label>
												</v-radio-group>
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
				<v-flex height="500px" style="background-color: white">
					<v-layout row>
						<v-flex xs4 text-sm-left style="margin-top:140px">
							<label @click="loadPrevQuestion()" style="cursor:pointer"><v-icon>fast_rewind</v-icon>BACK</label>
						</v-flex>
						<v-flex xs4>
							<div class="meter_box" style="height:170px;width:450px"></div>
							<div :class="[moodClass, 'meter_arrow']" style="height:85px;width:400px"></div>
						</v-flex>
						<v-flex xs4 text-sm-right style="margin-top:140px">
							<label style="cursor:pointer" @click="checkAnswer()"><v-icon>fast_forward</v-icon>NEXT</label>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout column>
				<v-flex>
					<v-toolbar color="primary">
						<v-layout row wrap>
							<v-flex xs4 style="color: white" text-sm-left>
								Client A: <label class='clientMoodStatus'>{{clientsMood.clientA}}</label>
							</v-flex>
							<v-flex xs4 style="color: white" text-xs-center v-if='clientsMood.clientB'>
								Client B: <label class='clientMoodStatus'>{{clientsMood.clientB}}</label>
							</v-flex>
							<v-flex xs4 style="color: white" text-sm-right v-if='clientsMood.clientC'>
								Client C: <label class='clientMoodStatus'>{{clientsMood.clientC}}</label>
							</v-flex>
						</v-layout>
					</v-toolbar>
				</v-flex>
				<v-flex>
					<flip-countdown :deadline="countDown"></flip-countdown>
				</v-flex>
			</v-layout>
		</template>
	</v-container>
</template>

<script>
import moment from 'moment'
import { eventBus } from "../../main";
import { module1 } from "../modules/module1.js";
import FlipCountdown from 'vue2-flip-countdown'
export default {
  data () {
    return {
			gameDuration: 20,
			countDown: '',
      question: "",
      choices: [],
      gameRunning: false,
      nextQuestion: null,
      prevQuestion: null,
      client: "",
      questionNumber: 1,
      selectedChoice: {},
      selectedIndex: "",
      accummulatedPoints: 0,
      selectedAnswers: {
        clientA: {},
        clientB: {},
        clientC: {}
			},
			clientsMood: {
				clientA: null,
				clientB: null,
				clientC: null
			},
			loadingNextClient: false,
			waitingPercent: 0,
      mood: "interested",
      moodClass: "meter_arrow_interested",
      moods: ["unhappy", "unsure", "neutral", "interested", "satisfied"]
    };
	},
	filters: {
		formatClient (client) {
			if (!client) {
				return client
			}
			let cltArr = client.split('client')
			if (cltArr.length === 2) {
				return 'Client ' + cltArr[1]
			}
			return client
		}
	},
  methods: {
    choiceSelected(index) {
			//ensure that an answer is not changed
      if (this.selectedAnswers[this.client].hasOwnProperty([this.questionNumber - 1])) {
        index = this.selectedAnswers[this.client][this.questionNumber - 1];
			}
      this.selectedChoice = this.choices[index];
			this.selectedIndex = index;
			this.$refs[index][0].isActive = true
      for (let k in this.choices) {
        k = parseInt(k);
        if (k === index) {
          continue;
				}
				this.$refs[k][0].isActive = false
      }
    },
    changeMood(marks) {
      let moodIndex = this.moods.indexOf(this.mood);
      moodIndex += marks;
      if (this.moods[moodIndex] === undefined) {
        if (moodIndex <= 0) {
          this.mood = "unhappy";
        } else {
          this.mood = "satisfied";
        }
      } else {
        this.mood = this.moods[moodIndex];
      }
      if (this.mood === "satisfied") {
				this.clientsMood[this.client] = 'Satisfied'
        this.moodClass = "meter_arrow_satisfied";
      } else if (this.mood === "interested") {
				this.clientsMood[this.client] = 'Interested'
        this.moodClass = "meter_arrow_interested";
      } else if (this.mood === "neutral") {
				this.clientsMood[this.client] = 'Neutral'
        this.moodClass = "meter_arrow_neutral";
      } else if (this.mood === "unsure") {
				this.clientsMood[this.client] = 'Unsure'
        this.moodClass = "meter_arrow_unsure";
      } else if (this.mood === "unhappy") {
				this.clientsMood[this.client] = 'Unhappy'
        this.moodClass = "meter_arrow_unhappy";
      }
    },
    checkAnswer() {
      if (Object.keys(this.selectedChoice).length === 0) {
        this.$store.state.dialogError = true;
        this.$store.state.errorTitle = "Error";
        this.$store.state.errorDescription = "Select an answer to proceed";
        return;
      }
      if (!this.selectedAnswers[this.client].hasOwnProperty([this.questionNumber - 1])) {
        this.selectedAnswers[this.client][this.questionNumber - 1] = this.selectedIndex;
        let marks = parseInt(this.selectedChoice.impact);
        this.accummulatedPoints += marks;
        this.changeMood(marks);
      }
      this.selectedChoice = {};
      this.loadNextQuestion();
    },
    loadPrevQuestion() {
      if (this.prevQuestion === null) {
        return;
      }
      if (this.prevQuestion === "clientA" || this.prevQuestion === "clientB") {
        this.client = this.prevQuestion;
        this.prevQuestion = last(Object.keys(module1[this.client]));
        this.questionNumber = this.prevQuestion++;
      } else {
        this.questionNumber--;
      }
      this.question = module1[this.client][this.prevQuestion].situationText;
      this.choices = module1[this.client][this.prevQuestion].choices;
      this.nextQuestion = module1[this.client][this.prevQuestion].nextMove;
      this.prevQuestion = module1[this.client][this.prevQuestion].prevMove;
      if (
        this.selectedAnswers[this.client].hasOwnProperty([this.questionNumber - 1])
      ) {
        this.choiceSelected(this.selectedAnswers[this.client][this.questionNumber - 1]);
      }
    },
    loadNextQuestion() {
      if (!this.gameRunning || this.nextQuestion === "clientB" || this.nextQuestion === "clientC") {
        this.questionNumber = 1;
        if (!this.gameRunning) {
          this.client = "clientA";
          this.gameRunning = true;
        } else {
					this.client = this.nextQuestion;
					this.mood = 'interested'
					this.loadingNextClient = true
					let intervalObj = setInterval (()=>{
						console.log (this.waitingPercent)
						this.waitingPercent++
						if (this.waitingPercent === 100) {
							this.loadingNextClient = false
							this.changeMood(0);
							clearInterval(intervalObj)
							this.waitingPercent = 0
						}
					},100)
				}
				this.clientsMood[this.client] = 'Interested'
				this.nextQuestion = 0;
      } else {
        this.questionNumber++;
      }

      if (this.nextQuestion === null) {
        this.$store.state.moduleProgress.completed = true;
        this.$store.state.moduleProgress.module = 1;
        this.prevQuestion = module1[this.client][this.nextQuestion].prevMove;
      } else if (module1[this.client].hasOwnProperty(this.nextQuestion)) {
        this.question = module1[this.client][this.nextQuestion].situationText;
        this.choices = module1[this.client][this.nextQuestion].choices;
        this.prevQuestion = module1[this.client][this.nextQuestion].prevMove;
        this.nextQuestion = module1[this.client][this.nextQuestion].nextMove;
      }

      // if an answer exist then highligh the answer
      if (
        this.selectedAnswers[this.client].hasOwnProperty([
          this.questionNumber - 1
        ])
      ) {
        this.choiceSelected(this.selectedAnswers[this.client][this.questionNumber - 1]);
      }
      for (let k in this.choices) {
        k = parseInt(k);
        if (this.$refs[k] === undefined || this.selectedAnswers[this.client][this.questionNumber - 1] === k) {
          continue;
        }
        this.$refs[k][0].isActive = false;
      }
    }
  },
  created: function() {
		this.loadNextQuestion();
		this.countDown = moment().add(this.gameDuration,'minutes').format('YYYY-MM-DD HH:mm:ss');
	},
	components: {
		FlipCountdown
	}
};
</script>

<style scoped>
#question {
  padding: 20px 0px 20px;
}
#answer {
	padding: 0px 70px;
}
#moduleIntro {
	padding: 20px 0px 0px 0px;
}
.choices {
  cursor: pointer;
  padding: 10px;
  border-radius: 20px;
  margin: 10px;
  background-color: #7ce5f8;
  text-align: left;
}
.choices:hover {
  background-color: #3ead68;
  color: white;
}
.selectedChoice {
  background-color: #3ead68;
  cursor: pointer;
  padding: 10px;
  border-radius: 20px;
  margin: 10px;
  color: white;
  text-align: left;
}
.clientMoodStatus {
  font-weight: bold;
}
.scroll {
  overflow-y: auto;
}
.meter_box {
  position: relative;
  background-image: url("../../assets/images/meter_box.png");
  width: 1000;
  height: 800;
  right: 100px;
}
.meter_arrow {
  display: inline-block;
  position: relative;
  background: url("../../assets/images/meter_arrow.png") no-repeat;
}
.meter_arrow_satisfied {
  bottom: -30px;
  left: 90px;
  transform: rotate(38deg);
}
.meter_arrow_interested {
  bottom: 90px;
  left: 100px;
  transform: rotate(-5deg);
}
.meter_arrow_neutral {
  bottom: 200px;
  left: 24px;
  transform: rotate(-49deg);
}
.meter_arrow_unsure {
  bottom: 234px;
  left: -117px;
  transform: rotate(-103deg);
}
.meter_arrow_unhappy {
  bottom: 170px;
  left: -230px;
  transform: rotate(-138deg);
}
</style>
