import { Context } from 'hono';
import { youtubeService } from '../services/youtube.service';

/**
 * Manejador para verificar si un canal de YouTube está transmitiendo en vivo
 */
export const getStreamStatusHandler = async (c: Context) => {
  try {
    const channelId = c.req.param('channelId');
    if (!channelId) {
      return c.json({ error: 'ID del canal es requerido' }, 400);
    }

    const streamData = await youtubeService.getStreamStatus(c, channelId);
    return c.json(streamData);
  } catch (error) {
    console.error(`Error al obtener estado de transmisión de YouTube:`, error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
};

/**
 * Manejador para verificar si múltiples canales de YouTube están transmitiendo en vivo
 */
export const getMultipleStreamStatusHandler = async (c: Context) => {
  try {
    const channelsParam = c.req.query('channels');
    if (!channelsParam) {
      return c.json({ error: 'El parámetro "channels" es requerido' }, 400);
    }

    // Separar los IDs de canales por comas y filtrar valores vacíos
    const channelIds = channelsParam.split(',').filter(id => id.trim() !== '');

    if (channelIds.length === 0) {
      return c.json({ error: 'Se requiere al menos un ID de canal válido' }, 400);
    }

    const streamData = await youtubeService.getMultipleStreamStatus(c, channelIds);
    return c.json(streamData);
  } catch (error) {
    console.error(`Error al obtener estado de múltiples transmisiones de YouTube:`, error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
};
