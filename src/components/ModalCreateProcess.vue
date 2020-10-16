<template>
  <v-row>
    <v-dialog v-model="show" persistent max-width="740px">
    <v-card>
      <v-card-title
        class="font-weight-bold justify-center"
        style="color:#00968F"
      >
        <span style="color:#00B8AD">Crear Proceso de Selección</span>
      </v-card-title>
      <div class="mx-4" style="border-bottom:2px solid #00B8AD"></div>
      <v-form ref="formCreateProcess" v-model="validCreate">
        <v-card-text>
          <v-container>
            <p class="body-1 font-weight-bold mb-2 ml-8">
              Datos del proceso
            </p>
            <v-row class="my-0">
              <v-col cols="12" sm="12" md="5" class="py-0 mt-4 mx-8">
                <v-text-field
                  class="py-0 my-0"
                  label="Nombre IGC:"
                  v-model="dataProceso.nombreIgc"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-6 mt-4">
                <v-select
                  color="teal"
                  :items="itemModalidad"
                  v-model="dataProceso.modalidad"
                  label="Modalidad:"
                  :rules="[(v) => !!v || 'Campo requerido']"
                  hide-details
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="pb-4 mx-8">
                <v-autocomplete
                  color="teal"
                  :items="itemCuenta"
                  v-model="dataProceso.cuenta"
                  label="Cuenta:"
                  @change="changeServicio()"
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  hide-details
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="5" class="pb-2 mx-6">
                <v-select
                  :rules="[(v) => !!v || 'Campo requerido']"
                  :items="itemTurno"
                  v-model="dataProceso.turno"
                  label="Turno:"
                  dense
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-8 mt-4">
                <v-autocomplete
                  color="teal"
                  :items="itemServicio"
                  v-model="dataProceso.servicio"
                  label="Servicio:"
                  :rules="[(v) => !!v || 'Campo requerido']"
                  hide-details
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="5" class="py-0 mx-6 mt-4">
                <v-select
                  color="teal"
                  v-model="dataProceso.tipoTrabajo"
                  :items="itemTipoTrabajo"
                  label="Tipo de Trabajo"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <p class="ml-11">Horario:</p>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                <v-row>
                  <p class="body-1 text--secondary ml-3 mt-2">
                    Lunes - Viernes
                  </p>
                </v-row>
              </v-col>
              <v-col cols="12" sm="12" md="2" class="py-0 mx-6 mt-2">
                <v-text-field
                  label="Inicio"
                  type="time"
                  v-model="dataProceso.horarioProceso.inicioLunesViernes"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2" class="py-0 mt-2">
                <v-text-field
                  label="Fin"
                  type="time"
                  v-model="dataProceso.horarioProceso.finLunesViernes"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                <v-select
                  class="body-2"
                  color="teal"
                  v-model="dataProceso.diasFinSemanaPro"
                  :items="itemWeekend"
                  label="Fin de Semana"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="2" class="py-0 mx-6">
                <v-text-field
                  label="Inicio"
                  type="time"
                  v-model="dataProceso.horarioProceso.inicioFinSemana"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2" class="py-0">
                <v-text-field
                  label="Fin"
                  type="time"
                  v-model="dataProceso.horarioProceso.finFinSemana"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                <label for>Fecha de inicio</label>
                <v-menu
                  v-model="menuDateStarProcesses"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="py-0 my-0"
                      prepend-inner-icon="event"
                      readonly
                      v-on="on"
                      :value="computedDateStarFormattedMomentjs"
                      color="teal"
                      @click:clear="dateStarProcesses = null"
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="es-PE"
                    color="teal"
                    no-title
                    v-model="dateStarProcesses"
                    @change="menuDateStarProcesses = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-6">
                <label for>Fecha de cierre del proceso</label>
                <v-menu
                  v-model="menuDateEndProcesses"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="py-0 my-0"
                      prepend-inner-icon="event"
                      readonly
                      v-on="on"
                      :value="computedDateEndFormattedMomentjs"
                      color="teal"
                      @click:clear="dateEndProcesses = null"
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="es-PE"
                    color="teal"
                    no-title
                    v-model="dateEndProcesses"
                    @change="menuDateEndProcesses = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="py-1 mx-8">
                <v-text-field
                  class
                  v-model="dataProceso.numPostulantes"
                  label="Número de postulantes:"
                  :rules="[(v) => !!v || 'Campo requerido']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="5" class="py-1 mx-6">
                <v-text-field
                  class
                  v-model="dataProceso.numReductor"
                  label="Número de reductor:"
                  :rules="[(v) => !!v || 'Campo requerido']"
                ></v-text-field>
              </v-col>
            </v-row>
            <p class="body-1 font-weight-bold my-5 ml-8">
              Datos de capacitación
            </p>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="py-0 mt-2 mx-8">
                <label for>Fecha de inicio del proceso</label>
                <v-menu
                  v-model="menuDateCapProcesses"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="py-0 my-0"
                      prepend-inner-icon="event"
                      readonly
                      v-on="on"
                      :value="computedDateCapFormattedMomentjs"
                      color="teal"
                      @click:clear="dateCapProcesses = null"
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="es-PE"
                    color="teal"
                    no-title
                    v-model="dateCapProcesses"
                    @change="menuDateCapProcesses = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="5" class="py-0 mt-8 mx-6">
                <v-select
                  color="teal"
                  :items="itemTipoTrabajo"
                  v-model="dataProceso.modalidadCap"
                  label="Modalidad:"
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <p class="ml-11 mt-5">Horario:</p>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" offset-md="1" class="py-0 mx-8">
                <v-row>
                  <p class="body-1 text--secondary ml-3 mt-2">
                    Lunes - Viernes
                  </p>
                </v-row>
              </v-col>
              <v-col cols="12" sm="12" md="2" class="py-0 ml-5">
                <v-text-field
                  label="Inicio"
                  type="time"
                  v-model="dataProceso.horarioCapacitacion.inicioLunesViernes"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2" class="py-0">
                <v-text-field
                  label="Fin"
                  type="time"
                  v-model="dataProceso.horarioCapacitacion.finLunesViernes"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                <v-select
                  class="body-2"
                  color="teal"
                  v-model="dataProceso.diasFinSemanaCap"
                  :items="itemWeekend"
                  label="Fin de Semana"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="2" class="py-0 ml-5">
                <v-text-field
                  label="Inicio"
                  type="time"
                  v-model="dataProceso.horarioCapacitacion.inicioFinSemana"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2" class="py-0">
                <v-text-field
                  label="Fin"
                  type="time"
                  v-model="dataProceso.horarioCapacitacion.finFinSemana"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                <v-select
                  color="teal"
                  v-model="dataProceso.sedeCap"
                  :items="itemSede"
                  label="Sede:"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="5" class="py-0 mx-6">
                <v-select
                  color="teal"
                  v-model="dataProceso.perfil"
                  :items="itemProfiles"
                  label="Perfil:"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-4"
          text
          @click="
            cleanFormCreate();
          "
          @click.stop="show=false"
          >Cancelar</v-btn
        >
        <v-btn
          :disabled="!validCreate"
          class="text-uppercase white--text px-8"
          color="orange darken-1"
          @click="saveProcess()"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogConfirmAdd" persistent max-width="450px">
        <v-card>
          <v-container>
            <v-row class="d-flex flex-row-reverse">
              <v-btn
                text
                @click="$emit('call-processes')
                  dialogConfirmAdd = false;
                "
              >
                <v-icon style="color:#B0B0B0">cancel</v-icon>
              </v-btn>
            </v-row>
            <v-row
              class="font-weight-bold justify-center"
              style="color:#00968F"
            >
              <p class="text-uppercase tittle" style="font-size:22px">
                Proceso Creado Exitosamente
              </p>
            </v-row>
            <v-row
              class="text--secondary text-center font-weight-bold px-4"
              style="font-size:18px"
            >
              <v-col>
                <p>
                  {{ addProcess.cuenta }} -
                  {{ addProcess.servicio }}
                </p>
                <p>IGC {{ addProcess.nombreIgc }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>
import firebase from "firebase";
import moment from "moment";

import {readAccounts, readServices } from "../firebase/accountServicesMethods.js";
import { getProfiles } from "../firebase/processMethods";
export default {
  name: "ModalCreateProcess",
  props: {
    value: Boolean,
  },
  data() {
    return {
      collectionProcesses: "DATOS_PROCESO_IGC",
      dataProceso: {
        estado: true,
        nombreIgc: "",
        cuenta: "",
        servicio: "",
        modalidad: "",
        turno: "",
        horarioProceso: {
          inicioLunesViernes: "",
          finLunesViernes: "",
          inicioFinSemana: "",
          finFinSemana: "",
        },
        horarioCapacitacion: {
          inicioLunesViernes: "",
          finLunesViernes: "",
          inicioFinSemana: "",
          finFinSemana: "",
        },
        diasFinSemanaPro: "",
        diasFinSemanaCap: "",
        tipoTrabajo: "",
        modalidadCap: "",
        fecInicioProceso: "",
        fecCierreProceso: "",
        fecCapProceso: "",
        numPostulantes: null,
        numReductor: null,
        sedeCap: "",
        perfil: "",
      },
      menuDateStarProcesses: false,
      menuDateEndProcesses: false,
      menuDateCapProcesses: false,
      dialogConfirmAdd: false,
      dateStarProcesses: "",
      dateEndProcesses: "",
      dateCapProcesses: "",
      itemSede: [
        "Carabaya",
        "Chiclayo",
        "Crillon",
        "Fénix",
        "Lima Cargo",
        "Surquillo",
      ],
      dataCuentas: [],
      dataServicios: [],
      itemServicio: [],
      itemCuenta: [],
      itemTurno: ["Mañana", "Tarde", "Mañana/Tarde", "Madrugada"],
      itemTipoTrabajo: ["Presencial", "Presencial/Teletrabajo", "Teletrabajo"],
      itemModalidad: ["Full Time", "Part Time", "Full Time/Part time"],
      itemWeekend: ["Sábado", "Domingo", "Sábado y Domingo"],
      itemProfiles: [],
      addProcess: {},
      validCreate: true
    };
  },
  created() {
    this.initCuentas();
    this.callProfiles();
  },
  mounted() {
    this.callProfiles();
  },
  computed:{
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    computedDateStarFormattedMomentjs() {
    return this.dateStarProcesses
      ? moment(this.dateStarProcesses).format("DD/MM/YYYY")
      : "";
    },
    computedDateEndFormattedMomentjs() {
      return this.dateEndProcesses
        ? moment(this.dateEndProcesses).format("DD/MM/YYYY")
        : "";
    },
    computedDateCapFormattedMomentjs() {
      return this.dateCapProcesses
        ? moment(this.dateCapProcesses).format("DD/MM/YYYY")
        : "";
    },
  },
  methods: {
    async initCuentas() {
      this.dataCuenta = await readAccounts();
      this.dataServicios = await readServices();
      this.dataCuenta.forEach((element) => {
        this.itemCuenta.push(element.nombreCuenta);
      });
      this.dataServicios.forEach((element) => {
        this.itemServicio.push(element.nombreServicio);
      });
    },
    changeServicio() {
      let idCuenta = 0;
      this.itemServicio = [];
      this.dataCuenta.forEach((element) => {
        if (element.nombreCuenta === this.dataProceso.cuenta) idCuenta = element.idCuenta;
      });
      this.dataServicios.forEach((element) => {
        if (element.idCuenta === idCuenta) this.itemServicio.push(element.nombreServicio);
      });
    },
    callProfiles() {
      this.itemProfiles = getProfiles();
    },
    saveProcess() {
      this.dataProceso.numPostulantes = parseInt(
        this.dataProceso.numPostulantes
      );
      this.dataProceso.numReductor = parseInt(this.dataProceso.numReductor);
      (this.dataProceso.fecInicioProceso = this.dateStarProcesses),
        (this.dataProceso.fecCierreProceso = this.dateEndProcesses),
        (this.dataProceso.fecCapProceso = this.dateCapProcesses),
        (this.addProcess = {
          nombreIgc: this.dataProceso.nombreIgc,
          servicio: this.dataProceso.servicio,
          cuenta: this.dataProceso.cuenta,
        });
      const procesoKey = firebase
        .database()
        .ref(this.collectionProcesses)
        .push().key;
      firebase
        .database()
        .ref(this.collectionProcesses)
        .child(procesoKey)
        .set({
          ...this.dataProceso,
          id: procesoKey,
        });
      this.cleanFormCreate();
      this.show = false;
      this.dialogConfirmAdd = true;
      this.$emit('call-processes');
    },
    cleanFormCreate() {
      this.$refs.formCreateProcess.reset();
    },
  },
};
</script>
