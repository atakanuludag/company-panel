import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react'
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/header/ThemeToggle'
import ExchangeRate from '@/components/header/ExchangeRate'
import Weather from '@/components/header/Weather'
import LanguageSelect from '@/components/header/LanguageSelect'
import useLocales from '@/hooks/useLocale'
import useStoreUser from '@/hooks/useStoreUser'
import useStoreRouterTitle from '@/hooks/useStoreRouterTitle'

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const Header = ({ onOpen, ...rest }: MobileProps) => {
  const { translate } = useLocales()

  const navigate = useNavigate()
  const { logoutUserStore, userStore } = useStoreUser()
  const { routerTitleStore } = useStoreRouterTitle()
  // const profile = useProfileQuery()

  const handleLogoutButton = () => {
    logoutUserStore()
    navigate('/login')
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Logo isHeader />

      <Text
        color={useColorModeValue('gray.900', 'gray.300')}
        fontSize="xl"
        fontWeight="bold"
        display={{ base: 'none', md: 'flex' }}
        letterSpacing="0px"
      >
        {routerTitleStore}
      </Text>

      <HStack spacing={{ base: '0', md: '3' }}>
        <ThemeToggle />
        <ExchangeRate />
        <Weather />
        <LanguageSelect />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  name={
                    userStore.displayName ? userStore.displayName : undefined
                  }
                  size={'sm'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {userStore.loading ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <Text fontSize="sm">{userStore.displayName}</Text>
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
                    </>
                  )}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem as={RouterLink} to="/my-profile">
                {translate('my_profile')}
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogoutButton}>
                {' '}
                {translate('logout')}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default Header
