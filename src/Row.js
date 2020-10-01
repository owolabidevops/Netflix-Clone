import React, { useState, useEffect } from "react";
import axios from "./anxios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // a snippet of code which runs on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //  baseUrl : "https://api.themoviedb.org/3/discover/tv?api_${API_KEY}&with_networks=213,,
      setMovies(request.data.results);
      //   console.log(requests);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  console.log(movies);


  const opts={
      height:"390",
      width:"100%",
      playerVars:{

        autoplay: 1,
      },
  };
  const handleClick =(movie)=>{
     if(trailerUrl) {
         setTrailerUrl('');
     }else{
         movieTrailer(movie?.name || "")
         .then(url =>{
            const urlParam =new URLSearchParams(new URL(url).search);
             setTrailerUrl( urlParam.get('v'));

         }).catch(error => console.log(error))
     }
  }
  return (
    <div className="row">
      {/* title */}

      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={()=> handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* container poster */}
   {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
