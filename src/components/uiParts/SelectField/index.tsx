import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

import { SelectField, SelectFieldProps } from '@/components/uiParts/SelectField/presenter'

export type RhfSelectFieldProps<T extends FieldValues> = Omit<SelectFieldProps, 'selectedValue'> &
  UseControllerProps<T>

/**
 * react-hook-formラッパー
 */
export const RhfSelectField = <T extends FieldValues>(props: RhfSelectFieldProps<T>) => {
  const { name, control } = props
  const {
    field: { ref, value: selectedValue, ...rest },
    formState: { errors },
  } = useController<T>({ name, control })

  return (
    <SelectField
      inputRef={ref}
      {...props}
      {...rest}
      selectedValue={selectedValue}
      errorMessage={errors[name] && `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`}
    ></SelectField>
  )
}
