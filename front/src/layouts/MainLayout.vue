<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="height: 70px; align-items: center; display: flex">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            alt="logo_CQLD"
            src="~assets/logo_CQLD.svg"
            style="width: 120px; height: 30px"
          />
        </q-toolbar-title>

        <q-btn-dropdown label="Catégories" flat>
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

        <q-btn flat color="primary" label="Flat" text-color="withe" />

        <q-img
          alt="login"
          src="~assets/login.svg"
          style="width: 35px; height: 35px"
        />

        <q-input
          dark
          bordeless
          v-model="text"
          dense
          style="
            background: #ffffff0d;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
          "
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
</script>
