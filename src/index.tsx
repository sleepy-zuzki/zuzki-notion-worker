import { Hono } from 'hono'
import { renderer } from './renderer'
import { fetchOverlays } from './api/notion';
const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

app.get('/overlays', async (c) => {
  return c.json(await fetchOverlays(c.env?.NOTION_SECRET))
})

export default app
