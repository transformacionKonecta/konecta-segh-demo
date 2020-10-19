/*
<template>
  <v-container>
    <h2 class="mb-5">Procesos de Selección</h2>
    <v-divider></v-divider>
    <v-row class="mt-5">
      <a class="subtitle-1 font-weight-bold" @click="$router.go(-1)">
        <v-icon class="px-2">mdi-arrow-left</v-icon>Regresar
      </a>
    </v-row>
    <v-row class="ma-5">
      <p>
        Aqui podrás crear cuentas y servicios que serán utilizalos para los
        procesos de selección externa.
      </p>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-btn
        color="teal"
        dark
        class="text-capitalize"
        width="200px"
        @click="dialogAccount = true"
        ><v-icon>add_circle_outline</v-icon> Crear Cuenta
      </v-btn>
      <v-btn
        color="teal"
        dark
        class="text-capitalize mx-10"
        width="200px"
        @click="dialogService = true"
        ><v-icon>add_circle_outline</v-icon> Crear Servicio
      </v-btn>
    </v-row>
    <v-row class="mt-10">
      <v-col class="ml-4" cols="12" sm="12" md="4">
        <p>Resultados de la búsqueda</p>
      </v-col>
      <v-col cols="12" sm="12" md="4" offset-md="3" class="py-0">
        <v-text-field
          class="mx-5"
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar por cuenta ó servicio..."
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mb-10">
      <v-data-table
        class="mx-10"
        :headers="headers"
        :items="itemsServices"
        :search="search"
        :sort-by="['name']"
      >
        <template v-slot:item.actions="{ item }">
          <v-row>
            <v-col>
              <v-icon small @click="openModalEdit(item)">
                mdi-pencil
              </v-icon>
            </v-col>
            <v-col>
              <v-icon small @click="openModalDelete(item)">
                mdi-delete
              </v-icon>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-row>
    <!--***************************** Modal Crear Cuenta **************************** -->
    <v-dialog v-model="dialogAccount" persistent max-width="450px">
      <v-card>
        <v-card-title
          class="font-weight-bold justify-center"
          style="color: #00968f"
        >
          <span>Crear Cuenta</span>
        </v-card-title>
        <div class="mx-4" style="border-bottom:2px solid #00B8AD"></div>
        <v-form ref="formAccount">
          <v-card-text>
            <v-row class="ma-8">
              <v-col cols="12" sm="12" md="10" class="py-0">
                <v-text-field
                  class="py-0 my-0"
                  label="Nombre Cuenta"
                  v-model="account"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" text @click="dialogAccount = false"
            >Cancelar</v-btn
          >
          <v-btn
            class="ml-5 mr-1"
            color="teal"
            dark
            width="120"
            @click="saveAccount(account)"
            >Crear</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--***************************** Modal Crear Servicio **************************** -->
    <v-dialog v-model="dialogService" persistent max-width="480px">
      <v-card>
        <v-card-title
          class="font-weight-bold justify-center"
          style="color: #00968f"
        >
          <span>Crear Servicio</span>
        </v-card-title>
        <div class="mb-4 mx-4" style="border-bottom:2px solid #00B8AD"></div>
        <small class="ma-8">
          Crea el servicio asociado a la cuenta correspondiente
        </small>
        <v-form ref="formService">
          <v-card-text>
            <v-row class="ma-6">
              <v-col cols="12" sm="12" md="10" class="py-0">
                <v-autocomplete
                  color="teal"
                  :items="itemsAccounts"
                  v-model="nameAccount"
                  label="Cuenta"
                  @change="getAccountByName(nameAccount)"
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  hide-details
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row class="ma-6">
              <v-col cols="12" sm="12" md="10" class="py-0">
                <v-text-field
                  class="py-0 my-0"
                  label="Nombre Servicio"
                  v-model="service"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" text @click="dialogService = false"
            >Cancelar</v-btn
          >
          <v-btn
            class="ml-5 mr-1"
            color="teal"
            dark
            width="120"
            @click="saveService(service)"
            >Crear</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--***************************** Modal Editar Servicio **************************** -->
    <v-dialog v-model="dialogEditService" persistent max-width="480px">
      <v-card>
        <v-card-title
          class="font-weight-bold justify-center"
          style="color: #00968f"
        >
          <span>Editar Servicio</span>
        </v-card-title>
        <div class="mb-5 mx-4" style="border-bottom:2px solid #00B8AD"></div>
        <small class="ma-8">
          Edita el servicio asociado a la cuenta correspondiente
        </small>
        <v-form ref="formService">
          <v-card-text>
            <v-row class="ma-6">
              <v-col cols="12" sm="12" md="10" class="py-0">
                <v-autocomplete
                  color="teal"
                  :items="itemsAccounts"
                  v-model="editNameAccount"
                  label="Seleccione Cuenta:"
                  @change="getAccountByName(editNameAccount)"
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                  hide-details
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row class="ma-6">
              <v-col cols="12" sm="12" md="10" class="py-0">
                <v-text-field
                  class="py-0 my-0"
                  label="Nombre Servicio"
                  v-model="editNameService"
                  required
                  :rules="[(v) => !!v || 'Campo requerido']"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" text @click="dialogEditService = false"
            >Cancelar</v-btn
          >
          <v-btn
            class="ml-5 mr-1"
            color="teal"
            dark
            width="120"
            @click="editService()"
            >Editar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ***************************** Modal Eliminar Proceso ***************************** -->
    <v-dialog v-model="dialogDeleteService" persistent max-width="380">
      <v-card class="pa-1">
        <p class="ma-4 teal-text">
          ¿Estás seguro que deseas eliminar el servicio?
        </p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-1" text @click="deleteService()">
            Si
          </v-btn>
          <v-btn color="red darken-1" text @click="dialogDeleteService = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import firebase from "firebase";
import {getCuentas} from "../utils/cuentaServicios";
import {
  createAccount,
  readServices,
  createService,
  readAccounts,
  updateService,
  deleteService,
} from "../firebase/accountServicesMethods";
export default {
  data() {
    return {
      headers: [
        {
          text: "Cuenta",
          align: "start",
          sortable: true,
          value: "nombreCuenta",
        },
        { text: "Servicio", value: "nombreServicio" },
        {
          text: "Acciones",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
      accounts: [],
      itemsAccounts: [],
      itemsServices: [],
      dialogAccount: false,
      dialogService: false,
      dialogDeleteService: false,
      dialogEditService: false,
      validCreate: true,
      nameAccount: "",
      account: "",
      service: "",
      editNameAccount: "",
      editNameService: "",
      idServiceDelete: "",
      idService: "",
      accountSelected: {},
      search: "",
    };
  },
  async created() {
    await this.callAccounts();
    await this.callServices();
    console.log(this.itemsServices);
  /*   this.generateAccounts(); */
  },
  methods: {
    generateAccounts() {
      const accounts = getCuentas();
      accounts.forEach((a) =>{
        createAccount(a.name);
      })
    },
    async callAccounts() {
      this.itemsAccounts = await this.orderAccounts();
    },
    async callServices() {
      this.itemsServices = await readServices();
    },
    async saveAccount(name) {
      const nameAccount = name.toUpperCase();
      createAccount(nameAccount);
      this.$refs.formAccount.reset();
      this.dialogAccount = false;
      await this.callAccounts();
    },
    async orderAccounts() {
      const accounts = await readAccounts();
      return accounts.map((a) => a.nombreCuenta);
    },
    async getAccountByName(name) {
      const accounts = await readAccounts();
      const [account] = accounts.filter((a) => a.nombreCuenta === name);
      this.accountSelected = account;
    },
    async saveService(name) {
      const nameService = name.toUpperCase();
      const dataServices = {
        ...this.accountSelected,
        nombreServicio: nameService,
      };
      createService(dataServices);
      this.$refs.formService.reset();
      await this.callServices();
      this.dialogService = false;
    },
    openModalEdit(item) {
      this.getAccountByName(item.nombreCuenta);
      this.dialogEditService = true;
      this.idService = item.idService;
      this.editNameService = item.nombreServicio;
      this.editNameAccount = item.nombreCuenta;
    },
    openModalDelete(item) {
      this.dialogDeleteService = true;
      this.idServiceDelete = item.idService;
    },
    async editService() {
      const id = this.idServiceDelete;
      const data = {
        ...this.accountSelected,
        nombreServicio: this.editNameService,
      };
      updateService(id, data);
      await this.callServices();
      this.dialogEditService = false;
    },
    async deleteService() {
      const id = this.idServiceDelete;
      deleteService(id);
      await this.callServices();
      this.dialogDeleteService = false;
      /*    this.dialogDelete = true; */
    },
  },
};
</script>
<style lang="scss">
a {
  color: #2276bb;
}
</style>
*/
