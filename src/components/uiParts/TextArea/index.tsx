import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

import { TextArea, TextAreaProps } from '@/components/uiParts/TextArea/presenter'

export type RhfTextAreaProps<T extends FieldValues> = TextAreaProps & UseControllerProps<T>

/**
 * react-hook-formラッパー
 */
export const RhfTextArea = <T extends FieldValues>(props: RhfTextAreaProps<T>) => {
  const { name, control, placeholder, className, minRows } = props
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController<T>({ name, control })

  return (
    <TextArea
      inputRef={ref}
      className={className}
      placeholder={placeholder}
      minRows={minRows}
      {...rest}
      error={errors[name] && `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`}
    />
  )
}
