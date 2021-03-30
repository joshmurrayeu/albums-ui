<template>
  <card>
    <table class="table-fixed text-left w-full border-collapse">
      <thead>
      <tr class="w-full">
        <th>Title</th>
        <th class="text-right ml-auto">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="album in this.albumsStored" :key="album.id">
        <td class="">{{ album.attributes.title }}</td>
        <td class="w-20 text-right">
          <router-link :to="{ name: 'view-album', params: { id: album.id } }" class="btn bg-blue-200">View</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </card>
</template>

<script>
import Card from './../misc/Card'
import axios from "axios";

export default {
  components: {
    Card,
  },
  props: ['id'],
  data() {
    return {
      albumsStored: {}
    };
  },
  mounted() {
    let vm = this;
    let albumUri = 'http://albums-api.test/api/v1/albums';

    // Get the albums from the API if none have been passed in
    if (typeof this.id != 'undefined') {
      albumUri += '/' + this.id;
    }

    axios.get(albumUri).then((response) => {
      vm.albumsStored = response.data.data;
    });
  },
  methods: {
    albumUri(id) {
      return 'http://albums-api.test/albums/' + id;
    }
  },
}
</script>
