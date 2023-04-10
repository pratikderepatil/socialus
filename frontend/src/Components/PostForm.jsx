import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

const PostForm = ({ handlePost }) => {
  const [content, setContent] = useState('');

  return (
    <Card>
      <CardBody>
        <VStack gap={3}>
          <FormControl isRequired>
            <FormLabel>Enter content: </FormLabel>
            <Textarea
              required
              type="text"
              name="name"
              value={content}
              onChange={e => {
                setContent(e.target.value);
              }}
            />
          </FormControl>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          onClick={() => {
            handlePost(content);
            setContent('');
          }}
          colorScheme="messenger"
        >
          Create Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostForm;
