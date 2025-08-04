import { defineStore } from "pinia";
import { useWorkoutStore } from "./workoutStore";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: localStorage.getItem("userName") || "",
  }),
  actions: {
    setName(name: string) {
      this.name = name;
      localStorage.setItem("userName", name);
    },
    logout() {
      const workoutStore = useWorkoutStore();
      workoutStore.resetState();
      this.name = "";
      localStorage.removeItem("userName");
      localStorage.removeItem("workouts");
    },
    initialize() {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        this.name = storedName;
      }
    },
  },
});
