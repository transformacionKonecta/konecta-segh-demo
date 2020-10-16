<template>
  <v-container>
    <v-row class="mt-0 pt-0 pl-2">
      <h1 class="headline font-weight-bold mb-3 ml-3">Mis Gestiones</h1>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-5 justify-space-between">
      <v-col cols="4">
        <v-card height="400px">
          <v-card-title>
            <p class="text-Subtitle-1 teal--text">
              <i class="mdi mdi-poll"></i>
            </p>
            <p class="text-body-2 teal--text ml-2 mt-2 font-weight-bold">
              Mi Indicador de conversión
            </p>
          </v-card-title>
          <v-divider class="ml-5 mr-5 divDivider"></v-divider>
          <v-card-text class="text-center">
            <Doughnut
              v-if="rolUser == `Call` && !showSpinner"
              :values="arrayEval"
              :width="100"
              :height="300"
              :labels ="['Apto', 'No apto', 'Otros']"
            ></Doughnut>
          </v-card-text>
          <!--           <v-row class="justify-center"><v-alert dense outlined type="error" class="pl-5 pr-5">
            Falta por tipificar
            <strong>{{emptyEval}}</strong> entrevistas
          </v-alert></v-row>          
 -->
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card height="400px">
          <v-card-title>
            <p class="text-Subtitle-1 teal--text">
              <i class="mdi mdi-account-check"></i>
            </p>
            <p class="text-body-2 teal--text ml-2 mt-2 font-weight-bold">
              Asistencia
            </p>
          </v-card-title>
          <v-divider class="ml-5 mr-5 divDivider"></v-divider>
          <v-card-text>
            <p class="text-body-2 mt-2 text-center">
              Registra el inicio de tu sesión y al finalizar el día tu cierre de
              gestión
            </p>
            <v-row>
              <v-col cols="8">
                <p class="text-end black--text font-weight-medium">Fecha:</p>
              </v-col>
              <v-col cols="4">
                <p class="text-end black--text mr-8 font-weight-medium">
                  Hora:
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-btn
                  v-promise-btn
                  :disabled="btnConnect"
                  width="190"
                  class="pa-6 ml-3 white--text"
                  color="teal"
                  @click.stop="registerConection()"
                >
                  <v-icon left>mdi-headset</v-icon>Conectarme
                </v-btn>
              </v-col>
              <v-col>
                <p class="black--text mt-3 ml-8 font-weight-medium">Inicio:</p>
              </v-col>
              <v-col>
                <p class="black--text mt-3 font-italic">{{ fechaConexion }}</p>
              </v-col>
              <v-col>
                <p class="black--text text-center mt-3 font-italic">
                  {{ horaConexion }}
                </p>
              </v-col>
            </v-row>
            <v-row class="mt-8">
              <v-col cols="4">
                <v-btn
                  v-promise-btn
                  :disabled="btnDesconnect"
                  width="190"
                  class="pa-6 ml-3 white--text"
                  color="red"
                  @click.stop="registerDesconection()"
                >
                  <v-icon left>mdi-headset-off</v-icon>Desconectarme
                </v-btn>
              </v-col>
              <v-col>
                <p class="black--text mt-3 ml-8 font-weight-medium">Fin:</p>
              </v-col>
              <v-col>
                <p class="black--text mt-3 font-italic">
                  {{ fechaDesconexion }}
                </p>
              </v-col>
              <v-col>
                <p class="black--text text-center mt-3 font-italic">
                  {{ horaDesconexion }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showSpinner" persistent width="300" height="300">
      <v-card class="mx-auto d-flex justify-center align-center" width="300" height="300">
        <v-card-text class="justify-center align-center text-center">
          <v-progress-circular
            :size="50"
            color="teal"
            indeterminate
            class="divProgress"
          ></v-progress-circular>
          <p class="mt-10 subtitle-1 font-weight-bold">Revisando Conexión...</p>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showModal" persistent width="450" height="450">
      <v-card class="mx-auto" width="450" height="200">
        <v-icon class="ml-3 mt-3 red--text">report_problem</v-icon>
        <v-card-text>
          <v-row class="justify-center align-center">
            <p class="text-center black--text mt-2">
              <b>Falta por tipificar {{ emptyEval }} entrevistas.</b><br />
              <span class="black--text mt-2">
                Para registrar la desconexión es necesario tipificar todas sus
                entrevistas del día.</span
              >
            </p>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-center align-center btnSeleccion">
          <v-btn
            color="teal"
            outlined
            @click="$router.push('/selector/#' + firtsEvalEmpty)"
          >
            <v-icon left>home</v-icon>Seleccion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { getUser } from "../firebase/userMethods";
import moment from "moment";

import Doughnut from "./Graphics/Doughnut";

export default {
  name: "Indicators",
  data() {
    return {
      showSpinner: false,
      btnConnect: false,
      btnDesconnect: true,
      showModal: false,
      idUser: "",
      nameUser: "",
      rolUser: "",
      fechaActualL: "",
      fechaActualS: "",
      horaActual: "",
      fechaConexion: "-",
      horaConexion: "-",
      fechaDesconexion: "-",
      horaDesconexion: "-",
      keyAsistencia: "",
      firtsEvalEmpty: "",
      arrayEval: [0, 0, 0], //APTOS, NO APTOS, RECHAZA, NO SE PRESENTA
      emptyEval: 0,
    };
  },
  components: {
    Doughnut,
  },
  async mounted() {
    this.showSpinner = true;
    this.idUser = firebase.auth().currentUser.uid;
    this.getTime();
    await this.getDataUser();
    if (this.rolUser == "Selector") await this.getEmptyInterviews();
    else if (this.rolUser == "Call") await this.getStatisticsInterviews();
    await this.checkUserConection();
  },
  methods: {
    async getDataUser() {
      let dataUser = await getUser(this.idUser);
      this.nameUser = dataUser.name;
      this.rolUser = dataUser.userRole;
    },
    getTime() {
      var hoy = moment();
      this.fechaActualS = moment(hoy).format("D/M/YYYY");
      this.fechaActualL = moment(hoy).format("YYYY/MM/DD");
      this.horaActual = moment(hoy).format("HH:mm:ss");
    },
    async checkUserConection() {
      this.getTime();
      await firebase
        .database()
        .ref("ASISTENCIA")
        .orderByChild("conectionDate")
        .equalTo(this.fechaActualL)
        .once("value", this.findConection, this.checkError);
    },
    findConection(data) {
      data.forEach((element) => {
        if (element.val().IdUser == this.idUser) {
          this.btnConnect = true;
          this.btnDesconnect = false;
          this.keyAsistencia = element.key;
          this.fechaConexion = moment(element.val().conectionDate).format("DD/MM/YYYY");
          this.horaConexion = element.val().conectionHour;
          if (element.val().hasOwnProperty("desconectionDate")) {
            this.btnDesconnect = true;
            this.fechaDesconexion = moment(element.val().desconectionDate).format("DD/MM/YYYY");;
            this.horaDesconexion = element.val().desconectionHour;
          }
        }
      });
      this.showSpinner = false;
    },
    async registerConection() {
      this.getTime();
      this.btnConnect = true;
      this.btnDesconnect = false;
      this.fechaConexion = moment(this.fechaActualL).format("DD/MM/YYYY");
      this.horaConexion = this.horaActual;
      let asistencia_table = {
        IdUser: this.idUser,
        conectionDate: this.fechaActualL,
        conectionHour: this.horaConexion,
      };
      this.keyAsistencia = firebase.database().ref("ASISTENCIA").push().key;
      await firebase
        .database()
        .ref("ASISTENCIA")
        .child(this.keyAsistencia)
        .set(JSON.parse(JSON.stringify(asistencia_table)));
    },

    async registerDesconection() {
      this.getTime();
      if (this.rolUser == "Selector" && this.emptyEval != 0) {
        this.showModal = true;
      } else {
        this.btnDesconnect = true;
        this.fechaDesconexion = moment(this.fechaActualL).format("DD/MM/YYYY");
        this.horaDesconexion = this.horaActual;
        await firebase
          .database()
          .ref("ASISTENCIA")
          .child(this.keyAsistencia)
          .update({
            desconectionDate: this.fechaActualL,
            desconectionHour: this.horaDesconexion,
          });
      }
    },

    async getEmptyInterviews() {
      const nameSelector = this.nameUser;
      let postulantesInterviews = [];
      const refEntrevista = firebase.database().ref("ENTREVISTA_PROGRAMADA");
      await refEntrevista
        .orderByChild("fechaEntrevista")
        .equalTo(this.fechaActualS)
        .once("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            if (datoSnapshot.val().entrevistador.indexOf(nameSelector) > -1) {
              postulantesInterviews.push({
                id: datoSnapshot.val().id_postulante,
              });
            }
          });
        });
      postulantesInterviews.forEach((element) => {
        this.getEvaluations(element.id).then((value) => {
          if (value.val() == null) {
            this.emptyEval++;
          }
        });
      });
    },

    async getStatisticsInterviews() {
      const idCall = this.idUser;
      let postulantesInterviews = [];
      const refEntrevista = firebase.database().ref("ENTREVISTA_PROGRAMADA");
      for (let index = 0; index < 8; index++) {
        const findDate = moment().subtract(index, "d").format("D/M/YYYY");
         await refEntrevista
        .orderByChild("fechaEntrevista")
        .equalTo(findDate)
        .once("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            if (datoSnapshot.val().id_call == idCall) {
              postulantesInterviews.push({
                id: datoSnapshot.val().id_postulante,
              });
            }
          });
        });
      };
      postulantesInterviews.forEach((element) => {
        this.getEvaluations(element.id).then((value) => {
          if (value.val() == null) {
            this.arrayEval[2] += 1;
          } else {
            value.forEach((item) => {
              if (item.val().estado == "APTO") {
                this.arrayEval[0] += 1;
              } else if (item.val().estado == "NO APTO") {
                this.arrayEval[1] += 1;
              } else this.arrayEval[2] += 1;
            });
          }
        });
      });
    },
    async getEvaluations(id) {
      let evaluacion = [];
      const ref = firebase.database().ref("EVALUACION_PROGRAMADA");
      return ref.orderByChild("id_postulante").equalTo(id).once("value");
    },
  },
};
</script>

<style>
.divDivider {
  margin-top: -20px;
  color: teal;
  border-color: teal !important;
}
.divProgress {
  margin-top: 100px;
}
.btnConect {
  border: 1px solid teal;
  border-radius: 10px;
  padding: 10px;
  background-color: teal;
  color: white;
}
.btnSeleccion {
  margin-top: -10px;
}
</style>
