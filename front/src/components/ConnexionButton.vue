<template>
  <div class="row q-pa-md">
    <div class="q-ma-sm col self-center">
      <!-- Render "S'INSCRIRE" and "SE CONNECTER" buttons if not logged in -->
      <q-btn
        v-if="!isAuthenticated"
        class="q-mr-xl"
        flat
        label="S'INSCRIRE"
        :color="getButtonColor('register')"
        :text-color="getTextColor('register')"
        size="md"
        :class="{ 'active-button': isRegisterActive }"
        @click="handleButtonClick('register')"
      />
    </div>
    <div class="q-ma-sm">
      <!-- Render "S'INSCRIRE" and "SE CONNECTER" buttons if not logged in -->
      <q-btn
        v-if="!isAuthenticated"
        flat
        label="SE CONNECTER"
        :color="getButtonColor('login')"
        :text-color="getTextColor('login')"
        :class="{ 'active-button': isLoginActive }"
        @click="handleButtonClick('login')"
      />

      <!-- <q-btn-dropdown text-color="white" color="primary" label="">
        <div class="row no-wrap q-pa-md">
          <div class="column items-center">
            <q-avatar size="40px" class="img-avatar">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <div class="text-subtitle1 img-avatar">John Doe</div>

            <q-btn
              color="primary"
              label="Logout"
              push
              size="sm"
              v-close-popup
            />
          </div>
        </div>
      </q-btn-dropdown> -->

      <q-btn round color="primary" label="" v-if="isAuthenticated">
        <q-avatar size="42px">
          <!-- <img src="https://cdn.quasar.dev/img/avatar2.jpg" /> -->
          <img src="~assets/profile.svg" />
        </q-avatar>

        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Voir le compte</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- <q-btn round color="white">
        <q-avatar size="32px">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar>
      </q-btn> -->
    </div>
  </div>
</template>

<script setup>
import { is } from "quasar";
import { ref, getCurrentInstance, computed } from "vue";

const { proxy } = getCurrentInstance();

const isRegisterActive = ref(false);
const isLoginActive = ref(true);
const activeTextColor = ref("primary");
const inactiveTextColor = ref("white");
const isAuthenticated = ref(localStorage.getItem("userToken") !== null);
console.log("isAuthenticated", isAuthenticated);

// const isAuthenticated = localStorage.getItem('userToken')

const handleOkButtonClick = () => {};

const handleButtonClick = (buttonType) => {
  if (buttonType === "register") {
    isRegisterActive.value = true;
    isLoginActive.value = false;
    proxy.$router.push("/register");
  } else if (buttonType === "login") {
    isRegisterActive.value = false;
    isLoginActive.value = true;
    proxy.$router.push("/login");
  }
};

const getButtonColor = (buttonType) => {
  return isButtonActive(buttonType) ? "white" : "primary";
};

const getTextColor = (buttonType) => {
  return isButtonActive(buttonType)
    ? activeTextColor.value
    : inactiveTextColor.value;
};

const isButtonActive = (buttonType) => {
  return buttonType === "register"
    ? isRegisterActive.value
    : isLoginActive.value;
};
</script>

<style>
.active-button {
  background-color: white;
  /* Ajoutez d'autres styles selon vos besoins */
}

.row.q-pa-md {
  padding-top: 0px;
}

.img-avatar {
  padding-top: 12px;
}
</style>
