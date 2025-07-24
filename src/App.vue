<script setup lang="ts">
import Welcome from "./pages/Welcome.vue";
import Layout from "./layouts/Layout.vue";
import Dashboard from "./pages/Dashboard.vue";
import Workout from "./pages/Workout.vue";

import { ref, computed, onMounted } from "vue";
import { workoutProgram } from "./utils/index";

const defaultData: Record<number, Record<string, string>> = {};
for (let workoutIdx in workoutProgram) {
  const workoutData = workoutProgram[workoutIdx];
  //create a for loop where we iterate over every workout
  defaultData[workoutIdx] = {}; // initialize the workout data obj

  // nested loop to loop over every exercise within a workout, and initialize it's input value to an empty string
  for (let e of workoutData.workout) {
    defaultData[workoutIdx][e.name] = "";
  }
}

const selectedDisplay = ref(1);
const data = ref(defaultData); // {1....30: {exercise_name: '', .....}}
const selectedWorkout = ref(-1);

const isWorkoutComplete = computed(() => {
  const currWorkout = data.value?.[selectedWorkout.value];
  if (!currWorkout) {
    return false;
  } // guard clause to exit function

  const isCompleteCheck = Object.values(currWorkout).every((ex) => !!ex);
  console.log("ISCOMPLETE: ", isCompleteCheck);
  return isCompleteCheck;
});

const firstIncompleteWorkoutIndex = computed(() => {
  const allWorkouts = data.value;
  if (!allWorkouts) {
    return -1;
  }

  // loop over every key value pair, and check if the workout is complete or not
  for (const [index, workout] of Object.entries(allWorkouts)) {
    const isComplete = Object.values(workout).every((ex) => !!ex);
    if (!isComplete) {
      return parseInt(index);
    }
  }
  return -1; // all are complete
});

function handleChangeDisplay(idx: number) {
  selectedDisplay.value = idx;
}

function handleSelectWorkout(idx: number) {
  selectedDisplay.value = 3;
  selectedWorkout.value = idx;
}

function handleSaveWorkout() {
  // save the current data snapshot to localstorage so that we can retrieve it next time
  localStorage.setItem("workouts", JSON.stringify(data.value));

  // show the dashboard
  selectedDisplay.value = 2;

  // deselect a workout
  selectedWorkout.value = -1;
}

function handleResetPlan() {
  selectedDisplay.value = 2;
  selectedWorkout.value = -1;
  data.value = defaultData;
  localStorage.removeItem("workouts");
}

onMounted(() => {
  const rawData = localStorage.getItem("workouts");
  if (rawData !== null) {
    const savedData = JSON.parse(rawData);
    data.value = savedData;
    selectedDisplay.value = 2;
  }
});
</script>

<template>
  <Layout>
    <!-- PAGE 1 -->
    <Welcome
      :handleChangeDisplay="handleChangeDisplay"
      v-if="selectedDisplay == 1"
    />
    <!-- PAGE 2 -->
    <Dashboard
      :handleResetPlan="handleResetPlan"
      :firstIncompleteWorkoutIndex="firstIncompleteWorkoutIndex"
      :handleSelectWorkout="handleSelectWorkout"
      v-if="selectedDisplay == 2"
    />
    <!-- PAGE 3 -->
    <Workout
      :handleSaveWorkout="handleSaveWorkout"
      :isWorkoutComplete="isWorkoutComplete"
      :data="data"
      :selectedWorkout="selectedWorkout"
      v-if="workoutProgram?.[selectedWorkout]"
    />
  </Layout>
</template>

<style scoped></style>
