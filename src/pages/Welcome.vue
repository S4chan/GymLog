<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const name = ref("");

function handleBegin() {
  if (name.value.trim() !== "") {
    userStore.setName(name.value);
    router.push({ name: "Dashboard" });
  }
}
</script>

<template>
  <section id="welcome">
    <div>
      <h3>The Training Plan</h3>
      <p>
        This training plan follows a structure known as the
        <strong>Bro Split</strong>.
      </p>
      <h5><i>Push &rarr; Pull &rarr; Legs &rarr; Repeat</i></h5>
    </div>
    <div class="card challenge">
      <h3>🔥 Your Challenge</h3>
      <p>Enter your name to begin:</p>
      <input type="text" v-model="name" placeholder="Your Name" />
      <p>Complete all the workouts and track your progress along the way!</p>
      <button @click="handleBegin">Begin &rarr;</button>
    </div>
  </section>
</template>

<style scoped>
#welcome,
.challenge,
.benefits {
  display: flex;
  flex-direction: column;
}

#welcome {
  gap: 1.5rem;
}

.benefits {
  gap: 0.5rem;
}

.challenge {
  gap: 0.25rem;
}

@media (min-width: 640px) {
  #welcome {
    gap: 2rem;
    padding: 1rem 0;
  }

  .benefits {
    gap: 1rem;
  }
}
</style>
