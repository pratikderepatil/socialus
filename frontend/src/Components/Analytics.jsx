import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const Analytics = () => {
  const [userCount, setUserCount] = useState(0);
  const [topUser, setTopUser] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [topPost, setTopPost] = useState([]);
  const getUserCount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}analytics/users`)
      .then(res => {
        setUserCount(res.data.count);
      })
      .catch(err => console.log(err));
  };
  const getTopUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}analytics/users/top-active`)
      .then(res => {
        setTopUser(res.data);
      })
      .catch(err => console.log(err));
  };
  const getPostCount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}analytics/posts`)
      .then(res => {
        console.log(res);
        setPostCount(res.data.count);
      })
      .catch(err => console.log(err));
  };
  const getTopPost = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}analytics/posts/top-active`)
      .then(res => {
        console.log(res);
        setTopPost(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getUserCount();
    getTopUser();
    getPostCount();
    getTopPost();
  }, []);
  return (
    <>
      <Flex justifyContent={'left'} w="95%">
        <Link to="/dashboard">
          <Button variant={'ghost'} leftIcon={<IoIosArrowBack />}>
            Back
          </Button>
        </Link>
      </Flex>
      <Tabs isFitted variant="line" w={['90vw']}>
        <TabList mb="1em">
          <Tab>Users</Tab>
          <Tab>Posts</Tab>
        </TabList>
        <TabPanels p={['2', '5']}>
          <TabPanel>
            <Heading textAlign={'left'} mb="5" fontSize={['lg', '2xl']}>
              Total Users: {userCount}
            </Heading>
            <Heading textAlign={'left'} fontSize={['lg', '2xl']}>
              Top 5 most active users:
            </Heading>
            <Flex
              mt="5"
              wrap={'wrap'}
              gap="5"
              alignItems={'center'}
              h="auto"
              justifyContent={'center'}
            >
              {topUser?.map(ele => {
                return (
                  <Card
                    padding={5}
                    w={['full', 'full', 'full', '40vw']}
                    h="max"
                    key={ele._id}
                  >
                    <CardBody>
                      <Avatar name={ele.user[0]?.name} size={['lg', '2xl']} />
                      <Heading
                        mb="5"
                        mt="5"
                        fontSize={['lg', 'xl', '2xl', '3xl']}
                      >
                        {ele.user[0]?.name}
                      </Heading>
                      <Text fontSize={['sm', 'lg', 'xl', '2xl']}>
                        {ele.user[0]?.bio === '' ? 'No bio' : ele.user[0]?.bio}
                      </Text>
                      <Button variant={'ghost'} w="full">
                        Total Posts: {ele.count}
                      </Button>
                    </CardBody>
                  </Card>
                );
              })}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Heading textAlign={'left'} mb="5" fontSize={['lg', '2xl']}>
              Total Posts: {postCount}
            </Heading>
            <Heading textAlign={'left'} fontSize={['lg', '2xl']}>
              Top 5 most active users:
            </Heading>
            <Flex
              mt="5"
              wrap={'wrap'}
              gap="5"
              alignItems={'center'}
              h="auto"
              justifyContent={'center'}
            >
              {topPost?.map(ele => {
                return (
                  <Card key={ele._id} p={['2', '5']}>
                    <CardHeader>
                      <Flex gap="5" pl={['3', '10']} alignItems={'center'}>
                        <Avatar name={ele.user[0]?.name} size={['sm', 'lg']} />
                        <Heading mb="5" mt="5" fontSize={['mg', 'lg', 'xl']}>
                          {ele.user[0]?.name}
                        </Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text fontSize={['lg', 'xl', '2xl']} mb="2">
                        {ele.content}
                      </Text>
                      <Text textAlign={'left'} fontSize={['sm', 'md', 'lg']}>
                        likes: {ele.likes}
                      </Text>
                    </CardBody>
                  </Card>
                );
              })}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Analytics;
