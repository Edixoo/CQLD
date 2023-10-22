<template>
  <div class="row q-pa-md">
    <div class="q-ma-sm col self-center">
      <q-btn
        class="q-mr-xl"
        flat
        label="S'inscrire"
        text-color="white"
        size="md"
        @click="$router.push('/register')"
      />
    </div>
    <div class="q-ma-sm">
      <q-btn
        label="se connecter"
        color="white"
        text-color="primary"
        @click="$router.push('/login')"
      />
    </div>
  </div>
</template>
