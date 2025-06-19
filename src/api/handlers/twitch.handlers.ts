import { Context } from 'hono';
import { twitchService } from '../services/twitch.service';

// Manejador para verificar si un streamer está en vivo
export const getStreamStatusHandler = async (c: Context) => {
  try {
    const username = c.req.param('username');
    if (!username) {
      return c.json({ error: 'Username is required' }, 400);
    }

    const streamData = await twitchService.getStreamStatus(c, username);
    return c.json(streamData);
  } catch (error) {
    console.error(`Error fetching Twitch stream status:`, error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};
