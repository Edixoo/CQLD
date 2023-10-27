<template>
  <q-page>
    <app-title :title="categorie.name"/>

    
  </q-page>
</template>

<script setup lang="ts">
import AppTitle from 'components/ui/AppTitle.vue'
import { useRoute } from 'vue-router';


const route=useRoute()

const categorieId=route.params.id

const categorie={
  name: 'Emotions'
}

//findOne dans les catégories avec l'id en paramètres
</script>
