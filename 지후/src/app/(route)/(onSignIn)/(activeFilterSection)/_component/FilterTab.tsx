"use client";

import { COLORS } from '@/assets/colors';
import { filterMenu } from '@/menus/menu';
import { Box, Button, ChakraProvider, Flex, Text, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import OptionButtonWrap from './tab/OptionButtonWrap';

export default function FilterTab() {

    const pathname = usePathname();
    const [page, setPage] = useState<string>('');
    const [queryParams, setQueryParams] = useState<string>('');

    useEffect(() => {
        switch (pathname) {
            case '/movie':
                setPage('인기 영화');
                break;
            default:
                break;
        }
    }, [pathname])

    return (
        <ChakraProvider>
            <VStack w={300} h={800} mt={5}>
                <Box w={'full'}>
                    <Text color={COLORS.black} fontWeight={'bold'} fontSize={20}>
                        {page}
                    </Text>
                </Box>
                <Flex w={'full'} flexDirection={'column'}>
                    {
                        filterMenu.map(menu => (
                            <OptionButtonWrap title={menu.title} type={menu.type} key={menu.type} />
                        ))
                    }
                </Flex>
            </VStack>
        </ChakraProvider>
    )
}
