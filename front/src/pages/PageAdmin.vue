<template>
  <div class="page-admin q-pa-md">
    <q-list bordered class="rounded-borders q-mb-md">
      <q-item-label header class="bg-primary text-white">
        <div class="row items-center">
          <div class="col-3 text-weight-medium">Mot1</div>
          <div class="col-3 text-weight-medium">Mot2</div>
          <div class="col-2 text-weight-medium">Catégorie</div>
          <div class="col-3 text-weight-medium">Description</div>
          <div class="col-1 text-weight-medium">Inspecter</div>
        </div>
      </q-item-label>

      <template v-for="(mot, index) in mots" :key="index">
        <div class="row items-center" style="grid-template-columns: repeat(5, 1fr); border: 1px solid #000000; border-right: none; border-bottom: none;">
          <div class="col-3 text-weight-medium text-black">{{ mot.mot1 }}</div>
          <div class="col-3 text-black">{{ mot.mot2 }}</div>
          <div class="col-2 text-black">{{ mot.categorie }}</div>
          <div class="col-3 text-black">{{ mot.description }}</div>
          <div class="col-1"><q-btn @click="inspectWord(index)" size="12px" flat dense round icon="search">Inspecter</q-btn></div>
        </div>
      </template>
    </q-list>
  </div>
</template>

<script setup>
const mots = [
  { mot1: "Paul", mot2: "Pol", categorie: "Prénom", description: "Pas la même" },
  { mot1: "Mot1B", mot2: "Mot2B", categorie: "CatégorieB", description: "DescriptionB" },
];

const inspectWord = (index) => {
  console.log('Inspecting word at index:', index);
};
</script>
