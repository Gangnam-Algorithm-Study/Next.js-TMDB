import { COLORS } from '@/assets/colors'
import { Box, Checkbox, Flex, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Filter() {

    const [radioValue, setRadioValue] = useState<string>('1');
    const [checkboxValue, setCheckboxValue] = useState<boolean>(true);

    return (
        <Flex
            flexDirection={'column'}
            w={'full'}
            backgroundColor={COLORS.white}
            borderWidth={1}
            borderTopWidth={0}
            borderBottomRadius={10}

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
            </Box>
        </Flex >
    )
}
