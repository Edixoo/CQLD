<template>
  <q-page>
    <q-card style="max-width: 600px" class="q-mx-auto q-pa-md q-py-md">
      <q-card-section>
        <div class="q-gutter-md">
          <h2 class="text-h4" style="text-align: center">
            Mot 1 VS  Mot 2
          </h2>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div>
          <p>Description de la différence entre Mot 1 et Mot 2</p>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <div class="q-mt-md">
                <label for="catégories" class="label-large">Catégories</label>
                <div>
                  <q-btn-dropdown
                    flat
                    class="q-mr-md btn-dropdown-pageCreate"
                    label="zzzzzzzzzz"
                  >
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
            </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
</script>