<template>
  <q-page>
    <div class="q-pa-md" style="padding: 0%; margin: 0%">
      <div class="pagePersonnalData">
        <div class="width">
          <h4 class="h4">Données personnelles</h4>
        </div>

        <q-separator />

        <p class="width first-p">
          Chez CQLD, nous accordons une grande importance à la protection de la
          vie privée de nos utilisateurs. Cette politique de confidentialité
          explique quelles données personnelles nous collectons, comment nous
          les utilisons, et les droits dont vous disposez concernant vos
          informations.
        </p>

        <section class="width">
          <h6 class="h6">Collecte de Données Personnelles</h6>
          <p>
            Nous collectons des données personnelles lorsque vous utilisez nos
            services. Ces informations peuvent inclure votre nom, votre adresse
            e-mail, votre adresse IP, etc. Nous collectons ces données dans le
            but de vous fournir nos services, d'améliorer votre expérience
            utilisateur, et de personnaliser le contenu que vous voyez.
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Consentement</h6>
          <p>
            En utilisant nos services, vous consentez à la collecte et au
            traitement de vos données personnelles telles que décrites dans
            cette politique de confidentialité. Vous pouvez retirer votre
            consentement à tout moment en nous contactant à l'adresse fournie en
            bas de cette page.
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Droits des Utilisateurs</h6>
          <p>
            Vous avez le droit d'accéder à vos données personnelles, de les
            rectifier, de les supprimer, de vous opposer à leur traitement, et
            plus encore. Pour exercer vos droits, veuillez nous contacter à
            cqld-iut@gmail.com
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Sécurité des Données</h6>
          <p>
            La sécurité de vos données personnelles est une priorité pour nous.
            Nous avons mis en place des mesures de sécurité robustes pour
            protéger vos informations contre tout accès non autorisé, perte ou
            modification.
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Partage de Données</h6>
          <p>
            Nous ne partageons vos données personnelles avec des tiers que dans
            le cadre de la prestation de nos services. Nous ne vendons ni ne
            louons vos informations à des tiers à des fins de marketing.
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Contact</h6>
          <p>
            Si vous avez des questions concernant notre politique de
            confidentialité ou si vous souhaitez exercer vos droits en matière
            de données personnelles, veuillez nous contacter par e-mail à
            cqld-iut@gmail.com
          </p>
        </section>

        <section class="width">
          <h6 class="h6">Mises à jour</h6>
          <p class="last-paragraph">
            Cette politique de confidentialité peut être mise à jour
            périodiquement. Toute modification importante sera communiquée de
            manière appropriée.
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

.first-p {
  margin-top: 40px;
}

.width:last-child {
  margin-bottom: 80px;
}
</style>
