<template>
  <q-page>
    <q-page-container>
      <q-card style="max-width: 600px" class="q-mx-auto q-pa-md q-py-md">
        <q-card-section>
          <div class="q-gutter-md">
            <q-form @submit="updateWord">
              <h2 class="text-h4" style="text-align: center">
                Modifier une liaison
              </h2>

              <div class="row">
                <div class="col">
                  <label for="mot1" class="label-large">Mot 1</label>
                  <q-input
                    label="Ex. Paul"
                    filled
                    v-model="mot1"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Veuillez entrer le mot 1',
                    ]"
                    class="q-mr-md"
                  />
                </div>
                <div class="col">
                  <label for="mot2" class="label-large">Mot 2</label>
                  <q-input
                    label="Ex. Chien"
                    filled
                    v-model="mot2"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Veuillez entrer le mot 2',
                    ]"
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
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();

const mot1 = ref("");
const mot2 = ref("");
const description = ref("");
const selectedCategory = ref("");
const categories = ref([]);
const route= useRoute();
const connexion=ref(null);

const fetchThemes = async () => {
  const result = await ThemeServices.listThemes();
  categories.value = result.map((theme) => theme.theme_name);

  const id = route.params.id;
  connexion.value = await ConnexionServices.getConnectionByIdInt(id);

  mot1.value = connexion.value.word1.word;
  mot2.value = connexion.value.word2.word;
  description.value = connexion.value.description;
  selectedCategory.value = (await ThemeServices.getThemeById(connexion.value.theme)).theme_name;
};

onMounted(fetchThemes);

const resetForm = () => {
  // Reset form fields and set formSubmitted to false
  mot1.value = "";
  mot2.value = "";
  description.value = "";
  selectedCategory.value = "";
};

const updateWord = async () => {
  const theme = await ThemeServices.getThemeByName(selectedCategory.value);
  const themeId = theme._id;

  if (mot1.value && mot2.value && selectedCategory.value) {

    if(mot1.value === mot2.value){
      this.$q.notify({
        type: "negative",
        message: "Les mots doivent être différents.",
      });
      return;
    }

    const id_word1 = await WordServices.getWordByName(mot1.value);
    const id1 = id_word1._id;

    const id_word2 = await WordServices.getWordByName(mot2.value);
    const id2 = id_word2._id;

    connexion.value.word1 = id1;
    connexion.value.word2 = id2;
    connexion.value.theme = themeId;
    connexion.value.description = description.value;



    await WordServices.getWordByName(mot1.value).then(async (word) => {
      console.log(word)
      if (word) {
        connexion.value.word1 = word._id;
      } else {
        await WordServices.createWord({ word: mot1.value }).then((word) => {
          console.log(word)
          connexion.value.word1 = word._id;
        });
      }
    });
    await WordServices.getWordByName(mot2.value).then(async (word) => {
      if (word) {
        connexion.value.word2 = word._id;
      } else {
        await WordServices.createWord({ word: mot2.value }).then((word) => {
          connexion.value.word2 = word._id;
        });
      }
    });

    await ConnexionServices.updateConnection(connexion.value._id, connexion).then(() => {
      $q.notify({
        type: "positive",
        message: "La connexion a été modifiée avec succès.",
      });
    });

    // Reset the form after successful creation
    resetForm();
  } else {
    this.$q.notify({
      type: "negative",
      message: "Veuillez remplir tous les champs.",
    });
  }
};

</script>
<style>
.label-large {
  font-size: 16px;
  font-weight: 500;
}
</style>
