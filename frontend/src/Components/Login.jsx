import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
        navigate('/dashboard');
      })
      .catch(err => {
        toast({
          title: 'Internal server error!',
          description: 'Please try after sometime.',
          position: 'top',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      });
  };
  return (
    <Card padding={5} w={['full', '70%', '50%', '35%', '30%']}>
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
          Signup
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
