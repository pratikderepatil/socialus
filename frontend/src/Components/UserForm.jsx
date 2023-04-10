import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const initState = {
  email: '',
  password: '',
  name: '',
  bio: '',
};
const UserForm = () => {
  const [form, setForm] = useState(initState);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);
  const handleInput = ({ target }) => {
    const { value, name } = target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = () => {
    setLoading(true);
    console.log(form);
    axios
      .post(`${process.env.REACT_APP_API_URL}users`, { ...form })
      .then(res => {
        toast({
          title: 'Account created successfully!',
          description: "It's a start of something amazing.",
          position: 'top',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        console.log(res);
        setLoading(false);
        navigate('/login');
      })
      .catch(err => {
        if (err.response.status === 409) {
          toast({
            title: 'This email is already in use.',
            description: 'Please try with new email.',
            position: 'top',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Internal server error!',
            description: 'Please try after sometime.',
            position: 'top',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
        setLoading(false);
      });
  };
  return (
    <Flex minH="80vh" w="full" justifyContent={'center'} alignItems={'center'}>
      <Card padding={5} w={['full', '70vw', '50vw', '40vw', '30vw']}>
        <CardBody>
          <VStack gap={3}>
            <FormControl isRequired>
              <FormLabel>Name </FormLabel>
              <Input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email </FormLabel>
              <Input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="password"
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleInput}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Bio </FormLabel>
              <Input
                required
                type="text"
                name="bio"
                value={form.bio}
                onChange={handleInput}
              />
            </FormControl>
            <Text fontSize={'md'}>
              Already have an Account{' '}
              <Link to="/login">
                <Button variant={'link'} colorScheme="messenger">
                  Login
                </Button>
              </Link>
            </Text>
          </VStack>
        </CardBody>
        <CardFooter>
          <Button
            w="full"
            onClick={handleSubmit}
            colorScheme={'messenger'}
            isLoading={loading}
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default UserForm;
