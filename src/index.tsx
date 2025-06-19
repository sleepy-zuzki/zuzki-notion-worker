import { Hono } from 'hono';
import { renderer } from './renderer';
import { corsMiddleware } from './api/middlewares';
import { api } from './api/routes';

// Crear la aplicación principal
const app = new Hono<{ Bindings: CloudflareBindings }>();

// Aplicar middlewares globales
app.use(renderer, corsMiddleware);

// Ruta raíz para verificar que el servicio está funcionando
app.get('/', (c) => {
  return c.render(<h1>Zuzki API</h1>);
});

// Mantener la compatibilidad con rutas existentes para evitar romper los servicios actuales
app.get('/overlays', async (c) => {
  // Redirigir internamente a la nueva estructura
  return await api.fetch('/github/overlays', c.req.raw);
});

app.get('/socials', async (c) => {
  return await api.fetch('/github/socials', c.req.raw);
});

app.get('/tecnologies', async (c) => {
  return await api.fetch('/github/tecnologies', c.req.raw);
});

app.get('/layouts', async (c) => {
  return await api.fetch('/github/layouts', c.req.raw);
});

app.get('/creators', async (c) => {
  return await api.fetch('/github/creators', c.req.raw);
});

// Montar todas las rutas de la API bajo el prefijo /api
app.route('/api', api);

export default app;
