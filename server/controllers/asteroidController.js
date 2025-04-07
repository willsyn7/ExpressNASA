const axios = require('axios');

const asteroidController = {
    fetchAsteroid: async (req, res, next) => {
        try {
            const start_date = req.query.start_date;
            const end_date = req.query.end_date;
            const key = process.env.NASA_API_KEY;
            console.log(key)
            // if(!start_date || !end_date){
            //     return res.status(400).json({error : `Missing paramters`})
            // }

            const nasaRequest = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${key}`;
            // const response = await axios.get(nasaRequest);
            const response = await fetch(nasaRequest);
            const data = await response.json();


            // const asteroids = response.data.near_earth_objects;
            // res.json(asteroids);
            res.locals.asteroids = data.near_earth_objects;
            return next();
        } catch (err) {
            return next({
                log: `Error with fetching asteroid`,
                status: 500,
                message: { err: `Error in fetchAsteroid controller` },
            });
        }
    },
};

module.exports = asteroidController; 