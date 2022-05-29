import { useMemo, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import Datatable from '@/components/Datatable'
import SubHeader from '@/components/employeePermit/SubHeader'
import AddEditDrawer from '@/components/employeePermit/AddEditDrawer'
import IEmployeePermit, { IEmployeePermitForm } from '@/models/IEmployeePermit'
import useStoreDrawer from '@/hooks/useStoreDrawer'
import { DrawerType } from '@/models/enums'
import AutocompleteItem from '@/models/AutocompleteItem'

interface IDatatableComponent {
  isLoading: boolean
  data: IEmployeePermit[]
  columns: TableColumn<IEmployeePermit>[]
}

const EmployeePermitTable = ({
  isLoading,
  data,
  columns,
}: IDatatableComponent) => {
  const { drawerStore, setDrawerStore } = useStoreDrawer()
  const [filterText, setFilterText] = useState('')

  const filteredItems = (!data ? [] : data).filter(
    (item: IEmployeePermit) =>
      item.employee &&
      item.employee.displayName
        .toLocaleUpperCase()
        .includes(filterText.toLocaleUpperCase()),
  )

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader setFilterText={setFilterText} filterText={filterText} />,
    [filterText],
  )

  const handleRowClicked = (row: IEmployeePermit) => {
    if (!row.employee) return
    const data: IEmployeePermitForm = {
      _id: row._id,
      employee: row.employee._id ? row.employee._id : '',
      startDate: row.startDate,
      endDate: row.endDate,
      totalDays: row.totalDays,
      description: row.description,
    }

    const employeeAutocomplete: AutocompleteItem = {
      label: row.employee ? row.employee.displayName : '',
      value: row.employee._id ? row.employee._id : '',
    }

    setDrawerStore({
      ...drawerStore,
      open: true,
      title: 'İzin Düzenle',
      content: (
        <AddEditDrawer
          data={data}
          employeeAutocomplete={employeeAutocomplete}
        />
      ),
      type: DrawerType.Update,
      loading: true,
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

export default EmployeePermitTable
