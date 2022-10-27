import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import useStoreConfirmModal from '@/hooks/useStoreConfirmModal'

export default function ConfirmModalComponent() {
  const { confirmModalStore, setConfirmModalStore, clearConfirmModalStore } =
    useStoreConfirmModal()
  const { open, title, content, loading } = confirmModalStore

  const handleConfirmButton = () => {
    setConfirmModalStore({
      ...confirmModalStore,
      confirm: true,
    })
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={open}
      onClose={clearConfirmModalStore}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton disabled={loading} />

        <ModalBody pb={6}>{content}</ModalBody>
        <ModalFooter>
          <Button
            isLoading={loading}
            colorScheme="blue"
            mr={3}
            onClick={handleConfirmButton}
          >
            Evet
          </Button>
          <Button onClick={clearConfirmModalStore} disabled={loading}>
            Kapat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
