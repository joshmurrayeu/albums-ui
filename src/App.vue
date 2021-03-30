<template>
  <div class="bg-gray-100 h-screen" id="app">
    <navigation
        title="albums-api"
        username="Josh Murray"
        avatar="https://avatars.githubusercontent.com/u/13717924?v=4"
    />

    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/misc/Navigation';

export default {
  components: {
    Navigation,
  }
}
</script>