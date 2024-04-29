"use client";

import { DateType, FilterParamsTypes } from '@/types/movie';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'



export default function useFilter() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState<string>('');
    const [filterTarget, setFilterTarget] = useState<FilterParamsTypes>({
        date: {
            from: '',
            to: ''
        },
        sorted: '',
        genre: []
    });

    const selectedFilter = useCallback((type: 'date' | 'sorted' | 'genre', value: number | DateType) => {

        let copyFilterTarget: FilterParamsTypes = {
            ...filterTarget
        }

        if (type === 'genre' && typeof value === 'number') {
            if (filterTarget.genre.includes(value)) {
                console.log('remove');
                setFilterTarget({
                    ...filterTarget,
                    [type]: filterTarget.genre.filter(item => item !== value)
                })
            } else {
                console.log('add');
                setFilterTarget({
                    ...filterTarget,
                    [type]: [...filterTarget.genre, value]
                })
            }
            return;
        }

        if (type === 'date' && typeof value === 'object') {
            copyFilterTarget[type] = value;
        }

        if (type === 'sorted' && typeof value === 'string') {
            copyFilterTarget[type] = value;
        }


        setFilterTarget(copyFilterTarget);
    }, [])

    useEffect(() => {
        console.log(filterTarget, 'filterTarget')
    }, [filterTarget])

    return {
        selectedFilter
    }
}
