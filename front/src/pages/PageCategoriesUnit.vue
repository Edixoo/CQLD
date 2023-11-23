<template>
  <q-page>
    <app-title v-if="connexion" :title="connexion.word1.word + ' vs ' + connexion.word2.word" />
    <div>
      <q-btn color="primary" label="Modifier le lien" class="q-ma-md" icon="edit" />
      <q-btn color="negative" label="Supprimer le lien" class="q-ma-md" icon="delete" @click="() => deleteVerif=!deleteVerif"/>
    </div>

    <div>
      <div class="text-h3 q-mt-xl carterOne q-ml-xl">
        Description
      </div>
      <div class="text-subtitle1 text-weight-medium q-ma-xl" v-if="connexion">
        {{connexion.description}}
      </div>
    </div>

    <q-dialog v-model="deleteVerif">
      <q-card class="q-pa-sm">
        <q-card-section class="row items-left q-ma-sm">
          <div class="text-subtitle1">
            <q-icon name="warning" color="negative" size="md" />
            Souhaitez-vous vraiment supprimer ce lien ?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="negative" label="Annuler" flat outlined v-close-popup />
          <q-btn color="positive" icon="delete" label="Supprimer" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppTitle from "src/components/ui/AppTitle.vue";
import { useRoute } from "vue-router";
import ConnexionServices from "../services/ConnexionServices";


const route= useRoute()

const deleteVerif=ref(false);
const liensId=route.params.id;

const connexion=ref(null);

onMounted(async () => {
  connexion.value=await ConnexionServices.getConnectionByIdInt(liensId);
  console.log(connexion)
})
</script>
