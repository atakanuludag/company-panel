import { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  useToast,
  Textarea,
  Text,
  Divider,
} from '@chakra-ui/react'
import { useQueryClient } from 'react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import { ActionMeta, SingleValue } from 'chakra-react-select'
import { QUERY_NAMES } from '@/core/Constants'
import { IEmployeePermitForm } from '@/models/IEmployeePermit'
import IEmployee from '@/models/IEmployee'
import AutocompleteItem from '@/models/AutocompleteItem'
import EmployeeService from '@/services/EmployeeService'
import { DrawerType } from '@/models/enums'
import Datepicker from '@/components/Datepicker'
import AsyncAutocomplete from '@/components/Autocomplete'
import useStoreDrawer from '@/hooks/useStoreDrawer'
import useEmployeeQuery from '@/hooks/queries/useEmployeeQuery'

interface IAddEditDrawer {
  data?: IEmployeePermitForm | undefined
  employeeAutocomplete?: AutocompleteItem | undefined
}

const AddEditDrawer = ({
  data,
  employeeAutocomplete = undefined,
}: IAddEditDrawer) => {
  const [employeeItem, setEmployeeItem] = useState<AutocompleteItem[]>([])
  const [employeeSearch, setEmployeeSearch] = useState('')
  const [employeeSearchEnabled, setEmployeeSearchEnabled] = useState(false)
  const [employeeAutocompleteValue, setEmployeeAutocompleteValue] = useState<
    AutocompleteItem | undefined
  >(employeeAutocomplete)
  const [excludeDates, setExcludeDates] = useState<Date[]>([])

  const toast = useToast()
  const queryClient = useQueryClient()
  const employee = useEmployeeQuery(employeeSearchEnabled, {
    sType: 'displayName',
    s: employeeSearch,
  })
  const {
    drawerStore,
    setDrawerStore,
    setDrawerLoadingStore,
    clearDrawerStore,
  } = useStoreDrawer()

  const initialValues: IEmployeePermitForm = {
    employee: null,
    startDate: null,
    endDate: null,
    totalDays: 0,
    description: '',
  }

  const getInitialValues = () =>
    drawerStore.type === DrawerType.Update && data ? data : initialValues

  const validationSchema = Yup.object().shape({
    employee: Yup.string()
      .typeError('Lütfen personel seçiniz.')
      .required('Lütfen personel seçiniz.'),
    startDate: Yup.date()
      .typeError('Lütfen doğru tarih biçimi giriniz.')
      .required('Lütfen izin başlangıç tarihi giriniz.'),
    endDate: Yup.date()
      .typeError('Lütfen doğru tarih biçimi giriniz.')
      .required('Lütfen izin başlangıç tarihi giriniz.'),
  })

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    isValid,
    values,
  } = useFormik<IEmployeePermitForm>({
    initialValues: getInitialValues(),
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let res = false

        const eachDay = eachDayOfInterval({
          start: values.startDate as Date,
          end: values.endDate as Date,
        })

        const find = excludeDates.filter((d) =>
          eachDay.some((e) => e.valueOf() === d.valueOf()),
        )
        if (find.length > 0) {
          toast({
            title:
              'Personel daha önce seçtiğiniz tarih aralığında izin almıştır. Lütfen başka tarih aralığı seçiniz.',
            status: 'warning',
            isClosable: true,
          })
          setDrawerLoadingStore(false)
          return
        }
        if (drawerStore.type === DrawerType.Add)
          res = await EmployeeService.postPermitItem(values)
        else if (drawerStore.type === DrawerType.Update && data?._id)
          res = await EmployeeService.patchPermitItem(values, data._id)
        if (!res) throw new Error()

        toast({
          title: `İzin başarıyla eklendi/güncellendi.`,
          status: 'success',
          isClosable: true,
          duration: 4000,
        })
        queryClient.invalidateQueries(QUERY_NAMES.EMPLOYEEPERMIT)
      } catch (err) {
        console.log(err)
        console.error(`EmployeePermit AddEditDrawer onSubmit() Error: ${err}`)
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

  //** Edit tarafında burası çalışıyor. data propsu dolu geliyorsa;
  useEffect(() => {
    const getEmployee = async (data: IEmployeePermitForm) => {
      const permitItems = await EmployeeService.getPermitItemsByEmployeeId(
        data.employee as string,
      )

      const currentPermitDates = eachDayOfInterval({
        start: data.startDate as Date,
        end: data.endDate as Date,
      })

      const dateEach = permitItems
        .map((d) => {
          const result = eachDayOfInterval({
            start: d.startDate as Date,
            end: d.endDate as Date,
          })
          return result
        })
        .flat()
        .filter(
          (d) => !currentPermitDates.some((c) => c.valueOf() === d.valueOf()),
        )
      setExcludeDates(dateEach)
      setDrawerLoadingStore(false)
    }
    if (drawerStore.type === DrawerType.Update && data && data.employee)
      getEmployee(data)
  }, [data])

  useEffect(() => {
    if (drawerStore.confirm) {
      if (isValid) {
        setDrawerLoadingStore(true)
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

  useEffect(() => {
    if (!employee.isLoading && employee.isSuccess) {
      let _employeeItem: AutocompleteItem[] = employee.data.results.map(
        (e: IEmployee) => ({
          label: e.displayName,
          value: e._id,
        }),
      )

      setEmployeeItem(_employeeItem)
    }
  }, [employee.isLoading])

  useEffect(() => {
    if (employeeSearch !== '') setEmployeeSearchEnabled(true)
  }, [employeeSearch])

  useEffect(() => {
    if (values.startDate && values.endDate) {
      const days = differenceInDays(values.endDate, values.startDate)
      setFieldValue('totalDays', days >= 0 ? days : 0)
    }
  }, [values.startDate, values.endDate])

  const employeeInputOnChange = async (
    newValue: SingleValue<AutocompleteItem | undefined>,
    actionMeta: ActionMeta<AutocompleteItem | undefined>,
  ) => {
    setEmployeeAutocompleteValue(
      actionMeta.action === 'select-option' && newValue ? newValue : undefined,
    )
    setFieldValue(
      'employee',
      actionMeta.action === 'select-option' && newValue ? newValue.value : null,
    )
    setFieldValue('startDate', null)
    setFieldValue('endDate', null)

    if (!newValue || !newValue.value) {
      setExcludeDates([])
      return
    }

    setDrawerLoadingStore(true)
    const permitItems = await EmployeeService.getPermitItemsByEmployeeId(
      newValue?.value,
    )
    const dateEach = permitItems
      .map((d) => {
        const result = eachDayOfInterval({
          start: d.startDate as Date,
          end: d.endDate as Date,
        })
        return result
      })
      .flat()
    setExcludeDates(dateEach)
    setDrawerLoadingStore(false)
  }
  return (
    <form method="post" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <AsyncAutocomplete
          id="employee"
          loading={employee.isLoading}
          formLabel="Personel"
          isInvalid={errors.employee && touched.employee ? true : false}
          errorMessage={
            errors.employee || touched.employee
              ? (errors.employee as string)
              : ''
          }
          value={employeeAutocompleteValue}
          items={employeeItem}
          onInputChange={(search, actionMeta) => setEmployeeSearch(search)}
          onChange={employeeInputOnChange}
          onBlur={(e) => handleBlur(e)}
          noOptionsMessage={() => 'Aramanızı genişletin. Veri bulunamadı.'}
        />
        <Datepicker
          applyHolidays
          selectsStart
          id="startDate"
          formLabel="İzin Başlangıç Tarihi (*)"
          dateFormat="dd/MM/yyyy"
          isInvalid={errors.startDate && touched.startDate ? true : false}
          errorMessage={
            errors.startDate || touched.startDate
              ? (errors.startDate as string)
              : ''
          }
          selected={(values.startDate && new Date(values.startDate)) || null}
          onInputClick={() => setFieldTouched('startDate', true, true)}
          onChange={(date: Date) => setFieldValue('startDate', date)}
          startDate={(values.startDate && new Date(values.startDate)) || null}
          endDate={(values.endDate && new Date(values.endDate)) || null}
          excludeDates={excludeDates}
        />
        <Datepicker
          applyHolidays
          selectsEnd
          id="endDate"
          formLabel="İzin Bitiş Tarihi (*)"
          dateFormat="dd/MM/yyyy"
          isInvalid={errors.endDate && touched.endDate ? true : false}
          errorMessage={
            errors.endDate || touched.endDate ? (errors.endDate as string) : ''
          }
          selected={(values.endDate && new Date(values.endDate)) || null}
          onInputClick={() => setFieldTouched('endDate', true, true)}
          onChange={(date: Date) => setFieldValue('endDate', date)}
          startDate={(values.startDate && new Date(values.startDate)) || null}
          endDate={(values.endDate && new Date(values.endDate)) || null}
          minDate={values.startDate}
          disabled={!values.startDate ? true : false}
          excludeDates={excludeDates}
        />
        <Divider />
        <Text fontSize="md" textAlign="center">
          Toplam İzin: <strong>{values.totalDays}</strong> gün
        </Text>
        <Divider />
        <FormControl
          id="description"
          isInvalid={errors.description ? touched.description : false}
        >
          <FormLabel htmlFor="description">Açıklama</FormLabel>
          <Textarea
            id="description"
            placeholder=""
            {...getFieldProps('description')}
          />
          {(errors.description || touched.description) && (
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
    </form>
  )
}

export default AddEditDrawer
