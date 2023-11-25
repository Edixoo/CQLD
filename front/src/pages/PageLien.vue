<template>
  <q-page>
    <div v-if="connexion">
      <app-title :title="connexion.word1.word + ' vs ' + connexion.word2.word" />
      <div>
        <q-btn color="primary" label="Modifier le lien" class="q-ma-md" icon="edit" :to="'/edit/' + connexion.id" />
        <q-btn color="negative" label="Supprimer le lien" class="q-ma-md" icon="delete" @click="() => deleteVerif=!deleteVerif"/>
      </div>

      <div>
        <div class="text-h3 q-mt-xl carterOne q-ml-xl">
          Description
        </div>
        <div class="text-subtitle1 text-weight-medium q-ma-xl">
          {{connexion.description}}
        </div>
      </div>

      <create-link class="q-ma-md"/>
    </div>
    <div v-else class="q-mt-xl center-chargement">
      <q-spinner size="100px" color="primary" />
      <div class="text-h4 q-mt-xl q-ml-xl">
        Chargement en cours...
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
          <q-btn color="positive" icon="delete" label="Confirmer" @click="DeleteActions"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppTitle from "src/components/ui/AppTitle.vue";
import { useRoute, useRouter } from "vue-router";
import ConnexionServices from "../services/ConnexionServices";
import CreateLink from "src/components/CreateLink.vue";
import { useQuasar } from "quasar";


const $q = useQuasar();
const route= useRoute();
const $router=useRouter();

const deleteVerif=ref(false);
const connexion=ref(null);

const liensId=route.params.id;

onMounted(async () => {
  connexion.value=await ConnexionServices.getConnectionByIdInt(liensId);
})

const DeleteActions=async ()=>{
  await ConnexionServices.deleteConnection(connexion.value._id).then(()=>{
    $q.notify({
      color: "positive",
      message: "Le lien a bien été supprimé",
      icon: "done",
    });
    $router.push('/');

  })

}
</script>

<style lang="scss">

.center-chargement {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
