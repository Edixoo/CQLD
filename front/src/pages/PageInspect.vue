<template>
    <div class="inspect-details">
      <h2>Détails du mot</h2>
      <div v-if="(selectedMotId, index) in mots" :key="index">
        <p><strong>Mot1: </strong>{{ selectedMotId.word1.word }}</p>
        <p><strong>Mot2: </strong>{{ selectedMotId.word2.word }}</p>
        <p><strong>Description: </strong>{{ selectedMotId.description }}</p>
        <p><strong>Catégorie: </strong>{{ selectedMotId.theme }}</p>
        <q-btn label="Accepter" color="positive" @click="approuverMot" />
        <q-btn label="Refuser" color="negative" @click="refuserMot" />
      </div>
    </div>
  </template>
  
  <script setup>
  import ConnexionServices from "../services/ConnexionServices";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useQuasar } from "quasar";
  
  const selectedMotId = ref(null);
  const $q = useQuasar();
  const $router = useRouter()
  const mots = ref([]);
  
  onMounted(async () => {
      try {
        mots.value = await ConnexionServices.getConnectionsById();
      } catch (error) {
        console.error("Erreur lors de la récupération du mot :", error);
      }
  });
  
  const approuverMot = async (selectedMotId) => {
  try {
    if (selectedMotId && selectedMotId._id) {
      await ConnexionServices.updateConnection(selectedMotId._id, { approved: true });
      $q.notify({
        color: "positive",
        message: "Le mot a bien été approuvé",
        icon: "done",
      });
      $router.push('/');
    } else {
      console.error("Erreur lors de l'approbation du mot : ID non défini ou introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors de l'approbation du mot:", error);
  }
};

const refuserMot = async (selectedMotId) => {
  try {
    if (selectedMotId && selectedMotId._id) {
      await ConnexionServices.deleteConnection(selectedMotId._id);
      $q.notify({
        color: "negative",
        message: "Le mot a été refusé et supprimé",
        icon: "close",
      });
      $router.push('/');
    } else {
      console.error("Erreur lors du refus et de la suppression du mot : ID non défini ou introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors du refus et de la suppression du mot :", error);
  }
};
  </script>
  
  <style>
  .inspect-details {
    margin: 20px;
  }
  </style>
  