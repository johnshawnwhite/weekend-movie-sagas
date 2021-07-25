import { ListItemAvatar } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from "react-router-dom";


function Details() {

    const history = useHistory();

    const movieID = useSelector(store => store.movieID);
    const movies  = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);


    consst handleClick = () => {
        history.push('/');
    }
    return (
        <main>
            <h1>Details Page</h1>
            <h2>{movies[movieID-1].title}</h2>
            <img src={movies[movieID-1].poster}/>
            <h2>Genres:</h2>
                <ul>
                    {genres.map((item) => {
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>
                <p>(movies[movieId-1].description)</p>
                <button onClick={() => handleClick()}>Return</button>
        </main>

    );
}
export default Details;