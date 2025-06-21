import { Hono } from 'hono';
import { githubRoutes } from './routes/github.routes';
import { twitchRoutes } from './routes/twitch.routes';
import { youtubeRoutes } from './routes/youtube.routes';

const apiV1 = new Hono();

// Montar las rutas de cada módulo
apiV1.route('/github', githubRoutes);
apiV1.route('/twitch', twitchRoutes);
apiV1.route('/youtube', youtubeRoutes);

export { apiV1 };
