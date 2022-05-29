import { ReactNode } from 'react'
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'

import Navigation from '@/layouts/Navigation'
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg={useColorModeValue('gray.100', 'gray.700')}
    >
      <Navigation
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Navigation onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Header */}
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
