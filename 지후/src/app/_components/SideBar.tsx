"use client"

import { COLORS } from '@/assets/colors'
import CoffieIcon from '@/assets/src/CoffieIcon'
import FilmIcon from '@/assets/src/FilmIcon'
import LikeIcon from '@/assets/src/LikeIcon'
import Logo from '@/assets/src/Logo'
import TrendingIcon from '@/assets/src/TrendingIcon'
import { Box, Center, ChakraProvider, Flex, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SideBar() {

    const router = useRouter();

    const sideMenuList = [
        {
            title: 'Home',
            path: '/',
            icon: () => <FilmIcon color={COLORS.white} size={20} />
        },
        {
            title: 'Trending',
            path: '/trending',
            activate: false,
            icon: () => <TrendingIcon color={COLORS.white} size={20} />
        },
        {
            title: 'Favourites',
            path: '/favourites',
            activate: false,
            icon: () => <LikeIcon color={COLORS.white} size={20} />
        },
    ]

    const handleMenuClick = (index: number) => {
        if (sideMenuList[index].activate === false) {
            return;
        }

        router.push(sideMenuList[index].path);
    }

    return (
        <ChakraProvider>
            <Flex minW={'20%'} flexDirection={'column'} backgroundColor={COLORS.black} position={'sticky'} top={0} h={'full'}>
                <Center w={'full'} h={200}>
                    <CoffieIcon />
                    <Text
                        color={COLORS.white}
                        fontWeight={'bold'}
                        fontSize={40}
                        ml={3}
                    >
                        TMDB
                    </Text>
                </Center>
                <Flex flexDirection={'column'} w={'full'}>
                    {
                        sideMenuList.map((menu, index) => (
                            <Flex key={menu.title} alignItems={'center'} px={10} mb={10} cursor={'pointer'} onClick={() => { handleMenuClick(index) }}>
                                {menu.icon()}
                                <Text color={COLORS.white} ml={5}>
                                    {menu.title}
                                </Text>
                            </Flex>
                        ))
                    }
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}
