"use client";

import { COLORS } from '@/assets/colors';
import { MovieTypes } from '@/types/movie';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react'
import LikeButton from './LikeButton';
import { genreFilter } from '@/menus/menu';
import { useRouter } from 'next/navigation';

interface Props {
    movie: MovieTypes
}

export default function MovieCard({ movie }: Props) {

    const router = useRouter();

    const onNavigateMovieDetail = () => {
        router.push(`/detail/${movie.id}`);
    }

    const title = movie.title.length > 20 ? movie.title.slice(0, 15) + '...' : movie.title;

    const dateOrGenre = () => {
        if (movie.release_date === '') {
            return '정보 없음';
        }

        return `${movie.release_date.split('-')[0]} | ${genreFilter.filter(value => value.type === movie.genre_ids[0])[0]?.title}`;
    };

    return (
        <Flex w={280} flexDirection={'column'} h={'330px'} borderRadius={15} borderColor={COLORS.gray} borderWidth={1} overflow={'hidden'} position={'relative'} onClick={onNavigateMovieDetail} cursor={'pointer'}>
            {
                movie.poster_path ?
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
                    />
                    : <Box w={'full'} h={'full'} backgroundColor={COLORS.gray} position={'absolute'} zIndex={0} />
            }
            <Flex flex={1} p={5} zIndex={1} justifyContent={'flex-end'}>
                <LikeButton id={movie.id} />
            </Flex>
            <Flex h={'85px'} background={'rgba(0,0,0,0.5)'} zIndex={2} w={'full'} px={3} flexDirection={'column'} justifyContent={'center'}>
                <Text color={COLORS.white} fontWeight={'bold'} fontSize={16}>
                    {title}
                </Text>
                <Text color={COLORS.white} fontWeight={'bold'} fontSize={14} mt={3}>
                    {dateOrGenre()}
                </Text>
            </Flex>
        </Flex>
    )
}
