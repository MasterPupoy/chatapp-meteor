import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Box, Avatar, AvatarBadge } from '@chakra-ui/react';

export default function Chatlist({ users, selectUser }){
  
  return (
    <>
      {users?.map((user, i) => {
        if(user._id === Meteor.userId()){
          return;
        }

        return(
          <Box 
            key={i}
            onClick={() => {
              selectUser(user)
            }}
            borderWidth='1px'
            w='100%'
            h='80px'
            p='10px'
            borderRadius='md'
            margin='10px 0px'
            _hover={{
              cursor : 'pointer'
            }}
          >
            <Avatar 
              name={`${user.profile.firstname} ${user.profile.lastname}`} 
              margin='0px 10px 0px 0px'
            >
              <AvatarBadge 
                bg={(user.profile.online) ? 'green.500' : 'red.500'}
                boxSize='1.25em'
              />
            </Avatar>
            {user.profile.firstname} {user.profile.lastname}
          </Box>
        )
      })}
    </>
  )
}