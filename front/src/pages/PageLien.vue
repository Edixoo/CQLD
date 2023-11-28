<template>
  <q-page>
    <div v-if="connexion">
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

      <div class="content-page-link">
        <div class="text-h3 q-mt-xl carterOne q-ml-xl">Description</div>
        <div class="text-subtitle1 text-weight-medium q-ma-xl">
          {{ connexion.description }}
        </div>
      </div>

      <create-link class="q-ma-md btn-page-link" />
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

const $q = useQuasar();
const route = useRoute();
const $router = useRouter();
const userStore = useUserStore();

const deleteVerif = ref(false);
const connexion = ref(null);
const admin = ref(false);
const liensId = route.params.id;

onMounted(async () => {
  connexion.value = await ConnexionServices.getConnectionByIdInt(liensId);

  if (userStore.role === "admin") {
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

<style>
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
  }

  .btn-page-link {
    font-size: 11px;
  }

  .text-h3 {
    margin: 0px;
    font-size: 30px;
  }

  .content-page-link {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
