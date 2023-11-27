<template>
  <div class="row q-pa-md">
    <div class="q-ma-sm col self-center">
      <q-btn
        class="q-mr-sm"
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
      <q-btn
        flat
        label="SE CONNECTER"
        :color="getButtonColor('login')"
        :text-color="getTextColor('login')"
        :class="{ 'active-button': isLoginActive }"
        @click="handleButtonClick('login')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const isRegisterActive = ref(false);
const isLoginActive = ref(true);
const activeTextColor = ref("primary");
const inactiveTextColor = ref("white");

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
}

.img-avatar {
  padding-top: 12px;
}
</style>
