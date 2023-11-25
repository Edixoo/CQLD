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
                <a
                  style="text-decoration: underline"
                  @click="openForgotPassword()"
                  >Mot de passe oublié ?</a
                >
              </div>

              <div class="q-mt-xl" style="display: flex">
                <p class="q-mr-sm" style="font-weight: 500">Pas de compte ?</p>
                <a
                  @click="$router.push('/register')"
                  class="q-mb-xs"
                  style="text-decoration: none"
                  >Créez en un</a
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

    <q-dialog v-model="forgotPasswordDialog">
      <q-card class="q-pa-md" style="width: 500px">
        <q-card-section>
          <div class="text-h5 title-card">Réinitialiser le mot de passe</div>
          <div class="q-mt-md">
            Entrez votre nom d’utilisateur ou l’adresse e-mail que vous avez
            utilisée pour vous inscrire. Nous vous enverrons un e-mail afin de
            réinitialiser votre mot de passe.
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="forgotPasswordEmail"
            label="Email"
            type="email"
            placeholder="Entrer votre email"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Annuler"
            color="primary"
            @click="closeForgotPassword()"
          />
          <q-btn
            label="Envoyer"
            color="primary"
            @click="sendForgotPasswordEmail()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="EnterforgotPasswordDialog">
      <q-card class="q-pa-md" style="width: 500px">
        <q-card-section>
          <div class="text-h5 title-card">Nouveau mot de passe</div>
          <div class="q-mt-md">Entrez votre nouveau mot de passe</div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="EnterforgotPasswordEmail"
            label="Mot de passe"
            placeholder="Entrer votre nouveau mot de passe"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Annuler"
            color="primary"
            @click="closEnterForgotPassword()"
          />
          <q-btn label="Envoyer" color="primary" @click="changeMotDePasse()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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

const forgotPasswordDialog = ref(false);
const forgotPasswordEmail = ref("");

const EnterforgotPasswordDialog = ref(false);
const EnterforgotPasswordEmail = ref("");

const randomValue = 0;

const openForgotPassword = () => {
  forgotPasswordDialog.value = true;
};

const closeForgotPassword = () => {
  forgotPasswordDialog.value = false;
};

const openEnterForgotPassword = () => {
  EnterforgotPasswordDialog.value = true;
};

const changeMotDePasse = () => {
  console.log("mot de passe à changer");
};

const closEnterForgotPassword = () => {
  EnterforgotPasswordDialog.value = false;
};

const generateRandomNumber = () => {
  randomValue = Math.floor(Math.random() * 100000);
};

const sendForgotPasswordEmail = async () => {
  const result = await UserServices.sendMailForgotPasseword({
    email: forgotPasswordEmail.value,
  });

  $q.notify({
    type: "info",
    message: "Email de réinitialisation de mot de passe envoyé.",
  });

  closeForgotPassword();
  openEnterForgotPassword();
};

const login = () => {
  if (username.value && password.value) {
    UserServices.login({
      username: username.value,
      password: password.value,
    }).then((res) => {
      $q.notify({
        type: "positive",
        message: "Vous êtes connecté.",
      });
    });
    $router.push("/");
  } else {
    $q.notify({
      type: "negative",
      message: "Veuillez remplir tous les champs.",
    });
  }
};
</script>

<style>
.title-card {
  text-align: center;
}
</style>
