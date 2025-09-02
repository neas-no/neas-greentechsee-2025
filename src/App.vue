<script setup>
import Norgespris from './components/Norgespris.vue';
</script>

<template>

  <Norgespris  />
</template>

<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* Global styles can go here */

/* Font Mabry */
@font-face {
  font-family: 'Mabry';
  src: url('/fonts/mabry-regular-pro.woff2') format('woff2'),
       url('/fonts/mabry-regular-pro.woff') format('woff');
}

@font-face {
  font-family: 'Mabry-Light';
  font-weight: 300;
  src: url('/fonts/mabry-light-pro.woff2') format('woff2'),
       url('/fonts/mabry-light-pro.woff') format('woff');
}

@font-face {
  font-family: 'Mabry-Medium';
  font-weight: 500;
  src: url('/fonts/mabry-medium-pro.woff2') format('woff2'),
       url('/fonts/mabry-medium-pro.woff') format('woff');
}

</style>
