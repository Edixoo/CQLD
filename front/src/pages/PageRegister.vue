<template>
  <q-page>
    <q-page-container>
      <q-card style="max-width: 450px" class="q-mx-auto q-pa-md">
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
                filled
                v-model="password"
                label="Mot de passe"
                lazy-rules
                type="password"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Veuillez entrer un mot de passe',
                ]"
              />

              <q-input
                filled
                v-model="confirmPassword"
                label="Confirmer le mot de passe"
                lazy-rules
                type="password"
                :rules="[
                  (val) =>
                    val === this.password ||
                    'Les mots de passe ne correspondent pas',
                ]"
              />

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

<script>
export default {
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    register() {
      if (
        this.username &&
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.confirmPassword === this.password
      ) {
        // Faire l'inscription ici
        console.log(
          "Inscription avec nom d'utilisateur:",
          this.username,
          "prénoms:",
          this.firstName,
          "noms:",
          this.lastName,
          "adresse e-mail:",
          this.email,
          "et mot de passe:",
          this.password
        );
      } else {
        // Champs vides ou mots de passe non correspondants
        this.$q.notify({
          type: "negative",
          message: "Veuillez remplir tous les champs correctement.",
        });
      }
    },
  },
};
</script>
