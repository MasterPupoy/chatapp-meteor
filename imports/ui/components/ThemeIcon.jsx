import React from 'react';
import { useColorMode, Button } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function Theme() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}