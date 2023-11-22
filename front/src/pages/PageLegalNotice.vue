<template>
  <q-page>
    <div class="q-pa-md" style="padding: 0%; margin: 0%">
      <div class="legal-content">
        <div class="width">
          <h4 class="h4">Mentions légales</h4>
        </div>
        <q-separator />

        <section class="width">
          <h6 class="h6">Informations légales</h6>
          <p>Nom du site web : CQLD</p>
          <p>Adresse : 19 Rue Louis David, 62100 Calais, France</p>
          <p>
            Identification des collaborateurs : Langrez Marine, Bacquet Antoine,
            Amzil Marwane, Pruvost Paul
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Contact</h6>
          <p>Adresse e-mail : cqld-iut@gmail.com</p>
          <p>Téléphone : [Numéro de téléphone]</p>
        </section>

        <section class="width">
          <h6 class="h6">Directeur de la publication</h6>
          <p>Nom : Bacquet Antoine (chef de projet) ainsi que ses équipiers</p>
        </section>

        <section class="width">
          <h6 class="h6">Hébergement</h6>
          <p>Nom de l'hébergeur : [Nom de l'hébergeur]</p>
          <p>Adresse : [Adresse de l'hébergeur]</p>
        </section>

        <section class="width">
          <h6 class="h6">Propriété Intellectuelle</h6>
          <p>
            L'ensemble des contenus de ce site (textes, images, vidéos, etc.)
            est la propriété exclusive de CQLD et est protégé par les lois
            françaises et internationales relatives à la propriété
            intellectuelle.
          </p>
          <p>
            Toute reproduction ou représentation totale ou partielle de ce site
            par quelque procédé que ce soit, sans l'autorisation expresse de
            CQLD, est interdite et constituerait une contrefaçon sanctionnée par
            les articles L. 335-2 et suivants du Code de la propriété
            intellectuelle.
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Liens hypertextes</h6>
          <p>
            La création de liens hypertextes vers le site de CQLD est soumise à
            son autorisation préalable. Les liens hypertextes établis en
            direction d'autres sites à partir de CQLD ne sauraient, en aucun
            cas, engager la responsabilité de CQLD.
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Données Personnelles</h6>
          <p>
            Les données personnelles collectées sur ce site sont uniquement
            destinées à CQLD et ne seront en aucun cas cédées à des tiers.
            Conformément à la loi "Informatique et Libertés" du [Date de la
            loi], vous disposez d'un droit d'accès, de modification, de
            rectification et de suppression des données qui vous concernent.
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Modification des Mentions Légales</h6>
          <p class="last-paragraph">
            CQLD se réserve le droit de modifier, à tout moment et sans préavis,
            les présentes mentions légales afin de les adapter aux évolutions du
            site et/ou de son exploitation.
          </p>
        </section>
      </div>
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

.width {
  display: grid;
  justify-items: center;
}

.width:last-child {
  margin-bottom: 80px;
}
</style>
