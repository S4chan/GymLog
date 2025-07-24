<script setup lang="ts">
import Layout from "./layouts/Layout.vue";

import { ref, computed, onMounted, provide } from "vue";
import { workoutProgram } from "./utils/index";
import { useRouter } from 'vue-router';

const router = useRouter();

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

const data = ref(defaultData); // {1....30: {exercise_name: '', .....}}

const isWorkoutComplete = computed(() => (selectedWorkout: number) => {
  const currWorkout = data.value?.[selectedWorkout];
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

function handleSelectWorkout(idx: number) {
  router.push({ name: 'Workout', params: { id: idx } });
}

function handleSaveWorkout() {
  // save the current data snapshot to localstorage so that we can retrieve it next time
  localStorage.setItem("workouts", JSON.stringify(data.value));

  // show the dashboard
  router.push({ name: 'Dashboard' });
}

function handleResetPlan() {
  data.value = defaultData;
  localStorage.removeItem("workouts");
  router.push({ name: 'Dashboard' });
}

provide('data', data);
provide('firstIncompleteWorkoutIndex', firstIncompleteWorkoutIndex);
provide('isWorkoutComplete', isWorkoutComplete);
provide('handleSelectWorkout', handleSelectWorkout);
provide('handleSaveWorkout', handleSaveWorkout);
provide('handleResetPlan', handleResetPlan);


onMounted(() => {
  const rawData = localStorage.getItem("workouts");
  if (rawData !== null) {
    const savedData = JSON.parse(rawData);
    data.value = savedData;
    router.push({ name: 'Dashboard' });
  }
});
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<style scoped></style>
