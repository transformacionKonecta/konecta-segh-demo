<template>
  <v-container>
    <v-row>
      <v-col class="mb-2 pb-0">
        <h1 class="headline font-weight-bold mb-3">Perfil del Postulante</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <a class="teal--text subtitle-1 font-weight-bold" @click="$router.go(-1)">
        <v-icon>keyboard_arrow_left</v-icon>Regresar
      </a>
    </v-row>
    <v-row class="pt-6 mx-6">
      <v-card width="900" class="mx-10" outlined>
        <v-row class="py-2 justify-space-between px-10 pt-12">
          <p class="title black--text mb-1">{{ lista.Nombres }}</p>
          <p class="title black--text mb-0">
            N° Doc: {{ lista.informacionPersonal[0].datosPersonales.numdoc }}
          </p>

          <v-btn
            class="mb-1 text-capitalize white--text"
            color="#FB8C00"
            v-bind:href="lista.meetLink"
            target="_blank"
          >
            <v-icon left>videocam</v-icon>Ir a video conferencia
          </v-btn>
        </v-row>
        <div class="mb-5 mx-1" style="border-bottom:1px solid #00B8AD"></div>
        <v-tabs background-color="white" class="pt-4 px-1" :grow="true">
          <v-tab class="text-capitalize px-0">
            <v-icon class="mr-1 iconTab">school</v-icon>
            Datos Personales
            <p class="text-lowercase mt-4 px-1">y</p>
            Experiencia</v-tab
          >
          <v-tab class="text-capitalize px-14">
            <v-icon class="mr-1 iconTab">perm_contact_calendar</v-icon
            >Disponibilidad
          </v-tab>
          <v-tab
            class="text-capitalize px-14"
            @click="
              getProfileByName(dataSelectedIgc[0], dataSelectedIgc[0].perfil)
            "
          >
            <v-icon class="mr-1 iconTab"> assignment_turned_in</v-icon
            >Evaluación</v-tab
          >
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p class="body-1 text--primary font-weight-bold mt-3 mb-1 ml-4">
                  Datos Personales
                </p>
                <v-row class="mx-2">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      hide-details
                      v-model="
                        lista.informacionPersonal[0].datosPersonales
                          .nombre_social
                      "
                      label="Nombre Social:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      v-model="
                        lista.informacionPersonal[0].datosPersonales
                          .estado_civil
                      "
                      hide-details
                      label="Estado Civil:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      v-model="
                        lista.informacionPersonal[0].datosPersonales.fecha_nac
                      "
                      hide-details
                      label="Fecha de Nacimiento:"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-2">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      v-model="
                        lista.informacionPersonal[0].datosPersonales.genero
                      "
                      hide-details
                      label="Género:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      v-model="
                        lista.informacionPersonal[0].datosPersonales.n_hijos
                      "
                      hide-details
                      label="Número de Hijos:"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <p class="body-1 text--primary font-weight-bold mt-5 mb-2 ml-4">
                  Datos de Formación
                </p>
                <v-row class="mx-2">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      hide-details
                      v-model="
                        lista.datosFormacion[0].datosFormacion.grado_formacion
                      "
                      label="Grado de Formación:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      v-model="
                        lista.datosFormacion[0].datosFormacion.institucion
                      "
                      hide-details
                      label="Institución:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      v-model="
                        lista.datosFormacion[0].datosFormacion.estado_estudios
                      "
                      hide-details
                      label="Estado de estudio:"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-2">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      v-model="
                        lista.datosFormacion[0].datosFormacion.horario_estudio
                      "
                      hide-details
                      label="Horario de estudio:"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <p
                  class="body-1 text--primary font-weight-bold  mt-5 mb-2 ml-4"
                >
                  Datos de Experiencia
                </p>
                <div
                  v-for="(item, index) in lista.datosExperiencia"
                  v-bind:key="item.id"
                >
                  <v-row>
                    <p
                      class="subtitle-2 font-weight-bold pl-3 teal--text mb-1 mx-4 pt-2 pb-0"
                    >
                      Experiencia N° {{ index + 1 }}
                    </p>
                  </v-row>
                  <v-row
                    class="mb-10 mx-2"
                    v-if="item.datosExperiencia.flag_se !== '1'"
                  >
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-if="item.datosExperiencia.flag_ec == 1"
                        hide-details
                        value="Call Center"
                        label="Tipo de Experiencia:"
                      ></v-text-field>
                      <v-text-field
                        v-else
                        value="Otro rubro"
                        hide-details
                        label="Tipo de Experiencia:"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-if="item.datosExperiencia.ec_empresa"
                        v-model="item.datosExperiencia.ec_empresa"
                        hide-details
                        label="Empresa:"
                      ></v-text-field>
                      <v-text-field
                        readonly
                        v-if="item.datosExperiencia.eo_empresa"
                        v-model="item.datosExperiencia.eo_empresa"
                        hide-details
                        label="Empresa:"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-model="item.datosExperiencia.ec_cliente"
                        hide-details
                        label="Cliente:"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-model="item.datosExperiencia.ec_segmento"
                        hide-details
                        label="Segmento:"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-if="item.datosExperiencia.ec_rubro_cliente"
                        v-model="item.datosExperiencia.ec_rubro_cliente"
                        hide-details
                        label="Rubro del Cliente:"
                      ></v-text-field>
                      <v-text-field
                        readonly
                        v-if="item.datosExperiencia.eo_rubro_empresa"
                        v-model="item.datosExperiencia.eo_rubro_empresa"
                        hide-details
                        label="Rubro de la empresa:"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div v-if="item.datosExperiencia.ec_tiempo_exp">
                        <v-text-field
                          readonly
                          v-model="item.datosExperiencia.ec_tiempo_exp"
                          hide-details
                          label="Tiempo de Experiencia (Meses):"
                        ></v-text-field>
                      </div>
                      <div v-if="item.datosExperiencia.eo_tiempo_exp">
                        <v-text-field
                          readonly
                          v-model="item.datosExperiencia.eo_tiempo_exp"
                          hide-details
                          label="Tiempo de Experiencia (Meses):"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="mb-10 mx-2" v-else>
                    <v-col cols="12" sm="12" md="12" class="py-0">
                      <p>No cuenta con experiencia</p>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- Disponibilidad -->
          <v-tab-item>
            <v-form>
              <div class="ml-8">
                <v-row class="mt-8 mx-1">
                  <p class="body-1 text--primary font-weight-bold">
                    Datos de Disponibilidad:
                  </p>
                </v-row>
                <v-row class="subtitle mx-1">
                  Trabajó antes en Konecta:
                </v-row>
                <v-radio-group
                  v-model="trabajo_k"
                  :mandatory="false"
                  required
                  dense
                  :rules="[(v) => !!v || 'Campo requerido']"
                >
                  <v-radio color="teal" label="Si" value="Si"></v-radio>
                  <v-radio color="teal" label="No" value="No"></v-radio>
                </v-radio-group>
                <v-row class="mx-1">
                  <p class="subtitle">Disponibilidad horaria:</p>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="3" class="py-0 mr-1">
                    <v-row>
                      <p class="body-1 text--secondary ml-4 mt-2">
                        Lunes - Viernes
                      </p>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0" offset-md="1">
                    <v-text-field
                      label="Inicio"
                      type="time"
                      outlined
                      :value="timeLVB"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0">
                    <v-text-field
                      label="Fin"
                      type="time"
                      outlined
                      v-model="timeLVE"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="3" class="py-0 ml-1">
                    <v-text-field
                      class="body-2 text--secondary "
                      v-model="weekDay"
                      label="Fin de semana"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0" offset-md="1">
                    <v-text-field
                      label="Inicio"
                      type="time"
                      outlined
                      v-model="timeSDB"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2" class="py-0">
                    <v-text-field
                      label="Fin"
                      type="time"
                      outlined
                      v-model="timeSDE"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div class="ml-4">
                <v-row class="mt-2 mx-2">
                  <p class="body-1 ml-3 text--primary font-weight-bold">
                    Equipos para trabajo remoto:
                  </p>
                </v-row>
                <v-row class="ml-2 mr-4">
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="servicio_internet"
                      label="Servicio de Internet"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="megas"
                      label="Megas de Internet"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="postulanteDispositivo"
                      label="Tiene PC/Laptop:"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="ml-2 mr-4">
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="sistemaOp"
                      label="Sistema operativo:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="procesador"
                      label="Tipo de procesador:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="auriculares"
                      label="Tiene auriculares:"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div class="ml-4 mb-10">
                <v-row class="mt-2 mx-2">
                  <p class="body-1 ml-3 text--primary font-weight-bold">
                    Datos de Contacto
                  </p>
                </v-row>
                <v-row class="ml-2 mr-4">
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="
                        lista.informacionPersonal[0].datosPersonales.telefono
                      "
                      label="Teléfono:"
                      :rules="[(v) => !!v || 'Campo requerido']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="
                        lista.informacionPersonal[0].datosPersonales.correo
                      "
                      label="Correo:"
                      :rules="[(v) => !!v || 'Campo requerido']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="dirPais"
                      label="País:"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="ml-2 mr-4">
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      color="teal"
                      v-model="dirDpto"
                      label="Departamento:"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="dirProvincia"
                      label="Provincia:"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="dirDistrito"
                      label="Distrito:"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="ml-2 mr-4">
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="dirCalle"
                      label="Calle:"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="dirNo"
                      label="N°:"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="dirPiso"
                      label="Piso:"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="ml-2 mr-4">
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="dirNdpt"
                      label="Dpt:"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" class="py-0">
                    <v-text-field
                      v-model="infoPersonalPerfil.ref_dir"
                      label="Referencia:"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-tab-item>
          <!-- Evaluacion -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p class="subtitle-1 font-weight-bold black--text mt-3 mx-4">
                  Evaluación de competencias:
                </p>
                <v-form ref="form" v-model="valid">
                  <v-row class="pl-10 text-center">
                    <v-col cols="12" sm="6" md="4">
                      <v-card
                        class="py-6"
                        width="250px"
                        @click="modalPresencial = true"
                      >
                        <v-card-text class="text-center">
                          <div class="subtitle-1 text-center mb-2">
                            Competencias
                          </div>
                          <v-icon style="font-size:85px" color="gray"
                            >assignment_ind</v-icon
                          >
                        </v-card-text>
                      </v-card>
                      <v-row class="justify-center">
                        <div
                          v-if="
                            datosEvaluacion[0].selectComPresencial.length > 0
                          "
                        >
                          <v-chip class="my-5 px-12" color="#6DD400" label
                            >Resuelto</v-chip
                          >
                        </div>
                        <div
                          v-if="
                            datosEvaluacion[0].selectComPresencial.length === 0
                          "
                        >
                          <v-chip class="my-5" color="red" label
                            >Seleccione las competencias</v-chip
                          >
                        </div>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- <div v-if="lista.datosIgc !== '' && (lista.datosIgc.length>0  && lista.datosIgc[0].cuenta === 'LATAM' && dataSelectedIgc.length === 0) || lista.cuenta === 'LATAM' ||  dataSelectedIgc[0].cuenta === 'LATAM'"> -->

                  <div
                    v-if="
                      (lista.datosIgc.length > 0 &&
                        lista.datosIgc[0].cuenta === 'LATAM' &&
                        dataSelectedIgc.length === 0) ||
                        lista.cuenta === 'LATAM' ||
                        (dataSelectedIgc.length > 0 &&
                          dataSelectedIgc[0].cuenta === 'LATAM')
                    "
                  >
                    <v-row class="justify-space-between pl-8 pt-4">
                      <p class="subtitle-2 black--text">
                        Evaluación Adicional (*Evaluación para Latam Bilingue)
                      </p>
                    </v-row>
                    <v-row class="pl-8 pt-0 mt-0">
                      <v-col cols="12" sm="6" md="4" class="pt-0">
                        <v-menu
                          v-model="menu1"
                          :close-on-content-click="false"
                          max-width="290"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              prepend-inner-icon="today"
                              v-model="datosEvaluacion.fechaExaCuadernillo"
                              clearable
                              label="Examen de Cuadernillo:"
                              v-on="on"
                              @click:clear="date = null"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            no-title
                            locale="ES-es"
                            v-model="datosEvaluacion.fechaExaCuadernillo"
                            @change="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" class="pt-0">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          max-width="290"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              prepend-inner-icon="today"
                              v-model="datosEvaluacion.fechaExaIngles"
                              clearable
                              label="Examen de Inglés:"
                              v-on="on"
                              @click:clear="date = null"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            no-title
                            locale="ES-es"
                            v-model="datosEvaluacion.fechaExaIngles"
                            @change="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </div>
                  <v-row class="mx-4 pt-4">
                    <p class="subtitle-1 font-weight-bold black--text">
                      Resultado de Evaluación:
                    </p>
                  </v-row>
                  <v-row class="pl-8 pt-0 mt-0">
                    <v-col cols="12" sm="6" md="4" class="pt-0">
                      <v-autocomplete
                        :rules="[(v) => !!v || 'Campo requerido']"
                        :items="itemEstado"
                        v-model="datosEvaluacion.estadoPostulante"
                        label="Estado "
                        @change="updateEstadoPostulante()"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" class="pt-0">
                      <v-autocomplete
                        v-if="dataSelectedIgc.length > 0"
                        color="teal"
                        :items="listOfIgcs"
                        v-model="dataSelectedIgc[0].nombreIgc"
                        @change="getIGCByName(dataSelectedIgc[0].nombreIgc)"
                        label="IGC:"
                        required
                        :rules="[(v) => !!v || 'Campo requerido']"
                      ></v-autocomplete>
                      <v-text-field
                        v-else
                        label="IGC:"
                        color="teal"
                        v-model="datosEvaluacion.IGC"
                        required
                        :rules="[(v) => !!v || 'Campo requerido']"
                      ></v-text-field>
                      <!--  <v-select
                        v-else  
                        color="teal"
                        :items="listOfIgcs"
                        v-model="datosEvaluacion.IGC"
                        @change="getIGCByName(datosEvaluacion.IGC)"
                        label="IGC:"
                        required
                        :rules="[(v) => !!v || 'Campo requerido']"
                      ></v-select> -->
                    </v-col>
                  </v-row>

                  <v-row
                    class="pl-8 pt-0 mt-0"
                    v-if="datosEvaluacion.estadoPostulante == 'NO APTO'"
                  >
                    <v-col cols="12" sm="12" md="6" class="pt-0">
                      <v-select
                        :items="itemNoApto"
                        v-model="datosEvaluacion.itemNoApto"
                        label="Motivo "
                      ></v-select>
                    </v-col>
                  </v-row>

                  <div
                    v-if="
                      this.enableEstado === 'APTO' ||
                        datosEvaluacion.estadoPostulante === 'APTO'
                    "
                  >
                    <v-row>
                      <v-row class="ml-8">
                        <p class="subtitle-2 black--text">
                          Datos de Capacitación:
                        </p>
                      </v-row>
                    </v-row>
                    <v-row class="ml-12" v-if="dataSelectedIgc.length === 0">
                      No registrado
                    </v-row>
                    <v-row v-if="dataSelectedIgc.length > 0" class="ml-6">
                      <v-col cols="12" sm="6" md="4" class="py-0">
                        <v-text-field
                          color="teal"
                          label="Fecha Capacitación"
                          v-model="dataSelectedIgc[0].fecCapProceso"
                          readonly
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" class="py-0">
                        <v-text-field
                          :rules="[(v) => !!v || 'Campo requerido']"
                          v-model="dataSelectedIgc[0].modalidad"
                          label="Modalidad:"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <!-- ********************Horario Capacitacion*************************** -->
                    <v-row class="ml-4">
                      <p class="ml-5 mt-2">Horario:</p>
                    </v-row>
                    <v-row
                      class="ml-12 mb-2"
                      v-if="dataSelectedIgc.length === 0"
                    >
                      No registrado
                    </v-row>
                    <v-row class="ml-10" v-if="dataSelectedIgc.length > 0">
                      <v-col cols="12" sm="12" md="3" class="py-0">
                        <v-row>
                          <p
                            class="text--secondary ml-3 mt-2"
                            style="font-size:14px"
                          >
                            Lunes - Viernes
                          </p>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" md="2" class="py-0 ml-14">
                        <v-text-field
                          label="Inicio"
                          type="time"
                          v-model="
                            dataSelectedIgc[0].horarioCapacitacion
                              .inicioLunesViernes
                          "
                          readonly
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
                            dataSelectedIgc[0].horarioCapacitacion
                              .finLunesViernes
                          "
                          readonly
                          :rules="[(v) => !!v || 'Campo requerido']"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row v-if="dataSelectedIgc.length > 0" class="ml-10">
                      <v-col cols="12" sm="12" md="3" class="py-0">
                        <p>{{ dataSelectedIgc[0].diasFinSemanaCap }}</p>
                      </v-col>
                      <v-col cols="12" sm="12" md="2" class="py-0 ml-14">
                        <v-text-field
                          v-if="dataSelectedIgc.length > 0"
                          label="Inicio"
                          type="time"
                          v-model="
                            dataSelectedIgc[0].horarioCapacitacion
                              .inicioFinSemana
                          "
                          required
                          readonly
                          :rules="[(v) => !!v || 'Campo requerido']"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="2" class="py-0">
                        <v-text-field
                          v-if="dataSelectedIgc.length > 0"
                          label="Fin"
                          type="time"
                          v-model="
                            dataSelectedIgc[0].horarioCapacitacion.finFinSemana
                          "
                          required
                          readonly
                          :rules="[(v) => !!v || 'Campo requerido']"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <!-- *************************************************************** -->
                    <v-row v-if="dataSelectedIgc.length > 0" class="ml-6">
                      <v-col cols="12" sm="6" md="4" class="pt-0">
                        <v-text-field
                          :rules="[(v) => !!v || 'Campo requerido']"
                          prepend-icon="room"
                          v-model="dataSelectedIgc[0].sedeCap"
                          label="Sede:"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                  <v-row class="pl-8 pt-0 mt-0">
                    <v-col cols="12" sm="6" md="8" class="pt-0">
                      <label for>Observaciones Finales:</label>
                      <v-textarea
                        v-model="datosEvaluacion.observaciones"
                        auto-grow
                        filled
                        rows="1"
                        required
                        :rules="[(v) => !!v || 'Campo requerido']"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row class="d-flex pt-0 mt-0 mb-10">
                    <v-row class="justify-center" cols="12" md="12" sm="12">
                      <v-btn
                        outlined
                        color="#00B8AD"
                        class="text-capitalize orange--text mx-6"
                        @click="$router.go(-1)"
                        >Cancelar</v-btn
                      >
                      <!-- </div> -->
                      <v-btn
                        v-if="this.lista.datosEvaluacion.length === 0"
                        color="#00B8AD"
                        :disabled="!valid"
                        class="text-capitalize white--text mx-6"
                        @click="guardarEvaluacion()"
                        >Guardar evaluación</v-btn
                      >
                      <v-btn
                        v-if="this.lista.datosEvaluacion.length !== 0"
                        color="#00B8AD"
                        :disabled="!valid"
                        class="text-capitalize white--text mx-6"
                        @click="updateEvaluacion()"
                        >Actualizar evaluación</v-btn
                      >
                    </v-row>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-row>

      <v-dialog v-model="modalPresencial" persistent max-width="620px">
      <v-card>
        <v-form v-model="valid" ref="form" class="pt-5">
          <v-row class="pl-5">
            <v-col cols="7">
              <h4>COMPETENCIAS EVALUADAS</h4>
            </v-col>
            <v-col cols="5">
              <v-row>
                <h4 class="text--secondary mr-5">Perfil: </h4>
                <h4 v-if="dataSelectedIgc[0].perfil" class="text-competencie">
                  {{ dataSelectedIgc[0].perfil }}
                </h4>
                <h4 v-else class="text-competencie">
                  General
                </h4>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-text v-if="competencies.length > 0">
            <v-row>
              <v-col cols="8" md="7" class="text-center">
                <v-checkbox
                  v-for="(item, index) in competencies"
                  :key="index"
                  class="ma-5"
                  v-model="selectedComPresencial"
                  hide-details
                  :label="item"
                  :value="item"
                  input-value="true"
                  :rules="[(v) => !!v || 'Campo requerido']"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="5" md="5" class="mt-3 text-center" v-if="selectPuntuation">
              <v-chip-group
                v-for="(item, index) in competencies"
                :key="index"
                v-model="selectPuntuation[index]"
                class="pa-0"
                active-class="deep-orange--text text--orange-4"
              >
                <v-chip v-for="size in sizes" :key="size" :value="size" >
                  {{ size }}
              </v-chip>
              </v-chip-group>
            </v-col>
            </v-row>
            <v-textarea
              class="mt-4"
              filled
              label="Observaciones:"
              auto-grow
              hide-details
              rows="2"
              v-model="obsCompetenciaPresencial"
            ></v-textarea>
          </v-card-text>
          <v-card-text v-else>
            <v-checkbox
              v-model="selectedComPresencial"
              hide-details
              label="Comunicación efectiva"
              value="Comunicación efectiva"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedComPresencial"
              hide-details
              label="Orientación al Cliente"
              value="Orientación al Cliente"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedComPresencial"
              hide-details
              label="Adaptación"
              value="Adaptación"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedComPresencial"
              hide-details
              label="Negociación e Influencia"
              value="Negociación e Influencia"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedComPresencial"
              hide-details
              label="Tolerancia a la presión"
              value="Tolerancia a la presión"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedComPresencial"
              hide-details
              label="Ortografía"
              value="Ortografía"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedComPresencial"
              hide-details
              label="Redacción"
              value="Redacción"
            ></v-checkbox>
            <v-textarea
              class="mt-4"
              filled
              label="Observaciones aqui:"
              auto-grow
              hide-details
              rows="2"
              v-model="obsCompetenciaPresencial"
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="modalPresencial = false"
              >Cancelar</v-btn
            >
            <v-btn
              :disabled="!validComp"
              color="#FB8C00"
              text
              @click="guardarCompetenciaPresencial()"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalVirtual" persistent max-width="620px">
      <v-card>
        <v-row class="ml-5">
            <v-col cols="7">
              <h4>COMPETENCIAS EVALUADAS</h4>
            </v-col>
            <v-col cols="5">
              <v-row>
                <h4 class="text--secondary mr-5">Perfil: </h4>
                <h4 v-if="dataSelectedIgc[0].perfil" class="text-competencie">
                  {{ dataSelectedIgc[0].perfil }}
                </h4>
                <h4 v-else class="text-competencie">
                  General
                </h4>
              </v-row>
            </v-col>
          </v-row>
        <v-divider></v-divider>
        <v-card-text v-if="competencies.length > 0">
          <v-checkbox
            v-for="(item, index) in competencies"
            :key="index"
            v-model="selectedComPresencial"
            hide-details
            :label="item"
            :value="item"
            :rules="[(v) => !!v || 'Campo requerido']"
            input-value="true"
          >
          </v-checkbox>
          <v-col cols="5" md="5" class="mt-3 text-center" v-if="selectPuntuation">
              <v-chip-group
                v-for="(item, index) in competencies"
                :key="index"
                v-model="selectPuntuation[index]"
                class="pa-0"
                active-class="deep-orange--text text--orange-4"
              >
                <v-chip v-for="size in sizes" :key="size" :value="size" >
                  {{ size }}
              </v-chip>
              </v-chip-group>
            </v-col>
          <v-textarea
            class="pt-4"
            hide-details
            filled
            label="Observaciones 1:"
            auto-grow
            rows="3"
            v-model="obsCompetenciaVirtual"
          ></v-textarea>
        </v-card-text>
        <v-card-text v-else>
          <v-checkbox
            v-model="datosEvaluacion[0].selectCompVirtual"
            input-value="true"
            disabled
            hide-details
            label="Comunicación efectiva"
            value="Comunicación efectiva"
          ></v-checkbox>
          <v-checkbox
            v-model="datosEvaluacion[0].selectCompVirtual"
            hide-details
            input-value="true"
            disabled
            label="Orientación al Cliente"
            value="Orienta ción al Cliente"
          ></v-checkbox>
          <v-checkbox
            v-model="datosEvaluacion[0].selectCompVirtual"
            hide-details
            input-value="true"
            disabled
            label="Adaptación"
            value="Adaptación"
          ></v-checkbox>
          <v-checkbox
            v-model="datosEvaluacion[0].selectCompVirtual"
            hide-details
            input-value="true"
            disabled
            label="Negociación e Influencia"
            value="Negociación e Influencia"
          ></v-checkbox>
          <v-checkbox
            v-model="datosEvaluacion[0].selectCompVirtual"
            hide-details
            input-value="true"
            disabled
            label="Tolerancia a la presión"
            value="Tolerancia a la presión"
          ></v-checkbox>
          <v-checkbox
            v-model="datosEvaluacion[0].selectCompVirtual"
            hide-details
            input-value="true"
            disabled
            label="Ortografía"
            value="Ortografía"
          ></v-checkbox>
          <v-checkbox
            v-model="datosEvaluacion[0].selectCompVirtual"
            hide-details
            input-value="true"
            disabled
            label="Redacción"
            value="Redacción"
          ></v-checkbox>
          <v-textarea
            class="pt-4"
            hide-details
            filled
            label="Observaciones:"
            auto-grow
            rows="3"
            v-model="obsCompetenciaVirtual"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="modalVirtual = false"
            >Cancelar</v-btn
          >
          <v-btn  color="#FB8C00" text @click="guardarCompetenciaVirtual()" :disabled="!validComp"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import { secondary } from "../main.js";
