import React from 'react'
import { getMovieCredits, getMovieDetail, getMovieVideos } from '@/api/movie'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import DetailHeader from './_component/DetailHeader'
import IntroductionSection from './_component/IntroductionSection'
import ActorSection from './_component/ActorSection'

interface PageProps {
    params: {
        slug: string
    }
}

export default async function Page({ params: { slug } }: PageProps) {
    const id = slug;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({ queryKey: ['movie_detail', id], queryFn: getMovieDetail });
    await queryClient.prefetchQuery({ queryKey: ['movie_credits', id], queryFn: getMovieCredits });
    await queryClient.prefetchQuery({ queryKey: ['movie_videos', id], queryFn: getMovieVideos });
    const dehydratedState = dehydrate(queryClient);

    return (
        <div>
            <DetailHeader />
            <HydrationBoundary state={dehydratedState}>
                <IntroductionSection id={id} />
                <ActorSection id={id} />
            </HydrationBoundary>
        </div>
    )
}
