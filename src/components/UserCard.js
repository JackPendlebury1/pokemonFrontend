import React, {useState, useEffect} from 'react'
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Stack,
    useColorModeValue,
    Text,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

export const UserCard = () => {
    const [profile, setProfile] = useState([])
    const history = useHistory();

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
                setProfile(data)
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps  

    return (
        <Center py={6}>
            <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            `data:image/jpeg;base64, ${profile.userImage}`
                        }
                        alt={'Author'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {profile.first_name} {profile.last_name}
                        </Heading>
                        <Text color={'gray.500'}>User since: {profile.created_at}</Text>
                        <Text color={'gray.500'}>User ID: {profile.id}</Text>
                    </Stack>
                </Box>
            </Box>
        </Center>
    );
}