const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/genre:id', (req, res) => {
  //return all details (including genre agg) for a movie, based on movie id
  console.log('in genre GET', req.params.id)
  const queryText = 
      `Select"title", "description", "poster", "movies"."id", array_agg(name) "genres" FROM "movies"
      JOIN "movie_genre" on "movies"."id" = "movie_genre"."movie_id"
      JOIN "genres" on "movie_genre"."genre_id" = "genres"."id"
      WHERE "movies"."id" = $1
      GROUP BY "movies"."id";`
  pool.query(queryText, [req.params.id])
  .then((res) => {
      res.send(result.rows);
  })
  .catch((error) => {
      console.log(`Error on genre get: ${error}`);
      res.sendStatus(500);
  });
})


module.exports = router;