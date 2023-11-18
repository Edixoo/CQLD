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

      <connexion-button />

      <!-- <q-btn-dropdown
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
      </q-btn-dropdown> -->
    </q-header>
    <q-footer elevated class="row bg-secondary">
      <div class="footer-content">
        <div class="footer-column">
          <div class="footer-section" style="text-align: center">
            <div class="footer-column align-items-footer">
              <q-btn
                size="12px"
                flat
                label="Données personnelles"
                text-color="black"
                to="/contactez-nous"
              />
              <q-btn
                size="12px"
                flat
                label="Mentions Légales"
                text-color="black"
                to="/mentions-legales"
              />
              <q-btn
                size="12px"
                flat
                label="Contactez Nous"
                text-color="black"
                to="/contactez-nous"
              />
            </div>
          </div>
        </div>

        <!-- Column 2 -->
        <div class="footer-column">
          <div class="footer-section" style="text-align: center">
            <div class="footer-column align-items-footer">
              <!-- Address section -->
              <p class="footer-title footer-p">CQLD</p>
              <p class="footer-p">19 Rue Louis David</p>
              <p class="footer-p">62100 Calais</p>
              <p class="footer-p">France</p>
            </div>
          </div>
        </div>

        <!-- Column 3 -->
        <div class="footer-column">
          <div class="footer-section" style="text-align: center">
            <div class="align-items-footer">
              <p class="footer-title footer-p">Suivez-nous</p>
              <div class="column3">
                <!-- Social media icons -->
                <q-icon
                  name="facebook"
                  class="social-icon"
                  @click="redirectToSocialMedia('facebook')"
                />
                <q-icon
                  name="instagram"
                  class="social-icon"
                  @click="redirectToSocialMedia('instagram')"
                />
              </div>
            </div>
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
import { onMounted, ref } from "vue";
import ConnexionButton from "src/components/ConnexionButton.vue";
import CreateLink from "src/components/CreateLink.vue";
import themesServices from "src/services/ThemeServices";

const textInput = ref("");
const themes = ref([]);

onMounted(async () => {
  themes.value = await themesServices.listThemes();
});

const user = ref({
  name: "Paul",
  email: "",
});

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

.footer-title {
  font-weight: bold;
  font-size: 18px; /* Adjust the font size as needed */
  color: black; /* Set the text color to black */
}

.footer-p {
  margin-bottom: 0px;
  color: black; /* Set the text color to black */
}

.social-icon {
  font-size: 25px;
  color: black; /* Set the icon color to black */
  margin-right: 10px;
}

.q-btn {
  text-transform: initial;
  font-size: 14px; /* Adjust the font size for the buttons */
}

.align-items-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px;
  margin: auto;
}

.column3 {
  flex-direction: row;
}
</style>
