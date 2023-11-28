<template>
  <q-page>
  <div class="q-pa-md">
    <app-title title="Administration des liens" class="q-mb-xl"/>
    <q-btn
      color="primary"
      label="Créer une catégorie"
      @click="newThemeAffichage = !newThemeAffichage"
      />
    <q-markup-table class="q-mt-xl">
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


  <q-dialog v-model="newThemeAffichage">
    <q-card class="q-pa-md q-card-modif-pwd">
      <q-card-section>
        <div class="text-h5 title-card">Création d'une catégorie</div>
        <div class="q-mt-md">
          Veuillez entrer ci-dessous le nom de la catégorie
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="theme_name"
          label="Nom de la catégorie"
          placeholder="Entrer le nom de la catégorie"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Annuler"
          color="negative"
          @click="resetTheme()"
        />
        <q-btn label="Envoyer" color="positive" @click="createTheme()" />
      </q-card-actions>
    </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import ConnexionServices from "../services/ConnexionServices";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import ThemeServices from "src/services/ThemeServices";
import AppTitle from "src/components/ui/AppTitle.vue";

const $q = useQuasar();
const $router = useRouter();
const mots = ref([]);
const newThemeAffichage = ref(false);
const theme_name = ref("");

const getThemeName= (async (themeId) => {
  const theme = await ThemeServices.getThemeById(themeId)
  return theme.theme_name;
});

watch(newThemeAffichage, (newValue) => {
  if (!newValue) {
    resetTheme();
  }
});

onMounted(async () => {
  try {
    mots.value = await ConnexionServices.getConnectionsByApproved();
    for (let i = 0; i < mots.value.length; i++) {
      mots.value[i].theme = await getThemeName(mots.value[i].theme);
    }
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
      window.location.reload();
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
      window.location.reload();
    } else {
      console.error("Erreur lors du refus et de la suppression du mot : ID non défini ou introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors du refus et de la suppression du mot :", error);
  }
};

const resetTheme= (() => {
  theme_name.value = "";
});

const createTheme= (() => {
  if (theme_name.value) {
    ThemeServices.createTheme({ theme_name: theme_name.value });
    $q.notify({
      color: "positive",
      message: "La catégorie a bien été créée",
      icon: "done",
    });
    newThemeAffichage.value = false;
    window.location.reload();
  } else {
    $q.notify({
      color: "negative",
      message: "Veuillez entrer un nom de catégorie",
      icon: "close",
    });
  }
});
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
