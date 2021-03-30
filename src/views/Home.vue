<template>
  <container>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div id="albums">
        <h1 class="text-3xl">Albums</h1>
        <album-table/>
      </div>

      <div id="users">
        <h1 class="text-3xl">Users</h1>
        <user-table/>
      </div>
    </div>
  </container>
</template>

<script>
import AlbumTable from "../components/albums/AlbumTable";
import UserTable from "../components/users/UserTable";
import Container from "../components/misc/Container";

export default {
  name: 'Home',
  components: {Container, AlbumTable, UserTable},
}
</script>
