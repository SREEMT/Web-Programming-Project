// Watchlist controller

export default function WatchlistController(dao) {
    return {
        // GET all
        getAll(req, res) {
            res.json(dao.getAll());
        },

        // create new stock
        postStock(req, res) {
            const item = dao.newStock(req.body);
            res.status(201).json(item);
        },

        // update a stock
        updateStock(req, res) {
            const symbol = req.params.symbol;
            if (!symbol) {
                return res.status(400).json({ error: "Symbol parameter required" });
            }

            const updated = dao.updateStock(symbol, req.body);
            if (!updated) {
                return res.status(404).json({ error: "Stock not found" });
            }

            return res.json(updated);
        },

        // delete a stock from list
        deleteStock(req, res) {
            const symbol = req.params.symbol;
            if (!symbol) {
                return res.status(400).json({ error: "Symbol parameter required" });
            }

            const deleted = dao.deleteStock(symbol);
            if (!deleted) {
                return res.status(404).json({ error: "Stock not found" });
            }

            return res.status(204).end();
        }
    };
}
