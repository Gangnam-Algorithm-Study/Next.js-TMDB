"use client";

import { SessionProvider, useSession } from 'next-auth/react';
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export default function AuthSession({ children }: Props) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}