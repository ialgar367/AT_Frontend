<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const profiles = ref([
  {
    id: 1,
    name: 'Abril',
    avatar: 'https://i.pravatar.cc/150?img=1',
    color: '#a855f7',
  },
  {
    id: 2,
    name: 'Laura',
    avatar: 'https://i.pravatar.cc/150?img=5',
    color: '#ec4899',
  },
  {
    id: 3,
    name: 'Andrea',
    avatar: 'https://i.pravatar.cc/150?img=9',
    color: '#f59e0b',
  },
  {
    id: 4,
    name: 'Adri',
    avatar: 'https://i.pravatar.cc/150?img=12',
    color: '#3b82f6',
  },
])

function selectProfile(profile) {
  // Aquí puedes guardar el perfil seleccionado
  console.log('Perfil seleccionado:', profile.name)
  router.push('/home')
}

function manageProfiles() {
  // Navegar a gestión de perfiles
  console.log('Gestionar perfiles')
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1 class="logo">AniToki</h1>
    </div>

    <div class="profile-content">
      <div class="profiles-grid">
        <div
          v-for="profile in profiles"
          :key="profile.id"
          class="profile-item"
          @click="selectProfile(profile)"
        >
          <div class="profile-avatar" :style="{ borderColor: profile.color }">
            <img :src="profile.avatar" :alt="profile.name" />
          </div>
          <p class="profile-name">{{ profile.name }}</p>
        </div>
      </div>

      <button class="btn-manage" @click="manageProfiles">
        <span class="btn-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </span>
        Gestionar Perfiles
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(10, 10, 10, 0.9)),
    url('https://images.unsplash.com/photo-1606947884439-f9f064c0f3f6?w=1920&h=1080&fit=crop') center/cover;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.profile-header {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 4rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #a855f7;
  margin: 0;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.profiles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  max-width: 1000px;
}

.profile-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.profile-item:hover {
  transform: scale(1.1);
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid transparent;
  overflow: hidden;
  transition: border-color 0.3s;
  background: rgba(255, 255, 255, 0.1);
}

.profile-item:hover .profile-avatar {
  border-color: currentColor;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  margin: 0;
}

.btn-manage {
  background: #a855f7;
  color: #fff;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  margin-top: 2rem;
}

.btn-manage:hover {
  background: #9333ea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
}

.btn-icon {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .profiles-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
  }
}
</style>
