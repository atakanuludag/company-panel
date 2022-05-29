import { Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface ILogo {
  isHeader?: boolean
}

const Logo = ({ isHeader = false }: ILogo) => {
  return (
    <Text
      display={isHeader ? { base: 'flex', md: 'none' } : {}}
      fontSize="medium"
      bgGradient="linear(to-l, #e02f2f, #DB2C2C)"
      bgClip="text"
      fontWeight="extrabold"
      textAlign="center"
    >
      <Link as={RouterLink} to="/">
        COMPANY PANEL
      </Link>
    </Text>
  )
}

export default Logo
