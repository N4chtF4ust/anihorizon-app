export interface Root {
  status: number
  data: Data
}

export interface Data {
  totalEpisodes: number
  episodes: Episode[]
}

export interface Episode {
  title: string
  episodeId: string
  number: number
  isFiller: boolean
}
