import React from 'react'
import { Circle, Divider,Text, VStack, HStack, Heading } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { Tab, TabList } from '@chakra-ui/react'
import { FriendContext } from '../pages/Home'
import AddFriendModal from './AddFriendModal'
import { useDisclosure } from '@chakra-ui/react'

const Sidebar = () => {
  const {friendList, setFriendList} = React.useContext(FriendContext);
  console.log(friendList);    
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
    <VStack py={'1.4rem'}>
        <HStack justify={'space-evenly'} w={'100%'}>
            <Heading size="md">Add Friend</Heading>
            <Button onClick={onOpen}> 
                <ChatIcon/>
            </Button>
        </HStack>
        <Divider/>
            <VStack as={TabList}>
            {
                Object.entries(friendList).map(([key, friend], index) => {
                    return (
                      <HStack as={Tab} key={index}>
                        <Circle bg={friend.connected ? "green.500": "red.500"} w="15px" h="15px"/>
                        <Text>{friend.username}</Text>
                      </HStack>
                    )
                  })
            }
            </VStack>
    </VStack>
    <AddFriendModal isOpen={isOpen} onClose={onClose}/>
    </>

  )
}

export default Sidebar