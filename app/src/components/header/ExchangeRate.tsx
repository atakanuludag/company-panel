import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Grid,
  GridItem,
  Stat,
  useColorModeValue,
  StatLabel,
  StatNumber,
  Text,
  Spinner,
  Box,
} from '@chakra-ui/react'
import { BsCurrencyExchange } from 'react-icons/bs'
import { FaLiraSign } from 'react-icons/fa'
import useExchangeRateQuery from '@/hooks/queries/useExchangeRateQuery'
import { DovizType } from '@/models/IExchangeRate'

//todo: daha sonrasında dashboard'daki exchangeratecard ile headerdakini tek componente çevirebiliriz belki.
interface IHeaderExchangeRateCard {
  title: string
  loading: boolean
  value: number | undefined
}

function HeaderExchangeRateCard({
  title,
  loading,
  value,
}: IHeaderExchangeRateCard) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      backgroundColor={useColorModeValue('white', 'gray.900')}
      rounded={'lg'}
      display="flex"
      justifyContent="center"
      minHeight="90px"
    >
      <Box display="flex" alignItems="center" flexDirection="column">
        <StatLabel fontWeight="bold" fontSize="sm" noOfLines={1}>
          {title}
        </StatLabel>
        {loading ? (
          <Spinner size="sm" mt={2} />
        ) : (
          <StatNumber
            fontSize={'xl'}
            fontWeight={'medium'}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Text fontSize="inherit" mr="1">
              {!value ? 0 : value.toFixed(3)}
            </Text>
            <FaLiraSign fontSize={'0.6em'} />
          </StatNumber>
        )}
      </Box>
    </Stat>
  )
}

function ExchangeRateHeader() {
  const exchangeRate = useExchangeRateQuery()

  const dollar = exchangeRate.data?.find((e) => e.name === DovizType.USD)
  const euro = exchangeRate.data?.find((e) => e.name === DovizType.EUR)
  const poundSterling = exchangeRate.data?.find((e) => e.name === DovizType.GBP)

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Exchange Rate Popover"
          isLoading={exchangeRate.isLoading}
          icon={<BsCurrencyExchange />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Döviz Kurları</PopoverHeader>

        <PopoverBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem w="100%">
              <HeaderExchangeRateCard
                title="Dolar Alış"
                value={dollar?.buying}
                loading={exchangeRate.isLoading}
              />
            </GridItem>
            <GridItem w="100%">
              <HeaderExchangeRateCard
                title="Dolar Satış"
                value={dollar?.sales}
                loading={exchangeRate.isLoading}
              />
            </GridItem>
            <GridItem w="100%">
              <HeaderExchangeRateCard
                title="Euro Alış"
                value={euro?.buying}
                loading={exchangeRate.isLoading}
              />
            </GridItem>
            <GridItem w="100%">
              <HeaderExchangeRateCard
                title="Euro Satış"
                value={euro?.sales}
                loading={exchangeRate.isLoading}
              />
            </GridItem>
            <GridItem w="100%">
              <HeaderExchangeRateCard
                title="Sterlin Alış"
                value={poundSterling?.buying}
                loading={exchangeRate.isLoading}
              />
            </GridItem>
            <GridItem w="100%">
              <HeaderExchangeRateCard
                title="Sterlin Satış"
                value={poundSterling?.sales}
                loading={exchangeRate.isLoading}
              />
            </GridItem>
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ExchangeRateHeader
