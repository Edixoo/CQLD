<template>
  <q-layout>
    <q-header elevated style="height: 70px; align-items: center; display: flex">
      <q-toolbar>
        <a href="/" class="q-mr-xl">
          <q-img
            alt="logo_CQLD"
            src="~assets/logo_CQLD.svg"
            style="width: 120px; height: 30px"
          />
        </a>

        <q-btn-dropdown label="Catégories" flat class="q-mr-md">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Paul</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Chiens</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Marine</q-item-label>
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
      <q-btn
        unelevated
        round
        color="primary"
        icon="account_circle"
        size="22px"
        to="/login"
      />

      <!-- <q-img
        alt="login"
        src="~assets/login.svg"
        style="width: 60px; height: 60px"
        class="q-mr-md q-ml-md"
      /> -->
    </q-header>

    <q-footer
      elevated
      class="row"
      style="background: #a5d296; height: 50px; align-items: center"
    >
      <div class="text-h6 q-pl-md" style="color: black">© CQLD 2023</div>
      <q-space />
      <q-btn
        flat
        label="Contactez nous"
        text-color="black"
        to="/contact"
        class="text-subtitle1 text-weight-bold"
      />
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const textInput = ref("");
</script>
