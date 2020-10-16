<template>
  <v-container>
    <h2 class="mb-5">Listado de Referidos</h2>
    <v-divider></v-divider>
    <v-row class="my-5">
      <a class="subtitle-1 font-weight-bold" @click="$router.go(-1)">
        <v-icon class="px-2">mdi-arrow-left</v-icon>Regresar
      </a>
    </v-row>
    <p>
      Listado de referidos, seleccione aquellos que desea enviarle invitaciones
      para la postulación a través de ViveKonecta.
    </p>
    <v-row class="d-flex justify-end">
      <v-btn
        class="mx-10 pa-2"
        color="#EF6C00"
        dark
        width="205"
        @click="sendInvitation()"
        ><v-icon>email</v-icon>Enviar Invitación</v-btn
      >
    </v-row>
    <v-row class="ma-10">
      <v-data-table
        class="mx-10"
        :headers="headers"
        :items="referrals"
        :search="search"
        :sort-by="['name']"
      >
        <template v-slot:item.invitar="{ item }">
          <v-simple-checkbox v-model="item.invitar"></v-simple-checkbox>
        </template>
      </v-data-table>
    </v-row>
    <!-- ****************************** Modal Confirm Invitación ***************************** -->
    <v-dialog v-model="dialogConfirm" persistent max-width="450px">
      <v-card class="pa-5">
        <v-row class="d-flex flex-row-reverse">
          <v-btn text @click="dialogConfirm = false">
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
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: "N°",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "Documento",
          align: "start",
          sortable: true,
          value: "DOCUMENTO",
        },
        {
          text: "Nombres",
          align: "start",
          sortable: true,
          value: "NOMBRES",
        },
        {
          text: "Apellidos",
          align: "start",
          sortable: true,
          value: "APELLIDOS",
        },
        {
          text: "Correo Electrónico",
          align: "start",
          sortable: true,
          value: "CORREO",
        },

        {
          text: "Seleccionar",
          align: "center",
          value: "invitar",
          sortable: false,
        },
      ],
      itemSelected: "",
      dialogConfirm: false,
      referrals: [],
    };
  },
  created() {
    const array = this.$props.data;
    this.referrals = array.map((a, index) => ({
      ...a,
      invitar: true,
      id: index + 1,
    }));
    console.log("PROPS", this.$props.data);
  },
  methods: {
    sendInvitation() {
      console.log("REFERRALS SEND", this.referrals);

      this.dialogConfirm = true;
    },
  },
};
</script>
