import { Movie, Options } from "./types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "./http/http";
import Header from "./components/Header/Header";
import TrendingMovies from "./components/Trending/Trending";
import UpcomingMovies from "./components/Upcoming/Upcoming";
import Details from "./components/DetailsPage/Details";
import { movies } from "./store";

function App() {
  const [option, setOption] = useState<Options>(Options.trending);
  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  );

  const trendingMv = useSelector((state: any) => state.movies.trendingMovies);
  const upcomingMv = useSelector((state: any) => state.movies.upcomingMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    getTrendingMoviesHandler();
    getUpcomingMoviesHandler();
    setIsDetailPage(false);
  }, []);

  useEffect(() => {
    setIsDetailPage(false);
  }, [option]);

  const getTrendingMoviesHandler = async () => {
    const { success, data } = await getMovies(Options.trending);
    if (success && data?.results) {
      const { results } = data;
      dispatch(movies.addTrendingMovies({ trendingMovies: [...results] }));
    }
  };

  const getUpcomingMoviesHandler = async () => {
    const { success, data } = await getMovies(Options.upcoming);
    if (success && data?.results) {
      const { results } = data;
      dispatch(movies.addUpcomingMovies({ upcomingMovies: [...results] }));
    }
  };

  const selectedMovieHandler = (index: number) => {
    setIsDetailPage(true);

    const movies = [...trendingMv];
    const movie = movies[index];
    setSelectedMovie(movie);
  };

  const setOptionHandler = (option: Options) => {
    setIsDetailPage(false);
    setSelectedMovie(undefined);
    setOption(option);
  };

  return (
    <div style={{ width: "100%" }}>
      <Header option={option} setOption={setOptionHandler} />

      {/* Trending Movies */}
      {!isDetailPage && option === Options.trending && (
        <TrendingMovies
          selectedMovieHandler={selectedMovieHandler}
          movies={trendingMv}
        />
      )}

      {/* Upcoming Movies */}
      {!isDetailPage && option === Options.upcoming && (
        <UpcomingMovies movies={upcomingMv} />
      )}

      {/* Movie Details */}
      {isDetailPage && selectedMovie && <Details movie={selectedMovie} />}
    </div>
  );
}

export default App;
