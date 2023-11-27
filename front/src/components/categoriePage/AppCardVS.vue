<template>
  <q-card
    clickable
    @click="() => $router.push('/liens/' + connexion.id)"
    class="cardstyle text-container"
  >
    <q-tooltip> Cliquez pour voir + d'infos </q-tooltip>
    <q-card-section class="cardsection-title text-h6 position-q-card">
      <div>
        {{ connexion.word1.word }}
      </div>
      <div>vs</div>
      <div>
        {{ connexion.word2.word }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="description">
        {{ connexion.description }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  connexion: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
.cardstyle {
  height: 200px;
  width: 250px;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }
  .cardsection-title {
    color: white;
    font-weight: 500;
    height: 75px;
    background-color: $primary;
    div {
      text-align: center;
    }
  }
  .description {
    max-height: 100px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .position-q-card {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
