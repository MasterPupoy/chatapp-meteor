import React, { useRef, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { 
  Box, 
  Center, 
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  useToast
} from "@chakra-ui/react";
import Toggle from '../components/Toggle';
import { GiThunderStruck } from 'react-icons/gi';
import { Meteor } from 'meteor/meteor';

export default function Login({ setAuth }) {
  const username = useRef(null);
  const password = useRef(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    setLoading(true)

      let user = username.current.value.trim();
      let pass = password.current.value.trim();

    if(!user || !pass){
      setLoading(false)
      return toast({
        position: 'bottom-right',
        title: 'Check again',
        description: 'username or password cannot be empty',
        status: 'warning',
        isClosable: true
      })
    }

    Meteor.loginWithPassword(user, pass, (err, result) => {
      if(err){  
        setLoading(false)
        return toast({
          position: 'bottom-right',
          title: 'Invalid',
          description: 'Invalid username or password',
          status: 'error',
          isClosable: true,
        })
      }

      Meteor.call('users.login', (Meteor.userId()), (err, result) => {
        if(err){
          setLoading(false)
          return toast({
            position: 'bottom-right',
            title: 'Oops',
            description: 'Something went wrong',
            status: 'error',
            isClosable: true,
          })
        }

        setAuth(true);
        history.push('/hermes');
      })
    }) 
  }

  return (
    <Box>
      <Box textAlign='right'>
        <Toggle />
      </Box>
      <Center>
        <Box width="500px" borderWidth="3px" borderRadius="6px" overflow="hidden" marginTop='100px' padding='20px'>
          <Box paddingBottom='15px' width='100%' textAlign='center'>
            <Heading as='h4'>
              <GiThunderStruck />
              Sign-in
            </Heading>
          </Box>
          <Box>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
                <Input width='100%' size='lg' type="text" placeholder="username" ref={username} />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
                <Input width='100%' size='lg' type="password" placeholder="password" ref={password} />
            </FormControl>

            <Button 
              marginTop='10px' 
              colorScheme="teal" 
              size="md"
              borderRadius="2px"
              onClick={login}
              isLoading={loading}
              loadingText='Signing-in'
            >
              Sign-in
            </Button>
          </Box>
          <Box padding='10px 5px' fontSize='13px'>
            Not yet registered?&nbsp; 
            <Link to='/register'>
              <Text as='u'>
                Sign-up now!
              </Text>
            </Link>
          </Box>
        </Box>
      </Center>      
    </Box>
  )
}