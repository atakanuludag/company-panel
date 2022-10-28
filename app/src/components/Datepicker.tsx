import { forwardRef, LegacyRef, useEffect, useState } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { eachDayOfInterval, subDays } from 'date-fns'
import useHolidaysCalendarQuery from '@/hooks/queries/useHolidaysCalendarQuery'

interface IDatepickerComponent extends ReactDatePickerProps {
  id: string
  formLabel: string | null
  isInvalid: boolean
  errorMessage: string
  applyHolidays?: boolean
}

const DatepickerComponent = ({
  id,
  formLabel = null,
  isInvalid = false,
  errorMessage = '',
  applyHolidays = false,
  ...other
}: IDatepickerComponent) => {
  const [excludeDates, setExcludeDates] = useState(
    !other.excludeDates ? [] : other.excludeDates,
  )

  const { data, isSuccess } = useHolidaysCalendarQuery(applyHolidays)

  useEffect(() => {
    if (applyHolidays && isSuccess) {
      const dates = data
        .map((r) => {
          return eachDayOfInterval({
            start: r.startDate,
            end: subDays(r.endDate, 1),
          })
        })
        .flat()
      setExcludeDates([...excludeDates, ...dates])
    }
  }, [applyHolidays, isSuccess])

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
        excludeDates={excludeDates}
      />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default DatepickerComponent
