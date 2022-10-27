import { useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
  RadioGroup,
  Radio,
  Textarea,
  HStack,
} from '@chakra-ui/react'
import { useQueryClient } from 'react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { QUERY_NAMES } from '@/core/Constants'
import IEmployee from '@/models/IEmployee'
import EmployeeService from '@/services/EmployeeService'
import { DrawerType, Gender, GenderLanguage } from '@/models/enums'
import Datepicker from '@/components/Datepicker'
import TCNumberValidation from '@/utils/TCNumberValidation'
import useStoreDrawer from '@/hooks/useStoreDrawer'

interface IAddEditDrawer {
  data?: IEmployee
}

const AddEditDrawer = ({ data }: IAddEditDrawer) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { setDrawerStore, drawerStore, clearDrawerStore } = useStoreDrawer()

  const initialValues: IEmployee = {
    tcNumber: '',
    displayName: '',
    gsmNumber: '',
    homePhone: '',
    address: '',
    startingDate: null,
    endDate: null,
    gender: Gender.MALE,
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
    tcNumber: Yup.string()
      .test('tc-number', 'TC numarası doğru değil', function (value) {
        if (typeof value !== 'undefined') {
          return TCNumberValidation(value)
        }
        return false
      })
      .required('Lütfen tc numarasını giriniz.'),
    displayName: Yup.string().required('Lütfen ad ve soyadı giriniz.'),
    // gsmNumber: Yup.string().required('Lütfen cep telefonu giriniz.'),
    // homePhone: Yup.string().required('Lütfen ev telefonu giriniz.'),
    // address: Yup.string().required('Lütfen adres giriniz'),
    startingDate: Yup.date()
      .typeError('Lütfen doğru tarih biçimi giriniz.')
      .required('Lütfen işe başlangıç tarihi giriniz.'),
  })

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    isValid,
    setFieldValue,
    setFieldTouched,
    values,
  } = useFormik<IEmployee>({
    initialValues: getInitialValues(),
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let res = false
        if (drawerStore.type === DrawerType.Add)
          res = await EmployeeService.postItem(values)
        else if (drawerStore.type === DrawerType.Update && data?._id)
          res = await EmployeeService.patchItem(values, data._id)
        if (!res) throw new Error()
        toast({
          title: `${values.displayName} adlı personel başarıyla eklendi/güncellendi.`,
          status: 'success',
          isClosable: true,
          duration: 4000,
        })
        queryClient.invalidateQueries(QUERY_NAMES.EMPLOYEE)
      } catch (err) {
        console.error(`Employee AddEditDrawer onSubmit() Error: ${err}`)
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
          id="tcNumber"
          isInvalid={errors.tcNumber ? touched.tcNumber : false}
        >
          <FormLabel htmlFor="tcNumber">TC Numarası (*)</FormLabel>
          <Input id="tcNumber" type="text" {...getFieldProps('tcNumber')} />
          {(errors.tcNumber || touched.tcNumber) && (
            <FormErrorMessage>{errors.tcNumber}</FormErrorMessage>
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
        <FormControl
          id="gsmNumber"
          isInvalid={errors.gsmNumber ? touched.gsmNumber : false}
        >
          <FormLabel htmlFor="gsmNumber">Cep Telefonu</FormLabel>
          <Input id="gsmNumber" type="text" {...getFieldProps('gsmNumber')} />
          {(errors.gsmNumber || touched.gsmNumber) && (
            <FormErrorMessage>{errors.gsmNumber}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          id="homePhone"
          isInvalid={errors.homePhone ? touched.homePhone : false}
        >
          <FormLabel htmlFor="homePhone">Ev Telefonu</FormLabel>
          <Input id="homePhone" type="text" {...getFieldProps('homePhone')} />
          {(errors.homePhone || touched.homePhone) && (
            <FormErrorMessage>{errors.homePhone}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          id="address"
          isInvalid={errors.address ? touched.address : false}
        >
          <FormLabel htmlFor="address">Adres</FormLabel>
          <Textarea id="address" placeholder="" {...getFieldProps('address')} />
          {(errors.address || touched.address) && (
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          )}
        </FormControl>
        <Datepicker
          id="startingDate"
          formLabel="İşe Giriş Tarihi (*)"
          dateFormat="dd/MM/yyyy"
          isInvalid={errors.startingDate && touched.startingDate ? true : false}
          errorMessage={
            errors.startingDate || touched.startingDate
              ? (errors.startingDate as string)
              : ''
          }
          selected={
            (values.startingDate && new Date(values.startingDate)) || null
          }
          onInputClick={() => setFieldTouched('startingDate', true, true)}
          onChange={(date: Date) => setFieldValue('startingDate', date)}
        />

        {drawerStore.type === DrawerType.Update && (
          <Datepicker
            id="endDate"
            formLabel="İşden Çıkış Tarihi"
            dateFormat="dd/MM/yyyy"
            isInvalid={errors.endDate && touched.endDate ? true : false}
            errorMessage={
              errors.endDate || touched.endDate
                ? (errors.endDate as string)
                : ''
            }
            selected={(values.endDate && new Date(values.endDate)) || null}
            onInputClick={() => setFieldTouched('endDate', true, true)}
            onChange={(date: Date) => setFieldValue('endDate', date)}
          />
        )}

        <FormControl as="fieldset">
          <FormLabel as="legend">Cinsiyet</FormLabel>
          <RadioGroup
            onChange={(value: string) => setFieldValue('gender', value)}
            value={values.gender}
          >
            <HStack spacing="5">
              <Radio value={Gender.MALE}>{GenderLanguage.male}</Radio>
              <Radio value={Gender.FEMALE}>{GenderLanguage.female}</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </Stack>
    </form>
  )
}

export default AddEditDrawer
