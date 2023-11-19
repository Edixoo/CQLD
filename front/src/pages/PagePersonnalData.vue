<template>
  <q-page>
    <div class="q-pa-md" style="padding: 0%; margin: 0%">
      <p class="first-paragraph">
        Bienvenue sur la page de données personnelles de CQLD !
      </p>
      <p>
        Chez CQLD, nous accordons une grande importance à la protection de la
        vie privée de nos utilisateurs. Cette politique de confidentialité
        explique quelles données personnelles nous collectons, comment nous les
        utilisons, et les droits dont vous disposez concernant vos informations.
      </p>

      <section>
        <h3>Collecte de Données Personnelles</h3>
        <p>
          Nous collectons des données personnelles lorsque vous utilisez nos
          services. Ces informations peuvent inclure votre nom, votre adresse
          e-mail, votre adresse IP, etc. Nous collectons ces données dans le but
          de vous fournir nos services, d'améliorer votre expérience
          utilisateur, et de personnaliser le contenu que vous voyez.
        </p>
      </section>

      <section>
        <h3>Consentement</h3>
        <p>
          En utilisant nos services, vous consentez à la collecte et au
          traitement de vos données personnelles telles que décrites dans cette
          politique de confidentialité. Vous pouvez retirer votre consentement à
          tout moment en nous contactant à l'adresse fournie en bas de cette
          page.
        </p>
      </section>

      <section>
        <h3>Droits des Utilisateurs</h3>
        <p>
          Vous avez le droit d'accéder à vos données personnelles, de les
          rectifier, de les supprimer, de vous opposer à leur traitement, et
          plus encore. Pour exercer vos droits, veuillez nous contacter à
          [adresse e-mail].
        </p>
      </section>

      <section>
        <h3>Sécurité des Données</h3>
        <p>
          La sécurité de vos données personnelles est une priorité pour nous.
          Nous avons mis en place des mesures de sécurité robustes pour protéger
          vos informations contre tout accès non autorisé, perte ou
          modification.
        </p>
      </section>

      <section>
        <h3>Partage de Données</h3>
        <p>
          Nous ne partageons vos données personnelles avec des tiers que dans le
          cadre de la prestation de nos services. Nous ne vendons ni ne louons
          vos informations à des tiers à des fins de marketing.
        </p>
      </section>

      <section>
        <h3>Contact</h3>
        <p>
          Si vous avez des questions concernant notre politique de
          confidentialité ou si vous souhaitez exercer vos droits en matière de
          données personnelles, veuillez nous contacter à [adresse postale] ou
          par e-mail à [adresse e-mail].
        </p>
      </section>

      <section>
        <h3>Mises à jour</h3>
        <p class="last-paragraph">
          Cette politique de confidentialité peut être mise à jour
          périodiquement. Toute modification importante sera communiquée de
          manière appropriée.
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
h3 {
  font-weight: 500;
  text-align: center;
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
