<template>
  <v-container>
    <v-row class="mt-0 pt-0 pl-2">
      <h1 class="headline font-weight-bold mb-3">Lista de postulantes</h1>
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
                        {{ dateFormattedBegin || "Not set" }}
                      </v-col>
                      <v-col cols="6">
                        Hasta:
                        {{ dateFormattedEnd || "Not set" }}
                      </v-col>
                    </v-row>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="justify-space-between">
                <v-col cols="2">
                  <v-menu v-model="menuBegin" :close-on-content-click="false" max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        prepend-icon="event"
                        :value="dateFormattedBegin"
                        label="Desde:"
                        readonly
                        v-on="on"
                        color="teal"
                        @click:clear="dateBegin = null"
                        hide-details
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="es-PE"
                      color="teal"
                      no-title
                      v-model="dateBegin"
                      @change="menuBegin = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="2">
                  <v-menu v-model="menuEnd" :close-on-content-click="false" max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        prepend-icon="event"
                        :value="dateFormattedEnd"
                        label="Hasta:"
                        readonly
                        v-on="on"
                        color="teal"
                        @click:clear="dateEnd = null"
                        hide-details
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="es-PE"
                      color="teal"
                      no-title
                      v-model="dateEnd"
                      @change="menuEnd = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4" class="mt-4">
                  <v-select
                    color="teal"
                    :items="listCuenta"
                    v-model="itemCuenta"
                    label="Cuenta"
                    dense
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="3" class="mt-4">
                  <v-select
                    color="teal"
                    :items="listIGC"
                    v-model="itemIGC"
                    label="IGC"
                    dense
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="2">
        <v-btn width="152" class="ma-2" dark color="#EF6C00">
          <v-icon left>search</v-icon>Analizar
        </v-btn>
        <v-btn
          width="152"
          class="ma-2 text-capitalize"
          dark
          color="#00B8AD"
        >
          <v-icon>save_alt</v-icon>
          <download-excel :data="postulantesExcel" name="lista_postulantes.xls">Descargar</download-excel>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="align-center justify-center">
      <v-data-table :headers="headers" :items="postulanteTable"></v-data-table>
      <template v-slot:item.estado="{ item }">
          <v-select
            x-small
            :items="listEstado"
            v-model="item.estado_call"
            label="Seleccionar"
          ></v-select>
        </template>
        <template v-slot:item.perfil="{ item }">
          <v-btn
            small
            color="#00B8AD"
            dark
            class="text-capitalize"
          >Ver perfil</v-btn>
        </template>
        <template v-slot:item.entrevista="{ item }">
          <v-btn
            class="text-capitalize"
            small
            dark
            color= "orange"
            >Agendar</v-btn>
        </template>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  name: "Analitica",

  data() {
    return {
      dateBegin: new Date().toISOString().substr(0, 10),
      dateEnd: new Date().toISOString().substr(0, 10),
      menuBegin: false,
      menuEnd: false,
      itemIGC: "",
      itemCuenta: "",
      postulantesExcel: [],
      postulanteTable:[],
      listCuenta: [
        "AFP INTEGRA – SURA",
        "AJE",
        "ALICORP S.A.A",
        "BANBIF",
        "BANCO CONTINENTAL",
        "BANCO GNB PERÚ S.A.",
        "BERLITZ",
        "BRITISH TELECOM",
        "CALIDDA",
        "CENCOSUD",
        "CENCOSUD MDH",
        "CLARO CHILE",
        "CLARO PERÚ",
        "DERRAMA MAGISTERIAL",
        "DINERS",
        "ENTEL",
        "ENTEL PERÚ",
        "EXPERIENCIA AL CLIENTE Y ANALITICA",
        "FARMACIA VECINA",
        "FENOSA",
        "INNOVA SCHOOL",
        "KREALO",
        "LAN",
        "MEDIOS",
        "MOVISTAR ARGENTINA",
        "MOVISTAR CHILE",
        "MOVISTAR PERÚ",
        "ONCOSALUD",
        "ONO",
        "ORANGE",
        "ORGANIZACIÓN Y PROCEDIMIENTOS",
        "PACIFICO",
        "PERÚ  RRHH",
        "PERÚ ADMINISTRACIÓN",
        "PERÚ CALIDAD",
        "PERÚ COMERCIAL",
        "PERÚ OPERACIONES",
        "PERÚ TECNOLOGÍA",
        "RIMAC",
        "SANTANDER CONSUMO PERÚ S.A.",
        "TRANSFORMACION DIGITAL",
        "UNICEF",
        "UNIQUE",
        "VODAFONE",
        "VODAFONE UNE",
        "VODAFONE USAC",
      ],
      listIGC: [],
      headers: [
        { text: "Fecha de Registro", value: "date" },
        { text: "Nombres y Apellidos", value: "name" },
        { text: "Sede de Preferencia", value: "sede" },
        { text: "Programa", value: "programa" },
        { text: "IRP", value: "irp"},
        { text: "ISP", value: "isp"},
        { text: "Celular", value: "phone" },
        { text: "Estado", value: "estado", sortable: false },
        { text: "Perfil", value: "perfil", sortable: false },
        { text: "Entrevista", value: "entrevista", sortable: false },
      ],
      listEstado: [
        "Disponible para entrevista",
        "No Contesta",
        "Rechaza propuesta",
      ],
    };
  },

  computed: {
    dateFormattedBegin() {
      return this.dateBegin ? moment(this.dateBegin).format("DD/MM/YYYY") : "";
    },
    dateFormattedEnd() {
      return this.dateEnd ? moment(this.dateEnd).format("DD/MM/YYYY") : "";
    },
  },
};
</script>
