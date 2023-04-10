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
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initState = {
  email: '',
  password: '',
};
const Login = () => {
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
    axios
      .post(`${process.env.REACT_APP_API_URL}users/login`, { ...form })
      .then(res => {
        localStorage.setItem('User', JSON.stringify({ ...res.data }));
        toast({
          title: 'Login Success!',
          description: "It's a start of something amazing.",
          position: 'top',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        window.location.href = '/dashboard';
      })
      .catch(err => {
        if (err.response.status === 401) {
          toast({
            title: 'Invalid credientials',
            description: 'Please enter valid credientials.',
            position: 'top',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
          setForm(initState);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Flex minH="80vh" w="full" justifyContent={'center'} alignItems={'center'}>
      <Card padding={5} h="auto" w={['full', '70vw', '50vw', '40vw', '30vw']}>
        <CardBody>
          <VStack gap={3}>
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
            <Text fontSize={'md'}>
              Dont have an Account?{' '}
              <Link to="/register">
                <Button variant={'link'} colorScheme="messenger">
                  Register
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
            Login
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default Login;
