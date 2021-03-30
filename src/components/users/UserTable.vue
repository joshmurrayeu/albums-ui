<template>
  <card>
    <table class="table-fixed text-left w-full border-collapse">
      <thead>
      <tr class="w-full">
        <th>Name</th>
        <th class="text-right ml-auto">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.attributes.name }}</td>
        <td class="text-right ml-auto">
          <router-link :to="{ name: 'edit-user', params: { id: user.id } }" class="btn bg-green-200">Edit</router-link>
          <router-link :to="{ name: 'view-user', params: { id: user.id } }" class="btn bg-blue-200">View</router-link>
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
  data() {
    return {
      users: {},
    }
  },
  mounted() {
    let vm = this;
    
    // Get the albums from the API
    vm.axios.get('http://albums-api.test/api/v1/users').then((response) => {
      vm.users = response.data.data;
    });
  },
}
</script>
