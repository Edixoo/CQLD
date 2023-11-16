<template>
    <div>
        <h1 class="carterOne">{{title}}</h1>
        <q-separator />
    </div>
</template>

<script setup >

defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss">
h1{
    color: $third;
    font-size: 75px;
    margin-left: 100px;
    text-align: left;
}
</style>