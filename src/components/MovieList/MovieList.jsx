import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import {useHistory} from 'react-router-dom';
import { actionChannel } from 'redux-saga/effects';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);


    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleDetailClick = event => {
        event.preventDefault();
        dispatch({
            type: 'FETCH_DETAILS',
            payload: movies.data,
        });
        useHistory('/details/id');
    }

    // getDetails =(event, id) => {
    //     useHistory(`/details/${id}`)
    // }

    return (
        <main>
            <h1>MovieList</h1>
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