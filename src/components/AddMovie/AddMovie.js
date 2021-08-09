import { FormControl, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { FormControl } from "@material-ui/core";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState(1);
  const genres = useSelector(store => store.genres);

  const dispatch = useDispatch;
  const history = useHistory;
//   const classes = useStyles;
  const allGenres = useSelector((store) => store.allGenres);

  useEffect(() => {
    getGenres();
  }, []);
  
  const getGenres = () => {
    dispatch({ type: "FETCH_GENRES" });
  };

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !poster || !description || !genre) {
      alert("fill in the blanks");
    } else {
      dispatch({
        type: "ADD_MOVIE",
        payload: {
          title: title,
          poster: poster,
          description: description,
          genre: genre,
        },
      });

      setTitle('');
      setPoster('');
      setDescription('');
      setGenre('');
      history.push('/');
    }
  };

  return (
    <main>
      <h1>ADD MOVIES</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Movie Poster URL"
          value={poster}
          onChange={(event) => setPoster(event.target.value)}
        />
        <input
          type="text"
          placeholder="Movie Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {/* <form>
        <input id="select-label">Genre</input>
        <Select
          labelId="select-label"
          id="select"
          value={genre}
          onChange={handleChange}
        >
          {allGenres.map((item) => {
            return (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
        </form> */}
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </main>
  );
}
export default AddMovie;
