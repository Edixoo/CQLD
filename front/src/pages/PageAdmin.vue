<template>
  <div class="q-pa-xl">
    <q-markup-table style="overflow-y: auto; max-height: 500px;">
      <thead style="background-color: #54546C; color: white;">
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
            <q-btn @click="inspectWord(index)" label="Inspecter"  style="background-color: #54546C; color: white; width: 80px;"/>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup>
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

const inspectWord = (index) => {
  console.log("Inspecting word at index:", index);
};
</script>
