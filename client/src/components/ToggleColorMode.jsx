import React from 'react'
import { useColorMode } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ToggleColorMode = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Button onClick={e => toggleColorMode()}
        position="absolute"
        top="1rem"
        right="1rem"
        zIndex="999"
        variant="ghost"
        color="current"
        m="1rem"
    >
        {colorMode === "dark"? <SunIcon/> : <MoonIcon/>}
    </Button>
  )
}

export default ToggleColorMode