"use client";

import React, { useEffect } from 'react'
import io from 'socket.io-client';

// export const socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string);
export const socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string);

export default function SocketProvider({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        if (!socket.connected) {
            console.log('연결');
            socket.connect();

            socket.on('connect', () => {
                console.log('connected', socket);
            });
        }

        return () => {
            if (socket.connected) {
                console.log('연결 끊김')
                socket.disconnect();
            }
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}
