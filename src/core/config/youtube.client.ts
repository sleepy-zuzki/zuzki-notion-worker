import { Context } from 'hono';

/**
 * Realiza una solicitud a la API de YouTube.
 * @param c El contexto de Hono que contiene las variables de entorno.
 * @param endpoint El endpoint de la API a llamar (ej. 'search', 'videos', 'channels').
 * @param params Los parámetros de la URL para la solicitud.
 * @returns Los datos de la respuesta de la API de YouTube.
 */
export async function youtubeApiFetch<T>(
  c: Context,
  endpoint: string,
  params: URLSearchParams
): Promise<YouTubeApiResponse<T> | null> {
  // Asegurarse de que el API key siempre está presente
  if (!params.has('key')) {
    params.append('key', c.env.YOUTUBE_API_KEY);
  }

  const url = `https://www.googleapis.com/youtube/v3/${endpoint}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`YouTube API request failed: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error en la solicitud a la API de YouTube:', error);
    return null;
  }
}

/**
 * Obtiene información sobre un canal de YouTube por su ID.
 * @param c El contexto de Hono.
 * @param channelId El ID del canal de YouTube.
 * @returns La información del canal, o null si no se encuentra.
 */
export async function getYouTubeChannel(
  c: Context,
  channelId: string
): Promise<YouTubeChannel | null> {
  const params = new URLSearchParams({
    part: 'snippet',
    id: channelId
  });

  const response = await youtubeApiFetch<YouTubeChannel>(c, 'channels', params);

  if (response && response.items && response.items.length > 0) {
    return response.items[0];
  }

  return null;
}

/**
 * Verifica si un canal de YouTube está transmitiendo en vivo.
 * @param c El contexto de Hono.
 * @param channelId El ID del canal de YouTube.
 * @returns Información sobre la transmisión en vivo, o null si no está transmitiendo.
 */
export async function getLiveStream(
  c: Context,
  channelId: string
): Promise<YouTubeVideo | null> {
  try {
    // Primero buscamos videos en vivo del canal
    const searchParams = new URLSearchParams({
      part: 'snippet',
      channelId: channelId,
      eventType: 'live',
      type: 'video',
      maxResults: '1'
    });

    const searchResponse = await youtubeApiFetch<YouTubeVideo>(c, 'search', searchParams);

    if (!searchResponse || !searchResponse.items || searchResponse.items.length === 0) {
      return null;
    }

    // Obtenemos más detalles del video en vivo
    const videoId = searchResponse.items[0].id;
    const videoParams = new URLSearchParams({
      part: 'snippet,liveStreamingDetails',
      id: typeof videoId === 'string' ? videoId : videoId.videoId
    });

    const videoResponse = await youtubeApiFetch<YouTubeVideo>(c, 'videos', videoParams);

    if (videoResponse && videoResponse.items && videoResponse.items.length > 0) {
      return videoResponse.items[0];
    }

    return null;
  } catch (error) {
    console.error(`Error al verificar transmisión en vivo para canal ${channelId}:`, error);
    return null;
  }
}
