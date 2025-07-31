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
});

function handleLogout() {
  userStore.logout();
  router.push({ name: 'Welcome' });
}
</script>

<template>
  <Layout>
    <div v-if="userStore.name" class="user-info">
      <span>Welcome, {{ userStore.name }}</span>
      <button @click="handleLogout">Logout</button>
    </div>
    <router-view />
  </Layout>
</template>

<style scoped>
.user-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
