<template>
  <q-page>
    <q-page-container>
      <q-card style="max-width: 400px" class="q-mx-auto q-pa-md">
        <q-card-section>
          <div class="q-gutter-md">
            <q-form @submit="login">
              <h2 class="text-h4" style="text-align: center">Se connecter</h2>
              <q-input
                filled
                v-model="username"
                label="Nom d'utilisateur"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Veuillez entrer votre nom d\'utilisateur',
                ]"
                class="q-mb-md q-mt-xl"
              />

              <q-input
                filled
                v-model="password"
                label="Mot de passe"
                lazy-rules
                type="password"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Veuillez entrer votre mot de passe',
                ]"
                class="q-mb-md"
              />

              <div>
                <a href="#" style="text-decoration: none"
                  >Mot de passe oublié ?</a
                >
              </div>

              <div class="q-mt-xl" style="display: flex">
                <p class="q-mr-sm" style="font-weight: 500">Pas de compte ?</p>
                <a
                  @click="$router.push('/register')"
                  class="q-mb-xs"
                  style="text-decoration: none"
                >
                  Créez en un</a
                >
              </div>

              <q-btn
                label="Se connecter"
                type="submit"
                color="primary"
                class="q-ml-auto q-mt-sm"
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
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $router = useRouter();

const username = ref("");
const password = ref("");

const login = () => {
  if (username.value && password.value) {
      UserServices.login({ username: username.value, password: password.value }).then((res) => {
        $q.notify({
        type: "positive",
        message: "Vous êtes connecté.",});
      });
      $router.push("/");
  } else {
    // Champs vides
    $q.notify({
      type: "negative",
      message: "Veuillez remplir tous les champs.",
    });
  }
};
</script>

<style></style>
