<template>
	<div id="gameProgress">
		<div class="impact">
			<span>Impact</span>
			<div class="progress">
  			<div class="progress-bar bg-success" role="progressbar" :style="impactStyle" :aria-valuenow="impactProgress" aria-valuemin="0" aria-valuemax="100">{{impactProgress}}%</div>
			</div>
		</div>
		<div class="reputation">
			<span>Reputation: Integrity</span>
			<div class="progress">
  			<div class="progress-bar bg-success" role="progressbar" :style="integrityStyle" :aria-valuenow="integrityProgress" aria-valuemin="0" aria-valuemax="100">{{integrityProgress}}%</div>
			</div>
		</div>
		<div class="competence">
			<span>Competence</span>
			<div class="progress">
  			<div class="progress-bar bg-success" role="progressbar" :style="competenceStyle" :aria-valuenow="competenceProgress" aria-valuemin="0" aria-valuemax="100">{{competenceProgress}}%</div>
			</div>
		</div>
	</div>
</template>

<script>
import { eventBus } from "../../main";
export default {
  data: function() {
    return {
      impactProgress: 55,
      integrityProgress: 30,
      competenceProgress: 60
    };
  },
  computed: {
    impactStyle: function() {
      return {
        width: this.impactProgress + "%"
      };
    },
    integrityStyle: function() {
      return {
        width: this.integrityProgress + "%"
      };
    },
    competenceStyle: function() {
      return {
        width: this.competenceProgress + "%"
      };
    }
  },
  created: function() {
    eventBus.$on("impactProgressChange", value => {
      this.impactProgress = value;
    });

    eventBus.$on("integrityProgressChange", value => {
      this.integrityProgress = value;
    });

    eventBus.$on("competenceProgressChange", value => {
      this.competenceProgress = value;
    });
  }
};
</script>

<style scoped>
#gameProgress {
  border-radius: 50px;
  border: 2px solid #7ce5f8;
  margin: 0px -27px 0px;

  width: 650px;
  height: 50px;
  background: linear-gradient(#3ead68 40%, #7ce5f8 50%);
}
.progress {
  background: #99b1a3;
  width: 100%;
}
.impact {
  color: white;
  padding: 0px 0px 0px 30px;
  font-weight: bold;
  display: inline-block;
  width: 30%;
}
.reputation {
  color: white;
  padding: 0px 0px 0px 30px;
  font-weight: bold;
  display: inline-block;
  width: 30%;
}
.competence {
  color: white;
  padding: 0px 0px 0px 30px;
  font-weight: bold;
  display: inline-block;
  width: 30%;
}
</style>
