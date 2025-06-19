import { Context } from 'hono';
import { type HelixStream, type HelixUser } from '@twurple/api';
import { getTwitchClient } from '../../core/config/twitch.client';

export const twitchService = {
  async getStreamStatus(c: Context, username: string) {
    // 1. Primero obtenemos el objeto de usuario de Twitch
    const user = await this.getUser(c, username);
    if (!user) {
      return { error: 'User not found', isLive: false, streamData: null };
    }

    // 2. Luego verificamos si el usuario está transmitiendo en vivo
    const streamData = await this.getStream(c, user.id);

    return {
      username: user.name,
      userId: user.id,
      isLive: streamData !== null,
      streamData: {
        title: streamData?.title,
        type: streamData?.type,
        game_name: streamData?.gameName,
        thumbnail_url: streamData?.thumbnailUrl,
      }
    };
  },

  async getUser(c: Context, username: string): Promise<HelixUser | null> {
    try {
      const api = getTwitchClient(c);
      return await api.users.getUserByName(username);
    } catch (e) {
      console.error('Error fetching Twitch user:', e);
      return null;
    }
  },

  async getStream(c: Context, userId: string): Promise<HelixStream | null> {
    try {
      const api = getTwitchClient(c);
      return await api.streams.getStreamByUserId(userId);
    } catch (e) {
      console.error('Error fetching Twitch stream:', e);
      return null;
    }
  }
};
