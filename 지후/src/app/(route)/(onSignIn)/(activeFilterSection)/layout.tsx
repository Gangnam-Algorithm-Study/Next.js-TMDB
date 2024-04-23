import React from 'react';
import styles from './_css/movie.module.css';
import FilterTab from './_component/FilterTab';
import { headers } from 'next/headers';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <FilterTab />
            {children}
        </div>
    )
}
