import { Hono } from 'hono';
import { getStreamStatusHandler, getMultipleStreamStatusHandler } from '../../handlers/youtube.handlers';

const youtubeRoutes = new Hono();

// Ruta para verificar si un canal está transmitiendo en vivo
youtubeRoutes.get('/stream/:channelId', getStreamStatusHandler);

// Ruta para verificar el estado de múltiples canales
youtubeRoutes.get('/streams', getMultipleStreamStatusHandler);

export { youtubeRoutes };
