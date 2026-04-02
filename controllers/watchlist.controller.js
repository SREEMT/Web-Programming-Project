// Watchlist controller

export default function WatchlistController(dao) {
    return {
        // GET all
        getAll(req, res) {
            res.json(dao.getAll());
        }

        // create new stock
        postStock(req, res) {
            const item = dao.create(req.body);
            res.status(201).json(item);
        }

        // update a stock

        // delete a stock from list
    };
}
