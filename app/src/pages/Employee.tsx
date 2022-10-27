import { useEffect } from 'react'
import { format } from 'date-fns'
import { useQueryClient } from 'react-query'
import { TableColumn } from 'react-data-table-component/dist/src/DataTable/types'
import { IconButton, Tooltip, Text, useToast } from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { QUERY_NAMES } from '@/core/Constants'
import useEmployeeQuery from '@/hooks/queries/useEmployeeQuery'
import useStoreConfirmModal from '@/hooks/useStoreConfirmModal'
import { GenderLanguage } from '@/models/enums'
import IEmployee from '@/models/IEmployee'
import EmployeeTable from '@/components/employee/Table'
import EmployeeService from '@/services/EmployeeService'

function Employee() {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { data, isLoading } = useEmployeeQuery()
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
    const res = await EmployeeService.deleteItem(confirmModalStore.data)
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
    queryClient.invalidateQueries(QUERY_NAMES.EMPLOYEE)
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

  const columns: TableColumn<IEmployee>[] = [
    {
      name: 'TC Numarası',
      selector: (row) => row.tcNumber,
    },
    {
      name: 'Ad & Soyad',
      selector: (row) => row.displayName,
    },
    {
      name: 'Cep',
      selector: (row) => (row.gsmNumber ? row.gsmNumber : ''),
    },
    {
      name: 'İşe Giriş Tarihi',
      selector: (row) =>
        row.startingDate ? format(row.startingDate, 'dd/MM/yyyy') : '',
    },
    {
      name: 'Cinsiyet',
      selector: (row) => GenderLanguage[row.gender],
    },
    {
      name: 'Aksiyon',
      button: true,
      cell: (row) => (
        <Tooltip
          label={`${row.displayName} kaydını sil`}
          placement="bottom-start"
        >
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
      <EmployeeTable
        isLoading={isLoading}
        data={!data ? [] : data.results}
        columns={columns}
      />
    </>
  )
}

export default Employee
