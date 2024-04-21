'use client'

import Logo from '@/assets/src/Logo';
import { navMenu } from '@/menus/menu';
import { Link } from '@chakra-ui/next-js'
import { Box, Button, ChakraProvider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import HeaderMenu from './HeaderMenu';

export default function Header() {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState<string>('');

    return (
        <ChakraProvider>
            <Flex
                align="center"
                justify="space-between"
                bg="#042541"
                height={20}
                color="white"
                paddingX={'10%'}
                onMouseOver={() => setIsOpen('')}
            >
                <Flex alignItems="center" mr={5} h={'full'}>
                    <Button
                        onClick={() => router.replace('/')}
                        backgroundColor={'transparent'}
                        _hover={{ backgroundColor: 'transparent' }}
                    >
                        <Logo />
                    </Button>
                    {
                        navMenu.map((menu) => (
                            <HeaderMenu menu={menu} key={menu.title} isOpen={isOpen} setIsOpen={setIsOpen} />
                        ))
                    }
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}
