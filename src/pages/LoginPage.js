import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuth from '../components/useAuth'

export default function SimpleCard() {
    const history = useHistory();
    const formData = new FormData();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
      } = useForm()

    const [isAuth ,login] = useAuth(isAuth);
    const onSubmit = async (values) => {
        formData.append('username', values.email);
        formData.append('password', values.password);
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}token`, { method: 'POST', body: formData });
        if (response.status === 200) {
            let token = await response.json();
            localStorage.setItem("login", token.token_type + " " + token.access_token);
            history.push("/dashboard/pokedex");
            // window.location.reload();
            console.log(isAuth)
            login()
        } else {
            onOpen()

        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Your login has failed, this is due to either the username or password being wrong
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
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of the cool pokemon
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input id='email'
                                        placeholder='Email address'
                                        {...register('email', {
                                            required: 'This is required'
                                        })}
                                        type="email" />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input 
                                    id='password'
                                    placeholder='Password'
                                    {...register('password', {
                                        required: 'This is required'
                                    })}
                                    type="password" />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Checkbox>Remember me</Checkbox>
                                        <Link color={'blue.400'}>Forgot password?</Link>
                                    </Stack>
                                    <Button
                                        isLoading={isSubmitting}
                                        type='submit'
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Sign in
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Need an account? <Link color={'blue.400'} href="/signup">Sign Up</Link>
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