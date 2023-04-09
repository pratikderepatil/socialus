import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Navbar = () => {
  return (
    <Flex
      justifyContent={'space-between'}
      p={5}
      pl={['5', '10']}
      pr={['5', '10']}
    >
      <Text fontFamily={'cursive'} fontWeight={'bold'}>
        Social Us
      </Text>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};

export default Navbar;
