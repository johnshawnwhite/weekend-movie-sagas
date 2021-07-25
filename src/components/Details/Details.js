import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Details() {

    const dispatch = useDispatch();
    const details = useSelector(store => store.details);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>Details Page</h1>
            <section className="details">
                {details.map(details => {
                    return (
                        <div key={details.id} >
                            <h3>{details.title}</h3>
                            <img src={details.poster} alt={details.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}
export default Details;