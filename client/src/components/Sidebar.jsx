import React from 'react'
import { Circle, Divider,Text, VStack, HStack, Heading } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { Tab, TabList } from '@chakra-ui/react'
import { FriendContext } from '../pages/Home'

const Sidebar = () => {
  const {friendList, setFriendList} = React.useContext(FriendContext);    
  return (
    <VStack py={'1.4rem'}>
        <HStack justify={'space-evenly'} w={'100%'}>
            <Heading size="md">Add Friend</Heading>
            <Button>
                <ChatIcon/>
            </Button>
        </HStack>
        <Divider/>
            <VStack as={TabList}>
            {
                friendList.map((friend, index) => {
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
  )
}

export default Sidebar