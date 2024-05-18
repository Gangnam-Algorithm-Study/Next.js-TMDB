import React, { useEffect } from 'react';
import styles from '../_css/movie.module.css';
import { useSearchParams } from 'next/navigation';
import MovieSection from './_components/FilterMovieSection';

export default function page() {
    return (
        <div className={styles.page_container}>
            <MovieSection />
        </div>
    )
}
