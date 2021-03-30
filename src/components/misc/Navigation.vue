<template>
  <nav class="bg-gray-800 text-white">
    <div class="container px-2 mx-auto flex py-3">
      <div>
        <p>
          <router-link to="/">{{ this.title }}</router-link>
        </p>
      </div>

      <div class="ml-auto">
        <a href="#" class="flex">{{ this.username }}
          <img class="w-8 rounded-full ml-2" :src="this.avatar" :alt="this.createAltForImage">
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['title', 'username', 'avatar'],
  methods: {
    createAltForImage() {
      return this.username + "'s avatar";
    }
  },
}
</script>