<template>
  <div>
    <div v-if="home">
      <v-col>       
        <p class="font-weight-bold mb-5">Asistencia</p>
        <p >
          Aquí podrás revisar y modificar la asistencia de
          tus equipos.
        </p>
      </v-col>
      <v-row class="ml-5">
        <v-card class="mr-5" width="200" height="200" @click="showViewCall()">
          <v-card-text class="text-center">
            <v-img src="../assets/call.svg" aspect-ratio="2" contain></v-img>
            <p class="mt-5">Equipo Reclutador</p>
            <p>Perfil Call</p>
          </v-card-text>
        </v-card>
        <v-card
          class="ml-5"
          width="200"
          height="200"
          @click="showViewSelector()"
        >
          <v-card-text class="text-center">
            <v-img src="../assets/selección.svg" aspect-ratio="2" contain></v-img>
            <p class="mt-5">Equipo Selección</p>
            <p>Perfil Selector</p>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
    <div v-else class="ml-5">
      <v-col>
        <h1 class="headline font-weight-bold mb-3">
          Asistencia - Equipo {{ viewName }}
        </h1>
        <v-divider></v-divider>
      </v-col>
      <v-row class="mt-5 justify-space-between">
        <v-col cols="2">
          <v-btn
            v-if="arrayAssistance.length != 0"
            color="teal"
            text
            @click="toHomeView()"
            ><v-icon>mdi-arrow-left</v-icon>
            <span class="ml-3">Regresar</span>
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn
            :disable="arrayAssistance.length <= 0"
            color="teal"
            class="text--capitalize white--text"
            ><download-excel :data="arrayExcel" name="asistencia.xls"
              >Descargar</download-excel
            ><v-icon>save_alt</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="justify-space-between">
        <v-col cols="2" class="ml-5">
          <p>Fecha</p>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            max-width="290"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                prepend-inner-icon="mdi-calendar-blank"
                :value="computedDateFormattedMomentjs"
                outlined
                readonly
                v-on="on"
                color="teal"
                @click:clear="date = null"
                hide-details
              ></v-text-field>
            </template>
            <v-date-picker
              locale="es-PE"
              color="teal"
              no-title
              v-model="date"
              @change="loadTableNewDate()"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3 mt-8 mr-10">
          <v-text-field
            v-model="search"
            color="teal"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center mt-10">
        <v-data-table
          :headers="headers"
          :items="arrayAssistance"
          :search="search"
          :sort-by="['name']"
        >
          <template v-slot:item.hourBegin="{ item }">
            <v-chip
              :color="checkHourEntry(item.hourBegin)"
              dark
              class="black--text"
            >
              {{ item.hourBegin }}
            </v-chip>
          </template>
          <template v-slot:item.hourEnd="{ item }"
            ><v-chip
              :color="checkHourExit(item.hourEnd)"
              dark
              class="black--text"
            >
              {{ item.hourEnd }}
            </v-chip>
          </template>
          <template v-slot:item.edit="{ item }">
            <v-icon small class="mr-2" @click="editAssistance(item)">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-row>
    </div>
    <v-dialog v-model="showSpinner" persistent width="300" height="300">
      <v-card class="mx-auto" width="300" height="300">
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
    <v-dialog v-model="editModal" persistent width="750">
      <v-card class="mx-auto" width="750" height="650">
        <v-row class="justify-end mr-1">
          <v-btn class="mt-2" color="teal" text @click.stop="editModal = false"
            ><v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-row>
        <v-row class="justify-center mt-1"
          ><h2 class="font-weight-bold teal--text text-center">
            Editar Asistencias
          </h2>
        </v-row>
        <v-row class="justify-center mt-6"
          ><h4 class="font-weight-bold text-center">
            Recuerda validar los motivos antes de modificar la asistencia de un
            colaborador.
          </h4>
        </v-row>
        <v-row class="ml-10 mt-8"
          ><h4>Usuario: {{ editName }}</h4></v-row
        >
        <v-form ref="form" v-model="valid">
          <v-row class="ml-8 mr-8 mt-4 justify-space-between">
            <v-col cols="3">
              <p>Fecha:</p>
              <v-text-field
                prepend-inner-icon="mdi-calendar-blank"
                v-model="editDate"
                outlined
                readonly
                dense
                color="teal"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <p>Hora de Ingreso:</p>
              <v-text-field
                type="time"
                v-model="editHourBegin"
                required
                :rules="[(v) => !!v || 'Campo requerido']"
                dense
                outlined
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <p>Hora de Salida:</p>
              <v-text-field
                type="time"
                v-model="editHourEnd"
                required
                :rules="[(v) => !!v || 'Campo requerido']"
                dense
                outlined
                color="teal"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="11">
              <p class="font-weight-bold black--text">Observaciones:</p>
              <v-textarea
                filled
                name="input-7-4"
                v-model="editObsv"
                required
                :rules="[(v) => !!v || 'Campo requerido']"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <v-row class="justify-center">
          <v-btn color="red" class="mr-10" text @click.stop="editModal = false"
            >Cancelar
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="#EF6C00"
            class="white--text"
            @click.stop="saveEditAssistance"
            >Guardar
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { getAllUser } from "../firebase/userMethods";
import firebase from "firebase";

