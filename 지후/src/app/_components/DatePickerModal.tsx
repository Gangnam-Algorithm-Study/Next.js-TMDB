import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styles from '../_css/datePicker.module.css';

import "react-datepicker/dist/react-datepicker.css";
import CalandarIcon from "@/assets/src/CalandarIcon";

interface Props {
    selected: Date | '';
    onChange: (date: Date, name: string) => void;
    name: string;
}

export default function DatePickerModal({ onChange, selected, name }: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Flex>
            <DatePicker selected={selected ? selected : new Date()} onChange={(date: Date) => { onChange(date, name); setIsOpen(false) }} className={styles.datePicker} open={isOpen} />
            <Button onClick={() => setIsOpen(!isOpen)} p={0} h={30} borderLeftRadius={0}>
                <CalandarIcon size={15} />
            </Button>
        </Flex>
    )
}
