<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'

const store = useStore()

const correctLogin = '123'
const correctPassword = '123'

const loginInput = ref('')
const passwordInput = ref('')

const loginUser = () => {
  if (loginInput.value === correctLogin && passwordInput.value === correctPassword) {
    store.commit('login')
    localStorage.setItem('isLoggedIn', 'true')
    alert('вход выполнен')
  } else {
    alert('Неверный логин или пароль')
  }
}

const logoutUser = () => {
  store.commit('logout')
  localStorage.removeItem('isLoggedIn')
  loginInput.value = ''
  passwordInput.value = ''
}

const isLoggedIn = computed(() => store.state.isLoggedIn)

onMounted(() => {
  store.dispatch('checkAuthState')
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <form @submit.prevent="loginUser" class="flex flex-col items-center justify-center">
      <input
        v-if="!isLoggedIn"
        v-model="loginInput"
        type="text"
        placeholder="Логин: 123"
        class="p-2 mt-10 border rounded-md"
      />

      <input
        v-if="!isLoggedIn"
        v-model="passwordInput"
        type="password"
        placeholder="Пароль: 123"
        class="p-2 mt-2 border rounded-md"
      />
      <button v-if="!isLoggedIn" type="submit" class="btn-login">Войти</button>
    </form>

    <button v-if="isLoggedIn" @click="logoutUser" class="btn-login">Выйти</button>
  </div>
</template>
