import { Flex, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('User')) || '';

  return (
    <Flex
      justifyContent={'space-between'}
      alignItems="center"
      p={5}
      pl={['5', '10']}
      pr={['5', '10']}
    >
      <Link to={user.id ? '/dashboard' : '/'}>
        <Text
          fontFamily={'cursive'}
          fontWeight={'bold'}
          fontSize={['lg', '2xl', '3xl']}
        >
          Social Us
        </Text>
      </Link>
      <div>
        {user.id ? (
          <Link to="/analytics">
            <Button flex="1" variant="ghost">
              Analytics
            </Button>
          </Link>
        ) : (
          <></>
        )}
        <ColorModeSwitcher justifySelf="flex-end" />
      </div>
    </Flex>
  );
};

export default Navbar;
