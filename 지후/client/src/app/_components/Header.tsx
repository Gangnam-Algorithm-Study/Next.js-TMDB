'use client'

import Logo from '@/assets/src/Logo';
import { navMenu } from '@/menus/menu';
import { Link } from '@chakra-ui/next-js'
import { Box, Button, ChakraProvider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import HeaderMenu from './HeaderMenu';
import { COLORS } from '@/assets/colors';
import CoffieIcon from '@/assets/src/CoffieIcon';

export default function Header() {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState<string>('');
    const [scroll, setScroll] = useState<boolean>(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        window.scrollY <= 200 ? setScroll(true) : setScroll(false);
    };

    return (
        <ChakraProvider>
            <Flex
                align="center"
                justify="space-between"
                position={'sticky'}
                transform={scroll ? 'translateY(0)' : 'translateY(-100%)'}
                transition={'all 0.3s ease-in-out'}
                bg={COLORS.black}
                height={20}
                w={'full'}
                zIndex={999}
                color="white"
                paddingX={'5%'}
                onMouseOver={() => setIsOpen('')}
                onMouseLeave={() => setIsOpen('')}
            >
                <Flex alignItems="center" mr={5} h={'full'}>
                    <Flex alignItems={'center'} mr={5} cursor={'pointer'} onClick={() => router.push('/home')}>
                        <CoffieIcon />
                        <Text
                            color={COLORS.white}
                            fontWeight={'bold'}
                            fontSize={30}
                            ml={3}
                        >
                            TMDB
                        </Text>
                    </Flex>
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
