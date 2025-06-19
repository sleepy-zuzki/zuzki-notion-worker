/**
 * Utilidad simple para registro de logs
 * Puede ser expandida para enviar logs a servicios externos
 */
export const logger = {
  info(message: string, data?: any) {
    console.log(`[INFO] ${message}`, data || '');
  },

  error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error || '');
  },

  warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data || '');
  },

  debug(message: string, data?: any) {
    console.debug(`[DEBUG] ${message}`, data || '');
  }
};
