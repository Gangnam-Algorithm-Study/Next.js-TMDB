import React from 'react'
import styles from './_css/login.module.css';
import ContentSection from './_component/ContentSection';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function page() {

    const session = await auth();

    if (session?.user) {
        redirect('/home');
    }

    return (
        <div className={styles.container}>
            <div className={styles.backdrop_image} />
            <div className={styles.content_box}>
                <ContentSection />
            </div>
        </div>
    )
}
