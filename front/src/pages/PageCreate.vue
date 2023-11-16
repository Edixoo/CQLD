<template>
  <q-page>
    <q-page-container>
      <q-card style="max-width: 600px" class="q-mx-auto q-pa-md q-py-md">
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
                    v-model="text"
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
                  <q-btn-dropdown
                    flat
                    class="q-mr-md btn-dropdown-pageCreate"
                    label="zzzzzzzzzz"
                  >
                    <q-list>
                      <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                          <q-item-label>Paul</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                          <q-item-label>Chiens</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                          <q-item-label>Marine</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
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
import UserServices from "../services/UserServices.js";
import { ref } from "vue";

const mot1 = ref("");
const mot2 = ref("");

const createWord = () => {
  if (mot1.value && mot2.value) {
    UserServices.createWord({ mot1: mot1.value, mot2: mot2.value });
  } else {
    // Champs vides
    this.$q.notify({
      type: "negative",
      message: "Veuillez remplir tous les champs.",
    });
  }
};
</script>

<style>
.label-large {
  font-size: 16px; /* Ajustez la taille de la police selon vos préférences */
  font-weight: 500;
}
.btn-dropdown-pageCreate {
  border: 0.5px solid #0000001d; /* Ajoutez une bordure avec le style souhaité */
}
</style>
