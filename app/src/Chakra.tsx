import { ReactNode } from 'react'
import {
  ChakraProvider,
  extendTheme,
  type ThemeOverride,
} from '@chakra-ui/react'
import BrowserDarkMode from '@/utils/BrowserDarkMode'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.css'

const config: ThemeOverride = {
  initialColorMode: BrowserDarkMode() ? 'dark' : 'light',
  useSystemColorMode: false,
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    container: 'Inter, sans-serif',
  },
}

const theme = extendTheme({ ...config })

interface IChakra {
  children: ReactNode
}

function Chakra({ children }: IChakra) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default Chakra
