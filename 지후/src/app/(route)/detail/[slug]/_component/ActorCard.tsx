import { MovieCreditsCastTypes } from '@/types/movie'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    actor: MovieCreditsCastTypes
}

export default function ActorCard({ actor }: Props) {

    const router = useRouter();

    const onClickActor = () => {
        router.push(`#`)
    }

    return (
        <Flex
            flexDirection={'column'}
            boxShadow={'xl'}
            minW={200}
            h={300}
            mr={5}
            borderRadius={10}
            onClick={() => console.log(actor)}
            overflow={'hidden'}
        >
            <Box flex={1} overflow={'hidden'} cursor={'pointer'} onClick={onClickActor}>
                {
                    actor.profile_path === null ? (
                        <Image src={'https://via.placeholder.com/300'} style={{ width: '100%', height: '100%' }} />
                    ) :
                        <Image src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`} style={{ width: '100%', height: '100%' }} />
                }
            </Box>
            <Box height={'30%'} w={'full'} paddingY={3} paddingX={2}>
                <Text fontWeight={'bold'} cursor={'pointer'} fontSize={16} _hover={{ color: 'grey' }} onClick={onClickActor}>
                    {actor.name}
                </Text>
                <Text fontWeight={'normal'} fontSize={14}>
                    {actor.character}
                </Text>
            </Box>
        </Flex>
    )
}
