# Zuzki Notion Worker

API basada en Cloudflare Workers que proporciona información de GitHub y estado de streaming de Twitch para el sitio web de Zuzki.

## ✨ Características

*   Consulta de recursos almacenados en GitHub (overlays, redes sociales, tecnologías, layouts, creadores)
*   Verificación de estado de streaming en Twitch para un usuario específico
*   Arquitectura modular y escalable con separación de responsabilidades
*   Soporte para CORS configurado para dominios específicos

## 🚀 Tecnologías Utilizadas

*   [Cloudflare Workers](https://workers.cloudflare.com/) - Plataforma serverless para ejecutar JavaScript en el edge
*   [Hono](https://hono.dev/) - Framework web ultrarrápido para entornos Edge
*   [Vite](https://vitejs.dev/) - Herramienta de compilación frontend rápida
*   [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript

## 🏁 Empezando

Estas instrucciones te guiarán para obtener una copia del proyecto en funcionamiento en tu máquina local para fines de desarrollo y prueba.

### Pre-requisitos

Asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/) (versión 18 o superior)
*   [pnpm](https://pnpm.io/) (gestor de paquetes)
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/) (herramienta de desarrollo para Cloudflare Workers)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd zuzki-notion-worker
    ```

2.  Instala las dependencias del proyecto:
    ```bash
    pnpm install
    ```

3.  Crea un archivo `.dev.vars` con las variables de entorno necesarias:
    ```bash
    # Variables requeridas para desarrollo local
    GITHUB_TOKEN=tu_token_de_github
    TWITCH_CLIENT_ID=tu_client_id_de_twitch
    TWITCH_ACCESS_TOKEN=tu_token_de_acceso_de_twitch
    ```

### Desarrollo Local

Para iniciar el servidor de desarrollo local, ejecuta el siguiente comando:

```bash
pnpm run dev
```

Esto iniciará un servidor de desarrollo en `http://localhost:5173` utilizando Vite.

## ⚙️ Configuración

Las siguientes variables de entorno son necesarias para que el Worker funcione correctamente:

* `GITHUB_TOKEN`: Token de acceso personal de GitHub para acceder a los datos del repositorio.
* `TWITCH_CLIENT_ID`: ID de cliente para la API de Twitch.
* `TWITCH_ACCESS_TOKEN`: Token de acceso para la API de Twitch.

## ☁️ Despliegue

Para desplegar tu Worker a Cloudflare, ejecuta el siguiente comando:

```bash
pnpm run deploy
```

Esto construirá el proyecto y lo desplegará en tu cuenta de Cloudflare Workers.

## 📁 Estructura del Proyecto

El proyecto está organizado siguiendo una arquitectura modular por capas:

```
.
├── src/
│   ├── api/                # Módulo principal de la API
│   │   ├── routes/         # Definiciones de rutas y endpoints
│   │   ├── handlers/       # Manejadores de solicitudes HTTP
│   │   ├── services/       # Lógica de negocio y comunicación con APIs externas
│   │   └── middlewares/    # Middlewares de la aplicación (CORS, etc.)
│   │
│   ├── core/               # Funcionalidades centrales
│   │   ├── config/         # Configuración centralizada de la aplicación
│   │   └── utils/          # Utilidades comunes (logging, etc.)
│   │
│   ├── types/              # Definiciones de tipos de TypeScript
│   │
│   ├── renderer.tsx        # Renderizador JSX para Hono
│   └── index.tsx           # Punto de entrada principal de la aplicación
│
└── ... (archivos de configuración)
```

## 📝 Endpoints API

### GitHub Data

* `GET /api/github/overlays` - Obtener información de overlays
* `GET /api/github/socials` - Obtener información de redes sociales
* `GET /api/github/tecnologies` - Obtener información de tecnologías
* `GET /api/github/layouts` - Obtener información de layouts
* `GET /api/github/creators` - Obtener información de creadores

### Twitch

* `GET /api/twitch/stream/:username` - Verificar si un usuario de Twitch está transmitiendo en vivo

### Rutas Legacy (Mantenidas para compatibilidad)

* `GET /overlays` - Redirige a `/api/github/overlays`
* `GET /socials` - Redirige a `/api/github/socials`
* `GET /tecnologies` - Redirige a `/api/github/tecnologies`
* `GET /layouts` - Redirige a `/api/github/layouts`
* `GET /creators` - Redirige a `/api/github/creators`

## 🧩 Extensión y Mantenimiento

Para agregar nuevos endpoints o funcionalidades:

1. Define nuevas rutas en el directorio `src/api/routes/`
2. Crea los manejadores correspondientes en `src/api/handlers/`
3. Si es necesario, implementa la lógica de negocio en `src/api/services/`
4. Actualiza los tipos en `src/types/` si corresponde

La arquitectura modular facilita la adición de nuevas características sin afectar el código existente.
