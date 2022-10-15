import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

import { SelectField, SelectFieldProps } from '@/components/uiParts/SelectField/presenter'

export type RhfSelectFieldProps<T extends FieldValues> = SelectFieldProps & UseControllerProps<T>

/**
 * react-hook-formラッパー
 */
export const RhfSelectField = <T extends FieldValues>(props: RhfSelectFieldProps<T>) => {
  const { name, control, placeholder, label, defaultValue, className, children } = props
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController<T>({ name, control })

  return (
    <SelectField
      inputRef={ref}
      className={className}
      placeholder={placeholder}
      label={label}
      defaultValue={defaultValue}
      {...rest}
      error={errors[name] && `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`}
    >
      {children}
    </SelectField>
  )
}
