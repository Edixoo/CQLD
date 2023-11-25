<template>
  <q-layout>
    <q-header
      elevated
      style="
        height: 70px;
        align-items: center;
        display: flex;
        justify-content: center;
      "
    >
      <q-toolbar>
        <a href="/" class="q-mr-xl">
          <q-img
            alt="logo_CQLD"
            src="~assets/logo_CQLD.svg"
            class="logo_size"
          />
        </a>

        <q-btn-dropdown label="CATÉGORIES" flat class="q-mr-md">
          <q-list v-for="theme in themes" :key="theme._id">
            <q-item
              clickable
              v-close-popup
              @click="$router.push(`/categories/` + theme.theme_name)"
            >
              <q-item-section>
                <q-item-label>{{ theme.theme_name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          flat
          color="primary"
          label="QUI SOMMES NOUS ?"
          text-color="white"
          to="/contact"
        />
        <q-space />

        <q-input
          dark
          borderless
          dense
          filled
          placeholder="Rechercher"
          style="background: #ffffff0d; width: 300px"
          @click="openSearchBarFunction()"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <connexion-button v-if="!connexion" />
        <!--
        <q-btn round color="primary" label="" v-if="connexion" class="q-ml-md">
          <q-avatar size="42px">
            <img src="~assets/profile.svg" />
          </q-avatar>
        </q-btn> -->

        <q-btn
          round
          color="primary"
          label=""
          v-if="connexion"
          class="q-ml-md"
          @click="showMenu"
          ref="menuBtn"
        >
          <q-avatar size="42px">
            <img src="~assets/profile.svg" />
          </q-avatar>

          <q-menu ref="menu" @hide="resetMenu">
            <q-list style="min-width: 150px">
              <q-item
                v-close-popup
                style="text-align: center; font-weight: bold"
              >
                <q-item-section>{{ getUserAuth() }}</q-item-section>
              </q-item>

              <q-separator inset />
              <q-item clickable v-close-popup @click="deconnexion()">
                <q-item-section>
                  <div class="justify-between">
                    <q-icon name="logout" />
                    Se déconnecter
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="openSearchBar">
      <q-card class="q-pa-sm" style="width: 500px">
        <q-card-section class="row justify-center">
          <q-input
            v-model="textInput"
            filled
            borderless
            clearable
            placeholder="Rechercher"
            style="width: 500px"
            @update:model-value="searchItems"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>

        <q-separator />

        <q-card-section class="row justify-center">
          <q-list
            bordered
            class="rounded-borders"
            style="width: 500px; display: flex; justify-content: space-around"
          >
            <q-expansion-item
              label="Catégories"
              v-model="isExpanded"
              class="scrollable-expansion-item"
            >
              <q-item
                v-for="theme in filteredThemes"
                :key="theme.value"
                clickable
                @click="$router.push('/categories/' + theme)"
              >
                <q-item-section>
                  <q-item-label caption>{{ theme }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
            <q-expansion-item
              label="Liens"
              v-model="isExpanded"
              class="scrollable-expansion-item"
            >
              <q-item
                v-for="connexion in listConnexion"
                :key="connexion.value"
                clickable
                @click="$router.push('/liens/' + connexion.id_liaison)"
              >
                <q-item-section>
                  <q-item-label caption>{{ connexion.liaison }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-footer elevated class="row bg-secondary">
      <div class="footer-content">
        <div class="footer-column">
          <div class="footer-section" style="text-align: center">
            <a
              href="https://www.instagram.com/votreprofil"
              target="_blank"
              class="q-px-xs"
            >
              <img
                src="~assets/instagram.png"
                alt="Instagram"
                style="width: 25px; height: 25px; margin-top: 15px"
              />
            </a>

            <a
              href="https://www.facebook.com/votreprofil"
              target="_blank"
              class="q-px-xs"
            >
              <img
                src="~assets/facebook.png"
                alt="facebook"
                style="width: 25px; height: 25px; margin-top: 15px"
              />
            </a>

            <a
              href="https://www.twitter.com/votreprofil"
              target="_blank"
              class="q-px-xs"
            >
              <img
                src="~assets/twitter.png"
                alt="twitter"
                style="width: 25px; height: 25px; margin-top: 15px"
              />
            </a>
          </div>

          <div class="footer-section middle-section" style="text-align: center">
            <router-link to="/" class="router-link"
              ><span>Accueil |</span></router-link
            >
            <router-link to="/legalnotice" class="router-link">
              <span>Mentions légales |</span>
            </router-link>
            <router-link to="/personnaldata" class="router-link"
              ><span>Données personnelles |</span>
            </router-link>
            <router-link to="/contacteznous" class="router-link"
              ><span>Contactez nous</span>
            </router-link>
          </div>
          <div class="footer-section" style="text-align: center">
            <p>CQLD © 2023</p>
          </div>
        </div>
      </div>

      <q-page-sticky
        position="bottom-right"
        style="margin-right: 16px; margin-bottom: 10px"
      >
        <q-btn round icon="arrow_upward" color="primary" @click="scrollToTop" />
      </q-page-sticky>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { onMounted, onUpdated, ref } from "vue";

import ConnexionButton from "src/components/ConnexionButton.vue";
import CreateLink from "src/components/CreateLink.vue";
import themesServices from "src/services/ThemeServices";
import ConnexionServices from "src/services/ConnexionServices";

import { jwtDecode } from "jwt-decode";
import UserServices from "src/services/UserServices";
import WordServices from "src/services/WordServices";

const textInput = ref("");
const themes = ref([]);
const connexion = ref(false);
const isExpanded = ref(true);

const filteredThemes = ref([]);
const listConnexion = ref([]);

const openSearchBar = ref(false);

const openSearchBarFunction = () => {
  openSearchBar.value = true;
  textInput.value = ""; // Réinitialise la valeur de la barre de recherche
  filteredThemes.value = []; // Réinitialise les thèmes filtrés
  listConnexion.value = []; // Réinitialise la liste de connexions
};

const getUserAuth = () => {
  const token_decoded = jwtDecode(localStorage.getItem("userToken"));
  const user = token_decoded.username;
  return user;
};

onMounted(async () => {
  themes.value = await themesServices.listThemes();
  if (localStorage.getItem("userToken")) {
    const decoded = jwtDecode(localStorage.getItem("userToken"));
    connexion.value = true;
  }
});

const searchItems = async () => {
  try {
    const result = await themesServices.getlistThemeContain(textInput.value);
    filteredThemes.value = result.map((item) => item.theme_name);

    const result_connexion = await ConnexionServices.getConnexionContainWord(
      textInput.value
    );

    for (let i = 0; i < result_connexion.length; i++) {
      const mot1 = await WordServices.getWordById(result_connexion[i].word1);
      const mot1_value = mot1.word;

      const mot2 = await WordServices.getWordById(result_connexion[i].word2);
      const mot2_value = mot2.word;

      const connexionStr = {
        liaison: `${mot1_value} VS ${mot2_value}`,
        id_liaison: result_connexion[i].id,
      };

      // Si la connexion est déjà dans la liste : on ne l'ajoute ps
      if (
        !listConnexion.value.some(
          (conn) => conn.id_liaison === connexionStr.id_liaison
        )
      ) {
        listConnexion.value.push(connexionStr);
      }
    }
  } catch (error) {
    console.log("Erreur lors de la recherche", error);
  }
};

const deconnexion = () => {
  UserServices.logout();
  window.location.reload();
  console.log("Déconnexion");
};

const user = ref(null);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style lang="scss">
.logo_size {
  width: 120px;
  height: 30px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  width: 100%;
}

.footer-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.router-link span {
  margin-left: 0px;
  margin-right: 5px;
  font-weight: bold;
  color: #252530;
}

.footer-section p {
  font-weight: bold;
  font-size: 10px;
  color: #42543c;
  margin-top: 10px;
  margin-bottom: 0px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.router-link {
  text-decoration: none;
  font-size: 12px;
  margin-bottom: 2px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #54546c;
  }
}
.q-header {
  display: flex;
  flex-direction: column;
}

.middle-section {
  margin-top: 12px;
}

.scrollable-expansion-item {
  max-height: 200px;
  overflow-y: auto;
}

.flex-container {
  display: flex;
}

.justify-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: $negative;
}
</style>
