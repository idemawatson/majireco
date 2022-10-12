import {
  FormHelperText,
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from '@mui/material'
import type { ChangeEventHandler, FocusEventHandler } from 'react'

export type TextFieldProps = {
  error?: string
  className?: string
  placeholder?: string
  label?: string
}

export const TextField = (
  props: TextFieldProps & {
    inputRef: MUITextFieldProps['inputRef']
    value: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur: FocusEventHandler<HTMLTextAreaElement>
  },
) => {
  return (
    <>
      <MUITextField
        placeholder={props.placeholder}
        label={props.label}
        className={props.className}
        inputRef={props.inputRef}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {!!props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </>
  )
}
