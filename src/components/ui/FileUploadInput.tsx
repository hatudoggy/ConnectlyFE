import { FileUploadInputProps } from '@/interfaces/ComponentProps'
import { ChangeEvent, forwardRef, InputHTMLAttributes, useRef } from 'react'

type Props = FileUploadInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const FileUploadInput = forwardRef<HTMLInputElement, Props>(
  ({ accept, onFileSelect, children, ...inputProps }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && onFileSelect) {
        onFileSelect(file)
      }

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    return (
      <>
        <input
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          id="upload-image"
          onChange={handleFileChange}
          ref={ref}
          {...inputProps} // Forward all other props
        />
        <label htmlFor="upload-image">{children}</label>
      </>
    )
  },
)

export default FileUploadInput
