import { Hono } from 'hono';
import { githubRoutes } from './github.routes';
import { twitchRoutes } from './twitch.routes';

const api = new Hono();

// Montar las rutas de cada módulo
api.route('/github', githubRoutes);
api.route('/twitch', twitchRoutes);

export { api };
