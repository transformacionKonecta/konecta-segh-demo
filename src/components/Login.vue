<template>
  <v-container class="container" :style="styleLoginPage">
    <!--     <v-col class="img-login pa-0">
      <v-img :src="require(`@/assets/${urlImage}`)"  alt="imagen-login" >
      </v-img>
    </v-col> -->
    <v-col cols="12" md="4" sm="12" offset-md="8" offset-sm="0">
      <v-card width="370" height="550" class="card rounded-xl">
        <h3 class="mt-8 text-center">ViveKonecta</h3>
        <h3 class="text-center">Reclutamiento y Selección</h3>
        <v-form class="form-login mt-5" action="#" @submit.prevent="submit">
          <h3 class="ma-5">
            Iniciar Sesión
          </h3>
          <v-col class="body-login">
            <p class="ml-2">Usuario</p>
            <v-text-field
              :rules="emailRules"
              dense
              full-width
              class="form-control mx-2"
              placeholder="Introduce tu usuario"
              name="login"
              color="teal"
              prepend-inner-icon="person"
              type="text"
              required
              autofocus
              v-model="form.email"
            />
            <p class="ml-2">Contraseña</p>
            <v-text-field
              :rules="passwordRules"
              placeholder="Introduce tu contraseña"
              class="form-control mx-2"
              id="password"
              color="teal"
              name="password"
              prepend-inner-icon="lock"
              type="password"
              required
              v-model="form.password"
            />
          </v-col>
          <small class="alert" dense outlined type="error" v-show="error">
            {{ error }}
          </small>
          <v-card-actions class="justify-center">
            <v-btn
              color="#009688"
              class="text-capitalize white--text mt-5"
              width="240px"
              height="40px"
              type="submit"
              >Iniciar Sesión</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { getUser } from "../firebase/userMethods";

import { createLogger } from "vuex";
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "login-layout");
    this.generateRandomImages();
  },
  data: () => ({
    form: {
      email: "",
      password: "",
    },
    emailRules: [(v) => !!v || "El usuario es requerido"],
    passwordRules: [(v) => !!v || "La contraseña es requirida"],
    error: null,
    dataUser: [],
    prueba: {},
    urlImage: "",
/*     styleLoginPage: {
      background: `linear-gradient(to bottom, rgba(213, 255, 252, 0.381), rgba(56, 204, 194, 0.612)), url("../assets/${urlImage}")`,
    }, */
  }),
  computed: {
      styleLoginPage() {
      return {
        background: `linear-gradient(rgb(2 243 235 / 33%), rgb(67 247 232 / 58%)), url(${this.urlImage})`
        }
    },
  },
  methods: {
    submit() {
      const email = this.form.email + "@konecta.com";
      firebase
        .auth()
        .signInWithEmailAndPassword(email, this.form.password)
        .then((data) => {
          localStorage.setItem("date", "");
          const userEmail = data.user.email;
          this.getMyData();
          // if (userEmail === "selector@konecta.com") {
          //   this.$router.replace({ path: "/selector" });
          // } else {
          //   this.$router.replace({ path: "/secondCall" });
          // }
        })
        .catch((err) => {
          //  this.error = err.message;
          console.log(err.message);
          switch (err.code) {
            case "auth/user-not-found":
              this.error = "El usuario no se encuentra registrado";
              break;
            case "auth/wrong-password":
              this.error = "La contraseña es incorrecta";
              break;
            case "auth/invalid-email":
              this.error = "No se ingresó ningún correo electrónico";
              break;
            default:
              this.error = "Se ha producido un error";
          }
        });
    },

    async getMyData() {
      let UID = firebase.auth().currentUser.uid;
      let userData = await getUser(UID);
      if (userData.userRole === "Call") {
        this.$router.replace({ path: "/secondCall" });
      } else if (userData.userRole === "Selector") {
        this.$router.replace({ path: "/selector" });
      } else if (userData.userRole === "Call/Selector") {
        this.$router.replace({ path: "/selector" });
      } else if (userData.userRole === "Administrador") {
        this.$router.replace({ path: "/processes" });
      }
    },

    generateRandomImages() {
      const listOfImages = [ 
        `${require("@/assets/img1.png")}`,
        `${require("@/assets/img2.png")}`,
        `${require("@/assets/img3.png")}`,
        `${require("@/assets/img4.png")}`,
        `${require("@/assets/img5.png")}`,
        `${require("@/assets/img6.png")}`,
        `${require("@/assets/img7.png")}`,
        `${require("@/assets/img8.png")}`,
        `${require("@/assets/img9.png")}`,
        `${require("@/assets/img10.png")}`,
      ];
      let image = "";
      let index = Math.floor(Math.random() * 10);

      image = listOfImages[index];

      this.urlImage = image;
      console.log(this.urlImage);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  background-size: cover !important;
  margin: 0%;
  padding: 0%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .card {
    display: flex;
    flex-direction: column;
    align-content: center;

    h3 {
      color: #00968f !important;
    }
  }

  .form-login {
    align-self: center;
    width: 90%;
    p {
 
      font-size: 14px;
      color: #4d4a49;
    }
  }

  .alert {
    font-size: 12px;
    margin-left: 10%;
    color: red;
  }
}
</style>
