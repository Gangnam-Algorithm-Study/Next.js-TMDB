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
import { io } from 'socket.io-client'

interface Props {
    movie: MovieTypes,
}

export default function LikeButton({ movie }: Props) {
    const session = useSession();
    const user_id = session.data?.user.id;
    const queryClinet = useQueryClient();
    const likedMovie: ServerResponse | undefined = queryClinet.getQueryData(['like_movie', user_id]);
    const [liked, setLiked] = useState<boolean>(false);
    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ['like_movie', movie?.id],
        mutationFn: addLikeMovie,
        onSuccess(data) {
            queryClinet.refetchQueries({
                queryKey: ['like_movie', user_id],
            });
            toast(`좋아하는 영화에 추가되었습니다`, { type: 'success' });
            setLiked(true);
            console.log(data);
        },
        onError(error) {
            toast(`좋아하는 영화 추가에 실패했습니다`, { type: 'error' });
            console.log(error);
        }
    })

    const { mutate: removeMutate } = useMutation({
        mutationKey: ['remove_like_movie', movie?.id.toString(), user_id as string],
        mutationFn: removeLikeMovie,
        onSuccess(data) {
            console.log(data);
            queryClinet.refetchQueries({
                queryKey: ['like_movie', user_id],
            });
            setLiked(false);
            toast(`좋아하는 영화에서 제거되었습니다`, { type: 'info' });
        }
    })

    useEffect(() => {
        if (likedMovie?.status === 200) {
            setLiked(likedMovie?.data?.movie_id_list.includes(movie?.id.toString()));
        }
    }, [likedMovie])


    const onLikeMovie = (e: React.MouseEvent) => {
        e.stopPropagation();

        console.log(socket);


        socket.emit('likeMovie', {
            movie_id: movie?.id,
            user_id: user_id,
        });
        // const likeStatus = likedMovie?.data?.movie_id_list.includes(movie?.id.toString());

        // if (!likeStatus) {
        //     mutate({ user_id, movie });
        // } else {
        //     removeMutate({
        //         movie_id: movie?.id.toString(),
        //         user_id: user_id as string,
        //     });
        // }
    }

    return (
        <Button onClick={onLikeMovie} p={0} backgroundColor={liked ? COLORS.pupple : COLORS.white}>
            <LikeIcon size={18} color={liked ? COLORS.white : COLORS.pupple} />
        </Button>
    )
}
