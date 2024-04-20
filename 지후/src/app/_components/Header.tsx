'use client'

import Logo from '@/assets/src/Logo';
import { Link } from '@chakra-ui/next-js'
import { Box, Button, ChakraProvider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Header() {

    const router = useRouter();

    return (
        <ChakraProvider>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                bg="#042541"
                height={20}
                color="white"
                paddingX={10}
            >
                <Flex align="center" mr={5}>
                    <Button
                        onClick={() => router.replace('/')}
                        backgroundColor={'transparent'}
                        _hover={{ backgroundColor: 'transparent' }}
                    >
                        <Logo />
                    </Button>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}
