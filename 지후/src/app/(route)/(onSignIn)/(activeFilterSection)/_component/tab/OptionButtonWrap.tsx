import ArrowIcon from '@/assets/src/ArrowIcon';
import { FilterMenuTypes } from '@/types/utilsType';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react'
import Sort from './Sort';
import WhereWatch from './WhereWatch';
import Filter from './Filter';
import { COLORS } from '@/assets/colors';

export default function OptionButtonWrap({ title, type }: FilterMenuTypes) {

    const [isOpen, setIsOpen] = useState<boolean>(type === 'filter' ? true : false);

    const renderOption = (): ReactElement => {
        if (type === 'sort') {
            return (<Sort />)
        }

        if (type === 'whereWatch') {
            return (<WhereWatch />)
        }

        if (type === 'filter') {
            return (<Filter />)
        }

        return <></>
    }

    return (
        <>
            <Flex
                w={'full'}
                justifyContent={'space-between'}
                cursor={'pointer'}
                h={'60px'}
                borderRadius={10}
                borderBottomRadius={isOpen ? 0 : 10}
                alignItems={'center'}
                boxShadow={'xl'}
                backgroundColor={COLORS.white}
                px={4}
                borderWidth={1}
                mt={3}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Text fontWeight={'bold'}>
                    {title}
                </Text>
                <ArrowIcon direction={isOpen ? 'down' : 'right'} />
            </Flex>
            {isOpen && renderOption()}
        </>
    )
}
