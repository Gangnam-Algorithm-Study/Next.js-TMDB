import { COLORS } from '@/assets/colors'
import LikeIcon from '@/assets/src/LikeIcon'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
    id: number,
}

export default function LikeButton({ id }: Props) {

    const onLikeMovie = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(id, 'Like Movie')
    }

    return (
        <Button onClick={onLikeMovie} p={0}>
            <LikeIcon size={18} color={COLORS.pupple} />
        </Button>
    )
}
