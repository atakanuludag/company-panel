import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { AiOutlineClose } from 'react-icons/ai'

export default function ErrorPage() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      flexDir={'column'}
      justify={'center'}
      textAlign="center"
      py={10}
      px={6}
    >
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center"
        >
          <AiOutlineClose size="30px" />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Ağ Hatası
      </Heading>
      <Text color={'gray.500'}>
        Web servise erişilemiyor. Lütfen internet ayarlarınızı kontrol edin yada
        sistem yöneticisiyle iletişime geçiniz.
      </Text>
    </Flex>
  )
}
