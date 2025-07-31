import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { workoutProgram } from "../utils";
import { useRouter } from "vue-router";

const getInitialData = () => {
  const data: Record<number, Record<string, boolean>> = {};
  for (const workoutIdx in workoutProgram) {
    const workoutData = workoutProgram[workoutIdx];
    data[workoutIdx] = {};
    for (const e of workoutData.workout) {
      data[workoutIdx][e.name] = false;
    }
  }
  return data;
};

export const useWorkoutStore = defineStore("workout", () => {
  const router = useRouter();

  const data = ref(getInitialData());

  const getWorkoutCompletionStats = computed(
    () => (selectedWorkout: number) => {
      const currWorkout = data.value?.[selectedWorkout];
      if (!currWorkout) return { completed: 0, total: 0 };

      const values = Object.values(currWorkout);
      const completed = values.filter((ex) => ex).length;
      const total = values.length;

      return { completed, total };
    }
  );

  const isWorkoutComplete = computed(() => (selectedWorkout: number) => {
    const currWorkout = data.value?.[selectedWorkout];
    if (!currWorkout) return false;
    return Object.values(currWorkout).every((ex) => !!ex);
  });

  const firstIncompleteWorkoutIndex = computed(() => {
    const allWorkouts = data.value;
    if (!allWorkouts) return -1;

    for (const [index, workout] of Object.entries(allWorkouts)) {
      const isStarted = Object.values(workout).some((ex) => ex);
      if (!isStarted) {
        return parseInt(index);
      }
    }
    return Object.keys(allWorkouts).length - 1; // all are started
  });

  function handleSelectWorkout(idx: number) {
    router.push({ name: "Workout", params: { id: idx } });
  }

  function handleSaveWorkout() {
    localStorage.setItem("workouts", JSON.stringify(data.value));
    router.push({ name: "Dashboard" });
  }

  function resetState() {
    data.value = getInitialData();
  }

  function handleResetPlan() {
    resetState();
    localStorage.removeItem("workouts");
    router.push({ name: "Dashboard" });
  }

  function initialize_data() {
    const rawData = localStorage.getItem("workouts");
    if (rawData !== null) {
      const savedData = JSON.parse(rawData);
      data.value = savedData;
    } else {
      resetState();
    }
  }

  return {
    data,
    isWorkoutComplete,
    getWorkoutCompletionStats,
    firstIncompleteWorkoutIndex,
    handleSelectWorkout,
    handleSaveWorkout,
    handleResetPlan,
    initialize_data,
    resetState,
  };
});
