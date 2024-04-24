"use client";

import { useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'

export default function useFilter() {

    const searchParams = useSearchParams();
    const [query, setQuery] = useState<string>('');

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set(name, value);

        console.log(params);

        console.log(searchParams.has(name), 'zzz');

        return params.toString();
    }, [searchParams])

    return {
        createQueryString,
    }
}
