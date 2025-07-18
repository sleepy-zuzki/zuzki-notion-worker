// Configuración centralizada de la aplicación
export const config = {
  API_URL: "https://github.zuzki.dev/data",
  CORS_CONFIG: {
    origin: [
      'https://zuzki.dev',
      'https://github.zuzki.dev',
      'http://localhost:4200',
      'http://localhost:8788',
      'http://localhost:5173'
    ],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  }
};
