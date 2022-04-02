import React, { useState, useRef } from 'react'
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
    FormErrorMessage,
} from '@chakra-ui/react';
import { AiOutlineCamera } from "react-icons/ai";
import { ErrorMessage } from "../components/ErrorMessage"
import { useForm } from 'react-hook-form'

export const AboutMe = ({user}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const [show, toggleShow] = useState(false);
    const [show1, toggleShow1] = useState(false);

    const uploadButton = async () => {
        console.log(selectedFile)
        const formData = new FormData();
        formData.append('image', selectedFile)
        const response = await fetch(process.env.REACT_APP_ENDPOINT + "/profile/image", {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem("login")
            },
            body: formData
        }
        )
        if (response.ok) {
            toggleShow(true);
            setTimeout(() => { toggleShow(false) }, 4000);
            setSelectedFile(null)
        }
        else {
            toggleShow1(true);
            setTimeout(() => { toggleShow1(false) }, 4000);
        }
    }

    const updateInfoButton = async (values) => {
        const response = await fetch(process.env.REACT_APP_ENDPOINT + "/profile/edit", {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem("login")
            },
            body: JSON.stringify(values)
        }
        )
        if (response.ok) {
            toggleShow(true);
            setTimeout(() => { toggleShow(false) }, 4000);
        }
        else {
            toggleShow1(true);
            setTimeout(() => { toggleShow1(false) }, 4000);
        }
    }


    return (
        <>
            {show &&
                <ErrorMessage Title={"Completed"} Color={"green.500"} Error={"You have updated your profile"} />
            }
            {show1 &&
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

                                <Avatar size="xl" src={`data:image/jpeg;base64, ${user.userImage}`}>
                                    <input id="fileButton" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" hidden />
                                    <AvatarBadge onClick={()=> document.getElementById("fileButton").click() && uploadButton()}
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
                    <form onSubmit={handleSubmit(updateInfoButton)}>
                        <FormControl id="first_name" isRequired>
                            <FormLabel>First name</FormLabel>
                            <Input
                                placeholder="first name"
                                _placeholder={{ color: 'gray.500' }}
                                {...register('first_name', {
                                    required: 'This is required',
                                    minLength: { value: 2, message: 'Minimum length should be 2' },
                                })}
                                type="text"
                            />
                            <FormErrorMessage>
                                {errors.first_name && errors.first_name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="last_name" isRequired>
                            <FormLabel>Last name</FormLabel>
                            <Input
                                placeholder="last name"
                                _placeholder={{ color: 'gray.500' }}
                                {...register('last_name', {
                                    required: 'This is required',
                                    minLength: { value: 2, message: 'Minimum length should be 2' },
                                })}
                                type="text"
                            />
                            <FormErrorMessage>
                                {errors.last_name && errors.last_name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                placeholder="your-email@example.com"
                                _placeholder={{ color: 'gray.500' }}
                                {...register('email', {
                                    required: 'This is required',
                                    minLength: { value: 2, message: 'Minimum length should be 5' },
                                })}
                                type="email"
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                placeholder="password"
                                _placeholder={{ color: 'gray.500' }}
                                {...register('password', {
                                    required: 'This is required',
                                    minLength: { value: 2, message: 'Minimum length should be 8' },
                                })}
                                type="password"
                            />
                        </FormControl>
                        <Stack p={10}spacing={6} direction={['column', 'row']}>
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
                                isLoading={isSubmitting}
                                type='submit'
                                bg={'blue.400'}
                                color={'white'}
                                w="full"
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
        </>

    );
}

