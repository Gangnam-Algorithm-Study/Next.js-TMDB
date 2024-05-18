import React from 'react'
import SocketProvider from './_socket/SocketProvider'

export default function layout({ children }) {
    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    )
}
