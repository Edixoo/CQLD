<template>
    <q-card clickable @click="() => $router.push('/liens/' + connexion.id)" class="cardstyle">
        <q-card-section class="cardsection-title text-h5">
            {{ connexion.word1.word }} VS {{ connexion.word1.word }}
        </q-card-section>
        <q-separator />
        <q-card-section>
            <div>
                {{ connexion.description }}
            </div>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { onMounted } from "vue"


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
        height: 70px;
        text-align: center;
        background-color: $primary;
        
    }
    div{
        height: 200px;
        text-align: center;
    }
}

</style>