import {
  FormHelperText,
  TextField as MUISelectField,
  TextFieldProps as MUISelectFieldProps,
} from '@mui/material'
import type { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'

export type SelectFieldProps = {
  error?: string
  className?: string
  placeholder?: string
  label?: string
  children: ReactNode
}

export const SelectField = (
  props: SelectFieldProps & {
    inputRef: MUISelectFieldProps['inputRef']
    value: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur: FocusEventHandler<HTMLTextAreaElement>
  },
) => {
  return (
    <>
      <MUISelectField
        select
        placeholder={props.placeholder}
        label={props.label}
        className={props.className}
        inputRef={props.inputRef}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        {props.children}
      </MUISelectField>
      {!!props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </>
  )
}
