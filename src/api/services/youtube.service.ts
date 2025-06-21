import { Context } from 'hono';
import { getYouTubeChannel, getLiveStream } from '../../core/config/youtube.client';

export const youtubeService = {
  /**
   * Obtiene el estado de transmisión en vivo de un canal de YouTube.
   * @param c El contexto de Hono.
   * @param channelId El ID del canal de YouTube.
   * @returns Objeto con información del estado de transmisión.
   */
  async getStreamStatus(c: Context, channelId: string) {
    try {
      // Obtenemos información del canal
      const channelInfo = await getYouTubeChannel(c, channelId);
      if (!channelInfo) {
        return { error: 'Canal no encontrado', isLive: false, streamData: null };
      }

      // Verificamos si el canal está transmitiendo en vivo
      const liveStreamData = await getLiveStream(c, channelId);

      return {
        channelId: channelInfo.id,
        channelTitle: channelInfo.snippet.title,
        channelThumbnail: channelInfo.snippet.thumbnails.default.url,
        isLive: liveStreamData !== null,
        streamData: liveStreamData
          ? {
              videoId: typeof liveStreamData.id === 'string' 
                      ? liveStreamData.id 
                      : liveStreamData.id.videoId,
              title: liveStreamData.snippet.title,
              description: liveStreamData.snippet.description,
              thumbnailUrl: liveStreamData.snippet.thumbnails.high.url,
              concurrentViewers: liveStreamData.liveStreamingDetails?.concurrentViewers || '0',
              startTime: liveStreamData.liveStreamingDetails?.actualStartTime || null,
            }
          : null,
      };
    } catch (error) {
      console.error(`Error al obtener estado de transmisión para canal ${channelId}:`, error);
      return { error: 'Error al procesar la solicitud', isLive: false, streamData: null };
    }
  },

  /**
   * Obtiene el estado de transmisión en vivo de múltiples canales de YouTube.
   * @param c El contexto de Hono.
   * @param channelIds Array con los IDs de los canales de YouTube.
   * @returns Array con la información del estado de transmisión de cada canal.
   */
  async getMultipleStreamStatus(c: Context, channelIds: string[]) {
    const promises = channelIds.map(channelId => this.getStreamStatus(c, channelId));
    return Promise.all(promises);
  }
};
