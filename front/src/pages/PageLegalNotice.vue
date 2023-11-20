<template>
  <q-page>
    <div class="q-pa-md" style="padding: 0%; margin: 0%">
      <div class="legal-content">
        <section>
          <h3>Informations légales</h3>
          <p>Raison sociale : CQLD</p>
          <p>Adresse : 19 Rue Louis David, 62100 Calais, France</p>
          <p>
            Numéro d'immatriculation : [Numéro d'immatriculation au registre du
            commerce]
          </p>
        </section>

        <section>
          <h3>Contact</h3>
          <p>Adresse e-mail : [Adresse e-mail de contact]</p>
          <p>Téléphone : [Numéro de téléphone]</p>
        </section>

        <section>
          <h3>Directeur de la publication</h3>
          <p>Nom : [Nom du directeur de la publication]</p>
        </section>

        <section>
          <h3>Hébergement</h3>
          <p>Nom de l'hébergeur : [Nom de l'hébergeur]</p>
          <p>Adresse : [Adresse de l'hébergeur]</p>
        </section>

        <section>
          <h3>Propriété Intellectuelle</h3>
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

        <section>
          <h3>Liens hypertextes</h3>
          <p>
            La création de liens hypertextes vers le site de CQLD est soumise à
            son autorisation préalable. Les liens hypertextes établis en
            direction d'autres sites à partir de CQLD ne sauraient, en aucun
            cas, engager la responsabilité de CQLD.
          </p>
        </section>

        <section>
          <h3>Données Personnelles</h3>
          <p>
            Les données personnelles collectées sur ce site sont uniquement
            destinées à CQLD et ne seront en aucun cas cédées à des tiers.
            Conformément à la loi "Informatique et Libertés" du [Date de la
            loi], vous disposez d'un droit d'accès, de modification, de
            rectification et de suppression des données qui vous concernent.
          </p>
        </section>

        <section>
          <h3>Modification des Mentions Légales</h3>
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
h3 {
  font-weight: 500;
  //   text-align: center;
  font-size: 30px;
  color: $third;
}

p {
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.5px;
  text-align: justify;
  color: $third;
  margin: auto;
  width: 80%;
}

.first-paragraph {
  margin-top: 60px;
}

.last-paragraph {
  margin-bottom: 50px;
}
</style>
