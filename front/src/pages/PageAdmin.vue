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
        </tr>
      </thead>
      <tbody>
        <tr v-for="(connexion, index) in mots" :key="index">
          <td class="text-left">{{ connexion.mot1 }}</td>
          <td class="text-right">{{ connexion.mot2 }}</td>
          <td class="text-right">{{ connexion.theme }}</td>
          <td class="text-right">{{ connexion.description }}</td>
          <td class="text-right">
            <q-btn
              @click="inspectWord(index)"
              size="12px"
              flat
              dense
              round
              icon="search"
            >Inspecter</q-btn>
          </td>
          <td class="text-right">
            <q-btn
              @click="approuverMot(index)"
              v-if="!connexion.approved"
              size="12px"
              flat
              dense
              round
              icon="check"
            >Approuver</q-btn>
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
import { useRouter, useRoute } from "vue-router";

const $q = useQuasar();
const $router = useRouter();
const route = useRoute(); 
const mots = ref([]);
const connexion = ref(null);

const liensId = route.params.id;

onMounted(async () => {
  try {
    
    mots.value = await ConnexionServices.getConnectionsByApproved();
  } catch (error) {
    console.error("Erreur lors de la récupération des connexions non approuvées:", error);
  }
});

const inspectWord = (index) => {
  const selectedMotId = mots.value[index]._id;
  $router.push({ name: "PageInspect", params: { id: selectedMotId } });
};

const approuverMot = async (index) => {
  try {
    await ConnexionServices.updateConnection(connexion.value._id, { approved: true });
    $q.notify({
      color: "positive",
      message: "Le mot a bien été approuvé",
      icon: "done",
    });
    $router.push('/');
  } catch (error) {
    console.error("Erreur lors de l'approbation du mot:", error);
  }
};
</script>

<style>
.table{
  overflow-y: auto; 
  max-height: 500px;
}

.header{
  background-color: #54546C;
  color: white;
}

.button{
  background-color: #54546C;
  color: white;
  font-size:x-small;
  padding: 6px;
}
</style>