<template>
  <container>
    <card class="p-2">
      <div class="w-100 md:w2/3">
        <h1>Editing {{ this.user.attributes.name }}</h1>

        <FormulateForm @submit="handleFormSubmit">
          <FormulateInput v-model="user.attributes.name" name="name" label="Name" error-behavior="live" validation="required"/>
          <FormulateInput v-model="user.attributes.username" name="username" label="Username" error-behavior="live" validation="bail|required|matches:/[A-za-z0-9.]/"/>
          <FormulateInput v-model="user.attributes.email" type="email" name="email" label="Email" error-behavior="live" validation="bail|required|email"/>

          <FormulateInput type="group" name="address">
            <FormulateInput type="group" name="geo">
              <div class="grid grid-cols-2 gap-2">
                <FormulateInput v-model="user.attributes.address.geo.lat" name="lat" label="Latitude" error-behavior="live" validation="bail|required|number"
                                :validation-messages="{number: 'Latitude must be a number'}"/>

                <FormulateInput v-model="user.attributes.address.geo.lng" name="lng" label="Longitude" error-behavior="live" validation="bail|required|number"
                                :validation-messages="{number: 'Longitude must be a number'}"/>
              </div>
            </FormulateInput>

            <div class="grid grid-cols-2 gap-2">
              <FormulateInput v-model="user.attributes.address.city" name="city" label="City" error-behavior="live" validation="required"/>
              <FormulateInput v-model="user.attributes.address.suite" name="suite" label="Suite" error-behavior="live" validation="required"/>
              <FormulateInput v-model="user.attributes.address.street" name="street" label="Street" error-behavior="live" validation="required"/>
              <FormulateInput v-model="user.attributes.address.zipcode" name="zipcode" label="Zip-code" error-behavior="live" validation="required"/>
            </div>
          </FormulateInput>

          <FormulateInput v-model="user.attributes.phone" name="phone" label="Phone" error-behavior="live" validation="required"/>
          <FormulateInput v-model="user.attributes.website" name="website" label="Website" error-behavior="live" validation="required"/>

          <FormulateInput type="group" name="company">
            <FormulateInput v-model="user.attributes.company.bs" name="bs" label="Markets" error-behavior="live" validation="required"/>
            <FormulateInput v-model="user.attributes.company.name" name="name" label="Company Name" error-behavior="live" validation="required"/>
            <FormulateInput v-model="user.attributes.company.catchPhrase" name="catchPhrase" error-behavior="live" label="Catch-phrase" validation="required"/>
          </FormulateInput>

          <FormulateInput type="submit" label="Sign up"/>
        </FormulateForm>
      </div>
    </card>
  </container>
</template>

<script>
import Card from "./../../components/misc/Card";
import Container from "../../components/misc/Container";

export default {
  components: {
    Container, Card,
  },
  data() {
    return {
      user: {
        attributes: {
          name: '',
          username: '',
          email: '',
          address: {
            geo: {
              lat: '',
              lng: '',
            },
            suite: '',
            street: '',
            zipcode: '',
          },
          phone: '',
          website: '',
          company: {
            bs: '',
            name: '',
            catchPhrase: '',
          },
        },
      },
    }
  },
  mounted() {
    let vm = this;

    // Get the album ID from the route
    let userId = vm.$route.params.id;

    // Get the albums from the API
    vm.axios.get(vm.uri(userId)).then((response) => {
      vm.user = response.data.data;
    });
  },
  methods: {
    uri(id) {
      return `http://api.albums.test/api/v1/users/${id}`;
    },
    async handleFormSubmit(data) {
      // Get the user
      let user = this.user;

      // Push the new data into the old user structure
      user.attributes = data;

      // Remove the links and relationship blocks as it isn't required
      delete user.links;
      delete user.relationships;

      // vue-formulate will wrap our group data in arrays - let's fix this
      let address = user.attributes.address[0],
          geo = address.geo[0],
          company = user.attributes.company[0];

      // Set these values back to the user object
      user.attributes.address = address;
      user.attributes.address.geo = geo;
      user.attributes.company = company;

      // Post the data to the BE
      await this.axios.patch(this.uri(this.user.id), {data: user}, {
        headers: {
          // 'Content-Type': 'application/vnd.api+json',
        }
      }).then((response) => {
        console.log(response.data);
      });
    }
  },
}
</script>
