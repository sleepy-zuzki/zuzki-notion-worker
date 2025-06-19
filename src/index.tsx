import { Hono } from 'hono';
import { renderer } from './renderer';
import { corsMiddleware } from './api/middlewares';
import { apiV1 } from './api/v1';

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
  return await apiV1.fetch('/github/overlays', c.req.raw);
});

app.get('/socials', async (c) => {
  return await apiV1.fetch('/github/socials', c.req.raw);
});

app.get('/technologies', async (c) => {
  return await apiV1.fetch('/github/technologies', c.req.raw);
});

app.get('/layouts', async (c) => {
  return await apiV1.fetch('/github/layouts', c.req.raw);
});

app.get('/creators', async (c) => {
  return await apiV1.fetch('/github/creators', c.req.raw);
});

// Montar todas las rutas de la API bajo el prefijo versionado /api/v1
app.route('/api/v1', apiV1);

export default app;
