import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
} from '@chakra-ui/react'
import { MdDashboard, MdSupervisedUserCircle, MdToday } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { UserRole } from '@/models/enums'
import NavigationItem from '@/layouts/NavigationItem'
import Logo from '@/components/Logo'
import useStoreUser from '@/hooks/useStoreUser'

interface LinkItemProps {
  name: string
  icon: IconType
  url: string
  roles: UserRole[]
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Dashboard',
    icon: MdDashboard,
    url: '/',
    roles: [],
  },
  {
    name: 'Kullanıcılar',
    icon: FaUsers,
    url: '/users',
    roles: [UserRole.ADMIN],
  },
  {
    name: 'Personeller',
    icon: MdSupervisedUserCircle,
    url: '/employee',
    roles: [UserRole.ADMIN],
  },
  { name: 'İzinler', icon: MdToday, url: '/permit', roles: [UserRole.ADMIN] },
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const Navigation = ({ onClose, ...rest }: SidebarProps) => {
  const { userStore } = useStoreUser()
  const { roles } = userStore

  const items = !roles
    ? []
    : LinkItems.filter(
        (l) =>
          roles.some((r: UserRole) => l.roles.includes(r)) ||
          l.roles.length <= 0 ||
          typeof l.roles === 'undefined',
      )

  //Todo: burayada loading ekleyebiliriz. roles daha boşken menüler gözükmüyor çünkü.
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {items.map((link) => (
        <NavigationItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavigationItem>
      ))}
    </Box>
  )
}

export default Navigation
