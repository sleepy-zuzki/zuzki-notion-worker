import { Context } from 'hono';

// Variable para almacenar el token de acceso y su expiración
let accessToken: string | null = null;
let tokenExpiry: number | null = null;

// Interfaz para la respuesta del token de Twitch
interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

/**
 * Obtiene un token de acceso de aplicación de Twitch.
 * El token se solicita una vez y se reutiliza hasta que expire.
 * @param c El contexto de Hono que contiene las variables de entorno.
 * @returns El token de acceso.
 */
async function getAppAccessToken(c: Context): Promise<string> {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const url = `https://id.twitch.tv/oauth2/token`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `client_id=${c.env.TWITCH_CLIENT_ID}&client_secret=${c.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Twitch app access token');
  }

  const data: TwitchTokenResponse = await response.json();
  accessToken = data.access_token;
  // Guardamos la fecha de expiración en milisegundos con un margen de seguridad (60 segundos)
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

  return accessToken;
}

/**
 * Realiza una solicitud a la API de Twitch Helix.
 * @param c El contexto de Hono.
 * @param endpoint El endpoint de la API a llamar (ej. 'users', 'streams').
 * @param params Los parámetros de la URL para la solicitud.
 * @returns Los datos de la respuesta de la API de Twitch.
 */
export async function twitchApiFetch(
  c: Context,
  endpoint: string,
  params: URLSearchParams = new URLSearchParams()
): Promise<any> {
  const token = await getAppAccessToken(c);
  const url = `https://api.twitch.tv/helix/${endpoint}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      'Client-ID': c.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(`Twitch API request failed: ${response.status} ${response.statusText}`);
    return null;
  }

  const jsonResponse = await response.json();
  return jsonResponse.data;
}
