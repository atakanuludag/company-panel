import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { IProfileUpdateUser } from '@/models/IUser'
import UserService from '@/services/UserService'
import useStoreUser from '@/hooks/useStoreUser'
import PasswordInput from '@/components/PasswordInput'

export default function MyProfile() {
  const toast = useToast()
  const { userStore, setUserStore } = useStoreUser()

  const initialValues: IProfileUpdateUser = {
    displayName: userStore.displayName ? userStore.displayName : '',
    userName: userStore.userName ? userStore.userName : '',
    oldPassword: '',
    newPassword: '',
  }

  useEffect(() => {
    if (userStore.displayName)
      setFieldValue('displayName', userStore.displayName)
    if (userStore.userName) setFieldValue('userName', userStore.userName)
  }, [userStore.displayName, userStore.userName])

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required('Lütfen ad ve soyadı giriniz.'),
    userName: Yup.string().required('Lütfen kullanıcı adı giriniz.'),
    oldPassword: Yup.string().required('Lütfen eski şifrenizi giriniz.'),
    newPassword: Yup.string().required('Lütfen yeni şifrenizi giriniz.'),
  })

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    values,
  } = useFormik<IProfileUpdateUser>({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const res = await UserService.updateMyProfile(values)
      if (res) {
        setUserStore({
          ...userStore,
          ...values,
        })
        toast({
          title: `Profiliniz başarıyla güncellendi.`,
          status: 'success',
          isClosable: true,
          duration: 4000,
        })
      }
      setSubmitting(false)
      //resetForm()
    },
  })

  return (
    <Box display="flex" justifyContent="center" pt="5">
      <Box w="40rem">
        <form method="post" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <FormControl
              id="userName"
              isInvalid={errors.userName ? touched.userName : false}
            >
              <FormLabel htmlFor="displayName">Kullanıcı Adı</FormLabel>
              <Input id="userName" type="text" {...getFieldProps('userName')} />
              {(errors.userName || touched.userName) && (
                <FormErrorMessage>{errors.userName}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="displayName"
              isInvalid={errors.displayName ? touched.displayName : false}
            >
              <FormLabel htmlFor="displayName">İsim & Soyisim</FormLabel>
              <Input
                id="displayName"
                type="text"
                {...getFieldProps('displayName')}
              />
              {(errors.displayName || touched.displayName) && (
                <FormErrorMessage>{errors.displayName}</FormErrorMessage>
              )}
            </FormControl>

            <PasswordInput
              id="oldPassword"
              label="Eski Şifre"
              isInvalid={errors.oldPassword ? touched.oldPassword : false}
              errorMessage={
                errors.oldPassword || touched.oldPassword
                  ? errors.oldPassword
                  : undefined
              }
              onChange={(e) => setFieldValue('oldPassword', e.target.value)}
              onClick={(e) => setFieldTouched('oldPassword')}
              value={values.oldPassword}
            />

            <PasswordInput
              id="newPassword"
              label="Yeni Şifre"
              isInvalid={errors.newPassword ? touched.newPassword : false}
              errorMessage={
                errors.newPassword || touched.newPassword
                  ? errors.newPassword
                  : undefined
              }
              onChange={(e) => setFieldValue('newPassword', e.target.value)}
              onClick={(e) => setFieldTouched('newPassword')}
              value={values.newPassword}
            />
            <Box display="flex" justifyContent="end">
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Kaydet
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}
