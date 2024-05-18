"use client";

import { COLORS } from '@/assets/colors'
import { IMovieVideo, MovieCreditsTypes, MovieTypes } from '@/types/movie'
import { Box, Button, ChakraProvider, Flex, Heading, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import ActionButtons from './ActionButtons';
import Link from 'next/link';
import { VIDEO_URL } from '@/api/movie';
import TrailerModal from './TrailerModal';

interface Props {
    id: string
}

export default function IntroductionSection({ id }: Props) {
    const queryClient = useQueryClient();
    const [trailerOpen, setTrailerOpen] = useState<boolean>(false);
    const data: MovieTypes | undefined = queryClient.getQueryData(['movie_detail', id]);
    const credits: MovieCreditsTypes | undefined = queryClient.getQueryData(['movie_credits', id]);
    const videos: IMovieVideo[] | undefined = queryClient.getQueryData(['movie_videos', id]);
    const director = credits?.crew.find(crew => crew.job === 'Director')?.name;
    const trailer = videos.filter(value => value.type === 'Trailer')?.[0];

    if (!data) {
        return <></>
    }

    return (
        <ChakraProvider>
            <TrailerModal
                isOpen={trailer?.key && trailerOpen}
                onClose={() => setTrailerOpen(false)}
                id={trailer?.key}
            />
            <Flex width={'full'} height={600} justifyContent={'space-between'} alignItems={'center'}>
                <Box position={'absolute'} width={'100%'} height={600} left={0} backgroundImage={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} zIndex={-2} />
                <Box position={'absolute'} width={'100%'} height={600} left={0} background={'linear-gradient(to right, rgba(10.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(10.5, 31.5, 52.5, 0.84) 50%, rgba(10.5, 31.5, 52.5, 0.84) 100%);'} zIndex={-1} />
                <Flex width={'full'} height={600} paddingX={10} paddingY={10}>
                    <Flex width={'30%'} height={'full'} justifyContent={'center'} alignItems={'center'} padding={5}>
                        <Flex width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
                            <img src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`} style={{ borderRadius: 15 }} />
                        </Flex>
                    </Flex>
                    <Flex width={'70%'} height={'full'} padding={5}>
                        <Box>
                            <Heading color={COLORS.white} fontSize={27}>
                                {data.title} ({data.release_date.split('-')[0]})
                            </Heading>
                            <Flex marginTop={5}>
                                <Box borderRadius={5} paddingX={2} borderWidth={1}>
                                    <Text color={COLORS.white} fontSize={13}>{data.release_date.split('-').join('/')}</Text>
                                </Box>
                                <Flex>
                                    {
                                        data.genres.map((genre, index) => (
                                            <Box key={index} marginLeft={2} borderRadius={5} paddingX={2} borderWidth={1}>
                                                <Text color={COLORS.white} fontSize={13}>{genre.name}</Text>
                                            </Box>
                                        ))
                                    }
                                </Flex>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <ActionButtons id={id} />
                                {
                                    trailer?.key && (
                                        <Button mt={5} colorScheme={'whatsapp'} px={5} fontSize={14} onClick={() => setTrailerOpen(true)}>
                                            트레일러 시청
                                        </Button>
                                    )
                                }
                            </Flex>
                            <Text color={COLORS.white} fontStyle={'italic'} mt={5} opacity={.7}>
                                {data.tagline}
                            </Text>
                            <Box mt={5}>
                                <Heading color={COLORS.white} fontSize={25}>개요</Heading>
                                <Text color={COLORS.white} marginTop={5}>
                                    {data.overview}
                                </Text>
                            </Box>
                            <Flex mt={10}>
                                <Box>
                                    <Heading color={COLORS.white} fontSize={16} opacity={.7}>감독</Heading>
                                    <Link href={`#`}>
                                        <Text color={COLORS.white} fontSize={13} marginTop={2}>
                                            {director}
                                        </Text>
                                    </Link>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}
