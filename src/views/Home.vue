<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { currentUser, logout, loadCurrentUser } = useAuth()

async function handleLogout() {
  try {
    await logout()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

onMounted(async () => {
  const user = await loadCurrentUser()
  if (!user) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <nav class="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <a href="/" class="text-purple-400 font-semibold text-xl">AniToki</a>
      <div v-if="currentUser" class="flex items-center gap-4">
        <span class="text-gray-300">Hola, {{ currentUser.username }}</span>
        <button
          @click="handleLogout"
          class="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Salir
        </button>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-8">
      <h1 class="text-3xl font-light mb-8">Bienvenido a AniToki</h1>

      <div class="card p-6 mb-6">
        <h2 class="text-xl mb-4">Panel principal</h2>
        <p class="text-gray-400">
          Este es el panel de usuario. Aquí puedes añadir tu contenido.
        </p>
      </div>

      <div class="card p-6">
        <h2 class="text-xl mb-4">Información de usuario</h2>
        <div v-if="currentUser" class="space-y-2">
          <p><strong>ID:</strong> {{ currentUser.id }}</p>
          <p><strong>Usuario:</strong> {{ currentUser.username }}</p>
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #333;
  border-radius: 12px;
  background: #1a1a1a;
}
</style>
