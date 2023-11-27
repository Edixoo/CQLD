<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead style="background-color: #54546c; color: white">
        <tr>
          <th class="text-left">Mot1</th>
          <th class="text-right">Mot2</th>
          <th class="text-right">Catégorie</th>
          <th class="text-right">Description</th>
          <th class="text-right">Inspecter</th>
          <th class="text-right">Approuver</th>
          <th class="text-right">Refuser</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(connexion, index) in mots" :key="index">
          <td class="text-left">{{ connexion.word1.word }}</td>
          <td class="text-right">{{ connexion.word2.word }}</td>
          <td class="text-right">{{ connexion.theme }}</td>
          <td class="text-right">{{ connexion.description }}</td>
          <td class="text-right">
            <q-btn
              @click="inspectWord(connexion._id)"
              size="12px"
              flat
              dense
              round
              icon="search"
            >Inspecter</q-btn>
          </td>
          <td class="text-right">
            <q-btn
            color="positive"
              @click="approuverMot(connexion)"
              v-if="!connexion.approved"
              size="12px"
              flat
              dense
              round
              icon="check"
            >Approuver</q-btn>
          </td>
          <td class="text-right">
            <q-btn
            color="negative"
              @click="refuserMot(connexion)"
              v-if="!connexion.approved"
              size="12px"
              flat
              dense
              round
              icon="close"
            >Refuser</q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ConnexionServices from "../services/ConnexionServices";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $router = useRouter();
const mots = ref([]);

onMounted(async () => {
  try {
    mots.value = await ConnexionServices.getConnectionsByApproved();
  } catch (error) {
    console.error("Erreur lors de la récupération des connexions non approuvées:", error);
  }
});

const inspectWord = (selectedMotId) => {
  $router.push('/inspect/' + selectedMotId);
};

const approuverMot = async (connexion) => {
  try {
    if (connexion && connexion._id) {
      await ConnexionServices.updateConnection(connexion._id, { approved: true });
      $q.notify({
        color: "positive",
        message: "Le mot a bien été approuvé",
        icon: "done",
      });
      $router.push('/admin');
    } else {
      console.error("Erreur lors de l'approbation du mot : ID non défini ou introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors de l'approbation du mot:", error);
  }
};

const refuserMot = async (connexion) => {
  try {
    if (connexion && connexion._id) {
      await ConnexionServices.deleteConnection(connexion._id);
      $q.notify({
        color: "negative",
        message: "Le mot a été refusé et supprimé",
        icon: "close",
      });
      $router.push('/admin');
    } else {
      console.error("Erreur lors du refus et de la suppression du mot : ID non défini ou introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors du refus et de la suppression du mot :", error);
  }
};
</script>

<style>
.table {
  overflow-y: auto; 
  max-height: 500px;
}

.header {
  background-color: #54546C;
  color: white;
}

.button {
  background-color: #54546C;
  color: white;
  font-size: x-small;
  padding: 6px;
}
</style>
