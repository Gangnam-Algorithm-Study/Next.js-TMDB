import { IconTypes } from '@/types/utilsType'
import React from 'react'
import { COLORS } from '../colors'

export default function TrendingIcon({ color = COLORS.black, size = 32 }: IconTypes) {
    return (
        <svg width={`${size}`} height={`${size}`} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 6H23V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
