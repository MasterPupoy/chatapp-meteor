import React from 'react';
import { useColorMode, Button } from '@chakra-ui/react';

export default function Toggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </header>
  )
}