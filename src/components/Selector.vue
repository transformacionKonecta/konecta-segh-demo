<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <v-col class="col-5">
        <h1 class="headline font-weight-bold mb-3 ">
          Listado de postulantes a entrevistar
        </h1>
      </v-col>
      <v-col class="col-7 d-flex justify-end">
        <v-chip class="chip" color="teal" text-color="white"
          >Total: {{ postulantesDataAll.length }}</v-chip
        >
        <v-chip class="chip" outlined style="border: 1.5px solid #6DD400"
          >Aptos: {{ totalPostAptos }}</v-chip
        >
        <v-chip class="chip" outlined style="border: 1.5px solid #ff0037">
          No Aptos: {{ totalPostNoAptos }}</v-chip
        >
        <v-chip class="chip" outlined style="border: 1.5px solid #505050">
          No se Presentó: {{ totalPostNoPresento }}</v-chip
        >
        <v-chip class="chip" outlined style="border: 1.5px solid #FFD100">
          R.Propuesta: {{ totalPostRechaza }}</v-chip
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="justify-space-between mt-4">
      <v-col class="col-4">
        <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              label="Seleccione la Fecha:"
              readonly
              v-on="on"
              color="teal"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="ES-es"
            color="teal"
            no-title
            v-model="date"
            @change="(menu1 = false), saveDate()"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <!-- <div v-if="groups.length > 0">
          <div v-for="(group,fechaEntrevista) in groups" :key="group.id">
            <h2>{{fechaEntrevista}}</h2>
            <pre v-for="item in group" :key="item.id">{{item}}</pre>
          </div>
      </div>-->
      <v-col cols="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2" class="pb-0 text-right">
        <v-btn
          width="152"
          class="ma-2"
          dark
          color="#EF6C00"
          @click="getListInterviewData()"
          v-promise-btn
        >
          <v-icon left dark>mdi-cached</v-icon>Buscar
        </v-btn>
        <!-- <v-btn @click="getListInterviewData()" v-promise-btn>Probar</v-btn> -->
      </v-col>
    </v-row>
    <!--     <v-row class="pb-4 pl-2 pt-4">
      <v-icon>today</v-icon>
      <p class="mb-0">
        <strong>{{dateNow}}</strong>
      </p>
    </v-row>-->
    <div
      cols="12"
      md="12"
      v-for="(group, horaEntrevista) in groups"
      :key="group.id"
    >
      <v-row class="ml-1 pb-4 pt-5">
        <!--  <v-icon color="black">date_range</v-icon> -->
        <p class="ml-2 mb-0">
          <strong>Turno : {{ horaEntrevista }}</strong>
        </p>
      </v-row>
      <v-row class="ml-8 justify-center">
        <v-data-iterator
          no-results-text
          :items="group"
          :search="search"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-row>
              <!-- <div>{{props.items}}</div> -->
              <v-flex
                v-for="(lista, index) in props.items"
                :search="search"
                :key="lista.id"
                xs12
                xl3
                pa-2
              >
                <!-- <div>dfdfdf {{lista}}</div> -->
                <!-- @click="$router.push({name: 'selectorDetail', params:{ id:lista.number, lista:postulantesDataAll[index] }})" -->
                <v-card
                  class="mx-auto"
                  width="800px"
                  v-bind:style="[
                    lista.datosEvaluacion.length <= 0
                      ? { border: '1.5px solid #ff0037' }
                      : {},
                  ]"
                  @click="
                    $router.push({
                      name: 'selectorDetail',
                      params: { id: lista.number, lista: props.items[index] },
                    })
                  "
                >
                  <v-card-text>
                    <v-row class="justify-space-between pl-4 pb-2 pr-10">
                      <p class="subtitle-1 font-weight-bold text--primary mb-0">
                        {{ lista.Nombres }}
                      </p>
                      <v-chip
                        v-if="lista.datosEvaluacion.length > 0"
                        class="my-0 mx-0 subtitle-2 justify-center text-uppercase"
                        style="min-width: 164px;"
                        dark
                        :color="
                          postulanteStateColor(
                            lista.datosEvaluacion[0].datosEvaluacion.estado
                          )
                        "
                        label
                        >{{
                          lista.datosEvaluacion[0].datosEvaluacion.estado
                        }}</v-chip
                      >
                      <v-chip
                        v-else
                        class="my-0 mx-0 subtitle-2 justify-center"
                        label
                        outlined
                        style="width: 164px;"
                        color="#ff0037"
                        ><v-icon class="mr-1">warning</v-icon>Registrar
                        estado</v-chip
                      >
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                      <v-col cols="12" md="8" class="pa-0 pl-3">
                        <p
                          class="pl-1 subtitle-1 body-2 mb-1 pt-2 text--primary"
                        >
                          N° de Documento: {{ lista.documento }}
                        </p>
                        <p class="pl-1 body-2 pb-0 ma-0 mb-1 text--primary">
                          Correo: {{ lista.correo }}
                        </p>
                        <!--  <p class="body-2 pl-1 mb-1 text--primary">Cuenta: {{lista.datosIgc[0].cuenta}}</p> -->
                        <div
                          v-if="lista.datosEvaluacion.length > 0"
                          class="pa-0 ml-1 my-0"
                          style="color:rgba(0, 0, 0, 0.87)"
                        >
                          Cuenta:
                          {{
                            lista.datosEvaluacion[0].datosEvaluacion.id_igc
                              ? getCuenta(
                                  lista.datosEvaluacion[0].datosEvaluacion
                                    .id_igc
                                )
                              : lista.cuenta
                          }}
                        </div>
                        <p
                          v-if="
                            lista.datosIgc.length > 0 &&
                              lista.datosEvaluacion.length === 0
                          "
                          class="body-2 pl-1 mb-1 text--primary"
                        >
                          Cuenta : {{ lista.datosIgc[0].cuenta }}
                        </p>
                        <p
                          v-if="
                            lista.cuenta && lista.datosEvaluacion.length == 0
                          "
                          class="body-2 pl-1 mb-1 text--primary"
                        >
                          Cuenta : {{ lista.cuenta }}
                        </p>
                        <div
                          class="pa-0 ml-1 my-0"
                          v-if="lista.datosEvaluacion.length > 0"
                          style="color:rgba(0, 0, 0, 0.87)"
                        >
                          Modalidad:
                          {{
                            lista.datosEvaluacion[0].datosEvaluacion.id_igc
                              ? getModalidad(
                                  lista.datosEvaluacion[0].datosEvaluacion
                                    .id_igc
                                )
                              : lista.modalidad
                          }}
                        </div>
                        <p
                          v-if="
                            lista.datosIgc.length > 0 &&
                              lista.datosEvaluacion.length === 0
                          "
                          class="body-2 pl-1 mb-1 text--primary"
                        >
                          Modalidad: {{ lista.datosIgc[0].modalidad }}
                        </p>
                        <p
                          v-if="
                            lista.modalidad && lista.datosEvaluacion.length == 0
                          "
                          class="body-2 pl-1 mb-1 text--primary"
                        >
                          Modalidad: {{ lista.modalidad }}
                        </p>
                        <p class="body-2 pl-1 mb-1 text--primary">
                          Entrevistador: {{ lista.entrevistador }}
                        </p>
                        <p
                          v-if="
                            callUserData.name !== null &&
                              callUserData.lastName !== null
                          "
                          class="body-2 pl-1 mb-1 text--primary"
                        >
                          Agendado por: {{ callUserData.name }}
                          {{ callUserData.lastName }}
                        </p>
                      </v-col>
                      <v-col cols="12" md="4" class="pa-0  text-center">
                        <div class="text-center pl-8 my-4">
                          <v-icon
                            v-if="lista.tipoEntrevista === 'Virtual'"
                            color="teal"
                            large
                            >video_call</v-icon
                          >
                          <v-icon v-else color="teal" large>domain</v-icon>
                        </div>
                        <p
                          v-if="lista.tipoEntrevista === 'Virtual'"
                          class="body-2 pl-7"
                        >
                          En video llamada
                        </p>
                        <p v-else class="body-2 pl-7">En sala de espera</p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-row>
          </template>
        </v-data-iterator>
      </v-row>
    </div>

      <!-- <v-row v-if="Object.keys(groups).length == 0" class="mt-8">
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          No se encontraron entrevistas programadas para la fecha seleccionada. 
        </v-alert>
      </v-row> -->
  </v-container>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
