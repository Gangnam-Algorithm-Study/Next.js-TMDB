import { COLORS } from '@/assets/colors'
import BookmarkIcon from '@/assets/src/BookmarkIcon'
import LikeIcon from '@/assets/src/LikeIcon'
import ListIcon from '@/assets/src/ListIcon'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {
    id: string
}

type ButtonActionTypes = 'add_my_list' | 'like' | 'bookmark'

export default function ActionButtons({ id }: Props) {

    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const buttonList = [
        {
            type: 'add_my_list',
            renderIcon: () => (<ListIcon backgroundColor={COLORS.white} size={20} />)
        },
        {
            type: 'like',
            renderIcon: () => (<LikeIcon backgroundColor={COLORS.white} size={20} />)
        },
        {
            type: 'bookmark',
            renderIcon: () => (<BookmarkIcon backgroundColor={COLORS.white} size={20} />)
        }
    ]

    const handleLike = (type: ButtonActionTypes) => {
        if (!isLogin) return;

        switch (type) {
            case 'add_my_list':
                setAlertMessage('개인 리스트에 추가되었습니다.');
                break;
            case 'like':
                setAlertMessage('좋아요가 추가되었습니다.');
                break;
            case 'bookmark':
                setAlertMessage('관심 목록에 추가되었습니다.');
                break;
        }
    }

    const handleHover = (type: ButtonActionTypes) => {
        if (isLogin) return;

        switch (type) {
            case 'add_my_list':
                setAlertMessage('개인 리스트를 만들거나 편집하려면 로그인 하십시오.');
                break;
            case 'like':
                setAlertMessage('로그인하여 이 영화를 즐겨찾기에 추가');
                break;
            case 'bookmark':
                setAlertMessage('로그인하여 이 영화를 관심 목록에 추가');
                break;
        }
    }

    return (
        <Flex mt={5} position={'relative'}>
            {
                buttonList.map(({ type, renderIcon }) =>
                    <Button
                        key={type}
                        mr={8}
                        backgroundColor={`rgb(3, 37, 65,.3)`}
                        _hover={{ backgroundColor: 'inherit' }}
                        onClick={() => handleLike(type as ButtonActionTypes)}
                        onMouseOver={() => handleHover(type as ButtonActionTypes)}
                        onMouseLeave={() => setAlertMessage('')}
                    >
                        {renderIcon()}
                    </Button>
                )
            }
            {
                alertMessage &&
                <Box position={'absolute'} zIndex={99} paddingX={5} paddingY={2} borderRadius={5} backgroundColor={COLORS.black} bottom={-50}>
                    <Text color={COLORS.white} fontSize={15}>
                        {alertMessage}
                    </Text>
                </Box>
            }

        </Flex >
    )
}
