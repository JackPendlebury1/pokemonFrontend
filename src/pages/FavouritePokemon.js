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
    InputGroup,
    Input,
    InputLeftElement
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon, StarIcon, SearchIcon } from '@chakra-ui/icons'
import Cookies from 'js-cookie';
import { UserCard } from '../components/UserCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const FavouritePokemon = () => {

    const [AllData, setAllData] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, toggleShow] = useState(false);
    let favouritesList

    const unfavourite = async (index) => {
        const response2 = await fetch(`${process.env.REACT_APP_ENDPOINT}delete/favourites/${index}/`, {
            method: 'POST',
            headers: {
                "Authorization": Cookies.get("login")
            }
        });
        if (response2.status === 200) {
            onOpen()
        } else {
            console.error("Cannot Find Favourites")
        }

    }

    const fetchDataAll = async () => {
        favouritesList.forEach(async e => {
            const response1 = await fetch("https://pokeapi.co/api/v2/pokemon/" + e.favourite_index, {
                method: 'GET',
            })
            if (!response1.ok) {
                console.log("something failed")
            } else {
                let data = await response1.json();
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
            favouritesList = data
            fetchDataAll();
        } else {
            console.error("Cannot Find Favourites")
        }

    }

    useEffect(() => {
        fetchFavourites();
        fetchDataAll();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps  

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(AllData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setAllData(items);
      }

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
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        <Input  placeholder='Search' />
                    </InputGroup>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="Pokemon">
                            {(provided) =>
                                <SimpleGrid columns={3} spacing={5}  {...provided.droppableProps} ref={provided.innerRef}>
                                    <UserCard />
                                    {AllData?.map((pokemon, index) => {
                                        return (
                                            <Draggable key={String(index + 1)} draggableId={String(index + 1)} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Center py={6}>
                                                            <Stack
                                                                borderWidth="1px"
                                                                borderRadius="lg"
                                                                w={{ sm: '250px', md: '500px' }}
                                                                height={{ sm: '280px', md: '20rem' }}
                                                                direction={{ base: 'column', md: 'row' }}
                                                                boxShadow={'2xl'}
                                                                padding={4}>
                                                                <Flex flex={1} bg="blue.200">
                                                                    <Image objectFit="cover" boxSize="100%" src={pokemon.sprites.front_shiny} />
                                                                </Flex>
                                                                <Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
                                                                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                                                                        {pokemon.name}
                                                                    </Heading>
                                                                    <HStack >
                                                                        <Button onClick={() => unfavourite(pokemon.id)}
                                                                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                                                                            _hover={{ bg: 'blue.500', }}
                                                                            _focus={{ bg: 'blue.500', }}
                                                                            leftIcon={<StarIcon />}>
                                                                            Unfavorite
                                                                        </Button>
                                                                        <Link to={`/dashboard/search/${pokemon.id}`}>
                                                                            <Button>View Stats</Button>
                                                                        </Link>
                                                                    </HStack>
                                                                </Stack>
                                                            </Stack>
                                                        </Center>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </SimpleGrid>
                            }
                        </Droppable>
                    </DragDropContext>
                </>
            }

        </>
    );
}
