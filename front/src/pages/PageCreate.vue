<template>
  <q-page>
    <q-page-container class="q-page-container">
      <q-card class="q-mx-auto q-pa-md q-py-md card-create">
        <q-card-section>
          <div class="q-gutter-md">
            <q-form @submit="createWord">
              <h2 class="text-h4" style="text-align: center">
                Créer une liaison
              </h2>

              <div class="row">
                <div class="col">
                  <label for="mot1" class="label-large">Mot 1</label>
                  <q-input
                    label="Ex. Heureux"
                    filled
                    v-model="mot1"
                    lazy-rules
                    class="q-mr-md"
                  />
                </div>
                <div class="col">
                  <label for="mot2" class="label-large">Mot 2</label>
                  <q-input
                    label="Ex. Content"
                    filled
                    v-model="mot2"
                    lazy-rules
                  />
                </div>
              </div>
              <div class="q-mt-md">
                <label for="description" class="label-large">Description</label>
                <div>
                  <q-input
                    v-model="description"
                    filled
                    label="Ex. Deux mots similaires"
                    type="textarea"
                    class="full-width"
                  />
                </div>
              </div>

              <div class="q-mt-md">
                <label for="catégories" class="label-large">Catégories</label>
                <div>
                  <q-select
                    class="q-select"
                    v-model="selectedCategory"
                    filled
                    label="Choisir une catégorie"
                    :options="categories"
                  />
                </div>
              </div>

              <q-btn
                label="Envoyer"
                type="submit"
                color="primary"
                class="q-ml-auto q-mt-md"
                style="display: flex"
              />
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script setup>
import WordServices from "../services/WordServices.js";
import ThemeServices from "../services/ThemeServices.js";
import ConnexionServices from "../services/ConnexionServices.js";
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "../stores/userStore.js";


const $q = useQuasar();
const mot1 = ref("");
const mot2 = ref("");
const description = ref("");
const selectedCategory = ref("");
const categories = ref([]);
const userStore=useUserStore()

const fetchThemes = async () => {
  const result = await ThemeServices.listThemes();
  categories.value = result.map((theme) => theme.theme_name);
};

onMounted(fetchThemes);

const resetForm = () => {
  mot1.value = "";
  mot2.value = "";
  description.value = "";
  selectedCategory.value = "";
};

const createWord = async () => {
  try {
    const theme = await ThemeServices.getThemeByName(selectedCategory.value);
    const themeId = theme._id;

    if (mot1.value && mot2.value && selectedCategory.value) {
      const word1 = await WordServices.createWord({
        word: mot1.value,
        theme: themeId,
        added_by: userStore.id,
        approved: true,
      });

      const word2 = await WordServices.createWord({
        word: mot2.value,
        theme: themeId,
        added_by: userStore.id,
        approved: true,
      });

      const id1 = word1._id;
      const id2 = word2._id;

      await ConnexionServices.createConnection({
        word1: id1,
        word2: id2,
        theme: themeId,
        description: description.value,
        proposed_by: userStore.id,
      });

      $q.notify({
        type: "positive",
        message: "Le lien entre ces deux mots a été créé avec succès",
      });

      resetForm();
    } else {
      $q.notify({
        type: "negative",
        message: "Veuillez remplir tous les champs",
      });
    }
  } catch (error) {
    console.error(error.message)
    $q.notify({
      type: "negative",
      message: "Une erreur est survenue:" + error.message,
    });
  }
};
</script>
<style>
.label-large {
  font-size: 16px;
  font-weight: 500;
}

.card-create {
  max-width: 600px;
}

.q-select {
  width: 300px;
}

@media (max-width: 450px), screen and (orientation: portrait) {
  .card-create {
    max-width: 90%;
  }

  .q-select {
    width: 100%;
  }
}
</style>
