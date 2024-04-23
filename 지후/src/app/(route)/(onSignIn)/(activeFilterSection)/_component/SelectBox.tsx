import { COLORS } from '@/assets/colors';
import ArrowIcon from '@/assets/src/ArrowIcon';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react'

interface Props {
    arr: { type: string, title: string }[]
}

export default function SelectBox({ arr }: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<string>(arr[0].title);

    return (
        <Box>
            <Flex
                w={'full'}
                h={'35px'}
                position={'relative'}
                mt={3}
                borderRadius={5}
                backgroundColor={COLORS.light_gray}
                alignItems={'center'}
                justifyContent={'space-between'}
                cursor={'pointer'}
                _hover={{ backgroundColor: COLORS.gray }}
                onClick={() => setIsOpen(!isOpen)}
                transition={'all .5s ease-in-out'}
                px={3}
            >
                <Text fontSize={14}>
                    {selectedOptions}
                </Text>
                <ArrowIcon size={13} direction={isOpen ? 'up' : 'down'} />
                {
                    isOpen && (
                        <Box
                            w={'full'}
                            position={'absolute'}
                            left={0}
                            top={'35px'}
                            minH={200}
                            backgroundColor={COLORS.white}
                            borderWidth={1}
                            zIndex={999}
                            maxH={200}
                            borderRadius={5}
                            overflowY={'scroll'}
                        >
                            {
                                arr.map((item, index) => (
                                    <Flex
                                        key={index}
                                        w={'full'}
                                        h={'35px'}
                                        px={3}
                                        alignItems={'center'}
                                        _hover={{ backgroundColor: COLORS.light_gray }}
                                        onClick={() => {
                                            setSelectedOptions(item.title)
                                            setIsOpen(false)
                                        }}
                                    >
                                        <Text fontSize={14}>
                                            {item.title}
                                        </Text>
                                    </Flex>
                                ))
                            }
                        </Box>
                    )
                }

            </Flex>
        </Box>
    )
}
