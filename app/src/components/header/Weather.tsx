import {
  IconButton,
  Badge,
  Box,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
//import { TiWeatherCloudy } from 'react-icons/ti'
import useWeatherQuery from '@/hooks/queries/useWeatherQuery'

function WeatherHeader() {
  const { data, isLoading } = useWeatherQuery()

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Weather"
          isLoading={isLoading}
          icon={
            <Box position="relative">
              <Badge
                variant="solid"
                position="absolute"
                colorScheme="green"
                borderRadius="full"
                fontSize="0.6em"
                padding="1"
              >
                {`${data?.temp.toFixed(0)}°`}
              </Badge>
              <img src={data?.icon} alt={data?.description} width="45px" />
            </Box>
          }
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Hava Durumu</PopoverHeader>

        <PopoverBody>
          <Box
            display="flex"
            flexDirection="column"
            alignContent="center"
            alignItems="center"
          >
            <img src={data?.icon} alt={data?.description} width="100px" />
            <Text fontSize="2xl">
              {data?.description} {`${data?.temp.toFixed(0)}°C`}
            </Text>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default WeatherHeader
