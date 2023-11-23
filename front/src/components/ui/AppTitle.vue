<template>
    <div>
        <h1 class="carterOne">{{title}}</h1>
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

    margin-left: 100px;
    text-align: left;
}
</style>
