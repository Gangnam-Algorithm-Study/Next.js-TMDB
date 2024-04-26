"use client";

import { FilterParamsTypes } from '@/types/movie';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'

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

    return {
    }
}
