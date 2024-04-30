
import React, { ReactElement } from 'react';
import { Box, Button, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { MovieTypes } from '@/types/movie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

interface Props {
    data: MovieTypes;
}

const MovieList = ({ data }: Props): ReactElement => {

    const router = useRouter();

    return (
        <Card boxShadow="md" borderRadius="md" p={2} maxW={300} onClick={() => { router.push(`/detail/${data.id}`) }} cursor={'pointer'}>
            <Image src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`} width={300} height={250} alt={data.title} borderRadius="md" />
            <CardBody w={'full'}>
                <Stack spacing={2}>
                    <Heading fontSize={13}>{data.title}</Heading>
                    {
                        data.release_date && (
                            <Text fontSize={13}>{dayjs(data.release_date).format('M월 DD, YYYY')}</Text>
                        )
                    }
                </Stack>
            </CardBody>
        </Card>
    );
};



export default MovieList