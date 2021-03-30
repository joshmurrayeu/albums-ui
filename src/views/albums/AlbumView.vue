<template>
  <container>
    <card class="p-2">
      <h1 class="text-2xl">{{ this.album.attributes.title }}</h1>

      <hr class="my-2">

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequuntur, cupiditate deserunt, ducimus
        eos ex excepturi explicabo illum in necessitatibus nobis nostrum odit optio, possimus repellendus saepe
        similique veniam vero!</p>

      <hr class="my-2">

      <p v-if="this.user.attributes.name !== null">
        This user has the following albums:
        <router-link :to="{ name: 'view-user', params: { id: this.user.id } }" class="text-blue-300">
          {{ this.user.attributes.name }}
        </router-link>
      </p>
    </card>
  </container>
</template>

<script>
import Card from './../../components/misc/Card';
import Container from "../../components/misc/Container";

export default {
  components: {
    Container, Card,
  },
  data() {
    return {
      album: {
        attributes: {
          title: null,
        },
      },
      user: {
        attributes: {
          name: null,
        },
      },
    }
  },
  mounted() {
    let vm = this;

    // Get the album ID from the route
    let albumId = vm.$route.params.id;

    // Get the albums from the API
    vm.axios.get(`http://api.albums.test/api/v1/albums/${albumId}?include=user`).then((response) => {
      vm.album = response.data.data;
      vm.user = response.data.included[0];
    });
  },
}
</script>
