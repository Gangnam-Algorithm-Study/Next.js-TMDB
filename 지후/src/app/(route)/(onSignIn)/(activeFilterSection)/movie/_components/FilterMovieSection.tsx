"use client";

import { getMovies } from '@/api/movie';
import Loading from '@/app/_components/Loading';
import MovieList from '@/app/_components/MovieList';
import { useFilterStore } from '@/store/createFilterUrl';
import { MovieTypes } from '@/types/movie';
import { Box, ChakraProvider, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

export default function MovieSection() {

    const { url } = useFilterStore();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['getMovies', url],
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) => getMovies({ pageCount: pageParam, url }),
        getNextPageParam: (lastPage) => {
            return lastPage.total_pages > lastPage.page ? lastPage.page + 1 : undefined;
        },
        getPreviousPageParam: (firstPage) => firstPage.page,
        staleTime: 60 * 1000,
        gcTime: 80 * 1000,
    })

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0,
    })



    useEffect(() => {
        if (inView) ((!isFetching && hasNextPage)) && fetchNextPage();

        console.log(data)
    }, [inView, isFetching, hasNextPage, fetchNextPage])

    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <ChakraProvider>
            <Flex flex={1}>
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
                        <Grid templateColumns={'repeat(5,1fr)'} gap={6}>
                            {data?.pages.map((group, i) => (
                                <React.Fragment key={i}>
                                    {group?.results?.map((item: MovieTypes) => (
                                        <MovieList key={item.id} data={item} />
                                    ))}
                                </React.Fragment>
                            ))}
                        </Grid>
                        <Box ref={ref} height={50} />
                        {
                            isFetchingNextPage &&
                            <Stack justifyContent={'center'} alignItems={'center'} paddingY={10}>
                                <Text>Loading...</Text>
                            </Stack>
                        }
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}
