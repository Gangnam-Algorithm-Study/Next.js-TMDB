import { addLikeMovie, removeLikeMovie } from '@/api/user'
import { COLORS } from '@/assets/colors'
import LikeIcon from '@/assets/src/LikeIcon'
import { MovieTypes } from '@/types/movie'
import { ServerResponse } from '@/types/responseType'
import { Box, Button } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { socket } from '../(route)/(onSignIn)/_socket/SocketProvider'

interface Props {
    movie: MovieTypes,
}

export default function LikeButton({ movie }: Props) {
    const session = useSession();
    const user_id = session.data?.user.id;
    const queryClinet = useQueryClient();
    const likedMovie: ServerResponse | undefined = queryClinet.getQueryData(['like_movie', user_id]);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        if (socket.connected) {

        }
    }, [])

    useEffect(() => {
        if (likedMovie?.status === 200) {
            setLiked(likedMovie?.data?.movie_id_list.includes(movie?.id.toString()));
        }
    }, [likedMovie])


    const onLikeMovie = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (socket.connected) {
            socket.on(`movie_${movie?.id}`, (data) => {
                if (data.message === 'add like movie') {
                    setLiked(true);
                }

                if (data.message === 'remove like movie') {
                    setLiked(false);
                }

                queryClinet.refetchQueries({
                    queryKey: ['like_movie', user_id],
                })
            })
            socket.emit('likeMovie', {
                movie,
                user_id,
            });
        } else {
            console.log('연결 안됨')
        }
    }

    return (
        <Button onClick={onLikeMovie} p={0} backgroundColor={liked ? COLORS.pupple : COLORS.white} _hover={{ backgroundColor: liked ? COLORS.pupple : COLORS.white }}>
            <LikeIcon size={18} color={liked ? COLORS.white : COLORS.pupple} />
        </Button>
    )
}
