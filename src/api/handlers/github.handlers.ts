import { Context } from 'hono';
import { githubService } from '../services/github.service';

// Manejador para obtener overlays
export const getOverlaysHandler = async (c: Context) => {
  try {
    const data = await githubService.fetchEntity(c, 'overlays');
    return c.json(data);
  } catch (error) {
    console.error('Error fetching overlays:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Manejador para obtener redes sociales
export const getSocialsHandler = async (c: Context) => {
  try {
    const data = await githubService.fetchEntity(c, 'socials');
    return c.json(data);
  } catch (error) {
    console.error('Error fetching socials:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Manejador para obtener tecnologías
export const getTechnologiesHandler = async (c: Context) => {
  try {
    const data = await githubService.fetchEntity(c, 'technologies');
    return c.json(data);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Manejador para obtener layouts
export const getLayoutsHandler = async (c: Context) => {
  try {
    const data = await githubService.fetchEntity(c, 'layouts');
    return c.json(data);
  } catch (error) {
    console.error('Error fetching layouts:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Manejador para obtener creadores
export const getCreatorsHandler = async (c: Context) => {
  try {
    const data = await githubService.fetchEntity(c, 'creators');
    return c.json(data);
  } catch (error) {
    console.error('Error fetching creators:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};
