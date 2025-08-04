<template>
  <div class="results-container">
    <h2>Workout Results</h2>
    <div class="percentage">
      Your 30-day training completion rate is:
      <span :style="{ color: percentageColor }">{{ completionPercentage }}%</span>
    </div>
    <button @click="challengeAgain">Challenge Again</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkoutStore } from '../stores/workoutStore';

const router = useRouter();
const workoutStore = useWorkoutStore();

const completionPercentage = computed(() => workoutStore.completionPercentage);

const percentageColor = computed(() => {
  if (completionPercentage.value >= 80) {
    return '#22c55e'; // green
  } else if (completionPercentage.value >= 50) {
    return '#f97316'; // orange
  } else {
    return '#ef4444'; // red
  }
});

const challengeAgain = () => {
  workoutStore.reset();
  router.push({ name: 'Welcome' });
};
</script>

<style scoped>
.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  gap: 1rem;
}

.percentage {
  font-size: 1.5rem;
  margin: 20px 0;
}

.percentage span {
  font-weight: bold;
}


</style>
