import { Box, SimpleGrid } from '@chakra-ui/react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import {
  FaEuroSign,
  FaDollarSign,
  FaPoundSign,
  FaLiraSign,
} from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import StatsCard from '@/components/dashboard/StatsCard'
import ExchangeRateCard from '@/components/dashboard/ExchangeRateCard'
import useExchangeRateQuery from '@/hooks/queries/useExchangeRateQuery'
import { DovizType } from '@/models/IExchangeRate'

export default function Dashboard() {
  const exchangeRate = useExchangeRateQuery()

  const dollar = exchangeRate.data?.find((e) => e.name === DovizType.USD)
  const euro = exchangeRate.data?.find((e) => e.name === DovizType.EUR)
  const poundSterling = exchangeRate.data?.find((e) => e.name === DovizType.GBP)

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <ExchangeRateCard
          title="Dolar"
          buying={dollar?.buying}
          sales={dollar?.sales}
          valueIcon={<FaLiraSign fontSize={'0.7em'} />}
          change={dollar?.change}
          changeType={dollar?.type}
          icon={<FaDollarSign size={'3em'} />}
          loading={exchangeRate.isLoading}
        />
        <ExchangeRateCard
          title="Euro"
          buying={euro?.buying}
          sales={euro?.sales}
          valueIcon={<FaLiraSign fontSize={'0.7em'} />}
          change={euro?.change}
          changeType={euro?.type}
          icon={<FaEuroSign size={'3em'} />}
          loading={exchangeRate.isLoading}
        />
        <ExchangeRateCard
          title="Sterlin"
          buying={poundSterling?.buying}
          sales={poundSterling?.sales}
          valueIcon={<FaLiraSign fontSize={'0.7em'} />}
          change={poundSterling?.change}
          changeType={poundSterling?.type}
          icon={<FaPoundSign size={'3em'} />}
          loading={exchangeRate.isLoading}
        />
        <StatsCard
          title="Personeller"
          value={'5,000'}
          icon={<BsPerson size={'3em'} />}
          loading={false}
        />
        <StatsCard
          title="Kullanıcılar"
          value={'1,000'}
          icon={<FiServer size={'3em'} />}
          loading={false}
        />
        <StatsCard
          title={'Datacenters'}
          value={'7'}
          icon={<GoLocation size={'3em'} />}
          loading={true}
        />
      </SimpleGrid>
    </Box>
  )
}
