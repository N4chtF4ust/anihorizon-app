export interface Root {
  status: number
  data: Data
}

export interface Data {
  scheduledAnimes: ScheduledAnime[]
}

export interface ScheduledAnime {
  id: string
  time: string
  name: string
  jname: string
  airingTimestamp: number
  secondsUntilAiring: number
  episode: number
}

