// Definiciones de tipos globales

// Extender las bindings de Cloudflare
interface CloudflareBindings {
  GITHUB_TOKEN: string;
  TWITCH_CLIENT_ID: string;
  TWITCH_ACCESS_TOKEN: string;
  YOUTUBE_API_KEY: string;
}

// Tipos para los datos de GitHub
interface Entity {
  [key: string]: any;
}

// Tipos para usuarios de Twitch
interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
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

// Tipos para los datos de YouTube
interface YouTubeChannel {
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
}

interface YouTubeVideo {
  id: string | { videoId: string };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string, width: number, height: number };
      medium: { url: string, width: number, height: number };
      high: { url: string, width: number, height: number };
    };
    channelTitle: string;
    liveBroadcastContent: 'live' | 'upcoming' | 'none';
  };
  liveStreamingDetails?: {
    actualStartTime?: string;
    scheduledStartTime?: string;
    concurrentViewers?: string;
    activeLiveChatId?: string;
  };
}

interface YouTubeApiResponse<T> {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: T[];
  nextPageToken?: string;
}
