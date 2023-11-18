<template>
  <div class="row q-pa-md">
    <div class="q-ma-sm col self-center">
      <q-btn
        class="q-mr-xl"
        flat
        label="S'INSCRIRE"
        text-color="white"
        size="md"
        @click="$router.push('/register')"
      />
    </div>
    <div class="q-ma-sm">
      <q-btn
        label="SE CONNECTER"
        color="white"
        text-color="primary"
        @click="$router.push('/login')"
      />
    </div>
  </div>
</template>
