import { useEffect } from 'react'
import { format } from 'date-fns'
import { useQueryClient } from 'react-query'
import { TableColumn } from 'react-data-table-component/dist/src/DataTable/types'
import { IconButton, Tooltip, Text, useToast } from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { QUERY_NAMES } from '@/core/Constants'
import useUserQuery from '@/hooks/queries/useUserQuery'
import useStoreConfirmModal from '@/hooks/useStoreConfirmModal'
import IUser from '@/models/IUser'
import UserTable from '@/components/user/Table'
import UserService from '@/services/UserService'

function Employee() {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { data, isLoading } = useUserQuery()
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
    const res = await UserService.deleteItem(confirmModalStore.data)
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

  const columns: TableColumn<IUser>[] = [
    {
      name: 'Kullanıcı Adı',
      selector: (row) => row.userName,
    },
    {
      name: 'Ad & Soyad',
      selector: (row) => row.displayName,
    },
    {
      name: 'Roller',
      selector: (row) => row.roles.join(', '),
    },
    {
      name: 'Oluşturulma Tarihi',
      selector: (row) =>
        row.createdAt ? format(row.createdAt, 'dd/MM/yyyy') : '',
    },
    {
      name: 'Güncellenme Tarihi',
      selector: (row) =>
        row.updatedAt ? format(row.updatedAt, 'dd/MM/yyyy') : '',
    },
    {
      name: 'Aksiyon',
      button: true,
      cell: (row) => (
        <Tooltip label={`${row.userName} kaydını sil`}>
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
      <UserTable
        isLoading={isLoading}
        data={!data ? [] : data}
        columns={columns}
      />
    </>
  )
}

export default Employee
