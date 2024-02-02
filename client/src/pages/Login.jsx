import React from 'react'
import { VStack , Heading, ButtonGroup, FormControl, FormLabel, Button, FormErrorMessage, Input} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },  
    validationSchema: Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required").min(5, "Password is too short")
    }),
    onSubmit: (values, actions) =>{
        alert(JSON.stringify(values, null, 2))
        actions.resetForm()
    }
  });


  return (
    <VStack as="form" w={{base: "90%", md: "500px"}} spacing={"1rem"} m="auto" justify={"center"} h={"100vh"} onSubmit={formik.handleSubmit}>
        <Heading size={"2xl"}>Log In</Heading>
        <FormControl isInvalid={formik.errors.username && formik.touched.username}>
            <FormLabel size={"lg"}>Username</FormLabel>
            <Input name='username' size={"lg"} value={formik.values.username} placeholder='Enter username' autoComplete='off' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>


        <FormControl isInvalid={formik.errors.password && formik.touched.password}>
        <FormLabel size={"lg"}>Password</FormLabel>
            <Input name='password' size={"lg"} value={formik.values.password} placeholder='Enter password' type='password' autoComplete='off' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <ButtonGroup paddingTop={"1rem"}>
            <Button colorScheme="teal" variant="solid" type='submit'>Login</Button>
            <Button colorScheme="teal" variant="outline" onClick={() => navigate('/register')}>Signup</Button>
        </ButtonGroup>
    </VStack>
  )
}

export default Login