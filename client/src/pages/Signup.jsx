import React from 'react'
import { Text, VStack, Heading, ButtonGroup, FormControl, FormLabel, Button, FormErrorMessage, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AccountContext } from '../components/AccountContext'


const Signup = () => {
  const { setUser } = React.useContext(AccountContext);
  const navigate = useNavigate()
  const [error, setError] = React.useState(null);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required").min(5, "Password is too short")
    })
    ,
    onSubmit: (values, actions) => {
      const vals = { ...values };
      actions.resetForm();
      fetch("http://localhost:3000/auth/register", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vals)
      }).catch(err => console.log(err))
        .then(res => {
          if (!res || !res.ok || res.status >= 400) {
            throw new Error("Failed to create account")
          }
          return res.json();
        })
        .then(data => {
          if (!data) return;
          console.log(data);
          setUser({ ...data });
          if (data.status) { setError(data.status); return; }
          else {
            navigate('/home')
          }
        })
    }
  });


  return (
    <VStack as="form" w={{ base: "90%", md: "500px" }} spacing={"1rem"} m="auto" justify={"center"} h={"100vh"} onSubmit={formik.handleSubmit}>
      <Heading size={"2xl"}>Create An Account</Heading>
      <Text color="red.500">{error}</Text>
      <FormControl isInvalid={formik.errors.username && formik.touched.username}>
        <FormLabel size={"lg"}>Username</FormLabel>
        <Input name='username' size={"lg"} value={formik.values.username} placeholder='Enter username' autoComplete='off' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>


      <FormControl isInvalid={formik.errors.password && formik.touched.password}>
        <FormLabel size={"lg"}>Password</FormLabel>
        <Input name='password' size={"lg"} value={formik.values.password} placeholder='Enter password' type='password' autoComplete='off' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>
      <ButtonGroup paddingTop={"1rem"}>
        <Button colorScheme="teal" variant="solid" type='submit'>Create Account</Button>
        <Button colorScheme="teal" variant="outline" onClick={() => navigate('/')}>Log In</Button>
      </ButtonGroup>
    </VStack>
  )
}

export default Signup