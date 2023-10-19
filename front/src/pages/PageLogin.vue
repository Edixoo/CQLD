<template>
  <q-page>
    <q-page-container>
      <q-card style="max-width: 450px" class="q-mx-auto q-pa-md">
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
              />

              <div>
                <a href="#" style="text-decoration: none"
                  >Mot de passe oublié ?</a
                >
              </div>

              <div class="q-mt-xl" style="display: flex">
                <p class="q-mr-xs" style="font-weight: 500">Pas de compte ?</p>
                <a href="#" class="q-mb-xs" style="text-decoration: none">
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

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username && this.password) {
        // Faire la connexion ici
        console.log(
          "Connexion avec nom d'utilisateur:",
          this.username,
          "et mot de passe:",
          this.password
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
