import { ListItemAvatar } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams} from "react-router-dom";

function MovieDetails() {

    const movie = useSelector(store => store.selectedMovieDetails);
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
  
    // Fetch some data when page loads:
    useEffect(() => {
      dispatch({
        type: 'GET_MOVIE_DETAILS',
        payload: {
          movieId: params.id
        }
      });
    }, [params.id]);
  
    // Function to handle the display of the genre with checking for NULL values.
    const displayGenres = (genres) => {
      if(genres && genres.length > 0) {
        return genres.map(genre => (<li key={genre.id}>{genre.name}</li>))
      } else {
        return (<p>No genres have been selected for this film.</p>);
      }
    }
  
    return (
      <section>
        <button onClick={() => history.push('/')}>Back to List</button>
        <button onClick={() => history.push(`/edit/${params.id}`)}>Edit</button>
        <article>
        
          <h2>{movie.title}</h2>
          <img src={movie.poster}/>
          <p>{movie.description}</p>
          <ul>
            {
              movie.genres && movie.genres.map(genre =>
                (genre && <li key={genre.id}>{genre.name}</li>)
              )
            }
            {displayGenres(movie.genre)}
          </ul>
        </article>
      </section>
    )
  
  }
  
  
  
  export default MovieDetails;
