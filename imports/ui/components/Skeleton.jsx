import React from 'react';
import {
  Skeleton,   
  Box
} from '@chakra-ui/react';

export default function MessageLoader() {
  return (
    <>
      <Box marginRight='30%'>
        <Skeleton borderRadius='5px' width='100%' height='70px' margin='20px 0px' startColor="pink.500" endColor="orange.500"/>
      </Box>
      <Box marginLeft='30%'>
        <Skeleton borderRadius='5px' width='100%' height='70px' margin='20px 0px'startColor="pink.500" endColor="orange.500"/>
      </Box>
      <Box marginRight='50%'>
        <Skeleton borderRadius='5px ' width='100%' height='100px' margin='20px 0px'startColor="pink.500" endColor="orange.500"/>
      </Box>
      <Box marginLeft='55%'>
        <Skeleton borderRadius='5px' width='100%' height='100px' margin='20px 0px' startColor="pink.500" endColor="orange.500"/>
      </Box>
      <Box marginLeft='85%'>
        <Skeleton borderRadius='5px' width='100%' height='50px' margin='20px 0px' startColor="pink.500" endColor="orange.500"/>
      </Box>
      <Box marginRight='70%'>
        <Skeleton borderRadius='5px' width='100%' height='100px' margin='20px 0px' startColor="pink.500" endColor="orange.500"/>
      </Box>
      <Box marginLeft='65%'>
        <Skeleton borderRadius='5px' width='100%' height='50px' margin='20px 0px' startColor="pink.500" endColor="orange.500"/>
      </Box>
    </>
  )
}