import React from 'react'
import styles from './_css/favourite.module.css';
import MovieSection from './_component/MovieSection';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { auth } from '@/auth';
import { getLikeMovie } from '@/api/user';

export default async function page() {
    return (
        <div className={styles.container}>
            <h1>좋아하는 영화</h1>
            <MovieSection />
        </div>
    )
}
