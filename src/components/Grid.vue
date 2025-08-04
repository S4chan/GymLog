<script setup lang="ts">
import { workoutProgram } from "../utils";
import { useWorkoutStore } from '../stores/workoutStore';

const workoutStore = useWorkoutStore();

const props = defineProps<{
  handleSelectWorkout: (index: number) => void;
  handleResetPlan: () => void;
}>();

const getWorkoutClass = (workoutIdx: number) => {
  const stats = workoutStore.getWorkoutCompletionStats(workoutIdx);
  if (stats.total === 0) return '';
  
  const completionRatio = stats.completed / stats.total;
  
  if (completionRatio === 1) {
    return 'green-bg';
  } else if (completionRatio > 0.5) {
    return 'orange-bg';
  } else if (completionRatio > 0) {
    return 'red-bg';
  }
  
  return '';
};

const workoutTypes = ["Push", "Pull", "Legs"];
</script>

<template>
  <section id="grid">
    <button
      @click="() => props.handleSelectWorkout(n - 1)"
      :key="n - 1"
      v-for="n in Object.keys(workoutProgram).length"
      class="card-button plan-card"
      :class="getWorkoutClass(n - 1)"
    >
      <div>
        <p>
          Day {{ n < 10 ? "0" + n : n }}
        </p>
        <i class="fa-solid fa-dumbbell" v-if="(n - 1) % 3 == 0"></i>
        <i class="fa-solid fa-weight-hanging" v-if="(n - 1) % 3 == 1"></i>
        <i class="fa-solid fa-bolt" v-if="(n - 1) % 3 == 2"></i>
      </div>
      <h3>{{ workoutTypes[(n - 1) % 3] }}</h3>
    </button>
    <button
      @click="props.handleResetPlan"
      class="card-button plan-card-reset"
    >
      <p>Reset</p>
      <i class="fa-solid fa-rotate-left"></i>
    </button>
  </section>
</template>

<style scoped>
.plan-card {
  position: relative;
  overflow: hidden;
}

.plan-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background-color: transparent;
  transition: background-color 0.3s;
}

.plan-card.red-bg::after {
  background-color: #ef4444;
}

.plan-card.orange-bg::after {
  background-color: #f97316;
}

.plan-card.green-bg::after {
  background-color: #22c55e;
}

#grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

#grid button {
  width: 100%;
}

#grid button:disabled {
  box-shadow: none;
  cursor: not-allowed;
}

.plan-card {
  display: flex;
  flex-direction: column;
}

.plan-card-reset {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.plan-card div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.plan-card div p {
  text-align: left;
}

@media (min-width: 640px) {
  #grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
