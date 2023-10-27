<template>
  <q-page>
  <div class="q-pa-md"
  style="padding: 0% ; margin: 0%;">
    <div class="q-gutter-md row items-start">
      <q-img
        v-for="mode in fitModes"
        :key="mode"
        src="~assets/photosympa.jpg"
        style="max-width:100%; height: 350px;"
        :fit="mode"
      >
      </q-img>
    </div>
  </div>
  <div class="text-h2 h2 q-mt-xl" font="roboto font">
        Qui sommes-nous ?
      </div>

      <div class="q-mt-lg">
        <p class="q-mb-lg">
          Nous sommes sympa
        </p>
      </div>
  </q-page>
</template>

<script >
export default {
  setup () {
    return {
      fitModes: [ 'photo de groupe']
    }
  }
}

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
