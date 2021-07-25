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
    
    const handleClick = () =>

    

    return (
        <main>
            <h1>ADD MOVIES</h1>
            <section className="edit">
                {details.map(edit => {
                    return (
                        <div key={edit.id} >
                            <h3>{edit.title}</h3>
                            <img src={edit.poster} alt={edit.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}
export default Edit;