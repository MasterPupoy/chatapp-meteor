import React, { useState, useEffect } from 'react'
import { Meteor } from 'meteor/meteor';
import { Box, Flex, Avatar, Center, Heading } from '@chakra-ui/react';
import { useTracker } from 'meteor/react-meteor-data';
import { messagesCollection } from '/imports/db/appCollections';


export default function GroupConvo({ selectedRoom }) {
  
  const { messages } = useTracker(() => {
    const senthandler = Meteor.subscribe('group_messages', selectedRoom);

    if(!senthandler.ready()){
      return [];
    }

    const messages = messagesCollection.find({
      'roomId' : selectedRoom._id
    }).fetch();

    return { messages };
    
  });

  
  if(!selectedRoom.participants.some(members => members._id === Meteor.userId())){
    return (
      <Box>
        <Center mt='25%'>
            You're not a member of this group
        </Center>
      </Box>
    )
  }
 
  console.log(messages)
  return (
    <Flex direction='column' w='100%'>
      {messages?.map((message, i) => {
        if(message.from.userId !== Meteor.userId()){
          return (
            <Flex
              key={i}
              alignSelf='flex-start'
              maxW='50%'
            >
              <Box display='inline'>
                <Avatar 
                  name={`${message.from.firstname} ${message.from.lastname}`}
                  margin='0px 10px 0px 0px'
                  size='sm'
                />
              </Box>
              <Box
                bg='teal.400'
                p='10px 20px'
                borderRadius='2px'
                m='2px 0px'
              >
                {message.message}
              </Box>
            </Flex>
          )
        }

        if(message.from.userId === Meteor.userId()){
          return (
            <Box 
              alignSelf='flex-end' 
              key={i}
              maxW='50%'
            >
              <Box
                bg='cyan.400'
                p='10px 20px'
                borderRadius='2px'
                m='2px 0px'
              >
                {message.message}
              </Box>
            </Box>
          )
        }
      })}
    </Flex>
  )
}