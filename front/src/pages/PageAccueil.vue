<template>
  <q-page>
    <q-space></q-space>
    <div class="col q-pt-xl">
      <h1 class="row flex-center carterOne">C'est quoi la différence ?</h1>
      <div class="row flex-center">
        <q-btn
          color="primary"
          label="Mots Aléatoires"
          :to="'/categories/' + alea"
          @click="DefineAleatoire()"
          class="q-pa-sm q-ma-xl"
          size="lg"
          style="width: 200px"
        />
        <CreateLink
          v-if="connexion ? (chemin = '/create') : (chemin = '/login')"
          :to="chemin"
          class="q-ma-xl q-pa-sm"
          size="lg"
          style="width: 200px"
        />
      </div>

      <div class="text-h2 h2 q-mt-xl" font="roboto font">
        Qu'est ce que c'est ?
      </div>

      <div class="q-mt-lg">
        <p class="q-mb-lg">
          C'est quoi la différence entre "content" et "heureux"? Eh bien, si
          vous n'avez pas la réponse, ne vous inquiétez pas, moi non plus.
        </p>
        <p class="q-mb-lg">
          Imaginez un site où vous pouvez enfin trouver des réponses à toutes
          ces questions de différences subtiles entre les mots. Eh bien, c'est
          exactement ce que nous avons créé. Notre site, tout simplement appelé
          "CQLD", est l'endroit où tout le monde peut soumettre et découvrir des
          nuances entre deux mots.
        </p>
        <p class="q-mb-lg">
          Comment ça marche? C'est facile. Vous vous identifiez, choisissez deux
          mots (ou créez-les si nécessaire), puis rédigez un texte expliquant la
          différence entre ces deux mots. Mais, bien sûr, nous ne laissons pas
          n'importe qui dire n'importe quoi. Toutes les réponses sont soumises à
          la validation d'un administrateur.
        </p>
        <p class="q-mb-lg">
          Le meilleur, c'est que toutes les différences approuvées sont
          disponibles via un moteur de recherche sur la page d'accueil du site.
          Fini les mystères linguistiques non résolus !
        </p>
        <p class="q-mb-lg">
          Dorénavant, quand on vous posera la question redoutée, vous pourrez
          simplement répondre avec assurance "CQLD". Parce que, vraiment, qui a
          le temps de se creuser la tête sur toutes ces nuances? Nous l'avons
          fait pour vous."
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CreateLink from "src/components/CreateLink.vue";
import { ref } from "vue";

const alea = ref(0);
const chemin = ref("connect");
const connexion = ref(false);
const maxDiff = 10;

const DefineAleatoire = () =>
  (alea.value = Math.floor(Math.random() * maxDiff));
</script>

<style lang="scss">
.h2 {
  font-weight: 500;
  line-height: 56px;
  letter-spacing: 0.15px;
  text-align: center;
  color: $third;
}

h1 {
  font-weight: 500;
  line-height: 106px;
  font-size: 72px;
  letter-spacing: 0.15px;
  text-align: center;

  color: $third;
}
p {
  font-weight: 400;
  line-height: 28px;
  font-size: 18px;
  height: 50px;
  letter-spacing: 0.5px;
  text-align: center;
  color: $third;
  margin: auto;
  width: 80%;
}
</style>
