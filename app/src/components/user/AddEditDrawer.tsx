import { useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react'
import { useQueryClient } from 'react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { QUERY_NAMES } from '@/core/Constants'
import IUser from '@/models/IUser'
import { DrawerType, UserRole } from '@/models/enums'
import useStoreDrawer from '@/hooks/useStoreDrawer'
import PasswordInput from '@/components/PasswordInput'
import UserService from '@/services/UserService'

interface IAddEditDrawer {
  data?: IUser
}

const AddEditDrawer = ({ data }: IAddEditDrawer) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { setDrawerStore, drawerStore, clearDrawerStore } = useStoreDrawer()

  const initialValues: IUser = {
    displayName: '',
    userName: '',
    password: '',
    roles: [],
  }

  useEffect(() => {
    if (drawerStore.confirm) {
      if (isValid) {
        setDrawerStore({
          ...drawerStore,
          loading: true,
        })
        handleSubmit()
      } else {
        toast({
          title: `Lütfen tüm alanları doğru şekilde doldurunuz..`,
          status: 'info',
          isClosable: true,
          duration: 4000,
        })
        setDrawerStore({
          ...drawerStore,
          confirm: false,
        })
      }
    }
  }, [drawerStore.confirm])

  const getInitialValues = () =>
    drawerStore.type === DrawerType.Update && data ? data : initialValues

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Lütfen kullanıcı adı giriniz.'),
    displayName: Yup.string().required('Lütfen ad ve soyadı giriniz.'),
    roles: Yup.array()
      .min(1, 'En az 1 tane kullanıcı rolü seçmelisiniz.')
      .required('Lütfen kullanıcı rolü seçiniz.'),
  })
  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
    isValid,
    setFieldTouched,
  } = useFormik<IUser>({
    initialValues: getInitialValues(),
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let res = false
        //kullanıcı güncelleme eklenecek.
        if (drawerStore.type === DrawerType.Add)
          res = await UserService.createItem(values)
        else if (drawerStore.type === DrawerType.Update && data?._id)
          res = await UserService.patchItem(values, data._id)
        if (!res) throw new Error()
        toast({
          title: `${values.displayName} adlı kullanıcı başarıyla eklendi/güncellendi.`,
          status: 'success',
          isClosable: true,
          duration: 4000,
        })
        queryClient.invalidateQueries(QUERY_NAMES.USER)
      } catch (err) {
        console.error(`User AddEditDrawer onSubmit() Error: ${err}`)
        toast({
          title: 'Kayıt/Güncelleme yapılırken bir hata oluştu.',
          status: 'error',
          isClosable: true,
        })
      }
      clearDrawerStore()
      setSubmitting(false)
      resetForm()
    },
  })

  return (
    <form method="post" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <FormControl
          id="userName"
          isInvalid={errors.userName ? touched.userName : false}
        >
          <FormLabel htmlFor="userName">Kullanıcı Adı (*)</FormLabel>
          <Input id="userName" type="text" {...getFieldProps('userName')} />
          {(errors.userName || touched.userName) && (
            <FormErrorMessage>{errors.userName}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          id="displayName"
          isInvalid={errors.displayName ? touched.displayName : false}
        >
          <FormLabel htmlFor="displayName">İsim & Soyisim (*)</FormLabel>
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
          id="password"
          label="Şifre"
          isInvalid={errors.password ? touched.password : false}
          errorMessage={
            errors.password || touched.password ? errors.password : undefined
          }
          onChange={(e) => setFieldValue('password', e.target.value)}
          onClick={(e) => setFieldTouched('password')}
          value={values.password ? values.password : ''}
        />

        <FormControl
          as="fieldset"
          isInvalid={errors.roles ? touched.roles : false}
          onClick={() => setFieldTouched('roles', true, true)}
        >
          <FormLabel as="legend">Kullanıcı İzinleri (*)</FormLabel>

          <CheckboxGroup
            colorScheme="green"
            value={values.roles}
            onChange={(value: string[]) => setFieldValue('roles', value)}
          >
            <Stack spacing={[1, 2]} direction={['column']}>
              <Checkbox id={UserRole.ADMIN} value={UserRole.ADMIN}>
                Admin (Tam Yetki)
              </Checkbox>
              <Checkbox id={UserRole.EMPLOYEE} value={UserRole.EMPLOYEE}>
                Personel Yetkisi
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          {(errors.roles || touched.roles) && (
            <FormErrorMessage>{errors.roles}</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
    </form>
  )
}

export default AddEditDrawer
