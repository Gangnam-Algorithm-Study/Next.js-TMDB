"use client";

import { MovieCreditsTypes } from '@/types/movie';
import { Box, Center, ChakraProvider, Flex, Heading, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import ActorCard from './ActorCard';
import { useRouter } from 'next/navigation';

interface Props {
    id: string
}

export default function ActorSection({ id }: Props) {

    const queryClient = useQueryClient();
    const credits: MovieCreditsTypes | undefined = queryClient.getQueryData(['movie_credits', id]);
    const router = useRouter();

    if (!credits) {
        return (<></>)
    }

    return (
        <ChakraProvider>
            <Box width={'full'} paddingX={40} paddingY={10} mb={5}>
                <Heading fontSize={23}>
                    주요 출연진
                </Heading>
                <Flex w={'full'} mt={5} overflowX={'scroll'} paddingY={3} paddingX={5} alignItems={'center'}>
                    {
                        credits.cast.slice(0, 15).map((actor) => (
                            <React.Fragment key={actor.id}>
                                <ActorCard actor={actor} />
                            </React.Fragment>
                        ))
                    }
                    <Center minW={150}>
                        <Flex onClick={() => router.push('#')}>
                            <Text
                                fontSize={20}
                                fontWeight={'bold'}
                                cursor={'pointer'}
                                _hover={{ color: 'grey' }}
                            >
                                더보기
                            </Text>
                        </Flex>
                    </Center>
                </Flex>
            </Box>
        </ChakraProvider>
    )
}
