import {
  FormControl,
  FormHelperText,
  styled,
  TextField as MUITextField,
  // eslint-disable-next-line
  TextFieldProps as MUITextFieldProps,
} from '@mui/material'
import type { ChangeEventHandler, FocusEventHandler } from 'react'

export type TextFieldProps = {
  error?: string
  className?: string
  placeholder?: string
  label?: string
  type: string
}

const StyledFormControl = styled(FormControl)({
  width: '100%',
})

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
      <StyledFormControl>
        <MUITextField
          placeholder={props.placeholder}
          label={props.label}
          className={props.className}
          inputRef={props.inputRef}
          value={props.value}
          type={props.type}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </StyledFormControl>
      {!!props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </>
  )
}
