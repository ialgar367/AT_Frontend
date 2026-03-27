<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register } = useAuth()

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref('')
const showPassword = ref(false)

async function handleRegister() {
  errorMessage.value = ''
  
  if (!username.value || !email.value || !password.value || !passwordConfirm.value) {
    errorMessage.value = 'Todos los campos son obligatorios.'
    return
  }

  if (password.value !== passwordConfirm.value) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.'
    return
  }

  try {
    await register(username.value, email.value, password.value)
    router.push('/home')
  } catch (error) {
    errorMessage.value = error.message
  }
}

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-black text-white">
    <div class="w-full max-w-sm px-6">
      <div class="text-center mb-4">
        <a href="/" class="text-purple-400 font-semibold text-xl">AniToki</a>
      </div>

      <div class="text-center mb-6">
        <h1 class="text-2xl font-extralight">Crear cuenta</h1>
      </div>

      <form @submit.prevent="handleRegister" class="card p-8 space-y-6">
        <div>
          <label class="block text-sm mb-2 text-gray-300">Nombre de usuario</label>
          <div class="relative">
            <input
              v-model="username"
              type="text"
              required
              autofocus
              class="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 outline-none py-2 transition-colors"
              placeholder=""
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm mb-2 text-gray-300">Dirección de email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              required
              class="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 outline-none py-2 transition-colors"
              placeholder=""
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              inputmode="email"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm mb-2 text-gray-300">Contraseña</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 outline-none py-2 transition-colors pr-20"
              placeholder=""
              autocomplete="off"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-0 top-2 text-xs text-purple-400 hover:text-purple-300"
            >
              {{ showPassword ? 'ocultar' : 'mostrar' }}
            </button>
          </div>
          <p class="text-xs text-gray-400 mt-1">Mínimo 8 caracteres</p>
        </div>

        <div>
          <label class="block text-sm mb-2 text-gray-300">Confirmar contraseña</label>
          <div class="relative">
            <input
              v-model="passwordConfirm"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 outline-none py-2 transition-colors"
              placeholder=""
              autocomplete="off"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="error text-sm">
          {{ errorMessage }}
        </div>

        <div>
          <button type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors">
            REGISTRARSE
          </button>
        </div>

        <div class="text-center text-xs text-purple-400">
          ¿Ya tienes cuenta?
          <router-link to="/login">ACCEDER</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #333;
  border-radius: 12px;
  background: #1a1a1a;
}
</style>
