import { IconTypes } from '@/types/utilsType'
import React from 'react'
import { COLORS } from '../colors'

export default function CoffieIcon({ color = COLORS.black, size = 32 }: IconTypes) {
    return (
        <svg width={`${size}`} height={`${size}`} fill={color} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 10.6666H25.3333C26.7478 10.6666 28.1044 11.2285 29.1046 12.2287C30.1048 13.2289 30.6667 14.5855 30.6667 16C30.6667 17.4144 30.1048 18.771 29.1046 19.7712C28.1044 20.7714 26.7478 21.3333 25.3333 21.3333H24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.6665 10.6666H23.9998V22.6666C23.9998 24.0811 23.4379 25.4377 22.4377 26.4379C21.4375 27.4381 20.081 28 18.6665 28H7.99984C6.58535 28 5.2288 27.4381 4.2286 26.4379C3.22841 25.4377 2.6665 24.0811 2.6665 22.6666V10.6666Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 1.33337V5.33337" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.3335 1.33337V5.33337" stroke="#7900C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.6665 1.33337V5.33337" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
