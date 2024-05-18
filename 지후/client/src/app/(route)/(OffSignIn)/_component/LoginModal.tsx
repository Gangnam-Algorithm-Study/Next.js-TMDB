"use client"

import { postLogin } from '@/api/user'
import { COLORS } from '@/assets/colors'
import CoffieIcon from '@/assets/src/CoffieIcon'
import { ServerResponse } from '@/types/responseType'
import { ModalProps } from '@/types/utilsType'
import { Box, Button, ChakraProvider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'

export default function LoginModal({ isOpen, onClose }: ModalProps) {

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: postLogin,
        onSuccess: async (data: ServerResponse) => {
            const id = idRef.current?.value.trim();
            const pw = pwRef.current?.value.trim();
            if (data.status === 200) {
                const sign = await signIn('credentials', {
                    id,
                    password: pw
                })

                if (sign?.error) {
                    toast('로그인에 실패했습니다', { type: 'error' });
                    return;
                }

                toast('로그인 성공', { type: 'success' });
                onClose();
                console.log(data, '로그인 성공');
                router.replace('/home');
            }
        },
        onError(error) {
            if (error instanceof AxiosError && error.response) {
                switch (error?.response.data.message) {
                    case 'User not found':
                        toast('존재하지 않는 아이디입니다', { type: 'error' });
                        break;
                    default:
                        toast('로그인에 실패했습니다', { type: 'error' });
                        break;
                }
                console.log(error.response.data.message, '회원가입 에러');
            }
        }
    })

    // 입력시 rerender를 방지하기 위해 useRef 사용
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const onSubmit = async () => {
        // 입력 값 current.value로 가져와서 trim()으로 공백 제거
        const id = idRef.current?.value.trim();
        const pw = pwRef.current?.value.trim();

        if (!id || !pw) {
            toast('아이디와 비밀번호를 입력해주세요', { type: 'error' });
            return;
        }

        const sign = await signIn('credentials', {
            id,
            password: pw,
            redirect: false
        })

        console.log(sign, '로그인')

        if (sign?.error) {
            toast('로그인에 실패했습니다', { type: 'error' });
            return;
        }

        if (sign.ok) {
            toast('로그인 성공', { type: 'success' });
            onClose();
            router.replace('/home');
        }

        // mutate({
        //     id,
        //     password: pw
        // })
    }

    return (
        <ChakraProvider>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex alignItems={'center'}>
                            <CoffieIcon color={COLORS.pupple} size={25} />
                            <Text color={COLORS.black} ml={3} fontSize={25} fontWeight={'bold'}>
                                WATCH
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w={'full'}>
                            <Input
                                placeholder='아이디'
                                ref={idRef}
                            />
                        </Box>
                        <Box w={'full'} mt={5}>
                            <Input
                                placeholder='비밀번호'
                                ref={pwRef}
                                type='password'
                            />
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='whatsapp' onClick={onSubmit} isLoading={isPending}>
                            로그인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider >
    )
}
