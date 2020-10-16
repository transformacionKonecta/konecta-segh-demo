<template>
  <v-row>
    <v-btn @click.stop="dialog = true" outlined rounded small>{{
      version.nroVersion
    }}</v-btn>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <div class="d-flex justify-center pt-8">
          <v-img
            src="../assets/versionImg.svg"
            aspect-ratio="3.7"
            contain
          ></v-img>
        </div>
        <v-card-title class="text-lg-h6 justify-center">{{
          version.largeVersion
        }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="pt-6 text--primary">Nuevas funcionalidades</p>
          <div v-for="(item, i) in version.funcionalidades" :key="i">
            <p class="mb-0 pl-2 py-1" v-html="item"></p>
          </div>
          <v-textarea
            class="pt-2"
            hide-details
            filled
            rows="2"
            color="teal"
            placeholder="Compartenos alguna sugerencia"
            v-model="sugerencia"
          ></v-textarea>
        </v-card-text>

        <v-card-actions class="justify-center pb-4">
          <v-btn
            color="#00B8AD"
            class="white--text"
            @click="(dialog = false), saveSugerencia()"
          >
            {{ sugerencia == "" ? "Cerrar" : "Guardar" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from "firebase";

export default {
  name: "VersionComponent",
  data: () => ({
    version: {
      nroVersion: "v3.0.0",
      largeVersion: "Versión 3.0.0",
      funcionalidades: [
        "1. Podrás actualizar los datos de contactabilidad del postulante.",
        "2. Podrás editar las entrevistas que agendaste.",
        "3. Podrás programar entrevistas con rangos de 20 minutos.",
      ],
    },
    sugerencia: "",
    dialog: false,
  }),

  methods: {
    saveSugerencia() {
      if (this.sugerencia !== "") {
        const currentUser = this.$firebase.auth().currentUser;
        console.log(currentUser.email);
        let sugerenciaData = {
          sugerencia: this.sugerencia,
          usuario: currentUser.email,
        };
        let sugerencia = JSON.parse(JSON.stringify(sugerenciaData));
        const sugerenciaKey = firebase
          .database()
          .ref("SUGERENCIA")
          .push().key;
        firebase
          .database()
          .ref("SUGERENCIA")
          .child(sugerenciaKey)
          .set(sugerencia);
      }
    },
  },
};
</script>
