<template>
  <div class="mt-10">
    <div>
      <v-col>
        <p class="font-weight-bold">Gestión de Cuentas y Servicios</p>
        <p >
          Aquí podrás gestionar la creacion de cuentas y servicios.
        </p>
      </v-col>
      <v-row class="mt-6 ml-5">
        <v-card class="mr-5" width="200" height="200" 
        @click="$router.push({
                  name: 'accounts',
                })
              ">
          <v-card-text class="text-center mt-5">
            <v-img src="../assets/cuenta.svg" aspect-ratio="2" contain></v-img>
            <p class="mt-5">Cuentas y Servicios</p>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
  </div>
</template>