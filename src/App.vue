<script setup lang="ts">
import Layout from "./layouts/Layout.vue";
import { useWorkoutStore } from './stores/workoutStore';
import { useUserStore } from './stores/userStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const workoutStore = useWorkoutStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  workoutStore.initialize_data();
  userStore.initialize();
  if (userStore.name) {
    router.push({ name: 'Dashboard' });
  } else {
    router.push({ name: 'Welcome' });
  }
});

function handleLogout() {
  userStore.logout();
  router.push({ name: 'Welcome' });
}
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<style scoped>
</style>
