// src/types/search.ts

export interface Root {
  status: number;
  data: Data;
}

export interface Data {
  animes: Anime[];
  mostPopularAnimes: MostPopularAnime[];
  searchQuery: string;
  searchFilters: SearchFilters;
  totalPages: number;
  hasNextPage: boolean;
  currentPage: number;
}

export interface Anime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating?: string;
  episodes: Episodes;
}

export interface Episodes {
  sub?: number;
  dub?: number;
}

export interface MostPopularAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: Episodes2;
  type: string;
}

export interface Episodes2 {
  sub: number;
  dub: number;
}

export interface SearchFilters {}
