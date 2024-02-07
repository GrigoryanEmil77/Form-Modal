import { useState } from 'react';
import {Box, Button } from '@chakra-ui/react';
import FormikForm from './components/Formik';
import CustomModal from './components/Modal';

function App () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    < Box style={{textAlign:"center"}}>
      <FormikForm setFormData={setFormData} handleModalOpen={handleModalOpen} />
      <Button fontSize={30} top={40}  onClick={handleModalOpen}>Open Modal</Button>
      <CustomModal isOpen={isModalOpen} onClose={handleModalClose} formData={formData} />
    </Box>
  );
};

export default App;