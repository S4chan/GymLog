
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { workoutProgram } from '../utils';
import { useRouter } from 'vue-router';

export const useWorkoutStore = defineStore('workout', () => {
  const router = useRouter();

  const defaultData: Record<number, Record<string, string>> = {};
  for (let workoutIdx in workoutProgram) {
    const workoutData = workoutProgram[workoutIdx];
    defaultData[workoutIdx] = {};
    for (let e of workoutData.workout) {
      defaultData[workoutIdx][e.name] = "";
    }
  }

  const data = ref(defaultData);

  const isWorkoutComplete = computed(() => (selectedWorkout: number) => {
    const currWorkout = data.value?.[selectedWorkout];
    if (!currWorkout) return false;
    return Object.values(currWorkout).every((ex) => !!ex);
  });

  const firstIncompleteWorkoutIndex = computed(() => {
    const allWorkouts = data.value;
    if (!allWorkouts) return -1;

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
    localStorage.setItem("workouts", JSON.stringify(data.value));
    router.push({ name: 'Dashboard' });
  }

  function handleResetPlan() {
    data.value = defaultData;
    localStorage.removeItem("workouts");
    router.push({ name: 'Dashboard' });
  }

  function initialize_data() {
    const rawData = localStorage.getItem("workouts");
    if (rawData !== null) {
      const savedData = JSON.parse(rawData);
      data.value = savedData;
      router.push({ name: 'Dashboard' });
    }
  }

  return {
    data,
    isWorkoutComplete,
    firstIncompleteWorkoutIndex,
    handleSelectWorkout,
    handleSaveWorkout,
    handleResetPlan,
    initialize_data
  };
});
