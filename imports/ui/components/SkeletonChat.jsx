import React from 'react';
import {
  SkeletonText,   
  SkeletonCircle,
  Box,
  HStack
} from '@chakra-ui/react';

export default function UsersLoader() {
  return (
    <>
      <Box>
        <HStack mt={5}>
          <SkeletonCircle size='50'  width='50px' />
          <SkeletonText width='50%' noOfLines={1} startColor="pink.500" endColor="orange.500"/>
        </HStack>
        <HStack mt={5}>
          <SkeletonCircle size='50'  width='50px' />
          <SkeletonText width='45%' noOfLines={1} startColor="pink.500" endColor="orange.500"/>
        </HStack>
        <HStack mt={5}>
          <SkeletonCircle size='50'  width='50px' />
          <SkeletonText width='30%' noOfLines={1} startColor="pink.500" endColor="orange.500"/>
        </HStack>
        <HStack mt={5}>
          <SkeletonCircle size='50'  width='50px' />
          <SkeletonText width='30%' noOfLines={1} startColor="pink.500" endColor="orange.500"/>
        </HStack>
        <HStack mt={5}>
          <SkeletonCircle size='50'  width='50px' />
          <SkeletonText width='30%' noOfLines={1} startColor="pink.500" endColor="orange.500"/>
        </HStack>
      </Box> 
    </>
  )
}