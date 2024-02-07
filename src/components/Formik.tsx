import { Box, Button, CircularProgress, IconButton, Input, InputGroup, InputRightElement,useDisclosure} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
    .required('Name is required')
    .test('capitalize-first-letter', 'First letter must be capitalized', (value) => {
      if (!value) return true; 
      return value.charAt(0) === value.charAt(0).toUpperCase();
    }),
  email: Yup.string().email('Invalid email').required('Email is required'),
  
  password: Yup.string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be exactly 8 characters long'
  )
  .required('Password is required'),

confirmPassword: Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8}$/,
    'Confirm password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be exactly 8 characters long'
  )
  .required('Confirm password is required'),
});

interface FormikFormProps {
    setFormData: React.Dispatch<any>;
    handleModalOpen: () => void;
  }
  
function FormikForm ({ setFormData,}: FormikFormProps){
  const { onOpen,} = useDisclosure();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  
  const handleClick =()=>{
    setIsLoading(true)
    setTimeout(() => {
        setIsLoading(false)
    }, 2000);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = (values: FormikValues, { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }) => {
    if (SignupSchema.isValidSync(values)) {
      setFormData(values);
      onOpen();
      resetForm(); 
    }
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ name: '', email: '', password: '', confirmPassword: '' }} 
            validationSchema={SignupSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
         <Form>
                        <Box>
                          <Field name="name">
                            {({ field }: { field: any }) => (
                             <Input {...field} fontSize={50} type="text" placeholder="Name" />
                           )}
                         </Field>
                         <ErrorMessage name="name">
                           {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                         </ErrorMessage>
                       </Box>
             
                       <Box>
                         <Field name="email">
                           {({ field }: { field: any }) => (
                             <Input {...field} fontSize={50} type="email" placeholder="Email" />
                           )}
                         </Field>
                         <ErrorMessage name="email">
                           {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                         </ErrorMessage>
                       </Box>
       
                 <Box >
                     <Field name="password">
                       {({ field }: { field: any }) => (
                       <InputGroup style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                       <Input
                         {...field}
                         fontSize={50}
                         type={showPassword ? 'password' : 'text'}
                         placeholder="Password"
                       />
                       <InputRightElement>
                         <IconButton
                           aria-label={showPassword ? 'Hide password' : 'Show password'}
                           fontSize={30}
                           marginLeft={-1000}
                           marginBottom={-60}
                           onClick={toggleShowPassword}
                           icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                         />
                      </InputRightElement>
                  </InputGroup>
                       )}
                     </Field>
                     <ErrorMessage name="password">
                       {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                     </ErrorMessage>
                     </Box>
         
             <Box>
                     <Field name="confirmPassword">
                       {({ field }: { field: any }) => (
                      
                           <InputGroup style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                             <Input
                               {...field}
                               fontSize={50}
                               type={showConfirmPassword ? 'password' : 'text'}
                               placeholder="Confirm Password"
                             />
                             <InputRightElement>
                               <IconButton
                                 aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                 variant="ghost"
                                 fontSize={30}
                                 marginLeft={-1000}
                                 marginBottom={-60}
                                 onClick={toggleShowConfirmPassword}
                                 icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                               />
                             </InputRightElement>
                           </InputGroup>
                       )}
                     </Field>
                     <ErrorMessage name="confirmPassword">
                       {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                     </ErrorMessage>
                   </Box>
            <Box>
            <Button fontSize={30} top={20} type='submit' onClick={handleClick} >
                    {isLoading ? 'Loading...' : 'Submit'}
                            </Button>
                        {isLoading && <CircularProgress top={20} isIndeterminate color="green" />}
                        </Box>
                     
             </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
