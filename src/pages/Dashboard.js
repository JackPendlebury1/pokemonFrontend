import React, { useState, useEffect } from 'react'
import {
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    HStack,
    Spacer,
    chakra,
    Box,
    Icon,
} from '@chakra-ui/react';
import { ArrowBackIcon, StarIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BsLightningFill } from "react-icons/bs";


function Dashboard() {

    const [limitAmount, setLimitAmount] = useState(100)
    const [offsetAmount, setOffsetAmount] = useState(0)
    const [AllData, setAllData] = useState([])
    const url = "https://pokeapi.co/api/v2/pokemon?limit=" + limitAmount + "&offset=" + offsetAmount
    const { isOpen, onOpen, onClose } = useDisclosure()
    const history = useHistory();
    const [show, toggleShow] = useState(false);
    const formData = new FormData();

    const fetchDataAll = async (url) => {

        const response = await fetch(url, {
            method: 'GET',
        })
        if (!response.ok) {
            console.log("something failed")
        } else {
            let data = await response.json();

            setAllData(data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${process.env.REACT_APP_ENDPOINT}profile`, {
                method: 'GET',
                headers: {
                    "Authorization": Cookies.get("login")
                }
            })
            if (!response1.ok) {
                history.push("/");
            } else {
                let data = await response1.json();
                Cookies.set("id", data.id, { sameSite: 'Strict' })
            }
        }
        fetchData();
        fetchDataAll(url);
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps  

    const favouritePokemon = async (index) => {
        formData.append('favourite_index', index);
        const response2 = await fetch(`${process.env.REACT_APP_ENDPOINT}users/favourites/`,
            { method: 'POST', headers: { 'Content-Type': 'application/json', "Authorization": Cookies.get("login") }, body:  formData});
        if (response2.ok) {
            isOpen()
        } else if (response2.status === 400) {
            toggleShow(true)
        }
    }

    function nextPage() {
        fetchDataAll(AllData.next)
    }

    function previousPage() {
        fetchDataAll(AllData.previous)
    }

    return (
        <>
            {show && <Flex
                w="full"
                bg="gray.600"
                p={50}
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    maxW="sm"
                    w="full"
                    mx="auto"
                    shadow="md"
                    rounded="lg"
                    overflow="hidden"
                >
                    <Flex justifyContent="center" alignItems="center" w={12} bg="red.500">
                        <Icon as={BsLightningFill} color="white" boxSize={6} />
                    </Flex>

                    <Box mx={-3} py={2} px={4}>
                        <Box mx={3}>
                            <chakra.span
                                fontWeight="bold"
                            >
                                Error
                            </chakra.span>
                            <chakra.p
                                fontSize="sm"
                            >
                                You have already favourited this pokemon!
                            </chakra.p>
                        </Box>
                    </Box>
                </Flex>
            </Flex>}
            
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Favourited</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Added new favourite Pokemon
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Stack direction='row' spacing={4} align='center'>
                <Button leftIcon={<ArrowBackIcon />} onClick={() => previousPage()} colorScheme='teal' variant='solid'>
                    Previous Page
                </Button>
                <Button leftIcon={<ArrowForwardIcon />} onClick={() => nextPage()} colorScheme='teal' variant='solid'>
                    Next Page
                </Button>
                <Spacer></Spacer>
                <Link to='/dashboard/favourites/'>
                    <Button leftIcon={<StarIcon />} colorScheme='teal' variant='solid'>
                        favourites
                    </Button>
                </Link>
            </Stack>
            <Heading p='5'>PokeDex</Heading>
            <SimpleGrid columns={3} spacing={5}>

                {AllData.results?.map(pokemon => {
                    let index = pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                    let image = "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/" + index + ".png?raw=true"
                    return (
                        <>
                            <Center py={6}>
                                <Stack
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    w={{ sm: '100%', md: '500px' }}
                                    height={{ sm: '280px', md: '20rem' }}
                                    direction={{ base: 'column', md: 'row' }}
                                    boxShadow={'2xl'}
                                    padding={4}>
                                    <Flex flex={1} bg="blue.200">
                                        <Image
                                            objectFit="cover"
                                            boxSize="100%"
                                            src={
                                                image
                                            }
                                        />
                                    </Flex>

                                    <Stack
                                        flex={1}
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        p={1}
                                        pt={2}>
                                        <Heading fontSize={'2xl'} fontFamily={'body'}>
                                            {pokemon.name}
                                        </Heading>
                                        <HStack >
                                            <Button onClick={() => favouritePokemon(index)}
                                                boxShadow={
                                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                                }
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}
                                                _focus={{
                                                    bg: 'blue.500',
                                                }}
                                                leftIcon={<StarIcon />}>
                                                favorite
                                            </Button>
                                            <Link to={`/dashboard/search/${index}`}>

                                                <Button
                                                >
                                                    View Stats
                                                </Button>
                                            </Link>
                                        </HStack>

                                    </Stack>
                                </Stack>
                            </Center>

                        </>
                    )
                })}



            </SimpleGrid>
        </>
    );
}

export default Dashboard
