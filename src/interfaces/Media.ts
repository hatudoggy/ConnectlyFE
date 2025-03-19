export interface MediaThumbnail {
  fileRef: File
}

export type MediaType = 'image' | 'video'

export interface Media {
  id: number
  url: string
  media_type: MediaType
  metadata: Metadata
  uploaded_at: string
}

export interface Metadata {
  width: number
  height: number
  file_size: number
  file_type: string
}
