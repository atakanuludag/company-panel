import { IconButton, useColorMode } from '@chakra-ui/react'
import { MdDarkMode, MdLightMode, MdLight } from 'react-icons/md'

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  const handleClickButton = () => toggleColorMode()

  return (
    <IconButton
      size="lg"
      variant="ghost"
      aria-label="Theme Toggle"
      onClick={handleClickButton}
      icon={colorMode === 'dark' ? <MdLight /> : <MdDarkMode />}
    />
  )
}

export default ThemeToggle
