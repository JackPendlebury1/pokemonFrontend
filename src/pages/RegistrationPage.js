import {
    Flex,
    Box,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()


    const onSubmit = async (values) => {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}users/`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
        if (response.ok) {
            history.push("/login");
        } else {
            onOpen()
        }
    }

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Your request to sign up has failed, this is most likely due to you already have an account or someone has created an account with the same email
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of the cool pokemon 🥰
                        </Text>
                    </Stack>

                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <HStack>
                                    <Box>
                                        <FormControl id="first_name" isRequired isInvalid={errors.first_name}>
                                            <FormLabel htmlFor='first_name'>First Name</FormLabel>
                                            <Input
                                                id='first_name'
                                                placeholder='First Name'
                                                {...register('first_name', {
                                                    required: 'This is required',
                                                    minLength: { value: 2, message: 'Minimum length should be 2' },
                                                })}
                                                type="text" />
                                            <FormErrorMessage>
                                                {errors.first_name && errors.first_name.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>

                                    <Box>
                                        <FormControl id="last_name" isRequired isInvalid={errors.last_name}>
                                            <FormLabel htmlFor='last_name'>Last Name</FormLabel>
                                            <Input
                                                id='last_name'
                                                placeholder='Last Name'
                                                {...register('last_name', {
                                                    required: 'This is required',
                                                    minLength: { value: 4, message: 'Minimum length should be 4' },
                                                })}
                                                type="text" />
                                            <FormErrorMessage>
                                                {errors.last_name && errors.last_name.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                </HStack>

                                <FormControl id="email" isRequired isInvalid={errors.email}>
                                    <FormLabel htmlFor='last_name'>Email Address</FormLabel>
                                    <Input
                                        id='email'
                                        placeholder='Email Address'
                                        {...register('email', {
                                            required: 'This is required',
                                            minLength: { value: 6, message: 'Minimum length should be 6' },
                                        })}
                                        type="email" />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl id="password" isRequired isInvalid={errors.email}>
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            id='password'
                                            placeholder='Password'
                                            {...register('password', {
                                                required: 'This is required',
                                                minLength: { value: 8, message: 'Minimum length should be 8' },
                                            })}
                                            type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        isLoading={isSubmitting}
                                        type='submit'
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Sign up
                                    </Button>

                                </Stack>

                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Already a user? <Link color={'blue.400'} href="/login">Login</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </>

    );
}