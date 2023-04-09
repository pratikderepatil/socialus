import { Flex } from '@chakra-ui/react';
import React from 'react';
import Profile from '../components/Profile';
import PostList from '../components/PostList';

const Dashboard = () => {
  return (
    <Flex
      flexDirection={['column', 'column', 'column', 'row']}
      gap="5"
      w="full"
      p="6"
      justifyContent={'space-between'}
    >
      <Profile />
      <PostList />
    </Flex>
  );
};

export default Dashboard;
