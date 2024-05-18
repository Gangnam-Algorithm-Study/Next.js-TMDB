import React from 'react';
import styles from './_css/movie.module.css';
import FilterTab from './_component/FilterTab';
import { headers } from 'next/headers';
import Header from '@/app/_components/Header';

export default async function layout({ children }: { children: React.ReactNode }) {
    let query: string | undefined;

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.pages}>
                <FilterTab />
                {children}
            </div>
        </div>
    )
}
