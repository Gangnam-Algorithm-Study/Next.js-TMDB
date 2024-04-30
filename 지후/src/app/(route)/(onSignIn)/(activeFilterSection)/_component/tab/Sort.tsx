import { COLORS } from '@/assets/colors'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import SelectBox from '../SelectBox'
import { sortResults } from '@/menus/menu'

export default function Sort() {
    return (
        <Flex
            w={'full'}
            backgroundColor={COLORS.white}
            borderWidth={1}
            borderTopWidth={0}
            borderBottomRadius={10}
            px={5}
            py={3}
            flexDirection={'column'}
        >
            <Text fontSize={14} color={COLORS.gray} fontWeight={300}>
                Sort Results By
            </Text>
            <SelectBox arr={sortResults} />
        </Flex>
    )
}
