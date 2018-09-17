<template>
	<v-container fluid>
		<v-layout column>
			<v-flex>
				<app-question></app-question>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import Meters from "./Meters";
import Question from "./Question";
export default {
  components: {
    "app-meters": Meters,
    "app-question": Question
  }
};
</script>
