import React, { useCallback } from 'react'
import { Input, Modal , ModalBody, ModalHeader, FormControl, FormErrorMessage, FormLabel,Button, ModalContent, ModalFooter, Heading} from '@chakra-ui/react'
import { ModalOverlay, ModalCloseButton } from '@chakra-ui/react'
import {Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import socket from '../socket'
import {FriendContext} from '../pages/Home'


const AddFriendModal = ({isOpen, onClose}) => {
  const [error, setError] = React.useState('');

  const closeModal = useCallback(
    () => {
      setError('');
      onClose();
    },
    [onClose],
  )
  const {setFriendList} = React.useContext(FriendContext);

  const formik = useFormik({
    initialValues: {
      friendName: ''
    }, 
    validationSchema: Yup.object({
      friendName: Yup.string().required("Username is required").min(6, "Invlaid Username").max(20, "Invalid Username")
    }),
    onSubmit: (values, actions) =>{
      socket.emit("add_friend", values.friendName, ({errorMsg, done}) => {
        if(done){
          setFriendList(c => [values.friendName, ...c]) 
          return;
        }else{
          setError(errorMsg);
        }
      });
    }
  });


  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Add Friend</ModalHeader>
        <ModalCloseButton/>
        <Formik {...formik}>
        <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Heading as={'p'} color={'red.500'} textAlign={'center'} fontSize={'large'}>{error}</Heading>
        <FormControl isInvalid={formik.errors.friendName && formik.touched.friendName}>
        <FormLabel size={"lg"}>Username</FormLabel>
            <Input name='friendName' size={"lg"} value={formik.values.friendName} placeholder='Enter Friend Username' type='text' autoComplete='off' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <FormErrorMessage>{formik.errors.friendName}</FormErrorMessage>
        </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button type='submit'>Submit</Button>
        </ModalFooter>
        </Form>
        </Formik>
        </ModalContent>
    </Modal>
  )
}

export default AddFriendModal