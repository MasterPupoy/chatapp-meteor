import React, { useContext, useState, useRef, useEffect } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Flex, 
  Textarea,
  Box, 
  Divider,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Heading
} from '@chakra-ui/react';
import Theme from '../components/ThemeIcon';
import UsersLoader from '../components/SkeletonChat';
import {FiSend, FiLogOut} from 'react-icons/fi';
import { userContext } from '../components/contexts/userContext';
import { Meteor } from 'meteor/meteor';
import Chatlist from '../components/Chatlist';
import Conversation from '../components/Conversation';
import { useTracker } from 'meteor/react-meteor-data';
import { roomsCollection } from '../../db/appCollections';
import Chatrooms from '../components/Chatrooms';
import GroupConvo from '../components/GroupConvo';


export default function Dashboard({ setAuth }){
  const user = Meteor.user()
  const history = useHistory();
  const location = useLocation();
  const message = useRef(null)

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRoom, setRoom] = useState('');

  const { users } = useTracker(() => {
    
    const handler = Meteor.subscribe('users');

    if(!handler.ready()){
      return [];
    }

    const users = Meteor.users.find().fetch()
    
    return { users }
  })
  
  const { rooms } = useTracker(() => {
    
    const handler = Meteor.subscribe('rooms');

    if(!handler.ready()){
      return [];
    }

    const rooms = roomsCollection.find().fetch()

    return { rooms };
  })

  const selectUser = (user) => {
    setRoom('')
    setSelectedUser(user)
  }

  const selectRoom = (room) => {
    setSelectedUser('')
    setRoom(room)
  }
  
  const sendMessage = () => {
    const messages = message.current.value
    
    
    console.log(selectedRoom === '')
    if(selectedUser !== '' && selectedRoom === ''){
      console.log('fired')
      const user1 = {
        user: Meteor.userId(),
        firstname: Meteor.user().profile.firstname,
        lastname: Meteor.user().profile.lastname
      }
  
      const user2 = {
        user: selectedUser._id,
        firstname: selectedUser.profile.firstname,
        lastname: selectedUser.profile.lastname
      }

  
      return Meteor.call('send.message', user1, user2, messages, (err, result) => {
        if(err){
          console.log(err);
        }
  
        message.current.value = ''
      })
    }

    if(selectedRoom !== '' && selectedUser === ''){
      const user = Meteor.user()
      const from = {
        userId: user._id,
        firstname: user.profile.firstname,
        lastname: user.profile.lastname
      }

      return Meteor.call('send.group_message', selectedRoom._id, from, messages, (err, result) => {
        if(err){
          console.log(err)
        }

        message.current.value = ''
      })
    }
  } 
  
  const logout = () => {
    Meteor.call('users.logout', (Meteor.userId()), (err, result) => {
      if(err){
        console.log(err)
      }
    })


    Meteor.logout(() => {
      setAuth(false)
      history.push("/", {
        state: { from: location }
      })
    })
  }

  if(!user || !Meteor.userId()){
    return <Redirect to='/' />
  }
  

  return(
    <Flex height='97vh' overflowY='auto'>
      <Box w='25%' >
        <Tabs size='md' variant="enclosed-colored" colorScheme="whatsapp">
          <TabList>
            <Tab>Chat</Tab>
            <Tab>Groups</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {(users) ? 
                <>
                  {(users.length <= 0) ?
                      <Box>
                        No active users
                      </Box>
                    :
                      <Chatlist
                        users={users}
                        selectUser={selectUser}
                      />
                  } 
                </>
              :  
                <UsersLoader />
              }
            </TabPanel>
            <TabPanel>
              {(rooms) ? 
                <Chatrooms
                  rooms={rooms}
                  selectRoom={selectRoom}
                  users={users}
                />
              :  
                <UsersLoader />
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Divider orientation='vertical' colorScheme='blackAlpha' width='10px' />
      <Box w='75%' id='convo'>
        <Box textAlign='right' paddingTop='3px'>
          <span style={{marginRight : '20px'}}>
            {user?.profile?.firstname}&nbsp;
            {user?.profile?.lastname}
          </span>
          <Theme />
          <Button
            borderRadius='2px'
            marginLeft='10px'
            colorScheme='teal'
            _hover={{ 
              bg: '#c70039',
              color: '#fff'
            }}
            onClick={logout}
          >
            <FiLogOut />
            &nbsp;Log-out
          </Button>
        </Box>
        <Box paddingBottom='20px' position='absolute' zIndex='1'>
          <Heading as="h3">
            {(selectedRoom === '') ? 
              
                (selectedUser === '') ?
                ``
                :
                `
                ${selectedUser?.profile?.firstname}
                ${selectedUser?.profile?.lastname}
                `
              
              :
                `${selectedRoom?.room_name}`
            }
          </Heading>
        </Box>
        <Box 
          height='550px' 
          overflowY='auto'
          marginTop='50px'
       
        >
        {(selectedRoom === '') ?
            <Conversation 
              selectedUser={selectedUser} 
            />
          :
            <GroupConvo
              selectedRoom={selectedRoom}
            />
        }
        </Box>
        <Divider orientation='horizontal' colorScheme='blackAlpha' width='100%' />
        <Box>
          <Textarea
            placeholder="Send message"
            size="lg"
            width="80%"
            minHeight="10px"
            resize="none"
            marginTop="20px"
            borderRadius="5px"
            colorScheme='teal'
            ref={message}
          />
          <Button
            colorScheme='teal'
            margin='10px 0px 0px 50px'
            width='10%'
            height='55px'
            borderRadius='100px'
            onClick={() => {
              sendMessage()
            }}
          >
            <FiSend fontSize='30px' />
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}