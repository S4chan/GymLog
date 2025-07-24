<script setup lang="ts"></script>

<template>
  <header>
    <h1 class="text-gradient">SMOLGRAM</h1>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <small>Created by</small>
    <a href="https://github.com/S4chan" target="_blank">
      <img
        src="https://media.cakeresume.com/image/upload/s--IIQQmeu8--/c_fill,g_face,h_300,w_300/v1742528072/yvwx6fllxpmtyb4uek0n.jpg"
        alt="pfp"
      />
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

footer a img {
  max-height: 30px;
  aspect-ratio: 1/1;
  border-radius: 100%;
}
</style>
