import { ReactText } from 'react'
import {
  Flex,
  Icon,
  Link,
  FlexProps,
  useColorModeValue,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { Link as RouterLink, useMatch, useResolvedPath } from 'react-router-dom'

interface NavigationItemProps extends FlexProps {
  icon: IconType
  url: string
  children: ReactText
}
const NavigationItem = ({
  icon,
  url,
  children,
  ...rest
}: NavigationItemProps) => {
  const resolved = useResolvedPath(url)
  const match = useMatch({ path: resolved.pathname, end: true })

  const bg = useColorModeValue('gray.200', 'gray.700')
  const color = useColorModeValue('black', 'white')

  const bgStyle = match ? bg : 'transparent'

  return (
    <Link
      as={RouterLink}
      to={url}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        background={bgStyle}
        color={color}
        marginBottom={1.5}
        _hover={{
          bg,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default NavigationItem
