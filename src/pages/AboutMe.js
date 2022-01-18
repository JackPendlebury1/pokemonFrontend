import React, { useState } from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react';
import { AiOutlineCamera } from "react-icons/ai";
import { ErrorMessage } from "../components/ErrorMessage"
import Cookies from 'js-cookie';

export const AboutMe = ({ userImage }) => {

    const [show, toggleShow] = useState(false);
    const [show1, toggleShow1] = useState(false);
    const [image, setImage] = useState()
    const fileSelector = event => {
        setImage(event.target.files[0])
    }

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
    }

    const uploadButton = async () => {
        const formData = new FormData();
        formData.append('image', image)
        const response = await fetch(process.env.REACT_APP_ENDPOINT + "/profile/image", {
            method: 'POST',
            headers: {
                "Authorization": Cookies.get("login")
            },
            body: formData
        }
        )
        if (response.ok) {
            toggleShow(true);
            setTimeout(() => { toggleShow(false) }, 4000);
            setImage(null)
        }
        else {
            toggleShow1(true);
            setTimeout(() => { toggleShow1(false) }, 4000);
        }
    }


    return (
        <>
            {show &&

                <ErrorMessage Title={"Completed"} Color={"green.500"} Error={"You have uploaded your image"} />
            }
            {
                show1 &&
                <ErrorMessage Title={"Error"} Color={"red.500"} Error={"This Operation did not work try again"} />
            }
            <Flex
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        <FormLabel>User Icon</FormLabel>
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>

                                <Avatar size="xl" src={"data:image/jpeg;base64," + userImage}>
                                    <input id="fileButton" onChange={fileSelector} type="file" hidden />
                                    <AvatarBadge onClick={() => fileUploadButton()}
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        middle="0"
                                        icon={<AiOutlineCamera />}
                                    />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <Button onClick={() => uploadButton()} w="full">Change Icon</Button>
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl id="userName" isRequired>
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder="UserName"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            as={'a'}
                            href={'/dashboard/pokedex'}
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>

    );
}

