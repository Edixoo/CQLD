<template>
    <q-card clickable @click="$route.push(">
        <q-card-section>
            {{ mot1.name }} VS {{ mot2.name }}
        </q-card-section>
        <q-separator />
        <q-card-section>
            {{ diff.description }}
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">

</script>
