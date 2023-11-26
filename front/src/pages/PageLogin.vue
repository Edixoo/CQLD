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
                  @click="openPopUpForgotPwd()"
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

    <q-dialog v-model="popUpForgotPwd">
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
            v-model="popUpForgotPwdValue"
            label="Email"
            type="email"
            placeholder="Entrer votre email"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Annuler"
            color="primary"
            @click="closePopUpForgotPwd()"
          />
          <q-btn label="Envoyer" color="primary" @click="sendOTP()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="popUpOTP">
      <q-card class="q-pa-md" style="width: 500px">
        <q-card-section>
          <div class="text-h5 title-card">Vérification de votre identité</div>
          <div class="q-mt-md">
            Un mail a été envoyé à <b>{{ popUpForgotPwdValue }}</b
            >. Veuillez entre le code que vous avez reçu.
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="popUpOTPValue"
            label="Numéro OTP"
            placeholder="Entrer le code"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Annuler" color="primary" @click="closePopUpOTP()" />
          <q-btn label="Envoyer" color="primary" @click="verifyOTP()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="PopUpChangePwd">
      <q-card class="q-pa-md" style="width: 500px">
        <q-card-section>
          <div class="text-h5 title-card">Modification du mot de passe</div>
          <div class="q-mt-md">
            Veuillez entrer ci-dessous votre nouveau mot de passe
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="PopUpChangePwdValue"
            label="Nouveau mot de passe"
            placeholder="Entrer le nouveau mot de passe"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Annuler"
            color="primary"
            @click="closePopUpChangePwd()"
          />
          <q-btn label="Envoyer" color="primary" @click="updatePwd()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import UserServices from "../services/UserServices.js";
import { onUnmounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $router = useRouter();

const username = ref("");
const password = ref("");

const popUpForgotPwd = ref(false);
const popUpForgotPwdValue = ref("");

const popUpOTP = ref(false);
const popUpOTPValue = ref("");

const PopUpChangePwd = ref(false);
const PopUpChangePwdValue = ref("");

const openPopUpForgotPwd = () => {
  popUpForgotPwd.value = true;
};

const closePopUpForgotPwd = () => {
  popUpForgotPwd.value = false;
};

const openPopUpOTP = () => {
  popUpOTP.value = true;
};

const closePopUpOTP = () => {
  popUpOTP.value = false;
};

const openPopUpChangePwd = () => {
  PopUpChangePwd.value = true;
};

const closePopUpChangePwd = () => {
  PopUpChangePwd.value = false;
};

const verifyOTP = async () => {
  const otp_bdd = await UserServices.getOTP({
    email: popUpForgotPwdValue.value,
  });

  if (otp_bdd === Number(popUpOTPValue.value)) {
    closePopUpOTP();
    openPopUpChangePwd();
  } else {
    $q.notify({
      type: "negative",
      message: "L'OTP est incorrect",
    });
  }
};

const sendOTP = async () => {
  const result = await UserServices.sendMailWithOTP({
    email: popUpForgotPwdValue.value,
  });

  $q.notify({
    type: "info",
    message: "Email de réinitialisation de mot de passe envoyé.",
  });

  closePopUpForgotPwd();
  openPopUpOTP();
};

const updatePwd = () => {
  try {
    const updatePwd = UserServices.updatePassword({
      email: "marinelangrez@outlook.fr",
      new_pwd: PopUpChangePwdValue.value,
    });

    $q.notify({
      type: "positive",
      message: "Le mot de passe a été modifié",
    });

    closePopUpChangePwd();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Une erreur est survenue",
    });
  }
};

const login = async () => {
  if (username.value && password.value) {
    await UserServices.login({
      username: username.value,
      password: password.value,
    }).then(() => {
      $q.notify({
        type: "positive",
        message: "Vous êtes connecté.",
      });
    });

    window.location.reload();
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
