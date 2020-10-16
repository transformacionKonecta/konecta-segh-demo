<template>
  <v-row justify-align="center" class="justify-center">
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field
        v-model="userData.name"
        :rules="nameRules"
        label="Nombre"
        required
      ></v-text-field>
      <v-text-field
        v-model="userData.lastName"
        label="Apellidos"
        required
        :rules="[(v) => !!v || 'Apellido is required']"
      ></v-text-field>
      <v-text-field
        v-model="userData.DNI"
        :rules="[(v) => !!v || 'Item is required']"

        label="DNI"
        required
      ></v-text-field>

        <!-- :rules="emailRules" -->
      <v-text-field
        v-model="userData.email"
        label="E-mail"
      ></v-text-field>

      <v-select
        v-model="userData.userRole"
        :items="itemsRoles"
        :rules="[(v) => !!v || 'Item is required']"
        label="Rol"
        required
      ></v-select>

      <v-text-field
        v-model="userData.userName"
        label="Usuario"
        :rules="[(v) => !!v || 'Item is required']"
        required
      ></v-text-field>

      <v-text-field
        v-model="userData.password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        label="Password"
        class="input-group--focused"
        @click:append="show = !show"
        :rules="[(v) => !!v || 'Item is required']"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="userRegister"
      >
        Registrar
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>

      <v-btn color="warning" @click="resetValidation">
        Reset Validation
      </v-btn>
    </v-form>
  </v-row>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
  },
  data: () => ({
    valid: true,
    show: false,
    nameRules: [
      (v) => !!v || "Name is required",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    emailRules: [
      // (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    itemsRoles: ["Call", "Selector", "Call/Selector","Administrador"],
    userData: {
      userName: "",
      password: "",
      email: "",
      name: "",
      lastName: "",
      DNI: "",
      userRole: null,
    },
    // checkbox: false,
    lazy: false,
  }),

  methods: {
    userRegister() {
      this.$refs.form.validate();
      // let userName = '';
      // console.log(this.userData.userRole);
      // if (this.userData.userRole === "Call") {
      //   userName = this.userData.userName + "@callKonecta.com";
      // } else if (this.userData.userRole === "Selector") {
      //   userName = this.userData.userName + "@selectorKonecta.com";
      // } else {
      //   userName = this.userData.userName + "@adminKonecta.com";
      // }
      const userName = this.userData.userName + "@konecta.com";
      console.log(userName);
      firebase
        .auth()
        .createUserWithEmailAndPassword(userName, this.userData.password)
        .then(
          (user) => {
            var user = firebase.auth().currentUser;
            this.writeUserData(user.uid);
          },
          function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          }
        );
    },
    writeUserData(userid) {
      console.log(userid);
      firebase
        .database()
        .ref("USERS/" + userid)
        .set({
          email: this.userData.email || '',
          name: this.userData.name,
          lastName: this.userData.lastName,
          DNI: this.userData.DNI,
          userRole: this.userData.userRole
        });
        
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
