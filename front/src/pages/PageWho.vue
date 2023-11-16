<template>
  <q-page>
    <div class="q-pa-md" style="padding: 0%; margin: 0%">
      <!-- <div class="q-gutter-md row items-start">
        <q-img
          src="~assets/photo.jpg"
          style="width: 100%; height: 350px; object-fit: cover"
        />
      </div> -->
      <q-carousel animated v-model="slide" arrows navigation infinite>
        <q-carousel-slide
          :name="1"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        />
        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
        <q-carousel-slide
          :name="4"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
        />
      </q-carousel>
    </div>

    <div id="app">
      <h1>Qui sommes-nous ?</h1>

      <section>
        <h3 class="h3">Notre Projet</h3>
        <p>
          Au cœur de notre projet se trouve une vision audacieuse : explorer et
          partager la richesse infinie de la langue. Nous sommes fiers de
          présenter ce site résultant d'un projet amusant, destiné à transcender
          les simples définitions et à plonger dans les nuances subtiles entre
          deux mots. En naviguant sur notre plateforme, vous vous immergerez
          dans une expérience divertissante qui stimulera votre curiosité tout
          en enrichissant votre vocabulaire.
        </p>
      </section>

      <section>
        <h3 class="h3">Notre Équipe</h3>
        <p>
          Notre équipe de développeurs est composée d'étudiants passionnés de
          l'Université du Littoral Côte d'Opale. Chacun d'entre nous apporte une
          contribution unique, mettant en avant ses compétences techniques et
          son amour pour l'apprentissage. Ensemble, nous avons créé une
          plateforme interactive et stimulante, un espace où la technologie
          rencontre l'éducation de manière harmonieuse.
        </p>
      </section>

      <section>
        <h3 class="h3">Pourquoi Nous ?</h3>
        <p>
          Nous sommes motivés par la conviction profonde que l'apprentissage
          peut être une aventure divertissante. La découverte des subtilités
          entre deux mots peut être aussi captivante qu'instructive, et c'est
          cette conviction que nous souhaitons partager avec vous à travers
          notre site. Notre mission est de vous inspirer, de susciter votre
          curiosité linguistique et de faire de chaque exploration de mots une
          expérience enrichissante.
        </p>
      </section>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
    };
  },
};
</script>

<style lang="scss">
.h3 {
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
