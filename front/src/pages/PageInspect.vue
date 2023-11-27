<template>
  <div class="inspect-details">
    <h2>Détails du mot</h2>
    <div v-if="selectedMot">
      <p><strong>Mot1: </strong>{{ selectedMot.mot1 }}</p>
      <p><strong>Mot2: </strong>{{ selectedMot.mot2 }}</p>
      <p><strong>Catégorie: </strong>{{ selectedMot.categorie }}</p>
      <p><strong>Description: </strong>{{ selectedMot.description }}</p>
      <q-btn label="Accepter" color="positive" @click="approuverMot" />
      <q-btn label="Refuser" color="negative" @click="refuserMot" />
    </div>
  </div>
</template>

<script setup>
import ConnexionServices from "src/services/ConnexionServices";
import { ref } from "vue";
import { useRouter } from "vue-router";

const selectedMot = ref(null);
const router = useRouter();

const { params } = router.currentRoute;
if (params && params.id) {
  selectedMot.value = {
    mot1: "Mot1",
    mot2: "Mot2",
    categorie: "Catégorie",
    description: "Description",
  };
}

const approuverMot = async () => {
  try {
    await ConnexionServices.updateConnection(selectedMot.value._id, {
      approved: true,
    });
    console.log("Mot approuvé");
  } catch (error) {
    console.error("Erreur lors de l'approbation du mot :", error);
  }
};

const refuserMot = async () => {
  try {
    await ConnexionServices.deleteConnection(selectedMot.value._id);
    console.log("Mot refusé et supprimé");
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
