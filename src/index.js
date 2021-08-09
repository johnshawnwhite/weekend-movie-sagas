import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield movieSaga();
    // yield genreSaga(); -- if we had more functionality for CRUD genre.
}

function* movieSaga() {
    yield takeEvery('GET_MOVIES', fetchAllMovies);
    yield takeEvery('GET_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('GET_MOVIE_GENRES', fetchMovieGenres);
    yield takeEvery('GET_GENRES', fetchGenres);
    yield takeEvery('SAVE_MOVIE', saveMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }

}

// Fetch movies details
function* fetchMovieDetails(action) {
    const movieDetailsResponse = yield axios.get(`/api/movie/details/${action.payload.movieId}`);
    yield put({ type: 'SET_MOVIE_DETAILS', payload: movieDetailsResponse.data });
    yield put({ type: 'SET_EDIT_MOVIE', payload: movieDetailsResponse.data });
    yield put({ type: 'GET_MOVIE_GENRES', payload: {movieId: action.payload.movieId }});
}

function* fetchMovieGenres(action) {
    const movieGenresResponse = yield axios.get(`/api/movie/genres/${action.payload.movieId}`);
    yield put({ type: 'SET_MOVIE_GENRE', payload: movieGenresResponse.data });
}

function* fetchGenres(action) {
    const res = yield axios.get('/api/genre');
    yield put({ type: 'SET_GENRES', payload: res.data });
}

function* saveMovie(action) {
    // Update an existing movie
    if (action.payload.id) {
        yield axios.put(`api/movie/${action.payload.id}`, action.payload);
    }
    // Create a new movie
    else {
        yield axios.post('api/movie', action.payload);
    }
    yield put({ type: 'GET_MOVIES' });
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const selectedMovieDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        case 'SET_MOVIE_GENRES':
            return { ...state, genres: action.payload }
        default:
            return state;
    }
}

const editMovie = (state = { title: '', description: '', poster: ''}, action) => {
    switch (action.type) {
        case 'SET_EDIT_MOVIE':
            return action.payload;
        case 'RESET_EDIT_MOVIE':
            return { title: '', poster: '', description: '' };
        case 'UPDATE_EDIT_MOVIE':
            return {...state, ...action.payload };
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        selectedMovieDetails,
        editMovie,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
