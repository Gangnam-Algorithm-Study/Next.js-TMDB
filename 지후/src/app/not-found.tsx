import React from 'react'
import styles from '@/app/_css/notFound.module.css';
import NotFoundButton from './_components/NotFoundButton';

export default function NotFound() {

    return (
        <div className={styles.container}>
            <h1>찾으시는 페이지가 없습니다</h1>
            <NotFoundButton />
        </div>
    )
}
