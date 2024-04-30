'use client';

import { Box, ChakraProvider, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react'
import MovieList from './MovieList';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getTopRated } from '@/api/movie';
import { MovieTypes } from '@/types/movie';
import { useInView } from 'react-intersection-observer';
import useIntersection from '@/hooks/useIntersection';

export default function Movie(): ReactElement {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching
    } = useInfiniteQuery({
        queryKey: ['top_rated'],
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) => getTopRated({ pageCount: pageParam }),
        getNextPageParam: (lastPage) => {
            return lastPage.total_pages > lastPage.page ? lastPage.page + 1 : undefined;
        },
        getPreviousPageParam: (firstPage) => firstPage.page,
        staleTime: 60 * 1000,
        gcTime: 80 * 1000
    })

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0,
    })

    useEffect(() => {
        if (inView) ((!isFetching && hasNextPage)) && fetchNextPage();
    }, [inView, isFetching, hasNextPage, fetchNextPage])


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
            >
                <Flex gap={0} height={'100%'} width={'100%'} flexDirection={'column'} alignItems={'center'}>
                    <Grid templateColumns={'repeat(4,1fr)'} gap={6}>
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
        </ChakraProvider>
    )
}
