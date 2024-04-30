import React from 'react';
import styles from './_css/movie.module.css';
import FilterTab from './_component/FilterTab';
import { headers } from 'next/headers';

export default async function layout({ children }: { children: React.ReactNode }) {
    let query: string | undefined;

    return (
        <div className={styles.container}>
            <FilterTab />
            {children}
        </div>
    )
}
