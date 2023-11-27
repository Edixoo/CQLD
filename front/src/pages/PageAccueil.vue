<template>
  <q-page>
    <q-space />
    <div class="page-container">
      <h1 class="row flex-center carterOne page-title">
        C'est quoi la différence ?
      </h1>
      <div class="button-container">
        <q-btn
          color="primary"
          label="Lien Aléatoire"
          :to="'/liens/' + alea"
          @click="DefineAleatoire()"
          class="q-pa-sm q-ma-xl button-resp"
          size="lg"
        />
        <CreateLink
          v-if="connexion ? (chemin = '/create') : (chemin = '/create')"
          :to="chemin"
          class="q-ma-xl q-pa-sm button-resp"
          size="lg"
        />
      </div>

      <q-card class="content q-pb-lg">
        <q-card-section>
          <h2 class="q-mt-xl carterOne content-title-card">
            Qu'est ce que c'est ?
          </h2>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-mt-lg content-text">
          <p>
            <strong
              >C'est quoi la différence entre "content" et "heureux"?</strong
            >
            Eh bien, si vous n'avez pas la réponse, ne vous inquiétez pas, moi
            non plus.
          </p>
        </q-card-section>
        <p>
          Imaginez un site où vous pouvez enfin trouver des réponses à toutes
          ces questions de différences subtiles entre les mots. Eh bien, c'est
          exactement ce que nous avons créé. Notre site, tout simplement appelé
          <strong>"CQLD"</strong>, est l'endroit où tout le monde peut soumettre
          et découvrir des nuances entre deux mots.
        </p>
        <p>
          <strong>Comment ça marche?</strong> C'est facile. Vous vous
          identifiez, choisissez deux mots (ou créez-les si nécessaire), puis
          rédigez un texte expliquant la différence entre ces deux mots. Mais,
          bien sûr, nous ne laissons pas n'importe qui dire n'importe quoi.
          Toutes les réponses sont soumises à la validation d'un administrateur.
        </p>
        <p>
          <strong>Le meilleur</strong>, c'est que toutes les différences
          approuvées sont disponibles via un moteur de recherche sur la page
          d'accueil du site. Fini les mystères linguistiques non résolus !
        </p>
        <p>
          Dorénavant, quand on vous posera la question redoutée, vous pourrez
          simplement répondre avec assurance "CQLD". Parce que, vraiment, qui a
          le temps de se creuser la tête sur toutes ces nuances? Nous l'avons
          fait pour vous."
        </p>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import CreateLink from "src/components/CreateLink.vue";
import { onMounted, ref } from "vue";
import ConnexionServices from "src/services/ConnexionServices";
const alea = ref(0);
const chemin = ref("connect");
const connexion = ref(true);

const DefineAleatoire = async () => {
  const maxDiff = (await ConnexionServices.listConnections()).length;
  alea.value = Math.floor(Math.random() * maxDiff);
};

onMounted(DefineAleatoire);
</script>

<style lang="scss">
h2 {
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

.content {
  margin: auto;
  width: 90%;
  margin-bottom: 100px;
  p {
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0.5px;
    text-align: center;
    margin: auto;
    margin-bottom: 20px;
    color: $third;
    width: 80%;
  }
}

.page-container {
  padding: 24px;
}

.page-title {
  font-weight: 500;
  font-size: 70px;
  line-height: 1.5;
  margin-bottom: 24px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.button-resp {
  width: 200px;
}

.content-text {
  text-align: left;
  margin-bottom: 20px;
}

@media (max-width: 450px), screen and (orientation: portrait) {
  .page-title {
    font-weight: 500;
    font-size: 36px;
    line-height: 1.5;
    margin-bottom: 24px;
  }

  .button-resp {
    width: 200px;
    font-size: 13px !important;
  }

  .content-title-card {
    font-weight: 500;
    font-size: 28px;
  }

  .content-text {
    text-align: left;
    margin-bottom: 20px;
  }
}
</style>
