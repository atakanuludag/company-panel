import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
} from '@chakra-ui/react'

interface IStatsCard {
  title: string
  value: string | number | undefined
  icon: ReactNode
  loading: boolean
}
export default function StatsCard({ title, value, icon, loading }: IStatsCard) {
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
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight="bold" fontSize="lg" noOfLines={1}>
            {title}
          </StatLabel>
          {loading ? (
            <Spinner size="sm" mt={2} />
          ) : (
            <>
              <StatNumber
                fontSize={'2xl'}
                fontWeight={'medium'}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Text fontSize="inherit">
                  {typeof value !== 'undefined' ? value : 0}
                </Text>
              </StatNumber>
            </>
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
