import {
  FormControl,
  FormHelperText,
  styled,
  TextareaAutosize as MUITextArea,
  // eslint-disable-next-line
  TextareaAutosizeProps as MUITextAreaProps,
} from '@mui/material'
import type { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'

export type TextAreaProps = {
  error?: string
  className?: string
  placeholder?: string
  label?: string
  type?: string
  minRows: number
}

const StyledFormControl = styled(FormControl)({
  width: '100%',
  fontSize: '20px',
})

export const TextArea = (
  props: TextAreaProps & {
    inputRef: MUITextAreaProps['ref']
    value: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur: FocusEventHandler<HTMLTextAreaElement>
  },
) => {
  return (
    <>
      <StyledFormControl>
        <MUITextArea
          placeholder={props.placeholder}
          className={props.className}
          ref={props.inputRef}
          value={props.value}
          minRows={props.minRows}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </StyledFormControl>
      {!!props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </>
  )
}
