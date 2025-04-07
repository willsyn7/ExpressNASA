const pagination = {
    resultpagination: async (req, res, next) => {
        try {
            // Destructure page and limit from query parameters
            const { page = 1, limit = 3 } = req.query;

            // Ensure res.locals contains the data to paginate
            if (!res.locals.asteroids) {
                return res.status(400).json({ error: 'No data available for pagination' });
            }

            // Destructure asteroids from res.locals
            const { asteroids } = res.locals;

            // Convert the asteroids object into an array of entries (key-value pairs)
            const asteroidEntries = Object.entries(asteroids);

            // Calculate start and end indices for pagination
            const startIndex = (parseInt(page) - 1) * parseInt(limit);
            const endIndex = parseInt(page) * parseInt(limit);

            // Slice the array of entries for pagination
            const paginatedEntries = asteroidEntries.slice(startIndex, endIndex);

            // Convert the sliced entries back into an object with destructuring
            const paginatedResults = paginatedEntries.reduce((result, [date, asteroidArray]) => {
                result[date] = asteroidArray.map(({ id, neo_reference_id, nasa_jpl_url, links }) => ({
                    id,
                    neo_reference_id,
                    nasa_jpl_url,
                    links,
                }));
                return result;
            }, {});

            // Add pagination metadata
            const paginationInfo = {
                currentPage: parseInt(page),
                totalItems: asteroidEntries.length,
                totalPages: Math.ceil(asteroidEntries.length / parseInt(limit)),
                itemsPerPage: parseInt(limit),
            };

            // Store paginated results and metadata in res.locals
            res.locals.paginatedResults = paginatedResults;
            res.locals.paginationInfo = paginationInfo;

            return next(); // Pass control to the next middleware
        } catch (error) {
            return next({
                log: 'Error in pagination middleware',
                status: 500,
                message: { err: 'Error in pagination middleware' },
            });
        }
    },
};

module.exports = pagination;