import { ChangeEvent, ReactNode, useState } from 'react'
import {
  Box,
  Flex,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Select,
  useColorModeValue,
  Icon,
  Text,
} from '@chakra-ui/react'
import { ExhangeRateType, ExhangeRateValueType } from '@/models/enums'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

interface IExchangeRateCard {
  title: string
  buying: number | undefined
  sales: number | undefined
  valueIcon: ReactNode
  change: number | undefined
  changeType: ExhangeRateType | undefined
  icon: ReactNode
  loading: boolean
}
export default function ExchangeRateCard({
  title,
  buying,
  sales,
  valueIcon,
  change,
  changeType,
  icon,
  loading,
}: IExchangeRateCard) {
  const [valueType, setValueType] = useState(ExhangeRateValueType.BUYING)

  const getChangeTypeIcon = (): ReactNode => {
    switch (changeType) {
      case ExhangeRateType.UP:
        return (
          <Icon color="green.400" boxSize="1.4em">
            <IoMdArrowDropup fontSize="1.4em" />
          </Icon>
        )
      case ExhangeRateType.DOWN:
        return (
          <Icon color="red.400" boxSize="1.4em">
            <IoMdArrowDropdown fontSize="1.4em" />
          </Icon>
        )
    }
  }

  const handleValueTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setValueType(e.target.value as ExhangeRateValueType)

  const spinner = <Spinner size="sm" mt={2} />

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      backgroundColor={useColorModeValue('white', 'gray.900')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'} pl={{ base: 2, md: 4 }}>
        <StatLabel fontWeight="bold" fontSize="lg" noOfLines={1}>
          {title}
        </StatLabel>
        <Box>
          {!loading && (
            <Select
              placeholder=""
              size="xs"
              variant="unstyled"
              iconSize="13px"
              insetBlockEnd="1"
              sx={{
                top: '-2px',
                paddingInlineEnd: '1.40rem',
              }}
              value={valueType}
              onChange={handleValueTypeChange}
            >
              <option value={ExhangeRateValueType.BUYING}>Alış</option>
              <option value={ExhangeRateValueType.SALES}>Satış</option>
            </Select>
          )}
        </Box>
      </Flex>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          {loading ? (
            spinner
          ) : (
            <Box>
              <StatNumber
                fontSize={'2xl'}
                fontWeight={'medium'}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Text fontSize="inherit" mr="1">
                  {valueType === ExhangeRateValueType.BUYING
                    ? typeof buying !== 'undefined'
                      ? buying
                      : 0
                    : typeof sales !== 'undefined'
                    ? sales
                    : 0}
                </Text>
                {valueIcon}
              </StatNumber>
              <Box>
                {getChangeTypeIcon()}
                {change}
              </Box>
            </Box>
          )}
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}
