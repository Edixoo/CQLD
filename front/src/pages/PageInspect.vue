<template>
    <div class="q-pa-md">
      <q-markup-table>
        <thead style="background-color: #54546c; color: white">
          <tr>
            <th class="text-left">Mot1</th>
            <th class="text-right">Mot2</th>
            <th class="text-right">Catégorie</th>
            <th class="text-right">Description</th>
            <th class="text-right">Inspecter</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(connexion, index) in mots" :key="index">
            <td class="text-left">{{ connexion.mot1 }}</td>
            <td class="text-right">{{ connexion.mot2 }}</td>
            <td class="text-right">{{ connexion.theme }}</td>
            <td class="text-right">{{ connexion.description }}</td>
            <td class="text-right">
              <q-btn
                @click="inspectWord(index)"
                size="12px"
                flat
                dense
                round
                icon="search"
              >Inspecter</q-btn>
            </td>
            <td class="text-right">
              <q-btn
                @click="approuverMot(index)"
                v-if="!connexion.approved"
                size="12px"
                flat
                dense
                round
                color="positive"
                icon="check"
              >Accepter</q-btn>
              <q-btn
                @click="refuserMot(index)"
                v-else
                size="12px"
                flat
                dense
                round
                color="negative"
                icon="close"
              >Refuser</q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; 
  
  const selectedMot = ref(null);
  const route = useRouter();
  

  const { params } = route.currentRoute;
  if (params && params.id) {
   
    selectedMot.value = {
      mot1: 'Mot1',
      mot2: 'Mot2',
      categorie: 'Catégorie',
      description: 'Description',
    };
  }
  
  const goBack = () => {
    router.go(-1); 
  };

  const approuverMot = async (index) => {
  try {
    
    const selectedMotId = mots.value[index]._id;

    
    await ConnexionServices.updateConnection(selectedMotId, { approved: true });

    
    mots.value.splice(index, 1);

    $q.notify({
      color: "positive",
      message: "Le mot a bien été approuvé",
      icon: "done",
    });
  } catch (error) {
    console.error("Erreur lors de l'approbation du mot:", error);
  }
};

const refuserMot = async (index) => {
  try {
    
    const selectedMotId = mots.value[index]._id;

    
    await ConnexionServices.deleteConnection(selectedMotId);

    
    mots.value.splice(index, 1);

    $q.notify({
      color: "negative",
      message: "Le mot a été refusé et supprimé",
      icon: "done",
    });
  } catch (error) {
    console.error("Erreur lors du refus et de la suppression du mot:", error);
  }
};

  </script>
  
  <style>
  .inspect-details {
    margin: 20px;
  }
  </style>
  