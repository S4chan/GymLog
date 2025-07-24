<script setup lang="ts">
import Layout from "./layouts/Layout.vue";
import { useWorkoutStore } from './stores/workoutStore';
import { onMounted } from 'vue';

const workoutStore = useWorkoutStore();

onMounted(() => {
  workoutStore.initialize_data();
});

</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<style scoped></style>
