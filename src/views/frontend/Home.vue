<script setup>
import Movies from './Movies.vue';
import Footer from '../../components/Footer.vue';
import Header from '../../components/Header.vue';

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow">
      <Movies />
    </div>
    <Footer />
  </div>
</template>
