import React from 'react';
import {
    chakra,
    Box,
    Icon,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react'
import {FaReact, FaAws } from "react-icons/fa"
import {SiAwsamplify, SiFastapi} from "react-icons/si"
import {CgPokemon} from "react-icons/cg"

export default function LandingPage() {
    const Feature = (props) => {
        return (
          <Box>
            <Icon
              boxSize={12}
              color={useColorModeValue("brand.700")}
              mb={4}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {props.icon}
            </Icon>
            <chakra.h3
              mb={3}
              mb={3}
              fontSize="lg"
              lineHeight="shorter"
              fontWeight="bold"
              color={useColorModeValue("gray.900")}
            >
              {props.title}
            </chakra.h3>
            <chakra.p
              lineHeight="tall"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {props.children}
            </chakra.p>
          </Box>
        );
      };
    
      return (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={20}
            px={{ base: 4, lg: 16, xl: 24 }}
            py={20}
            mx="auto"
            bg={useColorModeValue("white", "gray.800")}
            shadow="xl"
          >
            <Feature
              title="Built with FastApi"
              icon={
                <SiFastapi/>
              }
            >
              FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. The key features are: Fast: Very high performance, on par with NodeJS and Go (thanks to Starlette and Pydantic). One of the fastest Python frameworks available.
            </Feature>
    
            <Feature
              title="Using PokeAPI"
              icon={
                <CgPokemon/>
              }
            >
              Provide a seamless customer experience across channels, like reserving
              online and picking up in store. Our SDKs make it easy to integrate
              into your own mobile and web applications to accept in-store payments.
            </Feature>
    
            <Feature
              title="With React"
              icon={
                <FaReact/>
              }
            >
              React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.
            </Feature>
            <Feature
              title="Hosted with AWS Lambda"
              icon={
                <FaAws/>
              }
            >
              AWS Lambda is an event-driven, serverless computing platform provided by Amazon as a part of Amazon Web Services. It is a computing service that runs code in response to events and automatically manages the computing resources required by that code.
            </Feature>
    
            <Feature
              title="and also with API Gateway"
              icon={
                <FaAws/>
              }
            >
              Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale.
            </Feature>
    
            <Feature
              title="Finally also with Amplify"
              icon={
                <SiAwsamplify/>
              }
            >
              AWS Amplify is a set of purpose-built tools and features that lets frontend web and mobile developers quickly and easily build full-stack applications on AWS, with the flexibility to leverage the breadth of AWS services as your use cases evolve.
            </Feature>
          </SimpleGrid>
      );
    }