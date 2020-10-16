<template>
  <v-container>
    <h2 class="mb-5">Reportes y Gráficos Generales</h2>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="7">
        <h4 class="mt-5 py-1">
          <v-icon color="teal" class="px-1 mb-2">bar_chart</v-icon>Gráficos
        </h4>
      </v-col>
      <v-col cols="5">
        <h4 class="mt-5 py-1">
          <v-icon color="teal" class="pl-1 pr-2 mb-2">library_books</v-icon
          >Reportes
        </h4>
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col cols="7">
          <v-expansion-panels class="" v-model="panel">
            <v-expansion-panel>
              <v-expansion-panel-header>
                Grafico de tipificación total Mes - Día
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="px-2">
                  <v-col class="col-3">
                    <v-menu
                      v-model="menuByMonthDaily"
                      :close-on-content-click="false"
                      max-height="500"
                      max-width="290"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :value="dateComputedReportMonthDaily"
                          label="Seleccione el Mes:"
                          readonly
                          dense
                          v-on="on"
                          color="teal"
                          @click:clear="dateReportMonthDaily = null"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="ES-es"
                        color="teal"
                        type="month"
                        no-title
                        v-model="dateReportMonthDaily"
                        @change="
                          menuByMonthDaily = false;
                          getDateOfMonth(dateReportMonthDaily);
                        "
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col class="col-2 mr-5 text-end" offset-md="6">
                    <v-btn
                      width="120"
                      class="text-capitalize"
                      dark
                      color="#EF6C00"
                      v-promise-btn
                      @click="getDateOfMonth(dateReportMonthDaily)"
                    >
                      <v-icon left>show_chart</v-icon>Graficar
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="chart-content">
                  <ReportsTotalsByDay
                    v-if="loaded"
                    :chart-data="dataChartByMonthDaily"
                    :chart-labels="labelsChartByMonthDaily"
                  />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels class="mt-4" v-model="panel2" tile>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Reporte de Tipificación Diario - Entrevistador
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="px-1">
                  <v-col class="col-3">
                    <v-menu
                      v-model="menuByInterviewerDaily"
                      :close-on-content-click="false"
                      max-width="290"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :value="dateComputedReportMonthDaily"
                          label="Seleccione el Mes:"
                          readonly
                          dense
                          v-on="on"
                          color="teal"
                          @click:clear="dateReportMonthDaily = null"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="ES-es"
                        color="teal"
                        type="month"
                        no-title
                        v-model="dateReportMonthDaily"
                        @change="
                          menuByInterviewerDaily = false;
                          dataChartByMonthDailyInterviewer = [];
                          getDateOfMonth(dateReportMonthDaily);
                        "
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col class="col-6">
                    <v-autocomplete
                      color="teal"
                      dense
                      v-model="selectedInterviewer"
                      :items="itemsInterviewer"
                      label="Entrevistador"
                      @change="
                        filterByInterviewer(selectedInterviewer);
                        getDateOfMonth(dateReportMonthDaily);
                      "
                    ></v-autocomplete>
                  </v-col>
                  <v-col class="col-2 text-end">
                    <v-row>
                      <v-btn
                        width="120"
                        class="text-capitalize ml-3"
                        dark
                        color="#EF6C00"
                        v-promise-btn
                        @click="filterByInterviewer(selectedInterviewer)"
                      >
                        <v-icon left>show_chart</v-icon>Graficar
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
                <div class="chart-content">
                  <ReportsTotalsByInterviewer
                    v-if="loadedInterview"
                    :chart-data="dataChartByMonthDailyInterviewer"
                    :chart-labels="labelsChartByMonthDaily"
                  />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels class="mt-4" v-model="panel3" tile>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Reporte de Tipificación Mes - Año
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="px-2">
                  <v-col class="col-3">
                    <v-select
                      color="teal"
                      dense
                      v-model="selectedYear"
                      :items="itemsYears"
                      label="Seleccione año"
                      @change="getAllInterviews(selectedYear)"
                      @click="getAllInterviews(selectedYear)"
                    >
                    </v-select>
                  </v-col>
                  <v-col class="col-3 text-end" offset-md="6">
                    <v-row>
                      <v-btn
                        width="120"
                        class="text-capitalize ml-3"
                        dark
                        color="#EF6C00"
                        v-promise-btn
                        @click="getAllInterviews(selectedYear)"
                      >
                        <v-icon>show_chart</v-icon>Graficar
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
                <div class="chart-content">
                  <ReportsTotalsByYear
                    v-if="loadedYear"
                    :chart-data="dataChartByMonthYear"
                    :chart-labels="months"
                  />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="5">
          <v-expansion-panels class="" v-model="panel4">
            <v-expansion-panel @click="showWarning1 = false; showInfo1 = false">
              <v-expansion-panel-header
                >Listado de Entrevistas</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="6">
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      max-width="290"
                    >
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
                  <v-col cols="6">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      max-width="290"
                    >
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
                  <v-col cols="12" class="text-center">
                    <v-row>
                      <v-col cols="6">
                        <v-btn  color="#EF6C00" dark class="text-capitalize" outlined
                          @click="getAllDataInterviews(date, date2)"
                          v-promise-btn
                            >Generar Excel<small>(1)</small>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                          <v-btn color="#102980" dark class="text-capitalize"
                          ><download-excel
                          :data="dataCompletedInterviews"
                          name="lista_entrevista.xls"
                          >Descargar <small>(2)</small> </download-excel
                          ><v-icon>save_alt</v-icon>
                      </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-alert
                            dense
                            class="alert"
                            v-if="showWarning1"
                            border="left"
                            type="warning"
                          >
                          No existe <strong>data disponible </strong>para ese <strong>rango de fechas</strong>
                        </v-alert>
                        <v-alert
                            dense
                            class="info"
                            v-if="showInfo1"
                            border="left"
                            type="info"
                          >
                          Ahora ya puedes <strong>descargar </strong>el <strong>archivo </strong>
                        </v-alert>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels class="mt-4" v-model="panel5">
            <v-expansion-panel @click="showWarning2 = false; showInfo2 = false">
              <v-expansion-panel-header
                >Listado de Evaluaciones</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="6">
                    <v-menu
                      v-model="menu3"
                      :close-on-content-click="false"
                      max-width="290"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          prepend-icon="event"
                          :value="computedDateFormattedMomentjs3"
                          label="Desde:"
                          readonly
                          v-on="on"
                          color="teal"
                          @click:clear="date3 = null"
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-PE"
                        color="teal"
                        no-title
                        v-model="date3"
                        @change="menu3 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      v-model="menu4"
                      :close-on-content-click="false"
                      max-width="290"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          prepend-icon="event"
                          :value="computedDateFormattedMomentjs4"
                          label="Hasta:"
                          readonly
                          v-on="on"
                          color="teal"
                          @click:clear="date4 = null"
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-PE"
                        color="teal"
                        no-title
                        v-model="date4"
                        @change="menu4 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <v-row>
                      <v-col cols="6">
                        <v-btn  color="#EF6C00" dark class="text-capitalize" outlined
                          @click="getAllDataEvaluations(date3, date4)"
                          v-promise-btn
                            >Generar Excel<small>(1)</small>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                          <v-btn color="#102980" dark class="text-capitalize"
                          ><download-excel
                          :data="dataCompletedEvaluations"
                          name="lista_evaluaciones.xls"
                          >Descargar <small>(2)</small> </download-excel
                          ><v-icon>save_alt</v-icon>
                      </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                      <v-alert
                          dense
                          class="alert"
                          v-if="showWarning2"
                          border="left"
                          type="warning"
                        >
                        No existe <strong>data disponible </strong>para ese <strong>rango de fechas</strong>
                      </v-alert>
                      <v-alert
                            dense
                            class="info"
                            v-if="showInfo2"
                            border="left"
                            type="info"
                          >
                          Ahora ya puedes <strong>descargar </strong>el <strong>archivo</strong>
                        </v-alert>
                    </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ReportsTotalsByDay from "../components/Graphics/ReportsTotalsByDay.vue";
