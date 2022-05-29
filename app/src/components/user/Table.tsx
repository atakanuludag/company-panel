import { useMemo, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import Datatable from '@/components/Datatable'
import SubHeader from '@/components/user/SubHeader'
import AddEditDrawer from '@/components/user/AddEditDrawer'
import IUser from '@/models/IUser'
import useStoreDrawer from '@/hooks/useStoreDrawer'
import { DrawerType } from '@/models/enums'

interface IDatatableComponent {
  isLoading: boolean
  data: IUser[]
  columns: TableColumn<IUser>[]
}

const UserTable = ({ isLoading, data, columns }: IDatatableComponent) => {
  const { drawerStore, setDrawerStore } = useStoreDrawer()
  const [filterText, setFilterText] = useState('')

  const filteredItems = (!data ? [] : data).filter(
    (item: IUser) =>
      item.displayName &&
      item.displayName
        .toLocaleUpperCase()
        .includes(filterText.toLocaleUpperCase()),
  )

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader setFilterText={setFilterText} filterText={filterText} />,
    [filterText],
  )

  const handleRowClicked = (row: IUser) => {
    setDrawerStore({
      ...drawerStore,
      open: true,
      title: 'Kullanıcı Düzenle',
      content: <AddEditDrawer data={row} />,
      type: DrawerType.Update,
    })
  }

  return (
    <Datatable
      cursorPointer
      columns={columns}
      data={filteredItems}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      persistTableHead
      progressPending={isLoading}
      onRowClicked={handleRowClicked}
    />
  )
}

export default UserTable
