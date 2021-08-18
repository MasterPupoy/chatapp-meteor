import React, { useRef, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Box, 
  Heading,
  Center,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import Toggle from '../components/Toggle';
import { Redirect } from 'react-router-dom';

export default function Register(){
  const firstname = useRef(null);
  const lastname = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const verify_password = useRef(null);
  const toast = useToast();
  const [success, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const register = (e) => {
    e.preventDefault()
    setLoading(true);
    
    if(
      !username.current.value || !firstname.current.value ||
      !lastname.current.value || !password.current.value
    ){
      return toast({
        position: 'bottom-right',
        title: 'Check again',
        description: 'Please fill-up all fields',
        status: 'warning',
        isClosable: true
      })
    }

    if(password.current.value !== verify_password.current.value){
      return toast({
        position: 'bottom-right',
        title: 'Oops!',
        description: 'Passwords dont match',
        status: 'error',
        isClosable: true
      })
    }

    const user = {
      username: username.current.value.trim(),
      firstname: firstname.current.value.trim(),
      lastname: lastname.current.value.trim(),
      password: password.current.value.trim()
    }
    
    Meteor.call('users.register', user, (err, result) => {
      if(err === "Username already exists."){
         return toast({
          position: 'bottom-right',
          title: 'Error',
          description: 'Something went wrong!',
          status: 'error',
          isClosable: true
        })
      }

      return toast({
        position: 'bottom-right',
        title: 'Success',
        description: 'Registered successfully!',
        status: 'success',
        isClosable: true,
        duration: 3000,
        onCloseComplete: () => {
          return setSucess(true)
        }
      })
    })
  }

  if(success){
    return <Redirect to='/' />
  }

  return(
    <Box>
      <Box textAlign='right'>
        <Toggle />
      </Box>
      <Center>
        <Box textAlign='left'>
          <Box padding='20px 0px'>
            <Heading as='h4'>Register</Heading>
          </Box>
          <Box width='500px'>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
                <Input width='100%' 
                  size='lg' 
                  type="text" 
                  placeholder="username" 
                  isRequired 
                  ref={username}
                />
            </FormControl>
          
            <FormControl id="firstname">
              <FormLabel>First Name</FormLabel>
                <Input 
                width='100%' 
                size='lg' 
                type="text" 
                placeholder="firstname" 
                isRequired
                ref={firstname}
                />
            </FormControl>

             <FormControl id="lastname">
              <FormLabel>Last Name</FormLabel>
                <Input 
                width='100%' 
                size='lg' 
                type="text" 
                placeholder="lastname" 
                isRequired
                ref={lastname}
                />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
                <Input 
                  width='100%' 
                  size='lg' 
                  type="password" placeholder="password" 
                  isRequired
                  ref={password}
                />
            </FormControl>

            <FormControl id="verify_password">
              <FormLabel>Confirm Password</FormLabel>
                <Input 
                width='100%' 
                size='lg' 
                type="password" 
                placeholder="confirm password" 
                isRequired
                ref={verify_password}
                />
            </FormControl>
          
            <Button 
              type='submit'
              marginTop='20px'
              padding='20px'
              colorScheme='teal'
              variant='outline'
              borderRadius='2px'
              onClick={register}
              isLoading={loading}
              loadingText="Registering"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Center>

    </Box>
  )
}