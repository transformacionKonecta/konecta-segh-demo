<template>
  <v-container>
    <h2 class="mb-5">Referidos</h2>
    <v-divider></v-divider>
    <v-row class="mt-5">
      <a class="subtitle-1 font-weight-bold" @click="$router.go(-1)">
        <v-icon class="px-2">mdi-arrow-left</v-icon>Regresar
      </a>
    </v-row>
    <v-row class="my-5">
      <v-col cols="8" sm="8" md="8">
        <v-card class="pa-5">
          <v-row class="mx-2">
            <v-icon color="#00968f" class="">people</v-icon>
            <h5 class="font-weight-bold py-0 mt-1 pl-2" style="color: #00968f">
              Carga de Referidos Masivo
            </h5>
          </v-row>
          <div class="mx-1" style="border-bottom:2px solid #00B8AD"></div>
          <v-form ref="formReferralsMassive">
            <v-row class="mt-7">
              <v-col cols="9" sm="9" md="9">
                <v-file-input
                  v-model="files"
                  color="teal accent-4"
                  counter
                  accept="*.xls, *.xlsx"
                  label="Archivo"
                  placeholder="Selecciona el archivo"
                  outlined
                  :show-size="1000"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-orange lighten-1"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} Archivo
                    </span>
                  </template>
                </v-file-input>
              </v-col>
              <v-col class="mt-2" cols="3" sm="3" md="3">
                <v-btn
                  class="text-capitalize"
                  color="#EF6C00"
                  v-promise-btn
                  dark
                  width="120"
                  @click="uploadFile"
                  ><v-icon>get_app</v-icon> Importar</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="4" sm="4" md="4">
        <v-card class="pa-5">
          <v-row class="mx-2">
            <v-icon color="#00968f" class="">person</v-icon>
            <h5 class="font-weight-bold py-0 mt-1" style="color: #00968f">
              Referido Individual
            </h5>
          </v-row>
          <div class="mx-1" style="border-bottom:2px solid #00B8AD"></div>
          <v-form ref="formReferralsMassive">
            <v-card-text>
              <v-row class="mt-2">
                Si deseas enviar invitación a un solo referido ingresa sus
                datos.
              </v-row>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-btn
              class="mx-10 pa-2"
              color="#EF6C00"
              dark
              width="205"
              @click="dialogInvitation = true"
              ><v-icon>email</v-icon>Enviar Invitación</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col cols="5" sm="5" md="5">
        <v-card class="pa-3">
          <v-row class="mx-2">
            <h5
              class="text-center font-weight-bold py-0 mt-1 pl-2"
              style="color: #00968f"
            >
              Historico de Referidos
            </h5>
          </v-row>
          <div class="ma-2" style="border-bottom:2px solid #00B8AD"></div>
          <v-data-table
            :headers="headers"
            :items="referrals"
            :search="search"
            :sort-by="['name']"
          >
            <template v-slot:item.actions="{ item }">
              <v-row>
                <v-col>
                  <v-img
                    @click="
                      $router.push({
                        name: 'referralsDetails',
                        params: {
                          data: item.referidos,
                        },
                      })
                    "
                    width="15"
                    src="../assets/excel.svg"
                  >
                  </v-img>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="7" sm="7" md="7">
        <v-card class="pa-3">
          <v-row class="mx-2">
            <h5
              class="text-center font-weight-bold py-0 mt-1 pl-2"
              style="color: #00968f"
            >
              Historico de Referidos Individual
            </h5>
          </v-row>
          <div class="ma-2" style="border-bottom:2px solid #00B8AD"></div>
          <v-data-table
            class="mx-10"
            :headers="headersIndividuals"
            :items="individuals"
            :search="search"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!--***************************** Modal Enviar invitación **************************** -->
    <v-dialog v-model="dialogInvitation" persistent max-width="400px">
      <v-card class="py-10">
        <v-card-title
          class="font-weight-bold justify-center"
          style="color: #00968f"
        >
          <span>Registrar datos del Referido</span>
        </v-card-title>
        <div class="mb-4 mx-4" style="border-bottom:2px solid #00B8AD"></div>
        <v-form ref="formService">
          <v-card-text>
            <v-row class="ma-6">
              <v-col cols="12" sm="12" md="12" class="py-0">
                <v-text-field
                  class="py-0 my-0"
                  label="Nombres y Apellidos:"
                  v-model="fullName"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-6">
              <v-col cols="12" sm="12" md="12" class="py-0">
                <v-text-field
                  class="py-0 my-0"
                  label="Documento de Identidad:"
                  v-model="document"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-6">
              <v-col cols="12" sm="12" md="12" class="py-0">
                <v-text-field
                  class="py-0 my-0"
                  label="Correo electrónico:"
                  v-model="email"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-card-actions class="mx-10 my-5">
          <v-btn
            class="mx-10 pa-2"
            color="#EF6C00"
            dark
            width="205"
            @click="sendInvitation()"
            ><v-icon>email</v-icon>Enviar Invitación</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ****************************** Modal Confirm Invitación ***************************** -->
    <v-dialog v-model="dialogConfirm" persistent max-width="450px">
      <v-card class="pa-5">
        <v-row class="d-flex flex-row-reverse">
          <v-btn text @click="callReferralsIndividuals();dialogConfirm = false">
            <v-icon style="color:#B0B0B0">cancel</v-icon>
          </v-btn>
        </v-row>
        <v-container class="my-10 mx-2">
          <v-row class="font-weight-bold justify-center" style="color:#00968F">
            <h3 class="mb-5 tittle">
              Se envió invitación exitosamente
            </h3>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { convertExcelToJson } from "../utils/convertExcel.js";
