import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Banner from "./_component/Banner";
import ListingSection from "./_component/ListingSection";
import styles from './home.module.css';
import { getNowPlayingMovie, getPopularMovie } from "@/api/movie";
import { getLikeMovie } from "@/api/user";
import { auth } from "@/auth";

export default async function Home() {

    const session = await auth();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ['now_playing_movie'], queryFn: getNowPlayingMovie });
    await queryClient.prefetchQuery({ queryKey: ['popular_movie'], queryFn: getPopularMovie });
    await queryClient.prefetchQuery({ queryKey: ['like_movie', session.user.id], queryFn: getLikeMovie, gcTime: 0, staleTime: 0 });
    const dehydratedState = dehydrate(queryClient);

    return (
        <div className={styles.container}>
            <Banner />
            <HydrationBoundary state={dehydratedState}>
                <ListingSection queryKey={'now_playing_movie'} title="상영중인 영화" />
                <ListingSection queryKey={'popular_movie'} title="인기 영화" />
            </HydrationBoundary>
        </div>
    );
}