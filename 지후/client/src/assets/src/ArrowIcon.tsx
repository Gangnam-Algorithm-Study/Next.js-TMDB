import React from 'react'
import { COLORS } from '../colors'
import { Box } from '@chakra-ui/react'

interface ArrowIconProps {
    direction?: 'up' | 'down' | 'left' | 'right',
    color?: string,
    size?: number
}

export default function ArrowIcon({
    direction = 'right',
    color = COLORS.black,
    size = 20
}: ArrowIconProps) {

    const arrowDirection = {
        up: 'rotate(180deg)',
        down: 'rotate(0deg)',
        left: 'rotate(90deg)',
        right: 'rotate(270deg)',
    }

    return (
        <Box transform={arrowDirection[direction]}>
            <svg xmlns="http://www.w3.org/2000/svg" width={`${size}`} height={`${size}`} fill={color} viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
        </Box>
    )
}
