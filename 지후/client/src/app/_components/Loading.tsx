"use client";

import { Center } from '@chakra-ui/react';
import React from 'react'
import Lottie from 'react-lottie';

export default function Loading() {
    return (
        <Center flex={1}>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: require('@/assets/src/loading.json'),
                }}
                width={200}
                height={200}
            />
        </Center>
    )
}
