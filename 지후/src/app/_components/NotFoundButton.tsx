"use client"

import { Button, ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NotFoundButton() {

    const router = useRouter();

    return (
        <ChakraProvider>
            <Button colorScheme='whatsapp' onClick={() => router.replace('/')}>
                홈으로
            </Button>
        </ChakraProvider>
    )
}
