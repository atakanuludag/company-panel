import { Dispatch } from 'react'
import {
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { MdAdd, MdSearch } from 'react-icons/md'
import useStoreDrawer from '@/hooks/useStoreDrawer'
import AddEditDrawer from '@/components/employeePermit/AddEditDrawer'
import { DrawerType } from '@/models/enums'

interface IEmployeePermitTableSubHeader {
  setFilterText: Dispatch<React.SetStateAction<string>>
  filterText: string
}

const EmployeePermitTableSubHeader = ({
  setFilterText,
  filterText,
}: IEmployeePermitTableSubHeader) => {
  const { drawerStore, setDrawerStore } = useStoreDrawer()

  const handleAddButton = () => {
    setDrawerStore({
      ...drawerStore,
      open: true,
      title: 'Yeni İzin Ekle',
      content: <AddEditDrawer />,
      type: DrawerType.Add,
    })
  }

  return (
    <Grid templateColumns="repeat(2, 1fr)" width="100%">
      <GridItem w="100%">
        <InputGroup maxWidth="xl">
          <InputLeftElement
            pointerEvents="none"
            children={<MdSearch color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Personele göre ara..."
            onChange={(e) => setFilterText(e.target.value)}
            value={filterText}
          />
        </InputGroup>
      </GridItem>
      <GridItem w="100%" display="flex" justifyContent="flex-end">
        <Button leftIcon={<MdAdd />} variant="ghost" onClick={handleAddButton}>
          Ekle
        </Button>
      </GridItem>
    </Grid>
  )
}

export default EmployeePermitTableSubHeader
