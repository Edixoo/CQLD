<template>
  <q-page>
    <div class="q-pa-xl">
      <q-markup-table class="table">
        <thead class="header">
          <tr>
            <th class="text-left">Mot1</th>
            <th class="text-right">Mot2</th>
            <th class="text-right">Catégorie</th>
            <th class="text-right">Description</th>
            <th class="text-right">Inspecter</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mot, index) in mots" :key="index">
            <td class="text-left">{{ mot.mot1 }}</td>
            <td class="text-right">{{ mot.mot2 }}</td>
            <td class="text-right">{{ mot.categorie }}</td>
            <td class="text-right">{{ mot.description }}</td>
            <td class="text-right" >
              <q-btn class="button" @click="inspectWord(index)" label="Inspecter"/>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <q-dialog v-model="dialog">
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
            <p> Description de la différence entre Mot 1 et Mot 2 </p>
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
        <q-card-actions align="right">
          <q-btn color="negative" label="Annuler" />
          <q-btn color="positive" label="Valider" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const mots = [
  {
    mot1: "Paul",
    mot2: "Pol",
    categorie: "Prénom",
    description: "Pas la même sglkdflfmkgjffldmfgjldklgllgofdhidgjfoskpêkogjpihopgk",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },{
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  },
  {
    mot1: "Mot1B",
    mot2: "Mot2B",
    categorie: "CatégorieB",
    description: "DescriptionB",
  }
];

const dialog=ref(true)
const inspectWord = (index) => {
  console.log("Inspecting word at index:", index);
};
</script>

<style>
.table{
  overflow-y: auto; 
  max-height: 500px;
}

.header{
  background-color: #54546C;
  color: white;
}

.button{
  background-color: #54546C;
  color: white;
  font-size:x-small;
  padding: 6px;
}
</style>