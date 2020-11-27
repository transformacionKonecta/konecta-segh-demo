<template>
  <v-container>
    <v-alert v-if="errorMeet" dense outlined type="error" style="font-size:12px" dismissible=true>
        {{ errorMeet }}
      </v-alert>
    <v-row class="mt-0 pt-0 pl-2">
      <h1 class="headline font-weight-bold mb-3">Lista de postulantes</h1>
      <!-- <v-btn @click="getPostulates()">Probar</v-btn> -->
    </v-row>
    <v-row class="mb-4">
      <v-col cols="10">
        <v-expansion-panels class="mb-5">
          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-row>
                    <v-icon large color="teal darken-2">filter_list</v-icon>
                    <p class="ml-3 mb-0 font-weight-bold subtitle-1">Filtrar postulantes</p>
                  </v-row>
                </v-col>
                <v-col cols="8" class="text--secondary mt-2">
                  <v-fade-transition leave-absolute>
                    <span v-if="open">Seleccione los filtros de búsqueda</span>
                    <v-row v-else no-gutters style="width: 100%">
                      <v-col cols="6">
                        Desde:
                        {{ computedDateFormattedMomentjs || "Not set" }}
                      </v-col>
                      <v-col cols="6">
                        Hasta:
                        {{ computedDateFormattedMomentjs2 || "Not set" }}
                      </v-col>
                    </v-row>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="justify-space-between">
                <v-col cols="12" sm="6" md="3">
                  <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        prepend-icon="event"
                        :value="computedDateFormattedMomentjs"
                        label="Desde:"
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
                      @change="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        prepend-icon="event"
                        :value="computedDateFormattedMomentjs2"
                        label="Hasta:"
                        readonly
                        v-on="on"
                        color="teal"
                        @click:clear="date2 = null"
                        hide-details
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="es-PE"
                      color="teal"
                      no-title
                      v-model="date2"
                      @change="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="mt-5">
                  <v-select
                    color="teal"
                    :items="filterEstado"
                    v-model="filterEstadoValue"
                    label="Estado de la agenda"
                    dense
                    @change="onfilterEstado(filterEstadoValue)"
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels v-if="activeFilter" class="filterTecnico">
          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-row>
                    <v-icon large color="teal darken-2">filter_list</v-icon>
                    <p class="ml-3 mb-0 font-weight-bold subtitle-1">Filtros Técnicos</p>
                  </v-row>
                </v-col>
                <v-col cols="8" class="text--secondary mt-2">
                  <v-fade-transition leave-absolute>
                    <span v-if="open">Seleccione los filtros de búsqueda</span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="justify-center">
                <v-col cols="2">
                  <p class="black--text subtitle">
                    <b>Internet</b>
                  </p>
                  <v-checkbox
                    v-model="filterInternet"
                    label="Si"
                    value="Si"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterInternet"
                    label="No"
                    value="No"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                </v-col>
                <v-col  v-if="!(filterInternet.length === 1 && filterInternet[0]==='No')" cols="4">
                  <p class="black--text subtitle">
                    <b>Megas</b>
                  </p>
                  <v-checkbox
                    v-model="filterMegas"
                    label="Más de 5 MB"
                    value="Más de 5 MB"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterMegas"
                    label="Más de 10 MB"
                    value="Más de 10 MB"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterMegas"
                    label="Más de 20 MB"
                    value="Más de 20 MB"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterMegas"
                    label="Más de 30 MB"
                    value="Más de 30 MB"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                </v-col>
                <v-col cols="3">
                  <p class="black--text subtitle">
                    <b>Dispositivo</b>
                  </p>
                  <v-checkbox
                    v-model="filterDisp"
                    label="Laptop"
                    value="Laptop"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterDisp"
                    label="Computadora"
                    value="Computadora"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterDisp"
                    label="Ninguno"
                    value="Ninguno"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                </v-col>
                <v-col cols="3">
                  <p class="black--text subtitle">
                    <b>Procesador</b>
                  </p>
                  <v-checkbox
                    v-model="filterMicro"
                    label="AMD"
                    value="AMD"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterMicro"
                    label="Intel Celeron"
                    value="Intel Celeron"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterMicro"
                    label="Intel Core i3"
                    value="Intel Core i3"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterMicro"
                    label="Intel Core i5"
                    value="Intel Core i5"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterMicro"
                    label="Intel Core i7"
                    value="Intel Core i7"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterMicro"
                    label="Ninguno"
                    value="Ninguno"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="2">
        <v-btn width="152" class="ma-2" dark color="#EF6C00" @click="getPostulantData()" v-promise-btn>
          <v-icon left>mdi-cached</v-icon>Buscar
        </v-btn>
        <v-btn
          v-if="postulanteTable.length > 0"
          width="152"
          class="ma-2 text-capitalize"
          dark
          color="#00B8AD"
        >
          <v-icon>save_alt</v-icon>
          <download-excel :data="postulantesExcel" name="lista_postulantes.xls">Descargar</download-excel>
        </v-btn>
        <v-btn class="ma-2 text-capitalize" outlined color="#00B8AD" @click="handleAuthClick()">
          <v-icon left>videocam</v-icon>Activar meet
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-2 justify-center" v-if="activeFilter">
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-row>
                    <v-icon large color="teal darken-2">filter_list</v-icon>
                    <p class="ml-3 mb-0 font-weight-bold subtitle-1">Filtros Laborales</p>
                  </v-row>
                </v-col>
                <v-col cols="8" class="text--secondary mt-2">
                  <v-fade-transition leave-absolute>
                    <span v-if="open">Seleccione los filtros de búsqueda</span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="justify-center">
                <v-col cols="5">
                  <b>Rubro</b>
                  <v-select
                    v-model="filterRubro"
                    :items="itemsRubro"
                    attach
                    chips
                    multiple
                    @change="filterTable()"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <b>Segmento</b>
                  <v-select
                    v-model="filterRubro"
                    :items="itemsSegmento"
                    attach
                    chips
                    multiple
                    @change="filterTable()"
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <p class="black--text subtitle">
                    <b>Modalidad</b>
                  </p>
                  <v-checkbox
                    v-model="filterModalidad"
                    label="Full Time"
                    value="Full Time"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterModalidad"
                    label="Part Time"
                    value="Part Time"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                </v-col>
                <v-col cols="2">
                  <p class="black--text subtitle">
                    <b>Sede</b>
                  </p>
                  <v-checkbox
                    v-model="filterSede"
                    label="Lima"
                    value="A"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="filterSede"
                    label="Chiclayo"
                    value="E"
                    color="teal"
                    hide-details
                    @change="filterTable()"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <!-- <v-row class="justify-end pb-2">
        <v-btn @click="handleSignoutClick()">errar sesion</v-btn>
    </v-row>-->

    <v-row class="justify-end">
      <v-col cols="5" sm="6" md="6" class="mb-5 mt-0">
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
    <div>
      <p>
        <b>Se muestran {{postulanteTable.length}} resultados de la búsqueda</b>
      </p>
      <v-data-table :headers="headers" :items="postulanteTable" :search="search">
        <template v-slot:item.equipoTI="{ item }">
          {{
          getInternetText(item)
          }}
        </template>
        <template v-slot:item.sede="{ item }">{{ getSede(item) }}</template>
        <template v-slot:item.estado="{ item }">
          <v-select
            x-small
            :items="selectEstado"
            v-model="item.estado_call"
            label="Seleccionar"
            @change="onEstadoChange(item)"
          ></v-select>
        </template>
        <template v-slot:item.perfil="{ item }">
          <v-btn
            small
            color="#00B8AD"
            dark
            class="text-capitalize"
            @click="openPerfilModal(item)"
          >Ver perfil</v-btn>
        </template>
        <template v-slot:item.entrevista="{ item }">
          <v-btn
            class="text-capitalize"
            v-if="item.estado_call === 'Disponible para entrevista'"
            small
            dark
            :color="btnEntrevistaColor(item)"
            @click="openEntrevistaModal(item)"
          >{{ btnEntrevistaText(item) }}</v-btn>
          <v-btn v-else small disabled color="orange" class="text-capitalize">Agendar</v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" persistent max-width="620px">
      <v-card>
        <v-card-title class="justify-center">
          <span class="headline teal--text font-weight-bold">Agendar entrevista</span>
        </v-card-title>
        <v-form ref="form" v-model="valid">
          <v-card-text>
            <v-container>
              <p class="body-1 text--primary font-weight-bold">Datos del proceso de selección</p>
              <v-row>
                <v-col cols="12" sm="6" md="6" class="py-0">
                  <v-autocomplete
                    v-if="dataSelectedIgc.length > 0"
                    color="teal"
                    v-model="dataSelectedIgc[0].nombreIgc"
                    label="IGC"
                    :items="listOfIgcs"
                    @change="getIGCByName(dataSelectedIgc[0].nombreIgc)"
                    :disabled="readonly"
                    :readonly="readonly"
                    required
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-autocomplete>
                  <v-text-field
                    v-else-if="datosEntrevista.igc"
                    color="teal"
                    label="IGC"
                    v-model="datosEntrevista.igc"
                    @change="getIGCByName(datosEntrevista.igc)"
                    :readonly="readonly"
                    required
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-text-field>
                  <v-autocomplete
                    v-else
                    color="teal"
                    label="IGC"
                    v-model="datosEntrevista.igc"
                    :items="listOfIgcs"
                    @change="getIGCByName(datosEntrevista.igc)"
                    :readonly="readonly"
                    required
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pt-0">
                  <v-text-field
                    v-if="dataSelectedIgc.length > 0"
                    color="teal"
                    v-model="dataSelectedIgc[0].cuenta"
                    label="Cuenta"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="teal"
                    v-if="dataSelectedIgc.length == 0"
                    v-model="datosEntrevista.cuenta"
                    label="Cuenta"
                    readonly
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="py-0">
                  <v-text-field
                    v-if="dataSelectedIgc.length > 0"
                    color="teal"
                    v-model="dataSelectedIgc[0].servicio"
                    label="Servicio"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="teal"
                    v-if="dataSelectedIgc.length == 0"
                    v-model="datosEntrevista.servicio"
                    label="Servicio"
                    readonly
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="py-0">
                  <v-text-field
                    v-if="dataSelectedIgc.length > 0"
                    color="teal"
                    v-model="dataSelectedIgc[0].modalidad"
                    label="Modalidad"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="teal"
                    v-if="dataSelectedIgc.length == 0"
                    v-model="datosEntrevista.modalidad"
                    label="Modalidad"
                    readonly
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pt-0">
                  <v-text-field
                    readonly
                    color="teal"
                    v-model="datosEntrevista.correo"
                    label="Correo"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="py-0">
                  <p class="body-1 text--primary font-weight-bold">Datos de entrevista</p>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="py-0">
                  <datetime
                    :class="{ colorMsgError: msgTimeWrong }"
                    color="teal"
                    placeholder="Seleccione fecha y hora"
                    type="datetime"
                    v-model="datosEntrevista.fechaHoraEntrevista"
                    required
                    :rules="[(v) => !!v || 'Campo requerido']"
                    input-class="startDate"
                    :min-datetime="dateNow()"
                    value-zone="America/Lima"
                    zone="America/Lima"
                    :format="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    }"
                    :phrases="{ ok: 'Continuar', cancel: 'Salir' }"
                    :hour-step="1"
                    :minute-step="30"
                    use12-hour
                    auto
                  >
                    <label class="body-2" for="startDate" slot="before">Fecha de Entrevista</label>
                    <template slot="button-confirm" slot-scope="scope">
                      <span v-if="scope.step === 'time'" @click="clearFieldEntrevistador()">
                        Confirmado
                        <i class="fas fa-arrow-right" />
                      </span>
                    </template>
                  </datetime>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="py-0">
                  <v-autocomplete
                    color="teal"
                    v-model="datosEntrevista.tipoEntrevista"
                    :items="itemTipoEntrevista"
                    label="Tipo de entrevista"
                    required
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-autocomplete>
                  <!-- @change="filterPsicologoDisponible()" -->
                </v-col>
                <!-- v-if="this.datosEntrevista.estadoBtnGuardar==='visible'" -->
                <v-col cols="12" sm="6" md="6" class="py-0">
                  <v-autocomplete
                    color="teal"
                    prepend-inner-icon="person"
                    v-model="datosEntrevista.entrevistador"
                    :items="enableEntrevistador"
                    label="Entrevistador"
                    required
                    :rules="[(v) => !!v || 'Campo requerido']"
                    @focus="filterPsicologoDisponible()"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" class v-if="datosEntrevista.hideBtn == true">
                  <v-btn
                    outlined
                    class="text-capitalize"
                    color="teal"
                    @click="clearPsicologoEntrevista(datosEntrevista)"
                  >
                    <v-icon>person</v-icon>Liberar psicólogo
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="py-0" v-if="msgTimeWrong">
                  <v-alert dense outlined type="error" style="font-size:12px">
                    Debe elegir una hora válida.
                    <strong>{{ msgTimeWrong }}</strong>
                  </v-alert>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn
              color="orange darken-1"
              class="text-capitalize"
              text
              @click="(dialog = false), $refs.form.reset()"
            >Cerrar</v-btn>
            <v-btn
              v-if="datosEntrevista.enabledEdit == false"
              color="orange darken-1"
              class="text-capitalize white--text"
              :disabled="!valid"
              @click="checkHoursInterview(datosEntrevista.fechaHoraEntrevista)"
            >Generar entrevista</v-btn>
            <v-btn
              v-if="datosEntrevista.hideBtn == true"
              color="orange darken-1"
              class="text-capitalize white--text"
              :disabled="!valid"
              @click="checkHoursInterview(datosEntrevista.fechaHoraEntrevista)"
            >Actualizar entrevista</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPerfil" persistent max-width="700px">
      <v-card>
        <v-card-title class="justify-center">
          <span class="title teal--text font-weight-bold">Perfil del colaborador</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row class="justify-center">
              <v-col cols="12" sm="6" md="6" class="py-0">
                <p
                  class="body-1 text--primary font-weight-bold text-center"
                >{{ infoPersonalPerfil.name }}</p>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="py-0">
                <p
                  class="font-weight-bold body-1 text--primary text-center"
                >N° Doc: {{ infoPersonalPerfil.numdoc }}</p>
              </v-col>
            </v-row>
            <div class="sectionDivider"></div>
            <v-row class="rowTabs">
              <v-tabs background-color="white" :hide-slider="true" :grow="true">
                <!-- <v-tabs-slider color="teal"></v-tabs-slider> -->
                <v-tab class="text-capitalize sectionTabs">
                  <v-icon class="mr-1 iconTab">account_box</v-icon>Datos
                  Profesionales y Experiencia
                </v-tab>
                <v-tab class="text-capitalize">
                  <v-icon class="mr-1 iconTab">assignment_turned_in</v-icon>Datos para Verificar
                </v-tab>
                <v-tab-item>
                  <v-card flat class="ml-3 mt-5">
                    <div>
                      <v-row>
                        <p class="body-1 text--primary font-weight-bold">Datos Personales</p>
                      </v-row>
                      <v-row class="sizeField">
                        <v-text-field
                          v-model="infoPersonalPerfil.nombre_social"
                          readonly
                          label="Nombre Social:"
                        ></v-text-field>
                      </v-row>
                      <v-row class="secondRow">
                        <v-col>
                          <v-text-field
                            class="sizeField"
                            v-model="infoPersonalPerfil.estado_civil"
                            readonly
                            label="Estado Civil:"
                          ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                          <v-text-field
                            class="sizeField"
                            v-model="infoPersonalPerfil.fecha_nac"
                            readonly
                            label="Fecha de Nacimiento:"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="fiveRow">
                        <v-col>
                          <v-text-field
                            class="sizeField"
                            v-model="infoPersonalPerfil.genero"
                            readonly
                            label="Género:"
                          ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                          <v-text-field
                            class="sizeField"
                            v-model="infoPersonalPerfil.n_hijos"
                            readonly
                            label="Hijos:"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                    <div>
                      <v-row class="mb-3 mt-2">
                        <p class="body-1 text--primary font-weight-bold">Datos de Formación</p>
                      </v-row>
                      <v-row class="secondRow">
                        <v-col>
                          <v-text-field
                            class="sizeField"
                            v-model="datosFormacionPerfil.grado_formacion"
                            readonly
                            label="Grado de Formación:"
                          ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                          <v-text-field
                            class="sizeField"
                            v-model="datosFormacionPerfil.institucion"
                            readonly
                            label="Institución:"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="fiveRow">
                        <v-col>
                          <v-text-field
                            class="sizeField"
                            v-model="datosFormacionPerfil.estado_estudios"
                            readonly
                            label="Estado de estudio:"
                          ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col v-if="datosFormacionPerfil.horario_estudio">
                          <v-text-field
                            class="sizeField"
                            v-model="datosFormacionPerfil.horario_estudio"
                            readonly
                            label="Horario de estudio:"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="fiveRow">
                        <v-col
                          v-if="
                            datosFormacionPerfil.grado_formacion !==
                              'Secundaria'
                          "
                        >
                          <v-text-field
                            class="sizeField"
                            v-model="datosFormacionPerfil.rubro_carrera"
                            readonly
                            label="Rubro de carrera:"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                    <div>
                      <v-row class="mt-2">
                        <p class="body-1 text--primary font-weight-bold">Datos de Experiencia</p>
                      </v-row>
                      <div v-for="(item, indexOf) in datosExperiencia" v-bind:key="item.id">
                        <div v-if="item.datosExperiencia !== undefined">
                          <v-row
                            class="thirdRow"
                            v-if="
                              item.datosExperiencia.flag_se !== '1' &&
                                item.datosExperiencia.flag_se !== undefined
                            "
                          >
                            <p
                              class="subtitle-2 font-weight-bold pl-3 teal--text mb-1 pt-2 pb-0"
                            >Experiencia N° {{ parseInt(indexOf) + 1 }}</p>
                          </v-row>
                          <v-row
                            class="thirdRow"
                            v-if="
                              item.datosExperiencia.flag_se !== '1' &&
                                item.datosExperiencia.flag_se !== undefined
                            "
                          >
                            <v-col>
                              <v-text-field
                                v-if="item.datosExperiencia.flag_ec === 1"
                                class="sizeField"
                                value="Call Center"
                                readonly
                                label="Tipo de Experiencia:"
                              ></v-text-field>
                              <v-text-field
                                v-else
                                class="sizeField"
                                value="Otros"
                                hide-details
                                label="Tipo de Experiencia:"
                              ></v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                              <v-text-field
                                v-if="item.datosExperiencia.eo_empresa"
                                class="sizeField"
                                v-model="item.datosExperiencia.eo_empresa"
                                readonly
                                label="Empresa:"
                              ></v-text-field>
                              <v-text-field
                                v-else
                                v-model="item.datosExperiencia.ec_empresa"
                                class="sizeField"
                                readonly
                                label="Empresa:"
                              ></v-text-field>
                            </v-col>
                            <v-col class="sectionExp" v-if="item.datosExperiencia.ec_cliente">
                              <v-text-field
                                v-model="item.datosExperiencia.ec_cliente"
                                class="sizeField"
                                readonly
                                label="Cliente:"
                              ></v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col class="sectionExp">
                              <v-text-field
                                v-if="item.datosExperiencia.eo_rubro_empresa"
                                v-model="item.datosExperiencia.eo_rubro_empresa"
                                class="sizeField"
                                readonly
                                label="Rubro del Cliente:"
                              ></v-text-field>
                              <v-text-field
                                v-else
                                v-model="item.datosExperiencia.ec_rubro_cliente"
                                class="sizeField"
                                readonly
                                label="Rubro del Cliente:"
                              ></v-text-field>
                            </v-col>
                            <v-col class="sectionExp" v-if="item.datosExperiencia.ec_segmento">
                              <v-text-field
                                v-model="item.datosExperiencia.ec_segmento"
                                readonly
                                class="sizeField"
                                label="Segmento:"
                              ></v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col class="sectionExp">
                              <v-text-field
                                v-if="item.datosExperiencia.eo_tiempo_exp"
                                class="sizeField"
                                v-model="item.datosExperiencia.eo_tiempo_exp"
                                readonly
                                label="Tiempo de Experiencia (Meses):"
                              ></v-text-field>
                              <v-text-field
                                v-else
                                v-model="item.datosExperiencia.ec_tiempo_exp"
                                class="sizeField"
                                readonly
                                label="Tiempo de Experiencia (Meses):"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row v-else>
                            <v-col cols="12" sm="12" md="12" class="py-0">
                              <p>No cuenta con experiencia</p>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </div>
                    <v-card-actions class="justify-center">
                      <v-btn
                        color="orange darken-1"
                        class="text-capitalize"
                        text
                        @click="dialogPerfil = false"
                      >Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="ml-3 mt-5">
                    <v-form ref="form2" v-model="valid2">
                      <div>
                        <v-row class="mt-2">
                          <p class="body-1 text--primary font-weight-bold">Datos de Disponibilidad:</p>
                        </v-row>
                        <v-row>
                          <p class="subtitle">Trabajó antes en Konecta:</p>
                        </v-row>
                        <v-row class="sectionButton">
                          <v-radio-group
                            v-model="trabajo_k"
                            :mandatory="false"
                            required
                            :rules="[(v) => !!v || 'Campo requerido']"
                          >
                            <v-radio color="teal" label="Si" value="Si"></v-radio>
                            <v-radio color="teal" label="No" value="No"></v-radio>
                          </v-radio-group>
                        </v-row>
                        <v-row>
                          <p class="subtitle">Disponibilidad horaria:</p>
                        </v-row>
                        <v-row class="align-center rowTime">
                          <p class="body-1 black--text font-weight-bold titleHours">Lunes-Viernes</p>
                          <div class="fieldHours">
                            <v-text-field
                              label="Inicio"
                              type="time"
                              v-model="timeLVB"
                              required
                              :rules="[(v) => !!v || 'Campo requerido']"
                            ></v-text-field>
                          </div>
                          <div class="fieldHours">
                            <v-text-field
                              label="Fin"
                              type="time"
                              v-model="timeLVE"
                              required
                              :rules="[(v) => !!v || 'Campo requerido']"
                            ></v-text-field>
                          </div>
                        </v-row>
                        <v-row>
                          <div class="selectDays">
                            <v-select
                              class="font-weight-bold"
                              :items="listDays"
                              v-model="weekDay"
                              :rules="[v => !!v || 'Campo requerido']"
                              label="Fin de semana"
                              required
                            ></v-select>
                          </div>
                          <div class="fieldHours2">
                            <v-text-field
                              label="Inicio"
                              type="time"
                              v-model="timeSDB"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-text-field>
                          </div>
                          <div class="fieldHours2">
                            <v-text-field
                              label="Fin"
                              type="time"
                              v-model="timeSDE"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-text-field>
                          </div>
                        </v-row>
                      </div>
                      <div>
                        <v-row>
                          <p class="subtitle mt-4">Modalidad de Preferencia:</p>
                        </v-row>
                        <v-row class="fieldModalidad">
                          <v-select
                            v-model="time_preferencia"
                            clearable
                            class="sizeField"
                            :items="listModalidad"
                            :rules="[(v) => !!v || 'Campo requerido']"
                            required
                          ></v-select>
                        </v-row>
                        <v-row class="mt-2">
                          <p
                            class="body-1 text--primary font-weight-bold"
                          >Equipos para trabajo remoto:</p>
                        </v-row>
                        <v-row class="thirdRow">
                          <v-col>
                            <v-select
                              v-model="servicio_internet"
                              class="sizeField"
                              clearable
                              label="Servicio de Internet"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                              :items="listInternet"
                            ></v-select>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col>
                            <v-select
                              v-model="megas"
                              clearable
                              class="sizeField"
                              :items="listMB"
                              label="Megas de Internet"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row class="sizeField sixExp">
                          <v-select
                            v-model="postulanteDispositivo"
                            clearable
                            :items="listDispositivo"
                            label="Tiene PC/Laptop:"
                            :rules="[(v) => !!v || 'Campo requerido']"
                            required
                          ></v-select>
                        </v-row>
                        <v-row class="fiveRow sixExp">
                          <v-col>
                            <v-select
                              class="sizeField"
                              v-model="sistemaOp"
                              clearable
                              :items="listSystem"
                              label="Sistema operativo:"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-select>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col>
                            <v-select
                              class="sizeField"
                              v-model="procesador"
                              :items="listMicro"
                              clearable
                              label="Tipo de procesador:"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row class="sizeField sixExp">
                          <v-select
                            clearable
                            v-model="auriculares"
                            :items="listAuriculares"
                            label="Tiene auriculares:"
                            :rules="[(v) => !!v || 'Campo requerido']"
                            required
                          ></v-select>
                        </v-row>
                      </div>
                      <div>
                        <v-row class="mt-2">
                          <p class="body-1 text--primary font-weight-bold">Datos de Contacto</p>
                        </v-row>
                        <v-row class="thirdRow">
                          <v-col>
                            <v-text-field
                              class="sizeField"
                              clearable
                              v-model="infoPersonalPerfil.telefono"
                              label="Teléfono:"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col>
                            <v-text-field
                              class="sizeField"
                              clearable
                              v-model="infoPersonalPerfil.correo"
                              label="Correo:"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row class="secondRow sectionExp">
                          <v-col>
                            <v-text-field
                              v-model="dirPais"
                              class="sizeField"
                              value="Perú"
                              label="País:"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col>
                            <v-select
                              color="teal"
                              v-model="dirDpto"
                              :items="listDptos"
                              class="sizeField"
                              clearable
                              @change="changeProvince()"
                              label="Departamento:"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row class="secondRow sectionExp">
                          <v-col>
                            <v-select
                              v-model="dirProvincia"
                              :items="listProvince"
                              class="sizeField"
                              clearable
                              label="Provincia:"
                              @change="changeDistrict()"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-select>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col>
                            <v-select
                              v-model="dirDistrito"
                              :items="listDistritos"
                              class="sizeField"
                              clearable
                              label="Distrito:"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row class="secondRow sectionExp">
                          <v-col>
                            <v-text-field
                              v-model="dirCalle"
                              class="sizeField"
                              clearable
                              label="Calle:"
                              :rules="[(v) => !!v || 'Campo requerido']"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-spacer></v-spacer>
                          <!-- a estos campos  se les agrego el rule van a produccion-->
                          <v-col>
                            <v-text-field
                              v-model="dirNo"
                              class="sizeField"
                              clearable
                              label="Nro:"
                              :rules="[(v) => !!v || 'Campo requerido',v => /^[0-9\s]{0,10}$/.test(v)||'Se aceptan solo números y espacios, máximo 10 dígitos.']"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row class="secondRow sectionExp">
                          <v-col>
                            <v-text-field
                              v-model="dirPiso"
                              class="sizeField"
                              clearable
                              label="Piso:"
                              :rules="[v => /^[0-9\s]{0,10}$/.test(v)||'Se aceptan solo números y espacios, máximo 10 dígitos.']"
                            ></v-text-field>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col>
                            <v-text-field
                              v-model="dirNdpt"
                              class="sizeField"
                              clearable
                              label="Dpt:"
                              :rules="[v => /^[0-9\s]{0,10}$/.test(v)||'Se aceptan solo números y espacios, máximo 10 dígitos.']"
                            ></v-text-field>
                          <!-- fin de cambio rule a produccion-->
                          </v-col>
                        </v-row>
                        <v-row class="sizeField sixExp">
                          <v-text-field
                            v-model="infoPersonalPerfil.ref_dir"
                            class="sizeField"
                            clearable
                            label="Referencia:"
                          ></v-text-field>
                        </v-row>
                      </div>
                    </v-form>
                    <v-card-actions class="justify-center pb-6">
                      <v-btn
                        color="orange darken-1"
                        class="text-capitalize"
                        text
                        @click="dialogPerfil = false"
                      >Cerrar</v-btn>
                      <v-btn
                        :disabled="!valid2"
                        color="orange darken-1"
                        class="text-capitalize white--text"
                        @click="updatePersonalInfomation()"
                      >Actualizar Información</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalErrorMeet" max-width="500">
      <v-card>
        <v-card-title class="headline teal--text">Inicia sesión en google Meet</v-card-title>
        <v-card-text>
          <p class="subtitle-1">
            Recuerda activar la sesión de google meet, para asegurar la agenda
            de la entrevista.
          </p>
          <v-row class="justify-center">
            <v-img src="../assets/video.svg" aspect-ratio="7" contain></v-img>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="modalErrorMeet = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalDataCompleted" max-width="400">
      <v-card>
        <v-card-title class="headline teal--text">Aviso</v-card-title>
        <v-card-text>
          <p
            class="subtitle-1"
          >Para realizar una entrevista, primero debes verificar y actualizar los datos personales del postulante en la sección perfil</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" text @click="modalDataCompleted = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const CLIENT_ID =
 // "588953841547-lljfhh3l60h09ppt1hhhmfv2p1cc2894.apps.googleusercontent.com";
  "762063258865-qrjfb1ee1s2gqif5pnbr109qpm09228m.apps.googleusercontent.com"