import _ from "lodash";
import { getUser } from "../firebase/userMethods";
export default {
  listaEntrevista: null,
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.getListInterviewData();
  },
  data: () => ({
    search: "",
    menu1: false,
    callUserData: {},
    date: new Date().toISOString().substr(0, 10),
    dateNow: new Date().toLocaleDateString(),
    postulantesDataAll: [],
    datosIgc: [],
    modalidad: "",
  }),
  mounted() {
    this.getInterviewList();
    this.getListInterviewData();
    if (localStorage.getItem("date") != "") {
      this.date = localStorage.getItem("date");
    } else {
      (this.date = new Date().toISOString().substr(0, 10)), this.saveDate();
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    },
    groups() {
      return this.groupForDate(this.postulantesDataAll, "horaEntrevista");
    },
    totalPostAptos() {
      let i = 0;
      this.postulantesDataAll.forEach((elem) => {
        if (elem.datosEvaluacion.length > 0) {
          if (elem.datosEvaluacion[0].datosEvaluacion.estado === "APTO") i++;
        }
      });
      return i;
    },
    totalPostNoAptos() {
      let i = 0;
      this.postulantesDataAll.forEach((elem) => {
        if (elem.datosEvaluacion.length > 0) {
          if (elem.datosEvaluacion[0].datosEvaluacion.estado === "NO APTO") i++;
        }
      });
      return i;
    },
    totalPostRechaza() {
      let i = 0;
      this.postulantesDataAll.forEach((elem) => {
        if (elem.datosEvaluacion.length > 0) {
          if (
            elem.datosEvaluacion[0].datosEvaluacion.estado ===
            "Rechaza Propuesta"
          )
            i++;
        }
      });
      return i;
    },
    totalPostNoPresento() {
      let i = 0;
      this.postulantesDataAll.forEach((elem) => {
        if (elem.datosEvaluacion.length > 0) {
          if (
            elem.datosEvaluacion[0].datosEvaluacion.estado === "No se presentó"
          )
            i++;
        }
      });
      return i;
    },
  },
  methods: {
    saveDate() {
      localStorage.setItem("date", this.date);
    },
    async getInterviewList() {
      const startDate = moment(localStorage.getItem("date")).format("D/M/YYYY");
      const snapshot = await firebase
        .database()
        .ref("ENTREVISTA_PROGRAMADA")
        .orderByChild("fechaEntrevista")
        .equalTo(startDate)
        .once("value");
      console.log(snapshot.val());
      return snapshot.val();
    },

    async getListInterviewData() {
      console.log("btn buscar");
      let interviewData = await this.getInterviewList();
      console.log("async", interviewData);
      let postulantesAll = [];
      for (let entrevistadoInfo in interviewData) {
        let allPostulantes_data;
        allPostulantes_data = {
          idPostulanteInfo: interviewData[entrevistadoInfo].id_postulante,
          Nombres: interviewData[entrevistadoInfo].nombres,
          documento: interviewData[entrevistadoInfo].documento,
          entrevistador: interviewData[entrevistadoInfo].entrevistador,
          cuenta: interviewData[entrevistadoInfo].cuenta,
          correo: interviewData[entrevistadoInfo].correo,
          modalidad: interviewData[entrevistadoInfo].modalidad,
          igc: interviewData[entrevistadoInfo].igc,
          fechaEntrevista: interviewData[entrevistadoInfo].fechaEntrevista,
          horaEntrevista: interviewData[entrevistadoInfo].horaEntrevista,
          datosIgc: interviewData[entrevistadoInfo].id_igc
            ? this.getIGCById(interviewData[entrevistadoInfo].id_igc)
            : "",
          meetLink: interviewData[entrevistadoInfo].meetLink,
          tipoEntrevista: interviewData[entrevistadoInfo].tipoEntrevista,
          informacionPersonal: this.getPostulanteInfo(
            interviewData[entrevistadoInfo].id_postulante
          ),
          CallUser: interviewData[entrevistadoInfo].id_call
            ? this.getCallUserData(interviewData[entrevistadoInfo].id_call)
            : "",
          datosFormacion: this.getDatosFormacion(
            interviewData[entrevistadoInfo].id_postulante
          ),
          datosExperiencia: this.getDatosExperiencia(
            interviewData[entrevistadoInfo].id_postulante
          ),
          datosEvaluacion: this.getEvaluacion(
            interviewData[entrevistadoInfo].id_postulante
          ),
          datosRotacion: this.getDatosRotacion(
            interviewData[entrevistadoInfo].id_postulante
          ),
          datosTecnicos: this.getEquipoTecnico(
            interviewData[entrevistadoInfo].id_postulante
          ),
        };
        postulantesAll.push(allPostulantes_data);
        this.filterInterviewBySelector(postulantesAll);
      }
      postulantesAll = postulantesAll.sort(
        (a, b) => parseInt(a.horaEntrevista) - parseInt(b.horaEntrevista)
      );
      console.log("postulantesAll async", postulantesAll);
    },

    async filterInterviewBySelector(listOfInterview) {
      listOfInterview = listOfInterview.sort(
        (a, b) => parseInt(a.horaEntrevista) - parseInt(b.horaEntrevista)
      );
      const { uid } = firebase.auth().currentUser;
      const snapshot = await firebase
        .database()
        .ref("USERS")
        .child(uid)
        .once("value");

      const fullNameUser = `${snapshot.val().name} ${snapshot.val().lastName}`;

      if (snapshot.val().userRole === "Administrador") {
        this.postulantesDataAll = listOfInterview;
      }
      if (
        snapshot.val().userRole === "Selector" ||
        snapshot.val().userRole === "Call/Selector"
      ) {
        this.postulantesDataAll = _.filter(listOfInterview, function(p) {
          return p.entrevistador.toUpperCase() === fullNameUser.toUpperCase();
        });
      }
      // console.log('postulantesDataAll', this.postulantesDataAll);
    },
    getPostulanteInfo(id) {
      const db = firebase.database();
      const ref = db.ref("POSTULANTES");
      let postulantesInfo = [];
      ref.child(id).on("value", function(snapshot) {
        postulantesInfo.push({
          datosPersonales: snapshot.val(),
        });
      });
      return postulantesInfo;
    },
    getIGCById(idIgc) {
      let dataIgc = [];
      let nombre = [];
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref
        .orderByChild("id")
        .equalTo(idIgc)
        .on("value", function(snap) {
          snap.forEach((elem) => {
            dataIgc.push({ ...elem.val() });
          });
        });
      return dataIgc;
    },
    getCuenta(idIgc) {
      let dataIgc = [];
      let cuenta = "";
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref
        .orderByChild("id")
        .equalTo(idIgc)
        .on("value", function(snap) {
          snap.forEach((elem) => {
            cuenta = elem.val().cuenta;
          });
        });
      return cuenta;
    },
    getModalidad(idIgc) {
      let dataIgc = [];
      let modalidad = "";
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref
        .orderByChild("id")
        .equalTo(idIgc)
        .on("value", function(snap) {
          snap.forEach((elem) => {
            modalidad = elem.val().modalidad;
          });
        });
      return modalidad;
    },
    getDatosRotacion(id) {
      const db = firebase.database();
      const ref = db.ref("DATOS_ROTACION");
      let postulanteRotacion = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            postulanteRotacion.push({
              id: datoSnapshot.key,
              datosRotacion: datoSnapshot.val(),
            });
          });
        });
      return postulanteRotacion;
    },
    getEquipoTecnico(id) {
      const db = firebase.database();
      const ref = db.ref("ESPECIFICACION_TECNICA");
      let equipoTecnico = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            equipoTecnico.push({
              key: datoSnapshot.key,
              datosEquipoTecnico: datoSnapshot.val(),
            });
          });
        });
      return equipoTecnico;
    },
    getDatosFormacion(id) {
      const db = firebase.database();
      const ref = db.ref("DATOS_PROFESIONALES");
      let postulanteFormac = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            postulanteFormac.push({
              datosFormacion: datoSnapshot.val(),
            });
          });
        });
      // console.log(postulanteFormac);
      return postulanteFormac;
    },
    getDatosExperiencia(id) {
      const db = firebase.database();
      const ref = db.ref("DATOS_EXPERIENCIA");
      let postulanteExperiencia = [];
      let i = 0;
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            i++;
            postulanteExperiencia.push({
              datosExperiencia: datoSnapshot.val(),
            });
          });
        });
      return postulanteExperiencia;
    },
    getEvaluacion(id) {
      const db = firebase.database();
      const ref = db.ref("EVALUACION_PROGRAMADA");
      let postulanteEvaluacion = [];
      let datosIgc = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            postulanteEvaluacion.push({
              id: datoSnapshot.key,
              datosEvaluacion: datoSnapshot.val(),
            });
          });
        });
      return postulanteEvaluacion;
    },

    async getCallUserData(id) {
      // console.log(id);
      let userData = await getUser(id);
      // console.log(userData);
      this.callUserData = userData;
      // return userData;
    },

    postulanteStateColor(estado) {
      if (estado === "APTO") {
        return "#6DD400";
      } else if (estado === "NO APTO") {
        return "#ff0037";
      } else if (estado === "Rechaza Propuesta") {
        return "#FFD100";
      } else {
        return "#909190";
      }
    },
    groupForDate(array, key) {
      const result = {};
      array.forEach((item) => {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }
        result[item[key]].push(item);
      });
      return result;
    },
    comparar(a, b) {
      return a - b;
    },
  },
};
</script>
<style lang="scss">
.chip {
  width: 22%;
  justify-content: center;
  font-size: 11px !important;
  margin: 2px;
  font-weight: bolder;
  color: rgb(80, 80, 80) !important;
}
.img-interview {
  width: 45px;
  margin-left: 28px;
}
.borderC {
  border: 10px solid red;
  border-color: red;
  background-color: red;
}
@media (min-width: 960px) {
  .container {
    max-width: 98% !important;
  }
}
</style>
