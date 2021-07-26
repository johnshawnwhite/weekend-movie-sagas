import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import {useHistory} from 'react-router-dom';
import { actionChannel } from 'redux-saga/effects';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();


    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);
    const addMovie = () => {
        history.push('/addmovie')
    }

    const handleDetailClick = () => {
        history.push('/details/id');
    }

    // getDetails =(event, id) => {
    //     useHistory(`/details/${id}`)
    // }

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={addMovie}>ADD MOVIE</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} onClick={handleDetailClick}>
                            <h3>{movie.title}</h3>
  {/* className="movieListItem" onClick={(event) => getDetails(event, movie.id)} */}
                            <img src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}


export default MovieList;