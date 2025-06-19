import { ApiClient } from '@twurple/api';
import { AppTokenAuthProvider } from '@twurple/auth';
import { Context } from 'hono';

// Variable para almacenar la instancia singleton del cliente
let apiClient: ApiClient | null = null;

/**
 * Obtiene una instancia singleton del ApiClient de Twurple.
 * La instancia se crea una sola vez y se reutiliza en las llamadas posteriores.
 * @param c El contexto de Hono que contiene las variables de entorno.
 * @returns Una instancia de ApiClient.
 */
export function getTwitchClient(c: Context): ApiClient {
  if (apiClient) {
    return apiClient;
  }

  const authProvider = new AppTokenAuthProvider(
    c.env.TWITCH_CLIENT_ID,
    c.env.TWITCH_CLIENT_SECRET
  );

  apiClient = new ApiClient({ authProvider });
  return apiClient;
}
