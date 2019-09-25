<template>
  <v-layout column>
    <v-flex>
      Select filters below report to display report
    </v-flex>
    <v-flex>
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <v-menu
            v-model="startDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDateFormatted"
                label="Start Training Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" @input="startDateMenu = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <v-menu
            v-model="endDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDateFormatted"
                label="End Training Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" @input="endDateMenu = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <v-select
            :items="modules"
            v-model="gameModule"
            label="Module"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <v-select
            :items="cadres"
            v-model="cadre"
            label="Cadre"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <v-select
            :items="trainings"
            v-model="training"
            label="Type of Training"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <v-btn color="primary" round @click="getReport"><v-icon left>list</v-icon> View</v-btn>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
    </v-flex>
    <v-flex v-if="reportRun" xs12>
      <v-flex xs12>
        <v-flex xs6>
          <v-flex xs4>
            Number of Learners who Completed {{ moduleName }}
          </v-flex>
          <v-flex xs2>
            {{ numCompleted }} ({{ (numCompleted / totalAttempted) | formatPercent }})
          </v-flex>
        </v-flex>
        <v-flex xs6 v-if="moduleName == 'Module 1'">
          <v-flex xs10>
            Number of Learners who Completed Client A
          </v-flex>
          <v-flex xs2>
            {{ report.clientA.completed }} ({{ (report.clientA.completed / report.clientA.total) | formatPercent }})
          </v-flex>
          <v-flex xs10>
            Number of Learners who Completed Client B
          </v-flex>
          <v-flex xs2>
            {{ report.clientB.completed }} ({{ (report.clientB.completed / report.clientB.total) | formatPercent }})
          </v-flex>
          <v-flex xs10>
            Number of Learners who Completed Client C
          </v-flex>
          <v-flex xs2>
            {{ report.clientC.completed }} ({{ (report.clientC.completed / report.clientC.total) | formatPercent }})
          </v-flex>
        </v-flex>
      </v-flex>
      <v-flex xs12>
        <v-flex xs4>
          Total Number of Learners in this Training(s)
        </v-flex>
        <v-flex xs8>
          {{ totalLearners }}
        </v-flex>
      </v-flex>
    </v-flex>
    <v-flex v-if="moduleName == 'Module 1'">
      <strong>Module 1: VMMC Health Education, Counseling and HIV Testing</strong><br>
      <div v-for="client in clients" v-bind:key="client.id">
        <strong>{{ client.id | sentenceCase }} ({{ client.name }})</strong>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left"><strong>Percentage of participants who answered each question correctly</strong></th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="question in questions.module1[client.id]" :key="question.question">
                <td>{{ question.question }}</td>
                <td>{{ (question.correct / question.attempted) | formatPercent }}</td>
              </tr>
            </tbody>
        </v-simple-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
let module1 = require('./questions/module1.js')
let module2 = require('./questions/module2.js')

const config = require('../../config')
const isProduction = process.env.NODE_ENV === 'production'
const backendServer = (isProduction ? config.build.backend : config.dev.backend);

