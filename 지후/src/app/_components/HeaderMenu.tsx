import { COLORS } from '@/assets/colors'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { MouseEvent, useState } from 'react'

interface Props {
    menu: {
        title: string,
        sub_menu: {
            title: string,
            path: string
        }[]
    },
    isOpen: string,
    setIsOpen: React.Dispatch<React.SetStateAction<string>>
}

export default function HeaderMenu({ menu, isOpen, setIsOpen }: Props) {

    const router = useRouter();

    const handleOpenMenu = (e: MouseEvent) => {
        e.stopPropagation();
        setIsOpen(menu.title);
    }

    return (
        <Flex alignItems={'center'} ml={10} h={'full'} position={'relative'} onMouseOver={handleOpenMenu} >
            <Text fontSize={16} cursor={'pointer'} color={COLORS.white}>
                {menu.title}
            </Text>
            {
                isOpen === menu.title && (
                    <Box position={'absolute'} left={0} top={'60px'} zIndex={999} backgroundColor={COLORS.white} width={170} borderRadius={5} overflow={'hidden'}>
                        {
                            menu.sub_menu.map((sub_menu) => (
                                <Flex key={sub_menu.title} w={'full'} cursor={'pointer'} alignItems={'center'} px={2} py={1} _hover={{ backgroundColor: '#F0F0F0' }} onClick={() => router.push(`${sub_menu.path}`)}>
                                    <Text color={COLORS.black} fontSize={15}>
                                        {sub_menu.title}
                                    </Text>
                                </Flex>
                            ))
                        }
                    </Box>
                )
            }
        </Flex>
    )
}
