import React from 'react';
import { Meteor } from 'meteor/meteor';
import { 
  Box, 
  Avatar, 
  AvatarBadge, 
  Button, 
  HStack
} from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';

export default function UserList({ members, users, selectUser }){

  // const selected = (e) => {
  //   e.target.innerHTML = `<svg viewBox="0 0 14 14" focusable="false" class="chakra-icon css-onkibi"><g fill="currentColor"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></g></svg>`
  //   e.target.disabled = true
  // }

  

  return (
    <>
      {users?.map((user, i) => {
        if(user._id === Meteor.userId()){
          return;
        }

        if(members.some(person => person.profile.firstname === user.profile.firstname)){
          return (
            <Box
              key={i}
              borderWidth='1px'
              w='100%'
              h='80px'
              p='10px'
              borderRadius='md'
              margin='10px 0px'
            >
              <HStack>
                <Box>
                  <Avatar 
                    name={`${user.profile.firstname} ${user.profile.lastname}`} 
                    margin='0px 10px 0px 0px'
                  >
                    <AvatarBadge 
                      bg={(user.profile.online) ? 'green.500' : 'red.500'}
                      boxSize='1.25em'
                    />
                  </Avatar>
                </Box>
                <Box w='100%'>
                  {user.profile.firstname} {user.profile.lastname}
                </Box>
                <Box w='100%' textAlign='right'>
                  <Button 
                    colorScheme="teal" 
                    variant="solid"
                    w='30px'
                    borderRadius='200px'
                    isDisabled={true}
                  >
                    <CheckIcon />
                  </Button>
                </Box>
              </HStack>
            </Box>
          )

        }

        return(
          <Box
            key={i}
            borderWidth='1px'
            w='100%'
            h='80px'
            p='10px'
            borderRadius='md'
            margin='10px 0px'
          >
            <HStack>
              <Box>
                <Avatar 
                  name={`${user.profile.firstname} ${user.profile.lastname}`} 
                  margin='0px 10px 0px 0px'
                >
                  <AvatarBadge 
                    bg={(user.profile.online) ? 'green.500' : 'red.500'}
                    boxSize='1.25em'
                  />
                </Avatar>
              </Box>
              <Box w='100%'>
                {user.profile.firstname} {user.profile.lastname}
              </Box>
              <Box w='100%' textAlign='right'>
                <Button 
                  colorScheme="teal" 
                  variant="solid"
                  w='30px'
                  borderRadius='200px'
                  onClick={(e) => {  
                    selectUser(user)
                    e.target.disabled = true
                  }}
                >
                 <AddIcon />   
                </Button>
              </Box>
            </HStack>
          </Box>
        )
      })}
    </>
  )
}