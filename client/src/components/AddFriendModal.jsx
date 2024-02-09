import React from 'react'
import { Input, Modal , ModalBody, ModalHeader, FormControl, FormErrorMessage, FormLabel,Button, ModalContent, ModalFooter} from '@chakra-ui/react'
import { ModalOverlay, ModalCloseButton } from '@chakra-ui/react'
import {Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
const AddFriendModal = ({isOpen, onClose}) => {


  const formik = useFormik({
    initialValues: {
      friendName: ''
    }, 
    validationSchema: Yup.object({
      friendName: Yup.string().required("Username is required").min(6, "Invlaid Username").max(20, "Invalid Username")
    }),
    onSubmit: (values, actions) =>{
      onClose();
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    }
  });


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Add Friend</ModalHeader>
        <ModalCloseButton/>
        <Formik {...formik}>
        <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
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