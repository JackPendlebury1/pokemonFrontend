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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons'
import Cookies from 'js-cookie';

export default function FavouritePokemon() {


    const [AllData, setAllData] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [favourites, setFavourites] = useState([]);
    const [show, toggleShow] = useState(false);
    let favouriteList = []


    const unfavourite = (index) => {
        console.log("removed from favourites" + index)
        onOpen()
    }

    const fetchDataAll = async () => {
        console.log(favouriteList)
        favouriteList.forEach(async e => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + e, {
                method: 'GET',
            })
            if (!response.ok) {
                console.log("something failed")
            } else {
                let data = await response.json();
                setAllData(old => [...old, data])
                toggleShow(true)
            }
        });
    }

    const fetchFavourites = async () => {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}favourites/${Cookies.get("id")}/`, {
            method: 'GET',
            headers: {
                "Authorization": Cookies.get("login")
            }
        });
        if (response.status === 200) {
            let data = await response.json();
            setFavourites(data)
        } else {
            console.error("Cannot Find Favourites")
        }
        
    }

    useEffect(() => {
        console.log("running fetch favourites")
        fetchFavourites();
        favourites.forEach(async e => {
            console.log(e)
            favouriteList.push(e.favourite_index)
        }
            )
        console.log("running fetch all")
        fetchDataAll();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps  

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Remove Favourite</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        This item has been removed from your favorites list
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Link to='/dashboard/pokedex/'>
                <Button leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='solid'>
                    Back to Pokedex
                </Button>
            </Link>

            {
                show &&
                <>
                    <Heading p='5'>Favourites</Heading>
                    <SimpleGrid columns={3} spacing={5}>

                        {AllData?.map(pokemon => {
                            let index = pokemon.name
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
                                                        pokemon.sprites.front_shiny
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
                                                    <Button onClick={() => unfavourite(index)}
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
                                                        Unfavorite
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
            }

        </>
    );
}
