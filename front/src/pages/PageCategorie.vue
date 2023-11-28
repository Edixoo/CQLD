<template>
  <q-page>
    <div v-if="categorie && connexions">
      <div class="title-button-section">
        <app-title :title="categorie.theme_name" />
        <q-btn
          v-if="admin"
          class="q-ml-xl q-mb-xl button"
          color="primary"
          icon="edit"
          label="Modifier la catégorie"
          @click="() => (editCategorie = !editCategorie)"
        />
      </div>
      <div class="text-h3 q-ml-xl q-mt-xl q-mb-md carterOne">
        Liens de la catégorie
      </div>
      <q-btn
        class="q-ml-xl q-mb-xl button"
        color="primary"
        label="Créer un lien"
        to="/create"
        />
      <div>
        <div v-if="connexions.length" class="ajust-items">
          <q-list v-for="connexion in connexions" :key="connexion._id">
            <q-item>
              <AppCardVS class="q-ma-md" :connexion="connexion" />
            </q-item>
          </q-list>
        </div>

        <div v-else class="q-ma-xl">
          <div class="no-content">
            <q-icon
              name="sentiment_very_dissatisfied"
              size="100px"
              color="negative"
            />
            Aucun lien pour cette catégorie
          </div>
        </div>
      </div>

    </div>
    <div v-else class="q-mt-xl center-chargement">
      <q-spinner size="100px" color="primary" />
      <div class="text-h4 q-mt-xl q-ml-xl">Chargement en cours...</div>
    </div>
    
    <q-dialog v-model="editCategorie" persistent>
      <q-card style="width: 500px">
        <q-card-section class="text-h5"> Modifier la catégorie </q-card-section>
        <q-card-section>
          <q-form @submit="PopUpEdit" @reset="OnReset">
            <div>
              <label for="catégories" class="label-large"
                >Nom de la catégorie</label
              >
              <div>
                <q-input
                  v-model="categorieNameModel"
                  filled
                  placeholder="Ex. Animaux"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Veuillez entrer le nom de la catégorie',
                  ]"
                  class="full-width"
                />
              </div>
            </div>

            <div align="right">
              <q-btn
                label="Annuler"
                type="reset"
                color="negative"
                class="q-ml-auto"
              />
              <q-btn
                label="Envoyer"
                type="submit"
                color="primary"
                class="q-ml-md"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import AppTitle from "src/components/ui/AppTitle.vue";
import { onMounted, onUpdated, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppCardVS from "src/components/categoriePage/AppCardVS.vue";
import ThemeServices from "../services/ThemeServices";
import ConnectionsServices from "../services/ConnexionServices";
import { useUserStore } from "src/stores/userStore";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const categorie = ref(null);
const connexions = ref(null);
const editCategorie = ref(false);
const categorieNameModel = ref("");
const admin=ref(false);

const PopUpEdit = async () => {
  await ThemeServices.updateTheme(categorie.value._id, {
    theme_name: categorieNameModel.value,
  });
  router.push("/categories/" + categorieNameModel.value);
  categorieNameModel.value = null;
  editCategorie.value = false;
};

const OnReset = () => {
  categorieNameModel.value = categorie.value.theme_name;
  editCategorie.value = false;
};

onMounted(async () => {
  let categorieName = route.params.name;
  categorie.value = await ThemeServices.getThemeByName(categorieName);
  connexions.value = await ConnectionsServices.getConnectionByTheme(
    categorie.value._id
  );
  categorieNameModel.value = categorie.value.theme_name;
  if(userStore.role === "admin") {
    admin.value = true
  } else {
    admin.value = false
  }
});

onUpdated(async () => {
  let categorieName = route.params.name;
  categorie.value = await ThemeServices.getThemeByName(categorieName);
  connexions.value = await ConnectionsServices.getConnectionByTheme(
    categorie.value._id
  );
  categorieNameModel.value = categorie.value.theme_name;
  editCategorie.value = false;
});

</script>

<style lang="scss">
.no-content {
  display: flex;
  font-size: 25px;
  color: $negative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.center-chargement {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ajust-items {
  display: flex;
  justify-content: flex-start;
}

.title-button-section {
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  .button {
    height: 30px;
    margin-right: 15px;
  }
}
</style>
