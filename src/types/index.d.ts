// Definiciones de tipos globales

// Extender las bindings de Cloudflare
interface CloudflareBindings {
  GITHUB_TOKEN: string;
  TWITCH_CLIENT_ID: string;
  TWITCH_ACCESS_TOKEN: string;
}

// Tipos para los datos de GitHub
interface Entity {
  [key: string]: any;
}

// Tipos para los datos de Twitch
interface TwitchStream {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  is_mature: boolean;
}
