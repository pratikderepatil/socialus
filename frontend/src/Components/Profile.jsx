import { Avatar, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('User')) || '';

  const [details, setDetails] = useState('');
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}users/${user.id}`)
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <Card padding={5} w={['full', '40%', '40%']} h="max-content">
      <CardBody>
        <Avatar name={details.name} size={['lg', '2xl']} />
        <Heading mb="5" mt="5" fontSize={['lg', 'xl', '2xl', '3xl']}>
          {details.name}
        </Heading>
        <Text fontSize={['sm', 'lg', 'xl', '2xl']}>{details.bio}</Text>
      </CardBody>
    </Card>
  );
};

export default Profile;
