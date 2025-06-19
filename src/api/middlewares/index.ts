import { cors } from 'hono/cors';
import { config } from '../../core/config';

// Exportar todos los middlewares para facilitar su importación
export const corsMiddleware = cors(config.CORS_CONFIG);
