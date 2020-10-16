<template>
  <div class="mt-10">
    <div>
      <v-col>
        <p class="font-weight-bold">Gestión de Referidos</p>
        <p >
          Aquí podrás gestionar el envío de invitaciones a Vive Konecta.
        </p>
      </v-col>
      <v-row class="mt-6 ml-5">
        <v-card class="mr-5" width="200" height="200" 
        @click="$router.push({
                  name: 'referrals',
                })
              ">
          <v-card-text class="text-center mt-5">
            <v-img src="../assets/referidos.svg" aspect-ratio="2" contain></v-img>
            <p class="mt-5">Invitación a Referidos</p>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
  </div>
</template>