"use client"

import { COLORS } from '@/assets/colors'
import CoffieIcon from '@/assets/src/CoffieIcon'
import FilmIcon from '@/assets/src/FilmIcon'
import LikeIcon from '@/assets/src/LikeIcon'
import Logo from '@/assets/src/Logo'
import SearchIcon from '@/assets/src/SearchIcon'
import TrendingIcon from '@/assets/src/TrendingIcon'
import { Avatar, Box, Button, Center, ChakraProvider, Flex, Text, VStack } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Session } from '@auth/core/types';
import { toast } from 'react-toastify'

interface Props {
    session: Session
}

export default function SideBar({ session }: Props) {
    const router = useRouter();

    if (!session.user) {
        return null;
    }

    const onSignOut = async () => {
        signOut({
            redirect: false
        }).then(() => {
            toast('로그아웃 되었습니다', { type: 'info' })
            router.replace('/');
        })
    }

    const sideMenuList = [
        {
            title: 'Home',
            path: '/home',
            icon: () => <FilmIcon color={COLORS.white} size={20} />
        },
        {
            title: 'Search',
            path: '/movie',
            icon: () => <SearchIcon color={COLORS.white} size={20} />
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
            <Flex minW={'20%'} h={'100vh'} flexDirection={'column'} backgroundColor={COLORS.black} position={'sticky'} top={0}>
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
                <Flex flexDirection={'column'} flex={1}>
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
                <Flex w={'full'} h={200} flexDirection={'column'} px={3} justifyContent={'center'}>
                    <Flex mb={5} alignItems={'center'}>
                        <Avatar />
                        <Text color={COLORS.white} ml={5} fontWeight={'bold'} fontSize={18}>
                            {session?.user?.name}
                        </Text>
                    </Flex>
                    <Button colorScheme={'blue'} onClick={onSignOut}>
                        로그아웃
                    </Button>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}
