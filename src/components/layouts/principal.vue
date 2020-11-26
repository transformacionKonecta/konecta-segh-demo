<template>
  <v-app >
    <v-navigation-drawer
      color="#009688"
      v-model="drawer"
      app
      :mini-variant="miniVariant"
      permanent
      dark
      class="white--text"
    >
      <v-list-item link @click.stop="miniVariant = !miniVariant">
        <v-list-item-content>
          <v-list-item-title class="mt-5 display-1 font-weight-bold white--text"
            ><img src="../../assets/logolarge.png" width="147px"
          /></v-list-item-title>
        </v-list-item-content>
        <v-btn class="mt-5" icon @click.stop="miniVariant = !miniVariant">
          <v-icon color="white">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <div class="ml-6 mb-4">
        <VersionComponent />
        <UpdateComponent/>
      </div>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-if="selector || admin || callSelector"
            link
            to="/home"
            class="py-1"
          >
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/home')"
                >Inicio</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="selector || admin || callSelector"
            link
            to="/selector"
            class="py-1"
          >
            <v-list-item-icon>
              <v-icon>mdi-clipboard-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/selector')"
                >Selector</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="call || admin || callSelector" link to="/secondCall" class="py-1">
            <v-list-item-icon>
              <v-icon>call</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/secondCall')"
                >Call</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="admin" link to="/analitica" class="py-1">
            <v-list-item-icon>
              <v-icon>trending_up</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/analitica')">Analítica</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="admin" link to="/processes" class="py-1">
            <v-list-item-icon>
              <v-icon>description</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/processes')"
                >Procesos</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="call || callSelector || selector" link to="/indicators" class="py-1">
            <v-list-item-icon>
              <v-icon>mdi-headset</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/indicators')">Mis Gestiones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item  v-if="admin" link to="/management" class="py-1">
            <v-list-item-icon>
              <v-img src="../../assets/icon_menu.png" contain></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/management')"
              >Mis Gestiones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <!--   <v-list-item  v-if="admin" link to="/assistance" class="py-1">
            <v-list-item-icon>
              <v-img src="../../assets/icon_menu.png" contain></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/assistance')"
              >Indicadores por equipos</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item  v-if="admin" link to="/reports" class="py-1">
            <v-list-item-icon>
              <v-icon>assessment</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$router.push('/reports')"
              >Reportes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-list-item link @click.prevent="signOut">
          <v-list-item-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title 
              >Cerrar Sesión</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-content style="background-color:#F5F6F9;">
      <!-- <v-container class="fill-height" fluid> -->
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import VersionComponent from "../../components/version.vue";
import UpdateComponent from "../../components/UpdateVersion.vue";
import { getUser } from "../../firebase/userMethods";

export default {
  components: {
    VersionComponent,
    UpdateComponent
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
    mini: true,
    miniVariant: false,
    nameUser: '',
    admin: false,
    call: false,
    selector: false,
    callSelector: false,
    items: [
      { title: 'Perfil' },
      { title: 'Configuracion' },
    ],
  }),
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    this.showPerfiles();
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login",
          });
        });
    },
    async showPerfiles() {
      const currentUser = firebase.auth().currentUser;
      let userData = await getUser(currentUser.uid);
      let {name} = userData;
      this.nameUser = name;
        if (currentUser !== null) {
          if (userData.userRole === "Selector") {
            this.selector = true;
          } else if (userData.userRole === "Call") {
            this.call = true;
          } else if (userData.userRole === "Call/Selector") {
            this.callSelector = true;
          } else {
            this.admin = true;
          }
        }
    },
  },
};
</script>
<style lang="scss" scoped>
.bar {
  box-shadow: none !important;
}

</style>
