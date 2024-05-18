"use client"

import { getTrendingMovie } from '@/api/movie';
import CustomButton from '@/app/_components/CustomButton';
import LikeButton from '@/app/_components/LikeButton';
import Loading from '@/app/_components/Loading';
import { COLORS } from '@/assets/colors';
import { genreFilter } from '@/menus/menu';
import { MovieResponse } from '@/types/responseType';
import { Box, Center, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { socket } from '../../../_socket/SocketProvider';

export default function Banner() {
    const [randomMovieId, setRandomMovieId] = useState<number | null>(null);
    const router = useRouter();
    const { data, isLoading } = useQuery<MovieResponse>({
        queryKey: ['getTrendingMovie'],
        queryFn: getTrendingMovie,
        enabled: !!randomMovieId,
    })

    useEffect(() => {
        const random_0_19 = Math.floor(Math.random() * 19);
        const id = random_0_19 === 0 ? 1 : random_0_19;
        setRandomMovieId(id);
    }, [])

    const movie = data?.results[randomMovieId as number];


    if (!movie) {
        return (
            <Center minH={450}>
                <Loading />
            </Center>
        )
    }

    const onNavigateMovieDetail = () => {
        router.push(`/detail/${movie.id}`);
    }

    return (
        <ChakraProvider>
            <Flex w={'full'} h={450} backgroundColor={COLORS.black} position={'relative'}>
                {
                    isLoading ?
                        <Loading />
                        :
                        <>
                            <img
                                src={`https://image.tmdb.org/t/p/w1280/${data?.results[randomMovieId as number].backdrop_path}`}
                                alt="메인 배경 이미지"
                                style={{ filter: 'brightness(0.5)', position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
                            />
                            <Flex w={'full'} h={'full'} flexDirection={'column'} justifyContent={'flex-end'} zIndex={1} px={5} py={10}>
                                <Box>
                                    <Text color={COLORS.white} fontSize={25} fontWeight={'bold'} mb={5}>
                                        {movie.title}
                                    </Text>
                                    <Text color={COLORS.white} mb={5}>
                                        {movie.release_date.split('-')[0]} | {genreFilter.filter(value => value.type === movie.genre_ids[0])[0].title}
                                    </Text>
                                    <Flex>
                                        <CustomButton onClick={onNavigateMovieDetail}>
                                            <Text color={COLORS.white}>
                                                자세히 보기
                                            </Text>
                                        </CustomButton>
                                        <Box ml={5}>
                                            <LikeButton movie={data?.results[randomMovieId as number]} />
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        </>
                }
            </Flex>
        </ChakraProvider>
    )
}
