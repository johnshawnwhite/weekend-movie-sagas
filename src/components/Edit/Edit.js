import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Edit() {

    const dispatch = useDispatch();
    const edit = useSelector(store => store.edit);

    useEffect(() => {
        dispatch({ type: 'EDIT_MOVIES' });
    }, []);

    return (
        <main>
            <h1>EDIT MOVIES</h1>
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