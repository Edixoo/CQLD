<template>
  <q-page>
    <q-space></q-space>
    <div class="col flex-center q-pt-xl">
      <h1 class="row flex-center">C'est quoi la différence ?</h1>
      <div class="row flex-center">
        <q-btn
          color="primary"
          label="Mots Aléatoires"
          :to="'/categories/' + alea.value"
          @click="DefineAleatoire()"
          class="q-pa-sm q-ma-xl"
          size="lg"
        />
        <CreateLink
          v-if="connexion.value ? (chemin = '/create') : (chemin = '/login')"
          @to="chemin.value"
          class="q-ma-xl q-pa-sm"
          size="lg"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import CreateLink from "src/components/CreateLink.vue";
import { ref } from "vue";

const alea = ref(0);
const chemin = ref("connect");
const connexion = ref(false);
const maxDiff = 10;

const DefineAleatoire = () =>
  (alea.value = Math.floor(Math.random() * maxDiff));
</script>