const API_KEY = 'AIzaSyD6m-YUd-s5DIqXpzOf0dayGJZHep2NjqI';
//"AIzaSyCba91ZNaXMHdSMLDMIvNWolZROzg3WoFg";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES =
  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events";

import firebase from "firebase";
import moment from "moment";
import { Datetime } from "vue-datetime";
import { getDepartamentos, getProvincias, getDistritos } from "../utils/ubigeo";
import { getIgcByName } from "../firebase/processMethods";

export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.api = gapi;
    this.getAllIGCs();
    this.initUbigeo();
    this.handleClientLoad();
  },
  components: {
    datetime: Datetime,
  },
  // firebase: {
  //   users: secondary.database().ref("POSTULANTES")
  // },
  data() {
    return {
      api: undefined,
      authorized: false,
      datetimeEmpty: "",
      enableSpinner: true,
      valid2: true,
      // api: undefined,
      apireturn: "",
      msgTimeWrong: "",
      users: {},
      valid: true,
      search: "",
      dialog: false,
      dialogPerfil: false,
      modalErrorMeet: false,
      modalDataCompleted: false,
      editedIndex: -1,
      readonly: false,
      listOfIgcs: [],
      dataSelectedIgc: [],
      headers: [
        {
          text: "N°",
          align: "start",
          value: "number",
          sortable: false,
        },
        { text: "Fecha de Registro", value: "register" },
        { text: "Nombres y Apellidos", value: "name" },
        { text: "Sede de Preferencia", value: "sede" },
        //{ text: "Internet", value: "datosEntrevista" },
        // { text: "N°Documento", value: "numDoc" },
        /*         { text: "Celular", value: "celular" }, */
        { text: "Canal", value: "comokonecta" },
        {
          text: "Internet",
          value: "equipoTecnicos[0].datosEquiposTi.servicio_internet",
        },
        {
          text: "Equipo PC o Laptop",
          value: "equipoTI",
        },
        { text: "Estado", value: "estado" },
        { text: "Perfil", value: "perfil", sortable: false },
        { text: "Agenda", value: "entrevista", sortable: false },
      ],
      postulantes: [],
      postulanteTable: [],
      selectEvaluar: ["Link enviado", "Test Resuelto", " No Resuelto"],
      selectEstado: [
        "Disponible para entrevista",
        "No Contesta",
        "Rechaza propuesta",
        "No cumple requerimientos",
        "No cumple con perfil"
      ],
      // iteamEntrevistador: ["Jose perez", "Maria Casas", "carlos Chavez"],
      iteamEntrevistador: [],
      entrevistadorDatos: [],
      enableEntrevistador: [],
      itemTipoEntrevista: ["Presencial", "Virtual"],
      datosEntrevista: [
        {
          idEntrevista: "",
          idPostulante: "",
          documento: "",
          nombres: "",
          cuenta: "",
          servicio: "",
          correo: "",
          fechaHoraEntrevista: "",
          entrevistador: "",
          tipoEntrevista: "",
          modalidad: "",
          igc: "",
          enabledEdit: false,
          hideBtn: false,
        },
      ],
      infoPersonalPerfil: [
        {
          key: "",
          name: "",
          tipodoc: "",
          numdoc: "",
          apellido_m: "",
          apellido_p: "",
          nombres: "",
          telefono: "",
          correo: "",
          text_dir: "",
          estado_civil: "",
          fecha_nac: "",
          genero: "",
          n_hijos: "",
        },
      ],
      datosFormacionPerfil: [
        {
          grado_formacion: "",
          institucion: "",
          estado_estudios: "",
          horario_estudio: "",
          rubro_carrera: "",
        },
      ],
      datosExperiencia: [
        {
          eo_empresa: "",
          eo_puesto: "",
          eo_rubro_empresa: "",
          eo_tiempo_exp: null,
          id_postulante: "",
          ec_cliente: "",
          ec_empresa: "",
          ec_rubro_cliente: "",
          ec_segmento: "",
          ec_tiempo_exp: 0,
        },
      ],
      filterEstado: ["Todos", "Agendado", "Por agendar"],
      filterEstadoValue: "",
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      date2: new Date().toISOString().substr(0, 10),
      listDays: ["Sábado", "Domingo", "Sábado y Domingo"],
      listMB: ["Más de 5MB", "Más de 10 MB", "Más de 20 MB", "Más de 30 MB", "Ninguno"],
      listSystem: ["Windows", "Linux", "Mac OS", "Ninguno"],
      listMicro: [
        "Intel Celeron",
        "Intel Core i3",
        "Intel Core i5",
        "Intel Core i7",
        "Intel Pentium",
        "AMD",
        "Ninguno",
      ],
      postulanteDispositivo: "",
      listDispositivo: ["Laptop", "Computadora", "Ninguno"],
      listAuriculares: ["Si", "No"],
      listInternet: ["Si", "No"],
      existTableTecnico: true,
      keyEquiposTecnicos: "",
      keyRotacion: "",
      existTableRotacion: true,
      servicio_internet: "",
      sistemaOp: "",
      auriculares: "",
      procesador: "",
      megas: "",
      trabajo_k: "",
      timeLVB: null,
      timeLVE: null,
      timeSDB: null,
      timeSDE: null,
      weekDay: "",
      dataDptos: [],
      dataProvince: [],
      dataDistritos: [],
      listDptos: [],
      listProvince: [],
      listDistritos: [],
      datetimeEmpty: "",
      dirPais: "Perú",
      dirProvincia: "",
      dirDpto: "",
      dirDistrito: "",
      dirCalle: "",
      dirNdpt: "",
      dirPiso: "",
      dirNo: "",
      datosEquipoTecnicos: {},
      datosRotacion: {},
      listModalidad: ["Full Time", "Part Time"],
      itemsRubro: [
        "Retail (Saga, Ripley, Paris,Oeshle, etc)",
        "Banco",
        "Telecomunicaciones",
        "Salud",
        "Negocio propio/familiar",
        "Hoteles, restaurantes, comidas y bodegas",
        "Sector Público",
        "Educación",
        "Entretenimiento y Diversión",
        "Construcción, Energía y Minas",
        "Derecho, Leyes, Política y Justicia",
        "Comunicaciones, publicidad y Marketing",
        "Fabricas Industriales",
        "Otros",
      ],
      itemsSegmento: [
        "Atención al cliente",
        "Ventas",
        "Crosseling",
        "Redes Sociales",
        "Back Office",
      ],
      filterInternet: [],
      filterMegas: [],
      filterMicro: [],
      filterDisp: [],
      filterSede: [],
      filterModalidad: [],
      filterRubro: [],
      filterSegmento: [],
      copyTable: [],
      time_preferencia: "",
      errorMeet: "",
      postulantesExcel: [],
      activeFilter: false,
      expresion: /^[0-9\s]{0,10}$/,
      // date: parseISO(new Date().toISOString().substr(0, 10)),
    };
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedMomentjs2() {
      return this.date2 ? moment(this.date2).format("DD/MM/YYYY") : "";
    },
  },
  mounted() {
    this.getPostulates();
    this.getPostulantData();
    this.getDatosPsicologo();
    this.getAllEntrevistas();
    this.activeFilter = false;
  },

  methods: {
    dateNow() {
      var myDate = new Date();
      return myDate.toISOString();
    },
    checkHoursInterview(datetime) {
      const time = new Date(datetime).getHours();
      const meridiano = moment(new Date(datetime))
        .format("YYYY-MM-DD hh:mm A")
        .substr(-2);
      if (
        (time > 18 && time <= 24) ||
        ((time === 12 || (time >= 1 && time <= 6)) && meridiano === "AM")
      ) {
        this.msgTimeWrong = "Entre las 7:00 AM y las 6:00 PM";
      } else {
        this.dialog = false;
        this.executeGoogleMeet();
      }
    },
     async getPostulates() {
      const startDate = moment(this.date).format("MM/DD/YYYY");
      const endDate = moment(this.date2).format("MM/DD/YYYY");
      const snapshot = await firebase.database().ref("POSTULANTES").orderByChild("RegistradoDate/date")
        .startAt(startDate)
        .endAt(endDate + "\uf8ff").once('value')
      return snapshot.val();
    },

   async getPostulantData() {
      console.log('btn BUSCARR');
      this.activeFilter = true;
      this.postulanteTable = [];
      let postulatesData = await this.getPostulates();
      let i = 1;
      let postulantes_table;
      for (let postulanteInfo in postulatesData) {
        postulantes_table = {
          number: i,
          tipoDoc: postulatesData[postulanteInfo].tipodoc,
          celular: postulatesData[postulanteInfo].telefono,
          comokonecta: postulatesData[postulanteInfo].como_konecta,
          numDoc: postulatesData[postulanteInfo].numdoc,
          correo: postulatesData[postulanteInfo].correo,
          estado_call: postulatesData[postulanteInfo].estado_call,
          key: postulanteInfo,
          name: this.getNamePostulante(postulatesData[postulanteInfo]),
          register:
            postulatesData[postulanteInfo].RegistradoDate.date +
            " " +
            postulatesData[postulanteInfo].RegistradoDate.hour,
          infoPersonal: postulatesData[postulanteInfo],
          experience: this.getDatosExperiencia(postulanteInfo),
          postulanteProf: this.getDatosFormacion(postulanteInfo),
          datosEntrevista: this.getDatosEntrevista(postulanteInfo),
          equipoTecnicos: this.getEquiposTecnicos(postulanteInfo),
          rotacion: this.getDatosRotacion(postulanteInfo),
        };
        this.postulanteTable.push(postulantes_table);

        i++;
      }
       console.log('alll',this.postulanteTable); 
      this.copyTable = this.postulanteTable;
      setTimeout(() => {
        this.generateExcel();
      }, 5000);
    },
       getAllIGCs() {
      let arrayIgcs = [];
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref
        .orderByChild("estado")
        .equalTo(true)
        .once("value", function (snap) {
          snap.forEach((igc) => {
            arrayIgcs.push(igc.val().nombreIgc);
          });
        });
      this.listOfIgcs = arrayIgcs;
    },
    async getIGCByName(igcName) {
      this.dataSelectedIgc = await getIgcByName(igcName);
    },
    getIGCById(idIgc) {
      let dataIgc = [];
      let nombre = [];
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref
        .orderByChild("id")
        .equalTo(idIgc)
        .once("value", function (snap) {
          snap.forEach((elem) => {
            dataIgc.push({ ...elem.val() });
          });
        });
      this.dataSelectedIgc = dataIgc;
    },
  
    filterTable() {
      /* console.log(this.postulanteTable);
      console.log("copy", this.copyTable); */
      this.activeFilter = true;
      let filterArray = this.copyTable;
      this.postulanteTable = [];
      if (this.filterInternet.length != 0) {
        filterArray = this.filterTableByInternet(filterArray);
        /* console.log("internet", filterArray); */
      }
      if (this.filterMegas.length != 0) {
        filterArray = this.filterTableByMegas(filterArray);
        /* console.log("megas", filterArray); */
      }
      if (this.filterDisp.length != 0) {
        filterArray = this.filterTableByDisponibilidad(filterArray);
        /* console.log("dispositivo", filterArray); */
      }
      if (this.filterMicro.length != 0) {
        filterArray = this.filterTableByMicro(filterArray);
        /* console.log("Micro", filterArray); */
      }
      if (this.filterRubro.length != 0) {
        filterArray = this.filterTableByRubro(filterArray);
        /* console.log("rubro", filterArray); */
      }
      if (this.filterSegmento.length != 0) {
        filterArray = this.filterTableBySegmento(filterArray);
        /* console.log("Segmento", filterArray); */
      }
      if (this.filterModalidad.length != 0) {
        filterArray = this.filterTableByModalidad(filterArray);
        /* console.log("Modalidad", filterArray); */
      }
      if (this.filterSede.length != 0) {
        filterArray = this.filterTableBySede(filterArray);
        /* console.log("Sede", filterArray); */
      }
      /* console.log("final", filterArray); */
      this.postulanteTable = filterArray;
    },

    filterTableByInternet(filterArray) {
      let tempArray = [];
      filterArray.forEach((element) => {
        if (
          element.equipoTecnicos.length != 0 &&
          this.filterInternet.includes(
            element.equipoTecnicos[0].datosEquiposTi.servicio_internet
          )
        )
          tempArray.push(element);
      });
      return tempArray;
    },

    filterTableByMegas(filterArray) {
      let tempArray = [];
      filterArray.forEach((element) => {
        if (
          element.equipoTecnicos.length != 0 &&
          element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty("megas") &&
          this.filterMegas.includes(
            element.equipoTecnicos[0].datosEquiposTi.megas
          )
        )
          tempArray.push(element);
      });
      return tempArray;
    },

    filterTableByDisponibilidad(filterArray) {
      let tempArray = [];
      filterArray.forEach((element) => {
        if (
          element.equipoTecnicos.length != 0 &&
          element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty("dispositivo")
        ) {
          for (let index = 0; index < this.filterDisp.length; index++) {
            if (
              element.equipoTecnicos[0].datosEquiposTi.dispositivo.includes(
                this.filterDisp[index]
              )
            ) {
              tempArray.push(element);
              break;
            }
          }
        }
      });
      return tempArray;
    },
    filterTableByMicro(filterArray) {
      let tempArray = [];
      filterArray.forEach((element) => {
        if (
          element.equipoTecnicos.length != 0 &&
          element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty("procesador")
        ) {
          for (let index = 0; index < this.filterMicro.length; index++) {
            if (
              element.equipoTecnicos[0].datosEquiposTi.procesador.includes(
                this.filterMicro[index]
              )
            ) {
              tempArray.push(element);
              break;
            }
          }
        }
      });
      return tempArray;
    },
    filterTableBySegmento(filterArray) {
      let tempArray = [];
      filterArray.forEach((element) => {
        if (element.experience.length != 0) {
          for (let index = 0; index < element.experience.length; index++) {
            if (
              this.filterSegmento.includes(
                element.experience[index].datosExperiencia.ec_segmento
              )
            ) {
              tempArray.push(element);
              break;
            }
          }
        }
      });
      return tempArray;
    },

    filterTableByModalidad(filterArray) {
      let tempArray = [];
      filterArray.forEach((element) => {
        if (
          element.rotacion.length != 0 &&
          element.rotacion[0].dataRotacion.hasOwnProperty("time_preferencia") &&
          this.filterModalidad.includes(
            element.rotacion[0].dataRotacion.time_preferencia
          )
        ) {
          tempArray.push(element);
        }
      });
      return tempArray;
    },

    filterTableBySede(filterArray) {
      let tempArray = [];
      filterArray.forEach((element) => {
        if (
          element.rotacion.length != 0 &&
          element.rotacion[0].dataRotacion.hasOwnProperty("sede_preferencia") &&
          this.filterSede.includes(
            element.rotacion[0].dataRotacion.sede_preferencia
          )
        ) {
          tempArray.push(element);
        }
      });
      return tempArray;
    },

    filterTableByRubro(filterArray) {
      let tempArray = [];
      filterArray.forEach((element) => {
        if (element.experience.length != 0) {
          for (let index = 0; index < element.experience.length; index++) {
            if (
              element.experience[index].datosExperiencia.hasOwnProperty(
                "ec_rubro_cliente"
              )
            ) {
              if (
                this.filterRubro.includes(
                  element.experience[index].datosExperiencia.ec_rubro_cliente
                )
              ) {
                tempArray.push(element);
                break;
              }
            } else if (
              element.experience[index].datosExperiencia.hasOwnProperty(
                "eo_rubro_empresa"
              )
            ) {
              if (
                this.filterRubro.includes(
                  element.experience[index].datosExperiencia.eo_rubro_empresa
                )
              ) {
                tempArray.push(element);
                break;
              }
            }
          }
        }
      });
      return tempArray;
    },

    generateExcel() {
    /*   console.log(JSON.parse(JSON.stringify(this.postulanteTable))); */
      //  console.log(JSON.parse(JSON.stringify(this.postulanteTable[0].postulanteProf[0])));
      let i = 1;
      JSON.parse(JSON.stringify(this.postulanteTable)).forEach((element) => {
        let dataPostulante = {
          "Fecha y hora de registro": `${element.infoPersonal.RegistradoDate.date} ${element.infoPersonal.RegistradoDate.hour}`,
          "Tipo Doc": element.infoPersonal.tipodoc,
          "Nº de documento": element.infoPersonal.numdoc,
          "Nombres completos": element.infoPersonal.nombres,
          "Apellido paterno": element.infoPersonal.apellido_p,
          "Apellido materno": element.infoPersonal.apellido_m,
          "Nombre/Nombre social": element.infoPersonal.nombre_social,
          "Estado civil": element.infoPersonal.estado_civil
            ? element.infoPersonal.estado_civil
            : "-",
          "Fecha de nacimiento": element.infoPersonal.fecha_nac
            ? element.infoPersonal.fecha_nac
            : "-",
          Género: element.infoPersonal.genero
            ? element.infoPersonal.genero
            : "-",
          "Nº de hijos": element.infoPersonal.n_hijos
            ? element.infoPersonal.n_hijos
            : "0",
          "Correo electrónico": element.infoPersonal.correo,
          Teléfono: element.infoPersonal.telefono,
          Dirección: element.infoPersonal.text_dir,
          "Estado Call": element.estado_call,
          "Grado de formacion":
            element.postulanteProf[0] == undefined
              ? ""
              : element.postulanteProf[0].datosFormacion.grado_formacion,
          "Estado estudio":
            element.postulanteProf[0] == undefined
              ? ""
              : element.postulanteProf[0].datosFormacion.estado_estudios,
          Institucion:
            element.postulanteProf[0] == undefined
              ? ""
              : element.postulanteProf[0].datosFormacion.institucion,
          "Horario estudio":
            element.postulanteProf[0] == undefined
              ? ""
              : element.postulanteProf[0].datosFormacion.horario_estudio,
          "Empresa - experiencia no call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.eo_empresa,
          "Rubro empresa - experiencia no call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.eo_empresa,
          "Puesto experiencia - no call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.eo_rubro_empresa,
          "Tiempo (meses) - experiencia no call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.eo_tiempo_exp,
          "Empresa - experiencia call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.ec_empresa,
          "Cliente - experiencia call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.ec_cliente,
          "Rubro cliente - experiencia call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.ec_rubro_cliente,
          "Segmento - experiencia call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.ec_segmento,
          "Tiempo (meses) - experiencia call":
            element.experience[0] == undefined
              ? ""
              : element.experience[0].datosExperiencia.ec_tiempo_exp,

          Internet:
            element.equipoTecnicos[0] != undefined &&
            element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty(
              "servicio_internet"
            )
              ? element.equipoTecnicos[0].datosEquiposTi.servicio_internet
              : "",
          Megas:
            element.equipoTecnicos[0] != undefined &&
            element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty("megas")
              ? element.equipoTecnicos[0].datosEquiposTi.megas
              : "",
          Dispositivo:
            element.equipoTecnicos[0] != undefined &&
            element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty(
              "dispositivo"
            )
              ? element.equipoTecnicos[0].datosEquiposTi.dispositivo
              : "",
          Procesador:
            element.equipoTecnicos[0] != undefined &&
            element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty(
              "procesador"
            )
              ? element.equipoTecnicos[0].datosEquiposTi.procesador
              : "",
          "Sistema Operativo":
            element.equipoTecnicos[0] != undefined &&
            element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty("sistemaOp")
              ? element.equipoTecnicos[0].datosEquiposTi.sistemaOp
              : "",
          Auriculares:
            element.equipoTecnicos[0] != undefined &&
            element.equipoTecnicos[0].datosEquiposTi.hasOwnProperty(
              "auriculares"
            )
              ? element.equipoTecnicos[0].datosEquiposTi.auriculares
              : "",

          "Sede Preferencia":
            element.rotacion[0] != undefined
              ? element.rotacion[0].dataRotacion.sede_preferencia
              : "",
          "Trabajo Konecta":
            element.rotacion[0] != undefined &&
            element.rotacion[0].dataRotacion.hasOwnProperty("trabajo_k")
              ? element.equipoTecnicos[0].datosEquiposTi.trabajo_k
              : "",
          "Modalidad de preferencia":
            element.rotacion[0] != undefined &&
            element.rotacion[0].dataRotacion.hasOwnProperty("time_preferencia")
              ? element.equipoTecnicos[0].datosEquiposTi.time_preferencia
              : "",
        };

        this.postulantesExcel.push({ NRO: i++, ...dataPostulante });
      });
    },
    getDatosEntrevista(id) {
      const db = firebase.database();
      const ref = db.ref("ENTREVISTA_PROGRAMADA");
      let entrevistaProg = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            entrevistaProg.push({
              datosEntrevista: datoSnapshot.val(),
              keyEntrevista: datoSnapshot.key,
            });
          });
        });
      return entrevistaProg;
    },
    getDatosRotacion(id) {
      const db = firebase.database();
      const ref = db.ref("DATOS_ROTACION");
      let dataRotacion = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .once("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            dataRotacion.push({
              key: datoSnapshot.key,
              dataRotacion: datoSnapshot.val(),
            });
          });
        });
      return dataRotacion;
    },
    async getDatosPsicologo() {
      const snapshot = await firebase.database().ref("USERS").once("value");
      // this.entrevistadorDatos = snapshot.val();
      snapshot.forEach((childSnapshot) => {
        /* console.log("data psicologo", childSnapshot.val()); */
        if (
          childSnapshot.val().userRole === "Selector" ||
          childSnapshot.val().userRole === "Call/Selector"
        ) {
          this.iteamEntrevistador.push(
            `${childSnapshot.val().name} ${childSnapshot.val().lastName}`
          );
          this.entrevistadorDatos.push({
            nombre: `${childSnapshot.val().name} ${
              childSnapshot.val().lastName
            }`,
            correo: childSnapshot.val().email,
          });
        }
      });
      this.enableEntrevistador = this.iteamEntrevistador;
    },
    /*     async getDatosPsicologo() {
      const snapshot = await firebase
        .database()
        .ref("DATOS_PSICOLOGOS")
        .once("value");
      // this.entrevistadorDatos = snapshot.val();
      snapshot.forEach((childSnapshot) => {
        this.iteamEntrevistador.push(childSnapshot.val().nombre);
        this.entrevistadorDatos.push({
          nombre: childSnapshot.val().nombre,
          correo: childSnapshot.val().correo,
        });
      });
      this.enableEntrevistador = this.iteamEntrevistador;
    }, */
    getEquiposTecnicos(id) {
      const db = firebase.database();
      const ref = db.ref("ESPECIFICACION_TECNICA");
      let EquiposTi = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .once("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            // datosEquiposTi = Object.values(datoSnapshot.val());
            EquiposTi.push({
              key: datoSnapshot.key,
              datosEquiposTi: datoSnapshot.val(),
            });
          });
        });
      return EquiposTi;
    },
    getDatosFormacion(id) {
      const db = firebase.database();
      const ref = db.ref("DATOS_PROFESIONALES");
      let postulanteFormac = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .once("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            postulanteFormac.push({
              datosFormacion: datoSnapshot.val(),
            });
          });
        });
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
        .once("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            i++;
            postulanteExperiencia.push({
              datosExperiencia: datoSnapshot.val(),
            });
          });
        });
      // console.log(i);
      return postulanteExperiencia;
    },
    getNamePostulante(postulanteInfo) {
      let name;
      name =
        postulanteInfo.nombres +
        " " +
        postulanteInfo.apellido_p +
        " " +
        postulanteInfo.apellido_m;
      return name;
    },
    onfilterEstado(filterEstadoValue) {
      this.getPostulantData();
      if (filterEstadoValue === "Agendado") {
        this.postulanteTable = this.postulanteTable.filter(
          (postulante) => postulante.datosEntrevista.length !== 0
        );
      }
      if (filterEstadoValue === "Por agendar") {
        this.postulanteTable = this.postulanteTable.filter(
          (postulante) => postulante.datosEntrevista.length === 0
        );
      }
    },
    getAllEntrevistas() {
      const startDate = moment(new Date()).format("MM/DD/YYYY");
      const db = firebase.database();
      const ref = db.ref("ENTREVISTA_PROGRAMADA");
      ref
        .orderByChild("fechaEntrevista")
        .startAt(startDate)
        .on("value", this.assignEntrevistas, this.dataUserProfErr);
    },
    assignEntrevistas(data) {
      let entrevistas = [];
      data.forEach((element) => {
        entrevistas.push(element.val());
      });
      this.entrevistaData = entrevistas;
    },
    filterPsicologoDisponible() {
      // console.log(this.entrevistaData);
      // console.log(this.datosEntrevista.fechaHoraEntrevista);
      let fechaHora = this.datosEntrevista.fechaHoraEntrevista;
      /*  console.log(fechaHora); */
      this.enableEntrevistador = this.iteamEntrevistador;
      if (this.entrevistaData != undefined) {
        // console.log(this.entrevistaData);
        this.entrevistaData.forEach((entrevista) => {
          // console.log(entrevista.horaEntrevista);
          if (entrevista.fechaHoraEntrevista == fechaHora) {
            this.enableEntrevistador = this.enableEntrevistador.filter(
              (item) => item != entrevista.entrevistador
            );
          }
        });
      }
      /*  console.log(this.enableEntrevistador); */
    },
    onEstadoChange(item) {
      var updates = {};
      updates["/POSTULANTES/" + item.key + "/estado_call/"] = item.estado_call;
      firebase.database().ref().update(updates);
    },
    async openEntrevistaModal(item) {
      /*     console.log(item);
      console.log(this.authorized); */
      this.dataSelectedIgc = [];
      this.readonly = false;
      this.msgTimeWrong = false;
      this.datosEntrevista.hideBtn = false;
      if (this.authorized == true) {
        if (item.equipoTecnicos.length === 0) {
          this.modalDataCompleted = true;
          this.dialog = false;
        } else if (item.equipoTecnicos.length > 0) {
          console.log("aquiiii 3");
          if (!item.equipoTecnicos[0].datosEquiposTi.hasOwnProperty("megas")) {
            console.log("aquiiii");
            this.modalDataCompleted = true;
            this.dialog = false;
          } else {
            this.dialog = true;
          }
        } else {
          this.dialog = true;
        }
        this.editedIndex = this.postulanteTable.indexOf(item);
        this.datosEntrevista.idPostulante = item.key;
        this.datosEntrevista.documento = item.numDoc;
        this.datosEntrevista.nombres = item.name;
        if (item.datosEntrevista.length !== 0) {
          this.datosEntrevista = Object.assign(
            {},
            item.datosEntrevista[0].datosEntrevista
          );
          this.datosEntrevista.idEntrevista =
            item.datosEntrevista[0].keyEntrevista;
          this.availableEntrevistaUpdate(
            item.datosEntrevista[0].datosEntrevista
          );
          if (this.datosEntrevista.id_igc) {
            this.getIGCById(this.datosEntrevista.id_igc);
          } else if (this.datosEntrevista.igc) {
            await getIGCByName(this.datosEntrevista.igc);
          }
        } else {
          this.datosEntrevista.correo = item.correo;
          this.datosEntrevista.fechaHoraEntrevista = "";
          this.datosEntrevista.enabledEdit = false;
          this.datosEntrevista.hideBtn = false;
        }
      } else {
        this.modalErrorMeet = true;
      }
    },
    initUbigeo() {
      this.dataDptos = getDepartamentos();
      this.dataProvince = getProvincias();
      this.dataDistritos = getDistritos();
      this.dataDptos.forEach((element) => {
        this.listDptos.push(element.name);
      });
      this.dataProvince.forEach((element) => {
        this.listProvince.push(element.name);
      });
      this.dataDistritos.forEach((element) => {
        this.listDistritos.push(element.name);
      });
    },
    changeProvince() {
      let idDpto = 0;
      this.listProvince = [];
      this.dataDptos.forEach((element) => {
        if (element.name === this.dirDpto) idDpto = element.id;
      });
      this.dataProvince.forEach((element) => {
        if (element.idDepartamento === idDpto)
          this.listProvince.push(element.name);
      });
    },
    changeDistrict() {
      let idProvincia = 0;
      this.listDistritos = [];
      this.dataProvince.forEach((element) => {
        if (element.name === this.dirProvincia) idProvincia = element.id;
      });
      this.dataDistritos.forEach((element) => {
        if (element.idProvincia === idProvincia)
          this.listDistritos.push(element.name);
      });
    },
    availableEntrevistaUpdate(dataEntrevista) {
      const entrevistaDate = moment(
        dataEntrevista.fechaHoraEntrevista
      ).format();
      const dateNow = moment(new Date()).format();
      if (entrevistaDate >= dateNow) {
        this.datosEntrevista.hideBtn = true;
        // this.datosEntrevista.enabledEdit = true;
        this.readonly = false;
      } else {
        this.datosEntrevista.hideBtn = false;
        this.readonly = true;
        // this.datosEntrevista.enabledEdit = false;
      }
    },
    openPerfilModal(item) {
      // console.log(item);
      this.dialogPerfil = true;
      this.getInfoPerfil(item);
      this.datosFormacionPerfil = Object.assign(
        {},
        item.postulanteProf[0].datosFormacion
      );
      this.datosExperiencia = Object.assign({}, item.experience);
      this.getDatosTecnicos(item);
      this.getDataRotacion(item.rotacion[0]);
    },
    //cambios en funcion getInfoPerfil produccion
    getInfoPerfil(item) {
      this.cleanDireccion();
      const tempArray = Object.assign({}, item.infoPersonal);
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
        this.changeProvince();
        this.changeDistrict();
      } else {
        this.infoPersonalPerfil = tempArray;
        this.infoPersonalPerfil.ref_dir = this.infoPersonalPerfil.text_dir;
      }
      this.infoPersonalPerfil.name = item.name;
      this.infoPersonalPerfil.key = item.key;
    },// fin cambios en funcion getInfoPerfil produccion
    getDatosTecnicos(item) {
      this.cleanDatosEquipoTecnicos();
      if (item.equipoTecnicos.length !== 0) {
        this.keyEquiposTecnicos = item.equipoTecnicos[0].key;
        this.existTableTecnico = true;
        this.datosEquipoTecnicos = Object.assign(
          {},
          item.equipoTecnicos[0].datosEquiposTi
        );
        this.servicio_internet = this.datosEquipoTecnicos.hasOwnProperty("servicio_internet")?this.datosEquipoTecnicos.servicio_internet:"";
        this.sistemaOp = this.datosEquipoTecnicos.hasOwnProperty("sistemaOp")?this.datosEquipoTecnicos.sistemaOp:"";
        this.procesador = this.datosEquipoTecnicos.hasOwnProperty("procesador")?this.datosEquipoTecnicos.procesador:"";
        this.megas = this.datosEquipoTecnicos.hasOwnProperty("megas")?this.datosEquipoTecnicos.megas:"";
        this.auriculares = this.datosEquipoTecnicos.hasOwnProperty("auriculares")?this.datosEquipoTecnicos.auriculares:"";
        if (this.datosEquipoTecnicos.dispositivo) {
          if (Array.isArray(this.datosEquipoTecnicos.dispositivo)) {
            if (this.datosEquipoTecnicos.dispositivo.includes("Laptop")) {
              this.postulanteDispositivo = "Laptop";
            } else if (
              this.datosEquipoTecnicos.dispositivo.includes("Computadora")
            ) {
              this.postulanteDispositivo = "Computadora";
            } else this.postulanteDispositivo = "Ninguno";
          } else {
            if (this.datosEquipoTecnicos.dispositivo === "Laptop")
              this.postulanteDispositivo = "Laptop";
            else if (this.datosEquipoTecnicos.dispositivo === "Computadora")
              this.postulanteDispositivo = "Computadora";
            else this.postulanteDispositivo = "Ninguno";
          }
        }
      } else {
        this.existTableTecnico = false;
      }
    },
    getDataRotacion(data) {
      this.cleanDatosRotacion();
      if (data != undefined) {
        this.existTableRotacion = true;
        this.datosRotacion = Object.assign({}, data.dataRotacion);
        this.keyRotacion = data.key;
        if (this.datosRotacion.hasOwnProperty("horarioDisponible")) {
          this.timeLVB = data.dataRotacion.horarioDisponible.timeLVB;
          this.timeLVE = data.dataRotacion.horarioDisponible.timeLVE;
          this.timeSDB = data.dataRotacion.horarioDisponible.timeSDB;
          this.timeSDE = data.dataRotacion.horarioDisponible.timeSDE;
          this.weekDay = data.dataRotacion.horarioDisponible.weekDay;
          this.trabajo_k = data.dataRotacion.trabajo_k;
        }
        if (this.datosRotacion.hasOwnProperty("time_preferencia")) {
          this.time_preferencia = data.dataRotacion.time_preferencia;
        } else {
          this.time_preferencia = "";
        }
      } else {
        this.existTableRotacion = false;
      }
    },
    cleanDatosRotacion() {
      this.trabajo_k = "";
      this.timeLVB = null;
      this.timeLVE = null;
      this.timeSDB = null;
      this.timeSDE = null;
      this.weekDay = "";
    },
    cleanDatosEquipoTecnicos() {
      this.servicio_internet = "";
      this.sistemaOp = "";
      this.auriculares = "";
      this.procesador = "";
      this.megas = "";
    },
    cleanDireccion() {
      this.dirPais = "Perú";
      this.dirProvincia = "";
      this.dirDpto = "";
      this.dirDistrito = "";
      this.dirCalle = "";
      this.dirNdpt = "";
      this.dirPiso = "";
      this.dirNo = "";
    },
    updatePersonalInfomation() {
      this.updatePerfil();
      this.updateDatosTecnicos();
      this.updateRotacion();
      this.getPostulantData();
      this.dialogPerfil = false;
    },
    updateRotacion() {
      if (this.existTableRotacion) {
        firebase
          .database()
          .ref("DATOS_ROTACION")
          .child(this.keyRotacion)
          .update({
            trabajo_k: this.trabajo_k,
            horarioDisponible: {
              timeLVB: this.timeLVB,
              timeLVE: this.timeLVE,
              timeSDB: this.timeSDB,
              timeSDE: this.timeLVB,
              weekDay: this.weekDay,
            },
          });
      } else {
        const datosRotacion = {
          actividad_tiempo_libre: "",
          actividades: "",
          coord_actividad: "",
          fam_postulante: "",
          horario_actividad: "",
          id_postulante: this.infoPersonalPerfil.key,
          motivacion: "",
          sede_preferencia: "",
          text_dir_actividad: "",
          time_preferencia: this.time_preferencia,
          trabajo_k: this.trabajo_k,
          horarioDisponible: {
            timeLVB: this.timeLVB,
            timeLVE: this.timeLVE,
            timeSDB: this.timeSDB,
            timeSDE: this.timeLVB,
            weekDay: this.weekDay,
          },
        };
        const rotacionKey = firebase.database().ref("DATOS_ROTACION").push()
          .key;
        firebase
          .database()
          .ref("DATOS_ROTACION")
          .child(rotacionKey)
          .set(JSON.parse(JSON.stringify(datosRotacion)));
      }
    },
    updateDatosTecnicos() {
      if (this.existTableTecnico) {
        firebase
          .database()
          .ref("ESPECIFICACION_TECNICA")
          .child(this.keyEquiposTecnicos)
          .update({
            servicio_internet: this.servicio_internet,
            sistemaOp: this.sistemaOp,
            auriculares: this.auriculares,
            procesador: this.procesador,
            dispositivo: this.postulanteDispositivo,
            megas: this.megas,
          });
      } else {
        const datosEquipoTecnicos = {
          RegistradoDate: this.infoPersonalPerfil.RegistradoDate,
          servicio_internet: this.servicio_internet,
          id_postulante: this.infoPersonalPerfil.key,
          dispositivo: this.postulanteDispositivo,
          marcaSmartphone: [],
          otroDispositivo: "",
          otroSmartphone: "",
          sistemaOp: this.sistemaOp,
          auriculares: this.auriculares,
          procesador: this.procesador,
          megas: this.megas,
        };
        const tecnicaKey = firebase
          .database()
          .ref("ESPECIFICACION_TECNICA")
          .push().key;
        firebase
          .database()
          .ref("ESPECIFICACION_TECNICA")
          .child(tecnicaKey)
          .set(JSON.parse(JSON.stringify(datosEquipoTecnicos)));
      }
    },
    /* cambios a produccion en funcion updatePerfil  */
    updatePerfil() {
      const direccion =
        this.dirCalle +
        "," +
        this.dirNo +
        "," +
        this.dirPiso +
        "," +
        this.dirNdpt +
        "," +
        this.dirDistrito +
        "," +
        this.dirProvincia +
        "," +
        this.dirDpto +
        "," +
        this.dirPais;
        /* fin cambios en funcion updatePerfil produccion */
      firebase
        .database()
        .ref("POSTULANTES")
        .child(this.infoPersonalPerfil.key)
        .update({
          numdoc: this.infoPersonalPerfil.numdoc,
          telefono: this.infoPersonalPerfil.telefono,
          correo: this.infoPersonalPerfil.correo,
          ref_dir: this.infoPersonalPerfil.ref_dir,
          text_dir: direccion,
        });
    },
    labelEntrevistaColor() {
      if (this.msgTimeWrong) {
        return "red";
      } else {
        return "teal";
      }
    },
    btnEntrevistaColor(item) {
      if (item.datosEntrevista) {
        if (item.datosEntrevista.length === 0) {
          return "green";
        } else {
          return "orange";
        }
      }
    },
    btnEntrevistaText(item) {
      if (item.datosEntrevista) {
        if (item.datosEntrevista.length === 0) {
          return "Agendar";
        } else {
          return "Agendado";
        }
      }
    },
    addProgramarEntrevista(meetLink) {
      this.$refs.form.validate();
      let hora = new Date(this.datosEntrevista.fechaHoraEntrevista);
      const correoPsicologo = this.entrevistadorDatos.find(
        (psicologo) => psicologo.nombre === this.datosEntrevista.entrevistador
      );
      let UID = firebase.auth().currentUser.uid;
      let datosEntrevistaProgramada = {
        id_postulante: this.datosEntrevista.idPostulante,
        id_igc: this.dataSelectedIgc[0].id_igc,
        documento: this.datosEntrevista.documento,
        nombres: this.datosEntrevista.nombres,
        correo: this.datosEntrevista.correo,
        id_call: UID,
        /*    cuenta: this.dataSelectedIgc[0].cuenta,
        servicio: this.dataSelectedIgc[0].servicio, */
        horaEntrevista: hora.toLocaleTimeString(),
        fechaEntrevista: hora.toLocaleDateString(),
        entrevistador: this.datosEntrevista.entrevistador,
        correoEntrevistador: correoPsicologo.correo,
        tipoEntrevista: this.datosEntrevista.tipoEntrevista,
        /*    igc: this.datosEntrevista.igc,
        modalidad: this.dataSelectedIgc[0].modalidad, */
        fechaHoraEntrevista: this.datosEntrevista.fechaHoraEntrevista,
        meetLink: meetLink,
      };
      let EntrevistaProgramada = JSON.parse(
        JSON.stringify(datosEntrevistaProgramada)
      );
      if (this.datosEntrevista.enabledEdit == false) {
        const EntrevistaProgramadaKey = firebase
          .database()
          .ref("ENTREVISTA_PROGRAMADA")
          .push().key;
        firebase
          .database()
          .ref("ENTREVISTA_PROGRAMADA")
          .child(EntrevistaProgramadaKey)
          .set(EntrevistaProgramada);
      } else {
        firebase
          .database()
          .ref("ENTREVISTA_PROGRAMADA")
          .child(this.datosEntrevista.idEntrevista)
          .update(EntrevistaProgramada);
        this.getPostulantData();
      }
      this.$refs.form.reset();
    },
    getInternetText(item) {
      if (item.equipoTecnicos[0] !== undefined) {
        if (item.equipoTecnicos[0].datosEquiposTi.dispositivo !== undefined) {
          const equipoTI = item.equipoTecnicos[0].datosEquiposTi.dispositivo;
          if (Array.isArray(equipoTI)) {
            if (
              equipoTI.includes("Computadora") ||
              equipoTI.includes("Laptop")
            ) {
              return "Si";
            } else {
              return "No";
            }
          } else {
            if (equipoTI === "Computadora" || equipoTI === "Laptop")
              return "Si";
            else return "No";
          }
        } else return "-";
      } else return "-";
    },
    getSede(item) {
      if (item.rotacion[0] !== undefined) {
        if (item.rotacion[0].dataRotacion.sede_preferencia !== undefined) {
          const arraySede = item.rotacion[0].dataRotacion.sede_preferencia;
          if (
            (arraySede.includes("A") ||
              arraySede.includes("B") ||
              arraySede.includes("C") ||
              arraySede.includes("D")) &&
            arraySede.includes("E")
          ) {
            return "Lima/Chiclayo";
          } else if (
            arraySede.includes("A") ||
            arraySede.includes("B") ||
            arraySede.includes("C") ||
            arraySede.includes("D")
          ) {
            return "Lima";
          } else return "Chiclayo";
        } else return "-";
      } else return "-";
    },
    clearFieldEntrevistador() {
      this.enableEntrevistador = [];
    },
    clearPsicologoEntrevista(datosEntrevista) {
      /*     console.log(datosEntrevista); */
      firebase
        .database()
        .ref("ENTREVISTA_PROGRAMADA")
        .child(datosEntrevista.idEntrevista)
        .update({
          correoEntrevistador: "",
          entrevistador: "",
        });
    },
    addPsicologo() {
      let datosPsicologos = {
        nombre: "Pierina Alessandra Polo Fernandez",
        correo: "pierina.polo@grupokonecta.com",
      };
      let psicologo = JSON.parse(JSON.stringify(datosPsicologos));
      const psicologoKey = firebase.database().ref("DATOS_PSICOLOGOS").push()
        .key;
      firebase
        .database()
        .ref("DATOS_PSICOLOGOS")
        .child(psicologoKey)
        .set(psicologo);
      this.getDatosPsicologo();
    },
    handleClientLoad() {
      this.api.load("client:auth2", this.initClient);
    },
    initClient() {
      let vm = this;
      vm.api.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then((_) => {
          // Listen for sign-in state changes.
          vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
        })
        .catch((e) => {
          this.errorMeet = `Ocurrio un error, ${e.error}`;
        });
    },
    handleAuthClick(event) {
      /*      console.log(event);
      console.log(this.authorized); */
      Promise.resolve(this.api.auth2.getAuthInstance().signIn()).then((_) => {
        this.authorized = true;
        /*         console.log("se inicio sesion"); */
      })
      .catch((e) => {
        switch (e.error) {
          case 'popup_closed_by_user':
            this.errorMeet = 'La ventana o popup de inicio de sesión fue cerrada antes de completarse la activación de la Meet'
            break;
        
          default:
              this.errorMeet = `Ocurrió un error al activar meet: ${e.error}`;
            break;
        }
      });
    },
    handleSignoutClick(event) {
      Promise.resolve(this.api.auth2.getAuthInstance().signOut()).then((_) => {
        this.authorized = false;
        /*         console.log("se cerro sesion"); */
      })
      .catch((e) => {
        this.errorMeet = `Ocurrió un error al activar meet: ${e.error}`;
      });
    },
    executeGoogleMeet() {
      const that = this;
      const correoPsicologo = this.entrevistadorDatos.find(
        (psicologo) => psicologo.nombre === this.datosEntrevista.entrevistador
      );
      console.log("correoPsicologo", correoPsicologo.correo);
      console.log("correo del postulante", this.datosEntrevista.correo);
      return this.api.client.calendar.events
        .insert({
          // calendarId: "choque101108@gmail.com",
          calendarId: "experienciadeclientes@grupokonecta.com",
          conferenceDataVersion: 1,
          maxAttendees: 3,
          sendNotifications: true,
          sendUpdates: "all",
          supportsAttachments: true,
          prettyPrint: true,
          resource: {
            start: {
            dateTime: this.datosEntrevista.fechaHoraEntrevista,
              },
            end: {
              dateTime: this.datosEntrevista.fechaHoraEntrevista,
            },
            attendees: [
              {
                email: this.datosEntrevista.correo,
              },
              {
                email: correoPsicologo.correo,
              },
            ],
            conferenceData: {
              createRequest: {
                requestId: "hangoutsMeet",
              },
            },
            summary: "Entrevista de trabajo Konecta",
            description:
              "Hola " +
              this.datosEntrevista.nombres +
              " ¡Estás a un paso de ser parte de la familia Konecta! Ahora queremos conversar contigo en una entrevista personal.",
          },
        })
        .then(
          (res) => {
            const meetLink = res.result.hangoutLink;
            this.addProgramarEntrevista(meetLink);
          },
          function (e) {
            let errorMeet = '';
            switch (e.result.error.message) {
              case 'You need to have writer access to this calendar.':
                errorMeet = 'El correo con el que se inició sesión no tiene acceso a un calendario.'
                break;
              case 'Missing attendee email.':
                errorMeet = 'El correo electrónico del postulante ó psicólogo no fue obtenido.'
                break;
              case 'Invalid attendee email.':
                errorMeet = 'El correo electrónico del postulante ó psicólogo no es válido.'
                break;
              case 'API key not valid. Please pass a valid API key.':
                errorMeet = 'Clave API no es válida.'
                break;
              case 'Start and end times must either both be date or both be dateTime.':
                errorMeet = 'El horario seleccionado de la Meet no tiene un formato válido.'
                break;
              default:
                errorMeet = `Ocurrió un error : ${e.result.error.message}`
                break;
            }
            that.errorMeet = errorMeet; 
          }
        );
    },
  },
};
</script>

