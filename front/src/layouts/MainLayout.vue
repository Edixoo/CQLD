<template>
  <q-layout>
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn
          v-if="isMobile"
          flat
          color="primary"
          icon="menu"
          @click="drawerLeft = !drawerLeft"
          round
          dense
          class="q-mr-md color-btn"
        />

        <a href="/" class="q-mr-xl">
          <q-img
            alt="logo_CQLD"
            src="~assets/logo_CQLD.svg"
            class="logo_size"
          />
        </a>

        <q-btn-dropdown
          v-if="!isMobile"
          label="CATÉGORIES"
          flat
          class="q-mr-md"
        >
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
          v-if="!isMobile"
          flat
          color="primary"
          label="QUI SOMMES NOUS ?"
          text-color="white"
          to="/contact"
          class="q-mr-md"
        />

        <q-btn
          v-if="!isMobile && admin"
          flat
          color="primary"
          label="Administration"
          text-color="white"
          to="/admin"
        />

        <q-space />

        <q-btn
          v-if="!isMobile"
          label="Créer un lien"
          to="/create"
          text-color="primary"
          class="q-mr-md"
          color="white"
        />

        <q-input
          dark
          v-model="SearchBarValue"
          borderless
          dense
          filled
          placeholder="Rechercher"
          style="background: #ffffff0d; width: 300px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <connexion-button v-if="!connexion" />

        <q-btn
          round
          color="primary"
          label=""
          v-if="connexion"
          class="q-ml-md"
          ref="menuBtn"
        >
          <q-avatar size="42px">
            <img src="~assets/profile.svg" />
          </q-avatar>

          <q-menu ref="menu">
            <q-list style="min-width: 150px">
              <q-item
                v-close-popup
                style="text-align: center; font-weight: bold"
              >
                <q-item-section class="row">{{ getUserAuth() }}</q-item-section>
              </q-item>

              <q-item
                v-if="userStore.role === 'admin'"
                v-close-popup
                style="text-align: center; font-weight: bold"
              >
                <q-item-section v-if="userStore.role === 'admin'">
                  {{ userStore.role === "admin" ? "Administrateur" : "" }}
                </q-item-section>
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
      <q-card class="q-pa-sm width-searchbar">
        <div>
          <h5 class="h5">Barre de recherche</h5>
          <q-btn
            class="icon-close"
            flat
            round
            dense
            @click="closeSearchBarFunction"
          >
            <q-icon name="close" />
          </q-btn>
        </div>

        <q-card-section class="row justify-center q-card-section">
          <q-input
            v-model="SearchBarValue"
            filled
            borderless
            clearable
            placeholder="Rechercher"
            class="width-searchbar"
            @update:model-value="searchItems"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>

        <q-separator />

        <q-card-section class="row justify-center">
          <q-list bordered class="rounded-borders card-category">
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

    <!-- Version responsive -->
    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="200"
      :breakpoint="700"
      elevated
      class="bg-primary text-white"
    >
      <q-scroll-area class="fit">
        <div class="responsive-menu">
          <a href="/" class="q-mr-xl">
            <q-img
              alt="logo_CQLD"
              src="~assets/logo_CQLD.svg"
              class="logo_size q-ma-md"
            />
          </a>
          <div class="responsive-menu-content">
            <q-space />
            <q-btn
              flat
              color="primary"
              text-color="white"
              to="/"
              class="q-mb-md"
              ><q-icon class="q-mr-md" name="home" /> Accueil</q-btn
            >

            <q-btn
              flat
              color="primary"
              text-color="white"
              to="/contact"
              class="q-mb-md"
              ><q-icon class="q-mr-md" name="info" /> Notre équipe</q-btn
            >

            <q-btn
              flat
              to="/create"
              class="q-mr-md q-mb-md"
              color="primary"
              text-color="white"
              ><q-icon class="q-mr-md" name="add" /> Créer un lien</q-btn
            >

            <q-space />

            <q-btn
              flat
              color="primary"
              text-color="white"
              icon="arrow_drop_down"
              label="Catégories"
              @click="changeValueShowMenuResponsive()"
              class="q-mb-md q-btn-responsive"
            >
            </q-btn>

            <!-- Use v-show to conditionally show or hide q-card-section -->
            <q-card-section
              v-show="showCategoriesMenu"
              class="q-card-responsive"
            >
              <q-item
                clickable
                v-for="theme in themes"
                :key="theme._id"
                @click="$router.push(`/categories/` + theme.theme_name)"
                class="q-item-responsive"
              >
                <q-item-section class="q-item-section-responsive">
                  <q-item-label>{{ theme.theme_name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-footer elevated class="row bg-secondary">
      <div class="footer-content">
        <div class="footer-column">
          <logo-social-networks></logo-social-networks>

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
import { onMounted, onUpdated, getCurrentInstance, ref, watch } from "vue";

import ConnexionButton from "src/components/ConnexionButton.vue";
import logoSocialNetworks from "src/components/logoSocialNetworks.vue";

import themesServices from "src/services/ThemeServices";
import ConnexionServices from "src/services/ConnexionServices";

import { jwtDecode } from "jwt-decode";
import UserServices from "src/services/UserServices";
import WordServices from "src/services/WordServices";
import { useUserStore } from "src/stores/userStore";

const userStore = useUserStore();
import checkApiHealth from "src/services/checkBack";

const { proxy } = getCurrentInstance();
const SearchBarValue = ref("");

const themes = ref([]);
const connexion = ref(false);
const isExpanded = ref(true);
const filteredThemes = ref([]);
const listConnexion = ref([]);
const openSearchBar = ref(false);
// const openDrawer = ref(false);
const isMobile = ref(false);
const drawerLeft = ref(false);
const showCategoriesMenu = ref(false);
const admin = ref(false);

const openSearchBarFunction = () => {
  openSearchBar.value = true;
};

const closeSearchBarFunction = () => {
  openSearchBar.value = false;
  SearchBarValue.value = "";
  filteredThemes.value = [];
  listConnexion.value = [];
};

const getUserAuth = () => {
  const user = userStore.username;
  return user;
};

watch(
  () => userStore.username,
  () => {
    if (userStore.username) {
      connexion.value = true;
    } else {
      connexion.value = false;
    }
  }
);

watch(
  () => userStore.role,
  () => {
    if (userStore.role === "admin") {
      admin.value = true;
    } else {
      admin.value = false;
    }
  }
);

onMounted(async () => {
  const isApiHealthy = await checkApiHealth.checkApiHealth();
  if (!isApiHealthy) {
    proxy.$router.push("/no-api");
  }
  drawerLeft.value = false;
  themes.value = await themesServices.listThemes();
  if (localStorage.getItem("userToken")) {
    const decoded = jwtDecode(localStorage.getItem("userToken"));
    userStore.username = decoded.username;
    userStore.role = decoded.role;
  }

  isMobile.value = window.innerWidth <= 600;

  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth <= 600;
  });
});

