<template>
  <q-page>
    <div class="q-pa-md pageWho">
      <q-carousel animated v-model="slide" arrows navigation infinite>
        <q-carousel-slide
          :name="1"
          img-src="../assets/PictureCarousel/PictureCarouselCodage.jpg"
        />
        <q-carousel-slide
          :name="2"
          img-src="../assets/PictureCarousel/PictureCarouselNumeric.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="../assets/PictureCarousel/PictureCarouselBinary.jpg"
        />
        <q-carousel-slide
          :name="4"
          img-src="../assets/PictureCarousel/PictureCarouselNetwork.jpg"
        />
      </q-carousel>
    </div>

    <div id="app">
      <div class="width">
        <h4 class="h4">Qui sommes-nous ?</h4>
      </div>
      <q-separator />

      <section class="width">
        <h6 class="h6">Notre Projet</h6>
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

      <section class="width">
        <h6 class="h6">Notre Équipe</h6>
        <p>
          Notre équipe de développeurs est composée d'étudiants passionnés de
          l'Université du Littoral Côte d'Opale. Chacun d'entre nous apporte une
          contribution unique, mettant en avant ses compétences techniques et
          son amour pour l'apprentissage. Ensemble, nous avons créé une
          plateforme interactive et stimulante, un espace où la technologie
          rencontre l'éducation de manière harmonieuse.
        </p>
      </section>

      <section class="width">
        <h6 class="h6">Pourquoi Nous ?</h6>
        <p class="last-paragraph">
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
.pageWho {
  padding: 0%;
  margin: 0%;
}

.h6 {
  margin-top: 50px;
  margin-bottom: 10px;
  font-weight: 500;
  color: $third;
  width: 80%;
}

.h4 {
  font-weight: 500;
  color: $third;
  width: 80%;
}

p {
  font-weight: 400;
  line-height: 28px;
  font-size: 15px;
  letter-spacing: 0.5px;
  text-align: justify;
  color: $third;
  margin: auto;
  width: 80%;
}

.last-paragraph {
  margin-bottom: 50px;
}

.width {
  display: grid;
  justify-items: center;
}

.width:last-child {
  margin-bottom: 80px;
}
</style>
