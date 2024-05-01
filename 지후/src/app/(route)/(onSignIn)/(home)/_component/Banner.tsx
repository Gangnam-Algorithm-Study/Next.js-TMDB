"use client"

import { COLORS } from '@/assets/colors'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import React from 'react'

export default function Banner() {
    return (
        <ChakraProvider>
            <Flex w={'full'} h={300} backgroundColor={COLORS.white}>
                <img src={require('@/assets/src/main.png')} width={'100%'} height={'100%'} />
            </Flex>
        </ChakraProvider>
    )
}
