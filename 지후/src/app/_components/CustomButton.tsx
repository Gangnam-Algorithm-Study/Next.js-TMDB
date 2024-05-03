"use client";
import { COLORS } from '@/assets/colors';
import { Button } from '@chakra-ui/react';
import React from 'react'

interface Props {
    children: React.ReactNode;
    onClick: () => void;
    backgroundColor?: string;
}

export default function CustomButton({ children, onClick, backgroundColor = COLORS.pupple }: Props) {
    return (
        <Button
            onClick={onClick}
            backgroundColor={backgroundColor}
            _hover={{ backgroundColor: COLORS.light_purple }}
        >
            {children}
        </ Button>
    )
}
