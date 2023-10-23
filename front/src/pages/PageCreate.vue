<!-- <template>
  <q-page
    style="background-color: #d9d9d9; display: flex; justify-content: center"
    class="q-h-full"
  >
    <div class="row justify-center items-center flex-center">
      <div
        class="col-12 text-center"
        style="
          width: 600px;
          background-color: white;
          border-radius: 6px;
          padding: 30px;
        "
      >
        <h4>Créer votre couple de mots</h4>
        <div class="row flex-center justify-between">
          <q-input outlined v-model="text" label="Mot 1" />
          <q-input outlined v-model="text" label="Mot 2" />
        </div>
        <div class="row flex-center justify-between q-pt-xl">
          <q-input
            v-model="text"
            filled
            type="textarea"
            label="Description"
            class="full-width"
          />
        </div>

        <div class="row q-pt-xl">
          <q-btn-dropdown label="Catégories" flat class="q-mr-md">
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

        <div class="row justify-end q-pt-md">
          <q-btn color="primary" label="Envoyer" style="width: 100px" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup></script> -->
<template>
  <q-page>
    <q-page-container>
      <q-card style="max-width: 450px" class="q-mx-auto q-pa-md q-py-md">
        <!-- Added q-py-md for vertical padding -->
        <q-card-section>
          <div class="q-gutter-md">
            <q-form @submit="login">
              <h2 class="text-h4" style="text-align: center">
                Créer une liaison
              </h2>

              <div class="row">
                <q-input
                  filled
                  v-model="mot1"
                  label="Mot 1"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Veuillez entrer le mot 1',
                  ]"
                  class="col q-mr-md"
                />
                <q-input
                  filled
                  v-model="mot2"
                  label="Mot 2"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Veuillez entrer le mot 2',
                  ]"
                  class="col"
                />
              </div>

              <div class="q-mt-md">
                <q-input
                  v-model="text"
                  filled
                  type="textarea"
                  label="Description"
                  class="full-width"
                />
              </div>

              <q-btn-dropdown label="Catégories" flat class="q-mr-md q-mt-md">
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

<script>
export default {
  data() {
    return {
      mot1: "",
      mot2: "",
    };
  },
  methods: {
    login() {
      if (this.mot1 && this.mot2) {
        // Faire la connexion ici
        console.log(
          "Connexion avec nom d'utilisateur:",
          this.mot1,
          "et mot de passe:",
          this.mot2
        );
      } else {
        // Champs vides
        this.$q.notify({
          type: "negative",
          message: "Veuillez remplir tous les champs.",
        });
      }
    },
  },
};
</script>
