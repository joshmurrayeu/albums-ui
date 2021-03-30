<template>
  <container v-if="Object.keys(this.user).length > 0">
    <card class="p-2">
      <h1 class="text-3xl">{{ this.user.attributes.name }}</h1>

      <hr class="my-2">

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequuntur, cupiditate deserunt,
        ducimus
        eos ex excepturi explicabo illum in necessitatibus nobis nostrum odit optio, possimus repellendus saepe
        similique veniam vero!</p>

      <hr class="my-2">

      <p><a class="text-blue-300" :href="userUri(this.user.id, 'edit')">Click here</a> to edit this user.</p>
    </card>

    <h2 class="text-2xl">Albums belonging to this user</h2>

    <album-table :id="this.user.attributes.id"/>
  </container>
</template>

<script>
import AlbumTable from "./../../components/albums/AlbumTable";
import Card from "./../../components/misc/Card";
import axios from "axios";
import Container from "../../components/misc/Container";

export default {
  components: {
    Container,
    AlbumTable, Card
  },
  data() {
    return {
      user: {},
      albums: {},
    }
  },
  mounted() {
    let vm = this;

    // Get the album ID from the route
    let userId = vm.$route.params.id;

    // Get the albums from the API
    axios.get(`http://albums-api.test/api/v1/users/${userId}?include=albums`).then((response) => {
      vm.user = response.data.data;
      vm.albums = response.data.included;
    });
  },
  methods: {
    userUri(id, action = '') {
      return 'http://albums-api.test/users/' + id + '/' + action;
    }
  },
}
</script>
