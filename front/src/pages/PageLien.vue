<template>
  <q-page>
    <div v-if="connexion">
      <q-btn
        class="q-ma-md justify-center"
        flat
        label="Retour"
        icon="keyboard_double_arrow_left"
        @click="$router.go(-1)"
      />
      <app-title
        :title="connexion.word1.word + ' vs ' + connexion.word2.word"
        class="title-page-link"
      />
      <div v-if="admin" class="btn-container">
        <q-btn
          color="primary"
          label="Modifier le lien"
          class="q-ma-md btn-page-link"
          icon="edit"
          :to="'/edit/' + connexion.id"
        />
        <q-btn
          color="negative"
          label="Supprimer le lien"
          class="q-ma-md btn-page-link"
          icon="delete"
          @click="() => (deleteVerif = !deleteVerif)"
        />
      </div>

      <div class="text-h3 carterOne marge-automatique q-mt-xl">
        Informations
      </div>

      <div class="marge-automatique">
        <div class="text-h4 q-mt-xl carterOne q-ml-lg">Catégorie</div>
        <div class="text-subtitle1 text-weight-medium q-ma-xl">
          {{ connexion.theme.theme_name }}
        </div>
        <div class="text-h4 q-mt-xl carterOne q-ml-lg">Description</div>
        <div class="text-subtitle1 text-weight-medium q-mt-xl q-ml-xl q-mb-lg">
          {{ connexion.description }}

          <div class="font-owner">Proposé par : {{ proprio }}</div>
        </div>

        <create-link class="q-ma-md q-mb-xl btn-page-link" />
      </div>
    </div>
    <app-chargement v-else />

    <q-dialog v-model="deleteVerif">
      <q-card class="q-pa-sm">
        <q-card-section class="row items-left q-ma-sm">
          <div class="text-subtitle1">
            <q-icon name="warning" color="negative" size="md" />
            Souhaitez-vous vraiment supprimer ce lien ?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="negative" label="Annuler" flat outlined v-close-popup />
          <q-btn
            color="positive"
            icon="delete"
            label="Confirmer"
            @click="DeleteActions"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppTitle from "src/components/ui/AppTitle.vue";
import { useRoute, useRouter } from "vue-router";
import ConnexionServices from "../services/ConnexionServices";
import CreateLink from "src/components/CreateLink.vue";
import { useQuasar } from "quasar";
import { useUserStore } from "../stores/userStore";
import AppChargement from "src/components/AppChargement.vue";
import ThemeServices from "../services/ThemeServices";
import UserServices from "src/services/UserServices";

const $q = useQuasar();
const route = useRoute();
const $router = useRouter();
const userStore = useUserStore();

const deleteVerif = ref(false);
const connexion = ref(null);
const admin = ref(false);
const liensId = route.params.id;

let proprio = ""; // Utilisez "let" plutôt que "const" ici

onMounted(async () => {
  connexion.value = await ConnexionServices.getConnectionByIdInt(liensId);
  connexion.value.theme = await ThemeServices.getThemeById(
    connexion.value.theme
  );

  console.log(connexion.value.proposed_by);
  // const user = await UserServices.getProfile()

  const user = await UserServices.getUserByID({
    _id: connexion.value.proposed_by,
  });

  proprio = user.username;

  console.log("user", user.username);

  if (
    userStore.role === "admin" ||
    connexion.value.proposed_by === userStore.id
  ) {
    admin.value = true;
  } else {
    admin.value = false;
  }
});

const DeleteActions = async () => {
  await ConnexionServices.deleteConnection(connexion.value._id).then(() => {
    $q.notify({
      color: "positive",
      message: "Le lien a bien été supprimé",
      icon: "done",
    });
    $router.push("/");
  });
};
</script>

<style lang="scss">
@media (max-width: 450px), screen and (orientation: portrait) {
  .title-page-link {
    margin: 0px;
    display: flex;
    justify-content: center;
  }

  .title-page-link h1 {
    margin-left: 0px;
    font-size: 40px;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    margin-left: 45px;
  }

  .btn-page-link {
    font-size: 11px;
  }

  // .btn-page-link:last-child {
  //   margin-left: 40px;
  // }

  .marge-automatique {
    margin: 0px !important;
  }

  .text-h3 {
    margin: 0px !important;
    font-size: 30px;
    text-align: center;
  }

  .text-h4 {
    margin: 0px !important;
    font-size: 25px;

    text-align: center;
  }

  .content-page-link {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.font-owner {
  font-style: italic;
  color: grey;
}
.marge-automatique {
  margin-left: 50px;

  .inner-wrap {
    margin-left: 100px;
  }
}
</style>
