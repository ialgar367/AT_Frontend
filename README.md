# AT_Frontend - Vue 3 Application

Frontend de Anitoki construido con Vue 3, Vue Router y Vite.

## Requisitos

- Node.js 18+ y npm

En Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y nodejs npm
```

## Instalación

```bash
npm install
```

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

Aplicación en: **http://127.0.0.1:5173/**

### Build de producción

```bash
npm run build
```

Los archivos se generan en `dist/`

### Preview de producción

```bash
npm run preview
```

## Estructura

```
AT_Frontend/
├── package.json
├── vite.config.js           # Configuración Vite + proxy
├── index.html
└── src/
    ├── main.js              # Entry point
    ├── App.vue              # Componente raíz
    ├── style.css            # Estilos globales
    ├── router/
    │   └── index.js         # Vue Router + guards
    ├── views/               # Páginas
    │   ├── Login.vue        # Página login
    │   ├── Register.vue     # Página registro
    │   └── Home.vue         # Panel principal
    └── composables/
        └── useAuth.js       # Composable autenticación
```

## Rutas

- `/` - Redirige a `/login`
- `/login` - Página de login (requiere guest)
- `/register` - Página de registro (requiere guest)
- `/home` - Panel principal (requiere autenticación)

## Composables

### useAuth

Composable para gestionar autenticación:

```javascript
import { useAuth } from './composables/useAuth'

const { currentUser, login, register, logout, loadCurrentUser } = useAuth()
```

**Métodos:**
- `loadCurrentUser()` - Carga usuario actual desde API
- `register(username, email, password)` - Registra nuevo usuario
- `login(username, password)` - Inicia sesión
- `logout()` - Cierra sesión

**Estado:**
- `currentUser` - Objeto ref con datos del usuario o null

## Configuración del proxy

Vite está configurado para hacer proxy de `/api` al backend Django:

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
  },
}
```

Esto permite hacer llamadas a `/api/...` desde Vue sin problemas de CORS.

## Dependencias principales

- Vue 3.5+
- Vue Router 4.5+
- Vite 6.0+

## Notas de desarrollo

El frontend consume la API del backend Django. Asegúrate de que el backend esté corriendo en `http://127.0.0.1:8000` antes de iniciar el frontend.
