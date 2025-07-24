<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue';
import Grid from "../components/Grid.vue";
import { gymHealthFacts } from "../utils";

const handleSelectWorkout = inject<(index: number) => void>('handleSelectWorkout', () => {});
const firstIncompleteWorkoutIndex = inject<ComputedRef<number>>('firstIncompleteWorkoutIndex', computed(() => -1));
const handleResetPlan = inject<() => void>('handleResetPlan', () => {});

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
            handleSelectWorkout(
              firstIncompleteWorkoutIndex < 0 ? 0 : firstIncompleteWorkoutIndex
            )
        "
      >
        Start workout &rarr;
      </button>
    </div>
    <Grid :handleSelectWorkout="handleSelectWorkout" :firstIncompleteWorkoutIndex="firstIncompleteWorkoutIndex" :handleResetPlan="handleResetPlan" />
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
