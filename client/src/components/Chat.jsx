import React from 'react'
import { VStack } from '@chakra-ui/react';
import { TabPanels, TabPanel } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { FriendContext } from '../pages/Home';
const Chat = () => {
  const {friendList} = React.useContext(FriendContext);
  return friendList.length > 0 ? (
    <VStack>
        <TabPanels>
            <TabPanel>one</TabPanel>
            <TabPanel>two</TabPanel>
        </TabPanels>
    </VStack>
  ):(
    <VStack justify='center' pt={'5rem'} w={'100%'} textAlign={'center'} fontSize={'large'}>
          <Text>No Friends Click add friend to start chatting</Text>
    </VStack>
  );
}

export default Chat