import React from 'react';
import { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function EditMovie() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const movie = useSelector(store => store.editMovie);
  const genres = useSelector(store => store.genres);

  useEffect(() => {
    if (params.id === undefined) {
      dispatch({
        type: 'RESET_EDIT_DATA'
      });
    } else {
      dispatch({
        type: 'GET_MOVIE_DETAILS',
        payload: { movieId: params.id }
      });
    }
  }, [params.id]);

  useEffect(() => {
    dispatch({
      type: 'GET_GENRES'
    });
  }, []);

  const onCancel = () => {
    // if we're adding a movie
    if (params.id === undefined) {
      history.push('/');
    }
    // if we're editing a movie
    else {
      history.push(`/details/${params.id}`);
    }
  };

  const onSave = () => {
    dispatch({
      type: 'SAVE_MOVIE',
      payload: movie
    });
  }
  
  const updateMovie = () => {
    dispatch({
      type: 'UPDATE_EDIT_MOVIE',
      payload: movie
    });
  }


  return (<div>
    <button onClick={onCancel}>Cancel</button>
    <button onClick={onSave}>Save</button>
    <div>
      <input
        placeholder="Title"
        value={movie.title}
        onChange={(event) => updateMovie({ title: event.target.value })}
      />
    </div>
    <div>
      <input
        placeholder="Poster URL"
        value={movie.poster}
        onChange={(event) => updateMovie({ poster: event.target.value })}
      />
    </div>
    {
      // Only show genre select for new movie
      params.id === undefined && <div>
        <select onChange={event => updateMovie({ genre_id: Number(event.target.value)})}>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
    }

    <div>
      <textarea
        placeholder="Description"
        value={movie.description}
        onChange={(event) => updateMovie({ description: event.target.value })}
      />
    </div>
    <ul>
      {
        movie.genres &&
        movie.genres.map(genre => (
          genre && <li key={genre.id}>{genre.name}</li>
        ))
      }
    </ul>
  </div>
);

}


export default EditMovie;