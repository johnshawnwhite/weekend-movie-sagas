import { FormControl, Select } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function AddNew() {

    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    const dispatch = useDispatch;
    const history = useHistory;
    const allGenres = useSelector(store => store.allGenres);

    useEffect(() => {
        dispatch({ type: 'ADD_MOVIES' });
    }, []);

    const handleChange = (event) => {
        setGenre(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if(!title || !poster || !description || !genre) {
            alert('fill in the blanks')
        }

        else{
        dispatch({
                type: 'ADD_MOVIE',
                payload: {title: title, poster: poster, description: description, genre: genre}
        });

        setTitle('');
        setPoster('');
        setDescription('');
        setGenre('');
        history.push('/');

        }
    };
    
    const handleClick = () => {
        history.push('/');
    }

    

    return (
        <main>
            <h1>ADD MOVIES</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Movie Title"
                value={title}
                onChange={event => setTitle(event.target.value)}/>
                <input type="text"
                placeholder="Movie Poster URL"
                value={poster}
                onChange={event => setPoster(event.target.value)}/>
                <input type="text"
                placeholder="Movie Description"
                value={description}
                onChange={event => setDescription(event.target.value)}/>
                <formControl className={classes.formControl}></formControl>
                <inputLabel id="select-label">Genre</inputLabel>
                <Select
                labelId="select-label"
                id="select"
                value={genre}
                onChange={handleChange}>
                    {allGenres.map(item => {
                        return (
                            <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                        )
                    })}
                </Select>
                <input type="text"
                placeholder="Movie Title"
                value={title}
                onChange={event => setTitle(event.target.value)}/>
            </form>
        </main>

    );
}
export default Edit;