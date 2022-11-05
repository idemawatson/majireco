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
  defaultValue?: string
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
        defaultValue={props.defaultValue}
        label={props.label}
        className={props.className}
        fullWidth={true}
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
