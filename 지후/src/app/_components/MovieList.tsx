
import React, { ReactElement } from 'react';
import { Box, Button, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { MovieTypes } from '@/types/movie';
import Link from 'next/link';

interface Props {
    data: MovieTypes;
}

const MovieList = ({ data }: Props): ReactElement => {


    return (
        <Card boxShadow="md" borderRadius="md" p={2} maxW={300}>
            <Image src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`} width={300} height={350} alt={data.title} borderRadius="md" />
            <CardBody>
                <Stack spacing={2}>
                    <Heading fontSize={13}>{data.title}</Heading>
                    <Text>{data.overview.slice(0, 16)}...</Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <Link href={`/detail/${data.id}`}>
                    <Button colorScheme="blue">Watch Now</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};



export default MovieList