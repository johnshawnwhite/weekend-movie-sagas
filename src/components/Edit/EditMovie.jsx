import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function EditMovie() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const movie = useSelector(store => store.editMovie);
  const genres = useSelector(store => store.genres);

 



export default EditMovie;