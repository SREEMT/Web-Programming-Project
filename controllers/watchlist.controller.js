// // Watchlist controller

// export default function WatchlistController(dao) {
//     return {
//         // GET all
//         getAll(req, res) {
//             res.json(dao.getAll());
//         },

//         // create new stock
//         postStock(req, res) {
//             const item = dao.newStock(req.body);
//             res.status(201).json(item);
//         },

//         // update a stock
//         //updateStock(req, res) {},

//         // delete a stock from list
//         deleteStock(req, res) {
//             const symbol = req.params.symbol;
//             if (!symbol) {
//                 return res.status(400).json({ error: "Symbol parameter required" });
//             }

//             const deleted = dao.deleteStock(symbol);
//             if (!deleted) {
//                 return res.status(404).json({ error: "Stock not found" });
//             }

//             return res.status(204).end();
//         }
//     };
// }



export default function WatchlistController(dao) {
    return {
        // GET all
        async getAll(req, res) {
            try {
                const items = await dao.getAll();
                res.json(items);
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch watchlist"});
            }
        },

        // create new stock
        async postStock(req, res) {
            // const item = dao.newStock(req.body);
            // res.status(201).json(item);
            try {
                const item = await dao.newStock(req.body);
                res.status(201).json(item);
            } catch (error) {
                if(error.code == 11000) {
                    return res.status(409).json({ error: "Stock symbol already exists."});
                }

                res.status(400).json({ error: error.message});
            }
        },

        // update a stock
        async updateStock(req, res) {
            const symbol = req.params.symbol;
            if (!symbol) {
                return res.status(400).json({ error: "Symbol parameter required" });
            }

            try {
                const updated = await dao.updateStock(symbol, req.body);
                if (!updated) {
                    return res.status(404).json({ error: "Stock not found" });
                }

                return res.json(updated);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        // delete a stock from list
        async deleteStock(req, res) {
            try {
                const symbol = req.params.symbol;

                if (!symbol) {
                    return res.status(400).json({
                        error: "Symbol paramter required"
                    });
                }

                const deleted = await dao.deleteStock(symbol);

                if(!deleted) {
                    return res.status(404).json({error: "Stock not found"});
                }

                return res.status(204).end();

            } catch (error) {
                res.status(500).json({ error: "Failed to delete stock"})
            }
        },

        async updateStock(req, res) {
            try {
                const symbol = req.params.symbol;

                if(!symbol) {
                    return res.status(400).json({ error: "Symbol paramter required" });
                }

                const updated = await dao.updateStock(symbol, req.body);

                if(!updated) {
                    return res.status(404).json({ error: "Stock not found"});
                }

                return res.json(updated)
            } catch (error) {
                res.status(500).json({ error: "Failed to update stock"});
            }
        }
    };
}
