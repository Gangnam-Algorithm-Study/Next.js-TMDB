"use client";

import { COLORS } from '@/assets/colors';
import BackIcon from '@/assets/src/BackIcon';
import Logo from '@/assets/src/Logo';
import { Button, ChakraProvider, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function DetailHeader() {

    const router = useRouter();

    return (
        <ChakraProvider>
            <Flex paddingX={5} w={'full'} h={70} backgroundColor={COLORS.real_blue} alignItems={'center'}>
                <Button
                    onClick={() => router.back()}
                    backgroundColor={'transparent'}
                    _hover={{ backgroundColor: 'transparent' }}
                >
                    <BackIcon backgroundColor={COLORS.logo_color} />
                </Button>
            </Flex>
        </ChakraProvider>
    )
}