import firebase from "firebase";
import moment from "moment";

// import {
//   getProfiles,
//   getCompetencies,
//   getCompetenciesByIds,
// } from "../utils/competencies";

export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.readDatosEvaluacion();
    this.readDatosDisponibilidad();
    this.readDatosTecnicos();
    this.readInfoPerfil();
    this.callGetProfile();

    /* this.createProfiles(); */
  },
  props: {
    lista: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    modalPresencial: false,
    modalVirtual: false,
    valid: true,
    validComp: true,
    listOfIgcs: [],
    selectedIgc: "",
    dataSelectedIgc: [],
    itemEstado: ["APTO", "NO APTO", "Rechaza Propuesta", "No se presentó"],
    itemTurno: ["Mañana", "Tarde", "Madrugada"],
    itemSede: [
      "Carabaya",
      "Crillon",
      "Surquillo",
      "Callao- Mall",
      "Bellavista",
      "Chiclayo",
    ],
    itemNoApto: [
      "No disponibilidad de horario",
      "Mala actitud",
      "No cumple con las competencias",
      "Otros (especificar)",
      "No cumple requerimientos técnicos",
    ],
    profile: "",
    selectedComPresencial: [],
    obsCompetenciaPresencial: "",
    obsCompetenciaVirtual: "",
    datosEvaluacion: [
      {
        id: "",
        idPostulante: "",
        selectComPresencial: [],
        selectPuntuation: [],
        obsComPresencial: "",
        obsComVirtual: "",
        selectCompVirtual: [],
        fechaExaCuadernillo: new Date().toISOString().substr(0, 10),
        fechaExaIngles: new Date().toISOString().substr(0, 10),
        estadoPostulante: "",
        IGC: "",
        itemNoApto: "",
        observaciones: "",
      },
    ],
    menu1: false,
    menu2: false,
    menu3: false,
    servicio_internet: "",
    sistemaOp: "",
    auriculares: "",
    procesador: "",
    megas: "",
    enableEstado: "",
    trabajo_k: "",
    weekDay: "",
    postulanteDispositivo: "",
    timeLVB: "--:--",
    timeLVE: "--:--",
    timeSDB: "--:--",
    timeSDE: "--:--",
    dirPais: "Perú",
    dirProvincia: "",
    dirDpto: "",
    dirDistrito: "",
    dirCalle: "",
    dirNdpt: "",
    dirPiso: "",
    dirNo: "",
    competencies: [],
    selectPuntuation: [],
    sizes: ["1", "2", "3", "4", "5"],
  }),

  mounted() {
    this.getAllIGCs();
    this.readDatosEvaluacion();
    this.readInfoPerfil();
    console.log("MOUNTED", this.profile);
    this.callGetProfile();
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
  },
  methods: {
    guardarCompetenciaPresencial() {
      this.datosEvaluacion[0].selectComPresencial = this.selectedComPresencial;
      this.datosEvaluacion[0].selectPuntuation = this.selectPuntuation;
      this.datosEvaluacion.obsComPresencial = this.obsCompetenciaPresencial;
      this.modalPresencial = false;
    },
    guardarCompetenciaVirtual() {
      this.datosEvaluacion.obsComVirtual = this.obsCompetenciaVirtual;
      this.modalVirtual = false;
    },
    guardarEvaluacion() {
      let datosEvaluacion = {};
      if (this.dataSelectedIgc.length !== 0) {
        console.log("dentro del if", this.dataSelectedIgc);
        datosEvaluacion = {
          id_postulante: this.lista.idPostulanteInfo,
          compet_evaluadas: this.datosEvaluacion[0].selectComPresencial,
          puntuacion: this.datosEvaluacion[0].selectPuntuation,
          observacion_comp_presencial: this.datosEvaluacion.obsComPresencial,
          observacion_comp_virtual: this.datosEvaluacion.obsComVirtual,
          exa_cuadernillo: this.datosEvaluacion.fechaExaCuadernillo,
          exa_ingles: this.datosEvaluacion.fechaExaIngles,
          estado: this.datosEvaluacion.estadoPostulante,
          observaciones: this.datosEvaluacion.observaciones,
          id_igc: this.dataSelectedIgc[0].id,
          itemNoApto: this.datosEvaluacion.itemNoApto,
          correo: this.lista.correo,
          nombres: this.lista.Nombres,
        };
      } else {
        datosEvaluacion = {
          id_postulante: this.lista.idPostulanteInfo,
          compet_evaluadas: this.datosEvaluacion[0].selectComPresencial,
          puntuacion: this.datosEvaluacion[0].selectPuntuation,
          observacion_comp_presencial: this.datosEvaluacion.obsComPresencial,
          observacion_comp_virtual: this.datosEvaluacion.obsComVirtual,
          exa_cuadernillo: this.datosEvaluacion.fechaExaCuadernillo,
          exa_ingles: this.datosEvaluacion.fechaExaIngles,
          estado: this.datosEvaluacion.estadoPostulante,
          observaciones: this.datosEvaluacion.observaciones,
          IGC: this.datosEvaluacion.IGC,
          itemNoApto: this.datosEvaluacion.itemNoApto,
          correo: this.lista.correo,
          nombres: this.lista.Nombres,
        };
      }

      let Evaluacion = JSON.parse(JSON.stringify(datosEvaluacion));
      const EvaluacionKey = firebase
        .database()
        .ref("EVALUACION_PROGRAMADA")
        .push().key;
      firebase
        .database()
        .ref("EVALUACION_PROGRAMADA")
        .child(EvaluacionKey)
        .set(Evaluacion);
      this.$router.replace({ path: "/selector" });
    },

    updateEvaluacion() {
      const id_evaluacion = this.lista.datosEvaluacion[0].id;
      if (this.datosEvaluacion.itemNoApto == undefined) {
        this.datosEvaluacion.itemNoApto = "";
      }
      if (id_evaluacion) {
        firebase
          .database()
          .ref("EVALUACION_PROGRAMADA")
          .child(id_evaluacion)
          .update({
            compet_evaluadas: this.datosEvaluacion[0].selectComPresencial,
            estado: this.datosEvaluacion.estadoPostulante,
            id_igc: this.dataSelectedIgc[0].id,
            observaciones: this.datosEvaluacion.observaciones,
            itemNoApto: this.datosEvaluacion.itemNoApto || "",
          });
      } else {
        firebase
          .database()
          .ref("EVALUACION_PROGRAMADA")
          .child(id_evaluacion)
          .update({
            compet_evaluadas: this.datosEvaluacion[0].selectComPresencial,
            estado: this.datosEvaluacion.estadoPostulante,
            IGC: this.datosEvaluacion.IGC,
            observaciones: this.datosEvaluacion.observaciones,
            itemNoApto: this.datosEvaluacion.itemNoApto || "",
          });
      }

      this.$router.replace({ path: "/selector" });
    },
    updateEstadoPostulante() {
      this.enableEstado = this.datosEvaluacion.estadoPostulante;
    },
    getAllIGCs() {
      let arrayIgcs = [];
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref
        .orderByChild("estado")
        .equalTo(true)
        .once("value", function(snap) {
          snap.forEach((igc) => {
            arrayIgcs.push(igc.val().nombreIgc);
          });
        });
      this.listOfIgcs = arrayIgcs;
    },
    getIGCByName(igcName) {
      console.log("igcname", igcName);
      let igc = [];
      let profile = "";
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref
        .orderByChild("nombreIgc")
        .equalTo(igcName)
        .on("value", function(snap) {
          snap.forEach((elem) => {
            igc.push({ ...elem.val() });
          });
          profile = igc[0].perfil;
        });
      /*       this.profile = profile;
      console.log( 'profile',profile ); */
      this.getProfileByName(igc[0], profile);
      this.dataSelectedIgc = igc;
    },
    getIGCById(idIgc) {
      let dataIgc = [];
      let nombre = [];
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref
        .orderByChild("id")
        .equalTo(idIgc)
        .once("value", function(snap) {
          snap.forEach((elem) => {
            dataIgc.push({ ...elem.val() });
          });
        });
      this.dataSelectedIgc = dataIgc;
    },
    readDatosTecnicos() {
      if (this.lista.datosTecnicos.length > 0) {
        const datosEquipo = this.lista.datosTecnicos[0].datosEquipoTecnico;
        this.servicio_internet = datosEquipo.servicio_internet;
        this.sistemaOp = datosEquipo.sistemaOp;
        this.auriculares = datosEquipo.auriculares;
        this.procesador = datosEquipo.procesador;
        this.megas = datosEquipo.megas;
        if (datosEquipo.dispositivo) {
          if (datosEquipo.dispositivo.includes("Laptop")) {
            this.postulanteDispositivo = "Laptop";
          } else if (datosEquipo.dispositivo.includes("Computadora")) {
            this.postulanteDispositivo = "Computadora";
          } else if (
            datosEquipo.dispositivo.includes("Computadora") &&
            datosEquipo.dispositivo.includes("Laptop")
          ) {
            this.postulanteDispositivo = "Laptop/Computadora";
          } else this.postulanteDispositivo = "Otros";
        }
      }
    },
    readDatosDisponibilidad() {
      if (this.lista.datosRotacion.length > 0) {
        const datosRota = this.lista.datosRotacion[0].datosRotacion;
        if (datosRota.hasOwnProperty("horarioDisponible")) {
          this.timeLVB = datosRota.horarioDisponible.timeLVB;
          this.timeLVE = datosRota.horarioDisponible.timeLVE;
          this.timeSDB = datosRota.horarioDisponible.timeSDB;
          this.timeSDE = datosRota.horarioDisponible.timeSDE;
          this.weekDay = datosRota.horarioDisponible.weekDay;
          this.trabajo_k = datosRota.trabajo_k;
        }
      }
    },
    readInfoPerfil() {
      const tempArray = Object.assign(
        {},
        this.lista.informacionPersonal[0].datosPersonales
      );
      if (tempArray.hasOwnProperty("ref_dir")) {
        const arrayDir = tempArray.text_dir.split(",");
        this.dirPais = "Perú";
        this.dirProvincia = arrayDir[5];
        this.dirDpto = arrayDir[6];
        this.dirDistrito = arrayDir[4];
        this.dirCalle = arrayDir[0];
        this.dirNdpt = arrayDir[3];
        this.dirPiso = arrayDir[2];
        this.dirNo = arrayDir[1];
        this.infoPersonalPerfil = tempArray;
      } else {
        this.infoPersonalPerfil = tempArray;
        this.infoPersonalPerfil.ref_dir = this.infoPersonalPerfil.text_dir;
      }
    },
    readDatosEvaluacion() {
      if (this.lista.datosEvaluacion.length > 0) {
        const datosEva = this.lista.datosEvaluacion[0].datosEvaluacion;
        console.log("datoseva", datosEva);
        this.selectedComPresencial = datosEva.compet_evaluadas;
        this.selectPuntuation = datosEva.puntuacion;
        console.log("selectPuntuation", this.selectPuntuation);

        this.datosEvaluacion.itemNoApto = datosEva.itemNoApto;
        this.obsCompetenciaPresencial = datosEva.observacion_comp_presencial;
        this.datosEvaluacion.fechaExaCuadernillo = datosEva.exa_cuadernillo;
        this.datosEvaluacion.fechaExaIngles = datosEva.exa_ingles;
        this.datosEvaluacion.estadoPostulante = datosEva.estado;
        if (datosEva.compet_evaluadas !== undefined) {
          this.datosEvaluacion[0].selectComPresencial =
            datosEva.compet_evaluadas;
        }
        if (datosEva.id_igc) {
          this.getIGCById(datosEva.id_igc);
        }
        if (datosEva.IGC) {
          this.getIGCByName(datosEva.IGC);
          this.datosEvaluacion.IGC = datosEva.IGC;
        }
        if (datosEva.observaciones) {
          this.datosEvaluacion.observaciones = datosEva.observaciones;
        } else {
          this.datosEvaluacion.observaciones = "";
        }
      } else {
        if (this.lista.datosIgc.length > 0) {
          this.datosEvaluacion.IGC = this.lista.datosIgc[0].nombreIgc;
          this.getIGCByName(this.lista.datosIgc[0].nombreIgc);
        }
        if (this.lista.igc) {
          console.log("aquiii else", this.lista.igc);
          this.datosEvaluacion.IGC = this.lista.igc;
          this.getIGCByName(this.lista.igc);
        }
      }
    },
    getProfileByName(dataIgc, name) {
      console.log("NAME PROFILE", name);
      console.log("DATA IGC", dataIgc);
      let competencies = [];
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("PROFILES");
      /* Postulantes por IGC : props*/
      if (name) {
        ref
          .orderByChild("name")
          .equalTo(name)
          .on("value", function(querySnapshot) {
            querySnapshot.forEach(function(datoSnapshot) {
              competencies = datoSnapshot.val().competencies;
            });
          });
        this.competencies = competencies;
      }
      console.log("COMPETENCIAS", this.competencies);
    },
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
    callGetProfile() {
      if (this.dataSelectedIgc.length > 0 && this.dataSelectedIgc[0].perfil) {
        this.getProfileByName(
          this.dataSelectedIgc[0],
          this.dataSelectedIgc[0].perfil
        );
      }
    },
  },
};
</script>
<style>
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: #00968f;
  background-color: #ffffff;
}
.theme--light.v-tabs .v-tab--active:hover::before,
.theme--light.v-tabs .v-tab--active {
  color: #f5f5f5;
  background-color: #00968f;
}
.v-application .primary--text {
  color: #00968f !important;
}

.text-competencie {
  color: #00968f !important;
}
</style>
