import { Hono } from 'hono';
import { githubRoutes } from './routes/github.routes';
import { twitchRoutes } from './routes/twitch.routes';

const apiV1 = new Hono();

// Montar las rutas de cada módulo
apiV1.route('/github', githubRoutes);
apiV1.route('/twitch', twitchRoutes);

export { apiV1 };
