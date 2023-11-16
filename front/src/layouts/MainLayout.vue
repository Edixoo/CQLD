<template>
  <q-layout>
    <q-header elevated style="height: 70px; align-items: center; display: flex">
      <q-toolbar>
        <a href="/" class="q-mr-xl">
          <q-img
            alt="logo_CQLD"
            src="~assets/logo_CQLD.svg"
            class="logo_size"
          />
        </a>

        <q-btn-dropdown label="Catégories" flat class="q-mr-md">
          <q-list v-for="theme in themes" :key="theme._id">
            <q-item clickable v-close-popup @click="$router.push(`/categories/` +theme.theme_name)">
              <q-item-section>
                <q-item-label>{{theme.theme_name}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          flat
          color="primary"
          label="Qui sommes nous ?"
          text-color="white"
          to="/contact"
        />
        <q-space />
        <q-input
          dark
          bordeless
          v-model="textInput"
          dense
          filled
          clearable
          placeholder="Rechercher"
          style="background: #ffffff0d; width: 300px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>

      <connexion-button />

      <q-btn-dropdown
        v-if="false"
        flat
        class="q-mr-md"
        icon="account_circle"
        :label="user.name"
      >
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Paul</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Chiens</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Marine</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <!-- <q-img
        alt="login"
        src="~assets/login.svg"
        style="width: 50px; height: 50px"
        class="q-mr-md q-ml-md"
      /> -->
    </q-header>

    <q-footer elevated class="row bg-secondary">
      <q-toolbar>
        <q-toolbar-title class="text-h6 q-ml-md footer_title">
          © CQLD 2023
        </q-toolbar-title>

        <q-btn
          flat
          label="Contactez nous"
          text-color="black"
          size="md"
          to="/contacteznous"
        />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ConnexionButton from "src/components/ConnexionButton.vue";
import CreateLink from "src/components/CreateLink.vue";
import themesServices from "src/services/ThemeServices";



const textInput = ref("");
const themes=ref([]);

onMounted(async () => {
  themes.value = await themesServices.listThemes();
});


const user = ref({
  name: "Paul",
  email: "",
});
</script>

<style lang="scss">
.logo_size {
  width: 120px;
  height: 30px;
}

.footer_title {
  color: black;
}
</style>