import ReportsTotalsByInterviewer from "../components/Graphics/ReportsTotalsByInterviewer.vue";
import ReportsTotalsByYear from "../components/Graphics/ReportsTotalsByYear.vue";

import firebase from "firebase";
import moment from "moment";
import _ from "lodash";

moment.locale("es");

export default {
  components: {
    ReportsTotalsByDay,
    ReportsTotalsByInterviewer,
    ReportsTotalsByYear,
  },
  data() {
    return {
      panel: [0, 1],
      panel2: [0, 1],
      panel3: [0, 1],
      panel4: [0, 1],
      panel5: [0, 1],
      disabled: false,
      disabled2: false,
      readonly: false,
      focusable: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      date3: new Date().toISOString().substr(0, 10),
      date4: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      
      /* ReportsTotalsByDay */
      dateReportMonthDaily: new Date().toISOString(),
      menuByMonthDaily: false,
      loaded: false,
      daysOfMonth: 0,
      arrayAptos: [],
      arrayNoAptos: [],
      arrayRecPropuesta: [],
      arrayAusente: [],
      arrayTotals: [],
      postulantesDataAll: [],
      labelsChartByMonthDaily: [],
      dataChartByMonthDaily: {
        aptos: [],
        noAptos: [],
        recPropuesta: [],
        ausente: [],
        totals: [],
      },
      /* ReportsTotalsByInterviewer */
      dateReportInterviewerDaily: new Date().toISOString(),
      menuByInterviewerDaily: false,
      activeInterviewer: false,
      loadedInterview: false,
      selectedInterviewer: "",
      arrayAptosInterviewer: [],
      arrayNoAptosInterviewer: [],
      arrayRecPropuestaInterviewer: [],
      arrayAusenteInterviewer: [],
      arrayTotalsInterviewer: [],
      itemsInterviewer: [],
      totalData: [],
      dataComplete: [],
      dataChartByMonthDailyInterviewer: {
        aptos: [],
        noAptos: [],
        recPropuesta: [],
        ausente: [],
        totals: [],
      },
      /* ReportsTotalsByYear */
      itemsYears: ["2020", "2021", "2022", "2023", "2024"],
      selectedYear: "2020",
      loadedYear: false,
      months: moment.months(),
      dataChartByYear: [],
      dataChartByMonthYear: {
        aptos: [],
        noAptos: [],
        recPropuesta: [],
        ausente: [],
        totals: [],
      },
      dataCompletedInterviews: [],
      dataCompletedEvaluations: [],
      showInfo1: false,
      showInfo2: false,
      showWarning1: false,
      showWarning2: false
    };
  },
  computed: {
    dateComputedReportMonthDaily() {
      return this.dateReportMonthDaily
        ? moment(this.dateReportMonthDaily)
            .subtract(0, "month")
            .startOf("month")
            .format("MMMM")
            .toUpperCase()
        : "";
    },
    dateComputedReportInterviewerDaily() {
      return this.dateReportInterviewerDaily
        ? moment(this.dateReportInterviewerDaily).format("DD/MM/YYYY")
        : "";
    },
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedMomentjs2() {
      return this.date2 ? moment(this.date2).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedMomentjs3() {
      return this.date3 ? moment(this.date3).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedMomentjs4() {
      return this.date4 ? moment(this.date4).format("DD/MM/YYYY") : "";
    },
  },
  created() {
    this.getInterviewers();
  },
  mounted() {
    this.getInterviewers();

    /*     this.getMonthsChartMonth(); */
  },
  methods: {
    /* ReportsTotalsByDay */
    getMonthsChartMonth() {
      const monthInitial = moment(new Date())
        .subtract(-1, "month")
        .startOf("month")
        .daysInMonth();
    },
    getDateOfMonth(date) {
      this.arrayAptos = [];
      this.arrayNoAptos = [];
      this.arrayRecPropuesta = [];
      this.arrayAusente = [];
      this.arrayTotals = [];
      this.labelsChartByMonthDaily = [];
      this.totalData = [];
      const days = moment(date)
        .subtract(0, "month")
        .startOf("month")
        .daysInMonth();
      this.daysOfMonth = days;
      const arrayDays = [];
      for (let i = 1; i <= days; i++) {
        const element = i;
        this.getDataOfInterviews(i);
        arrayDays.push(element);
      }
      this.labelsChartByMonthDaily = arrayDays;
    },
    getDataOfInterviews(day) {
      let listOfInterviews = [];
      let postulantesAll = [];
      const arrayAptos = [];
      let estado = "";
      let totalNoAptosByDay = 0;
      let totalRecPropuestaByDay = 0;
      let totalAusenteByDay = 0;
      const dateMonth = `${day}/${moment(this.dateReportMonthDaily).format(
        "M/YYYY"
      )}`;
      const db = firebase.database();
      const ref = db.ref("ENTREVISTA_PROGRAMADA");
      ref
        .orderByChild("fechaEntrevista")
        .equalTo(dateMonth)
        .on("value", function(snapshot) {
          snapshot.forEach(function(data) {
            listOfInterviews.push({
              id: data.key,
              idPostulante: data.val().id_postulante,
              fechaEntrevista: data.val().fechaEntrevista,
              entrevistador: data.val().entrevistador,
            });
          });
        });
      for (let i in listOfInterviews) {
        estado = this.getEvaluation(listOfInterviews[i].idPostulante);
        postulantesAll.push({
          estado,
          entrevistador: listOfInterviews[i].entrevistador,
        });
      }
      /* console.log('data',postulantesAll); */
      this.filterByStatus(postulantesAll);
    },
    filterByStatus(data) {
      const arrayAptosByDay = [];
      const arrayNoAptosByDay = [];
      const arrayRecPropuestaByDay = [];
      const arrayAusentesByDay = [];
      const arrayTotalsByDay = [];

      let totalAptosByDay = 0;
      let totalNoAptosByDay = 0;
      let totalRecPropuestaByDay = 0;
      let totalAusentesByDay = 0;
      let totalByDay = 0;

      totalAptosByDay = _.filter(data, function(o) {
        return o.estado === "APTO";
      }).length;
      totalNoAptosByDay = _.filter(data, function(o) {
        return o.estado === "NO APTO";
      }).length;
      totalRecPropuestaByDay = _.filter(data, function(o) {
        return o.estado === "Rechaza Propuesta";
      }).length;
      totalAusentesByDay = _.filter(data, function(o) {
        return o.estado === "No se presentó";
      }).length;
      totalByDay = data.length;

      this.arrayAptos.push(totalAptosByDay);
      /* console.log('APTOS',this.arrayAptos); */
      if (this.arrayAptos.length === this.daysOfMonth) {
        this.dataChartByMonthDaily.aptos = this.arrayAptos;
      }
      this.arrayNoAptos.push(totalNoAptosByDay);
      /* console.log('NO APTOS',this.arrayNoAptos); */
      if (this.arrayNoAptos.length === this.daysOfMonth) {
        this.dataChartByMonthDaily.noAptos = this.arrayNoAptos;
      }
      this.arrayRecPropuesta.push(totalRecPropuestaByDay);
      /* console.log('REC PROPUESTA',this.arrayRecPropuesta); */
      if (this.arrayRecPropuesta.length === this.daysOfMonth) {
        this.dataChartByMonthDaily.recPropuesta = this.arrayRecPropuesta;
      }
      this.arrayAusente.push(totalAusentesByDay);
      /* console.log('AUSENTE',this.arrayAusente); */
      if (this.arrayAusente.length === this.daysOfMonth) {
        this.dataChartByMonthDaily.ausente = this.arrayAusente;
      }
      this.arrayTotals.push(totalByDay);
      /* console.log('TOTALS',this.arrayTotals); */
      if (this.arrayTotals.length === this.daysOfMonth) {
        this.dataChartByMonthDaily.totals = this.arrayTotals;
      }
      this.totalData.push(data);
      if (this.totalData.length === this.daysOfMonth) {
        this.dataComplete = this.totalData;
      }
      this.loaded = true;
    },
    getEvaluation(id) {
      const db = firebase.database();
      const ref = db.ref("EVALUACION_PROGRAMADA");
      let estado = "";
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            estado = datoSnapshot.val().estado;
          });
        });
      return estado;
    },
    /* ReportsTotalsByInterviewer */
    getInterviewers() {
      const interviewers = [];
      firebase
        .database()
        .ref("USERS")
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            if (
              datoSnapshot.val().userRole === "Selector" ||
              datoSnapshot.val().userRole === "Call/Selector"
            ) {
              interviewers.push(
                `${datoSnapshot.val().name} ${datoSnapshot.val().lastName}`
              );
            }
          });
        });
      this.itemsInterviewer = interviewers;
    },
    filterByInterviewer(interviewer) {
      const data = this.dataComplete.slice();
      let newData = [];
      newData = data.map((array) =>
        array.filter((element) => {
          return (
            element.entrevistador.toUpperCase() === interviewer.toUpperCase()
          );
        })
      );
      this.filterByStatusInterviewer(newData);
    },
    filterByStatusInterviewer(data) {
      const arrayAptosByDay = [];
      const arrayNoAptosByDay = [];
      const arrayRecPropuestaByDay = [];
      const arrayAusentesByDay = [];
      const arrayTotalsByDay = [];

      let totalAptosByDay = 0;
      let totalNoAptosByDay = 0;
      let totalRecPropuestaByDay = 0;
      let totalAusentesByDay = 0;
      let totalByDay = 0;

      this.loadedInterview = true;
      totalAptosByDay = data.map(
        (array) =>
          array.filter((o) => {
            return o.estado === "APTO";
          }).length
      );
      totalNoAptosByDay = data.map(
        (array) =>
          array.filter((o) => {
            return o.estado === "NO APTO";
          }).length
      );
      totalRecPropuestaByDay = data.map(
        (array) =>
          array.filter((o) => {
            return o.estado === "Rechaza Propuesta";
          }).length
      );
      totalAusentesByDay = data.map(
        (array) =>
          array.filter((o) => {
            return o.estado === "No se presentó";
          }).length
      );
      totalByDay = data.map(
        (array) =>
          array.filter((o) => {
            return o;
          }).length
      );

      this.dataChartByMonthDailyInterviewer.aptos = totalAptosByDay;
      this.dataChartByMonthDailyInterviewer.noAptos = totalNoAptosByDay;
      this.dataChartByMonthDailyInterviewer.recPropuesta = totalRecPropuestaByDay;
      this.dataChartByMonthDailyInterviewer.ausente = totalAusentesByDay;
      if (this.dataChartByMonthDailyInterviewer.aptos.length > 0) {
        this.dataChartByMonthDailyInterviewer.totals = totalByDay;
      }
    },
    /* ReportsByYear */
    async getAllInterviews(selectedYear) {
      let interviews = [];
      const snapshot = await firebase
        .database()
        .ref("ENTREVISTA_PROGRAMADA")
        .once("value");
      snapshot.forEach((childSnapshot) => {
        interviews.push(childSnapshot.val());
      });
      this.getAllEvaluations(interviews, selectedYear);
    },
    getAllEvaluations(dataAllInterviews, selectedYear) {
      this.dataChartByMonthYear.aptos = [];
      this.dataChartByMonthYear.noAptos = [];
      this.dataChartByMonthYear.recPropuesta = [];
      this.dataChartByMonthYear.ausente = [];
      this.dataChartByMonthYear.totals = [];
      let dataInterviews = [];
      let arrayAptosByMonth = [];
      let arrayNoAptosByMonth = [];
      let arrayRecPropuestaByMonth = [];
      let arrayAusentesByMonth = [];
      let arrayTotalsByMonth = [];
      dataInterviews = dataAllInterviews.map((interview) => ({
        fechaEntrevista: interview.fechaEntrevista,
        estado: this.getEvaluation(interview.id_postulante),
      }));
      this.loadedYear = true;
      for (let i = 1; i <= 12; i++) {
        let fecha = `${i}/${selectedYear}`;
        dataInterviews.filter((elem) => {
          if (elem.fechaEntrevista.includes(fecha)) {
            let estado = elem.estado;
            if (estado === "APTO") {
              arrayAptosByMonth.push(elem.estado);
            } else if (estado === "NO APTO") {
              arrayNoAptosByMonth.push(elem.estado);
            } else if (estado === "Rechaza Propuesta") {
              arrayRecPropuestaByMonth.push(elem.estado);
            } else if (estado === "No se presentó") {
              arrayAusentesByMonth.push(elem.estado);
            }
            arrayTotalsByMonth.push(elem);
          }
        });

        this.dataChartByMonthYear.aptos.push(arrayAptosByMonth.length);
        this.dataChartByMonthYear.noAptos.push(arrayNoAptosByMonth.length);
        this.dataChartByMonthYear.recPropuesta.push(
          arrayRecPropuestaByMonth.length
        );
        this.dataChartByMonthYear.ausente.push(arrayAusentesByMonth.length);
        this.dataChartByMonthYear.totals.push(arrayTotalsByMonth.length);
        arrayAptosByMonth = [];
        arrayNoAptosByMonth = [];
        arrayRecPropuestaByMonth = [];
        arrayAusentesByMonth = [];
        arrayTotalsByMonth = [];
      }
    },
    async getAllDataInterviews(start, end) {
      console.log('START',start);
      console.log('END',end);
      let interviews = [];
      let startDate = new Date(start);
      let msStartDate = startDate.getTime();
      let endDate = new Date(end);
      let msEndDate = endDate.getTime();
      console.log('START date', msStartDate);
      console.log('END date',msEndDate);

      const snapshot = await firebase
        .database()
        .ref("ENTREVISTA_PROGRAMADA")
        .once("value");

      snapshot.forEach((childSnapshot) => {
        interviews.push(childSnapshot.val());
      });

        this.dataCompletedInterviews = this.filterInterviews(interviews, startDate, endDate);
        if (this.dataCompletedInterviews.length === 0) {
            this.showWarning1 = true;
            this.showInfo1 = false;
        } else {
          this.showWarning1 = false;
          this.showInfo1 = true;
        }
      
    },
    filterInterviews(interviews, startDate, endDate){
      let filteredInterviews = [];
      let totalInterviews = [];
      filteredInterviews = interviews.filter(
        (interview) => new Date(interview.fechaHoraEntrevista).getTime() >=
            startDate &&
          new Date(interview.fechaHoraEntrevista).getTime() <= endDate
      );
      
      totalInterviews = filteredInterviews.map((interview) => {
        return {
          'NOMBRE POSTULANTE': interview.nombres,
          'NOMBRE ENTREVISTADOR': interview.entrevistador,
          'CORREO POSTULANTE': interview.correo,
          'DNI POSTULANTE': interview.documento,
          'CORREO ENTREVISTADOR': interview.correoEntrevistador,
          'LINK MEET': interview.meetLink,
          'FECHA ENTREVISTA': interview.fechaEntrevista,
          'HORA ENTREVISTA': interview.horaEntrevista,
          'TIPO ENTREVISTA': interview.tipoEntrevista,
        }
      });
      return totalInterviews;
    },
    async getAllDataEvaluations(start, end) {
      console.log('START',start);
      console.log('END',end);
      let evaluations = [];
      let dataEvaluations = [];
      let startDate = new Date(start);
      let msStartDate = startDate.getTime();
      let endDate = new Date(end);
      let msEndDate = endDate.getTime();
      console.log('START date', msStartDate);
      console.log('END date',msEndDate);

      const snapshot = await firebase
        .database()
        .ref("EVALUACION_PROGRAMADA")
        .once("value");

      snapshot.forEach((childSnapshot) => {
        evaluations.push(childSnapshot.val());
      });
      
      dataEvaluations = evaluations.map((evaluation) => {
          return {
            ...evaluation,
            fechaEntrevista: this.getDateInterviewById(evaluation.id_postulante),
            entrevistador: this.getInterviewById(evaluation.id_postulante)
          }
        })
          this.dataCompletedEvaluations = this.filterEvaluations(dataEvaluations, startDate, endDate);
          if (this.dataCompletedEvaluations.length === 0) {
            this.showWarning2 = true;
            this.showInfo2 = false;
          } else {
          this.showWarning2 = false;
          this.showInfo2 = true;
        }
    },
    getDateInterviewById(id) {
      const db = firebase.database();
      const ref = db.ref("ENTREVISTA_PROGRAMADA");
      let dateInterview = '';
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            dateInterview = datoSnapshot.val().fechaHoraEntrevista;
          });
        });
      return dateInterview;
    },
    getInterviewById(id) {
      const db = firebase.database();
      const ref = db.ref("ENTREVISTA_PROGRAMADA");
      let interviewer = '';
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            interviewer = datoSnapshot.val().entrevistador;
          });
        });
      return interviewer;
    },
    filterEvaluations(evaluations, startDate, endDate){
      console.log('input',evaluations);
      let filteredEvaluations = [];
      let totalEvaluations = [];
      filteredEvaluations = evaluations.filter(
        (evaluation) => new Date(evaluation.fechaEntrevista).getTime() >=
            startDate &&
          new Date(evaluation.fechaEntrevista).getTime() <= endDate
      );
      console.log('filteredEvaluations',filteredEvaluations);
      totalEvaluations = filteredEvaluations.map((evaluation) => {
        return {
          'NOMBRE POSTULANTE': evaluation.nombres,
          'NOMBRE ENTREVISTADOR': evaluation.entrevistador,
          'ESTADO': evaluation.estado,
          'IGC': evaluation.IGC,
          'COMPETENCIAS EVALUADAS': evaluation.compet_evaluadas ? evaluation.compet_evaluadas.toString() : '',
          'CORREO POSTULANTE': evaluation.correo,
          'OBSERVACIONES': evaluation.observaciones,
        }
      });
      console.log(totalEvaluations);
      return totalEvaluations;
    },
  },
};
</script>

<style lang="scss">
  
  small, .alert, .info {
    font-size: 11px;
  }


</style>
