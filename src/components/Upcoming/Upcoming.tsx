import React, { useState } from "react";
import { Movie } from "../../types";
import Card from "../Card/Card";
import classes from "./Upcoming.module.css";

type Props = {
  movies: Movie[];
};

const UpcomingMovies: React.FC<Props> = (props) => {
  const { movies } = props;
  const [movieIndex, setMovieIndex] = useState(0);

  return (
    <div className={classes.main}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movies[movieIndex].backdrop_path}`}
        width={500}
        height={500}
      />
      <div className={classes.movies}>
        {movies.length > 0 &&
          movies.map((movie, index) => (
            <div key={index} onClick={() => setMovieIndex(index)}>
              <Card imageUrl={movie.backdrop_path} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