export default {
  created() {
    let questions = {
      module1: {},
      module2: {}
    };

    for (var clientId in module1) {
      let client = {};        

      for (var j in module1[clientId]) {
        client[j] = {
          attempted: 0,
          correct: 0,
          question: module1[clientId][j].situationText
        };
      }

      questions.module1[clientId] = client;
    }

    for (var i in module2) {
      questions.module2[i] = {
        attempted: 0,
        correct: 0,
        question: module2[i].situationText
      };
    }

    console.log(questions);

    this.questions = questions;
  },
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      cadres: [
        {text: "All", value: ""},
        {text: "Enrolled Nurse", value: "enrolled-nurse"},
        {text: "Registered Nurse", value: "registered-nurse"},
        {text: "Clinical Assistant", value: "clinical-assistant"},
        {text: "Clinical Officer", value: "clinical-officer"},
        {text: "Assistant Medical Officer", value: "assistant-medical-officer"},
        {text: "Medical Officer", value: "medical-officer"},
        {text: "Assistant Dental Officer", value: "assistant-dental-officer"},
        {text: "Dental Officer", value: "dental-officer"}
      ],
      cadre: "",
      startDateMenu: false,
      endDateMenu: false,
      startDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      startDate: new Date().toISOString().substr(0, 10),
      endDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      endDate: new Date().toISOString().substr(0, 10),
      modules: [1, 2],
      reportRun: false,
      clients: [
        {id: "clientA", name: "Amani"},
        {id: "clientB", name: "Zabron"},
        {id: "clientC", name: "Anold"}
      ],
      gameModule: 1,
      questions: {},
      client: 'clientA',
      module1: module1,
      module2: module2,
      numCompleted: 0,
      totalAttempted: 0,
      moduleName: null,
      report: [],
      training: "",
      trainings: [
        {text: "All", value: ""},
        {text: "New / Basic", value: "basic"},
        {text: "Refresher", value: "refresher"}
      ]
    }
  },
  methods: {
    formatDate (date) {
      if (!date) {
        return null
      }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    getReport () {
      this.gameModule
      if(this.gameModule == 1) {
        this.getModule1Report()
      } else if(this.gameModule == 2) {
        this.getModule2Report()
      }
    },
    getModule1Report() {
      this.report = [];
      this.resetQuestionCount();

      let query = `startDate=${this.startDate}&endDate=${this.endDate}&client=${this.client}`;

      axios.get(backendServer + `/getModule1Report?${query}`).then(response => {
        let numCompleted = 0;
        let fullyComplete = false;
        let questions = {};
        let report = {};
        let totalAttempted = 0;

        for (var i in this.clients) {
          report[this.clients[i].id] = {
            completed: 0,
            total: 0
          };
        };

        this.reportRun = true;
        this.moduleName = "Module 1";
        this.totalLearners = response.length;

        console.log(response.data);

        for (var i in response.data) {
          fullyComplete = true;
          let submission = response.data[i];
          totalAttempted++;

          for (var j in this.clients) {
            let client = this.clients[j].id;

            if (submission.answers[client]) {
              report[client].total++;

              if (Object.keys(submission.answers[client]).length == Object.keys(module1[client]).length) {
                report[client].completed++;
              } else {
                fullyComplete = false;
              }

              for (var k in submission.answers[client]) {
                this.questions.module1[client][k].attempted++;

                if (submission.answers[client][k].impact == 1) {
                  this.questions.module1[client][k].correct++;
                }
              }
            } else {
              fullyComplete = false;
            }
          }

          if (fullyComplete) {
            numCompleted++;
          }
        }
      
        this.numCompleted = numCompleted;
        this.report = report;
        this.totalAttempted = totalAttempted;
      });
    },
    getModule2Report() {
      let query = `startDate=${this.startDate}&endDate=${this.endDate}`
      axios.get(backendServer + `/getModule2Report?${query}`).then((response) => {
        this.reportRun = true;
        this.moduleName = "Module 2";
        for(let question in response.data.questionsAssesment) {
          pieOption.questionIndex = question - 1
          pieOption.title.text = 'Question ' + question
          pieOption.title.subtext = 'Question ' + question
          pieOption.series[0].name = 'Question ' + question
          for(var assessmentName in response.data.questionsAssesment[question]) {
            pieOption.legend.data.push(assessmentName + " (" + response.data.questionsAssesment[question][assessmentName] + ")")
            pieOption.series[0].data.push({
              value: response.data.questionsAssesment[question][assessmentName],
              name: assessmentName + " (" + response.data.questionsAssesment[question][assessmentName] + ")"
            })
          }
        }
      })
    },
    resetQuestionCount() {
      for (var clientId in this.questions.module1) {
        for (var j in this.questions.module1[clientId]) {
          this.questions.module1[clientId][j].attempted = 0;
          this.questions.module1[clientId][j].correct= 0;
        }
      }

      for (var i in this.questions.module2) {
        this.questions.module2[j].attempted = 0;
        this.questions.module2[j].correct = 0;
      }
    }
  },
  watch: {
    startDate (val) {
      this.startDateFormatted = this.formatDate(this.startDate)
    },
    endDate (val) {
      this.endDateFormatted = this.formatDate(this.endDate)
    }
  },
};
</script>
