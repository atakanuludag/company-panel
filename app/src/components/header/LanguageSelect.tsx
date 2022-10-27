import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Box,
} from '@chakra-ui/react'
import useLocales from '@/hooks/useLocale'

export default function LanguageSelect() {
  const { allLang, currentLang, onChangeLang } = useLocales(['core'])
  return (
    <Menu>
      <MenuButton>
        <Box display="flex" alignItems="center">
          <Image
            boxSize="2rem"
            float="left"
            borderRadius="full"
            src={currentLang.icon}
            alt={currentLang.label}
            width="5"
            mr="7px"
          />
          <span>{currentLang.label}</span>
        </Box>
      </MenuButton>
      <MenuList>
        {allLang.map((l) => (
          <MenuItem
            key={l.value}
            onClick={() => onChangeLang(l.value)}
            isDisabled={currentLang.value === l.value}
          >
            <Image
              boxSize="2rem"
              float="left"
              borderRadius="full"
              src={l.icon}
              alt={l.label}
              width="5"
              mr="12px"
            />
            <span>{l.label}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
