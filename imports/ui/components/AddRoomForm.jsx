import React, { useRef, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Wrap, 
  WrapItem, 
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import UserList from './UserList';

export default function AddRoomForm({ setParticipants, setGroup_name }) {
  const [members, setMembers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { users } = useTracker(() => {
  
    const handler = Meteor.subscribe('users');

    if(!handler.ready()){
      return [];
    }

    const users = Meteor.users.find().fetch()

    return { users }
  })

  const selectUser = (user) => {
    let arrayOfMembers = members
    arrayOfMembers.push(user)
    setMembers(arrayOfMembers)
    setParticipants(arrayOfMembers)
  }

  return (
    <>
      <FormControl id="group_name" isRequired>
        <FormLabel>Group name</FormLabel>
        <Input 
          placeholder="Name of the group" 
          onChange={(e) => {
            setGroup_name(e.target.value)
          }}
          isRequired
          />
      </FormControl>
      <Box m='30px 0px'>
        <Wrap>
          {members?.map((people, i) => {

            return (
              <WrapItem 
                key={i} 
                border='1px' 
                borderRadius='lg'
                p='3px'  
              >
                <Center>
                  {people.profile.firstname}&nbsp;
                  {people.profile.lastname}
                </Center>
              </WrapItem>
            )
          })
          }
        </Wrap>
      </Box>

      <Button
        onClick={onOpen}
        colorScheme='teal'
      >
        Add People
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add People</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserList
              users={users} 
              members={members}
              selectUser={selectUser} 
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
