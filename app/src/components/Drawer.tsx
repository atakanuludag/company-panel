import {
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
  Spinner,
  Box,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import useStoreDrawer from '@/hooks/useStoreDrawer'

const FullScreenLoading = styled.div`
  position: absolute;
  z-index: 9;
  background-color: #00000087;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function DrawerComponent() {
  const { drawerStore, clearDrawerStore, setDrawerStore } = useStoreDrawer()
  const { open, title, content, loading } = drawerStore

  const handleConfirmButton = () => {
    setDrawerStore({
      ...drawerStore,
      confirm: true,
    })
  }

  return (
    <Drawer
      isOpen={open}
      placement="right"
      onClose={!loading ? clearDrawerStore : () => {}}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent position="relative">
        {loading && (
          <FullScreenLoading>
            <Spinner size="xl" />
          </FullScreenLoading>
        )}
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
        <DrawerBody>{content}</DrawerBody>
        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={clearDrawerStore}
            disabled={loading}
          >
            Kapat
          </Button>
          <Button
            type="button"
            isLoading={loading}
            colorScheme="blue"
            onClick={handleConfirmButton}
          >
            Kaydet
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
