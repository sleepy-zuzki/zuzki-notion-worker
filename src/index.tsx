import { Hono } from 'hono';
import { renderer } from './renderer';
import { cors } from 'hono/cors';

// Types
interface Overlay {
  // Define your overlay properties here
  [key: string]: any;
}

// Constants
const API_URL = "https://github.zuzki.dev/data/";
const CORS_CONFIG = {
  origin: ['https://github.zuzki.dev', 'http://localhost:4200'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
};

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.use(renderer, cors(CORS_CONFIG));

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
});

async function fetchEntity(c, entity) {
  const response = await fetch(`${API_URL}/${entity}.json`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      "Accept": "application/vnd.github.v3+json",
      "Authorization": `Bearer ${c.env?.GITHUB_TOKEN}`
    }
  });
  
  if (!response.ok) {
    console.error('Error fetching overlays:', {
      status: response.status,
      statusText: response.statusText,
      url: API_URL
    });
    return c.json({
      error: 'Failed to fetch overlays',
      status: response.status,
      statusText: response.statusText
    }, 400);
  }
  
  return response;
}

app.get('/overlays', async (c) => {
  try {
    const response = await fetchEntity(c, 'overlays');
    
    if (!response.ok) {
      return response;
    }
    
    const data: Overlay[] = await response.json();
    return c.json(data);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/socials', async (c) => {
  try {
    const response = await fetchEntity(c, 'socials');
    
    if (!response.ok) {
      return response;
    }
    
    const data: Overlay[] = await response.json();
    return c.json(data);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/tecnologies', async (c) => {
  try {
    const response = await fetchEntity(c, 'tecnologies');
    
    if (!response.ok) {
      return response;
    }
    
    const data: Overlay[] = await response.json();
    return c.json(data);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/layouts', async (c) => {
  try {
    const response = await fetchEntity(c, 'layouts');
    
    if (!response.ok) {
      return response;
    }
    
    const data: Overlay[] = await response.json();
    return c.json(data);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/creators', async (c) => {
  try {
    const response = await fetchEntity(c, 'creators');
    
    if (!response.ok) {
      return response;
    }
    
    const data: Overlay[] = await response.json();
    return c.json(data);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app
