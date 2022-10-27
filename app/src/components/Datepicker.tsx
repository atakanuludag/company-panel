import { forwardRef, LegacyRef } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

interface IDatepickerComponent extends ReactDatePickerProps {
  id: string
  formLabel: string | null
  isInvalid: boolean
  errorMessage: string
}

const DatepickerComponent = ({
  id,
  formLabel = null,
  isInvalid = false,
  errorMessage = '',
  ...other
}: IDatepickerComponent) => {
  const DatePickerCustomInput = forwardRef(
    (
      { value, onClick, onChange, disabled }: any,
      ref: LegacyRef<HTMLInputElement>,
    ) => (
      <Input
        placeholder=""
        value={value}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
      />
    ),
  )
  return (
    <FormControl id={id} isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{formLabel}</FormLabel>
      <DatePicker
        {...other}
        locale="tr"
        customInput={<DatePickerCustomInput />}
      />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default DatepickerComponent
