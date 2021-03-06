import React, { useState, useEffect } from 'react'
import {
    Button, Box, Image, Grid, GridItem, Container, Progress, Heading, Text, SimpleGrid, Tag, TagLabel, Stack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Spacer,
} from '@chakra-ui/react'
import { ArrowBackIcon, StarIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';

export default function SearchPokemon() {
    const [pokemon, setPokemon] = useState([])
    const [show, toggleShow] = useState(false)
    const { index } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newIndex, setNewIndex] = useState(parseInt(index))
    const [show1, toggleShow1] = useState(false)

    const handleClick = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + newIndex, {
            method: 'GET',
        })
        if (!response.ok) {
            console.log("something failed")
        } else {
            let data = await response.json();
            setPokemon(data)
            toggleShow(true)
        }
    }

    useEffect(() => {
        handleClick();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps  

    const favourite = async (id) => {
        const response2 = await fetch(`${process.env.REACT_APP_ENDPOINT}users/favourites/${id}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("login") } });
        if (response2.ok) {
            onOpen()
        } else if (response2.status === 400) {
            toggleShow1(true)
            setTimeout(() => { toggleShow1(false) }, 4000);

        }
    }

    const nextPage = () => {
        setNewIndex(newIndex + 1)
        handleClick()
    }

    return (
        <>
            {show1 &&
                <ErrorMessage Title={"Error"} Color={"red.500"} Error={"You have already favourited this pokemon!"} />
            }
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
            {
                show &&
                <>
                    <Box mt='10'></Box>
                    <Stack direction='row' spacing={4} align='center'>
                        <Link to='/dashboard/pokedex/'>
                            <Button leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='solid'>
                                Back to Pokedex
                            </Button>
                        </Link>
                        <Button leftIcon={<StarIcon />} onClick={() => favourite(pokemon.id)} colorScheme='teal' variant='solid'>
                            Favourite
                        </Button>
                        <Spacer></Spacer>
                        <Button leftIcon={<ArrowForwardIcon />} onClick={() => nextPage()} colorScheme='teal' variant='solid'>
                            next
                        </Button>
                    </Stack>
                    <Box justify={'center'}>
                        <Grid h='500px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)'>
                            <GridItem rowSpan={2} colSpan={1}>
                                <Image boxSize="100%" src={pokemon.sprites.front_shiny}></Image>
                            </GridItem>
                            <GridItem colSpan={2} >
                                <Container>
                                    <Heading>{pokemon.name}</Heading>
                                    HP : <Progress colorScheme='green' hasStripe value={pokemon.stats[5].base_stat} />
                                    Attack : <Progress colorScheme='red' hasStripe value={pokemon.stats[1].base_stat} />
                                    Defense : <Progress colorScheme='blue' hasStripe value={pokemon.stats[2].base_stat} />
                                </Container>
                            </GridItem>
                            <GridItem colSpan={2} >
                                <Container>
                                    <Heading>Stats</Heading>
                                    Special-attack : <Progress hasStripe colorScheme='red' value={pokemon.stats[3].base_stat} />
                                    Special-defense : <Progress colorScheme='blue' hasStripe value={pokemon.stats[4].base_stat} />
                                    Speed : <Progress colorScheme='purple' hasStripe value={pokemon.stats[5].base_stat} />
                                </Container>
                            </GridItem>
                            <GridItem colSpan={4} >
                                <SimpleGrid columns={2}>
                                    <Container>
                                        <Text>ID : {pokemon.id}</Text>
                                        <Text>Weight : {pokemon.weight}</Text>
                                        <Text>Base Experience : {pokemon.base_experience}</Text>
                                        <Text>Base Height : {pokemon.height}</Text>
                                    </Container>
                                    <Container>
                                        <Text>Abilities:
                                            {pokemon.abilities.map(i => {
                                                return (
                                                    <Tag size='md' borderRadius='full' variant='solid' colorScheme='green'>
                                                        <TagLabel>{i.ability.name}</TagLabel>
                                                    </Tag>
                                                )
                                            })}
                                            <br></br>
                                            Types:
                                            {pokemon.types.map(i => {
                                                return (
                                                    <Tag size='md' borderRadius='full' variant='solid' colorScheme='blue'>
                                                        <TagLabel>{i.type.name}</TagLabel>
                                                    </Tag>
                                                )
                                            })}
                                        </Text>
                                    </Container>
                                </SimpleGrid>
                            </GridItem>
                        </Grid>
                    </Box>
                </>
            }
        </>
    )
}
