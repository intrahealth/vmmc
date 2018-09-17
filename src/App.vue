<template>
  <v-app>
    <v-dialog persistent v-model="$store.state.dialogError" max-width="500px">
			<v-card>
				<v-toolbar color="primary" dark>
					<v-toolbar-title>
						{{$store.state.errorTitle}}
					</v-toolbar-title>
				</v-toolbar>
				<v-card-text>
					{{$store.state.errorDescription}}
				</v-card-text>
				<v-card-actions>
					<v-btn color="primary" @click.native="$store.state.dialogError = false">Ok</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
    <v-content fluid>
      <center>
        <div id="gameContent">
          <center><component :is="selectedComponent"/></center>
        </div>
      </center>
      <app-footer id="appFooter"></app-footer>
    </v-content>
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import GameContent from "./components/Game/GameContent";
import { eventBus } from "./main";
export default {
  data() {
    return {
      selectedComponent: GameContent
    };
  },
  components: {
    "app-footer": Footer
  },
  created() {
    "App";
  }
};
</script>

<style>
#gameContent {
  border-radius: 30px;
  border: 3px solid #7ce5f8;
  width: 1000px;
  height: auto;
}
#appFooter {
  font-size: 13px;
}
</style>
