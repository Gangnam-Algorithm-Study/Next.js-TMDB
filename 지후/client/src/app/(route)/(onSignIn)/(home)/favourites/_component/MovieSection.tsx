"use client"

import { getLikeMovie } from '@/api/user';
import Loading from '@/app/_components/Loading';
import MovieCard from '@/app/_components/MovieCard';
import { COLORS } from '@/assets/colors';
import { MovieTypes } from '@/types/movie';
import { Button, Center, ChakraProvider, Flex, Grid, Text } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface FavouriteMovie {
    status: number;
    data: {
        movie_list: MovieTypes[],
        movie_id_list: string[]
    };
}

export default function MovieSection() {

    const session = useSession();
    const queryClient = useQueryClient();
    const router = useRouter();

    const user_id = session.data?.user.id;

    // const data = queryClient.getQueryData<FavouriteMovie | undefined>(['like_movie', user_id]);

    const { data } = useQuery({
        queryKey: ['like_movie', user_id],
        queryFn: getLikeMovie,
        enabled: !!user_id
    })

    if (!data) {
        return (
            <ChakraProvider>
                <Center flex={1} height={'40%'}>
                    <Loading />
                </Center>
            </ChakraProvider>
        )
    }

    if (data.data.movie_list.length === 0) {
        return (
            <ChakraProvider>
                <Center flex={1} height={'80%'} flexDirection={'column'}>
                    <Text color={COLORS.white} fontSize={20} fontWeight={'bold'}>
                        추가한 영화가 없습니다
                    </Text>
                    <Button
                        mt={5}
                        fontSize={14}
                        colorScheme={'facebook'}
                        onClick={() => router.push('/movie')}
                    >
                        추가하러가기
                    </Button>
                </Center>
            </ChakraProvider>
        )
    }

    return (
        <ChakraProvider>
            <Flex
                flex={1}
                justifyContent={'center'}
                alignItems={'center'}
                maxHeight={'100%'}
                overflow={'scroll'}
                sx={
                    {
                        '::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }
                }
                paddingY={10}
                px={3}
            >
                <Flex gap={0} height={'100%'} width={'100%'} flexDirection={'column'} alignItems={'center'}>
                    <Grid templateColumns={'repeat(4,1fr)'} gap={6}>
                        {data?.data.movie_list.map((movie, i) => {
                            const checker = data.data.movie_id_list.includes(movie.id.toString());
                            return (
                                <React.Fragment key={movie.id}>
                                    <MovieCard
                                        movie={movie}
                                        liked={checker}
                                    />
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                </Flex>
            </Flex>

        </ChakraProvider>
    )
}
