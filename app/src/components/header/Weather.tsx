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
import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherShower,
  TiWeatherStormy,
  TiWeatherSnow,
  TiWeatherWindy,
} from 'react-icons/ti'
import useWeatherQuery from '@/hooks/queries/useWeatherQuery'

const getWeatherIcon = (iconCode: string | undefined, fontSize: string) => {
  switch (iconCode) {
    case '01d':
    case '01n':
      return <TiWeatherSunny fontSize={fontSize} />
    case '02d':
    case '02n':
      return <TiWeatherPartlySunny fontSize={fontSize} />
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return <TiWeatherCloudy fontSize={fontSize} />
    case '09d':
    case '09n':
      return <TiWeatherDownpour fontSize={fontSize} />
    case '10d':
    case '10n':
      return <TiWeatherShower fontSize={fontSize} />
    case '11d':
    case '11n':
      return <TiWeatherStormy fontSize={fontSize} />
    case '13d':
    case '13n':
      return <TiWeatherSnow fontSize={fontSize} />
    case '50d':
    case '50n':
      return <TiWeatherWindy fontSize={fontSize} />
    default:
      return <></>
  }
}

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
                fontSize="0.5em"
                padding="1"
                top="-15px"
                right="-20px"
              >
                {`${data?.temp.toFixed(0)}°`}
              </Badge>
              {getWeatherIcon(data?.icon, '25px')}
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
            {data && (
              <>
                {getWeatherIcon(data?.icon, '50px')}
                <Text fontSize="2xl">
                  {data?.description} {`${data?.temp.toFixed(0)}°C`}
                </Text>
              </>
            )}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default WeatherHeader
