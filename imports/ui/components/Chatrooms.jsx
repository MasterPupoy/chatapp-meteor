import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { 
  Box,
  Button,
  AvatarGroup, 
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import AddRoomForm from './AddRoomForm';
import { SettingsIcon } from '@chakra-ui/icons';
import DrawerSettings from './Drawer';

export default function Chatrooms({ rooms, selectRoom, users }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [participants, setParticipants] = useState([]);
  const [group_name, setGroup_name] = useState('');
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [drawerRoom, setDrawerRoom] = useState('');

  const createRoom = () => {
    console.log(participants, group_name)
    setLoading(true); 
    let all = participants
    
    all.push(Meteor.user()) 
    console.log(all)

    Meteor.call('create.room', group_name, all, (err, result) => {
      if(err){
        console.log(err)
      };

      setLoading(false);
      onClose();
    })

  }


  return (
    <>
      {(rooms.length <= 0) ? 
        <Box>
          No active rooms
        </Box>
      :
        <>
        {rooms.map((room, i) => {
          let participants = room.participants

          return (
            <Flex 
              borderWidth='1px'
              borderRadius='md'
              margin='10px 0px'
              key={i}
            >
              <Box 
                key={i}
                onClick={() => {
                  selectRoom(room)
                }}
                w='100%'
                minHeight='80px'
                p='10px'
                _hover={{
                  cursor : 'pointer'
                }}
              >
              <AvatarGroup size='sm' max={3}>
                {participants.map((user, i) => {
                  return (
                    <Avatar 
                      key={i}
                      name={`${user.profile.firstname} ${user.profile.lastname}`} 
                      margin='0px 10px 0px 0px'
                    />
                  )
                })}
              </AvatarGroup>
              {room.room_name}
            </Box>
            {(room.master === Meteor.userId()) ?
              <Box 
                padding='20px'
              >
                <SettingsIcon 
                  _hover={{
                    cursor : 'pointer',
                    color : '#a5a5a5'
                  }}
                  onClick={() =>{
                    setDrawer(prevState => !prevState)
                    setDrawerRoom(room)
                  }}
                />
              </Box>
            :
              ''
            }
          </Flex>
          )
        })}
        </>
      }
      <Box>
        <Button
          onClick={onOpen}
        >
          Create Room
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddRoomForm setParticipants={setParticipants} setGroup_name={setGroup_name}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="outline"
              onClick={createRoom}
              isLoading={loading}
              loadingText="Creating room..."
            >
              Create Room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DrawerSettings 
        isOpen={drawer}
        setDrawer={setDrawer}
        room={drawerRoom}
        users={users}
      />
    
    </>
  )
}

