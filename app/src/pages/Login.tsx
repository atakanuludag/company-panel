import { useEffect } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import LanguageSelect from '@/components/header/LanguageSelect'
import ILoginForm from '@/models/ILoginForm'
import UserService from '@/services/UserService'
import useStoreUser from '@/hooks/useStoreUser'
import useLocales from '@/hooks/useLocale'

function Login() {
  const { translate } = useLocales()
  const navigate = useNavigate()
  const toast = useToast()
  const { userStore, setLoginStore } = useStoreUser()
  const { isLoggedIn } = userStore

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [])

  const initialValues: ILoginForm = {
    username: 'atakanuludag',
    password: '123456',
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Lütfen kullanıcı adını giriniz.'),
    password: Yup.string().required('Lütfen şifrenizi giriniz.'),
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    useFormik<ILoginForm>({
      initialValues,
      validationSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        try {
          const auth = await UserService.postLogin(values)
          if (!auth) {
            toast({
              title: 'Kullanıcı adı veya şifreniz yanlış.',
              status: 'error',
              isClosable: true,
            })
            return
          }
          toast({
            title: 'Başarıyla giriş yapıldı.',
            status: 'success',
            isClosable: true,
            duration: 4000,
          })
          setLoginStore(auth.accessToken)

          navigate('/')
        } catch (err) {
          console.error(`Admin login page onSubmit() Error: ${err}`)
          toast({
            title: 'Giriş yapılırken bir sorun oluştu.',
            status: 'error',
            isClosable: true,
          })
        }
        setSubmitting(false)
        resetForm()
      },
    })

  return (
    <Flex
      minH={'100vh'}
      direction="column"
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box position="fixed" top="1" right="1" padding="5">
          <LanguageSelect />
        </Box>

        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign="center">
            {translate('login_text')}
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Company Panel
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form method="post" onSubmit={handleSubmit} noValidate>
              <FormControl
                id="userName"
                isInvalid={errors.username ? touched.username : false}
              >
                <FormLabel htmlFor="username">
                  {translate('username')}
                </FormLabel>
                <Input
                  id="username"
                  type="text"
                  {...getFieldProps('username')}
                />
                {(errors.username || touched.username) && (
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="password"
                isInvalid={errors.password ? touched.password : false}
              >
                <FormLabel htmlFor="password">
                  {translate('password')}
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...getFieldProps('password')}
                />
                {(errors.password || touched.password) && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>{translate('remember_me')}</Checkbox>
                </Stack>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isSubmitting}
                  loadingText={translate('loading')}
                >
                  {translate('login')}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
