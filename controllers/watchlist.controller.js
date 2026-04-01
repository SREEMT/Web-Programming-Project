// Watchlist controller

export default function WatchlistController(dao) {
    return {
        // GET all
        getAll(req, res) {
            res.json(dao.getAll());
        }

        // create new stock

        // update a stock

        // delete a stock from list
    };
}
