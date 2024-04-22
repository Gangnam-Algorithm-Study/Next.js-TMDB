import { COLORS } from '@/assets/colors'
import { Box, Flex, Text } from '@chakra-ui/react'
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
    const handleOpenMenu = (e: MouseEvent) => {
        e.stopPropagation();
        setIsOpen(menu.title);
    }

    return (
        <Flex alignItems={'center'} ml={10} h={'full'} position={'relative'} onMouseOver={handleOpenMenu} >
            <Text fontSize={16} cursor={'pointer'}>
                {menu.title}
            </Text>
            {
                isOpen === menu.title && (
                    <Box position={'absolute'} left={0} top={'60px'} zIndex={999} backgroundColor={COLORS.white} width={170} borderRadius={5} >
                        {
                            menu.sub_menu.map((sub_menu) => (
                                <Flex key={sub_menu.title} cursor={'pointer'} mb={2} alignItems={'center'} mx={5} my={3}>
                                    <Text color={COLORS.black} fontSize={13}>
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
