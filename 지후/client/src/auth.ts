// src/auth.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { IRegister, User } from './types/userTypes';
import { Session } from '@auth/core/types';

export const { signIn, signOut, handlers: { GET, POST }, auth } = NextAuth({
    ...authConfig,
    callbacks: {
        async session({ session, token, user }) {
            let returnData = {
                expires: session.expires,
                user: {}
            };
            if (session.user) {
                const userData = token.user as User;
                returnData = {
                    ...returnData,
                    user: {
                        id: userData._id,
                        _id: userData._id,
                        name: userData.name
                    }
                }
                return returnData;
            }



        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.user = user;
            }
            if (trigger === "update" && session) {
                token = { ...token, user: session }
                return token;
            };
            return token;
        },
    },
});