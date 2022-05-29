import { useEffect } from 'react'
import { format } from 'date-fns'
import { useQueryClient } from 'react-query'
import { TableColumn } from 'react-data-table-component/dist/src/DataTable/types'
import { IconButton, Tooltip, Text, useToast } from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { QUERY_NAMES } from '@/core/Constants'
import useEmployeePermitQuery from '@/hooks/queries/useEmployeePermitQuery'
import useStoreConfirmModal from '@/hooks/useStoreConfirmModal'
import IEmployeePermit from '@/models/IEmployeePermit'
import EmployeePermitTable from '@/components/employeePermit/Table'
import EmployeeService from '@/services/EmployeeService'

function EmployeePermit() {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { data, isLoading } = useEmployeePermitQuery()
  const { confirmModalStore, setConfirmModalStore, clearConfirmModalStore } =
    useStoreConfirmModal()

  useEffect(() => {
    if (confirmModalStore.confirm) deleteConfirm()
  }, [confirmModalStore.confirm])

  const deleteConfirm = async () => {
    setConfirmModalStore({
      ...confirmModalStore,
      loading: true,
    })
    const res = await EmployeeService.deletePermitItem(confirmModalStore.data)
    if (res) {
      toast({
        title: `Başarıyla silindi`,
        status: 'success',
        isClosable: true,
        duration: 4000,
      })
    } else {
      toast({
        title: `Silme işleminde bir hata oluştu.`,
        status: 'error',
        isClosable: true,
        duration: 4000,
      })
    }

    clearConfirmModalStore()
    queryClient.invalidateQueries(QUERY_NAMES.EMPLOYEEPERMIT)
  }

  const handleRowDeleteButton = (id: string) => {
    setConfirmModalStore({
      open: true,
      title: 'Emin misiniz ?',
      content: <Text fontSize="md">Gerçekten silmek istiyor musunuz ?</Text>,
      confirm: false,
      data: id,
      loading: false,
    })
  }

  const columns: TableColumn<IEmployeePermit>[] = [
    {
      name: 'Personel',
      selector: (row) => (row.employee ? row.employee.displayName : ''),
    },
    {
      name: 'İzin Başlangıç Tarihi',
      selector: (row) =>
        row.startDate ? format(row.startDate, 'dd/MM/yyyy') : '',
    },
    {
      name: 'İzin Bitiş Tarihi',
      selector: (row) => (row.endDate ? format(row.endDate, 'dd/MM/yyyy') : ''),
    },
    {
      name: 'Toplam İzin Gün',
      selector: (row) => row.totalDays,
    },
    {
      name: 'Açıklama',
      selector: (row) => row.description,
    },
    {
      name: 'Oluşturma Tarihi',
      selector: (row) =>
        row.createdAt ? format(row.createdAt, 'dd/MM/yyyy') : '',
    },
    {
      name: 'Aksiyon',
      button: true,
      cell: (row) => (
        <Tooltip label={`Kaydı sil`}>
          <IconButton
            aria-label="Delete item"
            colorScheme="red"
            size="xs"
            variant="outline"
            icon={<MdDelete />}
            onClick={() => row._id && handleRowDeleteButton(row._id)}
          />
        </Tooltip>
      ),
    },
  ]

  return (
    <>
      <EmployeePermitTable
        isLoading={isLoading}
        data={!data ? [] : data}
        columns={columns}
      />
    </>
  )
}

export default EmployeePermit
