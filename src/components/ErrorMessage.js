import React from 'react'
import {    
    chakra,
    Box,
    Icon,
    Flex,
} from '@chakra-ui/react'
import { BsLightningFill } from "react-icons/bs";

export const ErrorMessage = () => {
    return (
        <>
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
        </>
    )
}
