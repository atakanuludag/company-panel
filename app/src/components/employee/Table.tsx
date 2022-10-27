import { useMemo, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import Datatable from '@/components/Datatable'
import SubHeader from '@/components/employee/SubHeader'
import AddEditDrawer from '@/components/employee/AddEditDrawer'
import IEmployee from '@/models/IEmployee'
import useStoreDrawer from '@/hooks/useStoreDrawer'
import { DrawerType } from '@/models/enums'

interface IDatatableComponent {
  isLoading: boolean
  data: IEmployee[]
  columns: TableColumn<IEmployee>[]
}

const EmployeeTable = ({ isLoading, data, columns }: IDatatableComponent) => {
  const { drawerStore, setDrawerStore } = useStoreDrawer()
  const [filterText, setFilterText] = useState('')

  const filteredItems = (!data ? [] : data).filter(
    (item: IEmployee) =>
      item.displayName &&
      item.displayName
        .toLocaleUpperCase()
        .includes(filterText.toLocaleUpperCase()),
  )

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader setFilterText={setFilterText} filterText={filterText} />,
    [filterText],
  )

  const handleRowClicked = (row: IEmployee) => {
    setDrawerStore({
      ...drawerStore,
      open: true,
      title: 'Personel Düzenle',
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

export default EmployeeTable
