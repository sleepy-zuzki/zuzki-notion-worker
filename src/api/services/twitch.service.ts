import { Context } from 'hono';
import { twitchApiFetch } from '../../core/config/twitch.client';

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
      username: user.display_name,
      userId: user.id,
      isLive: streamData !== null,
      streamData: streamData
        ? {
            title: streamData.title,
            type: streamData.type,
            game_name: streamData.game_name,
            thumbnail_url: streamData.thumbnail_url,
          }
        : null,
    };
  },

  async getUser(c: Context, username: string): Promise<TwitchUser | null> {
    try {
      const params = new URLSearchParams({ login: username });
      const users: TwitchUser[] = await twitchApiFetch(c, 'users', params);
      return users && users.length > 0 ? users[0] : null;
    } catch (e) {
      console.error('Error fetching Twitch user:', e);
      return null;
    }
  },

  async getStream(c: Context, userId: string): Promise<TwitchStream | null> {
    try {
      const params = new URLSearchParams({ user_id: userId });
      const streams: TwitchStream[] = await twitchApiFetch(c, 'streams', params);
      return streams && streams.length > 0 ? streams[0] : null;
    } catch (e) {
      console.error('Error fetching Twitch stream:', e);
      return null;
    }
  },
};
