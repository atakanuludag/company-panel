import { Box, Spinner, useColorModeValue, Text } from '@chakra-ui/react'
import DataTable, { TableProps, TableStyles } from 'react-data-table-component'

interface IDatatable extends TableProps<any> {
  cursorPointer?: boolean
}

const DataTableComponent = (props: IDatatable) => {
  const bg = useColorModeValue('white', 'gray.900')
  const color = useColorModeValue('black', 'white')
  const rowHoverBg = useColorModeValue('#E2E8F0', '#2D3748')

  const customStyles: TableStyles = {
    subHeader: {
      style: {
        background: 'none',
        color,
        padding: '10px 10px 10px 10px',
      },
    },
    table: {
      style: {
        background: 'none',
        color,
      },
    },
    tableWrapper: {
      style: {
        background: 'none ',
        color,
      },
    },
    headRow: {
      style: {
        background: 'none',
        color,
      },
    },
    rows: {
      style: {
        background: 'none',
        color,
        cursor: props.cursorPointer ? 'pointer' : 'default',
        transition: 'all 0.2s linear',
        '-webkit-transition': 'all 0.2s linear',
        '-moz-transition': 'all 0.2s linear',
        '-o-transition': 'all 0.2s linear',
        '-ms-transition': 'all 0.2s linear',
        '&:hover': {
          background: rowHoverBg,
        },
      },
    },
    noData: {
      style: {
        background: 'none',
        color,
      },
    },
    pagination: {
      style: {
        background: 'none',
        color,
      },
    },
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" bg={bg}>
      <DataTable
        {...props}
        progressComponent={<Spinner size="xl" />}
        noDataComponent={
          <Text fontSize="md" padding={20}>
            Herhangi bir veri bulunamadı.
          </Text>
        }
        paginationComponentOptions={{
          rangeSeparatorText: 'arası',
          rowsPerPageText: 'Sayfada görüntülenecek veri',
        }}
        customStyles={customStyles}
      />
    </Box>
  )
}

export default DataTableComponent
