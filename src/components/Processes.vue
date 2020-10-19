<template>
  <v-container>
    <h2 class="mb-3">Procesos de Selección</h2>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="10">
        <p class="mt-3 font-weight-bold">Filtros</p>
        <v-card cols="12">
          <v-row class="ml-2 mr-2">
            <v-col cols="4" sm="4" md="7" class="d-flex m-1">
              <label class="body-2 font-weight-bold mt-5 mr-3" sm="4" md="4"
                >Estado del Proceso:</label
              >
              <v-select
                :items="statusProcess"
                v-model="selectedStatus"
                @change="filterProcessByStatus(selectedStatus)"
                label="Seleccione"
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar por IGC"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="2" class="mt-6">
        <v-btn
          class="mt-8 text-capitalize"
          dark
          width="170"
          color="#EF6C00"
          v-promise-btn
          @click="callGetProcesses()"
        >
        cargar data
        </v-btn>
        <v-btn
          width="170"
          class="mt-4 text-capitalize"
          dark
          color="#2D9CDB"
          @click.stop="dialog = true"
        >
          <v-icon>add_circle_outline</v-icon>Crear Proceso
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="justify-space-between">
      <ModalCreateProcess v-model="dialog"  v-on:call-processes="callGetProcesses" />
      <!--****************Modal Editar / Cerrar Proceso **************** -->
      <v-dialog v-model="dialogEdit" persistent max-width="725px">
        <v-card>
          <v-card-title
            class="font-weight-bold justify-center"
            style="color:#00968F"
            :id="dataProcesoModalEditar.id"
          >
            <span v-if="ocultar"
              >Cerrar Proceso {{ dataProcesoModalEditar.nombreIgc }}</span
            >
            <span v-else
              >Editar Proceso {{ dataProcesoModalEditar.nombreIgc }}</span
            >
          </v-card-title>
          <div class="mx-4" style="border-bottom:2px solid #00B8AD"></div>
          <v-form ref="formEditProcess" v-model="validEdit">
            <v-card-text>
              <v-container>
                <p class="body-1 mt-2 font-weight-bold mb-10 mx-8">
                  Datos del proceso
                </p>
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 mb-2 mx-8">
                    <v-text-field
                      label="Nombre IGC:"
                      v-model="dataProcesoModalEditar.nombreIgc"
                      disabled
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="5" class="py-0 mb-2 mx-4">
                    <v-select
                      color="teal"
                      :items="itemModalidad"
                      v-model="dataProcesoModalEditar.modalidad"
                      label="Modalidad:"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      :disabled="ocultar"
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 mb-2 mx-8">
                    <v-text-field
                      class
                      label="Cuenta:"
                      v-model="dataProcesoModalEditar.cuenta"
                      disabled
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="5" class="py-0 mb-2 mx-4">
                    <v-select
                      :rules="[(v) => !!v || 'Campo requerido']"
                      :items="itemTurno"
                      v-model="dataProcesoModalEditar.turno"
                      label="Turno:"
                      :disabled="ocultar"
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 mb-2 mx-8">
                    <v-text-field
                      class
                      label="Servicio:"
                      v-model="dataProcesoModalEditar.servicio"
                      disabled
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" class="py-0 mb-2 mx-4">
                    <v-select
                      :rules="[(v) => !!v || 'Campo requerido']"
                      :items="itemTipoTrabajo"
                      v-model="dataProcesoModalEditar.tipoTrabajo"
                      label="Tipo de Trabajo:"
                      :disabled="ocultar"
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
                <!--*********************** Horario Proceso Editar**************************** -->
                <v-row>
                  <p class="ml-11 mt-2">Horario:</p>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                    <v-row>
                      <p class="body-1 text--secondary ml-3 mt-2">
                        Lunes - Viernes
                      </p>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0 mx-4">
                    <v-text-field
                      label="Inicio"
                      type="time"
                      v-model="
                        dataProcesoModalEditar.horarioProceso.inicioLunesViernes
                      "
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0">
                    <v-text-field
                      label="Fin"
                      type="time"
                      v-model="
                        dataProcesoModalEditar.horarioProceso.finLunesViernes
                      "
                      required
                      :disabled="ocultar"
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
                      v-model="dataProcesoModalEditar.diasFinSemanaPro"
                      :items="itemWeekend"
                      label="Fin de Semana"
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0 mx-4">
                    <v-text-field
                      label="Inicio"
                      type="time"
                      v-model="
                        dataProcesoModalEditar.horarioProceso.inicioFinSemana
                      "
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0">
                    <v-text-field
                      label="Fin"
                      type="time"
                      v-model="
                        dataProcesoModalEditar.horarioProceso.finFinSemana
                      "
                      required
                      :rules="[(v) => !!v || 'Campo requerido']"
                      :disabled="ocultar"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- ********************************************************** -->
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                    <v-menu
                      ref="dateStarProcesses"
                      v-model="dateeditStarProcesses"
                      :close-on-content-click="false"
                      color="teal"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <label
                          style="color: #4a4a4a !important;font-size: 12px !important;"
                          for
                          >Fecha de inicio del Proceso</label
                        >
                        <v-text-field
                          :value="dataProcesoModalEditar.fecInicioProceso"
                          :rules="[(v) => !!v || 'Campo requerido']"
                          prepend-inner-icon="event"
                          :disabled="ocultar"
                          color="teal"
                          dense
                          v-on="on"
                          class="py-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-PE"
                        color="teal"
                        no-title
                        v-model="dataProcesoModalEditar.fecInicioProceso"
                        @change="dateeditStarProcesses = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="12" md="5" class="py-0 mx-4">
                    <v-menu
                      ref="dateEndProcesses"
                      v-model="dateeditEndProcesses"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      color="teal"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <label
                          style="color: #4a4a4a !important;font-size: 12px !important;"
                          for
                          >Fecha de cierre del proceso</label
                        >
                        <v-text-field
                          :value="dataProcesoModalEditar.fecCierreProceso"
                          :rules="[(v) => !!v || 'Campo requerido']"
                          prepend-inner-icon="event"
                          :disabled="ocultar"
                          color="teal"
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-PE"
                        color="teal"
                        no-title
                        v-model="dataProcesoModalEditar.fecCierreProceso"
                        :rules="[(v) => !!v || 'Campo requerido']"
                        @change="dateeditEndProcesses = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                    <v-text-field
                      class
                      v-model="dataProcesoModalEditar.numPostulantes"
                      label="Número de postulantes:"
                      placeholder="50"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      :disabled="ocultar"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="5" class="py-0 mx-4">
                    <v-text-field
                      class
                      v-model="dataProcesoModalEditar.numReductor"
                      label="Número de reductor:"
                      placeholder="20"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      :disabled="ocultar"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <p class="body-1 ml-8 font-weight-bold">
                  Datos de capacitación
                </p>
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 mt-3 mx-8">
                    <label
                      class="py-0 my-0"
                      style="color: #4a4a4a !important;font-size: 12px !important;"
                      for
                      >Fecha de inicio</label
                    >
                    <v-menu
                      ref="dateCapProcesses"
                      v-model="dateeditCapProcesses"
                      color="teal"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      class="my-0 py-0"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="dataProcesoModalEditar.fecCapProceso"
                          prepend-inner-icon="event"
                          :disabled="ocultar"
                          color="teal"
                          v-bind="attrs"
                          v-on="on"
                          class="py-0 my-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-PE"
                        color="teal"
                        no-title
                        v-model="dataProcesoModalEditar.fecCapProceso"
                        @change="dateeditCapProcesses = false"
                        class="py-0 my-0"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="12" md="5" class="pt-2 mt-3 mx-4">
                    <v-select
                      class="pt-5"
                      v-model="dataProcesoModalEditar.modalidadCap"
                      :items="itemTipoTrabajo"
                      label="Modalidad:"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      :disabled="ocultar"
                      dense
                    ></v-select>
                  </v-col>
                </v-row>
                <!-- ********************Horario Capacitacion editar*************************** -->
                <v-row>
                  <p class="ml-11">Horario:</p>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="6" class="py-0">
                    <v-row>
                      <p class="body-1 text--secondary ml-11 mt-2">
                        Lunes - Viernes
                      </p>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0 mx-5">
                    <v-text-field
                      label="Inicio"
                      type="time"
                      v-model="
                        dataProcesoModalEditar.horarioCapacitacion
                          .inicioLunesViernes
                      "
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0">
                    <v-text-field
                      label="Fin"
                      type="time"
                      v-model="
                        dataProcesoModalEditar.horarioCapacitacion
                          .finLunesViernes
                      "
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 ml-8">
                    <v-select
                      class="body-2"
                      color="teal"
                      v-model="dataProcesoModalEditar.diasFinSemanaCap"
                      :items="itemWeekend"
                      label="Fin de Semana"
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0 ml-11">
                    <v-text-field
                      label="Inicio"
                      type="time"
                      v-model="
                        dataProcesoModalEditar.horarioCapacitacion
                          .inicioFinSemana
                      "
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0 mx-5">
                    <v-text-field
                      label="Fin"
                      type="time"
                      v-model="
                        dataProcesoModalEditar.horarioCapacitacion.finFinSemana
                      "
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- *************************************************************** -->
                <v-row>
                  <v-col cols="12" sm="12" md="5" class="py-0 mx-8">
                    <v-select
                      color="teal"
                      v-model="dataProcesoModalEditar.sedeCap"
                      :items="itemSede"
                      label="Sede:"
                      required
                      :disabled="ocultar"
                      :rules="[(v) => !!v || 'Campo requerido']"
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="5" class="py-0 mx-4">
                    <v-select
                      color="teal"
                      v-model="dataProcesoModalEditar.perfil"
                      :items="itemProfiles"
                      label="Perfil:"
                      required
                      :disabled="ocultar"
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
            <v-btn color="red darken-4" text @click="dialogEdit = false"
              >Cancelar</v-btn
            >
            <v-btn
              v-if="ocultar"
              color="orange"
              dark
              @click="dialogConfirmClose = true"
              >Cerrar Proceso</v-btn
            >
            <v-btn
              v-else
              color="orange darken-1"
              :disabled="!validEdit"
              class="text-uppercase white--text"
              @click="
                (dialogEdit = false),
                  updateProcess(),
                  (dialogConfirmEdit = true)
              "
              >Actualizar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogConfirmEdit" persistent max-width="450px">
        <v-card>
          <v-container>
            <v-row class="d-flex flex-row-reverse">
              <v-btn text @click="dialogConfirmEdit = false">
                <v-icon style="color:#B0B0B0">cancel</v-icon>
              </v-btn>
            </v-row>
            <v-row
              v-if="ocultar"
              class="font-weight-bold justify-center"
              style="color:#00968F"
            >
              <p class="text-uppercase tittle" style="font-size:22px">
                Proceso Cerrado
              </p>
            </v-row>
            <v-row
              v-else
              class="font-weight-bold justify-center"
              style="color:#00968F"
            >
              <p class="text-uppercase tittle" style="font-size:22px">
                Proceso Editado
              </p>
            </v-row>
            <v-row
              class="text--secondary text-center font-weight-bold px-4"
              style="font-size:18px"
            >
              <v-col>
                <p>
                  {{ dataProcesoModalEditar.cuenta }} -
                  {{ dataProcesoModalEditar.servicio }}
                </p>
                <p>IGC {{ dataProcesoModalEditar.nombreIgc }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- Modal confirmar cierre de proceso -->
      <v-dialog v-model="dialogConfirmClose" max-width="350">
        <v-card>
          <p class="px-4 pt-4 justify-center">
            ¿Estás seguro que deseas cerrar el proceso?
          </p>
          <v-card-actions class="justify-end">
            <div class="d-flex text-center">
              <v-btn
                class="font-weight-bold"
                color="teal"
                text
                @click="dialogConfirmClose = false"
                >No</v-btn
              >

              <v-btn
                class="font-weight-bold"
                color="teal"
                text
                @click="
                  (dialogConfirmClose = false),
                    (dialogEdit = false),
                    getPostulantesByIgc(dataProcesoModalEditar.id);
                  closeProcess(dataProcesoModalEditar.id),
                    (dialogConfirmEdit = true);
                "
                >Si</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row class="mx-2 mb-10 pb-10">
      <div class cols="12" sm="12" md="12" style="min-width:100">
        <div v-if="visiblePages.length > 0">
          <p class="ml-4 my-4 font-weight-bold">
            Lista de Procesos de Selección
          </p>
        </div>
        <v-row
          v-if="visiblePages.length > 0"
          cols="12"
          sm="12"
          md="12"
          class="d-flex mx-12"
          no-results-text
          hide-default-footer
        >
          <!--*******************************Cards Procesos*********************************** -->
          <v-card
            class=" card mx-2 pb-1 my-4"
            v-for="process in procesos"
            :key="process.id"
            :id="process.id"
            :search="search"
            :class="{ close: !process.estado }"
            width="235px"
          >
            <v-toolbar
              color="#00B8AD"
              dark
              class="toolbar text-uppercase"
              height="40px"
            >
              <v-toolbar-title
                v-if="process.estado"
                class="toolbar-title font-weight-bold"
                style="font-size:13px"
                >Activo
              </v-toolbar-title>
              <v-toolbar-title
                v-else
                class="toolbar-title font-weight-bold"
                style="font-size:13px"
                >Cerrado
              </v-toolbar-title>
            </v-toolbar>
            <v-row cols="12" class>
              <v-col cols="8" class="tittle ml-2">
                CUENTA:
                <v-row
                  v-if="process.estado"
                  style="font-size:13px"
                  class="ml-4 text--primary tittle"
                  >{{ process.cuenta }}</v-row
                >
                <v-row
                  v-else
                  class="ml-4 text--secondary"
                  style="font-size:13px"
                  >{{ process.cuenta }}</v-row
                >
              </v-col>
              <v-col cols="3" class="d-flex">
                <v-menu bottom left :disabled="!process.estado">
                  <template v-slot:activator="{ on, attrs }" class="">
                    <v-btn icon v-bind="attrs" v-on="on" class="ml-4">
                      <v-icon color="black">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list class="list-card">
                    <li>
                      <button
                        class="body-2 btn-list px-3"
                        @click="
                          ocultar = false;
                          openModalEdit(process);
                        "
                      >
                        Editar Proceso
                      </button>
                    </li>
                    <li>
                      <button
                        class="body-2 px-3"
                        @click="
                          ocultar = true;
                          openModalEdit(process);
                        "
                      >
                        Cerrar Proceso
                      </button>
                    </li>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
            <p
              class=" my-0 text--secondary tittle text-center"
              style="font-size:14px"
            >
              {{ process.servicio }}
            </p>
            <hr class="mx-4 mb-2" style="border: 0.5px solid #d4d4d4;  " />
            <v-progress-linear
              :color="changeColorByProgress(process.daysOfDifferencie, process)"
              class="progress"
              height="28"
              :value="
                Math.ceil(
                  (process.progress * 100) /
                    (process.numPostulantes + process.numReductor)
                )
              "
              style="border: 1px solid #d4d4d4;"
              :background-opacity="0"
            >
              <template v-slot="{}">
                <strong class="progress-bar">
                  Progreso
                  {{
                    Math.ceil(
                      (process.progress * 100) /
                        (process.numPostulantes + process.numReductor)
                    )
                  }}%
                </strong>
              </template>
            </v-progress-linear>
            <v-row class="mt-4 ml-3">
              <label class="font-weight-bold" style="font-size:12px"
                >IGC: {{ process.nombreIgc }}</label
              >
            </v-row>
            <v-row class="ml-3">
              <label class style="font-size:12px"
                >Modalidad: {{ process.modalidad }}</label
              >
            </v-row>
            <v-btn
              color="#00B8AD"
              dark
              class="text-capitalize btn-progress"
              @click="
                $router.push({
                  name: 'processDetails',
                  params: {
                    idProcess: process.id,
                    process: process,
                    igc: process.nombreIgc,
                  },
                })
              "
              >Ver más</v-btn
            >
          </v-card>
        </v-row>
        <v-row v-if="visiblePages == 0" class="ma-10">
          <v-alert
              class="my-10 px-5"
              text
              dense
              color="teal"
              icon="mdi-clock-fast"
              border="left"
            >
              No se encontraron procesos de selección activos ó cerrados...
            </v-alert>
          <v-container class="my-10">
            <v-row class="ma-10"> </v-row>
          </v-container>
        </v-row>
      </div>
    </v-row>
    <v-pagination class="mt-10" v-model="page" :length="10"> </v-pagination>
  </v-container>
</template>
<script>
/* import { secondary } from "../main.js"; */
import firebase from "firebase";
import moment from "moment";
import _ from "lodash";
import axios from "axios";

import ModalCreateProcess from "./ModalCreateProcess";
import LoginVue from "./Login.vue";


import {readAccounts, readServices } from "../firebase/accountServicesMethods.js";
/* import { getProfiles } from "../firebase/processMethods"; */
import { Datetime } from "vue-datetime";

/* import {
  getProfiles,
  getCompetencies,
  getCompetenciesByIds,
} from "../utils/competencies"; */


export default {
  components: {
    ModalCreateProcess
  },
  async created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.callGetProcesses();
    await this.initCuentas();
  },
  data() {
    return {
      page: 1,
      perPage: 16,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      valid: true,
      validEdit: true,
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,
      dialog: false,
      cerrar: false,
      cancel: false,
      ocultar: false,
      dialogEdit: false,
      dialogConfirmEdit: false,
      dialogConfirmClose: false,
      search: "",
      selectedStatus: "",
      collectionProcesses: "DATOS_PROCESO_IGC",
      dateStarProcesses: "",
      dateEndProcesses: "",
      dateCapProcesses: "",
      dateeditStarProcesses: "",
      dateeditEndProcesses: "",
      dateeditCapProcesses: "",
      menuDateStarProcesses: false,
      menuDateEndProcesses: false,
      menuDateCapProcesses: false,
      processes: [],
      countPostulantes: [],
      arrayEmails: [],
      statusProcess: ["TODOS", "ABIERTO", "CERRADO"],
      itemTurno: ["Mañana", "Tarde", "Mañana/Tarde", "Madrugada"],
      itemTipoTrabajo: ["Presencial", "Presencial/Teletrabajo", "Teletrabajo"],
      numPostByProcess: null,
      progressClose: 100,
      addProcess: {},
      dataProcesoModalEditar: {
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
      dataCuentas: [],
      dataServicios: [],
      itemServicio: [],
      itemCuenta: [],
      itemSede: [
        "Carabaya",
        "Chiclayo",
        "Crillon",
        "Fénix",
        "Lima Cargo",
        "Surquillo",
      ],
      itemModalidad: ["Full Time", "Part Time", "Full Time/Part time"],
      itemWeekend: ["Sábado", "Domingo", "Sábado y Domingo"],
      itemProfiles: [],
    };
  },
  computed: {
    visiblePages() {
      return this.processes.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
    procesos() {
      return this.visiblePages.filter((process) => {
        return process.nombreIgc
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.callProfiles();
    this.callGetProcesses();
  },
  methods: {
    createProfiles() {
      let profiles = getProfiles();
      let listProfiles = [];
      listProfiles = profiles.map((profile) => ({
        name: profile.name,
        competencies: getCompetenciesByIds(profile.competencies),
      }));
      console.log("aqui");
      console.log(listProfiles);
      listProfiles.forEach((profile) => {
        const key = firebase
          .database()
          .ref("PROFILES")
          .push().key;
        firebase
          .database()
          .ref("PROFILES")
          .child(key)
          .set(profile);
      });
    },
    callProfiles() {
      this.itemProfiles = getProfiles();
    },
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
    async callGetProcesses() {
      this.processes = await this.getProcesses();
    },
    async getProcesses() {
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref(this.collectionProcesses);
      const snapshot = await ref.orderByChild("cuenta").once("value");
      let processes = [];
      let totalProcess = [];
      let id = "";
      snapshot.forEach((element) => {
        const [p] = this.countPostulantesByIgc(element.val(), element.key);
        const daysOfDifferencie = this.calculateDaysOfDifferencie(
          element.val().fecCierreProceso
        );
        processes.push({ ...p, daysOfDifferencie });
      });
      return processes;
    },
    calculateDaysOfDifferencie(fecCierreProceso) {
      const fechaCierre = moment(fecCierreProceso);
      const fechaActual = moment(new Date());
      const daysOfDifferencie = fechaCierre.diff(fechaActual, "days");
      return daysOfDifferencie;
    },
    changeColorByProgress(numDays, process) {
      const { progress, numPostulantes, numReductor, estado } = process;
      const progressPercent = Math.ceil(
        (progress * 100) / (numPostulantes + numReductor)
      );
      if (!estado) {
        return "#D0D0D0";
      } else {
        if (progressPercent >= 100) {
          return "#81F2D0";
        } else {
          if (numDays >= 7) {
            return "#6DD400";
          } else if (numDays >= 3 && numDays < 7) {
            return "#FFD100";
          } else if (numDays >= 0 && numDays <= 2) {
            return "orange";
          } else if (numDays < 0) {
            return "#ff0037";
          }
        }
      }
    },
    countPostulantesByIgc(data, id) {
      let dataTotal = [];
      let applicants = [];
      let dataProcesses = [];
      let progress = 0;
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("EVALUACION_PROGRAMADA");
      ref
        .orderByChild("IGC")
        .equalTo(data.nombreIgc)
        .on("value", function(dataSnapshot) {
          dataSnapshot.forEach((element) => {
            applicants.push(element.val());
          });
        });
      ref
        .orderByChild("id_igc")
        .equalTo(id)
        .on("value", function(dataSnapshot) {
          dataSnapshot.forEach((element) => {
            applicants.push(element.val());
          });
          progress = _.filter(applicants, ["estado", "APTO"]).length;
          dataProcesses.push({ progress, ...data });
        });
      return dataProcesses;
    },
    openModalEdit(process) {
      /* console.log(process); */
      this.dialogEdit = true;
      this.dataProcesoModalEditar = Object.assign({}, process);
    },
    updateProcess() {
      this.dataProcesoModalEditar.numPostulantes = parseInt(
        this.dataProcesoModalEditar.numPostulantes
      );
      this.dataProcesoModalEditar.numReductor = parseInt(
        this.dataProcesoModalEditar.numReductor
      );
      delete this.dataProcesoModalEditar.progress;
      firebase
        .database()
        .ref(this.collectionProcesses)
        .child(this.dataProcesoModalEditar.id)
        .update({
          ...this.dataProcesoModalEditar,
        });
      this.callGetProcesses();
    },
    closeProcess(id) {
      let process = this.processes.find((p) => p.id === id);
      process.estado = !process.estado;
      firebase
        .database()
        .ref(this.collectionProcesses)
        .child(process.id)
        .update({
          estado: process.estado,
        });
    },
    async filterProcessByStatus(selectedStatus) {
      await this.callGetProcesses();
      if (selectedStatus === "ABIERTO") {
        this.processes = this.processes.filter(
          (process) => process.estado === true
        );
      }
      if (selectedStatus === "CERRADO") {
        this.processes = this.processes.filter(
          (process) => process.estado === false
        );
      }
      if (selectedStatus === "TODOS") {
        this.processes;
      }
    },
    getPostulantesByIgc(id) {
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("EVALUACION_PROGRAMADA");
      /* Postulantes por IGC : props*/
      ref
        .orderByChild("id_igc")
        .equalTo(id)
        .on("value", this.uploadPostulantes);
    },
    uploadPostulantes(data) {
      let postulantesByIgc = [];
      let postulantes = [];
      let numPostulantes = 0;
      data.forEach((element) => {
        postulantes.push({ ...element.val() });
      });
      /* Postulantes por IGC en estado APTO */
      postulantesByIgc = _.filter(postulantes, ["estado", "APTO"]);
      numPostulantes = postulantesByIgc.length;
      postulantesByIgc.map(async (p) => {
        this.setEmails(p.correo, numPostulantes);
      });
    },
    async setEmails(correo, numPostulantes) {
      this.arrayEmails.push(correo);
      if (numPostulantes === this.arrayEmails.length) {
        this.sendEmails(this.arrayEmails);
      }
    },
    sendEmails(array) {
      let dataEmails = {
        arrayEmails: array,
        ...this.dataProcesoModalEditar,
      };
      dataEmails = JSON.parse(JSON.stringify(dataEmails));
      const procesoKey = firebase
        .database()
        .ref("FORMACION")
        .push().key;
      firebase
        .database()
        .ref("FORMACION")
        .child(procesoKey)
        .set(dataEmails);
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  border-radius: 4%;
  overflow: hidden;
}
.progress {
  margin-left: 10px;
  align-content: center;
  align-self: center;
  width: 92%;
}
.progress-bar {
  font-size: 11px;
  color: #515151;
  font-weight: 400;
}
.list-card {
  list-style: none;
  li {
    button {
      outline: none;
    }
  }
}
.btn-progress {
  margin: 10px;
  width: 214px;
}

.tittle {
  font-size: 15px;
  font-weight: 600;
}

.closet {
  background: rgba(141, 255, 248, 0.33) !important;
  padding: 8px 6px;
}
.close {
  background: #ebebebe7 !important;
  color: #6e6e6ef7 !important;
}
.toolbar {
  display: flex;
  box-shadow: none !important;

  .toolbar-title {
    display: flex;
    padding: 0px 75px;
  }
}
</style>
