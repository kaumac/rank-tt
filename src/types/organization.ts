export interface OrganizationProfile {
  id?: string
  name?: string
  photo_url?: string
  created_at?: string
  updated_at?: string
}

export interface Organization extends OrganizationProfile {}
