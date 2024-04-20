import { getDetailMovie, getMovieCredits } from "@/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MovieDetailTemplate from "./_component/MovieDetailTemplate";

const MovieDetail = async ({
  params: { id: movieId },
}: {
  params: { id: number };
}) => {
  const queryClinet = new QueryClient();
  await queryClinet.prefetchQuery({
    queryKey: ["movie", +movieId],
    queryFn: movieId ? () => getDetailMovie(+movieId) : undefined,
  });

  // await queryClinet.prefetchQuery({
  //   queryKey: ["movieCredits", +movieId],
  //   queryFn: movieId ? () => getMovieCredits(+movieId) : undefined,
  // });

  const dehydratedState = dehydrate(queryClinet);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MovieDetailTemplate />
    </HydrationBoundary>
  );
};

export default MovieDetail;
