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

      <connexion-button v-if="!connexion"/>

      <q-btn-dropdown
        v-if="connexion"
        label="MON COMPTE"
        flat
        class="q-mr-md"
        />
    </q-header>

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
import { jwtDecode } from "jwt-decode";
import UserServices from "src/services/UserServices";

const textInput = ref("");
const themes = ref([]);
const connexion = ref(false);

onMounted(async () => {
  themes.value = await themesServices.listThemes();
  if(localStorage.getItem("userToken")){
    const decoded = jwtDecode(localStorage.getItem("userToken"));
    connexion.value = true;
  }
});


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

.middle-section {
  margin-top: 12px;
}
</style>
