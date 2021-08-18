import React, { useState, useEffect } from 'react'
import { Meteor } from 'meteor/meteor';
import { Box, Flex, Avatar } from '@chakra-ui/react';
import { useTracker } from 'meteor/react-meteor-data';
import { messagesCollection } from '/imports/db/appCollections';


export default function Conversation({ selectedUser, selectedRoom }) {
  
  const { messages } = useTracker(() => {
    let messages = []

    const senthandler = Meteor.subscribe('messages', selectedUser);
    const receivedhandler = Meteor.subscribe('received')

    if(!senthandler.ready() || !receivedhandler.ready()){
      return [];
    }

    messages = messagesCollection.find({
      'to.user' : selectedUser._id
    }).fetch();
    
    const received = messagesCollection.find({
      'from.user' : selectedUser._id
    }).fetch()

    
    received.forEach(element => {
      messages.push(element)
    });
    

    messages.sort((a, b) => {
      let dateA = a.createdAt
      let dateB = b.createdAt
      return (dateA < dateB) ? -1 : ((dateA > dateB) ? 1 : 0)
    });

    return { messages };
    
  });

 
  console.log(messages)
  return (
    <Flex direction='column' w='100%'>
      {messages?.map((message, i) => {
        if(message.from.user === selectedUser._id){
          return (
            <Flex
              key={i}
              alignSelf='flex-start'
              maxW='50%'
            >
              <Box display='inline'>
                <Avatar 
                  name={`${selectedUser.profile.firstname} ${selectedUser.profile.lastname}`}
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

        if(message.from.user === Meteor.userId()){
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
