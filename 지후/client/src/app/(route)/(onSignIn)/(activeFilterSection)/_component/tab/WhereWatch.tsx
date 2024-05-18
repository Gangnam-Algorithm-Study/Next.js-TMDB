import { COLORS } from '@/assets/colors'
import { Center, Text } from '@chakra-ui/react'
import React from 'react'

export default function WhereWatch() {
    return (
        <Center
            w={'full'}
            backgroundColor={COLORS.white}
            borderWidth={1}
            borderTopWidth={0}
            borderBottomRadius={10}
            py={3}
        >
            <Text
                fontSize={13}
            >
                준비중입니다.
            </Text>
        </Center>
    )
}
