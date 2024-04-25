"use client";

import React from 'react';
import styles from '../_css/movie.module.css';
import { useSearchParams } from 'next/navigation';

export default function page() {

    const searchParams = useSearchParams();

    return (
        <div className={styles.page_container}>
            <button>
                {searchParams.toString()}
            </button>
        </div>
    )
}
