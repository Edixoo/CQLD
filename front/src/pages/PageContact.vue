<template>
  <q-page>
    <q-page-container>
      <q-card class="q-mx-auto q-pa-md card-contact">
        <q-card-section>
          <div class="row q-space-between">
            <div class="col">
              <div class="q-gutter-md">
                <q-form>
                  <h4 class="text-h4">Emplacement</h4>
                  <p class="paragraph">Notre adresse postale :</p>
                  <p class="paragraph">
                    Rue Louis David BP 689 62228 Calais cedex
                  </p>
                  <p class="paragraph">Téléphone : +333 33 33333</p>

                  <h4 class="text-h4">Suivez-nous</h4>

                  <div class="row">
                    <a
                      href="https://www.instagram.com/votreprofil"
                      target="_blank"
                      class="q-px-xs"
                    >
                      <img
                        src="~assets/social-icons/instagram.png"
                        alt="Instagram"
                        style="width: 32px; height: 32px"
                      />
                    </a>

                    <a
                      href="https://www.facebook.com/votreprofil"
                      target="_blank"
                      class="q-px-xs"
                    >
                      <img
                        src="~assets/social-icons/facebook.png"
                        alt="facebook"
                        style="width: 32px; height: 32px"
                      />
                    </a>

                    <a
                      href="https://www.twitter.com/votreprofil"
                      target="_blank"
                      class="q-px-xs"
                    >
                      <img
                        src="~assets/social-icons/twitter.png"
                        alt="twitter"
                        style="width: 32px; height: 32px"
                      />
                    </a>
                  </div>
                </q-form>
              </div>
            </div>

            <div class="col">
              <div class="q-gutter-md">
                <q-form @submit="contact">
                  <h4 class="text-h4">Formulaire de contact</h4>
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

                  <div>
                    <div>
                      <q-input
                        v-model="text"
                        filled
                        label="Entrer votre message"
                        type="textarea"
                        class="full-width"
                      />
                    </div>
                  </div>

                  <q-btn
                    label="Soumettre"
                    type="submit"
                    color="primary"
                    class="q-ml-auto q-mt-sm"
                    style="display: flex"
                  />
                </q-form>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import UserServices from "../services/UserServices.js";

const username = ref("");
const email = ref("");
const text = ref("");

const contact = async () => {
  if (username.value && email.value) {
    const result = await UserServices.sendMail({
      username: username.value,
      email: email.value,
      text: text.value,
    });

    if (result) {
      username.value = "";
      email.value = "";
      text.value = "";
    }
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
h4 {
  margin-bottom: 20px;
}

.card-contact {
  max-width: 800px;
}

.paragraph {
  margin: 0;
}
</style>
