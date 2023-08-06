export interface TournamentProfile {
  id?: string
  name?: string
  photo_url?: string
  created_at?: string
  updated_at?: string
  created_by?: string
}

export interface Tournament extends TournamentProfile {}
