import { Hono } from 'hono';
import { getStreamStatusHandler } from '../../handlers/twitch.handlers';

const twitchRoutes = new Hono();

// Ruta para verificar si un streamer está en vivo
twitchRoutes.get('/stream/:username', getStreamStatusHandler);

export { twitchRoutes };