watch(SearchBarValue, async (newSearchBar, oldSearchBar) => {
  if (SearchBarValue.value.length > 0) {
    openSearchBarFunction();
  }
  searchItems();
});

const searchItems = async () => {
  try {
    const searchValue = SearchBarValue.value;
    const themeResult = await themesServices.getlistThemeContain(searchValue);
    filteredThemes.value = themeResult.map((item) => item.theme_name);

    // Search for connections
    const connectionResult = await ConnexionServices.getConnexionContainWord(
      searchValue
    );

    for (const connection of connectionResult) {
      const [mot1, mot2] = await Promise.all([
        WordServices.getWordById(connection.word1),
        WordServices.getWordById(connection.word2),
      ]);

      const mot1_value = mot1.word;
      const mot2_value = mot2.word;

      const connexionStr = {
        liaison: `${mot1_value} VS ${mot2_value}`,
        id_liaison: connection.id,
      };

      // Check if the connection is already in the list
      if (
        !listConnexion.value.some(
          (conn) => conn.id_liaison === connexionStr.id_liaison
        )
      ) {
        listConnexion.value.push(connexionStr);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la recherche", error);
  }
};

const changeValueShowMenuResponsive = () => {
  console.log(showCategoriesMenu.value);
  showCategoriesMenu.value = !showCategoriesMenu.value;
};

const deconnexion = () => {
  UserServices.logout();
  window.location.reload();
};

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
  color: $third;
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

.color-btn {
  background-color: white;
}

.icon-close {
  position: absolute;
  right: 0px;
  top: 0px;
}

.header {
  height: 70px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.width-searchbar {
  width: 500px;
}

.card-category {
  width: 500px;
  display: flex;
  justify-content: space-around;
}

.icon-close {
  position: absolute;
  margin: 5px;
  top: 10px;
  right: 10px;
  color: #808080;
  z-index: 1;
}

.h5 {
  margin-bottom: 10px;
  margin-left: 15px;
  font-weight: bold;
}

.q-card-responsive {
  padding: 16px;
  margin-left: 20px;
  padding-top: 2px;
}

.q-item-responsive {
  margin-bottom: 0px;
}

.q-btn-responsive {
  margin-bottom: 0px;
}

.responsive-menu {
  margin-top: 15px;
}

.responsive-menu-content {
  margin-top: 15px;
}
</style>
