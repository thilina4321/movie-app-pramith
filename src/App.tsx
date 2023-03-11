import { Movie, Options } from "./types";
import { useEffect, useState } from "react";
import { getMovies } from "./http/http";
import Header from "./components/Header/Header";
import TrendingMovies from "./components/Trending/Trending";
import UpcomingMovies from "./components/Upcoming/Upcoming";
import Details from "./components/DetailsPage/Details";

function App() {
  const [option, setOption] = useState<Options>(Options.trending);
  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  );

  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

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
      setTrendingMovies(() => [...results]);
    }
  };

  const getUpcomingMoviesHandler = async () => {
    const { success, data } = await getMovies(Options.upcoming);
    if (success && data?.results) {
      const { results } = data;
      setUpcomingMovies(() => [...results]);
    }
  };

  const selectedMovieHandler = (index: number) => {
    setIsDetailPage(true);

    const movies = [...trendingMovies];
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
          movies={trendingMovies}
        />
      )}

      {/* Upcoming Movies */}
      {!isDetailPage && option === Options.upcoming && (
        <UpcomingMovies movies={upcomingMovies} />
      )}

      {/* Movie Details */}
      {isDetailPage && selectedMovie && <Details movie={selectedMovie} />}
    </div>
  );
}

export default App;
