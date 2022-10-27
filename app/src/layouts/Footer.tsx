import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import envData from '@/core/Config'

export default function SmallWithSocial() {
  return (
    <Box
      color={useColorModeValue('gray.700', 'gray.200')}
      ml={{ base: 0, md: 60 }}
      mt={{ base: 10, md: 200 }}
      p="6"
    >
      <Text fontSize="xs" color="gray.500" textAlign="center">
        Company Panel v{envData.REACT_APP_VERSION}
      </Text>
    </Box>
  )
}
