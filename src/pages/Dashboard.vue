<script setup lang="ts">
import Grid from "../components/Grid.vue";
import { gymHealthFacts } from "../utils";
import { useWorkoutStore } from '../stores/workoutStore';

const workoutStore = useWorkoutStore();

// generate a random whole integer number between 0 and array length - 1
const randomNumber = Math.floor(Math.random() * gymHealthFacts.length);
const todaysFact = gymHealthFacts[randomNumber];
</script>

<template>
  <section id="dashboard">
    <div class="card tip-container">
      <h2>Welcome Smoldier</h2>
      <div>
        <p class="tip"><strong>Daily Tip</strong><br />{{ todaysFact }}</p>
      </div>
      <button
        @click="
          () =>
            workoutStore.handleSelectWorkout(
              workoutStore.firstIncompleteWorkoutIndex < 0 ? 0 : workoutStore.firstIncompleteWorkoutIndex
            )
        "
      >
        Start workout &rarr;
      </button>
    </div>
    <Grid :handleSelectWorkout="workoutStore.handleSelectWorkout" :handleResetPlan="workoutStore.handleResetPlan" />
  </section>
</template>

<style scoped>
.tip-container,
.tip-container div,
#dashboard {
  display: flex;
}

.tip-container,
#dashboard {
  flex-direction: column;
}

#dashboard {
  gap: 2rem;
}

.tip-container {
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .tip-container {
    gap: 1rem;
  }
}
</style>
