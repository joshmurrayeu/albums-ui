<template>
  <card>
    <table class="table-fixed text-left w-full border-collapse">
      <thead>
      <tr class="w-full">
        <th>Title</th>
        <th class="text-right ml-auto">Actions</th>
      </tr>
      </thead>
      <tbody v-if="Object.keys(this.albumsStored).length > 0">
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
    let albumUri = 'http://api.albums.test/api/v1/albums';

    // Get the albums from the API if none have been passed in
    if (typeof this.id != 'undefined') {
      albumUri += '?filter[user]=' + this.id;
    }

    vm.axios.get(albumUri).then((response) => {
      vm.albumsStored = response.data.data;
    });
  },
}
</script>
