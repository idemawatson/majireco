import { FormControl, FormHelperText, InputLabel, MenuItem, Select, styled } from '@mui/material'
import type { SelectProps as MUISelectProps } from '@mui/material'

type SelectProps = {
  text: string
  value: string
}

export type SelectFieldProps = MUISelectProps & {
  inputRef?: MUISelectProps['ref']
  errorMessage?: string
  selectPropsList: SelectProps[]
  selectedValue: string
}

const StyledFormControl = styled(FormControl)({
  width: '100%',
})

export const SelectField: React.FC<SelectFieldProps> = ({
  inputRef,
  errorMessage,
  selectPropsList,
  selectedValue,
  label,
  ...rest
}) => {
  return (
    <div>
      <StyledFormControl>
        <InputLabel>{label}</InputLabel>
        <Select ref={inputRef} value={selectedValue} label={label} {...rest}>
          {selectPropsList.map((props) => (
            <MenuItem key={props.value} value={props.value}>
              {props.text}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </div>
  )
}
