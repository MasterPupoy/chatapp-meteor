import React from 'react';
import { 
  Box, 
  Center, 
  Heading
} from "@chakra-ui/react";
import { GiThunderStruck } from 'react-icons/gi';

export default function NotFound() {

  return (
    <Box>
      <Box textAlign='right'>
        <GiThunderStruck fontSize='50px' />
      </Box>
      <Center>
        <Heading as='h2'>404 | Resource not found</Heading>
      </Center>      
    </Box>
  )
}