import { ref } from 'vue'

const currentUser = ref(null)

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return ''
}

async function setCsrfCookie() {
  await fetch('/api/csrf/', {
    credentials: 'include',
  })
}

export function useAuth() {
  async function loadCurrentUser() {
    try {
      const response = await fetch('/api/auth/user/', { credentials: 'include' })
      const data = await response.json()
      currentUser.value = data.isAuthenticated ? data.user : null
      return currentUser.value
    } catch (error) {
      currentUser.value = null
      return null
    }
  }

  async function register(username, email, password) {
    await setCsrfCookie()
    const csrfToken = getCookie('csrftoken')
    
    const response = await fetch('/api/auth/register/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ username, email, password }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.detail || 'Error al registrar')
    }

    currentUser.value = data.user
    return data
  }

  async function login(username, password) {
    await setCsrfCookie()
    const csrfToken = getCookie('csrftoken')
    
    const response = await fetch('/api/auth/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.detail || 'Credenciales inválidas')
    }

    currentUser.value = data.user
    return data
  }

  async function logout() {
    await setCsrfCookie()
    const csrfToken = getCookie('csrftoken')
    
    const response = await fetch('/api/auth/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken,
      },
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.detail || 'Error al cerrar sesión')
    }

    currentUser.value = null
    return data
  }

  return {
    currentUser,
    loadCurrentUser,
    register,
    login,
    logout,
  }
}