export default {
  name: "AssistanceAdmin",
  data() {
    return {
      home: true,
      menu: false,
      menuModal: false,
      showSpinner: false,
      editModal: false,
      newAssistance: false,
      valid: true,
      search: "",
      viewName: "",
      idAssistanceEdit: "",
      editName: "",
      editDate: "",
      editHourBegin: "",
      editHourEnd: "",
      editObsv: "",
      userSelector: [],
      userCall: [],
      arrayAssistance: [],
      arrayExcel: [],
      headers: [
        { text: "Documento", value: "documento" },
        { text: "Nombres y Apellidos", value: "name", sortable: true },
        { text: "Fecha", value: "fecha" },
        { text: "Hora de Ingreso", value: "hourBegin" },
        { text: "Hora de Salida", value: "hourEnd" },
        { text: "Editar", value: "edit" },
      ],
      date: new Date().toISOString().substr(0, 10),
      initTime: moment("08:00", "HH:mm"),
      endTime: moment("18:00", "HH:mm"),
    };
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    },
  },
  async mounted() {
    await this.getDataUsers();
  },
  methods: {
    toHomeView() {
      this.home = true;
      this.date = new Date().toISOString().substr(0, 10);
      this.arrayAssistance = [];
      this.viewName = "";
    },
    async loadTableNewDate() {
      this.menu = false;
      this.arrayAssistance = [];
      this.showSpinner = true;
      if (this.viewName == "Selector")
        await this.loadTableAssistance(this.userSelector);
      else await this.loadTableAssistance(this.userCall);
    },
    async showViewCall() {
      this.home = false;
      this.showSpinner = true;
      this.viewName = "Reclutador";
      await this.loadTableAssistance(this.userCall);
    },
    async showViewSelector() {
      this.home = false;
      this.showSpinner = true;
      this.viewName = "Selector";
      await this.loadTableAssistance(this.userSelector);
    },
    async getDataUsers() {
      const data = await getAllUser();
      data.forEach((element) => {
        if (element.val().userRole == "Selector") {
          this.userSelector.push({
            id: element.key,
            name: element.val().name + " " + element.val().lastName,
            documento: element.val().DNI,
          });
        } else if (element.val().userRole == "Call") {
          this.userCall.push({
            id: element.key,
            name: element.val().name + " " + element.val().lastName,
            documento: element.val().DNI,
          });
        }
      });
    },
    async loadTableAssistance(arrayUser) {
      this.cleanArrayUser(arrayUser);
      const data = await this.getAssistanceByDay(this.date);
      data.forEach((element) => {
        let index = arrayUser.findIndex(
          (item) => item.id == element.val().IdUser
        );
        if (index != -1) {
          arrayUser[index].key = element.key;
          arrayUser[index].hourBegin = element.val().conectionHour;
          arrayUser[index].hourEnd = element.val().desconectionHour;
          if (element.val().hasOwnProperty("observacion"))
            arrayUser[index].obsv = element.val().observacion;
        }
      });
      this.createExcel(arrayUser);
      this.arrayAssistance = arrayUser;
      this.showSpinner = false;
    },
    async getAssistanceByDay(date) {
      const snapshot = await firebase
        .database()
        .ref("ASISTENCIA")
        .orderByChild("conectionDate")
        .equalTo(moment(date).format("YYYY/MM/DD"))
        .once("value");
      return snapshot;
    },
    cleanArrayUser(array) {
      array.forEach((element) => {
        element.fecha = moment(this.date).format("DD/MM/YYYY");
        element.hourBegin = "-";
        element.hourEnd = "-";
        element.obsv = "";
      });
    },
    checkHourEntry(value) {
      if (value != "-" && this.initTime.isBefore(moment(value, "HH:mm")))
        return "red";
      else return "white";
    },
    checkHourExit(value) {
      if (value != "-" && this.endTime.isAfter(moment(value, "HH:mm")))
        return "red";
      else return "white";
    },
    editAssistance(item) {
      if (item.hourBegin == "-") this.newAssistance = true;
      else this.newAssistance = false;
      this.idAssistanceEdit = item.key;
      this.idUserEdit = item.id;
      this.editName = item.name;
      this.editDate = moment(this.date).format("DD/MM/YYYY");
      this.editHourBegin = item.hourBegin;
      this.editHourEnd = item.hourEnd;
      this.editObsv = item.obsv;
      this.editModal = true;
    },
    async saveEditAssistance() {
      if (this.newAssistance) {
        dataAssistance = {
          IdUser: this.idUserEdit,
          conectionDate: moment(this.date).format("YYYY/MM/DD"),
          conectionHour: this.editHourBegin,
          desconectionDate: moment(this.date).format("YYYY/MM/DD"),
          desconectionHour: this.editHourEnd,
          observacion: this.editObsv.toUpperCase(),
        };
        let dataAssistance = JSON.parse(JSON.stringify(dataAssistance));
        const assistanceKey = firebase.database().ref("ASISTENCIA").push().key;
        firebase
          .database()
          .ref("ASISTENCIA")
          .child(assistanceKey)
          .set(dataAssistance);
      } else {
        await firebase
          .database()
          .ref("ASISTENCIA")
          .child(this.idAssistanceEdit)
          .update({
            conectionHour: this.editHourBegin,
            desconectionHour: this.editHourEnd,
            observacion: this.editObsv,
          });
      }
      await this.loadTableNewDate();
      this.editModal = false;
    },
    createExcel(array){
      array.forEach(element => {
        this.arrayExcel.push({
          "Nombre": element.name,
          "Fecha": element.fecha,
          "Hora-Inicio": element.hourBegin,
          "Hora-Fin":element.hourEnd,
          "Observaciones": element.obsv
        })
      });
    }
  },
};
</script>
<style>
.divProgress {
  margin-top: 100px;
}
.divImg {
  margin-bottom: 50px;
  margin-left: 50px;
  width: 60px;
  height: 60px;
}
.divImg2 {
  margin-bottom: 30px;
  margin-left: 50px;
  width: 80px;
  height: 80px;
}
</style>