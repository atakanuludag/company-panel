import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdBackHand } from 'react-icons/md'

interface IPageMessage {
  type: 'permission' | 'error'
  title: string
  description: string
  buttonShow?: boolean
  buttonText?: string
}

export default function PageMessage({
  type,
  title,
  description,
  buttonShow = true,
  buttonText = '',
}: IPageMessage) {
  const getIcon = () => {
    switch (type) {
      case 'permission':
        return <MdBackHand size="25px" />
      case 'error':
        return <AiOutlineClose size="30px" />
      default:
        break
    }
  }

  const getIconBg = () => {
    switch (type) {
      case 'permission':
        return 'yellow.500'
      case 'error':
        return 'red.500'
      default:
        break
    }
  }

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
          bg={getIconBg()}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center"
        >
          {getIcon()}
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {title}
      </Heading>
      <Text color={'gray.500'}>{description}</Text>

      {buttonShow && (
        <Button
          colorScheme="teal"
          variant="solid"
          mt={5}
          onClick={() => (window.location.href = '/')}
        >
          {buttonText}
        </Button>
      )}
    </Flex>
  )
}
