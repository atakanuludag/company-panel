import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  let navigate = useNavigate()

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Sayfa Bulunamadı
      </Text>
      <Text color={'gray.500'} mb={6}>
        Sayfa silinmiş veya değiştirilmiş olabilir.
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={() => navigate('/')}
      >
        Ana sayfaya git
      </Button>
    </Box>
  )
}
