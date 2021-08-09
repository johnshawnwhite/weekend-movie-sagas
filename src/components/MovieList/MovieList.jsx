import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import {useHistory} from 'react-router-dom';
import { actionChannel } from 'redux-saga/effects';
import ImageDetails from 'material-ui/svg-icons/image/details';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory(); // import history!

    useEffect(() => {
        dispatch({ type: 'GET_MOVIES' });
    }, []);

    const onSelectMovie = (movieId) => {
        history.push(`/details/${movieId}`); // req.params.id...
    }
        const addMovie = () => {
        history.push('/addmovie')
    }

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={addMovie}>ADD MOVIE</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => onSelectMovie(movie.id)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;
// function MovieList() {

//     const dispatch = useDispatch();
//     const movies = useSelector(store => store.movies);
//     const history = useHistory();


//     useEffect(() => {
//         dispatch({ type: 'FETCH_MOVIES' });
//     }, []);


//     const handleDetailClick = () => {
//         dispatch({ type: "FETCH_DETAILS"})
//         history.push(`/details/details:id`);
//     }

//     // getDetails =(event, id) => {
//     //     useHistory(`/details/${id}`)
//     // }

//     return (
//         <main>
//             <h1>MovieList</h1>
//             
//             <section className="movies">
//                 {movies.map(movie => {
//                     return (
//                         <div key={movie.id} onClick={handleDetailClick}>
//                             <h3>{movie.title}</h3>

//                             <img src={movie.poster} alt={movie.title}/>
//                         </div>
//                     );
//                 })}
//             </section>
//         </main>

//     );
// }


// export default MovieList;