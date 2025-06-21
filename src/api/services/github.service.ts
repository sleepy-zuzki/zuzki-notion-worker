import { Context } from 'hono';
import { config } from '../../core/config';

export const githubService = {
  async fetchEntity(c: Context, entity: string) {
    const response = await fetch(`${config.API_URL}/${entity}.json`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `Bearer ${c.env?.GITHUB_TOKEN}`,
        "User-Agent": "Zuzki-API-Worker"
      }
    });

    if (!response.ok) {
      console.error(`Error fetching ${entity}:`, {
        status: response.status,
        statusText: response.statusText,
        url: config.API_URL
      });
      throw new Error(`Failed to fetch ${entity}: ${response.statusText}`);
    }

    return response.json();
  }
};
