import React from 'react'
import { COLORS } from '../colors'

interface Props {
    backgroundColor?: string,
    size?: number
}

export default function BookmarkIcon({ backgroundColor = COLORS.black, size = 32 }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={`${size}`} height={`${size}`} fill={backgroundColor} viewBox="0 0 256 256"><path d="M184,28H72A20,20,0,0,0,52,48V224a12,12,0,0,0,18.36,10.18l57.63-36,57.65,36A12,12,0,0,0,204,224V48A20,20,0,0,0,184,28Zm-4,174.35-45.65-28.53a12,12,0,0,0-12.72,0L76,202.35V52H180Z"></path></svg>
    )
}
