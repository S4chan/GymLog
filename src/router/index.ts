import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../pages/Welcome.vue';
import Dashboard from '../pages/Dashboard.vue';
import Workout from '../pages/Workout.vue';
import Results from '../pages/Results.vue';

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/workout/:id', name: 'Workout', component: Workout, props: true },
  { path: '/results', name: 'Results', component: Results },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
