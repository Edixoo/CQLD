<template>
  <q-page>
    <q-page-container>
      <q-card style="max-width: 550px" class="q-mx-auto q-pa-md">
        <q-card-section>
          <div class="q-gutter-md">
            <q-form @submit="register">
              <h2 class="text-h4" style="text-align: center">S'inscrire</h2>

              <div class="row q-form row no-wrap">
                <div class="col">
                  <q-input
                    filled
                    v-model="firstName"
                    label="Prénom"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Veuillez entrer votre prénom',
                    ]"
                    class="q-mr-md"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    v-model="lastName"
                    label="Nom"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Veuillez entrer votre nom',
                    ]"
                  />
                </div>
              </div>

              <q-input
                filled
                v-model="username"
                label="Nom d'utilisateur"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Veuillez entrer un nom d\'utilisateur',
                ]"
              />

              <q-input
                filled
                v-model="email"
                label="Adresse e-mail"
                lazy-rules
                type="email"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Veuillez entrer une adresse e-mail valide',
                ]"
              />

              <q-input
                v-model="password"
                filled
                label="Mot de passe"
                lazy-rules
                :type="isPwd ? 'password' : 'text'"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Veuillez entrer un mot de passe',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <q-input
                v-model="confirmPassword"
                filled
                label="Confirmer le mot de passe"
                lazy-rules
                :type="isPwd ? 'password' : 'text'"
                :rules="[
                  (val) =>
                    val === this.password ||
                    'Les mots de passe ne correspondent pas',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div class="q-mt-lg" style="display: flex">
                <p class="q-mr-sm" style="font-weight: 500">Déjà un compte ?</p>
                <a
                  @click="$router.push('/login')"
                  class="q-mb-xs"
                  style="text-decoration: none"
                >
                  Connectez-vous</a
                >
              </div>

              <q-btn
                label="S'inscrire"
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

<!-- Le reste de votre composant Vue -->

<script setup>
import UserServices from "../services/UserServices.js";
import { ref } from "vue";

const username = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isPwd = ref(true);

const register = () => {
  if (
    username.value &&
    firstName.value &&
    lastName.value &&
    email.value &&
    password.value &&
    confirmPassword.value
  ) {
    UserServices.register({
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  } else {
    // Champs vides
    this.$q.notify({
      type: "negative",
      message: "Veuillez remplir tous les champs.",
    });
  }
};
</script>
