<template>
  <q-page>
    <div>
      <app-title v-if="categorie" :title="categorie.theme_name" class="q-mb-xl"/>

    <div v-if="connexions">
      <div v-for="connexion in connexions" :key="connexion._id">
        <AppCardVS class="q-ma-md" v-if="connexion" :connexion="connexion"/>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script setup>
import AppTitle from 'src/components/ui/AppTitle.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppCardVS from 'src/components/categoriePage/AppCardVS.vue';
import ThemeServices from '../services/ThemeServices';
import ConnectionsServices from '../services/ConnexionServices'

const route = useRoute();

const categorie=ref(null)
const connexions=ref(null)

onMounted(async () => {
  let categorieName=route.params.name;
  categorie.value=await ThemeServices.getThemeByName(categorieName);
  connexions.value=await ConnectionsServices.getConnectionByTheme(categorie.value._id);

});

onUpdated(async () => {
  let categorieName=route.params.name;
  categorie.value=await ThemeServices.getThemeByName(categorieName);
  connexions.value=await ConnectionsServices.getConnectionByTheme(categorie.value._id);
});

//findOne dans les catégories avec l'id en paramètres
</script>

<style lang="scss">

</style>
