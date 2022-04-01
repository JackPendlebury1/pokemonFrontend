import React, { useState, useEffect } from 'react'
import {
    Button,
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
    IconButton,
    Tag,
    TagLabel,
    Text,
    Container,
    Grid,
    GridItem,
    Progress,
    Box,
} from '@chakra-ui/react';
import { ArrowBackIcon, StarIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ErrorMessage } from '../components/ErrorMessage';

function Dashboard() {

    const [AllData, setAllData] = useState([])
    const url = "https://pokeapi.co/api/v2/pokemon?limit=" + 100 + "&offset=" + 0
    const { isOpen, onOpen, onClose } = useDisclosure()
    const history = useHistory();
    const [show, toggleShow] = useState(false);
    const [show1, toggleShow1] = useState(false);
    const [show2, toggleShow2] = useState(false);
    const [pokemonStats, setPokemonStats] = useState([])

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

    const favouritePokemon = async (pokemonIndex) => {
        const response2 = await fetch(`${process.env.REACT_APP_ENDPOINT}users/favourites/${pokemonIndex}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json', "Authorization": Cookies.get("login") } });
        if (response2.ok) {
            onOpen()
            toggleShow2(true)
            toggleShow1(false)
        } else if (response2.status === 400) {
            toggleShow(true)
            setTimeout(() => { toggleShow(false) }, 4000);
        }
    }

    const statPokemon = async (pokemonIndex) => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonIndex, {
            method: 'GET',
        })
        if (!response.ok) {
            console.log("something failed")
        } else {
            let data = await response.json();
            setPokemonStats(data)
            toggleShow1(true)
            toggleShow2(false)
            onOpen()
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
            {show &&
                <ErrorMessage Title={"Error"} Color={"red.500"} Error={"You have already favourited this pokemon!"} />
            }

                <Modal isOpen={isOpen} size='xl' onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        {
                            show1 &&
                            <ModalHeader>Pokemon Stats</ModalHeader>
                        }
                        {
                            show2 &&
                            <ModalHeader>Favourited</ModalHeader>
                        }
                        
                        <ModalCloseButton />
                        <ModalBody>
                            {show1 &&
                                <Box justify={'center'}>
                                    <Grid h='500px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)'>
                                        <GridItem colSpan={2} >
                                            <Container>
                                                <Heading>{pokemonStats.name}</Heading>
                                                HP : <Progress colorScheme='green' hasStripe value={pokemonStats?.stats[5].base_stat} />
                                                Attack : <Progress colorScheme='red' hasStripe value={pokemonStats?.stats[1].base_stat} />
                                                Defense : <Progress colorScheme='blue' hasStripe value={pokemonStats?.stats[2].base_stat} />
                                            </Container>
                                        </GridItem>
                                        <GridItem colSpan={2} >
                                            <Container>
                                                <Heading>Stats</Heading>
                                                Special-attack : <Progress hasStripe colorScheme='red' value={pokemonStats.stats[3].base_stat} />
                                                Special-defense : <Progress colorScheme='blue' hasStripe value={pokemonStats.stats[4].base_stat} />
                                                Speed : <Progress colorScheme='purple' hasStripe value={pokemonStats.stats[5].base_stat} />
                                            </Container>
                                        </GridItem>
                                        <GridItem colSpan={4} >
                                            <SimpleGrid columns={2}>
                                                <Container>
                                                    <Text>ID : {pokemonStats.id}</Text>
                                                    <Text>Weight : {pokemonStats.weight}</Text>
                                                    <Text>Base Experience : {pokemonStats.base_experience}</Text>
                                                    <Text>Base Height : {pokemonStats.height}</Text>
                                                </Container>
                                                <Container>
                                                    <Text>Abilities:
                                                        {pokemonStats.abilities.map(i => {
                                                            return (
                                                                <Tag size='md' borderRadius='full' variant='solid' colorScheme='green'>
                                                                    <TagLabel>{i.ability.name}</TagLabel>
                                                                </Tag>
                                                            )
                                                        })}
                                                        <br></br>
                                                        Types:
                                                        {pokemonStats.types.map(i => {
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
                            }
                            {
                                show2 && <Text>Added new favourite Pokemon</Text>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>



            <Stack direction='row' spacing={4} align='center'>
                <IconButton icon={<ArrowBackIcon />} as='button' onClick={() => previousPage()}/>
                <IconButton icon={<ArrowForwardIcon />} onClick={() => nextPage()} />
                <Link to='/dashboard/favourites/'>
                    <IconButton icon={<StarIcon />}/>
                </Link>
            </Stack>
            <Heading p='5'>PokeDex</Heading>
            <SimpleGrid minChildWidth="450px" spacing={5}>
                {AllData.results?.map(pokemon => {
                    let pokemonIndex = pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                    let image = "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/" + pokemonIndex + ".png?raw=true"
                    return (
                        <Flex justifyContent="center">
                            <Stack borderWidth="1px"
                                borderRadius="lg"
                                w={{ sm: '250px', md: '450px' }}
                                height={{ sm: '350px', md: '20rem' }}
                                direction={{ base: 'column', md: 'row' }}
                                boxShadow={'2xl'}
                                padding={2}>
                                    {/*  */}
                                <Flex bg="blue.200">
                                    <Image objectFit="fill" boxSize="100%" src={image} />
                                </Flex>
                                <Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
                                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                                        {pokemon.name}
                                    </Heading>
                                    <HStack>
                                        <Button onClick={() => favouritePokemon(pokemonIndex)}
                                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                                            _hover={{ bg: 'blue.500', }}
                                            _focus={{ bg: 'blue.500', }}
                                            leftIcon={<StarIcon />}>
                                            favorite
                                        </Button>
                                        {/* <Link to={`/dashboard/search/${pokemonIndex}`}> */}
                                        <Button onClick={() => statPokemon(pokemonIndex)}>View Stats</Button>
                                        {/* </Link> */}
                                    </HStack>

                                </Stack>
                            </Stack>
                        </Flex>


                    )
                })}

            </SimpleGrid>


        </>
    );
}

export default Dashboard