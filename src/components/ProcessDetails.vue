<template>
  <v-container>
    <h2 class="mb-5">Procesos de Selección</h2>
    <v-row>
      <a class="teal--text subtitle-1 font-weight-bold" @click="$router.go(-1)">
        <v-icon>keyboard_arrow_left</v-icon>Regresar
      </a>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6" class="pa-0 ml-5 mb-5">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row col="12" class="ml-1 mt-4">
      <v-col cols="8" sm="8" md="9" class="d-flex">
        <p class="mb-2 font-weight-bold">Lista de Postulantes:</p>
        <p class="pl-4 tittle secondary--text font-weight-bold">
          IGC {{ process.nombreIgc ? process.nombreIgc : "nohay igc" }} :
          {{ process.cuenta }} - {{ process.servicio }}
        </p>
      </v-col>
      <v-col cols="2" sm="3" md="3">
        <v-btn color="#102980" dark class="text--capitalize mb-2" width="200px"
          ><download-excel :data="postulantesExcel" name="lista_postulantes.xls"
            >Descargar Excel</download-excel
          ><v-icon>save_alt</v-icon>
        </v-btn>
        <v-btn color="#EF6C00" dark class="text--capitalize" width="200px" @click="generatePdf()"
          > Descargar PDF<v-icon>save_alt</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row  class="mt-5 mx-5" col="12" sm="12" md="12" lg="12">
      <div ref="mainTable">
        <v-col>
          <v-data-table
            class="text-capitalize"
            :items-per-page="itemsPerPage"
            :loading="postulantesTable.length <= 0"
            loading-text="Cargando... por favor espere un momento."
            :headers="headers"
            :items="postulantesTable"
            :search="search"
          >
            <template v-slot:item.perfil="{ item }">
              <v-btn
                small
                color="#00B8AD"
                dark
                @click="
                  $router.push({
                    name: 'applicantDetails',
                    params: { id: item.NRO, applicant: item },
                  })
                "
                >Ver perfil</v-btn
              >
            </template>
            <template v-slot:item.acciones="{ item }">
              <v-btn
                small
                color="transparent"
                @click="
                  openMigrarModal(item);
                  getIGCs(process.nombreIgc);
                "
              >
                <v-icon color="black">sync_alt</v-icon>Migrar</v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </div>
    </v-row>
    <v-row>
      <v-dialog v-model="dialogMigrar" persistent max-width="450px">
        <v-card>
          <v-card-title
            class="font-weight-bold justify-center"
            style="color: #00968f"
          >
            <span>Migrar Postulante</span>
          </v-card-title>
          <v-card-text>
            <p class="body-2 text-center">
              Seleccione el IGC a dónde desea trasladar al postulante.
            </p>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="8" class="py-0">
                  <v-autocomplete
                    color="teal"
                    :items="listOfIgcs"
                    v-model="selectedIgc"
                    label="IGC:"
                    @change="getIGCByName(selectedIgc)"
                    dense
                    hide-details
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-4" text @click="dialogMigrar = false"
              >Cancelar</v-btn
            >
            <v-btn color="orange" dark @click="migratePostulante()"
              >Migrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Modal confirmar migracion de postulante -->
      <v-dialog v-model="dialogConfirmMigrate" persistent max-width="450px">
        <v-card>
          <v-container>
            <v-row class="d-flex flex-row-reverse">
              <v-btn
                text
                @click="
                  dialogConfirmMigrate = false;
                  selectedIgc = '';
                "
                ><v-icon style="color:#B0B0B0">cancel</v-icon>
              </v-btn>
            </v-row>
          <v-card-title
            class="font-weight-bold justify-center"
            style="color: #00968f"
          >
            Postulante Migrado
          </v-card-title>
            <v-row
              class="text--secondary text-center font-weight-bold px-4"
              style="font-size:18px"
            >
              <v-col>
                <p>{{ nombrePostulante }} migrado a:</p>
                <p>IGC {{ selectedIgc }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import moment, { locale } from "moment";
import _ from "lodash";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'


import { getEvaluationByChild, getProgramedEvaluationByIdPostulant } from "../firebase/evaluationMethods";
import { getIgcByName } from "../firebase/processMethods";

export default {
  props: {
    idProcess: {
      type: String,
      required: false,
    },
    process: {
      type: Object,
      required: false,
    },
    igc: {
      type: String,
      required: false,
    },
  },

  created() {
    if (this.process === undefined) {
      this.process = JSON.parse(localStorage.getItem("process"));
    } else {
      localStorage.setItem("process", JSON.stringify(this.process));
    }
    if (this.igc === undefined) {
      this.igc = localStorage.getItem("igc");
    } else {
      localStorage.setItem("igc", this.igc);
    }
    if (this.idProcess === undefined) {
      this.idProcess = localStorage.getItem("idProcess");
    } else {
      localStorage.setItem("idProcess", this.idProcess);
    }
    this.getPostulantesByIgc();
  },
  data() {
    return {
      dialogMigrar: false,
      dialogConfirmMigrate: false,
      postulantesPdf: [],
      postulantesExcel: [],
      postulantesTable: [],
      dataSelectedIgc: [],
      nombrePostulante: "",
      search: "",
      selectedIgc: "",
      i: 1,
      idIgc: "",
      idPostulante: "",
      postulantes: [],
      headers: [
        { text: "N°", align: "start", value: "NRO", sortable: false },
        {
          text: "Nombres y Apellidos",
          value: "NOMBRES_APELLIDOS",
          class: "text-capitalize",
        },
        { text: "DNI", value: "NUM_DOC" },
        { text: "Teléfono", value: "TELEFONO" },
        { text: "Equipo PC ó Laptop", align: "center", value: "EQUIPO_TEC" },
        { text: "Internet", align: "center", value: "INTERNET" },
        { text: "Perfil", align: "center", value: "perfil", sortable: false },
        {
          text: "ACCIONES",
          align: "center",
          value: "acciones",
          sortable: false,
        },
      ],
      listOfIgcs: [],
      itemsPerPage: 50,
    };
  },
  methods: {
    openPerfilModal(item) {
      this.dialogMigrar = true;
    },
    openMigrarModal(item) {
      this.dialogMigrar = true;
      this.idPostulante = item.ID;
      this.nombrePostulante = item.NOMBRES_APELLIDOS;
    },
    async getIGCByName(igcName) {
      this.dataSelectedIgc = await getIgcByName(igcName)
    },
    getPostulantesByIgc() {
      let applicants = [];
    
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("EVALUACION_PROGRAMADA");
      ref
        .orderByChild("IGC")
        .equalTo(this.igc)
        .on("value", function (dataSnapshot) {
          dataSnapshot.forEach((element) => {
            applicants.push(element.val());
          });
        });
      ref
        .orderByChild("id_igc")
        .equalTo(this.idProcess)
        .on("value", function (dataSnapshot) {
          dataSnapshot.forEach((element) => {
            applicants.push(element.val());
          });
        });
      this.uploadPostulantes(applicants);
    },
    uploadPostulantes(data) {
      let totalPostulantes = [];
      /* Postulantes por IGC en estado APTO */
      totalPostulantes = _.filter(data, ["estado", "APTO"]);
      totalPostulantes.map(async (p) => {
        /* Obtener datos tech del post */
        await this.getDataTotalPostulante(p.id_postulante);
      });
    },
    async getPostulantesById(id) {
      let dataPostulante = {};
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("POSTULANTES");
      dataPostulante = await ref.child(id).once("value");
      return dataPostulante.val();
    },
    getEquiposTecnicos(id) {
      const db = firebase.database();
      const ref = db.ref("ESPECIFICACION_TECNICA");
      let EquiposTi = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            EquiposTi.push(datoSnapshot.val());
          });
        });
      return EquiposTi;
    },
    getDataExpPostById(id) {
      const db = firebase.database();
      const ref = db.ref("DATOS_EXPERIENCIA");
      let postulanteExperiencia = [];
      let i = 0;
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            i++;
            postulanteExperiencia.push({
              datosExperiencia: datoSnapshot.val(),
            });
          });
        });
      return postulanteExperiencia;
    },
    getDataProfPostById(id) {
      const db = firebase.database();
      const ref = db.ref("DATOS_PROFESIONALES");
      let postulanteFormacion = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function (querySnapshot) {
          querySnapshot.forEach(function (datoSnapshot) {
            postulanteFormacion.push({
              datosFormacion: datoSnapshot.val(),
            });
          });
        });
      return postulanteFormacion;
    },
    getDataRotacion(id) {
      const db = firebase.database();
      const ref = db.ref("DATOS_ROTACION");
      let dataRotacion = [];
      ref
        .orderByChild("id_postulante")
        .equalTo(id)
        .on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            dataRotacion.push({
              dataRotacion: datoSnapshot.val(),
            });
          });
        });
      return dataRotacion;
    },
    splitDireccion(data) {
      let direccion = [];
      if (data.hasOwnProperty("ref_dir")) {
        direccion = data.text_dir.split(",");
      }
      return direccion;
    },
    async getDataTotalPostulante(id) {
      let dataTecPost = [];
      let postulante = {};
      let postulantePdf = {};
      let dataPersonalPost = {};
      /* Obtiene info personal de cada postulante */
      let dataTec = this.getEquiposTecnicos(id);
      let dataExp = this.getDataExpPostById(id);
      let dataProf = this.getDataProfPostById(id);
      let dataRota = this.getDataRotacion(id);
      let dataEval = getEvaluationByChild("id_postulante", id);

      dataPersonalPost = await this.getPostulantesById(id);
      dataTecPost = dataTec;
      let dataPostulante;
      (dataPostulante = {
        ID: id,
        "Tipo de documento": "DNI",
        "Nº de documento": dataPersonalPost.numdoc,
        "Nombres completos": dataPersonalPost.nombres,
        "Apellido paterno": this.transformTextCapitalize(
          dataPersonalPost.apellido_p
        ),
        "Nº de documento": this.transformTextCapitalize(
          dataPersonalPost.numdoc
        ),
        "Apellido materno": dataPersonalPost.apellido_m,
        "Nombre/Nombre social": dataPersonalPost.nombre_social,
        "Estado de postulacion": "Apto",
        "Estado civil": dataPersonalPost.estado_civil
          ? dataPersonalPost.estado_civil
          : "-",
        "Fecha de nacimiento": dataPersonalPost.fecha_nac
          ? dataPersonalPost.fecha_nac
          : "-",
        Género: dataPersonalPost.genero ? dataPersonalPost.genero : "-",
        "Nº de hijos": dataPersonalPost.n_hijos
          ? dataPersonalPost.n_hijos
          : "0",
        "Correo electrónico": dataPersonalPost.correo,
        Teléfono: dataPersonalPost.telefono,
        "Direccion - Distrito": dataPersonalPost.coordenadas_direccion
          ? `${dataPersonalPost.text_dir} ${dataPersonalPost.coordenadas_direccion[0]}, ${dataPersonalPost["coordenadas_direccion"][1]}`
          : `${dataPersonalPost.text_dir}, -`,
        "Fecha y hora de registro": `${dataPersonalPost.RegistradoDate.date} ${dataPersonalPost.RegistradoDate.hour}`,
        "Grado de formacion": dataProf[0].datosFormacion.grado_formacion,
        "Estado estudio": dataProf[0].datosFormacion.estado_estudios,
        Institucion: dataProf[0].datosFormacion.institucion,
        "Horario estudio": dataProf[0].datosFormacion.horario_estudio,
        "Empresa - experiencia no call": "",
        "Rubro empresa - experiencia no call": "",
        "Puesto experiencia - no call": "",
        "Tiempo (meses) - experiencia no call": "",
        "Empresa - experiencia call": dataExp[0].datosExperiencia.ec_empresa,
        "Cliente - experiencia call": dataExp[0].datosExperiencia.ec_cliente,
        "Rubro cliente - experiencia call":
          dataExp[0].datosExperiencia.ec_rubro_cliente,
        "Segmento - experiencia call": dataExp[0].datosExperiencia.ec_segmento,
        "Tiempo (meses) - experiencia call":
          dataExp[0].datosExperiencia.ec_tiempo_exp,
        "OBSERVACIONES": dataEval.length > 0
            ? dataEval[0].observaciones
              ? dataEval[0].observaciones
              : "-"
            : "-",
        "COMPETENCIAS": dataEval.length > 0
            ? dataEval[0].compet_evaluadas
              ? dataEval[0].compet_evaluadas.toString()
              : "-"
            : "-",
        "Disponibilidad horaria": "",
        Espontáneo: "No",
        "Modalidad trabajo": "Presencial",
        Pais: "Perú",
        Departamento: this.splitDireccion(dataPersonalPost)[6],
        Provincia: this.splitDireccion(dataPersonalPost)[5],
        Distrito: this.splitDireccion(dataPersonalPost)[4],
        Calle: this.splitDireccion(dataPersonalPost)[0],
        Nro: this.splitDireccion(dataPersonalPost)[1],
        Piso: this.splitDireccion(dataPersonalPost)[2],
        Dpto: this.splitDireccion(dataPersonalPost)[3],
        Referencia: dataPersonalPost.text_dir ? dataPersonalPost.text_dir : "-",
        "Disponibilidad Lunes- Viernes":
          dataRota.length > 0
            ? dataRota[0].dataRotacion.horarioDisponible
              ? "Lunes - Viernes"
              : "-"
            : "-",
        "Hora inicio":
          dataRota.length > 0
            ? dataRota[0].dataRotacion.horarioDisponible
              ? dataRota[0].dataRotacion.horarioDisponible.timeLVB
              : "-"
            : "-",
        "Hora fin":
          dataRota.length > 0
            ? dataRota[0].dataRotacion.horarioDisponible
              ? dataRota[0].dataRotacion.horarioDisponible.timeLVE
              : "-"
            : "-",
        "Disponibilidad fin de semana":
          dataRota.length > 0
            ? dataRota[0].dataRotacion.horarioDisponible
              ? dataRota[0].dataRotacion.horarioDisponible.weekDay
              : "-"
            : "-",
        "Hora inicio (fin de semana)":
          dataRota.length > 0
            ? dataRota[0].dataRotacion.horarioDisponible
              ? dataRota[0].dataRotacion.horarioDisponible.timeSDB
              : "-"
            : "-",
        "Hora fin (fin de semana)":
          dataRota.length > 0
            ? dataRota[0].dataRotacion.horarioDisponible
              ? dataRota[0].dataRotacion.horarioDisponible.timeSDB
              : "-"
            : "-",
        "Trabajo en Konecta":
          dataRota.length > 0 ? dataRota[0].dataRotacion.trabajo_k : "-",
        IGC: this.process.nombreIgc,
        Cuenta: this.process.cuenta,
        Servicio: this.process.servicio,
        NOMBRES_APELLIDOS: `${
          this.transformNamesCapitalize(dataPersonalPost.nombres)
        } ${this.transformTextCapitalize(
          dataPersonalPost.apellido_p
        )} ${this.transformTextCapitalize(dataPersonalPost.apellido_m)}`,
        NUM_DOC: dataPersonalPost.numdoc,
        TELEFONO: dataPersonalPost.telefono,
        CORREO: dataPersonalPost.correo,
        DIRECCION: dataPersonalPost.text_dir ? dataPersonalPost.text_dir : "-",
        EST_CIVIL: dataPersonalPost.estado_civil
          ? dataPersonalPost.estado_civil
          : "-",
        GENERO: dataPersonalPost.genero ? dataPersonalPost.genero : "-",
        FEC_NACIMIENTO: dataPersonalPost.fecha_nac
          ? dataPersonalPost.fecha_nac
          : "-",
        COOR_DIRECCION: dataPersonalPost.coordenadas_direccion
          ? `${dataPersonalPost.coordenadas_direccion[0]}, ${dataPersonalPost["coordenadas_direccion"][1]}`
          : "-",
        INTERNET:
          dataTecPost.length > 0 ? dataTecPost[0].servicio_internet : "-",
        EQUIPO_TEC:
          dataTecPost.length > 0 && dataTecPost[0].dispositivo
            ? dataTecPost[0].dispositivo.includes(
                "Computadora" || "Laptop" || "B"
              )
              ? "Si"
              : "No"
            : "-",
        EXPERIENCIA: this.getDataExpPostById(id),
        FORMACION: this.getDataProfPostById(id),
      }),
        this.postulantesTable.push({ NRO: this.i, ...dataPostulante });
      postulante = _.omit(dataPostulante, [
        "ID",
        "NOMBRES_APELLIDOS",
        "NUM_DOC",
        "TELEFONO",
        "CORREO",
        "DIRECCION",
        "EST_CIVIL",
        "GENERO",
        "FEC_NACIMIENTO",
        "COOR_DIRECCION",
        "INTERNET",
        "EQUIPO_TEC",
        "EXPERIENCIA",
        "FORMACION",
        "COMPETENCIAS",
        "OBSERVACIONES",
      ]);
      postulantePdf = _.pick(dataPostulante, [
        "NOMBRES_APELLIDOS",
        "NUM_DOC",
        "TELEFONO",
        "CORREO",
        "DIRECCION",
        "FEC_NACIMIENTO",
        "INTERNET",
        "EQUIPO_TEC",
        "COMPETENCIAS",
        "OBSERVACION",
      ]);
      /*    console.log('dataaaa ',postulante); */
      this.postulantesExcel.push({ NRO: this.i, ...postulante });
      this.postulantesPdf.push({NRO: this.i,...postulantePdf });
      this.i++;
      dataTecPost = [];
      dataPersonalPost = [];
    },
    transformTextCapitalize(text) {
      const newText = text.toLowerCase();
      return newText[0].toUpperCase() + newText.slice(1);
    },
    transformNamesCapitalize(text) {
      const indexSpace = text.indexOf(" ");
      const sizeText   = text.length;
      const firstName  = text.slice(0, indexSpace).toLowerCase();
      const secondName = text.slice(indexSpace + 1, sizeText).toLowerCase();
      let fullName     = '';
      if (secondName) {
        fullName   = `${firstName[0].toUpperCase() + firstName.slice(1)} ${secondName[0].toUpperCase() + secondName.slice(1)}`
      } else {
        fullName   = `${firstName[0].toUpperCase() + firstName.slice(1)}`
      }
      return fullName;
    },
    getIGCs(nombreIgc) {
      let arrayIgcsNames = [];
      let arrayIgcs = [];
      const secondaryDatabase = firebase.database();
      const ref = secondaryDatabase.ref("DATOS_PROCESO_IGC");
      ref.orderByChild("nombreIgc").on("value", function(snap) {
        snap.forEach((igc) => {
          arrayIgcs.push(igc.val());
        });
      });
      arrayIgcs = _.filter(arrayIgcs, function(igc) {
        return igc.estado && igc.nombreIgc !== nombreIgc;
      });
      arrayIgcsNames = arrayIgcs.map((igc) => igc.nombreIgc);
      this.listOfIgcs = arrayIgcsNames;
    },
    async migratePostulante() {
      const id = await getProgramedEvaluationByIdPostulant(this.idPostulante);
      let idPostulante = Object.keys(id.val())[0];
      let datapost = id.val()[idPostulante];
      const secondaryDatabase = firebase.database();
      const refEval = secondaryDatabase.ref("EVALUACION_PROGRAMADA");

      if (datapost.IGC) {
        refEval.child(idPostulante).update({
          IGC: this.dataSelectedIgc[0].nombreIgc,
        });
        this.dialogMigrar = false;
        this.dialogConfirmMigrate = true;
        this.idPostulante = "";
        this.postulantesTable = [];
        this.getPostulantesByIgc();
        this.i = 1;
      } else {
        refEval.child(idPostulante).update({
          id_igc: this.dataSelectedIgc[0].id,
        });
        this.dialogMigrar = false;
        this.dialogConfirmMigrate = true;
        this.idPostulante = "";
        this.postulantesTable = [];
        this.getPostulantesByIgc();
        this.i = 1;
      }
    },
    generatePdf() {
      let postulantesPdf = this.postulantesPdf;
      console.log('postulantes',postulantesPdf);
      let doc = new jsPDF("l", "pt", "A4");
      let values = postulantesPdf.map((e) => Object.values(e));
        console.log(postulantesPdf.map((e) => Object.values(e)));
      doc.autoTable({
      theme: 'grid',      
      headStyles: { fontSize: 6 },
      bodyStyles: { fontSize: 7 },      
      head: [ Object.keys(this.postulantesPdf[0])],
      body: values,      

    });
    doc.save('lista-postulantes.pdf')
    },
  },
};
</script>
<style lang="scss" scoped></style>
