<template>
  <q-page>
  <q-btn
        class="q-ma-md justify-center"
        label="Retour"
        icon="keyboard_double_arrow_left"
        @click="$router.go(-1)"
      />
  <div class="div-class">
    <q-card class="inspect-details">
      <h2 class="carterOne">Détails du lien</h2>
      <div v-if="selectedMot" class="self-center">
        <p><strong>Mot1: </strong>{{ selectedMot.word1.word }}</p>
        <p><strong>Mot2: </strong>{{ selectedMot.word2.word }}</p>
        <p><strong>Catégorie: </strong>{{ selectedMot.theme.theme_name }}</p>
        <p><strong>Description: </strong>{{ selectedMot.description }}</p>
        <q-btn label="Accepter" color="positive" @click="approuverMot" class="q-ma-md" />
        <q-btn label="Refuser" color="negative" @click="refuserMot" class="q-ma-md" />
      </div>
    </q-card>
  </div>
  </q-page>
</template>

<script setup>
import ConnexionServices from "src/services/ConnexionServices";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ThemeServices from "src/services/ThemeServices";
import { useQuasar } from "quasar";

const $q = useQuasar();
const selectedMot = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(async () => {

  const params = route.params.id;
  selectedMot.value = await ConnexionServices.getConnectionById(params);
  selectedMot.value.theme = await ThemeServices.getThemeById(selectedMot.value.theme);
});

const approuverMot = async () => {
  try {
    await ConnexionServices.updateConnection(selectedMot.value._id, {
      approved: true,
    }).then(() => {
      $q.notify({
        message: "Le mot a été approuvé avec succès",
        color: "positive",
        icon: "check",
      });
      router.push("/admin");
    });
  } catch (error) {
    console.error("Erreur lors de l'approbation du mot :", error);
  }
};

const refuserMot = async () => {
  try {
    await ConnexionServices.deleteConnection(selectedMot.value._id).then(() => {
      $q.notify({
        message: "Le mot a été refusé avec succès",
        color: "negative",
        icon: "close",
      });
      router.push("/admin");
    });
  } catch (error) {
    console.error("Erreur lors du refus et de la suppression du mot :", error);
  }
};
</script>

<style>
.inspect-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 50%;
  padding: 2rem;
  margin-top: 2rem;
}
</style>
