import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea, 
  Avatar,
  Button,
  Box,
  HStack
} from '@chakra-ui/react';
import {AddIcon, CloseIcon} from '@chakra-ui/icons';
import { Meteor } from 'meteor/meteor';


export default function DrawerSettings({ isOpen, setDrawer, room, users }) {
  const firstField = React.useRef()
  const onClose = () => {
    setDrawer(prevState => !prevState)
  }
  const master = Meteor.users.findOne({ _id : room.master})

  console.log(master)

  const kickMember = (user) => {
    Meteor.call('kick.participant', user, room._id, (err, result) => {
      if(err){
        console.log(err)
      }
    })
  }

  const addMember = (user) => {
    Meteor.call('add.participant', user, room._id, (err, result) => {
      if(err){
        console.log(err)
      }
    })
  }

  const deleteGC = (room) => {
    Meteor.call('delete.room', room._id, (err, result) => {
      if(err){
        console.log(err)
      }

      onClose()
    })
  }

  console.log(room)
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {room.room_name}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">
                  Owner : {master?.profile?.firstname}&nbsp;{master?.profile?.lastname}
                </FormLabel>
                <FormLabel htmlFor="username">Kick member</FormLabel>
                <Box>
                  {room?.participants?.map((person, i) => {
                    if(person._id === master._id){
                      return;
                    }

                    return (
                      <HStack key={i}>
                        <Box>
                          <Avatar 
                            name={`${person.profile.firstname} ${person.profile.lastname}`} 
                            margin='0px 10px 0px 0px'
                            size='sm'
                          >
                          </Avatar>
                        </Box>
                        <Box w='100%'>
                          {person.profile.firstname} {person.profile.lastname}
                        </Box>
                        <Box w='100%' textAlign='right'>
                          <Button 
                            colorScheme="red" 
                            variant="solid"
                            w='10px'
                            borderRadius='200px'
                            onClick={() => {
                              kickMember(person, room)
                            }}
                          >
                            <CloseIcon />
                          </Button>
                        </Box>
                      </HStack>
                    )  
                  })
                  
                  }
                </Box>
              </Box>


              <Box>
                <FormLabel htmlFor="username">Add member</FormLabel>
                <Box>
                  {users?.map((person, i) => {
                    if(room?.participants?.some(member => member._id === person._id)){
                      return;
                    }

                    return (
                      <HStack key={i}>
                        <Box>
                          <Avatar 
                            name={`${person.profile.firstname} ${person.profile.lastname}`} 
                            margin='0px 10px 0px 0px'
                            size='sm'
                          >
                          </Avatar>
                        </Box>
                        <Box w='100%'>
                          {person.profile.firstname} {person.profile.lastname}
                        </Box>
                        <Box w='100%' textAlign='right'>
                          <Button 
                            colorScheme="teal" 
                            variant="solid"
                            w='10px'
                            borderRadius='200px'
                            onClick={() => {
                              addMember(person, room)
                            }}
                          >
                            <AddIcon />
                          </Button>
                        </Box>
                      </HStack>
                    )  
                  })
                  
                  }
                </Box>
              </Box>

              <Box>
               
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button colorScheme='red' onClick={() => {
              deleteGC(room)
            }}>
              Delete Group Chat
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
