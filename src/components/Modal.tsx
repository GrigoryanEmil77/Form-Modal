import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader,
         ModalBody, ModalFooter} from '@chakra-ui/react';
    
function CustomModal ({ isOpen, onClose, formData }: { isOpen: boolean; onClose: () => void; formData: any }){
      return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent position="fixed" bottom={70} left={700} width="30%">
            <ModalHeader fontSize="40px">Form Data</ModalHeader>
            <ModalBody fontSize={10}>
              <h1>{JSON.stringify(formData, null, 2)}</h1>
            </ModalBody>
            <ModalFooter>
              <Button fontSize={30} color="green" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    };
    
    export default CustomModal;
    