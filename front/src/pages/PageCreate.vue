<template>
  <q-page
    style="background-color: #d9d9d9; display: flex; justify-content: center"
    class="q-h-full"
  >
    <div class="row justify-center items-center flex-center">
      <div
        class="col-12 text-center"
        style="
          width: 600px;
          background-color: white;
          border-radius: 6px;
          padding: 30px;
        "
      >
        <h4>Créer votre couple de mots</h4>
        <div class="row flex-center justify-between">
          <q-input outlined v-model="text" label="Mot 1" />
          <q-input outlined v-model="text" label="Mot 2" />
        </div>
        <div class="row flex-center justify-between q-pt-xl">
          <q-input
            v-model="text"
            filled
            type="textarea"
            label="Description"
            class="full-width"
          />
        </div>

        <div class="row q-pt-xl">
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
        </div>

        <div class="row justify-end q-pt-md">
          <q-btn color="primary" label="Envoyer" style="width: 100px" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
