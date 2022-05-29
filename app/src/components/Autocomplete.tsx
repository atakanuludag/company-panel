import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import {
  Select,
  InputActionMeta,
  SingleValue,
  ActionMeta,
} from 'chakra-react-select'
import AutocompleteItem from '@/models/AutocompleteItem'

interface IAutocomplete {
  loading?: boolean
  placeholder?: string
  id: string
  formLabel: string | null
  isInvalid: boolean
  errorMessage: string
  items: AutocompleteItem[]
  value?: AutocompleteItem | undefined
  onInputChange: (newValue: string, actionMeta: InputActionMeta) => void
  onChange: (
    newValue: SingleValue<AutocompleteItem | undefined>,
    actionMeta: ActionMeta<AutocompleteItem | undefined>,
  ) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void
}

const Autocomplete = ({
  loading = false,
  placeholder = '',
  id,
  formLabel = null,
  isInvalid = false,
  errorMessage = '',
  items,
  value = undefined,
  onInputChange,
  onChange,
  onBlur,
  ...other
}: IAutocomplete) => {
  return (
    <FormControl id={id} isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{formLabel}</FormLabel>
      <Select
        placeholder={placeholder}
        value={value}
        isLoading={loading}
        isClearable
        isSearchable
        options={items}
        noOptionsMessage={() => 'Veri bulunamadı.'}
        onInputChange={onInputChange}
        onChange={onChange}
        onBlur={onBlur}
        {...other}
      />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default Autocomplete