import {
  createRegisterReferrals,
  readReferrals,
  createRegisterReferralsIndividual,
  readReferralsIndividuals,
} from "../firebase/uploadExcelMethods";

import moment from "moment";

export default {
  data() {
    return {
      files: [],
      referrals: [],
      individuals: [],
      headers: [
        {
          text: "Fecha",
          align: "start",
          sortable: true,
          value: "fechaCarga",
        },
        { text: "Nombre de Archivo", value: "nombreArchivo" },
        {
          text: "Archivo",
          align: "start",
          value: "actions",
          sortable: false,
        },
      ],
      headersIndividuals: [
        {
          text: "Nombres y Apellidos",
          align: "start",
          sortable: true,
          value: "nombresApellidos",
        },
        {
          text: "Documento",
          align: "start",
          sortable: true,
          value: "documento",
        },
        {
          text: "Correo Electrónico",
          align: "start",
          sortable: true,
          value: "correo",
        },
      ],
      dialogInvitation: false,
      dialogConfirm: false,
      search: "",
      email: "",
      document: "",
      fullName: "",
    };
  },
  async created() {
    await this.callReferralMassive();
    await this.callReferralsIndividuals();
  },
  methods: {
    async uploadFile() {
      console.log(this.files);
      const dataJson = await convertExcelToJson(this.files);
      console.log("JSON EXCEL", dataJson);
      const hoy = moment();
      const fechaActual = moment(hoy).format("D/M/YYYY");
      const horaActual = moment(hoy).format("HH:mm:ss");

      const dataCarga = {
        fechaCarga: fechaActual,
        horaCarga: horaActual,
        referidos: dataJson,
        nombreArchivo: this.files.name,
      };
      createRegisterReferrals(dataCarga);
      await this.callReferralMassive();
      this.files = [];
    },
    async callReferralMassive() {
      this.referrals = await readReferrals();
    },
    async callReferralsIndividuals() {
      this.individuals = await readReferralsIndividuals();
    },
    async sendInvitation() {
      this.dialogInvitation = false;

      const dataRefIndividual = {
        nombresApellidos: this.fullName,
        correo: this.email,
        documento: this.document,
      };
      createRegisterReferralsIndividual(dataRefIndividual);
      this.dialogConfirm = true;
      await this.callReferralsIndividuals();
    },
  },
};
</script>
