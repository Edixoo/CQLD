<template>
  <q-page>
    <app-title v-if="connexion" :title="connexion.word1.word + ' VS ' + connexion.word2.word" />
    <div>
      <q-btn color="primary" label="Modifier le lien" class="q-ma-md" icon="edit" />
      <q-btn color="negative" label="Supprimer le lien" class="q-ma-md" icon="delete"/>
    </div>

  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppTitle from "src/components/ui/AppTitle.vue";
import { useRoute } from "vue-router";
import ConnexionServices from "../services/ConnexionServices";


const route= useRoute()

const connexion=ref(null)
const liensId=route.params.id;

onMounted(async () => {
  connexion.value=await ConnexionServices.getConnectionByIdInt(liensId);
  console.log(connexion)
})
</script>