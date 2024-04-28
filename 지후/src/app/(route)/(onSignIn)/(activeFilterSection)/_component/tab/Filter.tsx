import DatePickerModal from '@/app/_components/DatePickerModal';
import { COLORS } from '@/assets/colors'
import useFilter from '@/hooks/useFilter';
import { genreFilter } from '@/menus/menu';
import { Box, Button, Checkbox, Flex, Input, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

type ChoiceDate = {
    from: Date | '';
    to: Date;
}

export default function Filter() {
    const [radioValue, setRadioValue] = useState<string>('1');
    const [checkboxValue, setCheckboxValue] = useState<boolean>(true);
    const [choiceDate, setChoiceDate] = useState<ChoiceDate>({
        from: '',
        to: new Date()
    })
    const { selectedFilter } = useFilter();
    const [genre, setGenre] = useState<number[]>([]);
    const searchParams = useSearchParams();

    const onSubmit = () => {
        console.log(searchParams.toString(), 'submit')
    }

    const onChangeDate = (date: Date, name: string) => {
        if (name === 'from') {
            setChoiceDate({
                ...choiceDate,
                from: date
            })
        } else {
            setChoiceDate({
                ...choiceDate,
                to: date
            })
        }
    }

    const onChangeGenre = (type: number) => {
        selectedFilter('genre', type);
        if (genre.includes(type)) {
            setGenre(genre.filter(item => item !== type))
        } else {
            setGenre([...genre, type])
        }
    }


    return (
        <Flex
            flexDirection={'column'}
            w={'full'}
            backgroundColor={COLORS.white}
            borderWidth={1}
            borderTopWidth={0}
            borderBottomRadius={10}
            mb={10}
            overflow={'hidden'}

        >
            <Box
                backgroundColor={COLORS.white}
                borderBottomWidth={1}
                px={5}
                py={3}
            >
                <Text fontSize={14} fontWeight={100}>
                    Show Me
                </Text>
                <RadioGroup onChange={setRadioValue} value={radioValue} mt={3}>
                    <Stack>
                        <Radio value='1'>
                            <Text fontSize={12}>
                                Everything
                            </Text>
                        </Radio>
                        <Radio value='2'>
                            <Text fontSize={12}>
                                Movies I Haven't Seen
                            </Text>
                        </Radio>
                        <Radio value='3'>
                            <Text fontSize={12}>
                                Movies I Have Seen
                            </Text>
                        </Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <Box
                backgroundColor={COLORS.white}
                borderBottomWidth={1}
                px={5}
                py={3}
            >
                <Text fontSize={14} fontWeight={100}>
                    Availabilities
                </Text>
                <Checkbox mt={3} defaultChecked onChange={(e) => setCheckboxValue(e.target.checked)}>
                    <Text fontSize={12}>
                        Search all availabilities?
                    </Text>
                </Checkbox>
                {
                    !checkboxValue && (
                        <Flex w={'full'} flexDirection={'column'}>
                            <Checkbox mt={3} defaultChecked>
                                <Text fontSize={12}>
                                    Stream
                                </Text>
                            </Checkbox>
                            <Checkbox mt={3} defaultChecked>
                                <Text fontSize={12}>
                                    Free
                                </Text>
                            </Checkbox>
                            <Checkbox mt={3} defaultChecked>
                                <Text fontSize={12}>
                                    Ads
                                </Text>
                            </Checkbox>
                            <Checkbox mt={3} defaultChecked>
                                <Text fontSize={12}>
                                    Rent
                                </Text>
                            </Checkbox>
                            <Checkbox mt={3} defaultChecked>
                                <Text fontSize={12}>
                                    Buy
                                </Text>
                            </Checkbox>
                        </Flex>
                    )
                }
            </Box>
            <Box
                backgroundColor={COLORS.white}
                borderBottomWidth={1}
                px={5}
                py={3}
            >
                <Text fontSize={14} fontWeight={100}>
                    Release Dates
                </Text>
                <Checkbox mt={3} defaultChecked>
                    <Text fontSize={12}>
                        Search all releases?
                    </Text>
                </Checkbox>
                <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} mt={3}>
                    <Text fontSize={12}>
                        from
                    </Text>
                    <DatePickerModal
                        onChange={onChangeDate}
                        selected={choiceDate.from}
                        name='from'
                    />
                </Flex>
                <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} mt={3}>
                    <Text fontSize={12}>
                        to
                    </Text>
                    <DatePickerModal
                        onChange={onChangeDate}
                        selected={choiceDate.to}
                        name='to'
                    />
                </Flex>
            </Box>
            <Box
                backgroundColor={COLORS.white}
                borderBottomWidth={1}
                px={5}
                py={3}
            >
                <Text fontSize={14} fontWeight={100}>
                    장르
                </Text>
                <Flex w={'full'} mt={3} flexWrap={'wrap'}>
                    {
                        genreFilter.map(item => (
                            <Box
                                key={item.type}
                                mr={3}
                                mb={3}
                                borderWidth={.5}
                                py={1}
                                px={3}
                                borderRadius={15}
                                cursor={'pointer'}
                                onClick={() => onChangeGenre(item.type)}
                                backgroundColor={genre.includes(item.type) ? '#00B4E4' : COLORS.white}
                            >
                                <Text
                                    fontSize={14}
                                    color={genre.includes(item.type) ? COLORS.white : COLORS.black}
                                >
                                    {item.title}
                                </Text>
                            </Box>
                        ))
                    }
                </Flex>
            </Box>
            <Box
                backgroundColor={COLORS.white}
                borderBottomWidth={1}
                px={5}
                py={3}
            >
                <Text fontSize={14} fontWeight={100}>
                    Certification
                </Text>
            </Box>
            <Button onClick={onSubmit} borderRadius={0} colorScheme='telegram'>
                Sumbit
            </Button>
        </Flex>
    )
}
