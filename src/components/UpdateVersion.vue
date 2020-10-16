<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="550">
      <v-card class="text-center pa-4">
        <h2 class="text-uppercase red--text py-2" >¡alerta!</h2>
        <v-divider></v-divider>
        <div class="d-flex justify-center my-5">
          <v-img
            src="../assets/alert-version.svg"
            aspect-ratio="3.7"
            contain
          ></v-img>
        </div>
        <div class="red--text py-4" >Se ha detectado una versión desactualizada de Vive Konecta</div>
        <p class="teal--text py-0" >Por favor actualiza el sistema utilizando <strong> Ctrl + F5</strong></p>
        <v-card-title class="text-lg-h6 justify-center">{{
        }}</v-card-title>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from "firebase";
export default {
name: "UpdateComponent",
data(){
  return {
    dialog:false,
  }
},
created(){
  this.verifyVersion()
  // console.log("AQUI EN CREATED");
},
methods: {
    async verifyVersion() {
      // console.log("AQUI EN LA FUNCION");
      let result;
      const db = firebase.database();
      const ref = db.ref("VERSION");
      let postulantesInfo = [];
      result = await ref
      .child("versionActual")
      .once("value");
      // console.log('RESUUUTL',result.val());
      if(result.val() === "3.0.0"){
        this.dialog = false;
      }
      else {
        this.dialog = false;
      }
    },
}
}
</script>

<style>

</style>