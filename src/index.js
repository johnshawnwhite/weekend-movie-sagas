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
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_DETAILS', fetchDetails);
    yield takeEvery('GET_ALL_GENRES', fetchAllGenres)
    yield takeEvery('ADD_MOVIE', addMovie)
}

function* fetchAllGenres() {
    // get all movies from the DB
    try {
        const genres = yield axios.get('/api/AllGenres');
        console.log('get all:', genres.data);
        yield put({ type: 'SET_ALL_GENRES', payload: genres.data });

    } catch {
        console.log('get all genres error');
    }
        
}
function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        alert('unable to access movies');
        console.log('get all error');
    }
        
}
function* fetchDetails(action){
    console.log('in getDetails', action.payload)
    try{
        //axios call to get movies on route /genre
        const response = yield axios.get('/genre'+ action.payload);
        yield put({type:'SET_DETAILS', payload: response.data[0]});
    } catch (error){
        alert('unable to access details');
        console.log('Error on details GET:', error);
    }//end axios
}//end getDetails

function* addMovie(action) {
    // get all movies from the DB
    try {
        yield axios.post('/api/movie', action.payload);
    } catch {
        console.log('add error');
    }
        
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

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

const allGenres =(state =[], action) => {
    switch (action.type) {
        case 'SET_ALL_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const movieID = ( state = [], action) => {
    if (action.type === "MOVIE_ID") {
        return (state = action.payload);
    }
    return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        movieID,
        genres,
        details,
        allGenres
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
