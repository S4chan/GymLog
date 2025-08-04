<script setup lang="ts">
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

function handleLogout() {
  userStore.logout();
  router.push({ name: "Welcome" });
}
</script>

<template>
  <header>
    <h1 class="text-gradient">GYMLOG</h1>
    <div v-if="userStore.name" class="user-info">
      <span>Welcome, {{ userStore.name }}</span>
      <button @click="handleLogout">Logout</button>
    </div>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <small>Created by</small>
    <a href="https://github.com/S4chan" target="_blank">
      <p>S4chan</p>
      <i class="fa-brands fa-github"></i>
    </a>
  </footer>
</template>

<style scoped>
header,
main,
footer {
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

main {
  flex: 1;
}

footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 2rem 0;
  padding-bottom: 3rem;
}

footer a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem;
  padding-right: 0.5rem;
  background: var(--background-muted);
  border-radius: 4rem;
  border: 1px solid transparent;
  transition-duration: 200ms;
  text-decoration: none;
}

footer a:hover {
  border-color: var(--color-link);
}
</style>
