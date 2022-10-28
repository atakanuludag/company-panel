import { ChangeEvent, useState, MouseEvent } from 'react'
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react'

interface IPasswordInput {
  id: string
  isInvalid: boolean | undefined
  errorMessage: string | undefined
  label: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: (e: MouseEvent<HTMLInputElement>) => void
  value: string
}

const PasswordInput = ({
  id,
  isInvalid = false,
  errorMessage,
  label,
  onChange,
  onClick,
  value,
  ...other
}: IPasswordInput) => {
  const [passwordShow, setPasswordShow] = useState(false)

  return (
    <FormControl id={id} isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          id={id}
          pr="4.5rem"
          type={passwordShow ? 'text' : 'password'}
          onChange={onChange}
          onClick={onClick}
          value={value}
          {...other}
        />

        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            mr="0.40rem"
            size="sm"
            onClick={() => setPasswordShow(!passwordShow)}
          >
            {passwordShow ? 'Gizle' : 'Göster'}
          </Button>
        </InputRightElement>
      </InputGroup>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default PasswordInput
