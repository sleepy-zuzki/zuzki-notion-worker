import { Context } from 'hono';

export const twitchService = {
  async getStreamStatus(c: Context, username: string) {
    // 1. Primero obtenemos el ID del usuario de Twitch usando el nombre de usuario
    const userId = await this.getUserId(c, username);
    if (!userId) {
      return { error: 'User not found', isLive: false };
    }

    // 2. Luego verificamos si el usuario está transmitiendo en vivo
    const streamData = await this.getStream(c, userId);

    return {
      username,
      userId,
      isLive: streamData !== null,
      streamData: streamData || null
    };
  },

  async getUserId(c: Context, username: string) {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Client-ID': c.env?.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${c.env?.TWITCH_ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      console.error('Error fetching Twitch user:', {
        status: response.status,
        statusText: response.statusText
      });
      return null;
    }

    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].id;
    }

    return null;
  },

  async getStream(c: Context, userId: string) {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        'Client-ID': c.env?.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${c.env?.TWITCH_ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      console.error('Error fetching Twitch stream:', {
        status: response.status,
        statusText: response.statusText
      });
      return null;
    }

    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0];
    }

    return null;
  }
};
