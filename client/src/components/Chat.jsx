import React from 'react'
import { VStack } from '@chakra-ui/react';
import { TabPanels, TabPanel } from '@chakra-ui/react';

const Chat = () => {
  return (
    <VStack>
        <TabPanels>
            <TabPanel>one</TabPanel>
            <TabPanel>two</TabPanel>
        </TabPanels>
    </VStack>
  )
}

export default Chat