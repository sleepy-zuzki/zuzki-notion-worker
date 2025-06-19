import { Hono } from 'hono';
import { getOverlaysHandler, getSocialsHandler, getTechnologiesHandler, getLayoutsHandler, getCreatorsHandler } from '../../handlers/github.handlers';

const githubRoutes = new Hono();

// Rutas para los recursos de GitHub
githubRoutes.get('/overlays', getOverlaysHandler);
githubRoutes.get('/socials', getSocialsHandler);
githubRoutes.get('/technologies', getTechnologiesHandler);
githubRoutes.get('/layouts', getLayoutsHandler);
githubRoutes.get('/creators', getCreatorsHandler);

export { githubRoutes };
