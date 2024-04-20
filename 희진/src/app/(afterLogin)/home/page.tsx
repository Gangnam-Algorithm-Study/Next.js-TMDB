import {
  getNowplayingMovies,
  getNowplayingMoviesMorePage,
  getPopularMovies,
  getTrendingMovies,
} from "@/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import HomeTemplate from "./_component/HomeTelmplate";

const Home = async () => {
  const queryClinet = new QueryClient();

  await queryClinet.prefetchQuery({
    queryKey: ["nowplayingMovies"],
    queryFn: () => getNowplayingMovies(),
  });

  await queryClinet.prefetchQuery({
    queryKey: ["nowplayingMoviesInMorePage"],
    queryFn: () => getNowplayingMoviesMorePage(5),
  });

  // await queryClinet.prefetchQuery({
  //   queryKey: ["trendingMovie", "day"],
  //   queryFn: () => getTrendingMovies("day"),
  // });

  // await queryClinet.prefetchQuery({
  //   queryKey: ["trendingMovie", "week"],
  //   queryFn: () => getTrendingMovies("week"),
  // });

  await queryClinet.prefetchInfiniteQuery({
    queryKey: ["popularMovies"],
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClinet);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeTemplate />
    </HydrationBoundary>
  );
};

export default Home;
