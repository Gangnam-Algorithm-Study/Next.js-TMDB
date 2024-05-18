"use client";
import { COLORS } from '@/assets/colors';
import CoffieIcon from '@/assets/src/CoffieIcon';
import { Button, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ContentSection() {
    const [signInModal, setSignInModal] = useState<boolean>(false);
    const [signUpModal, setSignUpModal] = useState<boolean>(false);
    const { data } = useSession();

    return (
        <ChakraProvider>
            <LoginModal
                isOpen={signInModal}
                onClose={() => setSignInModal(false)}
                onSubmit={() => console.log('submit')}
            />
            <RegisterModal
                isOpen={signUpModal}
                onClose={() => setSignUpModal(false)}
                onSubmit={() => console.log('submit')}
            />
            <Flex justifyContent={'center'} flexDirection={'column'} alignItems={'center'} backgroundColor={COLORS.black} p={10} borderRadius={'xl'}>
                <Flex alignItems={'center'}>
                    <CoffieIcon color={COLORS.white} />
                    <Text color={COLORS.white} ml={5} fontSize={30} fontWeight={'bold'}>
                        WATCH
                    </Text>
                </Flex>
                <Text color={COLORS.white} my={5}>
                    Enjoy the newest movies
                </Text>
                <Button w={200} backgroundColor={COLORS.pupple} _hover={{ backgroundColor: COLORS.light_purple }} color={COLORS.white} onClick={() => setSignInModal(true)}>
                    Login
                </Button>
                <Flex mt={5}>
                    <Text color={COLORS.white} mr={2}>
                        Don't have an account?
                    </Text>
                    <Text color={COLORS.white} fontWeight={'bold'} cursor={'pointer'} onClick={() => setSignUpModal(true)}>
                        Sign Up
                    </Text>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}
