import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { BiLike, BiDislike, BiEditAlt } from 'react-icons/bi';
import React, { useEffect, useState } from 'react';

const PostList = () => {
  const user = JSON.parse(localStorage.getItem('User')) || '';
  const [posts, setPosts] = useState([]);
  const handlePostEdit = () => {};
  const handlePostLike = id => {
    axios
      .post(`${process.env.REACT_APP_API_URL}posts/${id}/like`, {
        likedBy: user.id,
      })
      .then(res => {
        getPosts();
      })
      .catch(err => console.log(err));
  };
  const handlePostDisLike = id => {
    axios
      .post(`${process.env.REACT_APP_API_URL}posts/${id}/unlike`, {
        likedBy: user.id,
      })
      .then(res => {
        getPosts();
      })
      .catch(err => console.log(err));
  };

  const getPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}posts/`)
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Flex flexDirection={'column'} gap="5">
      {posts?.map(ele => {
        return (
          <Card key={ele._id} p={['2', '5']}>
            <CardHeader>
              <Flex gap="5" pl={['3', '10']} alignItems={'center'}>
                <Avatar name={ele.user[0].name} size={['sm', 'lg']} />
                <Heading mb="5" mt="5" fontSize={['mg', 'lg', 'xl']}>
                  {ele.user[0].name}
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
            <CardFooter justify="space-between" flexWrap="wrap">
              {ele.likedBy.includes(user.id) ? (
                <Button
                  flex="1"
                  variant="ghost"
                  leftIcon={<BiDislike />}
                  onClick={() => {
                    handlePostDisLike(ele._id);
                  }}
                >
                  Dislike
                </Button>
              ) : (
                <Button
                  flex="1"
                  variant="ghost"
                  leftIcon={<BiLike />}
                  onClick={() => {
                    handlePostLike(ele._id);
                  }}
                >
                  Like
                </Button>
              )}
              {ele.user_id === user.id ? (
                <Button
                  flex="1"
                  variant="ghost"
                  leftIcon={<BiEditAlt />}
                  onClick={handlePostEdit}
                >
                  Edit
                </Button>
              ) : (
                <></>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </Flex>
  );
};

export default PostList;
