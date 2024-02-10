import React from 'react'
import { Grid, GridItem, Tabs } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import useSocketSetup from '../components/useSocketSetup';

export const  FriendContext = React.createContext();

const Home = () => {
  const [friendList, setFriendList] = React.useState([]);
  useSocketSetup(setFriendList);
  return (
    <FriendContext.Provider value={{friendList, setFriendList}}>
    <Grid templateColumns='repeat(10, 1fr)' h='100vh' as={Tabs}>
        <GridItem colSpan='3' borderRight='1px solid gray'>
            <Sidebar/>
        </GridItem>
        <GridItem colSpan='7'>
          <Chat/>
        </GridItem>
    </Grid>
    </FriendContext.Provider>
  )
}

export default Home