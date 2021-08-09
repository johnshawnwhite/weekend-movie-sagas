import { useEffect } from 'react';
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
        type: 'GET_MOVIE"DETAILS',
        payload: { movieId: params.id }
      });
    }
  }, [params.id]);

  useEffect(() => {
    dispatch({
      type: 'GET_GENRES'
    });
  }, []);



export default EditMovie;