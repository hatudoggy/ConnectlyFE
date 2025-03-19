import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { Comment, CommentContentType, CreateCommentFormData } from './Comment'
import { Media, MediaThumbnail, MediaType } from './Media'
import { CreatePostFormData, PostContentType } from './Post'
import { UserBasicDetails } from './User'
import { LinkProps } from '@tanstack/react-router'
import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { VirtualItem } from '@tanstack/react-virtual'

export type PostItemVariant = 'preview' | 'full'

export interface PostItemProps {
  /** For storybook only. Changes the components to links if true. */
  linkOn?: boolean

  /** The variant of the post that is displayed.
   *  It's values can either be preview, which shows only a set amount of comments
   *  or full which will preview all of the comments.
   *
   *  @default 'preview'
   */
  variant?: PostItemVariant

  /** The author's details */
  author: UserBasicDetails

  /** The user's basic details */
  user: UserBasicDetails

  /** The main body of the post. Can either be a text or a media url */
  content: string

  /** The type of the content which can either be a text, image, or video */
  contentType: PostContentType

  /** List of images or video of the post */
  media?: Media[]

  /** Numeric value of the total likes in a post */
  likeCount: number

  /** Boolean to check if the user liked the post */
  liked?: boolean

  /** Numeric value of the total comments in a post */
  commentCount: number

  /** A list of comments that will be rendered at the bottom of the post.
   *  Will only render a set amount of comments if the variant is 'preview'
   */
  comments?: Comment[]

  /** The date in which the post was created */
  postDate: Date

  /** Navigation details when clicking the post. Only works in preview variant */
  postLink?: LinkProps

  /** Navigation details when clicking the comment button and 'View more comments' link */
  commentLink?: LinkProps

  /** Event for clicking the like button */
  onLikeClick?: () => void
}

export interface PostTextAreaProps {
  /** React Hook Form's control property */
  control: Control<CreatePostFormData, any>

  /** React Hook Form's watch property */
  watch: UseFormWatch<CreatePostFormData>

  /** React Hook Form's setValue property */
  setValue: UseFormSetValue<CreatePostFormData>

  /** Boolean that sets the post button to a loading state */
  onPosting?: boolean
}

export interface CommentItemProps {
  /** The author's details */
  author: UserBasicDetails

  /** The main body of the comment. Can either be a text or a image url */
  content: string

  /** The type of the content which can either be a text or image */
  contentType: CommentContentType

  /** Numeric value of the total likes in a post */
  likeCount: number

  /** Boolean to check if the user liked the post */
  liked?: boolean

  /** The date in which the comment was created */
  commentDate: Date

  /** Event for clicking the like button */
  onLikeClick?: () => void

  /** Event for clicking the reply button */
  onReplyClick?: () => void
}

export interface CommentTextAreaProps {
  /** React Hook Form's control property */
  control: Control<CreateCommentFormData, any>

  /** React Hook Form's watch property */
  watch: UseFormWatch<CreateCommentFormData>

  /** React Hook Form's setValue property */
  setValue: UseFormSetValue<CreateCommentFormData>

  /** Boolean that sets the comment button to a loading state */
  onCommenting?: boolean
}

export interface MediaThumbnailProps {
  /** Uploaded file instance */
  fileRef: MediaThumbnail['fileRef']

  /** Event handler when clicking the remove button */
  onRemoveClick: () => void
}

interface LoginFields {
  username: string
  password: string
}

export interface LoginFormProps {
  /** React Hook Form's control property */
  control: Control<LoginFields, any>

  /** Boolean that sets the login button to a loading state */
  onLoggingIn?: boolean
}

export interface FileUploadInputProps {
  /** The file type that the upload input will accept */
  accept: string

  /** Event handler when selecting a file */
  onFileSelect: (file: File) => void

  children: ReactNode
}

export interface ImageProps {
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  sx?: SxProps<Theme>
}

export interface PostMediaProps {
  mediaType: MediaType
  media: Media[]
}

export interface ListVirtualizerProps {
  hasNextPage: boolean
  listLength: number
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  fallback?: ReactNode
  scrollRestore?: boolean
  children: (virtualItem: VirtualItem) => ReactNode
}
