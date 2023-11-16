<template>
    <q-card clickable @click="() => $router.push('/liens/' + connexion.id)" class="cardstyle">
        <q-card-section class="cardsection-title text-h5">
            <div class="row">
                {{ connexion.word1.word }} 
            </div>
            <div class="row">
                VS 
            </div>
            <div class="row">
                {{ connexion.word1.word }}
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
        required: true
    }
})


</script>

<style lang="scss">

.cardstyle{
    height: 300px;
    width: 300px;
    border-radius: 20px;

    &:hover{
       cursor: pointer;
    }
    .cardsection-title{
        color: white;
        font-weight: 1000;
        height: 100px;
        text-align: center;
        background-color: $primary;
        
        div {
            text-align: center;
        }
    }
    .description{
        height: 200px;
        text-align: center;
    }
}

</style>