<style>
.vdatetime {
  padding: 2px 10px 5px;
  font-size: 16px;
  border-bottom: solid 1px #9c9595 !important;
  color: #444;
}
.colorMsgError {
  color: red;
}
.sectionDivider {
  border-bottom: 2px solid teal;
}
.spaceWidt {
  width: 100px;
}
.rowTabs {
  width: 100%;
  margin-top: 20px;
  margin-left: 1px;
}
.fieldCol {
  display: flex;
  width: 50px;
  text-align: right;
  justify-content: right;
  justify-items: right;
  align-content: right;
  align-items: right;
  border: 1px solid red;
}
.sectionTabs {
  width: 300px;
}
.secondRow,
.fiveRow {
  margin-left: -26px;
  margin-top: -20px;
}
.fiveRow {
  margin-top: -30px;
}
.thirdRow {
  margin-left: -26px;
}
.fourRow {
  margin-top: -8px;
}
.sizeField {
  width: 220px;
}
.sectionExp {
  margin-top: -30px;
}
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: #747474;
  background-color: white;
  border: 1px solid #747474;
  border-radius: 10px 10px 0 0;
}
.theme--light.v-tabs .v-tab--active:hover::before,
.theme--light.v-tabs .v-tab--active {
  color: #f5f5f5;
  background-color: #00968f;
  border-radius: 10px 10px 0 0;
}
.iconTab {
  border: none;
}
.subtitle {
  color: #747474;
  font-size: 15px;
}
.rowTime {
  margin-top: -10px;
}
.sectionButton {
  margin-top: -20px;
}
.fieldHours,
.fieldHours2 {
  width: 60px;
  margin-top: -20px;
  margin-right: 70px;
  margin-left: 25px;
}
.fieldHours2 {
  margin-top: -5px;
}
.titleHours {
  margin-right: 80px;
}
.selectDays {
  width: 180px;
  margin-right: 10px;
  margin-top: -5px;
}
.sixExp {
  margin-top: -20px;
}
.fieldModalidad {
  margin-top: -30px;
  width: 180px;
}
.filterTecnico {
  margin-top: 40px;
}
</style>