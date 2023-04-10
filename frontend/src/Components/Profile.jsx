import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('User')) || '';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateBio, setUpdateBio] = useState('');
  const [updateName, setUpdateName] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const [details, setDetails] = useState('');
  const getProfile = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}users/${user.id}`)
      .then(res => {
        setDetails(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getProfile();
  }, []);

  const handleUserDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}users/${user.id}`)
      .then(res => {
        toast({
          title: 'User deleted successfully!',
          description: 'All posts created by you also have be deleted!',
          position: 'top',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        localStorage.removeItem('User');
        navigate('/');
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
      });
  };

  const handleUserEdit = id => {
    axios
      .put(`${process.env.REACT_APP_API_URL}users/${id}`, {
        name: updateName,
        bio: updateBio,
      })
      .then(res => {
        console.log(res);
        onClose();
      })
      .catch(err => console.log(err))
      .finally(() => getProfile());
  };
  return (
    <Card padding={5} w={['full', 'full', 'full', '50vw']} h="max-content">
      <CardBody>
        <Avatar name={details.name} size={['lg', '2xl']} />
        <Heading mb="5" mt="5" fontSize={['lg', 'xl', '2xl', '3xl']}>
          {details.name}
        </Heading>
        <Text fontSize={['sm', 'lg', 'xl', '2xl']}>
          {details.bio === '' ? 'No bio' : details.bio}
        </Text>
      </CardBody>
      <CardFooter justify="space-between" gap="4">
        <Button
          w="full"
          colorScheme="messenger"
          onClick={() => {
            onOpen();
            setUpdateBio(details.bio);
            setUpdateName(details.name);
          }}
          leftIcon={<BiEditAlt />}
        >
          Edit
        </Button>
        <Button
          w="full"
          colorScheme="red"
          onClick={handleUserDelete}
          leftIcon={<AiOutlineDelete />}
        >
          Delete
        </Button>
      </CardFooter>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Name</FormLabel>
            <Input
              value={updateName}
              onChange={({ target }) => {
                setUpdateName(target.value);
              }}
              mb="3"
            />
            <FormLabel>Bio</FormLabel>
            <Textarea
              value={updateBio}
              onChange={({ target }) => {
                setUpdateBio(target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleUserEdit(details._id);
              }}
              colorScheme="whatsapp"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Profile;
