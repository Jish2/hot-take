import React from 'react'
import { Button, Modal, ModalOverlay, ModalHeader,
ModalCloseButton,ModalBody, Textarea, ModalFooter, ModalContent} from '@chakra-ui/react'


const handlePostSubmit = (e) => {
    e.preventDefault()
    // POST request
  }

export default function UploadHotTake( { isOpen, onClose } ) {

    
      return (
        <>
      
          <Modal isOpen={isOpen} onClose={onClose} motionPreset='scale'
            isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a post</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handlePostSubmit}>
                <ModalBody>
                  <Textarea placeholder='Share you hot take up to 140 words!' />
                </ModalBody>
      
                <ModalFooter>
                  <Button colorScheme='blue' type="submit">
                    Post to UCI
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </>
      )




  
}



